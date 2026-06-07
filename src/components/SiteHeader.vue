<script>
    import { languageState } from "../assets/js/language.js";

    export default {
        name: "SiteHeader",
        data() {
            return {
                headerScroll: true,
                lastPosition: 0,
                languageState,
                mobileMenuOpen: false,
            }
        },
        methods: {
            scrollFunction() {
                const currentPosition = window.scrollY;
                if (currentPosition <= 66) {
                    this.headerScroll = true;
                    this.lastPosition = currentPosition;
                    return;
                }
                this.headerScroll = currentPosition <= this.lastPosition;
                this.lastPosition = currentPosition;
            },
            resetHeader() {
                this.headerScroll = true;
            },
            toggleLang() {
                this.languageState.toggle();
            },
            toggleMenu() {
                this.mobileMenuOpen = !this.mobileMenuOpen;
            },
            closeMenu() {
                this.mobileMenuOpen = false;
            },
        },
        watch: {
            $route() {
                this.resetHeader();
                this.closeMenu();
            },
            mobileMenuOpen(val) {
                document.body.style.overflow = val ? 'hidden' : '';
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollFunction);
            window.addEventListener('scroll', function () {
                var scrollTop = window.scrollY || document.documentElement.scrollTop;
                var opacity = 0.8 - (scrollTop / 1000);
                var shadowLine = document.querySelector('.shadow_line');
                shadowLine.style.opacity = opacity;
            });
        }
    }
</script>

<template>
    <div class="shadow_line"></div>
    <header>
        <nav class="navbar navbar-expand-md shadow-sm position-fixed w-100 top-0 z_index header_shadow bg_color"
            :class="[headerScroll ? 'header_on' : 'header_off', { 'mob_menu_active': mobileMenuOpen }]">
            <div class="container d-flex justify-content-between align-items-center">

                <!-- Links sinistra -->
                <nav class="d-flex align-items-center">
                    <router-link :to="{ name: 'home' }" class="nav-link">
                        <span class="fw-semibold text-dark mx-1 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'home' }">Home</span>
                    </router-link>
                    <router-link :to="{ name: 'services' }" class="nav-link about_me_link d-flex">
                        <span class="fw-semibold text-dark mx-1 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'services' }">{{ languageState.eng_lan ? 'Services' : 'Servizi' }}</span>
                    </router-link>
                      <router-link :to="{ name: 'about' }" class="nav-link about_me_link d-flex">
                        <span class="fw-semibold text-dark mx-1 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'about' }">{{ languageState.eng_lan ? 'About' : 'Chi sono' }}</span>
                    </router-link>
                 
                </nav>

                <!-- Icone destra — solo desktop -->
                <div class="logo_container d-none d-md-flex align-items-center">
                    <router-link :to="{ name: 'contacts' }" class="navbar-brand d-flex align-items-center justify-content-start mx-1 logo_filter scale_hover nav-icon-link" :class="{ 'nav-icon-link--active': $route.name === 'contacts' }" :title="languageState.eng_lan ? 'Contact' : 'Contatti'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" fill="none" stroke="#212529" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </router-link>
                    <a class="navbar-brand align-items-center justify-content-start mx-0 logo_filter lighter scale_hover"
                        href="https://wa.me/3477952189?text=Buongiorno%2C%0Asono%20%5BNome%5D%20e%20vi%20contatto%20per%20avere%20informazioni%20sulla%20realizzazione%20di%20un%20sito%20web%20per%20la%20mia%20attivit%C3%A0.%0AResto%20in%20attesa%20di%20un%20vostro%20riscontro%2C%20grazie."
                        target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" fill="#212529" viewBox="0 0 640 640">
                            <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
                        </svg>
                    </a>
                    <a class="navbar-brand d-flex align-items-center justify-content-start mx-2 logo_filter lighter scale_hover"
                        href="https://www.linkedin.com/in/damiano-casolari/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="40" fill="#212529" class="bi bi-linkedin lighter" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                    </a>
                    <button type="button" @click="toggleLang" title="Language"
                        class="navbar-brand border-0 bg-transparent d-flex align-items-center justify-content-start mx-0 p-0 logo_filter lighter scale_hover">
                        <svg v-if="!languageState.eng_lan" xmlns="http://www.w3.org/2000/svg" width="28" height="40" fill="#212529" viewBox="0 -960 960 960">
                            <path d="M160-120v-66.67h640V-120H160Zm154-146.67q-64 0-109-44.66Q160-356 160-420v-420h653.33q27.5 0 47.09 19.58Q880-800.83 880-773.33v146.66q0 27.5-19.58 47.09Q840.83-560 813.33-560h-90.66v140q0 64-45 108.67-45 44.66-109 44.66H314Zm0-506.66h342-429.33H314Zm408.67 146.66h90.66v-146.66h-90.66v146.66ZM568.65-333.33q35.02 0 61.18-26.17Q656-385.67 656-420v-353.33H398V-746l71.33 58q1.34 1.33 8.67 17.33V-514q0 9.07-6.67 15.87-6.66 6.8-16.66 6.8h-154q-10 0-16.67-6.8-6.67-6.8-6.67-15.87v-156.67q0-3.33 8.67-17.33l72-58v-27.33H226.67V-420q0 34.33 26.5 60.5T314-333.33h254.65ZM358-773.33h40-40Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="40" fill="#212529" viewBox="0 -960 960 960">
                            <path d="M480-80 80-683.33q85.67-72 187.5-114.34Q369.33-840 480-840t212.5 42.17q101.83 42.16 187.5 114.5L480-80Zm0-119.33L791.33-668q-69.66-46.33-148.44-75.83-78.79-29.5-162.89-29.5-84.36 0-162.85 29.5-78.48 29.5-148.48 75.83L480-199.33Zm-106.63-364q23.63 0 40.13-16.54 16.5-16.54 16.5-40.17 0-23.63-16.54-40.13-16.54-16.5-40.17-16.5-23.62 0-40.12 16.54-16.5 16.54-16.5 40.17 0 23.63 16.54 40.13 16.53 16.5 40.16 16.5Zm106.67 210q23.63 0 40.13-16.54 16.5-16.54 16.5-40.17 0-23.63-16.54-40.13-16.54-16.5-40.17-16.5-23.63 0-40.13 16.54-16.5 16.54-16.5 40.17 0 23.63 16.54 40.13 16.54 16.5 40.17 16.5Zm1.96 154Z" />
                        </svg>
                    </button>
                </div>

                <!-- Hamburger — solo mobile -->
                <button class="hamburger_btn d-flex d-md-none" @click="toggleMenu" :aria-expanded="mobileMenuOpen" aria-label="Menu">
                    <svg class="ham-svg" :class="{ open: mobileMenuOpen }" width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="overflow:visible">
                        <path class="ham-top" d="M2 5H20"/>
                        <path class="ham-mid" d="M2 11H20"/>
                        <path class="ham-bot" d="M2 17H20"/>
                    </svg>
                </button>

            </div>
        </nav>

        <!-- Backdrop -->
        <Transition name="mob-backdrop">
            <div v-if="mobileMenuOpen" class="mob_menu_backdrop" @click="closeMenu"></div>
        </Transition>

        <!-- Menu mobile -->
        <Transition name="mob-menu">
            <div v-if="mobileMenuOpen" class="mob_menu">

                <!-- Navigazione -->
                <div class="mob_menu__section">
                    <router-link :to="{ name: 'home' }" class="mob_menu__item" @click="closeMenu"
                        :class="{ 'mob_menu__item--active': $route.name === 'home' }">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.06); color: #333;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"/></svg>
                        </span>
                        <span>Home</span>
                    </router-link>
                    <router-link :to="{ name: 'services' }" class="mob_menu__item" @click="closeMenu"
                        :class="{ 'mob_menu__item--active': $route.name === 'services' }">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.09); color: #444;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                        </span>
                        <span>{{ languageState.eng_lan ? 'Services' : 'Servizi' }}</span>
                    </router-link>
                    <router-link :to="{ name: 'about' }" class="mob_menu__item" @click="closeMenu"
                        :class="{ 'mob_menu__item--active': $route.name === 'about' }">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.07); color: #444;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        </span>
                        <span>{{ languageState.eng_lan ? 'About' : 'Chi sono' }}</span>
                    </router-link>
                    <router-link :to="{ name: 'contacts' }" class="mob_menu__item" @click="closeMenu"
                        :class="{ 'mob_menu__item--active': $route.name === 'contacts' }">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.07); color: #555;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </span>
                        <span>{{ languageState.eng_lan ? 'Contact' : 'Contatti' }}</span>
                    </router-link>
                </div>

                <!-- Social & utility -->
                <div class="mob_menu__section mob_menu__section--divided">
                    <a href="https://wa.me/3477952189?text=Buongiorno%2C%0Asono%20%5BNome%5D%20e%20vi%20contatto%20per%20avere%20informazioni%20sulla%20realizzazione%20di%20un%20sito%20web%20per%20la%20mia%20attivit%C3%A0.%0AResto%20in%20attesa%20di%20un%20vostro%20riscontro%2C%20grazie."
                        target="_blank" rel="noopener noreferrer" class="mob_menu__item" @click="closeMenu">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.06); color: #333;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </span>
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://www.linkedin.com/in/damiano-casolari/" target="_blank" rel="noopener noreferrer"
                        class="mob_menu__item" @click="closeMenu">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.08); color: #444;">
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                        </span>
                        <span>LinkedIn</span>
                    </a>
                    <button class="mob_menu__item" @click="toggleLang(); closeMenu()">
                        <span class="mob_menu__icon" style="background: rgba(0,0,0,0.06); color: #555;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        </span>
                        <span>{{ languageState.eng_lan ? 'Italiano' : 'English' }}</span>
                    </button>
                </div>

            </div>
        </Transition>

    </header>
</template>

<style lang="scss" scoped>
    nav.navbar {
        height: 40px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .nav-link span {
        font-size: 0.875rem;
        margin-inline: 6px;
        opacity: 0.55;
        transition: opacity 0.2s ease;
        &.selected_link { opacity: 1; }
    }

    .nav-link:hover span { opacity: 1; }

    .nav-icon-link {
        opacity: 0.45;
        transition: opacity 0.2s ease;
        &:hover { opacity: 1; }
        &--active { opacity: 1; }
    }

    .header_on {
        animation: on 0.3s linear forwards;
        pointer-events: auto;
    }

    .header_off {
        animation: off 0.3s linear forwards;
        pointer-events: none;
    }

    .header_shadow {
        filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.1));
        border-radius: 0 0 8px 8px;
        transition: border-radius 0.2s ease;
    }

    .header_shadow.mob_menu_active {
        border-radius: 0 0 0 8px;
    }

    .bg_color {
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.35);
    }

    // ─── HAMBURGER ───────────────────────────────────────────────────────────────

    .hamburger_btn {
        background: none;
        border: none;
        padding: 0.2rem;
        cursor: pointer;
        color: #212529;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s ease;
        &:hover { opacity: 0.6; }
    }

    .ham-svg {
        display: block;
        overflow: visible;
    }

    .ham-top, .ham-mid, .ham-bot {
        transform-box: fill-box;
        transform-origin: center;
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    }

    .ham-svg.open {
        .ham-top { transform: translateY(6px) rotate(45deg); }
        .ham-mid { transform: translateX(-18px); opacity: 0; }
        .ham-bot { transform: translateY(-6px) rotate(-45deg); }
    }

    // ─── BACKDROP ────────────────────────────────────────────────────────────────

    .mob_menu_backdrop {
        position: fixed;
        inset: 40px 0 0 0;
        z-index: 998;
        background: rgba(0, 0, 0, 0.22);
    }

    // ─── MENU MOBILE ─────────────────────────────────────────────────────────────

    .mob_menu {
        position: fixed;
        top: 40px;
        right: 0;
        bottom: 0;
        width: min(72vw, 280px);
        z-index: 999;
        background: rgba(250, 250, 250, 0.98);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        border-left: 1px solid rgba(0, 0, 0, 0.07);
        box-shadow: -8px 0 32px rgba(0, 0, 0, 0.13);
        padding: 0.5rem 0 1rem;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .mob_menu__section {
        padding: 0.1rem 0;
    }

    .mob_menu__section--divided {
        border-top: 1px solid rgba(0, 0, 0, 0.07);
        margin-top: 0.4rem;
        padding-top: 0.4rem;
    }

    .mob_menu__icon {
        width: 32px;
        height: 32px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: transform 0.15s ease;
    }

    .mob_menu__item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.78rem 1rem;
        text-decoration: none;
        color: #1a1a1a;
        font-weight: 400;
        font-size: 1.05rem;
        letter-spacing: 0.01em;
        border: none;
        background: none;
        width: calc(100% - 0.7rem);
        margin: 0 0.35rem;
        text-align: left;
        cursor: pointer;
        border-radius: 10px;
        transition: background 0.13s ease;

        &:hover {
            background: rgba(0, 0, 0, 0.045);
            .mob_menu__icon { transform: scale(1.06); }
        }

        &:active { background: rgba(0, 0, 0, 0.08); }

        &--active {
            background: rgba(0, 0, 0, 0.07);
            font-weight: 600;

            .mob_menu__icon {
                background: rgba(0, 0, 0, 0.13) !important;
            }

        }
    }

    // ─── TRANSIZIONI ─────────────────────────────────────────────────────────────

    .mob-menu-enter-active {
        transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, filter 0.3s ease;
    }
    .mob-menu-leave-active {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s ease;
    }
    .mob-menu-enter-from {
        transform: translateX(100%);
        opacity: 0;
        filter: blur(8px);
    }
    .mob-menu-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }
    .mob-menu-enter-to {
        filter: none;
    }

    .mob-backdrop-enter-active {
        transition: opacity 0.22s ease;
    }
    .mob-backdrop-leave-active {
        transition: opacity 0.18s ease;
    }
    .mob-backdrop-enter-from,
    .mob-backdrop-leave-to {
        opacity: 0;
    }

    @keyframes on {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    @keyframes off {
        from { opacity: 1; }
        to   { opacity: 0; }
    }
</style>
