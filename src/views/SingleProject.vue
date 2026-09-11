<script>
import projectsJson from "../assets/data/info_projects.json";
import { languageState } from "../assets/js/language.js";
import { onMagneticMove, onMagneticLeave } from "../assets/js/magnetic_cta.js";
import { setPageMeta } from "../assets/js/seo.js";

export default {
  name: "SingleProject",

  data() {
    return {
      loading: true,
      project: null,
      error: null,
      languageState,
      activeImageIndex: 0,
    };
  },

  computed: {
    title() {
      if (!this.project) return "";
      return this.languageState.eng_lan
        ? (this.project.name ?? "")
        : (this.project.name_it ?? this.project.name ?? "");
    },

    descriptionText() {
      if (!this.project) return "";
      return this.languageState.eng_lan
        ? (this.project.description ?? "")
        : (this.project.description_it ?? this.project.description ?? "");
    },

    imageSrc() {
      return this.project?.image ?? "";
    },

    // `gallery` è opzionale: finché un progetto ne ha una sola, mostriamo
    // solo l'hero senza striscia di miniature. Quando in futuro aggiungerai
    // più screenshot ad un progetto (campo "gallery" nel json), la galleria
    // compare da sola.
    galleryImages() {
      if (this.project?.gallery?.length) return this.project.gallery;
      return this.imageSrc ? [this.imageSrc] : [];
    },

    heroImageSrc() {
      return this.galleryImages[this.activeImageIndex] ?? this.imageSrc;
    },

    waLink() {
      const msg = this.languageState.eng_lan
        ? `Hi Damiano! I saw the "${this.title}" project on your portfolio and I'd like to build something similar.`
        : `Ciao Damiano! Ho visto il progetto "${this.title}" sul tuo portfolio e mi piacerebbe realizzare qualcosa di simile.`;
      return "https://wa.me/3477952189?text=" + encodeURIComponent(msg);
    },
  },

  methods: {
    loadProjectBySlug() {
      try {
        const slug = this.$route.params.slug;
        const list = projectsJson.projects ?? [];

        const found = list.find((p) => p.slug === slug);

        if (!found) {
          this.$router.push({ name: "PageNotFound" });
          return;
        }

        this.project = found;
        this.preloadProjectImage(found.image);
      } catch (e) {
        this.error = e?.message ?? "Errore caricamento progetto";
        this.loading = false;
      }
    },

    preloadProjectImage(src) {
      if (!src) {
        this.loading = false;
        return;
      }

      const img = new Image();

      img.onload = () => {
        this.loading = false;
      };

      img.onerror = () => {
        this.loading = false;
      };

      img.src = src;
    },

    onMagneticMove,
    onMagneticLeave,
  },

  watch: {
    "$route.params.slug": {
      immediate: true,
      handler() {
        this.loading = true;
        this.project = null;
        this.error = null;
        this.activeImageIndex = 0;
        this.loadProjectBySlug();
      },
    },
    // titolo/description più specifici del fallback generico impostato dal
    // router — si aggiornano anche cambiando lingua, non solo al primo load
    title(newTitle) {
      if (!newTitle) return;
      setPageMeta({
        title: `${newTitle} | Portfolio – Damiano Casolari`,
        description: this.descriptionText ? this.descriptionText.slice(0, 160) : undefined,
        path: this.$route.fullPath,
      });
    },
  },
};
</script>

<template>
  <div
    v-if="loading"
    class="bg_snow vh100 d-flex flex-column align-items-center justify-content-center"
  >
    <div class="dc-loader" role="status" aria-label="Loading">
      <div class="dc-loader__glow"></div>

      <div class="dc-loader__logo-wrap">
        <img src="/dc-loader2.png" alt="DC Logo" class="dc-loader__logo" />
      </div>

      <span class="dc-loader__pixel dc-loader__pixel--1"></span>
      <span class="dc-loader__pixel dc-loader__pixel--2"></span>
      <span class="dc-loader__pixel dc-loader__pixel--3"></span>
      <span class="dc-loader__pixel dc-loader__pixel--4"></span>
      <span class="dc-loader__pixel dc-loader__pixel--5"></span>
    </div>
  </div>

  <div v-else-if="error" class="text-center py-5">
    {{ error }}
  </div>

  <div v-else-if="project" class="single_project">
    <div class="container position-relative py-3 py-md-4">
      <!-- HERO -->
      <div class="project_hero rounded-5 position-relative overflow-hidden">
        <component
          :is="project.link ? 'a' : 'div'"
          :href="project.link || undefined"
          target="_blank"
          rel="noopener"
          class="project_hero__media d-block w-100 h-100 position-relative"
        >
          <img
            :src="heroImageSrc"
            aria-hidden="true"
            class="project_hero__backdrop"
            loading="eager"
          />

          <img
            :src="heroImageSrc"
            :alt="`${title} cover`"
            class="project_hero__img"
            loading="eager"
            fetchpriority="high"
          />

          <div
            v-if="project.link"
            class="overlay text-light opacity_hover z_index50 position-absolute w-100 h-100 d-flex justify-content-center align-items-center t_duration"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              fill="currentColor"
              class="bi bi-eye-fill rotate_animation position-relative"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path
                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
              />
            </svg>
          </div>
        </component>

        <div class="project_hero__scrim" aria-hidden="true"></div>

        <div class="project_hero__topbar">
          <button
            type="button"
            class="hero_back_btn"
            @click="$router.back()"
            aria-label="Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div v-if="project.type?.name" class="hero_type_badge">
            {{ project.type.name }}
          </div>
        </div>

        <div class="project_hero__title">
          <h1>{{ title }}</h1>
        </div>
      </div>

      <!-- GALLERIA (compare solo se il progetto ha più di uno screenshot) -->
      <div v-if="galleryImages.length > 1" class="project_gallery">
        <button
          v-for="(img, i) in galleryImages"
          :key="img"
          type="button"
          class="project_gallery__thumb"
          :class="{ 'is-active': i === activeImageIndex }"
          @click="activeImageIndex = i"
        >
          <img :src="img" :alt="`${title} screenshot ${i + 1}`" loading="lazy" />
        </button>
      </div>

      <!-- Tag linguaggi/tecnologie nascosti mentre si cercano clienti (non interessa a loro).
           Da riattivare per la ricerca lavoro: basta togliere questo commento.
      <div class="tags_row">
        <span
          v-for="(technology, index) in project.tags"
          :key="technology.id ?? technology.name ?? index"
          class="tag_item zoom_appearance fw-semibold"
          :style="{ animationDelay: index * 0.08 + 's' }"
        >
          <span class="tag_dot" aria-hidden="true"></span>
          {{ technology.name }}
        </span>
      </div>
      -->

      <!-- DESCRIZIONE -->
      <div class="project_body">
        <p class="project_description text_carbon">
          {{ descriptionText }}
        </p>
      </div>

      <!-- CTA -->
      <div class="project_cta">
        <p class="project_cta__text">
          {{
            languageState.eng_lan
              ? "Let's talk about your project."
              : "Parliamo del tuo progetto."
          }}
        </p>
        <a
          :href="waLink"
          target="_blank"
          rel="noopener noreferrer"
          class="wa_cta"
          :aria-label="
            languageState.eng_lan
              ? 'Message me on WhatsApp'
              : 'Scrivimi su WhatsApp'
          "
          @mousemove="onMagneticMove"
          @mouseleave="onMagneticLeave"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
          <span>{{
            languageState.eng_lan
              ? "Message me on WhatsApp"
              : "Scrivimi su WhatsApp"
          }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../styles/partials/magnetic_cta" as *;

.hero_back_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  transition:
    background 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
    transform: translateX(-3px);
  }
}

.hero_type_badge {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #393939;
  font-weight: 600;
  font-size: 0.82rem;
}

.project_hero {
  aspect-ratio: 16 / 8;
  min-height: 320px;

  @media (max-width: 767.98px) {
    aspect-ratio: 4 / 5;
    min-height: 380px;
  }
}

.project_hero__media {
  height: 100%;
}

// Sfondo sfocato della stessa immagine: riempie tutto lo hero anche quando
// lo screenshot è verticale/stretto (es. app mobile), evitando di vedere
// grandi zone bianche vuote quando poi il taglio "cover" cade nel punto
// sbagliato dello screenshot.
.project_hero__backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: blur(40px) saturate(1.15) brightness(0.72);
  transform: scale(1.15);
  z-index: 0;
}

// Immagine reale sopra il backdrop, mai ritagliata: si vede tutto lo
// screenshot così com'è, centrato, qualsiasi sia il suo rapporto d'aspetto.
.project_hero__img {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.project_hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.32) 38%,
    rgba(0, 0, 0, 0) 68%
  );
  pointer-events: none;
}

.project_hero__topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
}

.project_hero__title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  padding: 0 1.5rem 1.5rem;

  h1 {
    margin: 0;
    color: #fff;
    font-weight: 600;
    font-size: clamp(1.5rem, 3.6vw, 2.6rem);
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45);
  }
}

.project_gallery {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  padding: 1.1rem 0.15rem;
  -webkit-overflow-scrolling: touch;
}

.project_gallery__thumb {
  flex: 0 0 auto;
  width: 108px;
  aspect-ratio: 16 / 10;
  border: 0;
  border-radius: 1rem;
  overflow: hidden;
  padding: 0;
  opacity: 0.55;
  scroll-snap-align: start;
  transition:
    opacity 0.25s ease,
    box-shadow 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.is-active {
    opacity: 1;
    box-shadow: 0 0 0 2px #393939;
  }

  &:hover {
    opacity: 0.85;
  }
}

.project_body {
  max-width: 68ch;
  margin: 1.25rem auto 3rem;
  padding: 0 0.25rem;
}

.project_description {
  font-size: 1.05rem;
  line-height: 1.8;
  white-space: pre-line;
}

.project_cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  max-width: 68ch;
  margin: 0 auto 3.5rem;
  padding: 0 0.25rem;
}

.project_cta__text {
  font-size: 1rem;
  font-weight: 600;
  color: #393939;
  margin: 0;
}

// CTA WhatsApp: stessi colori/icona della .wa_fixed_cta di ContactsView.vue.
// Il micro-feel (liquid glass + pull magnetico + alone che respira) viene dal
// mixin condiviso in src/styles/partials/_magnetic_cta.scss.
.wa_cta {
  @include magnetic-cta;
  @include whatsapp-breathe;

  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.6rem 1.5rem;
  background: #25d366;
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.45);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.01em;

  &:hover {
    color: #fff;
    background: #20c05e;
    border-color: rgba(34, 197, 94, 0.75);
    box-shadow:
      0 18px 34px rgba(22, 163, 74, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

.tags_row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  margin-top: 10px;
  @media (max-width: 767.98px) {
    padding-left: 1rem;
  }
}

.tag_item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #555;
  letter-spacing: 0.01em;
}

.tag_dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #b0b0b0;
  flex-shrink: 0;
}
</style>
