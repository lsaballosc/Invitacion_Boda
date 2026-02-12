 // Particles
        function createParticles() {
            const p = document.getElementById('particles');
            const fc = ['#4a7c9e', '#88b3a6', '#e8dcc4', '#ffffff', '#f5dc7e'];
            const sc = ['#7ba7c7', '#5a8faa', '#4a7c9e', '#6fb3d2'];
            
            for (let i = 0; i < 20; i++) {
                const f = document.createElement('div');
                f.className = 'flower';
                const s = Math.random() * 20 + 15;
                const c = fc[Math.floor(Math.random() * fc.length)];
                f.innerHTML = '<svg width="'+s+'" height="'+s+'" viewBox="0 0 100 100"><g opacity="0.85"><circle cx="50" cy="30" r="15" fill="'+c+'" opacity="0.9"/><circle cx="70" cy="50" r="15" fill="'+c+'" opacity="0.9"/><circle cx="50" cy="70" r="15" fill="'+c+'" opacity="0.9"/><circle cx="30" cy="50" r="15" fill="'+c+'" opacity="0.9"/><circle cx="50" cy="50" r="18" fill="'+c+'"/><circle cx="50" cy="50" r="10" fill="#f5dc7e" opacity="0.7"/></g></svg>';
                f.style.left = Math.random() * 100 + '%';
                f.style.top = Math.random() * 100 + '%';
                f.style.animationDelay = Math.random() * 10 + 's';
                f.style.animationDuration = (Math.random() * 15 + 20) + 's';
                p.appendChild(f);
            }
            
            for (let i = 0; i < 35; i++) {
                const st = document.createElement('div');
                st.className = 'star';
                const sz = Math.random() * 10 + 8;
                const gs = sz * 2.5;
                const stc = sc[Math.floor(Math.random() * sc.length)];
                st.innerHTML = '<svg width="'+gs+'" height="'+gs+'" viewBox="0 0 100 100"><defs><radialGradient id="g'+i+'"><stop offset="0%" style="stop-color:'+stc+';stop-opacity:1"/><stop offset="40%" style="stop-color:'+stc+';stop-opacity:0.7"/><stop offset="100%" style="stop-color:'+stc+';stop-opacity:0"/></radialGradient></defs><circle cx="50" cy="50" r="35" fill="url(#g'+i+')"/><path fill="'+stc+'" opacity="0.9" d="M50 25 L54 45 L74 50 L54 55 L50 75 L46 55 L26 50 L46 45 Z"/><circle cx="50" cy="50" r="6" fill="#ffffff" opacity="0.9"/></svg>';
                st.style.left = Math.random() * 100 + '%';
                st.style.top = Math.random() * 100 + '%';
                st.style.animationDelay = Math.random() * 2 + 's';
                st.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
                p.appendChild(st);
            }
            
            const smc = ['rgba(74,124,158,0.12)','rgba(136,179,166,0.10)','rgba(232,220,196,0.14)','rgba(255,255,255,0.12)'];
            for (let i = 0; i < 6; i++) {
                const sm = document.createElement('div');
                sm.className = 'smoke';
                const sz = Math.random() * 250 + 180;
                sm.style.width = sz + 'px';
                sm.style.height = sz + 'px';
                sm.style.background = smc[Math.floor(Math.random() * smc.length)];
                sm.style.left = Math.random() * 100 + '%';
                sm.style.top = Math.random() * 100 + '%';
                sm.style.animationDelay = Math.random() * 10 + 's';
                sm.style.animationDuration = (Math.random() * 15 + 35) + 's';
                p.appendChild(sm);
            }
        }
        
        // Music
        const m = document.getElementById('bgMusic');
        const mc = document.getElementById('musicControl');
        const mi = document.getElementById('musicIcon');
        m.volume = 0.3;
        let ip = false;
        
        mc.addEventListener('click', () => {
            if (ip) {
                m.pause();
                mi.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
            } else {
                m.play().catch(e => console.log('Error'));
                mi.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
            }
            ip = !ip;
        });
        
        // Page Navigation
        let cp = 1;
        const tp = 6;
        const pb = document.getElementById('prevBtn');
        const nb = document.getElementById('nextBtn');
        const pi = document.getElementById('pageIndicator');
        
        function showPage(pn) {
            const cpe = document.querySelector('.page.active');
            if (cpe) {
                cpe.classList.add('exiting');
                setTimeout(() => {
                    cpe.classList.remove('active', 'exiting');
                    cpe.style.display = 'none';
                }, 600);
            }
            setTimeout(() => {
                const np = document.getElementById('page' + pn);
                np.style.display = '';
                np.classList.add('active');
                cp = pn;
                pb.disabled = cp === 1;
                nb.disabled = cp === tp;
                pi.textContent = 'Página ' + cp + ' de ' + tp;
            }, 300);
        }
        
        pb.addEventListener('click', () => { if (cp > 1) showPage(cp - 1); });
        nb.addEventListener('click', () => { if (cp < tp) showPage(cp + 1); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && cp > 1) showPage(cp - 1);
            else if (e.key === 'ArrowRight' && cp < tp) showPage(cp + 1);
        });

        // Touch swipe support para móvil
        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        document.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && cp < tp) showPage(cp + 1);
                else if (diff < 0 && cp > 1) showPage(cp - 1);
            }
        }, { passive: true });
        
        // Cuenta regresiva — 4 de Julio 2026, 5:00 PM (hora Costa Rica, UTC-6)
        const weddingDate    = new Date('2026-07-04T17:00:00-06:00');
        const weddingDayStart = new Date('2026-07-04T00:00:00-06:00');

        function updateCountdown() {
            const now  = new Date();
            const diff = weddingDate - now;
            const isWeddingDay = now >= weddingDayStart;

            const grid    = document.getElementById('countdown-grid');
            const message = document.getElementById('wedding-day-message');
            const subtitle = document.querySelector('#page5 .section-subtitle');
            const dateLabel = document.getElementById('countdown-date-label');

            if (isWeddingDay) {
                if (grid)     grid.style.display    = 'none';
                if (dateLabel) dateLabel.style.display = 'none';
                if (subtitle)  subtitle.style.display  = 'none';
                if (message)  message.style.display  = 'flex';
                return;
            }

            if (grid)     grid.style.display    = '';
            if (dateLabel) dateLabel.style.display = '';
            if (subtitle)  subtitle.style.display  = '';
            if (message)  message.style.display  = 'none';

            const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
            document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
            document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Initialize
        window.addEventListener('load', () => { createParticles(); });