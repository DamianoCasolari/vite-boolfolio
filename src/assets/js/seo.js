// Gestione manuale di title/meta per route (SPA senza libreria di head management)
// e del JSON-LD LocalBusiness, iniettato una sola volta a livello di sito.

const SITE_NAME = "Damiano Casolari";
const DEFAULT_TITLE = "Damiano Casolari | Siti Web, AI e Automazioni | Cervia · Rimini";
const DEFAULT_DESCRIPTION =
    "Sviluppatore web a Cervia, specializzato nella realizzazione di siti internet moderni e applicazioni web su misura. Progetto soluzioni veloci, sicure e ottimizzate per la user experience, con attenzione al design, alle prestazioni e alla visibilità online.";
const DEFAULT_IMAGE_PATH = "/photo.webp";

function setMetaTag(attr, key, content) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function setLinkTag(rel, href) {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

// Aggiorna title, meta description, canonical, Open Graph e Twitter card.
// Va richiamata ad ogni cambio rotta (vedi main.js) e può essere richiamata
// di nuovo da una singola view (es. SingleProject) per un titolo più specifico.
export function setPageMeta({ title, description, path = "" } = {}) {
    const finalTitle = title || DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;
    const url = window.location.origin + path;
    const image = window.location.origin + DEFAULT_IMAGE_PATH;

    document.title = finalTitle;
    setMetaTag("name", "description", finalDescription);
    setLinkTag("canonical", url);

    setMetaTag("property", "og:title", finalTitle);
    setMetaTag("property", "og:description", finalDescription);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:locale", "it_IT");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", finalTitle);
    setMetaTag("name", "twitter:description", finalDescription);
    setMetaTag("name", "twitter:image", image);
}

// Dato strutturato LocalBusiness/ProfessionalService: descrive il business nel suo
// insieme, non cambia da una route all'altra — va iniettato una volta sola.
export function setLocalBusinessJsonLd() {
    const id = "ld-local-business";
    if (document.getElementById(id)) return;

    const data = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_NAME,
        image: window.location.origin + DEFAULT_IMAGE_PATH,
        url: window.location.origin,
        telephone: "+39 347 795 2189",
        description: DEFAULT_DESCRIPTION,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Cervia",
            addressRegion: "Emilia-Romagna",
            addressCountry: "IT",
        },
        areaServed: ["Cervia", "Rimini", "Emilia-Romagna", "Italia"],
        sameAs: ["https://www.linkedin.com/in/damiano-casolari/"],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
}
