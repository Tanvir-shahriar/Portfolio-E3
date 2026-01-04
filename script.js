const ventures = [
    { id: 1, name: 'Suborno IT', description: 'Tech solutions, digital transformation, accessibility, and innovation.', category: 'Tech' },
    { id: 2, name: 'Suborno Disability Initiative', description: 'Empowering individuals with disabilities through tech and inclusive services.', category: 'Tech' },
    { id: 3, name: 'Udvabon Science & Technology Club', description: 'Promoting STEM education and skills among youth.', category: 'Tech' },
    { id: 4, name: 'Green Life International School', description: 'Sustainable education with a focus on environmental awareness.', category: 'Education' },
    { id: 5, name: 'Kids Wave', description: 'Educational programs for underprivileged children.', category: 'Education' },
    { id: 6, name: 'Md. Emran Hossain Public Library', description: 'Promoting literacy and education in local communities.', category: 'Education' },
    { id: 7, name: "Jhenaidah Writers' Club", description: 'Supporting local writers and creative writing.', category: 'Education' },
    { id: 8, name: 'Jhenaidah Publications', description: 'Publishing literary works and preserving cultural heritage.', category: 'Education' },
    { id: 9, name: 'Emran Industries Limited', description: 'Industrial production, sustainability, and manufacturing innovation.', category: 'Agro' },
    { id: 10, name: 'Emran Dairy Farm', description: 'Sustainable dairy production and healthy products.', category: 'Agro' },
    { id: 11, name: 'Soptosongho Jubo Poribar', description: 'Empowering youth and families through community development.', category: 'Social' },
    { id: 12, name: 'Next Wave', description: 'Inspiring and educating the next generation of leaders.', category: 'Social' },
];

const categories = ['All', 'Tech', 'Education', 'Agro', 'Social'];
const categoryConfig = {
    Tech: { icon: 'cpu', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    Education: { icon: 'book-open', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
    Agro: { icon: 'sprout', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    Social: { icon: 'heart', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    All: { icon: 'layers', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
};

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function scrollToProjects() {
    const target = qs('#projects');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToAbout() {
    const target = qs('#about');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function setActive(element) {
    qsa('.menu-nav-link').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

window.scrollToProjects = scrollToProjects;
window.scrollToAbout = scrollToAbout;
window.setActive = setActive;

function initMenu() {
    const menuToggle = qs('#menu-toggle');
    const navbar = qs('#navbar');
    const overlay = qs('#overlay');
    const closeBtn = qs('#close-btn');
    const navLinks = qsa('.nav-link');

    if (!menuToggle || !navbar || !overlay || !closeBtn) {
        return;
    }

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            navbar.classList.remove('translate-x-full');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100');
            menuToggle.textContent = 'CLOSE';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        } else {
            navbar.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            menuToggle.textContent = 'MENU';
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    }

    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

function initSmoothAnchors() {
    qsa('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const target = qs(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initLucideIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

function initRevealAnimations() {
    const fadeElements = qsa('.fade-in-up, .animate-fade-in-left, .animate-fade-in-right');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.style.animationDelay || '0.2s';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => fadeObserver.observe(element));

    const slideInLeftElements = qsa('.slide-in-left');
    const slideInRightElements = qsa('.slide-in-right');
    const fadeInElements = qsa('.fade-in');
    const appearObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    slideInLeftElements.forEach(el => appearObserver.observe(el));
    slideInRightElements.forEach(el => appearObserver.observe(el));
    fadeInElements.forEach(el => appearObserver.observe(el));
}

function initBookSection() {
    const buttons = qsa('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
        button.addEventListener('mousedown', function () {
            this.style.transform = 'translateY(-1px)';
        });
    });

    const bookContainer = qs('.book-image-container');
    if (bookContainer) {
        setTimeout(() => {
            bookContainer.style.opacity = '1';
            bookContainer.style.transform = 'translateY(0)';
        }, 300);
    }
}

function initHeroScrollEffects() {
    const heroSection = qs('#home');
    const aboutSection = qs('#about');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= ((window.innerHeight || document.documentElement.clientHeight) * 0.3) && rect.bottom >= 0;
    }

    function updateActiveMenu() {
        const sections = qsa('#home, #about, #projects');
        const menuLinks = qsa('.menu-nav-link');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    function handleScroll() {
        if (heroSection && aboutSection) {
            if (isElementInViewport(aboutSection)) {
                heroSection.classList.remove('hero-normal');
                heroSection.classList.add('hero-fade');
            } else {
                heroSection.classList.remove('hero-fade');
                heroSection.classList.add('hero-normal');
            }
        }
        updateActiveMenu();
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

function initAwardsHover() {
    const awardCards = qsa('.award-card');
    awardCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initVenturesGrid() {
    let activeCategory = 'All';
    let showAll = false;

    const filterContainer = qs('#filter-container');
    const gridContainer = qs('#ventures-grid');
    const showMoreContainer = qs('#show-more-container');
    const showAllBtn = qs('#show-all-btn');

    if (!filterContainer || !gridContainer || !showMoreContainer || !showAllBtn) {
        return;
    }

    function getVisibleCount() {
        return window.innerWidth >= 768 ? 6 : 3;
    }

    function renderButtons() {
        filterContainer.innerHTML = categories.map(cat => {
            const isActive = activeCategory === cat;
            const activeClasses = 'bg-slate-800 text-white shadow-lg shadow-slate-300/50 scale-105';
            const inactiveClasses = 'text-slate-500 hover:text-slate-800 hover:bg-white/80';

            return `
                <button 
                    onclick="setCategory('${cat}')"
                    class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? activeClasses : inactiveClasses}"
                >
                    ${cat}
                </button>
            `;
        }).join('');
    }

    function renderGrid() {
        const filtered = activeCategory === 'All'
            ? ventures
            : ventures.filter(v => v.category === activeCategory);

        const currentLimit = showAll ? filtered.length : getVisibleCount();
        const displayed = filtered.slice(0, currentLimit);

        gridContainer.innerHTML = displayed.map(venture => {
            const config = categoryConfig[venture.category];

            return `
                <div class="grid-item group relative h-full glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500"
                     onmousemove="handleMouseMove(event, this)">
                    <div class="card-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div class="relative z-10 p-8 flex flex-col h-full">
                        <div class="flex justify-between items-start mb-6">
                            <div class="p-3 rounded-2xl ${config.bg} ${config.border} border shadow-inner">
                                <i data-lucide="${config.icon}" class="w-6 h-6 ${config.color}"></i>
                            </div>
                            <span class="text-xs font-bold font-mono text-slate-400 bg-white/80 px-2 py-1 rounded border border-slate-100">
                                0${venture.id}
                            </span>
                        </div>
                        <h3 class="font-display text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                            ${venture.name}
                        </h3>
                        <p class="text-slate-500 leading-relaxed text-sm flex-grow font-medium">
                            ${venture.description}
                        </p>
                        <div class="mt-6 pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
                            ${venture.category}
                            <div class="ml-auto overflow-hidden w-5 h-5 relative">
                                 <i data-lucide="arrow-up-right" class="w-5 h-5 absolute inset-0 text-slate-800 translate-y-full -translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-300"></i>
                                 <i data-lucide="arrow-right" class="w-5 h-5 absolute inset-0 text-slate-300 group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        initLucideIcons();

        qsa('.grid-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 70);
        });

        if (filtered.length > getVisibleCount() && !showAll) {
            showMoreContainer.classList.remove('hidden');
            showMoreContainer.classList.add('flex');
        } else {
            showMoreContainer.classList.add('hidden');
            showMoreContainer.classList.remove('flex');
        }
    }

    function handleMouseMove(event, card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }

    window.handleMouseMove = handleMouseMove;
    window.setCategory = (category) => {
        if (activeCategory === category) return;
        activeCategory = category;
        showAll = false;
        renderButtons();

        qsa('.grid-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
        });

        setTimeout(renderGrid, 300);
    };

    showAllBtn.addEventListener('click', () => {
        showAll = true;
        renderGrid();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!showAll) {
                renderGrid();
            }
        }, 100);
    });

    renderButtons();
    renderGrid();
}

function initSlideshow() {
    const container = qs('#slideshow');
    if (!container) {
        return;
    }

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80',
            title: 'Digital Workspace',
            description: 'Clean code, modern tools, endless possibilities'
        },
        {
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
            title: 'Architectural Vision',
            description: 'Where form meets function in perfect harmony'
        },
        {
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
            title: 'Natural Serenity',
            description: 'Finding inspiration in the untouched wilderness'
        },
        {
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
            title: 'Product Design',
            description: 'Minimalist elegance in every detail'
        }
    ];

    const autoplayInterval = 6000;
    let currentSlide = 0;
    let isPaused = false;
    let progress = 0;

    const chevronLeft = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
    const chevronRight = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

    slides.forEach((slide, index) => {
        const slideEl = document.createElement('div');
        slideEl.className = `slide ${index === 0 ? 'active' : ''}`;
        slideEl.setAttribute('aria-hidden', index !== 0);
        slideEl.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}" class="slide-image" ${index === 0 ? '' : 'loading="lazy"'}>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <h2 class="slide-title">${slide.title}</h2>
                <p class="slide-description">${slide.description}</p>
            </div>
        `;
        container.appendChild(slideEl);
    });

    const navArrows = document.createElement('div');
    navArrows.className = 'nav-arrows';
    navArrows.innerHTML = `
        <button class="nav-arrow" id="prevBtn" aria-label="Previous slide">${chevronLeft}</button>
        <button class="nav-arrow" id="nextBtn" aria-label="Next slide">${chevronRight}</button>
    `;
    container.appendChild(navArrows);

    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    counter.id = 'slideCounter';
    counter.innerHTML = `<span>01</span><span class="mx-2">/</span><span>${String(slides.length).padStart(2, '0')}</span>`;
    container.appendChild(counter);

    const navDots = document.createElement('div');
    navDots.className = 'nav-dots';
    navDots.setAttribute('role', 'tablist');
    navDots.setAttribute('aria-label', 'Slide navigation');
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0);
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        navDots.appendChild(dot);
    });
    container.appendChild(navDots);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-bar-fill" id="progressFill"></div>';
    container.appendChild(progressBar);

    const prevBtn = qs('#prevBtn', container);
    const nextBtn = qs('#nextBtn', container);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    container.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') prevSlide();
        if (event.key === 'ArrowRight') nextSlide();
    });

    function updateSlide() {
        const slideEls = qsa('.slide', container);
        const dotEls = qsa('.nav-dot', container);

        slideEls.forEach((el, index) => {
            el.classList.toggle('active', index === currentSlide);
            el.setAttribute('aria-hidden', index !== currentSlide);
        });

        dotEls.forEach((el, index) => {
            el.classList.toggle('active', index === currentSlide);
            el.setAttribute('aria-selected', index === currentSlide);
        });

        counter.innerHTML = `
            <span>${String(currentSlide + 1).padStart(2, '0')}</span>
            <span class="mx-2">/</span>
            <span>${String(slides.length).padStart(2, '0')}</span>
        `;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        progress = 0;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        progress = 0;
        updateSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        progress = 0;
        updateSlide();
    }

    function startAutoplay() {
        setInterval(() => {
            if (isPaused) return;

            progress += (100 / (autoplayInterval / 50));
            const fill = qs('#progressFill', container);
            if (fill) {
                fill.style.width = `${progress}%`;
            }

            if (progress >= 100) {
                nextSlide();
                progress = 0;
            }
        }, 50);
    }

    startAutoplay();
}

function initFooter() {
    const year = qs('#year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    function updateTime() {
        const now = new Date();
        const localTime = qs('#localTime');
        if (localTime) {
            localTime.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
        }
    }

    updateTime();
    setInterval(updateTime, 60000);

    window.copyEmail = () => {
        navigator.clipboard.writeText('info@emran.com').then(() => {
            const status = qs('#copyStatus');
            if (status) {
                status.style.opacity = '1';
                setTimeout(() => {
                    status.style.opacity = '0';
                }, 2000);
            }
        });
    };

    const contactForm = qs('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const btn = this.querySelector('button');
            if (!btn) {
                return;
            }
            const originalHTML = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.classList.replace('bg-slate-200', 'bg-orange-500');
            btn.classList.add('text-white');

            setTimeout(() => {
                alert('Message sent!');
                this.reset();
                btn.innerHTML = originalHTML;
                btn.classList.replace('bg-orange-500', 'bg-slate-200');
                btn.classList.remove('text-white');
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initSmoothAnchors();
    initLucideIcons();
    initRevealAnimations();
    initBookSection();
    initHeroScrollEffects();
    initAwardsHover();
    initVenturesGrid();
    initSlideshow();
    initFooter();
});
