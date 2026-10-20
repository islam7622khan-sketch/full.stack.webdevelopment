/* Router, rendering, animations, form logic */
const $ = (selector) => document.querySelector(selector);
const app = $('#app');
const menu = $('#menu');
const mobileMenuButton = $('#mb');

const renderNav = () => {
  menu.innerHTML = `${NAV.map(
    (item) => `<li><a href="${item[1]}">${item[0]}</a></li>`
  ).join('')}<li><a class="btn" href="#/book">Book a consultation</a></li>`;
};

const renderFooterText = () => {
  $('#fd').textContent = CFG.tag;
  $('#fc').textContent = `© ${new Date().getFullYear()} ${CFG.name}. ${CFG.email} · ${CFG.phone}. Placeholder legal notice: describe your legal entity and any regulatory status here.`;
};

const toggleMobileMenu = (event) => {
  const isOpen = menu.classList.toggle('open');
  event.target.setAttribute('aria-expanded', isOpen);
};

const renderNews = (items) =>
  items
    .map(
      (item, index) => `
        <div class="news reveal i${index % 4}">
          <a href="#/insights">
            <div class="im"></div>
            <span class="tag">Sample content</span>
            <div class="meta">${item[1]} · ${item[2]}</div>
            <h3>${item[0]}</h3>
            <div class="meta">[date placeholder]</div>
          </a>
        </div>
      `
    )
    .join('');

const cta = `
  <section class="dk">
    <div class="w reveal">
      <h2 style="max-width:18ch">Your numbers deserve a clearer strategy.</h2>
      <p class="mute" style="max-width:50ch">Let's build a more organised, transparent and confident financial future for your business.</p>
      <a class="btn" style="background:#fff;color:#1d1d1b;border-color:#fff" href="#/book">Book a consultation</a>
    </div>
  </section>
`;

const renderHeader = (title, lead, content) => `
  <section style="padding-bottom:20px">
    <div class="w">
      <div class="crumb"><a href="#/">Home</a> / ${title}</div>
      <h1 style="font-size:clamp(2.2rem,5vw,4rem)">${title}</h1>
      <p class="mute" style="font-size:1.2rem;max-width:56ch">${lead}</p>
    </div>
  </section>
  ${content}
`;

const renderServiceCards = (items) =>
  items
    .map(
      ([title, description, link]) => `
        <a href="${link}">
          <h3>${title}</h3>
          <p class="mute">${description}</p>
          <span class="rd">Read more</span>
        </a>
      `
    )
    .join('');

const renderForm = () => `
  <form id="f" novalidate>
    <label>Full name<input name="n" required autocomplete="name"></label>
    <label>Business email<input name="e" type="email" required autocomplete="email"></label>
    <label>Company<input name="c"></label>
    <label>Country or jurisdiction<input name="j" required></label>
    <label>Service of interest
      <select name="s">${S.map((service) => `<option>${service[0]}</option>`).join('')}</select>
    </label>
    <label>Preferred contact method
      <select name="m">
        <option>Email</option>
        <option>Phone</option>
        <option>Video call</option>
      </select>
    </label>
    <label>Message (optional)<textarea name="g" rows="4"></textarea></label>
    <label style="display:flex;gap:10px;font-weight:400">
      <input type="checkbox" name="p" required style="width:auto">I consent to being contacted about my enquiry. See the Privacy Policy.
    </label>
    <div id="st" role="status" aria-live="polite"></div>
    <button class="btn">Send enquiry</button>
  </form>
`;

const renderNotFoundPage = () =>
  renderHeader(
    'Page not found',
    'That page does not exist.',
    '<section><div class="w"><a class="btn" href="#/">Back to home</a></div></section>'
  );

const renderPage = (key) => {
  const pageData = P[key];

  if (!pageData) {
    return renderNotFoundPage();
  }

  const [title, lead, sectionTitle, sectionText, optionalTitle, optionalText] = pageData;
  const secondarySection = optionalTitle
    ? `<h2>${optionalTitle}</h2><p class="mute">${optionalText}</p>`
    : '';

  return renderHeader(
    title,
    lead,
    `<section style="padding-top:20px">
      <div class="w" style="max-width:760px">
        <h2>${sectionTitle}</h2>
        <p class="mute">${sectionText}</p>
        ${secondarySection}
      </div>
    </section>
    ${['privacy', 'terms'].includes(key) ? '' : cta}`
  );
};

const routes = {
  '': () => `
    <section class="hero">
      <div class="w">
        <h1>Financial clarity without borders.</h1>
        <p>Bookkeeping, financial reporting, tax compliance support and advisory for businesses operating across international markets.</p>
        <a class="btn" href="#/services">Explore our services</a>
      </div>
    </section>
    <div class="w">
      <div class="intro">
        <h2>No one can see the future. Clear books help.</h2>
        <p class="mute">Good advisers know the rules. Great advisers keep your records so organised that every decision starts from facts. We help businesses in the US, UAE, UK and beyond stay ready for what comes next.</p>
      </div>
      <div class="nums">
        <div><b>500M</b>Verified statistic</div>
        <div><b>USA & UK</b>Territories served</div>
        <div><b>12</b>Offices</div>
        <div><b>20</b>People</div>
      </div>
    </div>
    <section class="soft">
      <div class="w">
        <h2>Latest news and insights</h2>
        <div class="grid">${renderNews(ART.slice(0, 4))}</div>
        <p><a class="rd" href="#/insights">All insights</a></p>
      </div>
    </section>
    <section>
      <div class="w">
        <h2>People first</h2>
        <div class="pr">
          <div class="reveal">
            <h3>About us</h3>
            <p class="mute">We support you wherever you operate, at whatever scale.</p>
            <a class="rd" href="#/about">Read more</a>
          </div>
          <div class="reveal">
            <h3>Industries</h3>
            <p class="mute">Sector-aware support, from SaaS to construction.</p>
            <a class="rd" href="#/industries">Read more</a>
          </div>
          <div class="reveal">
            <h3>Careers</h3>
            <p class="mute">[Placeholder for hiring information.]</p>
            <a class="rd" href="#/contact">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
    <section class="soft">
      <div class="w">
        <h2>Services</h2>
        <p class="mute" style="max-width:56ch">When the fundamentals are taken care of, you can focus on growing your business, not your to-do list.</p>
        <div class="sv">${renderServiceCards([
          ["Bookkeeping & reporting", "Accurate records and statements you can read.", "#/bookkeeping"],
          ["Tax compliance support", "Preparation support, organised by jurisdiction.", "#/tax"],
          ["Audit preparation", "Be ready for your external auditor. Not a statutory audit.", "#/audit"],
          ["Advisory", "Budgets, forecasts and management accounting.", "#/advisory"]
        ])}</div>
      </div>
    </section>
    <section class="dk">
      <div class="w">
        <h2>People on the ground. Wherever the opportunity lands.</h2>
        <div class="two">
          <div>
            <h3>International enquiries</h3>
            <p class="mute">Multi-market and cross-border support.</p>
            <a class="btn o" href="#/contact">Contact the team</a>
          </div>
          <div>
            <h3>Regions</h3>
            <a class="lk" href="#/us">United States</a>
            <a class="lk" href="#/uae">United Arab Emirates</a>
            <a class="lk" href="#/contact">United Kingdom & international</a>
          </div>
        </div>
      </div>
    </section>
  `,
  services: () => renderHeader(
    'Services',
    'Everything from the monthly close to cross-border reporting.',
    `<section><div class="w"><div class="sv" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">${renderServiceCards(S)}</div></div></section>${cta}`
  ),
  industries: () => renderHeader(
    'Industries',
    'Sector-aware support for growing businesses.',
    `<section><div class="w">${IND.map((industry) => `<a class="lk reveal" style="color:var(--ink);border-color:var(--line)" href="#/contact">${industry}</a>`).join('')}</div></section>${cta}`
  ),
  insights: () => renderHeader(
    'Insights',
    'Sample articles, shown as demonstration content until reviewed and approved.',
    `<section><div class="w"><div class="grid">${renderNews(ART)}</div></div></section>`
  ),
  contact: () => renderHeader(
    'Contact',
    'Tell us about your business. Please do not send sensitive financial or tax documents here.',
    `<section style="padding-top:20px"><div class="w">${renderForm()}<p class="mute">${CFG.email} · ${CFG.phone} · ${CFG.address}</p><details><summary>Cookie preferences</summary><p class="mute">This demo sets no cookies. Add your consent tool here.</p></details></div></section>`
  ),
  book: () => renderHeader(
    'Book a consultation',
    'Request a time and we will confirm by your preferred method.',
    `<section style="padding-top:20px"><div class="w">${CFG.bookingUrl ? `<a class="btn" href="${CFG.bookingUrl}">Open scheduling</a>` : '<p class="mute">No scheduling provider is configured. Set CFG.bookingUrl to add one.</p>'}${renderForm()}</div></section>`
  )
};

const setActiveNavigation = (key) => {
  document.querySelectorAll('nav a').forEach((link) => {
    const isCurrentPage = link.getAttribute('href') === '#/' + key;
    if (isCurrentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const bindRevealAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(element);
  });
};

const validateForm = (form) => {
  form.querySelectorAll('.err').forEach((error) => error.remove());

  let hasErrors = false;

  form.querySelectorAll('[required]').forEach((field) => {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const message = !value
      ? 'This field is required.'
      : field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)
        ? 'Enter a valid email address.'
        : '';

    field.removeAttribute('aria-invalid');

    if (message) {
      hasErrors = true;
      field.setAttribute('aria-invalid', 'true');
      field.parentNode.insertAdjacentHTML('beforeend', `<span class="err" role="alert">${message}</span>`);
    }
  });

  return hasErrors;
};

const handleFormSubmit = async (event) => {
  const form = event.currentTarget;
  event.preventDefault();

  if (validateForm(form)) {
    return;
  }

  const statusNode = $('#st');

  if (!CFG.formEndpoint) {
    statusNode.innerHTML = '<div class="ok"><b>Demo mode.</b> Nothing was sent. Set CFG.formEndpoint to a secure server-side endpoint to receive real enquiries.</div>';
    return;
  }

  try {
    const response = await fetch(CFG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    statusNode.innerHTML = '<div class="ok">Thank you. We will be in touch.</div>';
    form.reset();
  } catch (error) {
    statusNode.innerHTML = '<div class="err">Your enquiry could not be sent. Please try again or email us directly.</div>';
  }
};

const go = () => {
  const key = location.hash.replace('#/', '');
  const pageRenderer = routes[key] || (() => renderPage(key));

  app.innerHTML = pageRenderer();
  document.title = (key && P[key] ? `${P[key][0]} | ` : '') + CFG.name;
  setActiveNavigation(key);
  menu.classList.remove('open');
  window.scrollTo(0, 0);

  bindRevealAnimations();

  const form = $('#f');
  if (form) {
    form.onsubmit = handleFormSubmit;
  }
};

renderNav();
renderFooterText();
mobileMenuButton.onclick = (event) => toggleMobileMenu(event);
addEventListener('hashchange', go);
go();
