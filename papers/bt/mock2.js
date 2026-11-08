/* =========================================================
   BT MOCK EXAM 2  –  46 OTQs (Section A) + 6 MTQs (Section B)
   Same format and marking rules as Mock 1 (see mock1.js header).
   To fix a question, edit it in place (do not insert/delete – keeps saved results aligned).
   ========================================================= */
window.MOCKS = window.MOCKS || {};
window.MOCKS["BT-2"] = {
title: "Mock Exam 2",
sectionA: [

/* ---------------- AREA A ---------------- */
{ ch:1, topic:"Partnerships vs limited companies", marks:2, type:"mcq",
  q:"Which of the following is a feature of a traditional partnership but NOT of a limited company?",
  opts:["Ownership is through shares which can be transferred",
        "The business is a separate legal entity from its owners",
        "The owners are personally liable for the debts of the business",
        "Profits belong to the owners of the business"],
  ans:2,
  exp:"In a traditional partnership (like a sole trader) the business is <b>not</b> legally separate from its owners, so partners are <b>personally liable</b> for its debts. A limited company is a separate legal entity, and shareholders' liability is limited to their investment." },

{ ch:5, topic:"Stakeholder objectives", marks:2, type:"multi",
  q:"Which TWO of the following stakeholders are correctly matched with their main objective?",
  opts:["Customers – value for money and product quality",
        "Employees – maximising the dividend paid",
        "Lenders – security of their loan and receipt of interest",
        "Government – paying the lowest possible wages"],
  ans:[0,2],
  exp:"Customers want <b>value and quality</b>; lenders want their loan to be <b>safe and interest paid</b>. Dividends are a shareholder objective; employees want pay, security and good conditions; government wants tax revenue, employment and compliance with the law." },

{ ch:6, topic:"Data protection principles", marks:2, type:"multi",
  q:"Which TWO of the following are data protection principles?",
  opts:["Personal data must be accurate and, where necessary, kept up to date",
        "Personal data may be kept indefinitely in case it becomes useful later",
        "Personal data must be used fairly, lawfully and transparently",
        "Personal data may be passed to any third party once it has been collected"],
  ans:[0,2],
  exp:"The principles require data to be used <b>fairly, lawfully and transparently</b>, for specified purposes, limited to what is necessary, <b>accurate and up to date</b>, kept no longer than necessary and kept secure." },

{ ch:7, topic:"Monetary policy", marks:1, type:"mcq",
  q:"Which of the following is a monetary policy measure?",
  opts:["Raising interest rates","Increasing income tax rates"],
  ans:0,
  exp:"<b>Monetary policy</b> controls interest rates and the money supply (usually by the central bank). Changing taxation and government spending is <b>fiscal</b> policy." },

{ ch:7, topic:"Cost-push vs demand-pull inflation", marks:2, type:"mcq",
  q:"Which of the following could cause cost-push inflation?<br><br>1. A sharp rise in world oil prices<br>2. Wage increases that exceed growth in productivity<br>3. A large increase in consumer spending financed by borrowing",
  opts:["1 only","1 and 2","2 and 3","1, 2 and 3"],
  ans:1,
  exp:"<b>Cost-push</b> inflation comes from rising production costs, such as energy prices and wages above productivity growth. Increased consumer spending causes <b>demand-pull</b> inflation." },

{ ch:7, topic:"Protectionism", marks:1, type:"mcq",
  q:"Which of the following is a form of protectionism?",
  opts:["A free trade agreement","An import quota"],
  ans:1,
  exp:"<b>Quotas</b> limit the quantity of imports, protecting domestic producers. Tariffs, subsidies and embargoes are other forms. Free trade agreements remove barriers to trade." },

{ ch:8, topic:"Technology and employment", marks:2, type:"multi",
  q:"Which TWO of the following are likely effects of increased automation and artificial intelligence on employment?",
  opts:["Increased demand for unskilled manual workers",
        "Loss of jobs involving routine, repetitive tasks",
        "No further need for human judgement in decision-making",
        "Increased demand for employees with digital and technical skills"],
  ans:[1,3],
  exp:"Automation replaces <b>routine tasks</b> and increases demand for <b>digital skills</b> to design, run and maintain systems. Demand for unskilled manual work tends to fall, and human judgement is still needed." },

{ ch:9, topic:"Barriers to entry", marks:2, type:"multi",
  q:"Which TWO of the following would act as barriers to entry into an industry?",
  opts:["Strong customer loyalty to existing brands",
        "Low switching costs for customers",
        "Easy access to distribution channels",
        "High capital investment required to start up"],
  ans:[0,3],
  exp:"<b>Brand loyalty</b> and <b>high capital requirements</b> make it hard for new firms to enter, lowering the threat of new entrants. Low switching costs and easy access to distribution make entry <b>easier</b>." },

{ ch:9, topic:"Value chain – primary activities", marks:1, type:"mcq",
  q:"In Porter's value chain, after-sales service is classified as which type of activity?",
  opts:["Primary activity","Support activity"],
  ans:0,
  exp:"The primary activities are inbound logistics, operations, outbound logistics, marketing and sales, and <b>service</b> (after-sales). Support activities are procurement, technology development, HRM and firm infrastructure." },

/* ---------------- AREA B ---------------- */
{ ch:2, topic:"Span of control", marks:2, type:"mcq",
  q:"Which of the following would allow a manager to have a WIDER span of control?",
  opts:["Subordinates carry out complex and varied work",
        "Subordinates work in many different locations",
        "The manager has many non-supervisory duties of their own",
        "Subordinates are highly trained and perform similar, routine work"],
  ans:3,
  exp:"A wide span is possible when subordinates are <b>competent</b> and the work is <b>similar and routine</b>, so less supervision is needed. Complex work, dispersed staff and heavy personal workloads all point to a narrower span." },

{ ch:2, topic:"Geographical to functional structure", marks:2, type:"mcq",
  q:"A car manufacturer changes from a geographical structure to a functional structure. Each factory, wherever it is located, will now produce only one type of component for the whole group.<br><br>Which of the following is the MOST likely outcome?",
  opts:["Greater responsiveness to the needs of local markets",
        "Economies of scale and greater specialisation",
        "Duplication of functions in each region",
        "More managers gaining general management experience"],
  ans:1,
  exp:"Concentrating each activity in one place gives <b>economies of scale and specialisation</b>. Responsiveness to local markets is an advantage of the geographical structure being given up; duplication is a disadvantage of geographical/divisional structures." },

{ ch:2, topic:"Shared service centres", marks:2, type:"mcq",
  q:"Which of the following BEST describes a shared service centre?",
  opts:["A function, such as payroll, that is centralised within the organisation to serve several business units",
        "A function handed over to an external provider under a contract",
        "A new business owned jointly by two separate companies",
        "Employees being trained to carry out several different jobs"],
  ans:0,
  exp:"A <b>shared service centre</b> brings a function used by many units into one internal centre. Handing it to an external supplier is <b>outsourcing</b>; joint ownership is a joint venture; training staff for several jobs is multi-skilling." },

{ ch:3, topic:"Hofstede – individualism/collectivism", marks:2, type:"mcq",
  q:"In Country Z, people see themselves mainly as members of a group. They are very loyal to their extended family and employer, and decisions are made with the group's interests in mind.<br><br>Which of Hofstede's dimensions does this describe?",
  opts:["Low individualism (collectivism)","High individualism","High power distance","Low uncertainty avoidance"],
  ans:0,
  exp:"Strong group loyalty and putting the group first indicate <b>collectivism</b>, the low end of the individualism dimension. In individualist cultures, people look after themselves and their immediate family." },

{ ch:3, topic:"Informal organisation", marks:1, type:"mcq",
  q:"Which of the following is a DISADVANTAGE of the informal organisation?",
  opts:["Information spreads quickly between staff","Rumours spread through the grapevine may be inaccurate"],
  ans:1,
  exp:"The grapevine is fast, which is an advantage, but it can spread <b>inaccurate rumours</b> and undermine formal communication." },

{ ch:11, topic:"Corporate social responsibility", marks:2, type:"multi",
  q:"Which TWO of the following are examples of corporate social responsibility?",
  opts:["Complying with minimum wage legislation",
        "Funding education programmes in the local community",
        "Paying the highest possible dividend to shareholders",
        "Reducing carbon emissions beyond what the law requires"],
  ans:[1,3],
  exp:"CSR means going <b>beyond</b> legal and economic obligations to benefit society and the environment. Complying with the law is compulsory, so it is not CSR in itself." },

{ ch:11, topic:"Independent NEDs", marks:1, type:"mcq",
  q:"Independent non-executive directors should be:",
  opts:["Involved in the day-to-day management of the company","Free from relationships that could affect their judgement"],
  ans:1,
  exp:"Independent NEDs must be free of business or other relationships that could interfere with their <b>independent judgement</b>. Day-to-day management is the job of the executive directors." },

/* ---------------- AREA C ---------------- */
{ ch:4, topic:"Blockchain", marks:2, type:"mcq",
  q:"Which of the following is a key feature of blockchain technology?",
  opts:["A single central database controlled by one organisation",
        "Software which learns from data to make predictions",
        "Storage of data on a remote provider's servers, accessed over the internet",
        "A decentralised, distributed ledger whose records are very difficult to alter"],
  ans:3,
  exp:"Blockchain is a <b>distributed ledger</b> shared across many computers. Each block is linked to the previous one, so past records are very hard to change. The other options describe a central database, machine learning/AI and cloud storage." },

{ ch:13, topic:"Qualities of good information", marks:2, type:"multi",
  q:"Which TWO of the following are qualities of good information?",
  opts:["It is available in time for the decision it supports",
        "It contains as much detail as possible",
        "It is understandable to the person using it",
        "It is produced at the lowest possible cost, whatever its accuracy"],
  ans:[0,2],
  exp:"Good information is accurate, complete, cost-beneficial, user-targeted, relevant, authoritative, <b>timely</b> and easy to use or <b>understandable</b>. Too much detail causes information overload, and its cost must not outweigh its value." },

{ ch:4, topic:"Machine learning", marks:1, type:"mcq",
  q:"Machine learning allows a computer system to improve its performance by learning from data, without being explicitly programmed for every situation.<br><br>Is this statement true or false?",
  opts:["True","False"],
  ans:0,
  exp:"True. Machine learning is a branch of AI in which systems learn patterns from data and improve with experience." },

{ ch:4, topic:"Executive information systems", marks:2, type:"mcq",
  q:"Which type of information system gives senior managers summarised internal and external information, often with the option to 'drill down' into detail, to support strategic decisions?",
  opts:["Transaction processing system","Management information system","Office automation system","Executive information system"],
  ans:3,
  exp:"An <b>executive information system (EIS)</b> serves senior management with summarised, often graphical, information and drill-down facilities. A TPS processes routine transactions; an MIS produces regular reports for middle managers." },

{ ch:12, topic:"Money laundering – integration", marks:2, type:"mcq",
  q:"A criminal uses funds that have already passed through several bank accounts to buy a hotel. The hotel is then run as a normal business, so the money appears to be legitimate.<br><br>Which stage of money laundering is this?",
  opts:["Integration","Placement","Layering","Tipping off"],
  ans:0,
  exp:"<b>Integration</b> is the final stage, when the laundered money re-enters the economy (e.g. through property or business investment) and appears legitimate. Placement puts the cash into the system; layering disguises its source." },

{ ch:12, topic:"Role of the IASB", marks:2, type:"mcq",
  q:"Which of the following is the main role of the International Accounting Standards Board (IASB)?",
  opts:["Enforcing compliance with IFRS in each country",
        "Developing and issuing IFRS Accounting Standards",
        "Auditing the financial statements of multinational companies",
        "Issuing the code of ethics for professional accountants"],
  ans:1,
  exp:"The IASB <b>develops and issues</b> IFRS standards. Enforcement is carried out by national regulators, audits are done by audit firms, and the international code of ethics is issued by IESBA." },

{ ch:14, topic:"Payroll controls", marks:2, type:"mcq",
  q:"Which of the following controls would BEST prevent payments being made to fictitious ('ghost') employees?",
  opts:["Requiring HR to authorise each new starter before they are added to the payroll",
        "Comparing the total monthly payroll cost with the budget",
        "Rotating payroll staff every year",
        "Paying wages by bank transfer instead of cash"],
  ans:0,
  exp:"Ghost employees are <b>prevented</b> by independent authorisation of new starters (and leavers) by HR, separate from payroll processing. A budget comparison may <b>detect</b> a large fraud but will not prevent it; bank transfers can still be made to a fraudster's account." },

{ ch:16, topic:"Control environment", marks:2, type:"mcq",
  q:"Which of the following is part of an organisation's control environment?",
  opts:["Management's attitude, awareness and actions regarding internal control",
        "Monthly bank reconciliations",
        "Authorisation of purchase orders",
        "Passwords on computer systems"],
  ans:0,
  exp:"The <b>control environment</b> is the overall attitude, awareness and actions of directors and management towards control (the 'tone at the top'). The other options are specific <b>control procedures</b>." },

{ ch:16, topic:"Independence of internal audit", marks:1, type:"mcq",
  q:"To protect its independence, the head of internal audit should report to:",
  opts:["The finance director","The audit committee"],
  ans:1,
  exp:"Reporting to the <b>audit committee</b> (independent NEDs) protects internal audit from pressure from the executives whose areas it reviews, such as the finance director." },

{ ch:17, topic:"Fraud risk indicators", marks:2, type:"multi",
  q:"Which TWO of the following could indicate that an employee is committing fraud?",
  opts:["The employee's lifestyle appears to be well beyond their known income",
        "The employee regularly asks to attend training courses",
        "The employee works standard hours and takes all their holiday",
        "The employee refuses to let anyone else cover their duties"],
  ans:[0,3],
  exp:"An unexplained <b>lavish lifestyle</b> and <b>refusing to let others do their work</b> (e.g. not taking leave) are classic warning signs, because someone covering the job might uncover the fraud." },

{ ch:17, topic:"Collusion", marks:1, type:"mcq",
  q:"Fraud carried out by two or more people working together to get around internal controls is known as:",
  opts:["Collusion","Teeming and lading"],
  ans:0,
  exp:"<b>Collusion</b> can defeat segregation of duties, because the people whose duties are separated are working together." },

/* ---------------- AREA D ---------------- */
{ ch:18, topic:"Fayol's functions of management", marks:2, type:"mcq",
  q:"Which of the following is one of Fayol's five functions of management?",
  opts:["Commanding","Negotiating","Motivating","Acting as a figurehead"],
  ans:0,
  exp:"Fayol's five functions are planning, organising, <b>commanding</b>, co-ordinating and controlling. 'Figurehead' is one of Mintzberg's managerial roles." },

{ ch:18, topic:"Mintzberg's managerial roles", marks:1, type:"mcq",
  q:"A manager carries out ceremonial duties, such as receiving important visitors and making presentations on behalf of the company.<br><br>Which of Mintzberg's roles is this?",
  opts:["Figurehead","Disseminator"],
  ans:0,
  exp:"The <b>figurehead</b> role (interpersonal) involves symbolic and ceremonial duties. The disseminator role (informational) passes information to subordinates." },

{ ch:18, topic:"Bennis – transformational leadership", marks:1, type:"mcq",
  q:"According to Bennis, a leader who inspires followers to work beyond mere compliance and can change the culture of a team is a:",
  opts:["Transactional leader","Transformational leader"],
  ans:1,
  exp:"<b>Transformational</b> leaders inspire and motivate. Transactional leaders treat leadership as an exchange of rewards for service and compliance." },

{ ch:19, topic:"Belbin – monitor-evaluator", marks:2, type:"mcq",
  q:"Kai is analytical rather than creative. He carefully examines the team's ideas and points out their flaws, although he can be tactless.<br><br>Which of Belbin's team roles does Kai fill?",
  opts:["Plant","Monitor-evaluator","Shaper","Team worker"],
  ans:1,
  exp:"The <b>monitor-evaluator</b> is analytical, examines ideas and spots flaws, and brings the team down to earth. The plant generates the ideas." },

{ ch:19, topic:"Groupthink", marks:2, type:"mcq",
  q:"Which of the following is a symptom of 'groupthink'?",
  opts:["Members openly challenge each other's ideas",
        "A devil's advocate is appointed to question decisions",
        "The team regularly seeks views from outside experts",
        "Members keep their doubts to themselves to maintain agreement"],
  ans:3,
  exp:"In <b>groupthink</b>, a close-knit group values agreement so highly that members hide doubts and ignore alternatives, leading to poor decisions. The other options are ways to <b>prevent</b> groupthink." },

{ ch:20, topic:"Maslow's hierarchy – order", marks:2, type:"mcq",
  q:"In Maslow's hierarchy of needs, which needs must be satisfied immediately BEFORE esteem needs become a motivator?",
  opts:["Physiological needs","Safety needs","Social needs","Self-actualisation needs"],
  ans:2,
  exp:"Maslow's order, from the bottom: physiological → safety → <b>social</b> → esteem → self-actualisation. A need becomes a motivator only once the lower needs are satisfied." },

{ ch:20, topic:"Intrinsic vs extrinsic rewards", marks:1, type:"mcq",
  q:"A profit-sharing scheme for employees is an example of:",
  opts:["An extrinsic reward","An intrinsic reward"],
  ans:0,
  exp:"<b>Extrinsic</b> rewards are given to the employee by others (pay, bonuses, profit-share). <b>Intrinsic</b> rewards come from the work itself (a sense of achievement, interest, challenge)." },

{ ch:21, topic:"Evaluating training", marks:2, type:"mcq",
  q:"Six months after a customer service course, managers observe whether trainees are actually using the new techniques when dealing with customers.<br><br>Which level of training evaluation is this?",
  opts:["Reactions","Learning","Job behaviour","Ultimate value"],
  ans:2,
  exp:"<b>Job behaviour</b> evaluation checks whether learning has been transferred to the job, often by observation. Reactions = trainees' feelings (questionnaires); learning = knowledge gained (tests); ultimate value = the effect on the organisation's goals." },

{ ch:22, topic:"360-degree appraisal", marks:1, type:"mcq",
  q:"A manager's performance is assessed using feedback from her colleagues, subordinates and customers as well as her own line manager.<br><br>What type of appraisal is this?",
  opts:["Upward appraisal","360-degree appraisal"],
  ans:1,
  exp:"<b>360-degree</b> appraisal collects feedback from all around the individual. Upward appraisal uses feedback from subordinates only." },

/* ---------------- AREA E ---------------- */
{ ch:23, topic:"SMART objectives", marks:2, type:"mcq",
  q:"Which of the following objectives is time-bound but NOT measurable?",
  opts:["Reduce invoicing errors by 5%",
        "Increase sales significantly by 31 December",
        "Reduce invoicing errors by 5% by 30 June",
        "Improve staff morale"],
  ans:1,
  exp:"'By 31 December' makes it <b>time-bound</b>, but 'significantly' cannot be measured. 'Reduce errors by 5%' is measurable but has no deadline; adding 'by 30 June' makes it both; 'Improve staff morale' is neither." },

{ ch:24, topic:"Barriers to communication", marks:2, type:"multi",
  q:"Which TWO of the following are barriers to effective communication?",
  opts:["Using technical jargon with a non-specialist audience",
        "Asking the receiver for feedback",
        "Information overload",
        "Choosing a medium suited to the message"],
  ans:[0,2],
  exp:"<b>Jargon</b> and <b>information overload</b> are forms of noise that stop the message being understood. Asking for feedback and choosing the right medium improve communication." },

{ ch:24, topic:"Choosing a communication medium", marks:2, type:"mcq",
  q:"A company needs to tell staff about a new and complex expenses procedure, which they will need to refer back to.<br><br>Which method of communication is MOST appropriate?",
  opts:["A team briefing with no written materials","A phone call to each employee","A written procedures document, available on the intranet","A message on the staff noticeboard for one week"],
  ans:2,
  exp:"Complex, detailed information that people need to refer back to is best given in <b>writing</b>, as a permanent record that can be accessed when needed. Oral methods leave no record, and a temporary notice will not be available later." },

{ ch:24, topic:"Leavitt – all-channel network", marks:1, type:"mcq",
  q:"According to Leavitt, which communication network is best for solving complex problems and gives members the highest satisfaction?",
  opts:["Wheel","All-channel"],
  ans:1,
  exp:"The <b>all-channel</b> network is decentralised – everyone can communicate with everyone else – so it suits complex problems and gives high satisfaction. The wheel is fastest for simple problems." },

{ ch:23, topic:"Coaching", marks:1, type:"mcq",
  q:"Which of the following BEST describes coaching?",
  opts:["Short-term support to develop a specific skill or improve performance in a task","A long-term relationship supporting an individual's overall career"],
  ans:0,
  exp:"<b>Coaching</b> is short-term and task or skill focused. A long-term relationship supporting the whole career is <b>mentoring</b>." },

/* ---------------- AREA F ---------------- */
{ ch:10, topic:"Self-interest threats", marks:2, type:"multi",
  q:"Which TWO of the following situations create a self-interest threat for an accountant in practice?",
  opts:["Owning shares in an audit client",
        "Auditing a system that the accountant designed",
        "Fees from one client making up a large proportion of the firm's total income",
        "Having audited the same client for many years"],
  ans:[0,2],
  exp:"A <b>financial interest</b> in a client and <b>fee dependence</b> create self-interest threats. Auditing your own work is a self-review threat; long association is a familiarity threat." },

{ ch:10, topic:"Advocacy threat", marks:2, type:"mcq",
  q:"An accountant is asked by a client to represent the client's interests in a legal dispute with the tax authorities.<br><br>Which threat to the fundamental principles does this create?",
  opts:["Self-review","Intimidation","Familiarity","Advocacy"],
  ans:3,
  exp:"Promoting a client's position to the point where objectivity may be compromised is an <b>advocacy</b> threat." },

{ ch:10, topic:"Public interest", marks:2, type:"mcq",
  q:"ACCA members have a duty to act in the public interest. Whose interests does this require them to consider?",
  opts:["Only those of their employer or client",
        "Only those of the shareholders of the company they work for",
        "Those of society as a whole, including clients, employers, investors, government and the wider community",
        "Only those of ACCA as their professional body"],
  ans:2,
  exp:"The public interest is the collective well-being of <b>society as a whole</b>. Accountants must not just meet the needs of a particular client or employer." },

{ ch:10, topic:"Professional competence", marks:1, type:"mcq",
  q:"An accountant realises she does not have the expertise needed to complete an assignment she has been given. What should she do?",
  opts:["Continue and do her best, so the deadline is met","Obtain appropriate help or training, or decline the work"],
  ans:1,
  exp:"<b>Professional competence and due care</b> means accepting only work you are competent to do, or getting suitable help or training first." },

{ ch:10, topic:"Professional behaviour", marks:1, type:"mcq",
  q:"Complying with relevant laws and regulations and avoiding any action that discredits the profession is the fundamental principle of:",
  opts:["Integrity","Professional behaviour"],
  ans:1,
  exp:"<b>Professional behaviour</b> requires compliance with laws and regulations and avoiding conduct that brings the profession into disrepute." }
],

/* =================== SECTION B : 6 multi-task questions =================== */
sectionB: [

/* MTQ 1 – Area A */
{ ch:7, title:"Zeeland economy",
  scenario:"The economy of Zeeland is growing quickly. Consumer borrowing is at record levels, unemployment is very low and businesses are struggling to recruit. World oil prices have also risen sharply. Inflation has risen to 8% and the government wants to bring it down.",
  parts:[
    { ch:7, topic:"Demand-pull vs cost-push inflation", marks:2, type:"matrix", markEach:0.5,
      q:"Identify whether each factor is causing demand-pull or cost-push inflation in Zeeland.",
      cols:["Demand-pull","Cost-push"],
      rows:[["Record levels of consumer borrowing and spending",0],["The rise in world oil prices",1],["Wage rises caused by a shortage of workers",1],["Higher government spending on new roads and hospitals",0]],
      exp:"<b>Demand-pull</b> inflation comes from excess demand (consumer and government spending). <b>Cost-push</b> inflation comes from higher production costs (energy, wages). 0.5 marks each." },
    { ch:7, topic:"Policies to reduce inflation", marks:2, type:"multi", markEach:1,
      q:"Which TWO of the following measures would help the government of Zeeland to reduce demand-pull inflation?",
      opts:["Increasing interest rates","Increasing government spending","Increasing income tax rates","Reducing sales tax (VAT)"],
      ans:[0,2],
      exp:"Higher <b>interest rates</b> (monetary policy) and higher <b>income tax</b> (fiscal policy) both reduce spending and so reduce demand. More government spending or lower VAT would increase demand. 1 mark each." }
  ]},

/* MTQ 2 – Area B */
{ ch:2, title:"GreenGrow Co",
  scenario:"GreenGrow Co sells garden products. It is reviewing its organisation structure after rapid growth and is considering removing two layers of middle management.",
  parts:[
    { ch:2, topic:"Types of organisation structure", marks:2, type:"matrix", markEach:0.5,
      q:"Identify the type of structure described in each statement.",
      cols:["Functional","Divisional","Matrix"],
      rows:[["Employees are grouped into departments such as marketing, finance and production",0],["Staff report both to their department head and to a product manager",2],["The company is split into self-contained units for each product range, each with its own support functions",1],["Specialist expertise is concentrated in one department for the whole company",0]],
      exp:"<b>Functional</b> = grouped by specialism. <b>Divisional</b> = self-contained units by product or region, each with its own functions. <b>Matrix</b> = dual reporting to a functional and a product/project manager. 0.5 marks each." },
    { ch:2, topic:"Delayering – tall vs flat structures", marks:2, type:"gap", markEach:0.5,
      q:"Complete the statements about removing two layers of middle management.",
      text:"The structure will become [[0]]. Remaining managers' spans of control will become [[1]]. The scalar chain will become [[2]], so communication between the top and bottom of the organisation is likely to become [[3]].",
      gaps:[["taller","flatter"],["wider","narrower"],["longer","shorter"],["faster","slower"]],
      ans:[1,0,1,0],
      exp:"Delayering makes the structure <b>flatter</b>. Each remaining manager supervises more people (<b>wider</b> spans), the chain of command is <b>shorter</b>, and communication is <b>faster</b>. 0.5 marks each." }
  ]},

/* MTQ 3 – Area C */
{ ch:12, title:"Ferro & Co",
  scenario:"Ferro & Co is a firm of accountants. One of its clients, Mr K, has been depositing large amounts of cash into several bank accounts, moving the money between companies overseas and then using it to buy property.",
  parts:[
    { ch:12, topic:"Stages of money laundering", marks:2, type:"matrix", markEach:0.5,
      q:"Identify the stage of money laundering illustrated by each activity.",
      cols:["Placement","Layering","Integration"],
      rows:[["Paying cash from crime into several bank accounts in small amounts",0],["Transferring funds repeatedly between overseas companies to hide their origin",1],["Buying a block of flats with the funds and collecting rent",2],["Using cash from crime to buy casino chips, which are later cashed in",0]],
      exp:"<b>Placement</b> puts the criminal cash into the financial system. <b>Layering</b> uses complex transfers to hide the source. <b>Integration</b> brings the funds back into the economy so they appear legitimate. 0.5 marks each." },
    { ch:12, topic:"Money laundering offences", marks:2, type:"multi", markEach:1,
      q:"Which TWO of the following would be money laundering offences committed by a member of staff at Ferro & Co?",
      opts:["Failing to report a suspicion about Mr K to the firm's money laundering reporting officer","Reporting a suspicion about Mr K to the firm's money laundering reporting officer","Telling Mr K that a report about him has been made","Asking Mr K for proof of his identity"],
      ans:[0,2],
      exp:"<b>Failure to report</b> a suspicion and <b>tipping off</b> are offences. Reporting to the MLRO and carrying out customer due diligence (identity checks) are legal requirements. 1 mark each." }
  ]},

/* MTQ 4 – Area D */
{ ch:19, title:"Orion Tech",
  scenario:"Orion Tech has set up a project team to launch a new app. The project manager is reviewing the team members' roles and her own leadership style.",
  parts:[
    { ch:19, topic:"Belbin's team roles", marks:2, type:"gap", markEach:0.5,
      q:"Identify the Belbin team role of each team member.",
      text:"(i) Mei is quiet but imaginative and comes up with the original ideas for new features: [[0]]<br>(ii) Tom checks every detail and chases the team to meet deadlines: [[1]]<br>(iii) Ola is diplomatic and keeps the team working well together when tensions rise: [[2]]<br>(iv) Raj is reliable and organised, and turns the team's ideas into practical plans: [[3]]",
      gaps:[["Plant","Completer-finisher","Team worker","Implementer","Shaper"],["Plant","Completer-finisher","Team worker","Implementer","Shaper"],["Plant","Completer-finisher","Team worker","Implementer","Shaper"],["Plant","Completer-finisher","Team worker","Implementer","Shaper"]],
      ans:[0,1,2,3],
      exp:"<b>Plant</b> = source of ideas. <b>Completer-finisher</b> = detail and deadlines. <b>Team worker</b> = maintains team relationships. <b>Implementer</b> = turns ideas into practical action. 0.5 marks each." },
    { ch:18, topic:"Ashridge leadership styles", marks:2, type:"matrix", markEach:0.5,
      q:"Identify the Ashridge leadership style used by the project manager in each case.",
      cols:["Tells","Sells","Consults","Joins"],
      rows:[["She decides on the launch date and explains why it is the best choice, persuading the team to accept it",1],["She asks for the team's views on the app's design, then makes the final decision herself",2],["She tells the team which software they will use, without discussion",0],["The team discusses the marketing plan and reaches a decision together, with her as an equal member",3]],
      exp:"<b>Tells</b> = decides and instructs. <b>Sells</b> = decides, then persuades. <b>Consults</b> = asks for views but decides. <b>Joins</b> = decides jointly with the team. 0.5 marks each." }
  ]},

/* MTQ 5 – Area E */
{ ch:24, title:"Nimbus Co",
  scenario:"Nimbus Co's managers are reviewing how teams communicate and how they deal with disagreements between staff.",
  parts:[
    { ch:24, topic:"Leavitt – centralised vs decentralised networks", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of Leavitt's communication networks.",
      cols:["Centralised","Decentralised"],
      rows:[["Wheel",0],["Circle",1],["Chain",0],["All-channel",1]],
      exp:"In <b>centralised</b> networks (wheel, chain, Y), communication goes through a central person. In <b>decentralised</b> networks (circle, all-channel), information flows freely between members. 0.5 marks each." },
    { ch:23, topic:"Conflict management strategies", marks:2, type:"gap", markEach:0.5,
      q:"Identify the conflict management strategy used in each case.",
      text:"(i) The manager ignores a minor disagreement, expecting it to blow over: [[0]]<br>(ii) The manager warns two employees that they will be disciplined unless they stop arguing: [[1]]<br>(iii) The manager acts as a neutral third party and agrees a compromise in which each side gets part of what it wants: [[2]]<br>(iv) The manager finds the root cause of the dispute and solves it, so that both sides are satisfied: [[3]]",
      gaps:[["Denial","Suppression","Reduction/negotiation","Resolution"],["Denial","Suppression","Reduction/negotiation","Resolution"],["Denial","Suppression","Reduction/negotiation","Resolution"],["Denial","Suppression","Reduction/negotiation","Resolution"]],
      ans:[0,1,2,3],
      exp:"<b>Denial</b> = ignoring it. <b>Suppression</b> = threatening punishment (short-term only). <b>Reduction/negotiation</b> = compromise. <b>Resolution</b> = solving the root cause for a win-win outcome. 0.5 marks each." }
  ]},

/* MTQ 6 – Area F */
{ ch:10, title:"Zoe – Hart & Co",
  scenario:"Zoe is an accountant at Hart & Co, a firm of accountants. Several situations have arisen during the year.",
  parts:[
    { ch:10, topic:"Identifying the principle at risk", marks:2, type:"gap", markEach:0.5,
      q:"Identify the fundamental principle MOST at risk in each situation.",
      text:"(i) Zoe tells a friend at a party about a client's planned takeover bid: [[0]]<br>(ii) Zoe signs off a tax return she has not checked because she is short of time: [[1]]<br>(iii) Zoe knowingly includes a misleading figure in a report to make a client look better: [[2]]<br>(iv) Zoe posts insulting comments about other accountants on social media: [[3]]",
      gaps:[["Integrity","Objectivity","Professional competence and due care","Confidentiality","Professional behaviour"],["Integrity","Objectivity","Professional competence and due care","Confidentiality","Professional behaviour"],["Integrity","Objectivity","Professional competence and due care","Confidentiality","Professional behaviour"],["Integrity","Objectivity","Professional competence and due care","Confidentiality","Professional behaviour"]],
      ans:[3,2,0,4],
      exp:"Disclosing client information = <b>confidentiality</b>. Not acting diligently = <b>professional competence and due care</b>. Knowingly being associated with misleading information = <b>integrity</b>. Discrediting the profession = <b>professional behaviour</b>. 0.5 marks each." },
    { ch:10, topic:"Safeguards", marks:2, type:"multi", markEach:1,
      q:"Which TWO of the following are safeguards Hart & Co could use to reduce threats to objectivity?",
      opts:["Rotating senior staff who have worked on a client for many years","Increasing the fees charged to its largest client","Having the work reviewed by a partner not involved in the engagement","Allowing staff to accept gifts only from long-standing clients"],
      ans:[0,2],
      exp:"<b>Staff rotation</b> reduces familiarity threats, and an <b>independent review</b> by another partner reduces several threats. Higher fee dependence increases self-interest threats, and accepting significant gifts is never a safeguard. 1 mark each." }
  ]}
]
};
