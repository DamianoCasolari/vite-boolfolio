<script>
    // Figura wireframe per le card idle dei servizi (solo desktop).
    // Proiezione 3D fatta a mano su SVG: niente three.js, 6 vertici e 12 spigoli bastano.
    //   variant 'flat'    → rombo 2D con un leggero movimento 3D (Landing Page)
    //   variant 'solid'   → ottaedro trasparente che ruota (Sito Vetrina)
    //   variant 'rebuild' → ottaedro tratteggiato: uno alla volta gli spigoli si ritirano e vengono
    //                       ridisegnati pieni; completato il giro si torna indietro (Restyling)

    const H = 1.4; // semi-altezza verticale: allunga la figura in un rombo
    const F = 5;   // distanza della camera per la prospettiva

    const SHAPES = {
        flat: {
            vertices: [[0, H, 0], [1, 0, 0], [0, -H, 0], [-1, 0, 0]],
            edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
        },
        octa: {
            vertices: [[0, H, 0], [0, -H, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1]],
            edges: [
                [0, 2], [0, 3], [0, 4], [0, 5],
                [1, 2], [1, 3], [1, 4], [1, 5],
                [2, 3], [3, 4], [4, 5], [5, 2],
            ],
        },
    };

    // durate del ciclo "rebuild" (ms)
    const OUT = 700, GAP = 260, IN = 900, TURN_PAUSE = 1800;

    const easeInOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

    export default {
        name: "ServiceShape",
        props: {
            variant: { type: String, default: 'solid' },
        },
        computed: {
            shape() {
                return this.variant === 'flat' ? SHAPES.flat : SHAPES.octa;
            },
            showVertices() {
                return this.variant !== 'flat';
            },
        },
        mounted() {
            this.lines = [...this.$el.querySelectorAll('.shape_edge')];
            this.dots = [...this.$el.querySelectorAll('.shape_vertex')];
            this.projected = this.shape.vertices.map(() => [0, 0, 0]);

            // stato del movimento
            this.ry = this.variant === 'flat' ? 0 : 0.6;
            this.tilt = { x: 0, y: 0 };
            this.tiltTarget = { x: 0, y: 0 };
            this.boost = 0;
            this.boostTarget = 0;

            // stato degli spigoli per 'rebuild'
            // si parte tutti tratteggiati; target = stile verso cui sta andando il giro
            this.edgeState = this.shape.edges.map(() => ({ phase: 'idle', start: 0, len: 1, solid: false }));
            this.target = true;
            this.nextSwapAt = performance.now() + 900;

            // tilt verso il cursore sull'intera card
            this.card = this.$el.closest('.service_card');
            this.card?.addEventListener('pointermove', this.onPointerMove);
            this.card?.addEventListener('pointerleave', this.onPointerLeave);

            this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.last = performance.now();
            this.t0 = this.last;

            if (this.reduced) {
                this.render(this.last, 0);
            } else {
                this.raf = requestAnimationFrame(this.loop);
            }
        },
        unmounted() {
            cancelAnimationFrame(this.raf);
            this.card?.removeEventListener('pointermove', this.onPointerMove);
            this.card?.removeEventListener('pointerleave', this.onPointerLeave);
        },
        methods: {
            onPointerMove(e) {
                const r = this.card.getBoundingClientRect();
                this.tiltTarget.x = ((e.clientX - r.left) / r.width) * 2 - 1;
                this.tiltTarget.y = ((e.clientY - r.top) / r.height) * 2 - 1;
                this.boostTarget = 1;
            },
            onPointerLeave() {
                this.tiltTarget.x = 0;
                this.tiltTarget.y = 0;
                this.boostTarget = 0;
            },

            loop(now) {
                const dt = Math.min((now - this.last) / 1000, 0.05);
                this.last = now;
                this.render(now, dt);
                this.raf = requestAnimationFrame(this.loop);
            },

            render(now, dt) {
                const t = (now - this.t0) / 1000;

                // smoothing di tilt e boost
                this.tilt.x += (this.tiltTarget.x - this.tilt.x) * 0.06;
                this.tilt.y += (this.tiltTarget.y - this.tilt.y) * 0.06;
                this.boost += (this.boostTarget - this.boost) * 0.04;

                let ry, rx;
                if (this.variant === 'flat') {
                    // oscillazione lieve: resta un rombo, ma "respira" in 3D
                    ry = Math.sin(t * 0.55) * 0.34 + this.tilt.x * 0.4;
                    rx = Math.sin(t * 0.4 + 1.2) * 0.16 + this.tilt.y * 0.3;
                } else {
                    this.ry += dt * (0.32 + this.boost * 0.35);
                    ry = this.ry + this.tilt.x * 0.45;
                    rx = 0.32 + Math.sin(t * 0.3) * 0.07 + this.tilt.y * 0.28;
                }

                const cy = Math.cos(ry), sy = Math.sin(ry);
                const cx = Math.cos(rx), sx = Math.sin(rx);

                this.shape.vertices.forEach(([x, y, z], i) => {
                    const x1 = x * cy + z * sy;
                    const z1 = -x * sy + z * cy;
                    const y2 = y * cx - z1 * sx;
                    const z2 = y * sx + z1 * cx;
                    const s = F / (F - z2);
                    const p = this.projected[i];
                    p[0] = x1 * s;
                    p[1] = -y2 * s;
                    p[2] = z2;
                });

                if (this.variant === 'rebuild' && !this.reduced) this.updateRebuild(now);

                this.shape.edges.forEach(([a, b], i) => {
                    const line = this.lines[i];
                    const pa = this.projected[a], pb = this.projected[b];
                    let opacity = this.depthOpacity((pa[2] + pb[2]) / 2);
                    let x1 = pa[0], y1 = pa[1], x2 = pb[0], y2 = pb[1];

                    if (this.variant === 'rebuild') {
                        const st = this.edgeState[i];
                        // in fase di ridisegno la linea cresce dal vertice opposto
                        if (st.phase === 'in') [x1, y1, x2, y2] = [x2, y2, x1, y1];
                        // accorcio la geometria (non il dash, che serve al tratteggio)
                        x2 = x1 + (x2 - x1) * st.len;
                        y2 = y1 + (y2 - y1) * st.len;
                        if (st.phase === 'gap') opacity = 0;
                    }

                    line.setAttribute('x1', x1.toFixed(4));
                    line.setAttribute('y1', y1.toFixed(4));
                    line.setAttribute('x2', x2.toFixed(4));
                    line.setAttribute('y2', y2.toFixed(4));
                    line.style.opacity = opacity.toFixed(3);
                });

                this.dots.forEach((dot, i) => {
                    const p = this.projected[i];
                    dot.setAttribute('cx', p[0].toFixed(4));
                    dot.setAttribute('cy', p[1].toFixed(4));
                    dot.style.opacity = this.depthOpacity(p[2]).toFixed(3);
                });
            },

            // spigoli dietro più tenui: dà profondità al wireframe trasparente
            depthOpacity(z) {
                if (this.variant === 'flat') return 0.9;
                const k = Math.min(Math.max((z / H + 1) / 2, 0), 1);
                return 0.18 + k * 0.82;
            },

            updateRebuild(now) {
                const busy = this.edgeState.filter(s => s.phase !== 'idle').length;
                const pending = this.edgeState.filter(s => s.phase === 'idle' && s.solid !== this.target);

                if (!pending.length && !busy) {
                    // giro completato: pausa e si riparte al contrario
                    this.target = !this.target;
                    this.nextSwapAt = now + TURN_PAUSE;
                } else if (pending.length && busy < 2 && now >= this.nextSwapAt) {
                    const s = pending[Math.floor(Math.random() * pending.length)];
                    s.phase = 'out';
                    s.start = now;
                    this.nextSwapAt = now + 900 + Math.random() * 700;
                }

                this.edgeState.forEach((s, i) => {
                    const el = now - s.start;
                    if (s.phase === 'out') {
                        // la linea si ritira verso il suo vertice di partenza
                        s.len = 1 - easeInOut(Math.min(el / OUT, 1));
                        if (el >= OUT) {
                            s.phase = 'gap'; s.start = now; s.len = 0;
                            // mentre è invisibile cambia stile: tratteggiata ⇄ piena
                            s.solid = !s.solid;
                            this.lines[i].classList.toggle('is-solid', s.solid);
                        }
                    } else if (s.phase === 'gap') {
                        if (el >= GAP) { s.phase = 'in'; s.start = now; }
                    } else if (s.phase === 'in') {
                        // e viene ridisegnata dal vertice opposto col nuovo stile
                        s.len = easeInOut(Math.min(el / IN, 1));
                        if (el >= IN) { s.phase = 'idle'; s.len = 1; }
                    }
                });
            },
        },
    };
</script>

<template>
    <svg class="service_shape" :class="`service_shape--${variant}`" viewBox="-1.9 -1.9 3.8 3.8" aria-hidden="true">
        <line
            v-for="(edge, i) in shape.edges"
            :key="`e${i}`"
            class="shape_edge"
            vector-effect="non-scaling-stroke"
        />
        <template v-if="showVertices">
            <circle v-for="(v, i) in shape.vertices" :key="`v${i}`" class="shape_vertex" r="0.026" />
        </template>
    </svg>
</template>

<style lang="scss" scoped>
.service_shape {
    width: min(78%, 340px);
    height: auto;
    max-height: 55%; // su schermi bassi non deve salire sotto il testo
    overflow: visible;
    color: inherit;
}

.shape_edge {
    stroke: currentColor;
    stroke-width: 1.1;
    stroke-linecap: round;
    fill: none;

    // restyling: si parte tratteggiati, gli spigoli già rifatti diventano pieni
    .service_shape--rebuild & {
        stroke-dasharray: 3 5;
        stroke-linecap: butt;
    }
    .service_shape--rebuild &.is-solid {
        stroke-dasharray: none;
        stroke-linecap: round;
    }
}

.shape_vertex {
    fill: currentColor;
}
</style>
