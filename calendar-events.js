async function loadCalendarEvents() {
  try {
    const response = await fetch("../../events.json");
    const events = await response.json();

    const upcomingEvents = events
      .filter(event => new Date(event.startDate) >= new Date("2026-01-01"))
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    const heroEvent = upcomingEvents.find(event => event.hero === true);

    const featuredEvents = upcomingEvents
      .filter(event => event.featured === true);

    const heroContainer = document.getElementById("calendar-hero-container");
    const featuredContainer = document.getElementById("featured-events-container");
    const listContainer = document.getElementById("calendar-list-container");

if (heroContainer && heroEvent) {
  heroContainer.innerHTML = `
    <article class="calendar-hero-card">
      <a href="${heroEvent.url}" target="_blank" rel="noopener noreferrer">
        <div class="calendar-hero-image-wrap">
          <img src="../../${heroEvent.image}" alt="${heroEvent.title}" class="calendar-hero-image">

          <div class="calendar-hero-overlay">
            <p class="kicker">${heroEvent.secondaryCategory} / ${heroEvent.category}</p>
            <h2>${heroEvent.title}</h2>
            <p class="calendar-hero-meta">${heroEvent.location} · ${heroEvent.displayDate}</p>
            <span class="calendar-hero-link">View Event</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

    if (featuredContainer && featuredEvents.length > 0) {
      featuredContainer.innerHTML = featuredEvents.map(event => `
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
    }

    if (listContainer && upcomingEvents.length > 0) {
      listContainer.innerHTML = upcomingEvents.map(event => `
        <article class="calendar-list-item">
          <a href="${event.url}" target="_blank" rel="noopener noreferrer" class="calendar-list-image-link">
            <img src="../../${event.image}" alt="${event.title}" class="calendar-list-image">
          </a>

          <div class="calendar-list-date">
            <span>${event.month}</span>
            <strong>${event.dayRange}</strong>
          </div>

          <div class="calendar-list-content">
            <p class="kicker">${event.secondaryCategory} / ${event.category}</p>
            <h3>
              <a href="${event.url}" target="_blank" rel="noopener noreferrer">
                ${event.title}
              </a>
            </h3>
            <p class="event-meta">${event.displayDate} · ${event.location} · ${event.city}</p>
            <p>${event.description}</p>
          </div>
        </article>
      `).join("");
    }

  } catch (error) {
    console.error("Error loading calendar events:", error);
  }
}

loadCalendarEvents();
