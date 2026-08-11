document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Dark/Light Mode Toggle
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      
      // Update charts if they exist
      updateChartsTheme();
    });
  }

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  /* ==========================================================================
     Charts Initialization (Home Page)
     ========================================================================== */
  initCharts();
});

let lineChartInstance = null;
let donutChartInstance = null;

function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    text: isDark ? '#94A3B8' : '#475569',
    grid: isDark ? '#334155' : '#E2E8F0',
    primary: isDark ? '#38BDF8' : '#1E3A5F',
    primaryHover: isDark ? '#0EA5E9' : '#0F2A47',
    secondary: isDark ? '#7DD3FC' : '#4A7FB5',
    accent1: isDark ? '#818CF8' : '#6366F1',
    accent2: isDark ? '#F472B6' : '#EC4899',
    accent3: isDark ? '#34D399' : '#10B981'
  };
}

function initCharts() {
  const lineCtx = document.getElementById('performanceChart');
  const donutCtx = document.getElementById('regionChart');
  const colors = getChartColors();

  if (lineCtx && typeof Chart !== 'undefined') {
    lineChartInstance = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Performance Trend',
          data: [25, 40, 35, 55, 60, 55, 70, 65, 80, 85, 75, 95],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20', // 20% opacity
          borderWidth: 2,
          pointBackgroundColor: colors.primaryHover,
          pointRadius: 4,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: colors.grid },
            ticks: { color: colors.text }
          },
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  }

  if (donutCtx && typeof Chart !== 'undefined') {
    donutChartInstance = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['APAC', 'EMEA', 'AMER', 'Other'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: [
            colors.primary,
            colors.secondary,
            colors.accent1,
            colors.grid
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: colors.text,
              usePointStyle: true,
              padding: 20
            }
          }
        }
      }
    });
  }
}

function updateChartsTheme() {
  if (!lineChartInstance && !donutChartInstance) return;
  
  const colors = getChartColors();

  if (lineChartInstance) {
    lineChartInstance.data.datasets[0].borderColor = colors.primary;
    lineChartInstance.data.datasets[0].backgroundColor = colors.primary + '20';
    lineChartInstance.data.datasets[0].pointBackgroundColor = colors.primaryHover;
    lineChartInstance.options.scales.y.grid.color = colors.grid;
    lineChartInstance.options.scales.y.ticks.color = colors.text;
    lineChartInstance.options.scales.x.ticks.color = colors.text;
    lineChartInstance.update();
  }

  if (donutChartInstance) {
    donutChartInstance.data.datasets[0].backgroundColor = [
      colors.primary,
      colors.secondary,
      colors.accent1,
      colors.grid
    ];
    donutChartInstance.options.plugins.legend.labels.color = colors.text;
    donutChartInstance.update();
  }
}
