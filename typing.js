/* ============================================================
   ITFLYMODE — анимация «печатная машинка» для слогана
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const p = document.querySelector('header p');
    if (!p) return;

    const text = p.textContent.trim();
    p.textContent = '';
    p.classList.add('typing');

    let i = 0;
    const speed = 140;
    const startDelay = 1000;

    function typeChar() {
        if (i < text.length) {
            p.textContent += text.charAt(i);
            i++;
            const jitter = Math.random() * 60 - 30;
            setTimeout(typeChar, speed + jitter);
        } else {
            p.classList.remove('typing');
            p.classList.add('done');
        }
    }

    setTimeout(typeChar, startDelay);
});