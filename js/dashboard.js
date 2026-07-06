// js/dashboard.js — STACKLY Dark Glassmorphic OTT Dashboards (Viewer & Admin)

(function() {
  'use strict';

  // ── User Data from localStorage ──
  const user = JSON.parse(localStorage.getItem('stackly_user') || '{}');
  const username = user.username || 'Siddharth';
  const email = user.email || 'siddharth@stackly.com';
  const role = user.role || 'viewer';
  const initials = username.charAt(0).toUpperCase();

  // Populate profiles & headings (checks element presence first to run safely on both viewer and admin dashboards)
  const userNameEl = document.getElementById('userName');
  if (userNameEl) userNameEl.textContent = username;

  const userEmailEl = document.getElementById('userEmail');
  if (userEmailEl) userEmailEl.textContent = email;

  const greetNameEl = document.getElementById('greetName');
  if (greetNameEl) greetNameEl.textContent = `Hello, ${username}!`;

  const greetEmailEl = document.getElementById('greetEmail');
  if (greetEmailEl) {
    greetEmailEl.textContent = `${email} · ${role === 'admin' ? 'Administrator' : 'Viewer Profile'}`;
  }

  const userAvatarEl = document.getElementById('userAvatar');
  if (userAvatarEl) userAvatarEl.textContent = initials;

  const profileAvatarEl = document.getElementById('profileAvatar');
  if (profileAvatarEl) profileAvatarEl.textContent = initials;

  const profileNameEl = document.getElementById('profileName');
  if (profileNameEl) profileNameEl.textContent = username;

  const profileEmailEl = document.getElementById('profileEmail');
  if (profileEmailEl) profileEmailEl.textContent = email;

  // ── Logout Handling ──
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('stackly_user');
      window.location.href = 'index.html';
    });
  }

  // ── Sidebar Navigation ──
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('pageTitle');

  const viewerTitles = {
    overview: 'Overview',
    energy: 'Streaming Status',
    sites: 'Global CDNs',
    reports: 'Watchlist Reports',
    gallery: 'Image Stills',
    news: 'Press Release',
    learn: 'Tutorials',
    profile: 'My Profile',
    settings: 'Settings'
  };

  const adminTitles = {
    overview: 'Overview',
    metrics: 'Stream Metrics',
    sites: 'CDN Servers',
    alerts: 'Critical Alerts',
    users: 'Staff Directory',
    devices: 'Content Assets',
    reports: 'Platform Reports',
    billing: 'Sub Billing',
    logs: 'System Logs',
    settings: 'System Settings'
  };

  const titles = role === 'admin' ? adminTitles : viewerTitles;

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.dataset.page;

      navItems.forEach(n => n.classList.remove('active'));
      this.classList.add('active');

      pages.forEach(p => p.classList.remove('active'));
      const pg = document.getElementById('page-' + target);
      if (pg) pg.classList.add('active');

      if (pageTitle) {
        pageTitle.textContent = titles[target] || target;
      }

      if (window.innerWidth <= 768) {
        closeSidebar();
      }

      if (target === 'metrics') drawBigChart();
      if (target === 'logs') renderLogs();
    });
  });

  // ── Mobile Sidebar Drawer ──
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (hamburger) {
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = 'fas fa-times';
    }
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (hamburger) {
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  }

  hamburger?.addEventListener('click', () => {
    if (sidebar) {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    }
  });

  overlay?.addEventListener('click', closeSidebar);
  sidebarCloseBtn?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // ── Live Stream status list feed (Viewer) ──
  const feedData = [
    { name: 'US-East Server Node 1', val: '99.9% bitrate stable', on: true },
    { name: 'US-West Transcoder', val: 'Active transcode sync', on: true },
    { name: 'Europe Central Edge 1', val: 'Low latency optimal', on: true },
    { name: 'Asia Pacific Edge 2', val: 'Peak traffic load balance', on: true },
    { name: 'LATAM Transcoder Node', val: 'Active transcode sync', on: true },
    { name: 'Africa Southern CDN', val: 'Under maintenance', on: false }
  ];

  const feedEl = document.getElementById('energyFeed');

  function renderFeed() {
    if (!feedEl) return;
    const now = new Date();
    const t = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    feedEl.innerHTML = feedData.map(f => {
      return `<div class="feed-item">
        <div class="feed-dot ${f.on ? 'on' : 'off'}"></div>
        <span class="feed-label" style="font-weight:700;">${f.name}</span>
        <span class="feed-val" style="color:var(--color-primary); font-weight:700;">${f.val}</span>
        <span class="feed-time" style="color:var(--color-text-muted); font-size:0.8rem;">${t}</span>
      </div>`;
    }).join('');
  }

  renderFeed();
  setInterval(renderFeed, 5000);

  // ── System Terminal Simulation (Admin) ──
  const logMessages = [
    { level: 'info', msg: 'Core CDN Node US-East-1 connection established' },
    { level: 'ok', msg: 'Transcoding pipeline for Radha_Krishna_1080p.mp4 finished successfully' },
    { level: 'warn', msg: 'Server overload: Node AP-South-1 capacity hit 96%' },
    { level: 'ok', msg: 'Daily system log backup complete' },
    { level: 'info', msg: 'GET /api/v1/auth/session — Admin authorized from IP 192.168.1.1' },
    { level: 'warn', msg: 'Transcoding Cluster B: Server high temperature detected' },
    { level: 'ok', msg: 'Node LATAM-1 synced successfully with local storage cache' }
  ];

  function renderLogs() {
    const terminal = document.getElementById('logTerminal');
    if (!terminal) return;
    terminal.innerHTML = '';
    const now = new Date();
    logMessages.forEach((l, i) => {
      const t = new Date(now - i * 180000);
      const ts = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`;
      const line = document.createElement('div');
      line.style.marginBottom = '6px';
      line.style.fontSize = '0.9rem';
      
      let lvlColor = '#2ecc71'; // ok
      if (l.level === 'warn') lvlColor = '#e74c3c';
      if (l.level === 'info') lvlColor = '#3498db';

      line.innerHTML = `
        <span style="color:#888;">[${ts}]</span>
        <span style="color:${lvlColor}; font-weight:700;">[${l.level.toUpperCase()}]</span>
        <span style="color:#fff;">${l.msg}</span>
      `;
      terminal.appendChild(line);
    });
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Auto logs trigger if element exists
  const isLogsPage = document.getElementById('page-logs');
  if (isLogsPage && isLogsPage.classList.contains('active')) {
    renderLogs();
  }

  // ── Admin Performance Chart Drawing ──
  function drawBigChart() {
    const canvas = document.getElementById('bigChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 700;
    canvas.height = canvas.offsetHeight || 260;
    const W = canvas.width, H = canvas.height;

    const vals = Array.from({ length: 24 }, (_, h) =>
      (h < 6 || h > 20) ? 2 + Math.random() * 3 : 8 + Math.random() * 6
    );
    const maxV = Math.max(...vals);

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach(f => {
      const y = H - f * (H - 30) - 30;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    });

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(229, 9, 20, 0.25)');
    grad.addColorStop(1, 'rgba(229, 9, 20, 0.02)');

    ctx.beginPath();
    vals.forEach((v, i) => {
      const x = (i / 23) * W;
      const y = H - (v / maxV) * (H - 40) - 20;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 2.5;
    vals.forEach((v, i) => {
      const x = (i / 23) * W;
      const y = H - (v / maxV) * (H - 40) - 20;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // Draw chart on display trigger
  const isMetricsPage = document.getElementById('page-metrics');
  if (isMetricsPage && isMetricsPage.classList.contains('active')) {
    drawBigChart();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMetricsActive = document.getElementById('page-metrics');
      if (isMetricsActive && isMetricsActive.classList.contains('active')) {
        drawBigChart();
      }
    }, 200);
  });

  // ── Render Chart Bar Heights (Overview Admin) ──
  const chartArea = document.getElementById('chartArea');
  if (chartArea) {
    chartArea.innerHTML = '';
    chartArea.style.display = 'flex';
    chartArea.style.alignItems = 'flex-end';
    chartArea.style.justifyContent = 'space-between';
    chartArea.style.padding = '20px';
    chartArea.style.gap = '8px';

    const barData = [35, 50, 45, 60, 75, 90, 80, 85, 70, 60, 80, 82, 70, 75, 85, 95, 90, 85, 80, 95, 70, 60, 80, 75];
    const maxVal = Math.max(...barData);

    barData.forEach(v => {
      const bar = document.createElement('div');
      bar.style.flex = '1';
      bar.style.background = 'var(--color-primary)';
      bar.style.opacity = '0.7';
      bar.style.borderRadius = '3px';
      bar.style.height = (v / maxVal * 100) + '%';
      bar.style.transition = 'opacity 0.2s';
      bar.title = v + '% Traffic';
      bar.addEventListener('mouseenter', () => bar.style.opacity = '1');
      bar.addEventListener('mouseleave', () => bar.style.opacity = '0.7');
      chartArea.appendChild(bar);
    });
  }

})();
