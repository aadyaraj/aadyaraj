document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DARK / LIGHT THEME TOGGLE WITH LOCAL STORAGE PERSISTENCE
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlDoc = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Retrieve saved preference or default from OS-level theme
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  htmlDoc.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlDoc.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlDoc.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ==========================================================================
     2. MOBILE MENU TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navContainer = document.querySelector('.nav-container');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     2.5. SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.panel-card, .project-card-inner, .timeline-card, .skill-category-card, .contact-card, .education-card');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
  }

  /* ==========================================================================
     3. AUTO ACTIVE LINK HIGHLIGHTING BASED ON CURRENT PAGE URL
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const renderGitHubRepos = async () => {
    const repoGrid = document.getElementById('github-repo-grid');
    if (!repoGrid) return;

    const githubUsername = 'aadyaraj';
    const url = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`;

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error ${response.status}`);
      }

      const repos = await response.json();
      if (!Array.isArray(repos) || repos.length === 0) {
        repoGrid.innerHTML = '<div class="hub-card" style="grid-column: span 4; text-align: center; color: var(--text-muted);">No public repositories found.</div>';
        return;
      }

      repoGrid.innerHTML = repos.slice(0, 6).map(repo => `
        <a href="${repo.html_url}" class="hub-card" target="_blank" rel="noopener">
          <div class="hub-icon">📦</div>
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : 'No description provided.'}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; font-size: 0.78rem; color: var(--text-muted); margin-top: 0.8rem;">
            <span>${repo.language ? repo.language : 'Misc'}</span>
            <span>★ ${repo.stargazers_count}</span>
            <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </a>
      `).join('');
    } catch (error) {
      repoGrid.innerHTML = '<div class="hub-card" style="grid-column: span 4; text-align: center; color: var(--text-muted);">Unable to load GitHub repositories right now.</div>';
      console.error('GitHub repos error:', error);
    }
  };

  renderGitHubRepos();

  /* ==========================================================================
     3.5. CONTACT FORM SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');

  if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      contactStatus.textContent = 'Sending your message...';
      contactStatus.style.color = 'var(--text-muted)';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactStatus.textContent = 'Message sent!';
          contactStatus.style.color = 'var(--accent-cyan)';
          contactForm.reset();
        } else {
          contactStatus.textContent = 'Unable to send message right now. Please email me directly at aadyaraj81@gmail.com.';
          contactStatus.style.color = 'var(--accent-purple)';
        }
      } catch (error) {
        contactStatus.textContent = 'Unable to send message. Please email me at aadyaraj81@gmail.com.';
        contactStatus.style.color = 'var(--accent-purple)';
      }
    });
  }

  /* ==========================================================================
     4. HERO PIPELINE NODES INTERACTIVITY
     ========================================================================== */
  // Hover and glow transitions are cleanly handled by CSS transform-box: fill-box

  const typewriterEl = document.querySelector('.typewriter-text');
  const typewriterPhrases = ['actionable insights.', 'KPI dashboards.', 'operational analytics.', 'data-driven decisions.'];
  let typeIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function updateTypewriter() {
    if (!typewriterEl) return;
    const currentPhrase = typewriterPhrases[typeIndex];

    if (!deleting) {
      typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex += 1;
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(updateTypewriter, 1500);
        return;
      }
    } else {
      typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex -= 1;
      if (charIndex === 0) {
        deleting = false;
        typeIndex = (typeIndex + 1) % typewriterPhrases.length;
      }
    }

    const delay = deleting ? 50 : 90;
    setTimeout(updateTypewriter, delay);
  }

  updateTypewriter();

  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top hidden';
  backToTop.setAttribute('aria-label', 'Scroll back to top');
  backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(backToTop);

  const toggleBackToTop = () => {
    if (window.scrollY > 420) {
      backToTop.classList.remove('hidden');
    } else {
      backToTop.classList.add('hidden');
    }
  };

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? `${Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))}%` : '0%';
    document.body.style.setProperty('--scroll-progress', progress);
  };

  window.addEventListener('scroll', () => {
    toggleBackToTop();
    updateScrollProgress();
  });
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const statEls = document.querySelectorAll('.hero-stats-grid .stat-number');
  const animateStats = () => {
    statEls.forEach(el => {
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let value = 0;
      const step = Math.max(1, Math.floor(target / 30));

      const updateValue = () => {
        value += step;
        if (value >= target) {
          el.textContent = `${target}${suffix}`;
          return;
        }
        el.textContent = `${value}${suffix}`;
        requestAnimationFrame(updateValue);
      };

      updateValue();
    });
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats-grid');
  if (heroStats) statObserver.observe(heroStats);
});
