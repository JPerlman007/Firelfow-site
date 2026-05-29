const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Read content
const content = yaml.load(fs.readFileSync(path.join(__dirname, '_data', 'content.yml'), 'utf8'));

// Icon map
const iconMap = {
  reformer: '⚙️',
  yoga: '🧘',
  meditation: '✦'
};

// Helper: escape HTML
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Helper: convert \n to paragraph breaks
function paragraphs(str) {
  if (!str) return '';
  return str.split(/\n\n+/).map(p => `<p>${esc(p.trim())}</p>`).join('\n                ');
}

// Build sessions cards
function buildSessions(sessions) {
  return sessions.map(s => `
      <div class="option-card">
        <div class="option-icon">${iconMap[s.icon] || '✦'}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.description)}</p>
        <div class="option-detail">${esc(s.detail)}</div>
      </div>`).join('');
}

// Build experience list
function buildExperience(items) {
  return items.map(item => `
      <li>
        <span class="check">✓</span>
        <span><strong>${esc(item.bold)}</strong> ${esc(item.text)}</span>
      </li>`).join('');
}

// Build testimonials
function buildTestimonials(items) {
  return items.map(t => `
      <div class="testimonial-card">
        <blockquote>"${esc(t.quote)}"</blockquote>
        <cite>— ${esc(t.name)}, ${esc(t.detail)}</cite>
      </div>`).join('');
}

// Build testimonial video section
function buildTestimonialVideo(tv) {
  if (!tv || !tv.enabled) return '';
  return `
    <div class="testimonial-video-wrapper">
      <div class="video-wrapper" style="max-width: 560px; margin: 40px auto 0;">
        <iframe src="${esc(tv.video_url)}" title="Client testimonial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
      </div>
      <p class="lolitta-caption" style="text-align: center;">${esc(tv.caption)}</p>
    </div>`;
}

// Build studio photos
function buildStudioPhotos(photos) {
  return photos.map(p => `
      <div class="studio-photo">
        <img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy">
      </div>`).join('');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fireflow Yoga | Personal Yoga Training & Reformer Pilates | Toronto Annex</title>
<meta name="description" content="Personal yoga training, Reformer Pilates, and yoga + meditation sessions in a quiet garden studio. Seaton Village / Annex, Toronto. 20 years experience. Intro sessions available.">
<meta property="og:title" content="Fireflow Yoga | Personal Yoga Training & Reformer Pilates | Toronto">
<meta property="og:description" content="Private sessions in a garden studio near Bloor & Christie. Personal yoga training, Reformer Pilates, and meditation. 20 years experience.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.fireflowyoga.com">
<link rel="canonical" href="https://www.fireflowyoga.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">

<!-- Schema.org Local Business markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Fireflow Yoga",
  "description": "Personal yoga training, Reformer Pilates, and yoga + meditation sessions in a quiet garden studio in Seaton Village, Toronto.",
  "url": "https://www.fireflowyoga.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "71 Essex Street",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.6621,
    "longitude": -79.4225
  },
  "areaServed": ["Seaton Village", "The Annex", "Christie Pits", "Koreatown", "Little Italy", "Palmerston"],
  "foundingDate": "2007",
  "founder": {
    "@type": "Person",
    "name": "Jonathan Perlman"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Private Movement Sessions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Private Reformer Pilates",
          "description": "One-on-one Pilates Reformer sessions with spring resistance and precise instruction"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Personal Yoga Training",
          "description": "Personal yoga training for strength, flexibility, and balance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Yoga + Meditation",
          "description": "Combined yoga and guided meditation sessions"
        }
      }
    ]
  },
  "sameAs": [
    "${esc(content.contact.instagram)}",
    "https://www.facebook.com/FireflowYoga"
  ]
}
</script>

<link rel="stylesheet" href="/css/style.css">
</head>
<body>

<!-- NAV -->
<nav class="nav" id="nav">
  <a href="#" class="nav-logo">Fireflow Yoga</a>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links">
    <li><a href="#sessions">Sessions</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#studio">Studio</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#book" class="nav-cta">Book Now</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-badge">${esc(content.hero.badge)}</div>
  <h1>${esc(content.hero.headline).replace('That Works', '<em>That Works</em>')}</h1>
  <p class="hero-sub">${esc(content.hero.subheadline)}</p>
  <div class="hero-offer">
    <div class="price">${esc(content.hero.offer_main)}</div>
    <div class="price-detail">${esc(content.hero.offer_detail)}</div>
  </div>
  <a href="#book" class="cta-btn">Book Your Intro Session</a>
  <div class="hero-note">${esc(content.hero.offer_note)}</div>
  <div class="scroll-hint">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
  </div>
</section>

<!-- SESSIONS -->
<section class="section options-section" id="sessions">
  <div class="section-inner">
    <div class="section-label">Choose Your Practice</div>
    <h2>Three ways to work together</h2>
    <div class="options-grid">
      ${buildSessions(content.sessions)}
    </div>
  </div>
</section>

<!-- WHAT TO EXPECT -->
<section class="section">
  <div class="section-inner">
    <div class="section-label">What to Expect</div>
    <h2>This is what clients tell us</h2>
    <ul class="experience-list">
      ${buildExperience(content.experience)}
    </ul>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section testimonials-section">
  <div class="section-inner">
    <div class="section-label" style="color: var(--sage-light);">What Clients Say</div>
    <h2 style="color: var(--warm-cream);">Real experiences</h2>
    <div class="testimonials-grid">
      ${buildTestimonials(content.testimonials)}
    </div>
    ${buildTestimonialVideo(content.testimonial_video)}
  </div>
</section>

<!-- ABOUT -->
<section class="section about-section" id="about">
  <div class="section-inner">
    <div class="section-label">Your Teacher</div>
    <h2>Meet Jonathan</h2>
    <div class="about-layout">
      <div class="about-image-area">
        <div class="about-image-placeholder">
          <img src="${esc(content.about.photo)}" alt="Jonathan Perlman, yoga and Pilates teacher" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=placeholder-text>Add your photo to /images/jonathan.jpg</div>'">
        </div>
        <div class="about-stats">
          <div class="about-stat">
            <span class="stat-number">${esc(String(content.about.stats.years_teaching))}</span>
            <span class="stat-label">Years teaching</span>
          </div>
          <div class="about-stat">
            <span class="stat-number">${esc(String(content.about.stats.years_practice))}</span>
            <span class="stat-label">Years practice</span>
          </div>
          <div class="about-stat">
            <span class="stat-number">${esc(content.about.stats.students)}</span>
            <span class="stat-label">Students through Fireflow</span>
          </div>
        </div>
      </div>
      <div class="about-text">
        <p>${esc(content.about.intro)}</p>
        ${paragraphs(content.about.body)}

        <h3>About Fireflow</h3>
        ${paragraphs(content.about.fireflow_history)}
      </div>
    </div>
  </div>
</section>

<!-- AUNT LOLITTA -->
<section class="section lolitta-section">
  <div class="section-inner">
    <div class="section-label">The Contemplative Side</div>
    <h2>${esc(content.film.title)}</h2>
    <p class="section-prose" style="max-width: 600px; margin: 0 auto; text-align: center;">${esc(content.film.description)}</p>
    <div class="video-wrapper" style="max-width: 720px; margin: 32px auto 0;">
      <iframe src="${esc(content.film.video_url)}" title="${esc(content.film.title)} — trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
    </div>
    <div style="display: flex; justify-content: center; gap: 24px; margin-top: 24px; flex-wrap: wrap;">
      ${(content.film.festivals || []).map(f => `<span style="font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sage-dark); background: var(--sage-pale); padding: 6px 16px; border-radius: 20px;">${esc(f)}</span>`).join('')}
    </div>
    ${content.film.link_url ? `<p style="text-align: center; margin-top: 16px;"><a href="${esc(content.film.link_url)}" target="_blank" rel="noopener" style="color: var(--terracotta); font-size: 0.9rem; text-decoration: none;">${esc(content.film.link_text || 'Learn more')}</a></p>` : ''}
  </div>
</section>

<!-- WHY MOVEMENT MATTERS -->
<section class="section" style="background: var(--warm-cream); text-align: center;">
  <div class="section-inner" style="max-width: 720px;">
    <div class="section-label">Why Movement Matters</div>
    <h2>Yoga at 95: My Aunt Lolitta</h2>
    <p class="section-prose" style="max-width: 560px; margin: 0 auto; text-align: center;">${esc(content.lolitta.description)}</p>
    <div class="video-wrapper">
      <iframe src="${esc(content.lolitta.video_url)}" title="Yoga at 95 — Aunt Lolitta" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
    </div>
    <p class="lolitta-caption">${esc(content.lolitta.caption)}</p>
  </div>
</section>

<!-- STUDIO PHOTOS -->
<section class="section studio-section" id="studio">
  <div class="section-inner">
    <div class="section-label">The Space</div>
    <h2>A garden studio in the heart of the city</h2>
    <p class="section-prose">Tucked behind a house in Seaton Village, just steps from Christie Pits and Fiesta Farms. Natural light, fresh air, and the kind of quiet you don't expect in downtown Toronto.</p>
    <div class="studio-grid">
      ${buildStudioPhotos(content.studio_photos)}
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="section contact-section" id="contact">
  <div class="section-inner">
    <div class="section-label">Get in Touch</div>
    <h2>Let's work together</h2>
    <div class="contact-layout">
      <div class="contact-info">
        <h3>Ready to start?</h3>
        <p style="font-size: 0.95rem; color: var(--charcoal-light); line-height: 1.8; margin-bottom: 28px;">${esc(content.contact.intro)}</p>

        <div class="contact-detail">
          <div class="contact-icon">📍</div>
          <div>
            <div class="detail-label">Studio</div>
            <div class="detail-text">${esc(content.contact.address)}<br>${esc(content.contact.neighbourhood)}</div>
          </div>
        </div>
        <div class="contact-detail">
          <div class="contact-icon">💬</div>
          <div>
            <div class="detail-label">WhatsApp</div>
            <div class="detail-text"><a href="${esc(content.contact.whatsapp_url)}" target="_blank" rel="noopener">Message Jonathan on WhatsApp</a></div>
          </div>
        </div>
        <div class="contact-detail">
          <div class="contact-icon">📸</div>
          <div>
            <div class="detail-label">Instagram</div>
            <div class="detail-text"><a href="${esc(content.contact.instagram)}" target="_blank" rel="noopener">${esc(content.contact.instagram_handle)}</a></div>
          </div>
        </div>
      </div>
      <div>
        <form class="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact">
          <p class="hidden" style="display:none"><label>Don't fill this out: <input name="bot-field"></label></p>
          <div class="form-row">
            <input type="text" name="first-name" placeholder="First name" aria-label="First name" required>
            <input type="text" name="last-name" placeholder="Last name" aria-label="Last name">
          </div>
          <input type="email" name="email" placeholder="Email address" aria-label="Email address" required>
          <input type="tel" name="phone" placeholder="Phone (optional)" aria-label="Phone number">
          <textarea name="message" placeholder="Tell me a little about what you're looking for — any goals, limitations, or questions." aria-label="Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- BOTTOM CTA -->
<section class="bottom-cta" id="book">
  <h2>${esc(content.booking.headline)}</h2>
  <p>${esc(content.booking.description)}<br>${esc(content.booking.location)}</p>
  <a href="${esc(content.booking.booking_url)}" class="cta-btn cta-btn-static">Book Your First Session</a>
  <div class="hero-note" style="margin-top: 16px; opacity: 1; animation: none;">Or message Jonathan on <a href="${esc(content.contact.whatsapp_url)}" target="_blank" rel="noopener" style="color: var(--terracotta); text-decoration: none;">WhatsApp</a></div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-links">
    <a href="#sessions">Sessions</a>
    <a href="#about">About</a>
    <a href="#studio">Studio</a>
    <a href="#contact">Contact</a>
    <a href="${esc(content.contact.instagram)}" target="_blank" rel="noopener">Instagram</a>
    <a href="https://www.facebook.com/FireflowYoga" target="_blank" rel="noopener">Facebook</a>
  </div>
  <p>© ${new Date().getFullYear()} Fireflow Yoga · ${esc(content.contact.address)}, Toronto · Originally founded 2007</p>
</footer>

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('open');
    });
  });
</script>

</body>
</html>`;

// Write output
const outDir = path.join(__dirname, '_site');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Copy admin
const adminDir = path.join(outDir, 'admin');
if (!fs.existsSync(adminDir)) fs.mkdirSync(adminDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'admin', 'index.html'), path.join(adminDir, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'admin', 'config.yml'), path.join(adminDir, 'config.yml'));

// Copy CSS
const cssOutDir = path.join(outDir, 'css');
if (!fs.existsSync(cssOutDir)) fs.mkdirSync(cssOutDir, { recursive: true });
const cssSrc = path.join(__dirname, 'css', 'style.css');
if (fs.existsSync(cssSrc)) fs.copyFileSync(cssSrc, path.join(cssOutDir, 'style.css'));

// Copy images
const imgSrc = path.join(__dirname, 'images');
const imgOut = path.join(outDir, 'images');
if (fs.existsSync(imgSrc)) {
  if (!fs.existsSync(imgOut)) fs.mkdirSync(imgOut, { recursive: true });
  fs.readdirSync(imgSrc).forEach(f => {
    fs.copyFileSync(path.join(imgSrc, f), path.join(imgOut, f));
  });
}

// Write HTML
fs.writeFileSync(path.join(outDir, 'index.html'), html);

// Write robots.txt
fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: https://www.fireflowyoga.com/sitemap.xml
`);

// Write sitemap
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.fireflowyoga.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`);

console.log('✅ Site built to _site/');
console.log('   - index.html (main site)');
console.log('   - admin/ (CMS admin panel)');
console.log('   - robots.txt');
console.log('   - sitemap.xml');
