// Netflix-like Preloader Fade-out
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 2000); // 2.0s delay matching the loading animation
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 0. Swiper Init (moved from index.html)
    if (typeof Swiper !== 'undefined') {
        const swipers = document.querySelectorAll('.trendingSwiper');
        swipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                slidesPerView: 'auto',
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { slidesPerView: 1.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                }
            });
        });

        const originalsSwipers = document.querySelectorAll('.originalsSwiper');
        originalsSwipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                slidesPerView: 'auto',
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { slidesPerView: 1.2 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 4.5 },
                }
            });
        });

        // Upcoming Swiper
        const upcomingSwipers = document.querySelectorAll('.upcomingSwiper');
        upcomingSwipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                slidesPerView: 'auto',
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { centeredSlides: true },
                    768: { centeredSlides: false }
                }
            });
        });

        // Top 10 Swiper
        const top10Swipers = document.querySelectorAll('.top10Swiper');
        top10Swipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                slidesPerView: 'auto',
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { slidesPerView: 1.2 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 4.5 }
                }
            });
        });
        
        // Suggested Swiper
        const suggestedSwipers = document.querySelectorAll('.suggestedSwiper');
        suggestedSwipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                slidesPerView: 'auto',
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { slidesPerView: 1.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 6 }
                }
            });
        });
        
        // Cinematic Hero Swiper Layout (Horizontal bottom-right thumb carousel)
        if(document.querySelector('.heroThumbSwiper')) {
            const heroBgSwiper = new Swiper('.heroBgSwiper', {
                effect: 'fade',
                fadeEffect: { crossFade: true },
                allowTouchMove: false
            });

            const heroContentSwiper = new Swiper('.heroContentSwiper', {
                effect: 'fade',
                fadeEffect: { crossFade: true },
                allowTouchMove: false
            });

            const isMobileView = window.innerWidth <= 991;
            const heroThumbSwiper = new Swiper('.heroThumbSwiper', {
                slidesPerView: 'auto',
                spaceBetween: 15,
                watchSlidesProgress: true,
                slideToClickedSlide: true,
                loop: true,
                autoplay: isMobileView ? false : {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.custom-hero-arrow.next',
                    prevEl: '.custom-hero-arrow.prev',
                }
            });

            if (isMobileView) {
                setTimeout(() => {
                    heroThumbSwiper.slideToLoop(2, 0);
                }, 50);
            }

            // Synchronize Content, Background and Thumbnails
            heroThumbSwiper.on('slideChange', function() {
                const activeIndex = heroThumbSwiper.realIndex % 5;
                heroBgSwiper.slideTo(activeIndex);
                heroContentSwiper.slideTo(activeIndex);

                // Add active outline to thumb slide
                document.querySelectorAll('.hero-thumb-slide').forEach((slide, idx) => {
                    const slideIndex = parseInt(slide.getAttribute('data-swiper-slide-index') || idx);
                    if ((slideIndex % 5) === activeIndex) {
                        slide.classList.add('swiper-slide-thumb-active');
                    } else {
                        slide.classList.remove('swiper-slide-thumb-active');
                    }
                });

                // GSAP text entry reveal
                const activeSlide = heroContentSwiper.slides[activeIndex];
                if (activeSlide) {
                    const elements = Array.from(activeSlide.querySelectorAll('.hero-anim'));
                    gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
                    );
                }
            });
        }

        // Featured Showcase Swipers
        if(document.querySelector('.custom-thumb-slider')) {
            const showcaseBgImages = [
                "Images/radha krishan.webp",
                "Images/BREAKING%20BAD.webp",
                "Images/dune.webp",
                "Images/300.webp",
                "Images/INCEPTION.webp",
                "Images/Black%20panther.webp"
            ];

            const showcaseContentSwiper = new Swiper('.showcaseContentSwiper', {
                effect: 'fade',
                fadeEffect: { crossFade: true },
                allowTouchMove: false,
                observer: true,
                observeParents: true
            });

            // Sync backgrounds to content
            showcaseContentSwiper.on('slideChange', function() {
                const activeIdx = showcaseContentSwiper.activeIndex;
                
                // Update the background layer directly
                const bgLayer = document.querySelector('.featured-showcase-bg-layer');
                if (bgLayer) {
                    bgLayer.style.backgroundImage = `linear-gradient(to right, rgba(5,5,5,0.92) 30%, rgba(5,5,5,0.7) 60%, rgba(5,5,5,0.15) 100%), url('${showcaseBgImages[activeIdx]}')`;
                }

                document.querySelectorAll('.custom-thumb-slide').forEach((s, i) => {
                    if (i === activeIdx) s.classList.add('active');
                    else s.classList.remove('active');
                });

                // GSAP Staggered Text Reveal
                const activeSlide = showcaseContentSwiper.slides[activeIdx];
                if(activeSlide) {
                    const elements = Array.from(activeSlide.children);
                    gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
                    );
                }
            });
            
            // GSAP Custom Thumb Slider
            const sliderEl = document.querySelector('.custom-thumb-slider');
            const slides = gsap.utils.toArray('.custom-thumb-slide');
            const totalSlides = slides.length;
            const visibleCount = 3;
            let currentStart = 0;       // which index is at the top of the visible window
            let selectedCard = 0;        // which card is "active" (highlighted)
            const gap = 15;
            const sliderHeight = sliderEl.clientHeight || 520;
            const slideHeight = (sliderHeight - (gap * (visibleCount - 1))) / visibleCount;

            // Position all slides absolutely
            gsap.set(slides, {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: slideHeight,
                opacity: 0,
                y: (i) => i * (slideHeight + gap),
                pointerEvents: 'none'
            });

            function setActiveCard(idx) {
                selectedCard = idx;
                // Sync content swiper; the slideChange event handler will sync background and active state
                showcaseContentSwiper.slideTo(idx);
            }

            function renderSlider(animate) {
                const dur = animate ? 0.7 : 0;
                const ease = 'power3.inOut';

                slides.forEach((slide, i) => {
                    const relIdx = i - currentStart;
                    if (relIdx >= 0 && relIdx < visibleCount) {
                        // Visible
                        gsap.to(slide, {
                            y: relIdx * (slideHeight + gap),
                            opacity: 1,
                            duration: dur,
                            ease: ease,
                            pointerEvents: 'auto'
                        });
                    } else if (relIdx < 0) {
                        // Hidden above
                        gsap.to(slide, {
                            y: -slideHeight,
                            opacity: 0,
                            duration: dur,
                            ease: ease,
                            pointerEvents: 'none'
                        });
                    } else {
                        // Hidden below
                        gsap.to(slide, {
                            y: visibleCount * (slideHeight + gap),
                            opacity: 0,
                            duration: dur,
                            ease: ease,
                            pointerEvents: 'none'
                        });
                    }
                });

                // Arrow states based on selectedCard selection
                const upArrow = document.querySelector('.custom-nav-arrow.up');
                const downArrow = document.querySelector('.custom-nav-arrow.down');

                if (selectedCard <= 0) {
                    gsap.to(upArrow, { opacity: 0.3, duration: 0.3 });
                    upArrow.style.pointerEvents = 'none';
                } else {
                    gsap.to(upArrow, { opacity: 1, duration: 0.3 });
                    upArrow.style.pointerEvents = 'auto';
                }

                if (selectedCard >= totalSlides - 1) {
                    gsap.to(downArrow, { opacity: 0.3, duration: 0.3 });
                    downArrow.style.pointerEvents = 'none';
                } else {
                    gsap.to(downArrow, { opacity: 1, duration: 0.3 });
                    downArrow.style.pointerEvents = 'auto';
                }
            }

            // Click on a thumb card to select it
            slides.forEach((slide, i) => {
                slide.addEventListener('click', () => {
                    setActiveCard(i);
                    renderSlider(true);
                });
            });

            // DOWN arrow: scroll list up, select next card
            document.querySelector('.custom-nav-arrow.down').addEventListener('click', () => {
                if (selectedCard < totalSlides - 1) {
                    selectedCard++;
                    if (currentStart < totalSlides - visibleCount) {
                        currentStart++;
                    }
                    renderSlider(true);
                    setActiveCard(selectedCard);
                }
            });

            // UP arrow: scroll list down, select previous card
            document.querySelector('.custom-nav-arrow.up').addEventListener('click', () => {
                if (selectedCard > 0) {
                    selectedCard--;
                    if (currentStart > 0 && selectedCard < currentStart) {
                        currentStart--;
                    }
                    renderSlider(true);
                    setActiveCard(selectedCard);
                }
            });

            // Initial render
            renderSlider(false);
            setActiveCard(0);
        }
    }

    // 0.5 Initialize Vanilla Tilt for 3D card hover effects
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".movie-card, .category-card, .feature-card, .plan-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- 1. Header Blur on Scroll ---
        const header = document.querySelector('.site-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // --- 2. Hero Section Animation ---
        const heroTl = gsap.timeline();

        // Zoom out background slightly
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroTl.fromTo('.hero-bg', 
                { scale: 1.15, filter: 'brightness(0.5)' },
                { scale: 1, filter: 'brightness(1)', duration: 2.5, ease: 'power3.out' }
            );
        }

        // Hero Split Text GSAP
        const title = document.querySelector('.split-text');
        if (title) {
            const text = title.textContent;
            title.innerHTML = '';
            [...text].forEach(char => {
                title.innerHTML += `<span style="display:inline-block; opacity:0; transform:translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`;
            });
            heroTl.to('.split-text span', {y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)"}, "-=2");
        }

        // Fade in other hero elements
        const heroElements = document.querySelectorAll('.hero-desc, .hero-actions, .badge');
        if (heroElements.length > 0) {
            heroTl.fromTo(heroElements,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
                "-=1.5"
            );
        }

        // --- 3. PURE CSS SCROLL ANIMATIONS (IntersectionObserver) ---
        // Instead of GSAP ScrollTrigger, we use browser-native IntersectionObserver + CSS transitions.
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-visible');
                    if (entry.target.classList.contains('anim-stagger')) {
                        Array.from(entry.target.children).forEach(child => child.classList.add('anim-visible'));
                    }
                    // Unobserve after animating so it doesn't trigger again (prevents "2 times scroll" jump)
                    animObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply animations based on elements
        // Section Titles -> Fade Right
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('anim-fade-right');
            animObserver.observe(el);
        });

        // Grids/Containers -> Staggered Fade Up
        document.querySelectorAll('.categories-grid, #watchlistGrid, .plans-grid, .team-grid, .subscription-cards, .news-grid').forEach(group => {
            group.classList.add('anim-stagger');
            [...group.children].forEach(child => child.classList.add('anim-fade-up'));
            animObserver.observe(group);
        });

        // Specific Cards -> Zoom In
        document.querySelectorAll('.plan-card, .feature-card, .stat-card, .movie-of-year-card').forEach(el => {
            if (!el.closest('.anim-stagger')) {
                el.classList.add('anim-zoom-in');
                animObserver.observe(el);
            }
        });

        // Movie/Category Cards (not in grid) -> Fade Up
        document.querySelectorAll('.movie-card, .category-card, .news-card').forEach(el => {
            if (!el.closest('.anim-stagger')) {
                el.classList.add('anim-fade-up');
                animObserver.observe(el);
            }
        });

        // Numbered Items & Episode Cards -> Fade Left
        document.querySelectorAll('.numbered-item, .episode-card').forEach(el => {
            el.classList.add('anim-fade-left');
            animObserver.observe(el);
        });

        // Images -> Alternating Left/Right
        document.querySelectorAll('section img:not(.cinematic-img):not([id="heroBlurBg"]):not([id="heroActiveImg"])').forEach((el, index) => {
            el.classList.add(index % 2 === 0 ? 'anim-fade-left' : 'anim-fade-right');
            animObserver.observe(el);
        });

        // Footer -> Fade Up
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.classList.add('anim-fade-up');
            animObserver.observe(footerContent);
        }

        // --- 5. Mouse Parallax for Hero Background ---
        const heroSection = document.querySelector('.hero');
        if (heroSection && heroBg) {
            heroSection.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20; 
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                gsap.to(heroBg, { x: -x, y: -y, duration: 1, ease: 'power2.out' });
            });
        }

        // --- 6. Magnetic Buttons Effect ---
        const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .social-btn');
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }
});


// === TRENDING DRAWER SECTION LOGIC ===
const trendingShowData = {
    1: {
        title: "Dune",
        seasons: "Movie",
        date: "October 2021",
        rank: "#1 in Movies Today",
        desc: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
        bgImage: "Images/dune.webp",
        episodes: {
            1: [
                { num: "01", title: "Part One: The Departure", meta: "Oct 22, 2021 &bull; 155 min", img: "Images/dune.webp" },
                { num: "02", title: "Part Two: The Journey", meta: "Oct 22, 2021 &bull; 45 min", img: "Images/dune.webp" },
                { num: "03", title: "Part Three: The Desert", meta: "Oct 22, 2021 &bull; 50 min", img: "Images/dune.webp" },
                { num: "04", title: "Part Four: The Fremen", meta: "Oct 22, 2021 &bull; 42 min", img: "Images/dune.webp" },
                { num: "05", title: "Part Five: The Prophecy", meta: "Oct 22, 2021 &bull; 55 min", img: "Images/dune.webp" }
            ]
        }
    },
    2: {
        title: "Stranger Things",
        seasons: "4 Seasons",
        date: "May 2022",
        rank: "#3 in Series Today",
        desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        bgImage: "Images/stranger things.webp",
        episodes: {
            1: [
                { num: "01", title: "Chapter One: The Vanishing of Will Byers", meta: "Jul 15, 2016 &bull; 47 min", img: "Images/stranger things.webp" },
                { num: "02", title: "Chapter Two: The Weirdo on Maple Street", meta: "Jul 15, 2016 &bull; 55 min", img: "Images/stranger things.webp" },
                { num: "03", title: "Chapter Three: Holly, Jolly", meta: "Jul 15, 2016 &bull; 52 min", img: "Images/stranger things.webp" },
                { num: "04", title: "Chapter Four: The Body", meta: "Jul 15, 2016 &bull; 50 min", img: "Images/stranger things.webp" },
                { num: "05", title: "Chapter Five: The Flea and the Acrobat", meta: "Jul 15, 2016 &bull; 53 min", img: "Images/stranger things.webp" }
            ],
            2: [
                { num: "01", title: "Chapter One: MADMAX", meta: "Oct 27, 2017 &bull; 48 min", img: "Images/stranger things.webp" },
                { num: "02", title: "Chapter Two: Trick or Treat, Freak", meta: "Oct 27, 2017 &bull; 56 min", img: "Images/stranger things.webp" },
                { num: "03", title: "Chapter Three: The Pollywog", meta: "Oct 27, 2017 &bull; 51 min", img: "Images/stranger things.webp" },
                { num: "04", title: "Chapter Four: Will the Wise", meta: "Oct 27, 2017 &bull; 46 min", img: "Images/stranger things.webp" },
                { num: "05", title: "Chapter Five: Dig Dug", meta: "Oct 27, 2017 &bull; 58 min", img: "Images/stranger things.webp" }
            ]
        }
    },
    3: {
        title: "The Lion King",
        seasons: "Movie",
        date: "July 2019",
        rank: "#2 in Movies Today",
        desc: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
        bgImage: "Images/The Lion king.webp",
        episodes: {
            1: [
                { num: "01", title: "Full Movie", meta: "Jul 19, 2019 &bull; 118 min", img: "Images/The Lion king.webp" },
                { num: "02", title: "Behind the Scenes", meta: "Jul 19, 2019 &bull; 45 min", img: "Images/The Lion king.webp" },
                { num: "03", title: "The Making of the Pride Lands", meta: "Jul 19, 2019 &bull; 50 min", img: "Images/The Lion king.webp" },
                { num: "04", title: "Cast Interviews", meta: "Jul 19, 2019 &bull; 42 min", img: "Images/The Lion king.webp" },
                { num: "05", title: "Deleted Scenes", meta: "Jul 19, 2019 &bull; 25 min", img: "Images/The Lion king.webp" }
            ]
        }
    },
    4: {
        title: "Inception",
        seasons: "Movie",
        date: "July 2010",
        rank: "#4 in Movies Today",
        desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        bgImage: "Images/INCEPTION (2).webp",
        episodes: {
            1: [
                { num: "01", title: "Full Movie", meta: "Jul 16, 2010 &bull; 148 min", img: "Images/INCEPTION (2).webp" },
                { num: "02", title: "The Dream is Real", meta: "Jul 16, 2010 &bull; 45 min", img: "Images/INCEPTION (2).webp" },
                { num: "03", title: "Building the Architecture", meta: "Jul 16, 2010 &bull; 50 min", img: "Images/INCEPTION (2).webp" },
                { num: "04", title: "Zero Gravity Stunts", meta: "Jul 16, 2010 &bull; 42 min", img: "Images/INCEPTION (2).webp" },
                { num: "05", title: "Hans Zimmer Soundtrack featurette", meta: "Jul 16, 2010 &bull; 35 min", img: "Images/INCEPTION (2).webp" }
            ]
        }
    },
    5: {
        title: "Movie of the Year",
        seasons: "Movie",
        date: "December 2023",
        rank: "#5 in Movies Today",
        desc: "Experience the most anticipated cinematic event of the year, bringing together incredible visuals, deep storytelling, and unforgettable moments.",
        bgImage: "Images/Movieof-the-year-1536x864.webp",
        episodes: {
            1: [
                { num: "01", title: "Part One: The Awakening", meta: "Dec 15, 2023 &bull; 45 min", img: "Images/Movieof-the-year-1536x864.webp" },
                { num: "02", title: "Part Two: The Rising Threat", meta: "Dec 15, 2023 &bull; 48 min", img: "Images/Movieof-the-year-1536x864.webp" },
                { num: "03", title: "Part Three: City in Ruins", meta: "Dec 15, 2023 &bull; 50 min", img: "Images/Movieof-the-year-1536x864.webp" },
                { num: "04", title: "Part Four: Retaliation", meta: "Dec 15, 2023 &bull; 42 min", img: "Images/Movieof-the-year-1536x864.webp" },
                { num: "05", title: "Part Five: The Aftermath", meta: "Dec 15, 2023 &bull; 55 min", img: "Images/Movieof-the-year-1536x864.webp" }
            ]
        }
    }
};

let currentTrendingId = 3;
let currentSelectedSeason = 1;

function selectTrending(id) {
    currentTrendingId = id;
    
    // Update active class on mini-cards
    document.querySelectorAll('.trending-mini-card').forEach(card => {
        if (parseInt(card.getAttribute('data-id')) === id) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    const data = trendingShowData[id];
    if (!data) return;

    // Fade transition background image
    const drawer = document.getElementById('trendingDrawer');
    if (drawer) {
        drawer.style.backgroundImage = `url('${data.bgImage}')`;
        drawer.style.backgroundPosition = data.bgPosition || 'center center';
    }

    // Update Overview content
    const titleEl = document.getElementById('drawerTitle');
    const metaEl = document.getElementById('drawerMeta');
    const rankEl = document.getElementById('drawerRank');
    const descEl = document.getElementById('drawerDesc');

    if (titleEl) titleEl.innerText = data.title;
    if (metaEl) {
        metaEl.innerHTML = `
            <span>${data.seasons}</span>
            <span>&bull;</span>
            <span><i class="far fa-calendar-alt"></i> ${data.date}</span>
        `;
    }
    if (rankEl) rankEl.innerText = data.rank;
    if (descEl) descEl.innerText = data.desc;

    // Reset Season dropdown and update Episodes tab
    const seasonSelect = document.querySelector('.drawer-season-select');
    if (seasonSelect) {
        seasonSelect.innerHTML = '';
        Object.keys(data.episodes).forEach(s => {
            seasonSelect.innerHTML += `<option value="${s}">Season ${s}</option>`;
        });
    }
    
    currentSelectedSeason = 1;
    if (data.episodes && data.episodes[1]) {
        renderDrawerEpisodes(data.episodes[1]);
    }
}

function renderDrawerEpisodes(episodeList) {
    const listContainer = document.getElementById('drawerEpisodesList');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    if (!episodeList) return;
    
    episodeList.forEach(ep => {
        listContainer.innerHTML += `
            <div class="drawer-ep-card" onclick="window.location.href='404.html'">
                <div class="drawer-ep-badge">${ep.num}</div>
                <img src="${ep.img}" alt="${ep.title}">
                <div class="drawer-ep-overlay">
                    <div class="drawer-ep-info-left">
                        <h4 class="drawer-ep-title-text">${ep.title}</h4>
                        <span class="drawer-ep-meta-text">${ep.meta}</span>
                    </div>
                    <button class="drawer-ep-watch-btn">Watch Now</button>
                </div>
            </div>
        `;
    });
}

function changeDrawerSeason(val) {
    currentSelectedSeason = parseInt(val);
    const data = trendingShowData[currentTrendingId];
    if (data && data.episodes[currentSelectedSeason]) {
        renderDrawerEpisodes(data.episodes[currentSelectedSeason]);
    }
}

function switchDrawerTab(tab) {
    const btnOverview = document.getElementById('btn-overview');
    const btnEpisodes = document.getElementById('btn-episodes');

    if (tab === 'overview') {
        if (btnOverview) btnOverview.classList.add('active');
        if (btnEpisodes) btnEpisodes.classList.remove('active');
        document.getElementById('drawer-overview').style.display = 'block';
        document.getElementById('drawer-episodes').style.display = 'none';
    } else {
        if (btnOverview) btnOverview.classList.remove('active');
        if (btnEpisodes) btnEpisodes.classList.add('active');
        document.getElementById('drawer-overview').style.display = 'none';
        document.getElementById('drawer-episodes').style.display = 'block';
    }
}

// Set initial view on load
window.addEventListener('DOMContentLoaded', () => {
    selectTrending(3);
});

// Mobile menu toggle logic matching C:\Users\Samyuktha\OneDrive\Desktop\themeeeteeep
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const siteHeader = document.querySelector('.site-header');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            if (siteHeader) {
                siteHeader.classList.toggle('menu-open');
            }
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
});

