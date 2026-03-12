async function loadHomepageArticles() {
  try {
    const response = await fetch("articles.json");
    const articles = await response.json();

    // Sort newest first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Grab the newest 3
    const featured = articles.slice(0, 3);

    const leadContainer = document.getElementById("lead-story-container");
    const secondaryContainer = document.getElementById("secondary-stories-container");

    if (!leadContainer || !secondaryContainer || featured.length === 0) return;

    // First article = lead story
    const lead = featured[0];
    leadContainer.innerHTML = `
      <article class="lead-story">
        <div class="feature-image placeholder-image">
          ${lead.imageLabel}
        </div>

        <div class="lead-story-content">
          <p class="kicker">${lead.section}</p>

          <h3>
            <a href="${lead.url}">
              ${lead.title}
            </a>
          </h3>

          <p>
            ${lead.subtitle}
          </p>
        </div>
      </article>
    `;

    // Next two = secondary stories
    const secondary = featured.slice(1);
    secondaryContainer.innerHTML = secondary.map(article => `
      <article class="feature-card">
        <div class="feature-image placeholder-image">
          ${article.imageLabel}
        </div>

        <div class="feature-card-content">
          <p class="kicker">${article.section}</p>

          <h3>
            <a href="${article.url}">
              ${article.title}
            </a>
          </h3>

          <p>
            ${article.subtitle}
          </p>
        </div>
      </article>
    `).join("");
  } catch (error) {
    console.error("Error loading homepage articles:", error);
  }
}

loadHomepageArticles();
