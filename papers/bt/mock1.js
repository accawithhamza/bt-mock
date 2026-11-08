/* =========================================================
   BT MOCK EXAM 1 (revised, exam-level difficulty)
   46 OTQs (Section A) + 6 MTQs (Section B)
   Question types:
     mcq    : opts[], ans = index (0 = A)
     multi  : opts[], ans = [indices]   (select N)
     gap    : text with [[0]],[[1]]..., gaps = [[choices],..], ans = [indices]
     matrix : cols[], rows = [[statement, correctColIndex],...]
   Section A: all-or-nothing. Section B: matching/multiple-response parts earn
   marks per correct item (markEach; defaults to marks ÷ number of items).
   To fix a question, edit it in place (do not insert/delete – keeps saved results aligned).
   ========================================================= */
window.MOCKS = window.MOCKS || {};
window.MOCKS["BT-1R"] = {
title: "Mock Exam 1",
sectionA: [

/* ---------------- AREA A ---------------- */
{ ch:1, topic:"Not-for-profit organisations", marks:2, type:"multi",
  q:"Which TWO of the following are characteristics of a not-for-profit organisation?",
  opts:["It cannot employ paid staff",
        "Its primary objective is to provide a service rather than to earn a return for owners",
        "It is always owned and funded by the government",
        "Any surplus generated is reinvested to further the organisation's objectives"],
  ans:[1,3],
  exp:"Not-for-profit organisations (e.g. charities) exist to provide a service or pursue a cause. Surpluses are reinvested, not distributed to owners. They often employ paid staff, and many are independent of government – being government-owned is a feature of the public sector." },

{ ch:5, topic:"Stakeholder conflict", marks:2, type:"mcq",
  q:"TechMart Co plans to automate its warehouses, which is expected to cut staff costs by 30% and increase profits.<br><br>Which stakeholder conflict is this decision MOST likely to create?",
  opts:["Customers seeking lower prices versus suppliers seeking prompt payment",
        "The government seeking tax revenue versus lenders seeking interest",
        "Shareholders seeking higher returns versus employees seeking job security",
        "Directors seeking bonuses versus the local community seeking jobs"],
  ans:2,
  exp:"Automation increases profit (good for <b>shareholders</b>) but threatens jobs (bad for <b>employees</b>). This is the classic conflict between shareholders' desire for returns and employees' desire for job security and pay." },

{ ch:7, topic:"Price elasticity and total revenue", marks:2, type:"mcq",
  q:"The price of a product rises from $20 to $22. As a result, demand falls from 5,000 units to 4,000 units.<br><br>What is the price elasticity of demand (ignoring the minus sign) and what happens to total revenue?",
  opts:["0.5 – total revenue rises","2.0 – total revenue rises","0.5 – total revenue falls","2.0 – total revenue falls"],
  ans:3,
  exp:"% change in quantity = −1,000/5,000 = −20%. % change in price = +2/20 = +10%. PED = 20/10 = <b>2.0</b> (elastic). Revenue falls from $100,000 (5,000 × $20) to $88,000 (4,000 × $22). When demand is elastic, a price rise <b>reduces</b> total revenue." },

{ ch:7, topic:"Shifts in supply", marks:2, type:"mcq",
  q:"Which of the following would cause the supply curve for wheat to shift to the LEFT?",
  opts:["A significant rise in the cost of fertiliser",
        "A government subsidy paid to wheat farmers",
        "A fall in the market price of wheat",
        "An improvement in harvesting technology"],
  ans:0,
  exp:"Higher input costs mean less is supplied at every price – the curve shifts <b>left</b>. Subsidies and better technology shift supply to the right. A change in the price of wheat itself causes a movement <b>along</b> the supply curve, not a shift." },

{ ch:7, topic:"Exchange rates", marks:2, type:"multi",
  q:"The currency of Country X has strengthened significantly against the currencies of its main trading partners.<br><br>Which TWO of the following are the most likely consequences for businesses based in Country X?",
  opts:["Imported raw materials become cheaper",
        "Exports become cheaper for overseas buyers",
        "Exports become more expensive for overseas buyers",
        "Domestic inflation is likely to increase"],
  ans:[0,2],
  exp:"A stronger currency buys more foreign currency, so <b>imports become cheaper</b> and <b>exports become more expensive</b> for foreign customers. Cheaper imports tend to <b>reduce</b>, not increase, inflation." },

{ ch:7, topic:"Types of unemployment", marks:1, type:"mcq",
  q:"Workers in a region lose their jobs because the coal mining industry has closed down and their skills are no longer in demand.<br><br>What type of unemployment is this?",
  opts:["Structural","Cyclical"],
  ans:0,
  exp:"<b>Structural</b> unemployment results from long-term changes in the structure of the economy (decline of an industry, new technology). Cyclical unemployment is caused by a downturn in the trade cycle." },

{ ch:8, topic:"Demographic change", marks:2, type:"multi",
  q:"Which TWO of the following are likely effects on businesses of an ageing population?",
  opts:["Increased demand for healthcare and leisure services for older people",
        "Lower pension costs for employers",
        "A shrinking pool of younger workers, causing labour shortages",
        "Increased demand for baby and children's products"],
  ans:[0,2],
  exp:"An ageing population shifts demand towards products for older people and reduces the supply of younger workers. Pension costs are likely to <b>rise</b>, and demand for children's products is likely to fall." },

{ ch:9, topic:"Porter's generic strategies", marks:2, type:"mcq",
  q:"Luxe Co makes handmade watches which it sells at premium prices to wealthy collectors. It does not try to sell to the mass market.<br><br>Which of Porter's generic strategies is Luxe Co following?",
  opts:["Cost leadership","Differentiation","Cost focus","Differentiation focus"],
  ans:3,
  exp:"Luxe Co targets a <b>narrow segment</b> (focus) with a unique, premium product (<b>differentiation</b>) – a differentiation focus strategy." },

{ ch:9, topic:"Value chain", marks:1, type:"mcq",
  q:"In Porter's value chain, procurement is classified as which type of activity?",
  opts:["Primary activity","Support activity"],
  ans:1,
  exp:"<b>Procurement</b> (buying inputs) is a support activity, along with firm infrastructure, HRM and technology development. Do not confuse it with <b>inbound logistics</b> (receiving and storing inputs), which is a primary activity." },

/* ---------------- AREA B ---------------- */
{ ch:2, topic:"Boundaryless organisations", marks:2, type:"mcq",
  q:"Which of the following would help an organisation to become more boundaryless?<br><br>1. Outsourcing non-core activities to specialist providers<br>2. Strengthening the divisions between functional departments<br>3. Sharing information systems with key suppliers and customers",
  opts:["1 and 2","1 and 3","2 and 3","1, 2 and 3"],
  ans:1,
  exp:"Boundaryless organisations remove barriers – internally (between departments and levels) and externally (with suppliers, customers and partners). Outsourcing and sharing systems with partners both do this; strengthening internal divisions creates barriers." },

{ ch:2, topic:"Divisional structure", marks:2, type:"mcq",
  q:"Which of the following is an advantage of a divisional structure?",
  opts:["It avoids duplication of resources across the organisation",
        "Divisional managers are accountable for performance, which helps develop general managers",
        "It achieves economies of scale by centralising each specialist function",
        "Each employee reports to both a functional and a project manager"],
  ans:1,
  exp:"Divisional structures make divisional managers responsible for their own results – good for accountability and for training future general managers. <b>Duplication</b> of functions is a disadvantage; centralised specialist functions describe a functional structure; dual reporting describes a matrix." },

{ ch:2, topic:"Centralisation", marks:2, type:"mcq",
  q:"Which of the following is an advantage of decentralisation?",
  opts:["Decisions are consistent across the whole organisation",
        "Senior managers keep tight control over all decisions",
        "Decisions are made by people with local knowledge, allowing a faster response",
        "Fewer managers are needed, reducing costs"],
  ans:2,
  exp:"Decentralisation pushes decision-making down to managers closer to the action, so decisions use local knowledge and are faster. Consistency and tight control are advantages of <b>centralisation</b>." },

{ ch:3, topic:"Handy's cultures", marks:1, type:"mcq",
  q:"In Bello Co, staff follow detailed job descriptions and written procedures, and power comes from a person's position in the hierarchy.<br><br>Which of Handy's cultures does Bello Co have?",
  opts:["Role culture","Task culture"],
  ans:0,
  exp:"A <b>role</b> culture is bureaucratic: rules, procedures and job descriptions dominate, and power comes from position. A task culture is project/team based and values expertise." },

{ ch:3, topic:"Hofstede – power distance", marks:2, type:"mcq",
  q:"In Country Y, employees expect managers to make decisions without consulting them and accept large differences in status and privilege between levels.<br><br>Which of Hofstede's dimensions is described?",
  opts:["Low power distance","High uncertainty avoidance","High power distance","High individualism"],
  ans:2,
  exp:"<b>Power distance</b> is the extent to which unequal distribution of power is accepted. Acceptance of autocratic decisions and status differences indicates <b>high</b> power distance." },

{ ch:11, topic:"Agency theory", marks:2, type:"mcq",
  q:"Which of the following BEST describes the agency problem in a listed company?",
  opts:["Directors may act in their own interests rather than in the interests of shareholders",
        "Shareholders may interfere in the day-to-day management of the company",
        "External auditors may act for directors rather than shareholders",
        "Employees may prioritise customers' interests over the company's"],
  ans:0,
  exp:"Directors are <b>agents</b> appointed by shareholders (<b>principals</b>). The agency problem arises when directors pursue their own goals (e.g. high pay, empire building) instead of maximising shareholder wealth. Corporate governance aims to reduce this problem." },

{ ch:11, topic:"Board committees", marks:1, type:"mcq",
  q:"Which board committee normally recommends the appointment of the external auditor?",
  opts:["Audit committee","Nomination committee"],
  ans:0,
  exp:"The <b>audit committee</b> oversees financial reporting and audit, including recommending the appointment of the external auditor. The nomination committee deals with board appointments." },

/* ---------------- AREA C ---------------- */
{ ch:4, topic:"Back-up vs archive", marks:1, type:"mcq",
  q:"Making a copy of a file so that it can be restored if the original is lost or corrupted is known as:",
  opts:["Back-up","Archiving","Audit trail"],
  ans:0,
  exp:"A <b>back-up</b> is a copy kept in case of failure or corruption. Archiving moves old data out of active use for long-term storage. An audit trail records the history of transactions." },

{ ch:4, topic:"Cyber security threats", marks:1, type:"mcq",
  q:"An employee receives an email which appears to be from their bank, asking them to click a link and confirm their login details.<br><br>What type of cyber attack is this?",
  opts:["Denial of service","Phishing","Hacking"],
  ans:1,
  exp:"<b>Phishing</b> uses fake emails that look genuine to trick people into revealing information or downloading malware. Denial of service floods a system with traffic; hacking is gaining unauthorised access to a system." },

{ ch:4, topic:"Types of information system", marks:2, type:"multi",
  q:"Which TWO of the following are features of a decision support system (DSS)?",
  opts:["It processes high volumes of routine transactions",
        "It uses models to let managers explore 'what if' scenarios",
        "It supports semi-structured and unstructured decisions",
        "It is used only by operational staff"],
  ans:[1,2],
  exp:"A DSS helps managers make less structured decisions using models and 'what if' analysis. Processing routine transactions is the role of a transaction processing system (TPS)." },

{ ch:12, topic:"Money laundering – tipping off", marks:2, type:"mcq",
  q:"Ana, an accountant, suspects a client of money laundering. She reports her suspicion to her firm's money laundering reporting officer and then tells the client that a report has been made.<br><br>Which offence has Ana committed?",
  opts:["Laundering","Failure to report","Tipping off","Placement"],
  ans:2,
  exp:"Warning the suspect that a report has been made, or that an investigation is likely, is <b>tipping off</b>. Ana did report, so she has not failed to report. Placement is a stage of money laundering, not an offence by the accountant." },

{ ch:13, topic:"Management accounting function", marks:2, type:"multi",
  q:"Which TWO of the following are responsibilities of the management accounting function?",
  opts:["Preparing budgets and forecasts",
        "Preparing the published annual financial statements",
        "Calculating the cost of products and services",
        "Raising long-term finance"],
  ans:[0,2],
  exp:"Management accounting provides internal information for planning and control – budgets, forecasts and costing. Published accounts are financial accounting; raising finance is treasury." },

{ ch:14, topic:"Sales ledger inputs", marks:2, type:"mcq",
  q:"Which of the following are inputs to the sales ledger system?<br><br>1. Sales invoices<br>2. Cash received from customers<br>3. Purchase orders",
  opts:["1 only","1 and 2","2 and 3","1, 2 and 3"],
  ans:1,
  exp:"The sales (receivables) ledger records amounts owed by customers: <b>sales invoices</b> increase the balance and <b>customer receipts</b> reduce it. Purchase orders belong to the purchases system." },

{ ch:16, topic:"Substantive vs compliance tests", marks:2, type:"mcq",
  q:"Which of the following is a substantive test?",
  opts:["Checking that purchase invoices over $5,000 have been authorised by the finance director",
        "Observing whether the stores are kept locked",
        "Reviewing evidence that bank reconciliations are reviewed each month",
        "Physically inspecting a sample of non-current assets to confirm they exist"],
  ans:3,
  exp:"<b>Substantive tests</b> establish facts – they test the accuracy and existence of figures (e.g. inspecting assets). The other options test whether <b>controls</b> are operating (compliance/tests of control)." },

{ ch:16, topic:"Types of internal audit work", marks:2, type:"mcq",
  q:"The internal audit department has been asked to assess whether the purchasing department achieves economy, efficiency and effectiveness in its use of resources.<br><br>What type of audit is this?",
  opts:["Value for money audit","Systems audit","External audit","Financial audit"],
  ans:0,
  exp:"A <b>value for money</b> audit examines the 3Es: economy, efficiency and effectiveness. A systems audit tests whether internal controls operate as intended." },

{ ch:17, topic:"Teeming and lading", marks:2, type:"mcq",
  q:"A cashier steals money received from Customer A and conceals the theft by posting the next receipt from Customer B to Customer A's account.<br><br>What type of fraud is this?",
  opts:["Window dressing","Ghost employees","Teeming and lading","Collusion"],
  ans:2,
  exp:"<b>Teeming and lading</b> is a 'rolling' fraud where later receipts are used to cover earlier stolen receipts. Window dressing manipulates the financial statements; ghost employees are fictitious staff on the payroll." },

{ ch:17, topic:"Fraud prevention", marks:1, type:"mcq",
  q:"Fraud requires dishonesty, opportunity and motivation. Strong internal controls mainly reduce which of these?",
  opts:["Opportunity","Motivation"],
  ans:0,
  exp:"Internal controls such as segregation of duties and authorisation remove the <b>opportunity</b> to commit fraud." },

{ ch:15, topic:"Accounting and production", marks:1, type:"mcq",
  q:"Standard costs and variance reports provided to the production department are produced by which function?",
  opts:["Financial accounting","Management accounting"],
  ans:1,
  exp:"<b>Management accounting</b> provides internal information such as standard costs, budgets and variance analysis to help other functions plan and control." },

/* ---------------- AREA D ---------------- */
{ ch:18, topic:"Blake and Mouton grid", marks:2, type:"mcq",
  q:"Sarah wants her team to be productive, but not at the expense of morale. She avoids conflict and looks for compromises that keep everyone reasonably satisfied.<br><br>Where would Sarah be plotted on Blake and Mouton's managerial grid?",
  opts:["1.1","9.1","9.9","5.5"],
  ans:3,
  exp:"<b>5.5 middle of the road</b> – moderate concern for both production and people, balancing the two through compromise. 9.9 (team management) achieves high results through committed people; 1.1 is impoverished; 9.1 is task management." },

{ ch:18, topic:"Adair's action-centred leadership", marks:2, type:"mcq",
  q:"According to Adair's action-centred leadership model, a leader must balance which three overlapping needs?",
  opts:["Planning, organising and controlling","Task, team and individual","Structure, consideration and task","Tells, sells and consults"],
  ans:1,
  exp:"Adair's three circles are the needs of the <b>task</b>, the <b>team</b> and the <b>individual</b>. An effective leader satisfies all three." },

{ ch:18, topic:"Fiedler", marks:1, type:"mcq",
  q:"According to Fiedler, a manager who formalises roles, prefers formal communication and is primarily task-oriented is a:",
  opts:["Psychologically distant manager","Psychologically close manager"],
  ans:0,
  exp:"<b>Psychologically distant managers</b> keep their distance, formalise relationships and focus on the task. Psychologically close managers prefer informal contact and are person-oriented." },

{ ch:19, topic:"Belbin's team roles", marks:2, type:"mcq",
  q:"Which of Belbin's team roles is an enthusiastic, communicative extrovert who explores opportunities and develops contacts outside the team?",
  opts:["Plant","Shaper","Resource investigator","Co-ordinator"],
  ans:2,
  exp:"The <b>resource investigator</b> is outgoing and enthusiastic, explores opportunities and brings in ideas from outside. The plant is the creative, often introverted, ideas person." },

{ ch:19, topic:"Tuckman's stages", marks:2, type:"mcq",
  q:"A team of newly recruited graduates is arguing about who should lead the project and how the work should be divided.<br><br>Which of Tuckman's stages has the team reached?",
  opts:["Storming","Forming","Norming","Performing"],
  ans:0,
  exp:"<b>Storming</b> is the conflict stage – members challenge each other over leadership, roles and objectives. Norming follows, when roles and ways of working are agreed." },

{ ch:20, topic:"McGregor's Theory X and Y", marks:2, type:"mcq",
  q:"Mike believes his staff dislike work, avoid responsibility and will only perform if closely supervised and threatened with punishment.<br><br>Which of the following describes Mike?",
  opts:["A Theory Y manager","A psychologically close manager","A Theory X manager","A 9.9 team manager"],
  ans:2,
  exp:"McGregor's <b>Theory X</b> managers assume people are lazy, dislike work and must be controlled. Theory Y managers assume people can enjoy work and will seek responsibility. A psychologically close manager (Fiedler) is person-oriented, and a 9.9 manager (Blake and Mouton) shows high concern for people." },

{ ch:20, topic:"Herzberg", marks:1, type:"mcq",
  q:"According to Herzberg, salary is a:",
  opts:["Motivator","Hygiene factor"],
  ans:1,
  exp:"Pay is a <b>hygiene factor</b> – inadequate pay causes dissatisfaction, but increasing it does not create lasting motivation." },

{ ch:21, topic:"Kolb's learning cycle", marks:2, type:"mcq",
  q:"In Kolb's experiential learning cycle, which stage immediately follows reflective observation?",
  opts:["Abstract conceptualisation","Active experimentation","Concrete experience","Planning the next steps"],
  ans:0,
  exp:"Kolb's cycle: concrete experience → reflective observation → <b>abstract conceptualisation</b> (drawing conclusions) → active experimentation → back to experience." },

{ ch:21, topic:"Honey and Mumford", marks:1, type:"mcq",
  q:"A learner prefers to stand back, observe experiences from different perspectives and think carefully before acting.<br><br>Which of Honey and Mumford's learning styles is this?",
  opts:["Activist","Reflector"],
  ans:1,
  exp:"<b>Reflectors</b> observe and think before acting. Activists prefer to dive in and learn by doing." },

/* ---------------- AREA E ---------------- */
{ ch:24, topic:"Direction of communication", marks:1, type:"mcq",
  q:"The finance manager sends a request directly to a junior member of the sales team. This is an example of:",
  opts:["Lateral communication","Diagonal communication","Vertical communication"],
  ans:1,
  exp:"<b>Diagonal</b> communication is between people in different departments <b>and</b> at different levels. Lateral = same level; vertical = up or down within a reporting line." },

{ ch:24, topic:"Leavitt's communication networks", marks:2, type:"mcq",
  q:"According to Leavitt, which communication pattern is the FASTEST way for a group to reach a solution to a simple problem?",
  opts:["Circle","All-channel","Chain","Wheel"],
  ans:3,
  exp:"Leavitt found the <b>wheel</b> (a central person through whom all communication passes) is fastest for simple problems. Decentralised networks such as the all-channel network are better for complex problems and give higher satisfaction." },

{ ch:23, topic:"Conflict management", marks:2, type:"mcq",
  q:"Ella missed a deadline, which left Jack with less time to finish his work. They are now arguing. Their manager decides not to get involved, believing the problem will go away on its own.<br><br>Which conflict management approach is the manager using?",
  opts:["Suppression","Denial","Reduction/negotiation","Resolution"],
  ans:1,
  exp:"Ignoring the conflict and hoping it blows over is <b>denial</b>. Suppression is forcing people to stop; resolution tackles the root cause." },

{ ch:23, topic:"Competence frameworks", marks:2, type:"mcq",
  q:"Which management tool sets out the skills, knowledge and behaviours required for each role, and so provides a blueprint for staff development?",
  opts:["Competence framework","Job description","Personal development plan","Appraisal report"],
  ans:0,
  exp:"A <b>competence framework</b> defines the competences needed for roles across the organisation – it is used for recruitment, appraisal and development. A PDP is an individual's own action plan." },

{ ch:23, topic:"Personal development plans", marks:1, type:"mcq",
  q:"Who contributes to an employee's personal development plan?<br><br>1. The individual employee<br>2. The employee's manager",
  opts:["1 only","1 and 2"],
  ans:1,
  exp:"A PDP is owned by the employee, but it is normally agreed with their <b>manager</b> (e.g. at appraisal), who supports the development activities." },

/* ---------------- AREA F ---------------- */
{ ch:10, topic:"Gifts and hospitality", marks:2, type:"mcq",
  q:"Alevina, a junior accountant, is offered an expensive watch by a supplier whose contract is about to be renewed.<br><br>What action should Alevina take?",
  opts:["Accept the watch and declare it to her manager",
        "Accept the watch but give it to a friend",
        "Accept the watch and give the supplier a gift of similar value",
        "Decline the watch, explaining that she cannot accept it"],
  ans:3,
  exp:"An expensive gift from a supplier during a contract renewal creates a significant <b>self-interest</b> threat to objectivity. It is not trivial and inconsequential, so it should be <b>declined</b>. Declaring or passing it on does not remove the threat." },

{ ch:10, topic:"Ethical theories", marks:1, type:"mcq",
  q:"Which ethical approach judges whether an action is right or wrong by looking at its consequences?",
  opts:["Deontological","Teleological (consequentialist)"],
  ans:1,
  exp:"<b>Teleological / consequentialist</b> ethics judges actions by their outcomes. Deontological ethics (linked to absolutism) judges the action itself according to moral duty, ignoring consequences." },

{ ch:10, topic:"Conflict of interest", marks:2, type:"mcq",
  q:"An accountant acts for two clients. Taking an action in favour of one client will harm the other client.<br><br>What is this situation called?",
  opts:["A conflict of interest","A self-review threat","Tipping off","A breach of confidentiality"],
  ans:0,
  exp:"Where serving one party's interests harms another the accountant also acts for, there is a <b>conflict of interest</b>. Safeguards (e.g. separate teams, informed consent) are needed, or one engagement must be declined." },

{ ch:10, topic:"Threats – familiarity", marks:1, type:"mcq",
  q:"An audit partner's spouse is the finance director of an audit client. Which threat does this MAINLY create?",
  opts:["Familiarity","Self-review"],
  ans:0,
  exp:"A close family relationship with someone at the client creates a <b>familiarity</b> threat – the partner may be too sympathetic to the client." },

{ ch:10, topic:"Integrity", marks:1, type:"mcq",
  q:"Being straightforward, honest and truthful in all professional relationships is the fundamental principle of:",
  opts:["Integrity","Objectivity"],
  ans:0,
  exp:"<b>Integrity</b> = straightforward and honest. Objectivity = not allowing bias, conflicts of interest or undue influence to override judgement." }
],

/* =================== SECTION B : 6 multi-task questions =================== */
sectionB: [

/* MTQ 1 – Area A */
{ ch:5, title:"Brightwave Co",
  scenario:"Brightwave Co manufactures smartphones. It has a large factory on the edge of a small town and a large bank loan. It sells most of its output through a few large electronics retailers. The specialised processor chips it uses are available from only two suppliers worldwide, and setting up a new smartphone brand requires huge investment.",
  parts:[
    { ch:5, topic:"Mendelow's matrix", marks:2, type:"matrix", markEach:0.5,
      q:"Using Mendelow's matrix, identify the most appropriate strategy for each stakeholder.",
      cols:["Minimal effort","Keep informed","Keep satisfied","Key player"],
      rows:[["Major institutional shareholders who are actively involved in strategy",3],["Local residents worried about noise from the factory, with little influence",1],["The government, which rarely takes an interest but could impose new regulations",2],["Members of the public in other countries",0]],
      exp:"High power/high interest = <b>key player</b>; low power/high interest = <b>keep informed</b>; high power/low interest = <b>keep satisfied</b>; low/low = <b>minimal effort</b>. 0.5 marks each." },
    { ch:9, topic:"Porter's five forces", marks:2, type:"gap", markEach:0.5,
      q:"Complete the following statements about Brightwave's industry.",
      text:"Only two suppliers make the processor chips, so the bargaining power of suppliers is [[0]]. A few large retailers buy most of the output, so the bargaining power of buyers is [[1]]. Setting up a new brand needs huge investment, so the threat of new entrants is [[2]]. A high threat of new entrants would [[3]] industry profitability.",
      gaps:[["high","low"],["high","low"],["high","low"],["increase","reduce"]],
      ans:[0,0,1,1],
      exp:"Few suppliers of a key input → <b>high</b> supplier power. A few large buyers → <b>high</b> buyer power. High capital requirements are a barrier to entry → <b>low</b> threat of new entrants. A high threat of entry would <b>reduce</b> profitability. 0.5 marks each." }
  ]},

/* MTQ 2 – Area B */
{ ch:3, title:"Kavi Co",
  scenario:"Kavi Co is a growing retail chain. A new HR director is reviewing the company's culture, governance and approach to sustainability before a planned stock market listing.",
  parts:[
    { ch:3, topic:"Schein's levels of culture", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following aspects of Kavi Co's culture using Schein's three levels.",
      cols:["Artefacts","Espoused values","Basic assumptions"],
      rows:[["All store staff wear the company uniform",0],["The mission statement says 'Customers come first'",1],["An unspoken belief that staying late shows commitment",2],["The open-plan layout of head office",0]],
      exp:"<b>Artefacts</b> are visible (uniforms, office layout). <b>Espoused values</b> are stated values and goals. <b>Basic assumptions</b> are unconscious, taken-for-granted beliefs. 0.5 marks each." },
    { ch:11, topic:"Corporate governance", marks:2, type:"multi", markEach:1,
      q:"Which TWO of the following would improve corporate governance at Kavi Co before the listing?",
      opts:["Appointing independent non-executive directors to the board","Combining the roles of chair and chief executive","Setting up an audit committee of independent non-executive directors","Allowing executive directors to set their own pay"],
      ans:[0,2],
      exp:"Good governance needs <b>independent NEDs</b> and an <b>audit committee</b> of independent NEDs. The chair and CEO roles should be <b>separate</b>, and executive pay should be set by a remuneration committee of NEDs. 1 mark each." }
  ]},

/* MTQ 3 – Area C */
{ ch:16, title:"Ravi's Retail",
  scenario:"Ravi's Retail is a medium-sized company. After a fraud was discovered in the purchases department, the finance manager is reviewing internal controls and the work of the internal audit team.",
  parts:[
    { ch:16, topic:"Preventive, detective and corrective controls", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following controls.",
      cols:["Preventive","Detective","Corrective"],
      rows:[["Passwords are required to access the purchase ledger",0],["A bank reconciliation is performed every month",1],["Purchase orders over $1,000 must be authorised by the finance manager",0],["Errors found by an exception report are investigated and the records corrected",2]],
      exp:"<b>Preventive</b> controls stop problems happening (passwords, authorisation). <b>Detective</b> controls find problems (reconciliations, exception reports). <b>Corrective</b> controls fix them. 0.5 marks each." },
    { ch:16, topic:"Internal vs external audit", marks:2, type:"matrix", markEach:0.5,
      q:"Identify whether each statement applies to internal audit or external audit.",
      cols:["Internal audit","External audit"],
      rows:[["Reports to the shareholders",1],["Its scope is decided by management",0],["Is required by law for companies above a certain size",1],["Reviews value for money in operations",0]],
      exp:"External audit is a <b>legal requirement</b> for many companies and reports to <b>shareholders</b> on the financial statements. Internal audit's scope is set by <b>management/the audit committee</b> and can cover operational areas such as value for money. 0.5 marks each." }
  ]},

/* MTQ 4 – Area D */
{ ch:20, title:"Sunrise Hotels",
  scenario:"Sunrise Hotels is reviewing how it motivates staff after a survey showed low morale. The HR team is using motivation theories to evaluate the current reward package.",
  parts:[
    { ch:20, topic:"Herzberg – hygiene factors and motivators", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following using Herzberg's two-factor theory.",
      cols:["Hygiene factor","Motivator"],
      rows:[["Recognition for good work",1],["Company policies and administration",0],["Opportunities for advancement",1],["Relationships with supervisors",0]],
      exp:"<b>Hygiene factors</b> relate to the job environment (policy, supervision, pay, conditions). <b>Motivators</b> relate to the job itself (achievement, recognition, responsibility, advancement, the work itself). 0.5 marks each." },
    { ch:20, topic:"Maslow's hierarchy", marks:2, type:"gap", markEach:0.5,
      q:"Identify the level of Maslow's hierarchy satisfied by each benefit.",
      text:"(i) A pension scheme and a secure employment contract: [[0]]<br>(ii) Regular team social events: [[1]]<br>(iii) An 'employee of the month' award: [[2]]<br>(iv) The chance to lead challenging projects and reach full potential: [[3]]",
      gaps:[["Physiological","Safety","Social","Esteem","Self-actualisation"],["Physiological","Safety","Social","Esteem","Self-actualisation"],["Physiological","Safety","Social","Esteem","Self-actualisation"],["Physiological","Safety","Social","Esteem","Self-actualisation"]],
      ans:[1,2,3,4],
      exp:"Security = <b>safety</b>; belonging = <b>social</b>; recognition and status = <b>esteem</b>; reaching one's potential = <b>self-actualisation</b>. 0.5 marks each." }
  ]},

/* MTQ 5 – Area E */
{ ch:24, title:"Delta Logistics",
  scenario:"Delta Logistics has grown quickly. Its managers are concerned about how information flows around the business and about how new and struggling supervisors are supported.",
  parts:[
    { ch:24, topic:"Direction of communication", marks:2, type:"matrix", markEach:0.5,
      q:"Identify the direction of each communication.",
      cols:["Vertical","Lateral","Diagonal"],
      rows:[["The warehouse manager instructs a forklift driver in her team",0],["Two warehouse supervisors agree the shift rota",1],["The HR director emails a warehouse operative about a training course",2],["A driver reports a fault to his own supervisor",0]],
      exp:"<b>Vertical</b> = up or down a reporting line. <b>Lateral</b> = between people at the same level. <b>Diagonal</b> = between different departments and different levels. 0.5 marks each." },
    { ch:23, topic:"Coaching, mentoring and counselling", marks:2, type:"matrix", markEach:0.5,
      q:"Identify which type of support is being given in each case.",
      cols:["Coaching","Mentoring","Counselling"],
      rows:[["A senior manager meets a new supervisor monthly for two years to guide her overall career",1],["A supervisor is shown, step by step, how to use the new rota software",0],["A supervisor whose performance has dropped is helped to explore personal problems affecting his work",2],["An experienced driver trains a new driver on a specific delivery route over two weeks",0]],
      exp:"<b>Coaching</b> is short-term and focused on a specific task or skill. <b>Mentoring</b> is a longer-term relationship supporting overall career development. <b>Counselling</b> helps a person deal with problems affecting their performance. 0.5 marks each." }
  ]},

/* MTQ 6 – Area F */
{ ch:10, title:"Priya – Lotus Co",
  scenario:"Priya is a part-qualified ACCA student working in the finance department of Lotus Co. She is facing several situations that may affect her compliance with the fundamental ethical principles.",
  parts:[
    { ch:10, topic:"Identifying threats", marks:2, type:"gap", markEach:0.5,
      q:"Identify the type of threat in each situation.",
      text:"(i) Priya owns shares in a key customer whose credit limit she sets: [[0]]<br>(ii) The managing director says Priya will lose her job unless she changes the profit figure: [[1]]<br>(iii) Priya is asked to promote Lotus Co's shares to potential investors: [[2]]<br>(iv) Priya is asked to check the budgets she prepared herself: [[3]]",
      gaps:[["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"],["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"],["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"],["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"]],
      ans:[0,4,2,1],
      exp:"Financial interest = <b>self-interest</b>. Threat of dismissal = <b>intimidation</b>. Promoting the employer's position = <b>advocacy</b>. Checking own work = <b>self-review</b>. 0.5 marks each." },
    { ch:10, topic:"Resolving an ethical conflict", marks:2, type:"mcq",
      q:"Following the managing director's threat, what should Priya do FIRST?",
      opts:["Change the profit figure as instructed, as the directors are responsible for the accounts",
            "Resign immediately",
            "Gather the relevant facts, follow Lotus Co's internal procedures and raise the matter with an appropriate senior person, documenting her actions",
            "Report the matter to a newspaper"],
      ans:2,
      exp:"Priya should first establish the facts and use <b>internal procedures</b> (e.g. escalate to the finance director or audit committee), keeping records. She may also seek advice from ACCA. Resignation is a last resort; going to the press is not appropriate." }
  ]}
]
};
