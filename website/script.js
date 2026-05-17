const fadeEls = document.querySelectorAll('.fade-up');

if (fadeEls.length) {
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.08 });

    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        } else {
            io.observe(el);
        }
    });
}

const progressBar = document.getElementById('scrollProgress');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar) {
        const width = total > 0 ? (scrolled / total * 100).toFixed(1) : 0;
        progressBar.style.width = width + '%';
    }

    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', scrolled > 400);
    }
}, { passive: true });

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
    function closeMobileMenu() {
        navToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', event => {
        event.stopPropagation();
        const isOpen = mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', event => {
        if (!navToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
}


const downloadNoticeEl = document.getElementById('downloadNotice');

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function renderDownloadNotice(data) {
    if (!downloadNoticeEl || !data) {
        return;
    }

    const changelogs = Array.isArray(data.changelogs) ? data.changelogs : [];
    const v7a = data.downloads && data.downloads.v7a ? data.downloads.v7a : null;
    const v8a = data.downloads && data.downloads.v8a ? data.downloads.v8a : null;

    downloadNoticeEl.innerHTML = `
        <div class="notice-head">
            <h3>PawGram ${escapeHtml(data.version || '')}</h3>
            <p>${escapeHtml(data.title || '')}</p>
        </div>
        <div class="notice-chip">
            <span>Base: ${escapeHtml(data.base || '')}</span>
        </div>
        <p class="notice-arch">Architecture: ${escapeHtml(data.architecture || '')}</p>
        <h4>Changelogs:</h4>
        <ul class="notice-changelogs">
            ${changelogs.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <div class="notice-actions">
            ${v7a && v7a.url ? `<a class="btn btn-primary" href="${escapeHtml(v7a.url)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${escapeHtml(v7a.label || 'v7a')}</a>` : ''}
            ${v8a && v8a.url ? `<a class="btn btn-primary" href="${escapeHtml(v8a.url)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${escapeHtml(v8a.label || 'v8a')}</a>` : ''}
        </div>
    `;
}

async function loadDownloadNotice() {
    if (!downloadNoticeEl) {
        return;
    }

    try {
        const response = await fetch('download-notice.json', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Failed to fetch download notice JSON');
        }

        const data = await response.json();
        renderDownloadNotice(data);
    } catch (error) {
        downloadNoticeEl.innerHTML = `
            <h3>Latest Build Notice</h3>
            <p class="notice-loading">Could not load notice JSON. Update <code>download-notice.json</code> and ensure it is served from the same directory.</p>
        `;
    }
}

loadDownloadNotice();
