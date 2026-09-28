let rawDocs = null;
let currentLang = localStorage.getItem('opensupport_doc_lang') || 'en';
let searchQuery = '';

const langSelect = document.getElementById('langSelect');
const searchInput = document.getElementById('searchInput');
const githubBtn = document.getElementById('githubBtn');
const sidebarNav = document.getElementById('sidebarNav');
const docsContent = document.getElementById('docsContent');
const footerElement = document.querySelector('footer');

const landingTranslations = {
  fr: {
    hero_tag: "✦ Projet Libre & Open Source",
    hero_title: "La plateforme d'assistance client pensée pour la simplicité et la vie privée",
    hero_desc: "OpenSupport est une solution de support client et de gestion de tickets tout-en-un, moderne, légère et conçue pour être déployée en totale indépendance sur votre propre infrastructure.",
    btn_download: "Télécharger & Installer",
    btn_docs: "Consulter la Documentation",
    feat_title: "Fonctionnalités Clés",
    feat_subtitle: "Tout ce dont votre équipe a besoin pour assurer un service client fluide.",
    feat_chat_title: "Chat en Direct & Suivi",
    feat_chat_desc: "Échangez en direct avec vos demandeurs, envoyez des réponses types et suivez l'avancement complet du cycle de résolution.",
    feat_form_title: "Éditeur de Formulaires",
    feat_form_desc: "Personnalisez les champs de collecte pour chaque équipe grâce à un constructeur visuel intégrant des règles de routage automatique.",
    feat_teams_title: "Multi-Équipes & Rôles",
    feat_teams_desc: "Organisez vos collaborateurs par pôles, attribuez des postes, organisez des groupes et gérez facilement les plages d'absence.",
    feat_stats_title: "Statistiques & Satisfaction",
    feat_stats_desc: "Suivez les temps moyens de réponse, les volumes de tickets résolus et mesurez les retours de satisfaction client post-clôture.",
    feat_api_title: "API REST & Intégration iFrame",
    feat_api_desc: "Embarquez directement votre formulaire d'assistance sur n'importe quel site internet ou automatisez vos flux grâce à l'API v1.",
    feat_i18n_title: "Internationalisation Native",
    feat_i18n_desc: "Prise en charge multi-langue de l'interface et persistance des préférences linguistiques sans friction.",
    why_title: "Pourquoi OpenSupport ?",
    why_subtitle: "Les motivations et la philosophie derrière le développement du logiciel.",
    why_oss_title: "Expérimentation Open Source",
    why_oss_desc: "Le projet est né du désir d'expérimenter et de partager un projet collaboratif open source complet, conçu avec une architecture PHP/MySQL robuste, sans dépendances lourdes et entièrement maîtrisable de bout en bout.",
    why_free_title: "Alternative Gratuite aux Géants du Secteur",
    why_free_desc: "Les logiciels de helpdesk du marché imposent souvent des modèles d'abonnement coûteux à l'agent et verrouillent vos flux. OpenSupport apporte une alternative libre, gratuite et sans restriction d'usage.",
    why_ui_title: "Priorité absolue à l'UI et l'UX",
    why_ui_desc: "Open source ne signifie pas austère. L'interface d'administration comme le parcours client ont été modélisés pour offrir clarté, fluidité visuelle, réactivité et une prise en main intuitive dès le premier lancement.",
    why_gdpr_title: "RGPD & Souveraineté des Données",
    why_gdpr_desc: "Hébergez vos données sur votre serveur sans traçage intrusif. Le respect de la vie privée fait partie intégrante de la conception : export natif des données, purge automatique et outils d'anonymisation intégrés."
  },
  en: {
    hero_tag: "✦ Free & Open Source Project",
    hero_title: "Customer support platform designed for simplicity and privacy",
    hero_desc: "OpenSupport is an all-in-one, modern, lightweight customer support and ticketing solution built to be deployed independently on your own infrastructure.",
    btn_download: "Download & Install",
    btn_docs: "Browse Documentation",
    feat_title: "Key Features",
    feat_subtitle: "Everything your team needs to deliver smooth customer service.",
    feat_chat_title: "Live Chat & Tracking",
    feat_chat_desc: "Communicate directly with requesters, send canned responses, and follow the full resolution progress.",
    feat_form_title: "Form Builder",
    feat_form_desc: "Customize collection fields for each team with an interactive visual builder supporting automated routing rules.",
    feat_teams_title: "Multi-Teams & Roles",
    feat_teams_desc: "Organize staff into departments, assign position titles, configure groups, and manage absence windows easily.",
    feat_stats_title: "Analytics & Satisfaction",
    feat_stats_desc: "Track average resolution time, ticket volumes, and measure customer satisfaction scores upon resolution.",
    feat_api_title: "REST API & iFrame Integration",
    feat_api_desc: "Embed your support form directly on any website or automate workflows via the v1 REST API.",
    feat_i18n_title: "Native Internationalization",
    feat_i18n_desc: "Seamless multi-language interface with persistent language preferences across pages.",
    why_title: "Why OpenSupport?",
    why_subtitle: "The motivation and design philosophy behind the software.",
    why_oss_title: "Open Source Experimentation",
    why_oss_desc: "The project was born from the desire to build and share a complete collaborative open-source tool, powered by a robust PHP/MySQL architecture without heavy dependencies.",
    why_free_title: "Free Alternative to Overpriced Market Giants",
    why_free_desc: "Mainstream helpdesk platforms often enforce prohibitive per-agent subscription fees. OpenSupport delivers a free, open, and unrestricted self-hosted alternative.",
    why_ui_title: "Uncompromising UI & UX Focus",
    why_ui_desc: "Open source doesn't have to mean outdated design. Both agent and client portals are built for visual clarity, responsiveness, and instant onboarding.",
    why_gdpr_title: "GDPR & Data Sovereignty",
    why_gdpr_desc: "Host all data on your own servers without tracking. Privacy is built-in by design: native JSON exports, scheduled data retention, and automated anonymization."
  }
};

function renderLanding() {
  const landingMain = document.querySelector('.landing-main');
  if (!landingMain) return;

  const t = landingTranslations[currentLang] || landingTranslations.en;
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}

async function loadData() {
  try {
    const response = await fetch('./docs-data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    rawDocs = await response.json();
    
    if (rawDocs.github_url && githubBtn) {
      githubBtn.href = rawDocs.github_url;
    }

    if (langSelect) {
      langSelect.value = currentLang;
    }

    renderLanding();
    renderDocs();
    renderFooter();
  } catch (err) {
    console.error("Fetch error details:", err);
    if (docsContent) {
      docsContent.innerHTML = `
        <div class="doc-card">
          <h2>Error Loading Documentation</h2>
          <p>Could not load <code>docs-data.json</code>: <strong>${err.message}</strong></p>
          <p style="margin-top: 10px; font-size: 0.85rem; color: var(--muted);">
            Check the browser developer console (F12 > Console / Network) to inspect the exact network response.
          </p>
        </div>
      `;
    }
  }
}

function renderFooter() {
  if (!footerElement) return;

  const isFr = currentLang === 'fr';
  const repoUrl = (rawDocs && rawDocs.github_url) ? rawDocs.github_url : 'https://logreee.github.io/opensupport-app';

  const authorText = isFr
    ? '&copy; OpenSupport. Développé par <a href="https://github.com/LOgreee" target="_blank" rel="noopener noreferrer">Thibault Morisse</a> avec ❤️ en France.'
    : '&copy; OpenSupport. Developed by <a href="https://github.com/LOgreee" target="_blank" rel="noopener noreferrer">Thibault Morisse</a> with ❤️ in France.';

  const docText = isFr ? 'Documentation' : 'Documentation';

  footerElement.innerHTML = `
    <p>${authorText}</p>
    <div>
      <a href="docs.html">${docText}</a>
      <a id="footerGithubBtn" class="github-link" href="${repoUrl}" target="_blank" rel="noopener noreferrer" title="GitHub Repository">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  `;
}

function formatContent(text) {
  if (!text) return '';

  let formatted = text;

  // 1. YouTube embeds
  formatted = formatted.replace(/\[YOUTUBE:\s*([a-zA-Z0-9_-]+)\]/gi, (match, id) => {
    return `<div class="media-container video-responsive" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:16px 0;border-radius:8px;">
      <iframe src="https://www.youtube-nocookie.com/embed/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
    </div>`;
  });

  formatted = formatted.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/gi, (match, id) => {
    return `<div class="media-container video-responsive" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:16px 0;border-radius:8px;">
      <iframe src="https://www.youtube-nocookie.com/embed/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
    </div>`;
  });

  // 2. Images : [IMAGE: url], ![alt](url)
  formatted = formatted.replace(/\[IMAGE:\s*([^\]]+)\]/gi, (match, url) => {
    return `<div class="media-container" style="margin:16px 0;"><img src="${url.trim()}" alt="Illustration" style="max-width:100%;height:auto;border-radius:8px;border:1px solid var(--border);" loading="lazy"></div>`;
  });

  formatted = formatted.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
    return `<div class="media-container" style="margin:16px 0;"><img src="${url.trim()}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;border:1px solid var(--border);" loading="lazy"></div>`;
  });

  // Nettoyage des balises [IMAGE] résiduelles sans URL
  formatted = formatted.replace(/\[IMAGE\]/g, '');

  // 3. Sauts de ligne vers <br>
  formatted = formatted.replace(/(?:\r\n|\r|\n)/g, '<br>');

  return formatted;
}

function renderDocs() {
  const data = rawDocs ? rawDocs[currentLang] : null;
  if (!data) return;

  document.documentElement.lang = currentLang;
  if (searchInput) {
    searchInput.placeholder = data.search_placeholder || 'Search...';
  }

  // Récupération sécurisée des endpoints (format direct ou format api_versions)
  let allEndpoints = [];
  if (Array.isArray(data.endpoints)) {
    allEndpoints = data.endpoints;
  } else if (Array.isArray(data.api_versions)) {
    data.api_versions.forEach(ver => {
      if (Array.isArray(ver.endpoints)) {
        allEndpoints = allEndpoints.concat(ver.endpoints);
      }
    });
  }

  const q = searchQuery.toLowerCase().trim();
  let matchedAny = false;

  // 1. Sidebar Nav
  let navHtml = `<h3>${data.nav_usage || 'Guides'}</h3>`;
  if (data.sections) {
    Object.keys(data.sections).forEach(k => {
      const sec = data.sections[k];
      if (!q || sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q)) {
        navHtml += `<a href="#section-${k}">${sec.title}</a>`;
      }
    });
  }

  navHtml += `<h3>${data.nav_api || 'API Reference'}</h3>`;
  const matchedEndpoints = allEndpoints.filter(ep => 
    !q || 
    ep.path.toLowerCase().includes(q) || 
    ep.desc.toLowerCase().includes(q) ||
    (Array.isArray(ep.params) && ep.params.some(p => p.name.toLowerCase().includes(q)))
  );

  matchedEndpoints.forEach(ep => {
    navHtml += `<a href="#${ep.method}-${ep.path}">${ep.method} ${ep.path}</a>`;
  });

  if (sidebarNav) {
    sidebarNav.innerHTML = navHtml;
  }

  // 2. Main Content
  let mainHtml = `
    <div class="doc-hero">
      <h1>${data.title}</h1>
      <p>${data.subtitle}</p>
    </div>
  `;

  // Sections
  if (data.sections) {
    Object.keys(data.sections).forEach(k => {
      const sec = data.sections[k];
      const isMatch = !q || sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q);
      if (isMatch) {
        matchedAny = true;
        mainHtml += `
          <section id="section-${k}" class="doc-card">
            ${sec.category ? `<span class="version-tag" style="margin-bottom:8px;display:inline-block;">${sec.category}</span>` : ''}
            <h2>${sec.title}</h2>
            <div class="doc-content">${formatContent(sec.content)}</div>
            ${sec.code ? `<pre><code>${sec.code}</code></pre>` : ''}
          </section>
        `;
      }
    });
  }

  // Endpoints list
  if (matchedEndpoints.length > 0) {
    matchedAny = true;
    mainHtml += `
      <div class="version-title">
        <span>Endpoints</span>
        <span class="version-tag">v1</span>
      </div>
    `;

    matchedEndpoints.forEach(ep => {
      mainHtml += `
        <section id="${ep.method}-${ep.path}" class="doc-card">
          <div class="endpoint-header">
            <span class="method-badge method-${ep.method.toLowerCase()}">${ep.method}</span>
            <span class="endpoint-path">${ep.path}</span>
          </div>
          <p>${ep.desc}</p>
          
          ${Array.isArray(ep.params) && ep.params.length > 0 ? `
            <table>
              <thead>
                <tr>
                  <th>${currentLang === 'fr' ? 'Paramètre' : 'Parameter'}</th>
                  <th>${currentLang === 'fr' ? 'Type' : 'Type'}</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${ep.params.map(p => `
                  <tr>
                    <td><code>${p.name}</code> ${p.req ? `<span class="param-req">${currentLang === 'fr' ? 'REQUIS' : 'REQUIRED'}</span>` : ''}</td>
                    <td><code>${p.type}</code></td>
                    <td>${p.desc}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}

          ${ep.example ? `
            <p style="font-size: 0.85rem; font-weight: 600; color: var(--muted); margin-top: 10px;">${currentLang === 'fr' ? 'Exemple Payload / Réponse :' : 'Payload / Response Example:'}</p>
            <pre><code>${ep.example}</code></pre>
          ` : ''}
        </section>
      `;
    });
  }

  if (!matchedAny && q) {
    mainHtml += `
      <div class="no-results-box">
        <p>${data.no_results || 'No results found.'}</p>
      </div>
    `;
  }

  if (docsContent) {
    docsContent.innerHTML = mainHtml;
  }
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderDocs();
  });
}

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('opensupport_doc_lang', currentLang);
    renderLanding();
    renderDocs();
    renderFooter();
  });
}

loadData();