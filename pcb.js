/* ============================================================
   ITFLYMODE — фон (PCB + точки) + scroll-анимации + sticky
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== 1. ФОН: дорожки PCB + бегущие точки ===== */
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
    <defs>
        <style>
            .trace { fill: none; stroke: #c5cdd6; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1; }
            .trace2 { fill: none; stroke: #c5cdd6; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2; }
            .pad { fill: #c5cdd6; }
            .via { fill: none; stroke: #c5cdd6; stroke-width: 1.2; }
            .dot {
                fill: #ffffff;
                filter: drop-shadow(0 0 4px #ffffff) drop-shadow(0 0 8px rgba(170, 204, 255, 0.9));
            }
        </style>

        <g id="pcb-base">
            <path class="trace" d="M40,0V100L100,160V260L160,320"/>
            <path class="trace" d="M70,0V90L130,150V250L190,310"/>
            <path class="trace" d="M100,0V80L160,140V240L220,300"/>
            <path class="trace" d="M130,0V70L190,130V230L250,290"/>
            <path class="trace2" d="M170,0V50L230,110V200"/>
            <path class="trace" d="M0,40H80L140,100H220L280,160V240"/>
            <path class="trace" d="M0,70H70L130,130H210L270,190V250"/>
            <path class="trace" d="M0,100H60L120,160H200L260,220V260"/>
            <path class="trace" d="M0,130H50L110,190H190L250,250V270"/>
            <path class="trace2" d="M0,170H40L100,230H180L240,290V300"/>
            <path class="trace" d="M140,100V180L180,220"/>
            <path class="trace" d="M130,130V190L170,230"/>
            <path class="trace" d="M120,160V200L160,240"/>
            <path class="trace" d="M0,280H100L160,340H240"/>
            <path class="trace" d="M0,310H90L150,370H240"/>
            <path class="trace" d="M0,340H80L140,400H240"/>
            <path class="trace" d="M0,370H70L130,430H240"/>
            <path class="trace2" d="M0,410H60L120,470H220"/>

            <circle class="via" cx="160" cy="320" r="4"/><circle class="pad" cx="160" cy="320" r="1.5"/>
            <circle class="via" cx="190" cy="310" r="4"/><circle class="pad" cx="190" cy="310" r="1.5"/>
            <circle class="via" cx="220" cy="300" r="4"/><circle class="pad" cx="220" cy="300" r="1.5"/>
            <circle class="via" cx="250" cy="290" r="4"/><circle class="pad" cx="250" cy="290" r="1.5"/>
            <circle class="via" cx="230" cy="200" r="4"/><circle class="pad" cx="230" cy="200" r="1.5"/>
            <circle class="via" cx="280" cy="240" r="4"/><circle class="pad" cx="280" cy="240" r="1.5"/>
            <circle class="via" cx="270" cy="250" r="4"/><circle class="pad" cx="270" cy="250" r="1.5"/>
            <circle class="via" cx="260" cy="260" r="4"/><circle class="pad" cx="260" cy="260" r="1.5"/>
            <circle class="via" cx="250" cy="270" r="4"/><circle class="pad" cx="250" cy="270" r="1.5"/>
            <circle class="via" cx="240" cy="300" r="4"/><circle class="pad" cx="240" cy="300" r="1.5"/>
            <circle class="via" cx="180" cy="220" r="4"/><circle class="pad" cx="180" cy="220" r="1.5"/>
            <circle class="via" cx="170" cy="230" r="4"/><circle class="pad" cx="170" cy="230" r="1.5"/>
            <circle class="via" cx="160" cy="240" r="4"/><circle class="pad" cx="160" cy="240" r="1.5"/>
            <circle class="via" cx="240" cy="340" r="4"/><circle class="pad" cx="240" cy="340" r="1.5"/>
            <circle class="via" cx="240" cy="370" r="4"/><circle class="pad" cx="240" cy="370" r="1.5"/>
            <circle class="via" cx="240" cy="400" r="4"/><circle class="pad" cx="240" cy="400" r="1.5"/>
            <circle class="via" cx="240" cy="430" r="4"/><circle class="pad" cx="240" cy="430" r="1.5"/>
            <circle class="via" cx="220" cy="470" r="4"/><circle class="pad" cx="220" cy="470" r="1.5"/>

            <circle class="pad" cx="40" cy="0" r="2"/>
            <circle class="pad" cx="70" cy="0" r="2"/>
            <circle class="pad" cx="100" cy="0" r="2"/>
            <circle class="pad" cx="130" cy="0" r="2"/>
            <circle class="pad" cx="0" cy="40" r="2"/>
            <circle class="pad" cx="0" cy="70" r="2"/>
            <circle class="pad" cx="0" cy="100" r="2"/>
            <circle class="pad" cx="0" cy="130" r="2"/>
            <circle class="pad" cx="0" cy="280" r="2"/>
            <circle class="pad" cx="0" cy="310" r="2"/>
            <circle class="pad" cx="0" cy="340" r="2"/>
            <circle class="pad" cx="0" cy="370" r="2"/>

            <circle class="via" cx="330" cy="180" r="3"/><circle class="pad" cx="330" cy="180" r="1"/>
            <circle class="via" cx="350" cy="180" r="3"/><circle class="pad" cx="350" cy="180" r="1"/>
            <circle class="via" cx="370" cy="180" r="3"/><circle class="pad" cx="370" cy="180" r="1"/>
            <circle class="via" cx="330" cy="200" r="3"/><circle class="pad" cx="330" cy="200" r="1"/>
            <circle class="via" cx="350" cy="200" r="3"/><circle class="pad" cx="350" cy="200" r="1"/>
            <circle class="via" cx="370" cy="200" r="3"/><circle class="pad" cx="370" cy="200" r="1"/>
        </g>

        <path id="mp1" d="M40,0V100L100,160V260L160,320" fill="none"/>
        <path id="mp2" d="M0,40H80L140,100H220L280,160V240" fill="none"/>
        <path id="mp3" d="M0,280H100L160,340H240" fill="none"/>
        <path id="mp4" d="M170,0V50L230,110V200" fill="none"/>
        <path id="mp5" d="M0,170H40L100,230H180L240,290V300" fill="none"/>
        <path id="mp6" d="M100,0V80L160,140V240L220,300" fill="none"/>
        <path id="mp7" d="M130,0V70L190,130V230L250,290" fill="none"/>
        <path id="mp8" d="M0,340H80L140,400H240" fill="none"/>

        <g id="dots-group">
            <circle class="dot" r="2.5"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#mp1"/></animateMotion></circle>
            <circle class="dot" r="2"><animateMotion dur="8s" repeatCount="indefinite" begin="-2s"><mpath href="#mp2"/></animateMotion></circle>
            <circle class="dot" r="2.5"><animateMotion dur="7s" repeatCount="indefinite" begin="-3.5s"><mpath href="#mp3"/></animateMotion></circle>
            <circle class="dot" r="2"><animateMotion dur="5s" repeatCount="indefinite" begin="-1s"><mpath href="#mp4"/></animateMotion></circle>
            <circle class="dot" r="2.5"><animateMotion dur="9s" repeatCount="indefinite" begin="-4s"><mpath href="#mp5"/></animateMotion></circle>
            <circle class="dot" r="2"><animateMotion dur="7.5s" repeatCount="indefinite" begin="-5.5s"><mpath href="#mp6"/></animateMotion></circle>
            <circle class="dot" r="2.5"><animateMotion dur="6.5s" repeatCount="indefinite" begin="-1.5s"><mpath href="#mp7"/></animateMotion></circle>
            <circle class="dot" r="2"><animateMotion dur="8.5s" repeatCount="indefinite" begin="-3s"><mpath href="#mp8"/></animateMotion></circle>
        </g>
    </defs>

    <use href="#pcb-base"/>
    <use href="#pcb-base" transform="translate(1600,0) scale(-1,1)"/>
    <use href="#pcb-base" transform="translate(0,900) scale(1,-1)"/>
    <use href="#pcb-base" transform="translate(1600,900) scale(-1,-1)"/>

    <use href="#dots-group"/>
    <use href="#dots-group" transform="translate(1600,0) scale(-1,1)"/>
    <use href="#dots-group" transform="translate(0,900) scale(1,-1)"/>
    <use href="#dots-group" transform="translate(1600,900) scale(-1,-1)"/>
</svg>`;

    const bgDiv = document.createElement('div');
    bgDiv.className = 'pcb-bg';
    bgDiv.setAttribute('aria-hidden', 'true');
    bgDiv.innerHTML = svg;
    document.body.insertBefore(bgDiv, document.body.firstChild);


    /* ===== 2. СЕКЦИИ: появление при скролле ===== */
    const sections = document.querySelectorAll('.section');

    function revealInitialSections() {
        const vh = window.innerHeight;
        let visibleIndex = 0;

        sections.forEach(function (section) {
            const rect = section.getBoundingClientRect();

            if (rect.top < vh && rect.bottom > 0) {
                section.style.transitionDelay = (visibleIndex * 0.15) + 's';
                visibleIndex++;
                requestAnimationFrame(function () {
                    section.classList.add('visible');
                });
            }
        });
    }

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = '0s';
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    revealInitialSections();
    sections.forEach(function (section) {
        if (!section.classList.contains('visible')) {
            sectionObserver.observe(section);
        }
    });


    /* ===== 2.5. КОММЕНТАРИИ-ПАРАГРАФЫ: появление при скролле ===== */
    const comments = document.querySelectorAll('.section:not(.centered) > p');

    const vh = window.innerHeight;
    let commentIndex = 0;
    comments.forEach(function (comment) {
        const rect = comment.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
            comment.style.transitionDelay = (commentIndex * 0.12) + 's';
            commentIndex++;
            requestAnimationFrame(function () {
                comment.classList.add('comment-visible');
            });
        }
    });

    const commentObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = '0s';
                entry.target.classList.add('comment-visible');
                commentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
    });

    comments.forEach(function (comment) {
        if (!comment.classList.contains('comment-visible')) {
            commentObserver.observe(comment);
        }
    });


    /* ===== 3. НАВИГАЦИЯ: компактность при скролле ===== */
    const nav = document.querySelector('nav');
    if (nav) {
        const onScroll = function () {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
});