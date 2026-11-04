/* =========================================================
   PORTAL SETTINGS — the main file you edit
   ========================================================= */
window.CONFIG = {
  // Paste your Google Apps Script Web App URL between the quotes (setup guide, step 4)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycby4Wl3_brMywM4wISZBSdmTY8ygs9JKn9jeVp_4k1CmLhw4RogGiKvzsXbZr0IIGwrD/exec",

  SITE_TITLE: "ACCA with Hamza – Mock Portal",
  TAGLINE: "Practise. Analyse. Pass.",
  LOGO: "img/hamza.webp",
  ABOUT: "Hi, I'm Hamza. I created this portal to help ACCA students practise in real exam conditions and know exactly what to revise.",
  INSTA_HANDLE: "@acca.with.hamza",
  INSTAGRAM: "https://www.instagram.com/acca.with.hamza/",
  YOUTUBE: "https://www.youtube.com/@accawithhamza",

  // Announcement bar on the dashboard (leave "" to hide)
  ANNOUNCEMENT: "More papers coming soon – FA, MA and LW mocks are on the way.",

  PASS_MARK: 50,

  // Support chat – first message students see when they open "Chat with Hamza" ({name} = student's first name)
  CHAT_WELCOME: "Hi {name}! 👋 Thanks for reaching out. Hamza usually replies within 24 hours. Send your question or a screenshot below.",

  // Papers shown in the menu. Add new papers here later.
  PAPERS: [
    {
      code: "BT", name: "Business and Technology", level: "Applied Knowledge",
      minutes: 120, live: true,
      syllabus: "papers/bt/syllabus.js",
      formulaSheet: "",          // for FA/FR/TX/PM/FM later: HTML of the formula sheet / tables
      format: [
        ["Section A – objective test questions", "30 × 2 marks, 16 × 1 mark", 76],
        ["Section B – multi-task questions", "6 × 4 marks", 24]
      ],
      mocks: [
        { key: "BT-1", title: "Mock Exam 1", file: "papers/bt/mock1.js", live: true  },
        { key: "BT-2", title: "Mock Exam 2", file: "papers/bt/mock2.js", live: false },
        { key: "BT-3", title: "Mock Exam 3", file: "papers/bt/mock3.js", live: false },
        { key: "BT-4", title: "Mock Exam 4", file: "papers/bt/mock4.js", live: false }
      ],
      tips: [
        "Budget about 1.5 min per 2-mark question, 1 min per 1-mark question and 7 min per Section B question.",
        "There is no negative marking – never leave a question blank.",
        "For 'select TWO' questions, eliminate the clearly wrong options first.",
        "In Section B, matching and multiple-response items earn marks individually – attempt every row.",
        "Flag difficult questions and come back to them using the Navigator."
      ]
    }
  ],

  // Shown as "coming soon" in the menu
  COMING_SOON: ["MA – Management Accounting", "FA – Financial Accounting", "LW – Corporate and Business Law"]
};
