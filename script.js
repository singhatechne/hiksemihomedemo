document.addEventListener('DOMContentLoaded', () => {
   
    // Mobile menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMobile = document.getElementById('closeMobileMenu');

    function openMobile() {
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMobileMenuFn() {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
        document.querySelectorAll('.mobile-submenu').forEach(sub => sub.classList.remove('open'));
    }
    if (mobileBtn) {
        mobileBtn.addEventListener('click', openMobile);
        closeMobile.addEventListener('click', closeMobileMenuFn);
        menuOverlay.addEventListener('click', closeMobileMenuFn);
    }

    // Mobile dropdown triggers
    const mobileTriggers = document.querySelectorAll('.mobile-nav-trigger');
    mobileTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.dataset.target;
            if (!target) return;
            const submenu = document.getElementById(`submenu-${target}`);
            const icon = trigger.querySelector('.dropdown-icon');
            if (submenu) {
                submenu.classList.toggle('open');
                if (icon) icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });

    // Hero carousel
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    let isAnimating = false;

    function showSlide(newIndex, direction = 'next') {
        if (isAnimating) return;
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;
        if (newIndex === currentSlide) return;

        isAnimating = true;
        const current = slides[currentSlide];
        const next = slides[newIndex];

        slides.forEach(s => s.classList.remove('incoming-next', 'incoming-prev', 'outgoing-next', 'outgoing-prev'));

        if (direction === 'next') {
            current.classList.add('outgoing-next');
            next.classList.add('incoming-next');
        } else {
            current.classList.add('outgoing-prev');
            next.classList.add('incoming-prev');
        }
        
        setTimeout(() => {
            next.classList.add('active');
        }, 20);

        setTimeout(() => {
            slides.forEach(s => s.classList.remove('incoming-next', 'incoming-prev', 'outgoing-next', 'outgoing-prev'));
            current.classList.remove('active');
            currentSlide = newIndex;
            isAnimating = false;
        }, 850);

        dots.forEach((dot, i) => {
            if (i === newIndex) {
                dot.classList.add('active', 'text-white');
            } else {
                dot.classList.remove('active', 'text-white');
            }
        });
    }

    function nextSlide() { showSlide(currentSlide + 1, 'next'); }
    function prevSlide() { showSlide(currentSlide - 1, 'prev'); }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    setInterval(() => { if (!isAnimating) nextSlide(); }, 4000);

    // Desktop mega menu
    const megaMenu = document.getElementById('mega-menu');
    const navTriggers = document.querySelectorAll('.nav-trigger');
    const menuList = document.getElementById('menu-list');
    const categoryLabel = document.getElementById('menu-category-label');
    const menuData = {
        products: { label: "HIKSEMI Storage", items: ["Industrial SSDs", "Surveillance Cards", "Data Center SSDs", "Embedded Storage", "Consumer Drives"] },
        solutions: { label: "Applications", items: ["Industrial Control", "Video Surveillance", "Data Centers", "Consumer Electronics"] },
        support: { label: "Customer Service", items: ["Overview", "Firmware Updates", "Warranty Status", "Technical Support"] },
        company: { label: "About HIKSEMI", items: ["Brand Story", "Certifications", "Newsroom", "Contact Us"] }
    };
    
    function clearActiveTriggers() { navTriggers.forEach(btn => btn.classList.remove('active-mega')); }

    navTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = btn.dataset.target;
            if (!target) {
                megaMenu.classList.add('opacity-0', '-translate-y-2');
                setTimeout(() => megaMenu.classList.add('hidden'), 300);
                clearActiveTriggers();
                return;
            }
            const data = menuData[target];
            if (data) {
                categoryLabel.textContent = data.label;
                menuList.innerHTML = data.items.map(item => `<li class="group cursor-pointer"><span class="text-2xl font-medium block group-hover:translate-x-2 transition-transform">${item}</span></li>`).join('');
                megaMenu.classList.remove('hidden');
                setTimeout(() => megaMenu.classList.remove('opacity-0', '-translate-y-2'), 10);
                clearActiveTriggers();
                btn.classList.add('active-mega');
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!megaMenu.contains(e.target) && !e.target.classList.contains('nav-trigger')) {
            megaMenu.classList.add('opacity-0', '-translate-y-2');
            setTimeout(() => megaMenu.classList.add('hidden'), 300);
            clearActiveTriggers();
        }
    });

    // Nav scroll effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('bg-white/70', 'backdrop-blur-xl', 'shadow-md');
        else nav.classList.remove('bg-white/70', 'backdrop-blur-xl', 'shadow-md');
    });

    // JOURNEY CARD HOVER EFFECT 
    const journeyRows = document.querySelectorAll('.journey-row');
    
    function resetRowClasses(row) {
        row.classList.remove('hovered');
        row.querySelectorAll('.journey-card').forEach(card => {
            card.classList.remove('hovered', 'hovered-adjacent');
        });
    }
    
    journeyRows.forEach(row => {
        const cards = Array.from(row.querySelectorAll('.journey-card'));
        
        cards.forEach((card, idx) => {
            card.addEventListener('mouseenter', function() {
                resetRowClasses(row);
                
                row.classList.add('hovered');
                this.classList.add('hovered');
                
                const prev = cards[idx - 1];
                const next = cards[idx + 1];
                if (prev) prev.classList.add('hovered-adjacent');
                if (next) next.classList.add('hovered-adjacent');
            });
            
            card.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!row.matches(':hover')) {
                        resetRowClasses(row);
                    }
                }, 50);
            });
        });
        
        row.addEventListener('mouseleave', function() {
            resetRowClasses(row);
        });
    });
    
    // Mobile card pagination
    const journeyGrid = document.getElementById('journeyGrid');
    const allCards = document.querySelectorAll('.journey-card');
    const paginationContainer = document.getElementById('mobileCardPagination');
    
    if (window.innerWidth <= 768 && paginationContainer) {
        const totalCards = allCards.length;
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot-indicator');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                const card = allCards[i];
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                }
            });
            paginationContainer.appendChild(dot);
        }
        
        journeyGrid.addEventListener('scroll', () => {
            const scrollLeft = journeyGrid.scrollLeft;
            const cardWidth = allCards[0]?.offsetWidth || 0;
            const activeIndex = Math.round(scrollLeft / (cardWidth + 16));
            document.querySelectorAll('.dot-indicator').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIndex);
            });
        });
    }

    let videos = [
        { 
            id: 'Lu5VOe1FOco',
            type: 'youtube',
            embed: "https://www.youtube.com/embed/Lu5VOe1FOco?autoplay=1&mute=1&loop=1&playlist=Lu5VOe1FOco&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1", 
            thumbnail: "https://media.istockphoto.com/id/1410783528/photo/ssd-m2-disk-close-up-on-dark-background.jpg?s=612x612&w=0&k=20&c=grOX3cAVHnC3ZuIiegMxUYf664ZiDsX2g_zMz5aJ8xo=",
            sub: "Powered by", 
            main: "INDUSTRIAL SSD",
        },
        { 
            id: 'lz4T2ULAUgM',
            type: 'youtube',
            embed: "https://www.youtube.com/embed/lz4T2ULAUgM?autoplay=1&mute=1&loop=1&playlist=lz4T2ULAUgM&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1", 
            thumbnail: "https://media.istockphoto.com/id/1446045839/photo/outdoor-security-camera-cctv-secure-monitoring-concept-3d-rendering.jpg?s=612x612&w=0&k=20&c=j3TAaHznRCw7sd3C5I1ofTADRchAQdAgeGeEk7w52fc=",
            sub: "Reliable for", 
            main: "VIDEO SURVEILLANCE",
        },
        { 
            id: 'TpxKcMREKcg',
            type: 'youtube',
            embed: "https://www.youtube.com/embed/TpxKcMREKcg?autoplay=1&mute=1&loop=1&playlist=TpxKcMREKcg&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1", 
            thumbnail: "https://media.istockphoto.com/id/2163733794/photo/shot-of-data-center-with-multiple-rows-of-fully-operational-server-racks-modern.jpg?s=612x612&w=0&k=20&c=CpEXpq2S-riRAs2aBo2E8Rc105Jxkb0cPqgm9bouplM=",
            sub: "Scalable for", 
            main: "DATA CENTERS",
        }
    ];

    let currentVideoIdx = 0;
    let isVideoAnimating = false;
    
    const videoContainer = document.getElementById('videoSlideContainer');
    const subEl = document.getElementById('slide-sub');
    const mainEl = document.getElementById('slide-main');
    const textElements = document.querySelectorAll('.text-slide');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevVideoBtn = document.getElementById('prevBtn');
    const nextVideoBtn = document.getElementById('nextBtn');
    const loadingIndicator = document.getElementById('videoLoading');
    
    const leftThumbnail = document.getElementById('leftThumbnail');
    const rightThumbnail = document.getElementById('rightThumbnail');
    const leftPanelText = document.getElementById('leftPanelText');
    const rightPanelText = document.getElementById('rightPanelText');
    
    const videoUpload = document.getElementById('videoUpload');

    if (videoUpload) {
        videoUpload.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach((file, index) => {
                if (file.type.startsWith('video/')) {
                    const videoUrl = URL.createObjectURL(file);
                    const videoId = `local-${Date.now()}-${index}`;
                    
                    const video = document.createElement('video');
                    video.src = videoUrl;
                    video.addEventListener('loadeddata', function() {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                        const thumbnailUrl = canvas.toDataURL('image/jpeg');
                        
                        videos.push({
                            id: videoId,
                            type: 'local',
                            embed: videoUrl,
                            thumbnail: thumbnailUrl,
                            sub: "Local Video",
                            main: file.name.split('.')[0].toUpperCase(),
                        });
                        
                        initVideoSlides();
                        updateVideoDots();
                        updateVideoSidePanels(currentVideoIdx);
                        
                        URL.revokeObjectURL(videoUrl);
                    });
                }
            });
        });
    }

    function initVideoSlides() {
        if (!videoContainer) return;
        videoContainer.innerHTML = '';
        videos.forEach((video, index) => {
            const slide = document.createElement('div');
            slide.className = 'video-slide';
            
            if (video.type === 'youtube') {
                slide.innerHTML = `
                    <iframe 
                        src="${index === currentVideoIdx ? video.embed : video.embed.replace('autoplay=1', 'autoplay=0')}" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media; picture-in-picture" 
                        allowfullscreen
                        loading="lazy">
                    </iframe>
                `;
            } else {
                slide.innerHTML = `
                    <video 
                        src="${video.embed}"
                        ${index === currentVideoIdx ? 'autoplay' : ''}
                        loop
                        muted
                        playsinline
                        style="pointer-events: none; width: 100%; height: 100%; object-fit: cover;">
                    </video>
                `;
            }
            
            videoContainer.appendChild(slide);
        });
        
        videoContainer.style.transform = `translateX(-${currentVideoIdx * 100}%)`;
    }

    function updateVideoDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        videos.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot slider-dot h-1 w-4 bg-white/30 rounded-full transition-all cursor-pointer ${index === currentVideoIdx ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            if (index === currentVideoIdx) {
                dot.style.backgroundColor = 'white';
                dot.style.width = '1.5rem';
            }
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const idx = parseInt(dot.getAttribute('data-index'));
                if (!isVideoAnimating && idx !== currentVideoIdx) {
                    const direction = idx > currentVideoIdx ? 'next' : 'prev';
                    updateVideoSlider(idx, direction);
                }
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateVideoSidePanels(currentIndex) {
        if (!leftThumbnail || !rightThumbnail) return;
        const totalVideos = videos.length;
        
        const prevIndex = (currentIndex - 1 + totalVideos) % totalVideos;
        leftThumbnail.src = videos[prevIndex].thumbnail;
        leftPanelText.textContent = videos[prevIndex].main;
        
        const nextIndex = (currentIndex + 1) % totalVideos;
        rightThumbnail.src = videos[nextIndex].thumbnail;
        rightPanelText.textContent = videos[nextIndex].main;
    }

    function showVideoLoading() {
        if (loadingIndicator) loadingIndicator.classList.add('active');
    }

    function hideVideoLoading() {
        if (loadingIndicator) loadingIndicator.classList.remove('active');
    }

    function updateVideoSlider(newIndex, direction) {
        if (isVideoAnimating || newIndex === currentVideoIdx || !videoContainer) return;
        
        isVideoAnimating = true;
        showVideoLoading();

        videoContainer.style.transform = `translateX(-${newIndex * 100}%)`;

        textElements.forEach(el => {
            el.style.opacity = '0';
            el.style.animation = 'none';
        });

        setTimeout(() => {
            if (subEl) subEl.textContent = videos[newIndex].sub;
            if (mainEl) mainEl.textContent = videos[newIndex].main;

            textElements.forEach(el => {
                if (direction === 'next') {
                    el.style.animation = 'slideInRight 0.5s ease forwards';
                } else {
                    el.style.animation = 'slideInLeft 0.5s ease forwards';
                }
            });

            const slides = document.querySelectorAll('.video-slide');
            slides.forEach((slide, idx) => {
                const media = slide.querySelector('iframe, video');
                if (media) {
                    if (idx === newIndex) {
                        if (media.tagName === 'IFRAME') {
                            if (!media.src.includes('autoplay=1')) {
                                media.src = media.src.replace('autoplay=0', 'autoplay=1');
                            }
                        } else {
                            media.play().catch(e => console.log('Autoplay prevented'));
                        }
                    } else {
                        if (media.tagName === 'IFRAME') {
                            media.src = media.src.replace('autoplay=1', 'autoplay=0');
                        } else {
                            media.pause();
                        }
                    }
                }
            });

            updateVideoSidePanels(newIndex);

            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                if (i === newIndex) {
                    dot.classList.add('active');
                    dot.style.backgroundColor = 'white';
                    dot.style.width = '1.5rem';
                } else {
                    dot.classList.remove('active');
                    dot.style.backgroundColor = 'rgba(255,255,255,0.3)';
                    dot.style.width = '1rem';
                }
            });

            hideVideoLoading();
            
            currentVideoIdx = newIndex;
            
            setTimeout(() => {
                isVideoAnimating = false;
            }, 500);
        }, 250);
    }

    function nextVideoSlide() {
        if (isVideoAnimating) return;
        const newIndex = (currentVideoIdx + 1) % videos.length;
        updateVideoSlider(newIndex, 'next');
    }

    function prevVideoSlide() {
        if (isVideoAnimating) return;
        const newIndex = (currentVideoIdx - 1 + videos.length) % videos.length;
        updateVideoSlider(newIndex, 'prev');
    }

    if (prevVideoBtn) prevVideoBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); prevVideoSlide(); });
    if (nextVideoBtn) nextVideoBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); nextVideoSlide(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevVideoSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextVideoSlide();
        }
    });

    initVideoSlides();
    updateVideoDots();
    updateVideoSidePanels(0);

    setTimeout(() => {
        if (videoContainer) videoContainer.style.transform = `translateX(-${currentVideoIdx * 100}%)`;
        if (subEl) subEl.textContent = videos[0].sub;
        if (mainEl) mainEl.textContent = videos[0].main;
        hideVideoLoading();
    }, 100);


    const journeySection = document.getElementById('journeySection');
    const videoSection = document.getElementById('videoSection');
    const whyChooseSection = document.getElementById('whyChooseSection');
    const whereToBuySection = document.getElementById('whereToBuySection');
    const ctaSection = document.getElementById('ctaSection');
    
    function checkScroll() {
        const scrollPosition = window.scrollY + 200; 
        
        if (journeySection) {
            const journeyTop = journeySection.offsetTop;
            const journeyBottom = journeyTop + journeySection.offsetHeight;
            if (scrollPosition >= journeyTop && scrollPosition < journeyBottom) {
                journeySection.classList.add('scrolled');
            } else {
                journeySection.classList.remove('scrolled');
            }
        }
        
        if (videoSection) {
            const videoTop = videoSection.offsetTop;
            const videoBottom = videoTop + videoSection.offsetHeight;
            if (scrollPosition >= videoTop && scrollPosition < videoBottom) {
                videoSection.classList.add('scrolled');
            } else {
                videoSection.classList.remove('scrolled');
            }
        }
        
        if (whyChooseSection) {
            const whyTop = whyChooseSection.offsetTop;
            const whyBottom = whyTop + whyChooseSection.offsetHeight;
            if (scrollPosition >= whyTop && scrollPosition < whyBottom) {
                whyChooseSection.classList.add('scrolled');
            } else {
                whyChooseSection.classList.remove('scrolled');
            }
        }
        
        if (whereToBuySection) {
            const whereTop = whereToBuySection.offsetTop;
            const whereBottom = whereTop + whereToBuySection.offsetHeight;
            if (scrollPosition >= whereTop && scrollPosition < whereBottom) {
                whereToBuySection.classList.add('scrolled');
            } else {
                whereToBuySection.classList.remove('scrolled');
            }
        }
        
        if (ctaSection) {
            const ctaTop = ctaSection.offsetTop;
            const ctaBottom = ctaTop + ctaSection.offsetHeight;
            if (scrollPosition >= ctaTop && scrollPosition < ctaBottom) {
                ctaSection.classList.add('scrolled');
            } else {
                ctaSection.classList.remove('scrolled');
            }
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll(); // Initial check


    const massiveQA = [
        { q: "What does HIKSEMI specialize in?", a: "HIKSEMI is a global provider of ultimate storage products and solutions for industrial control, video surveillance, data centers, and consumer electronics." },
        { q: "Where is HIKSEMI headquartered?", a: "Headquarters: Room 307, Unit B, Building 2, No. 399 Danfeng Road, Binjiang District, Hangzhou, Zhejiang, China." },
        { q: "What are HIKSEMI's main product lines?", a: "Industrial SSDs, Surveillance Memory Cards, Data Center SSDs, Embedded Storage (eMMC, BGA SSDs), Consumer Drives, and Memory Modules." },
        { q: "Does HIKSEMI offer NVMe SSDs?", a: "Yes, HIKSEMI provides NVMe SSDs for high-performance computing, data centers, and industrial applications." },
        { q: "Are HIKSEMI memory cards reliable for surveillance?", a: "Absolutely. They are designed for 24/7 video surveillance, offering high endurance and continuous recording." },
        { q: "What is embedded storage used for?", a: "HIKSEMI embedded storage solutions (eMMC, BGA SSDs) are for industrial control, IoT devices, and embedded systems." },
        { q: "Does HIKSEMI have enterprise SSDs for data centers?", a: "Yes, including high-capacity, low-latency SSDs for server and cloud storage." },
        { q: "What type of consumer drives does HIKSEMI offer?", a: "They offer portable SSDs, external HDDs, and USB flash drives for everyday use." },
        { q: "Does HIKSEMI provide warranty on SSDs?", a: "Typically 3 to 5 years limited warranty depending on model and application." },
        { q: "How to contact HIKSEMI support?", a: "Use the 'Get In Touch' option in the footer or contact the sales team." },
        { q: "Where can I buy HIKSEMI products?", a: "Through online retailers, local distributors, and authorized partners." },
        { q: "Does HIKSEMI have distributors in Nepal?", a: "Yes, they serve globally including South Asia." },
        { q: "What is Singha Techne's relation to HIKSEMI?", a: "Singha Techne is a leading ICT provider that works with HIKSEMI." },
        { q: "Does HIKSEMI produce industrial-grade storage?", a: "Yes, for industrial control, automation, and harsh environments." },
        { q: "What is the mission of HIKSEMI?", a: "To enable an intelligent lifestyle through continuous innovation in storage." },
        { q: "Are HIKSEMI products available in the US?", a: "Yes, through Amazon Global Store and other platforms." },
        { q: "Does HIKSEMI have a partner program?", a: "Yes, authorized resellers and system integrators." },
        { q: "What is the latest SSD interface from HIKSEMI?", a: "PCIe Gen4 NVMe SSDs are available for high-performance needs." },
        { q: "Does HIKSEMI offer 2.5-inch SATA SSDs?", a: "Yes, for upgrades and bulk storage in various applications." },
        { q: "Are HIKSEMI products RoHS compliant?", a: "Yes, they follow environmental standards." },
        { q: "What is the capacity range for HIKSEMI SSDs?", a: "From 128GB up to several TB for consumer and enterprise models." },
        { q: "Does HIKSEMI make USB flash drives?", a: "Yes, external storage includes USB flash drives." },
        { q: "Is HIKSEMI memory compatible with Mac?", a: "Generally yes, but check format and interface." },
        { q: "Does HIKSEMI support RAID on industrial SSDs?", a: "Industrial SSDs are designed for reliability in RAID configurations." },
        { q: "Can I use HIKSEMI memory card in dashcam?", a: "Yes, high endurance cards are suitable." },
        { q: "Does HIKSEMI have a physical store?", a: "Primarily online and through distributors." },
        { q: "What is the boot time with HIKSEMI SSD?", a: "Typical boot under 15 seconds with NVMe drives." },
        { q: "Does HIKSEMI make industrial USB drives?", a: "Yes, as part of embedded and industrial storage line." },
        { q: "What is 'Smart society' in their motto?", a: "Enabling intelligent lifestyle via ICT solutions." },
        { q: "Can I find HIKSEMI on social media?", a: "Facebook, Instagram, TikTok, WhatsApp." },
        { q: "What is the build quality of external SSDs?", a: "Often metal casing, shock-resistant." },
        { q: "Are HIKSEMI memory cards A2 rated?", a: "Some models support A2 for faster app performance." },
        { q: "Does HIKSEMI provide custom labeling?", a: "For B2B partners, possibly via sales inquiry." },
        { q: "What are typical read speeds for HIKSEMI SATA SSDs?", a: "Up to 560 MB/s." },
        { q: "Do HIKSEMI memory cards come with an SD adapter?", a: "Some bundles include a full-size SD adapter." },
        { q: "What is power consumption of HIKSEMI NVMe SSD?", a: "Typically 3-5W under active use." },
        { q: "Does HIKSEMI offer industrial-grade microSD?", a: "Yes, with wide temperature tolerance." },
        { q: "How to update firmware on HIKSEMI SSD?", a: "Use HIKSEMI SSD Toolbox software." },
        { q: "Are HIKSEMI products compatible with Linux?", a: "Generally yes for SSDs and memory cards." },
        { q: "What does HIKSEMI warranty cover?", a: "Manufacturing defects, not data loss." }
    ];

    const botCircle = document.getElementById('botCircle');
    const botPopup = document.getElementById('botPopup');
    const botTabs = document.querySelectorAll('.tab');
    const botPanels = document.querySelectorAll('.panel');
    const qaListDiv = document.getElementById('qaListContainer');
    const answerDisplay = document.getElementById('answerDisplay');
    const searchInput = document.getElementById('qaSearch');
    
    const googleFrame = document.getElementById('googleFrame');
    const googleUrlInput = document.getElementById('googleUrlInput');

    if (botTabs.length > 0) {
        botTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                botTabs.forEach(t => t.classList.remove('active'));
                botPanels.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                
                if (targetTab === 'qa') {
                    document.getElementById('qaPanel')?.classList.add('active');
                } else if (targetTab === 'google') {
                    document.getElementById('googlePanel')?.classList.add('active');
                }
            });
        });
    }

    function renderQuestions(filter = '') {
        if (!qaListDiv) return;
        const filterLower = filter.toLowerCase().trim();
        const filtered = massiveQA.filter(item => 
            item.q.toLowerCase().includes(filterLower) || 
            item.a.toLowerCase().includes(filterLower)
        );
        
        if (filtered.length === 0) {
            qaListDiv.innerHTML = `<div class="p-4 text-sm text-gray-500">❌ no matching questions</div>`;
            return;
        }
        
        let htmlStr = '';
        filtered.forEach((item) => {
            htmlStr += `<div class="qa-item" data-question="${item.q.replace(/"/g, '&quot;')}" data-answer="${item.a.replace(/"/g, '&quot;')}">
                <i class="fas fa-question-circle"></i>
                <span>${item.q}</span>
            </div>`;
        });
        qaListDiv.innerHTML = htmlStr;

        document.querySelectorAll('.qa-item').forEach(el => {
            el.addEventListener('click', function() {
                const question = this.dataset.question;
                const answer = this.dataset.answer;
                if (answerDisplay) answerDisplay.innerHTML = `<strong>🤖 ${question}</strong><br><br>${answer}`;
            });
        });
    }

    renderQuestions();
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderQuestions(this.value);
        });
    }

    function googleSearch(query) {
        if (!query.trim() || !googleFrame || !googleUrlInput) return;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + ' HIKSEMI')}&igu=1`;
        googleFrame.src = searchUrl;
        googleUrlInput.value = searchUrl;
        
        const googleTab = document.querySelector('[data-tab="google"]');
        if (googleTab) googleTab.click();
    }

    const googleSearchBtn = document.getElementById('googleSearchBtn');
    if (googleSearchBtn) {
        googleSearchBtn.addEventListener('click', function() {
            googleSearch(googleUrlInput?.value.replace('https://www.google.com/search?q=', '').replace(/\+/g, ' ') || '');
        });
    }

    const googleBackBtn = document.getElementById('googleBackBtn');
    if (googleBackBtn) {
        googleBackBtn.addEventListener('click', function() {
            try { if (googleFrame) googleFrame.contentWindow.history.back(); } catch(e) {}
        });
    }

    const googleForwardBtn = document.getElementById('googleForwardBtn');
    if (googleForwardBtn) {
        googleForwardBtn.addEventListener('click', function() {
            try { if (googleFrame) googleFrame.contentWindow.history.forward(); } catch(e) {}
        });
    }

    const googleRefreshBtn = document.getElementById('googleRefreshBtn');
    if (googleRefreshBtn) {
        googleRefreshBtn.addEventListener('click', function() {
            if (googleFrame) googleFrame.src = googleFrame.src;
        });
    }

    if (googleUrlInput) {
        googleUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                let url = this.value;
                if (!url.startsWith('http')) {
                    url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
                }
                if (googleFrame) googleFrame.src = url;
            }
        });
    }

    if (botCircle && botPopup) {
        botCircle.addEventListener('click', function(e) {
            e.stopPropagation();
            botPopup.style.display = botPopup.style.display === 'flex' ? 'none' : 'flex';
        });

        document.addEventListener('click', function(event) {
            if (!botCircle.contains(event.target) && !botPopup.contains(event.target)) {
                botPopup.style.display = 'none';
            }
        });

        botPopup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});