async function loadCalendarEvents() {
  try {
    const response = await fetch("../../events.json");
    const events = await response.json();

    const featuredEvents = events
      .filter(event => event.featured === true)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    const container = document.getElementById("featured-events-container");

    if (!container || featuredEvents.length === 0) return;

    container.innerHTML = featuredEvents.map(event => `
      <article class="event-card">
        <a href="${event.url}" target="_blank" rel="noopener noreferrer">
          <div class="event-image-wrap">
            <img src="../../${event.image}" alt="${event.title}" class="event-card-image">

            <div class="event-date-badge">
              <span class="event-month">${event.month}</span>
              <span class="event-day">${event.dayRange}</span>
            </div>
          </div>

          <div class="event-card-content">
            <p class="kicker">${event.secondaryCategory} / ${event.category}</p>
            <h2>${event.title}</h2>
            <p class="event-meta">${event.displayDate} · ${event.city}</p>
            <p>${event.description}</p>
          </div>
        </a>
      </article>
    `).join("");
  } catch (error) {
    console.error("Error loading calendar events:", error);
  }
}

loadCalendarEvents();
