<script>
import * as THREE from "three";

const MOBILE_BREAKPOINT = 992; // stesso breakpoint bootstrap "lg" usato nel resto del sito
const RADIUS = 2.1;
const BADGE_SIZE = 0.72;
const WHEEL_SENSITIVITY_Y = 0.006; // scroll verticale (rotella / trackpad su-giù)
const WHEEL_SENSITIVITY_X = 0.005; // scroll orizzontale (trackpad sinistra-destra)
const POINTER_TILT_MAX = 0.35; // radianti di tilt massimo seguendo il mouse
const AUTOPLAY_SPEED = 0.006;
const LERP_FACTOR = 0.08;

export default {
  name: "IcosahedronShowcase",

  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isMobile: false,
      hovering: false,
    };
  },

  computed: {
    faceProjects() {
      if (!this.projects.length) return [];
      return Array.from(
        { length: 20 },
        (_, i) => this.projects[i % this.projects.length]
      );
    },
  },

  watch: {
    // Il parent (SiteMain) a volte monta questo componente prima che `projects`
    // sia popolato (es. tornando da una pagina progetto via SPA, senza il delay
    // artificiale del primo caricamento): le badge vanno ricostruite quando i
    // dati arrivano dopo il mount, altrimenti restano vuote per sempre.
    projects() {
      if (!this.group || !this.coreGeometry) return;
      this.rebuildBadges();
    },
  },

  methods: {
    initThree() {
      const canvas = this.$refs.icoCanvas;
      const container = this.$refs.icoContainer;
      if (!canvas || !container) return;

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      this.camera.position.z = 6.2;

      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      this.group = new THREE.Group();
      this.scene.add(this.group);

      const coreGeometry = new THREE.IcosahedronGeometry(RADIUS, 0);
      this.coreGeometry = coreGeometry;
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0xf5f5f5,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      this.coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      this.group.add(this.coreMesh);

      const edgesGeometry = new THREE.EdgesGeometry(coreGeometry);
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0xc9c9c9,
        transparent: true,
        opacity: 0.6,
      });
      this.edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
      this.group.add(this.edges);

      this.badgeMeshes = [];
      this.textureCache = new Map();
      this.buildBadges(coreGeometry);

      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();

      this.scrollRotation = { x: 0, y: 0 }; // accumulatore libero da eventi wheel
      this.pointerTilt = { x: 0, y: 0 }; // tilt "live" basato sulla posizione del mouse
      this.autoplayRotation = { x: 0, y: 0 }; // solo mobile
      this.currentRotation = { x: 0, y: 0 };

      this.resizeObserver = new ResizeObserver(() => this.onResize());
      this.resizeObserver.observe(container);
      this.onResize();
    },

    buildBadges(coreGeometry) {
      const position = coreGeometry.getAttribute("position");
      const faceCount = position.count / 3;

      for (let face = 0; face < faceCount; face++) {
        const project = this.faceProjects[face];
        if (!project) continue;

        const a = new THREE.Vector3().fromBufferAttribute(position, face * 3);
        const b = new THREE.Vector3().fromBufferAttribute(
          position,
          face * 3 + 1
        );
        const c = new THREE.Vector3().fromBufferAttribute(
          position,
          face * 3 + 2
        );

        const centroid = new THREE.Vector3()
          .add(a)
          .add(b)
          .add(c)
          .divideScalar(3);
        const normal = centroid.clone().normalize();

        const geometry = new THREE.PlaneGeometry(BADGE_SIZE, BADGE_SIZE);
        const material = new THREE.MeshBasicMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          color: 0xffffff,
        });
        const badge = new THREE.Mesh(geometry, material);

        badge.position.copy(normal).multiplyScalar(RADIUS * 1.03);
        badge.lookAt(normal.clone().multiplyScalar(RADIUS * 2));
        badge.userData.slug = project.slug;

        this.group.add(badge);
        this.badgeMeshes.push(badge);

        this.loadBadgeTexture(project).then((texture) => {
          if (texture) material.map = texture;
          material.needsUpdate = true;
        });
      }
    },

    rebuildBadges() {
      this.clearBadges();
      this.buildBadges(this.coreGeometry);
    },

    clearBadges() {
      if (!this.badgeMeshes) return;
      this.badgeMeshes.forEach((badge) => {
        this.group.remove(badge);
        badge.geometry.dispose();
        if (badge.material.map) badge.material.map.dispose();
        badge.material.dispose();
      });
      this.badgeMeshes = [];
    },

    loadBadgeTexture(project) {
      const src = project.logo ?? project.image;
      if (!src) return Promise.resolve(null);

      if (this.textureCache.has(src)) {
        return Promise.resolve(this.textureCache.get(src));
      }

      const promise = new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          resolve(this.drawBadgeCanvas(img));
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });

      this.textureCache.set(src, promise);
      return promise;
    },

    drawBadgeCanvas(img) {
      const size = 256;
      const radius = 36;

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      const roundedRectPath = () => {
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.arcTo(size, 0, size, size, radius);
        ctx.arcTo(size, size, 0, size, radius);
        ctx.arcTo(0, size, 0, 0, radius);
        ctx.arcTo(0, 0, size, 0, radius);
        ctx.closePath();
      };

      // fallback bianco per eventuali zone trasparenti del logo sorgente
      ctx.fillStyle = "#ffffff";
      roundedRectPath();
      ctx.fill();

      // "cover": l'immagine riempie tutta la card (angoli arrotondati compresi),
      // eventuali bordi in eccesso vengono tagliati invece di lasciare bordo bianco
      ctx.save();
      roundedRectPath();
      ctx.clip();

      const scale = Math.max(
        size / img.naturalWidth,
        size / img.naturalHeight
      );
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const dx = (size - drawWidth) / 2;
      const dy = (size - drawHeight) / 2;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    },

    onResize() {
      const container = this.$refs.icoContainer;
      if (!container || !this.renderer || !this.camera) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);

      this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    },

    // Rotazione "libera": accumula i delta wheel invece di leggere window.scrollY,
    // così reagisce anche scrollando/swipando quando la pagina è già in cima o in fondo,
    // e cattura anche lo swipe orizzontale del trackpad (non solo su/giù).
    onWheel(event) {
      if (this.isMobile) return;

      const multiplier =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const dx = event.deltaX * multiplier;
      const dy = event.deltaY * multiplier;

      // Se lo swipe è prevalentemente orizzontale evitiamo che il browser lo
      // interpreti come gesture di navigazione avanti/indietro.
      if (Math.abs(dx) > Math.abs(dy)) {
        event.preventDefault();
      }

      this.scrollRotation.y += dy * WHEEL_SENSITIVITY_Y;
      this.scrollRotation.x += dx * WHEEL_SENSITIVITY_X;
    },

    // Tilt "vivo" legato alla posizione del mouse nella viewport: muovendo il
    // cursore l'icosaedro reagisce anche senza scrollare.
    onWindowMouseMove(event) {
      if (this.isMobile) return;

      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;

      this.pointerTilt.y = nx * POINTER_TILT_MAX;
      this.pointerTilt.x = ny * POINTER_TILT_MAX;
    },

    onPointerMove(event) {
      this.updatePointer(event);
      const hit = this.intersectBadge();
      const isHovering = !!hit;
      if (isHovering !== this.hovering) {
        this.hovering = isHovering;
        this.$refs.icoCanvas.style.cursor = isHovering ? "pointer" : "auto";
      }
    },

    onClick(event) {
      this.updatePointer(event);
      const hit = this.intersectBadge();
      if (!hit) return;

      const slug = hit.object.userData.slug;
      if (!slug) return;

      this.$router.push({ name: "single-project", params: { slug } });
    },

    updatePointer(event) {
      const rect = this.$refs.icoCanvas.getBoundingClientRect();
      this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    },

    intersectBadge() {
      if (!this.raycaster || !this.badgeMeshes.length) return null;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersections = this.raycaster.intersectObjects(
        this.badgeMeshes,
        false
      );
      return intersections[0] ?? null;
    },

    animate() {
      this.rafId = requestAnimationFrame(this.animate);
      if (!this.group) return;

      let targetY;
      let targetX;

      if (this.isMobile) {
        this.autoplayRotation.y += AUTOPLAY_SPEED;
        this.autoplayRotation.x += AUTOPLAY_SPEED * 0.25;
        targetY = this.autoplayRotation.y;
        targetX = this.autoplayRotation.x;
      } else {
        targetY = this.scrollRotation.y + this.pointerTilt.y;
        targetX = this.scrollRotation.x + this.pointerTilt.x;
      }

      this.currentRotation.y += (targetY - this.currentRotation.y) * LERP_FACTOR;
      this.currentRotation.x += (targetX - this.currentRotation.x) * LERP_FACTOR;

      this.group.rotation.y = this.currentRotation.y;
      this.group.rotation.x = this.currentRotation.x;

      this.renderer.render(this.scene, this.camera);
    },

    disposeThree() {
      if (this.rafId) cancelAnimationFrame(this.rafId);

      if (this.resizeObserver) this.resizeObserver.disconnect();

      window.removeEventListener("wheel", this.onWheel);
      window.removeEventListener("mousemove", this.onWindowMouseMove);

      this.clearBadges();

      if (this.coreMesh) {
        this.coreMesh.geometry.dispose();
        this.coreMesh.material.dispose();
      }

      if (this.edges) {
        this.edges.geometry.dispose();
        this.edges.material.dispose();
      }

      if (this.renderer) this.renderer.dispose();
    },
  },

  mounted() {
    this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    this.initThree();

    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("mousemove", this.onWindowMouseMove, {
      passive: true,
    });

    this.animate();
  },

  unmounted() {
    this.disposeThree();
  },
};
</script>

<template>
  <div ref="icoContainer" class="ico-showcase">
    <canvas
      ref="icoCanvas"
      class="ico-showcase__canvas"
      @pointermove="onPointerMove"
      @click="onClick"
    ></canvas>
  </div>
</template>

<style lang="scss" scoped>
.ico-showcase {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 420px;

  @media (max-width: 991.98px) {
    height: 50vh;
    min-height: 320px;
  }
}

.ico-showcase__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
