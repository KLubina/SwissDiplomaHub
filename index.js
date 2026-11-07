// SwissDiplomaHub - Card Navigation
// Gruppierte Hubs
const ed = [
  {
    title: "ICT Manager ED",
    file: "study-plan.html?studiengang=rest/ict-manager-ed-lehrplan",
  },
];

const hfInformatiker = [
  { title: "Informatiker HF WISS", file: "informatiker-hf-wiss-lehrplan.html" },
  {
    title: "Informatiker HF ABB Technikerschule",
    file: "informatiker-hf-abb-lehrplan.html",
  },
  { title: "Informatiker HF Ipso", file: "informatiker-hf-ipso-lehrplan.html" },
  {
    title: "Informatiker HF Juventus",
    file: "informatiker-hf-juventus-lehrplan.html",
  },
  {
    title: "Informatiker HF TEKO",
    file: "informatiker-hf-teko-lehrplan.html",
  },
];

const hfWirtschaftsinformatiker = [
  {
    title: "Wirtschaftsinformatiker HF SIW",
    file: "wirtschaftsinformatiker-hf-siw-lehrplan.html",
  },
  {
    title: "Wirtschaftsinformatiker HF WISS",
    file: "wirtschaftsinformatiker-hf-wiss-lehrplan.html",
  },
];

const hfWeitere = [
  {
    title: "Fachpersonen Operationstechnik HF",
    file: "fachpersonen-operationstechnik-hf-lehrplan.html",
  },
  {
    title: "Gebäudeautomatiker HF",
    file: "gebaeudeautomatiker-hf-lehrplan.html",
  },
];

const fa = [
  {
    title: "Digital Collaboration Specialist FA",
    file: "study-plan.html?studiengang=rest/digital-collaboration-specialist-fa-lehrplan",
  },
  {
    title: "ICT Application Development Specialist FA Backend",
    file: "study-plan.html?studiengang=rest/ict-application-development-specialist-fa-backend-lehrplan",
  },
  {
    title: "ICT Application Development Specialist FA Data",
    file: "study-plan.html?studiengang=rest/ict-application-development-specialist-fa-data-lehrplan",
  },
  {
    title: "ICT Application Development Specialist FA Frontend",
    file: "study-plan.html?studiengang=rest/ict-application-development-specialist-fa-frontend-lehrplan",
  },
  {
    title: "ICT Application Development Specialist FA Mobile",
    file: "study-plan.html?studiengang=rest/ict-application-development-specialist-fa-mobile-lehrplan",
  },
  {
    title: "ICT Platform Development Specialist FA",
    file: "study-plan.html?studiengang=rest/ict-platform-development-specialist-fa-lehrplan",
  },
  {
    title: "Wirtschaftsinformatiker FA",
    file: "study-plan.html?studiengang=rest/wirtschaftsinformatiker-fa-lehrplan",
  },
];

const efz = [
  {
    title: "Informatiker EFZ Applikationsentwicklung",
    file: "study-plan.html?studiengang=rest/informatiker-efz-appli-lehrplan",
  },
  {
    title: "Informatiker EFZ Plattformentwicklung",
    file: "study-plan.html?studiengang=rest/informatiker-efz-platt-lehrplan",
  },
  {
    title: "ICT Fachperson EFZ",
    file: "study-plan.html?studiengang=rest/ict-fachperson-efz-lehrplan",
  },
];

function renderCards(hubs, containerId) {
  const container = document.getElementById(containerId);
  hubs.forEach((hub) => {
    const card = document.createElement("a");
    card.className = "card card-link";
    card.href = hub.file;
    card.innerHTML = `<div class=\"card-title\">${hub.title}</div>`;
    container.appendChild(card);
  });
}

renderCards(ed, "edCards");
renderCards(hfInformatiker, "hfInformatikerCards");
renderCards(hfWirtschaftsinformatiker, "hfWirtschaftsinformatikerCards");
renderCards(hfWeitere, "hfWeitereCards");
renderCards(fa, "faCards");
renderCards(efz, "efzCards");
