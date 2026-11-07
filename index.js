// SwissDiplomaHub - Card Navigation
// Gruppierte Hubs
const ed = [
  {
    title: "ICT Manager ED",
    file: "study-plan.html?studiengang=rest/ict-manager-ed-lehrplan",
  },
];

const hfInformatiker = [
  { title: "Informatiker HF WISS", file: "study-plan.html?studiengang=informatiker-hf-wiss" },
  {
    title: "Informatiker HF ABB Technikerschule",
    file: "study-plan.html?studiengang=informatiker-hf-abb",
  },
  { title: "Informatiker HF Ipso", file: "study-plan.html?studiengang=informatiker-hf-ipso" },
  {
    title: "Informatiker HF Juventus",
    file: "study-plan.html?studiengang=informatiker-hf-juventus",
  },
  {
    title: "Informatiker HF TEKO",
    file: "study-plan.html?studiengang=informatiker-hf-teko",
  },
];

const hfWirtschaftsinformatiker = [
  {
    title: "Wirtschaftsinformatiker HF SIW",
    file: "study-plan.html?studiengang=wirtschaftsinformatiker-hf-siw",
  },
  {
    title: "Wirtschaftsinformatiker HF WISS",
    file: "study-plan.html?studiengang=wirtschaftsinformatiker-hf-wiss",
  },
];

const hfWeitere = [
  {
    title: "Fachpersonen Operationstechnik HF",
    file: "study-plan.html?studiengang=fachpersonen-operationstechnik-hf",
  },
  {
    title: "Gebäudeautomatiker HF",
    file: "study-plan.html?studiengang=gebaeudeautomatiker-hf",
  },
  {
    title: "Dipl. Gebäudetechniker/-in HF",
    file: "study-plan.html?studiengang=gebaeudetechniker-hf",
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
