// SwissDiplomaHub - Card Navigation
// Gruppierte Hubs
const ed = [
  { title: "ICT Manager ED", file: "ict-manager-ed-lehrplan.html" }
];

const fa = [
  { title: "Digital Collaboration Specialist FA", file: "digital-collaboration-specialist-fa-lehrplan.html" },
  { title: "ICT Application Development Specialist FA Backend", file: "ict-application-development-specialist-fa-backend-lehrplan.html" },
  { title: "ICT Application Development Specialist FA Data", file: "ict-application-development-specialist-fa-data-lehrplan.html" },
  { title: "ICT Application Development Specialist FA Frontend", file: "ict-application-development-specialist-fa-frontend-lehrplan.html" },
  { title: "ICT Application Development Specialist FA Mobile", file: "ict-application-development-specialist-fa-mobile-lehrplan.html" },
  { title: "ICT Platform Development Specialist FA", file: "ict-platform-development-specialist-fa-lehrplan.html" },
  { title: "Wirtschaftsinformatiker FA", file: "wirtschaftsinformatiker-fa-lehrplan.html" }
];

const efz = [
  { title: "Informatiker EFZ Applikationsentwicklung", file: "informatiker-efz-appli-lehrplan.html" },
  { title: "Informatiker EFZ Plattformentwicklung", file: "informatiker-efz-platt-lehrplan.html" },
  { title: "ICT Fachperson EFZ", file: "ict-fachperson-efz-lehrplan.html" }
];

function renderCards(hubs, containerId) {
  const container = document.getElementById(containerId);
  hubs.forEach(hub => {
    const card = document.createElement("a");
    card.className = "card card-link";
    card.href = hub.file;
    card.innerHTML = `<div class=\"card-title\">${hub.title}</div>`;
    container.appendChild(card);
  });
}

renderCards(ed, "edCards");
renderCards(fa, "faCards");
renderCards(efz, "efzCards");