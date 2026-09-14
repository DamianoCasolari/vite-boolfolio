// Gestione manuale di title/meta per route (SPA senza libreria di head management).
// I valori statici di partenza e il JSON-LD del sito stanno in index.html, così li
// leggono anche i crawler che non eseguono JS.

const SITE_NAME = "Damiano Casolari";
const DEFAULT_TITLE = "Siti Vetrina, Landing Page e Restyling a Ravenna | Damiano Casolari";
const DEFAULT_DESCRIPTION =
    "Web developer a Ravenna: realizzo landing page, siti vetrina e restyling di siti web veloci, curati e pensati per portarti clienti. Call gratuita, senza impegno.";
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";
const DEFAULT_IMAGE_PATH = "/og-image.jpg";

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

// Aggiorna title, meta description, robots, canonical, Open Graph e Twitter card.
// Va richiamata ad ogni cambio rotta (vedi main.js) e può essere richiamata
// di nuovo da una singola view (es. SingleProject) per un titolo più specifico.
// `path` va passato senza query string, altrimenti il canonical duplica la pagina.
export function setPageMeta({ title, description, robots, path = "" } = {}) {
    const finalTitle = title || DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;
    const url = window.location.origin + path;
    const image = window.location.origin + DEFAULT_IMAGE_PATH;

    document.title = finalTitle;
    setMetaTag("name", "description", finalDescription);
    setMetaTag("name", "robots", robots || DEFAULT_ROBOTS);
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
