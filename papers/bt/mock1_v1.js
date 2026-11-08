/* =========================================================
   BT MOCK EXAM 1  –  46 OTQs (Section A) + 6 MTQs (Section B)
   Question types:
     mcq    : opts[], ans = index (0 = A)
     multi  : opts[], ans = [indices]   (select N)
     gap    : text with [[0]],[[1]]..., gaps = [[choices],..], ans = [indices]
     matrix : cols[], rows = [[statement, correctColIndex],...]
   Section A: all-or-nothing. Section B: matching/multiple-response parts earn
   marks per correct item (markEach; defaults to marks ÷ number of items).
   To fix a question, edit it in place (do not insert/delete — keeps saved results aligned).
   ========================================================= */
window.MOCKS = window.MOCKS || {};
window.MOCKS["BT-1"] = {
title: "Mock Exam 1 (old version)",
sectionA: [

/* ---------------- AREA A : Ch 1, 5, 6, 7, 8, 9 ---------------- */
{ ch:1, topic:"Co-operatives", marks:2, type:"mcq",
  q:"Which of the following BEST describes a co-operative?",
  opts:["An organisation owned by the government which provides essential public services",
        "An organisation owned by its members, who share the benefits in proportion to their involvement with it",
        "A charity which relies on public donations to fund its activities",
        "A company owned by shareholders whose main objective is to maximise their wealth"],
  ans:1,
  exp:"Co-operatives are owned and run by their members (e.g. customers, employees or producers). Profits/benefits are shared among members, usually based on how much they trade with or work for the co-operative. A describes a public sector body, C a charity (not-for-profit) and D a commercial company." },

{ ch:5, topic:"Mendelow's matrix", marks:2, type:"mcq",
  q:"A local residents' group is very concerned about plans by GH Co to build a new factory near their homes. However, the group has very little ability to influence GH Co's decisions.<br><br>According to Mendelow's matrix, which strategy should GH Co adopt towards the residents' group?",
  opts:["Key player","Keep satisfied","Keep informed","Minimal effort"],
  ans:2,
  exp:"The residents have <b>high interest</b> but <b>low power</b>, so Mendelow recommends <b>keep informed</b>. High power/high interest = key players; high power/low interest = keep satisfied; low power/low interest = minimal effort." },

{ ch:5, topic:"Connected stakeholders", marks:2, type:"multi",
  q:"Which TWO of the following are classified as connected stakeholders of a company?",
  opts:["Shareholders","Employees","Customers","Government"],
  ans:[0,2],
  exp:"Connected stakeholders have a contractual/economic relationship with the organisation: shareholders, customers, suppliers and lenders. Employees and managers are <b>internal</b> stakeholders. Government is an <b>external</b> stakeholder." },

{ ch:7, topic:"Price elasticity of demand", marks:2, type:"mcq",
  q:"The price of a product increased from $10 to $12. As a result, demand fell from 1,000 units to 900 units.<br><br>What is the price elasticity of demand (ignoring the minus sign) and how would demand be described?",
  opts:["0.5 – inelastic","2.0 – elastic","0.5 – elastic","2.0 – inelastic"],
  ans:0,
  exp:"% change in quantity = (900 − 1,000) / 1,000 = −10%. % change in price = (12 − 10) / 10 = +20%. PED = 10% / 20% = <b>0.5</b>. As PED is less than 1, demand is <b>inelastic</b> – quantity demanded changes proportionately less than price." },

{ ch:7, topic:"Fiscal policy", marks:2, type:"gap",
  text:"To reduce demand-pull inflation, a government using fiscal policy could [[0]] taxation and [[1]] public expenditure.",
  gaps:[["increase","reduce"],["increase","reduce"]], ans:[0,1],
  exp:"Demand-pull inflation is caused by excess aggregate demand. Fiscal policy reduces demand by <b>increasing taxation</b> (less disposable income) and <b>reducing government spending</b>. Both are needed for the full 2 marks." },

{ ch:6, topic:"Data protection principles", marks:1, type:"mcq",
  q:"Personal data should be kept for no longer than is necessary for the purpose for which it was collected.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:0,
  exp:"True. Storage limitation is one of the data protection principles – personal data must not be kept longer than necessary for its purpose." },

{ ch:9, topic:"Porter's five forces – substitutes", marks:1, type:"mcq",
  q:"According to Porter's five forces model, a high threat of substitute products is likely to:",
  opts:["Increase the profitability of the industry","Reduce the profitability of the industry"], ans:1,
  exp:"When customers can easily switch to substitutes, firms cannot raise prices without losing sales, so industry profitability is <b>reduced</b>." },

{ ch:8, topic:"PESTEL – social/demographic factors", marks:1, type:"mcq",
  q:"In a PESTEL analysis, an ageing population would be classified as which type of factor?",
  opts:["Social","Economic"], ans:0,
  exp:"Demographic changes such as the age structure of the population are <b>social</b> factors." },

/* ---------------- AREA B : Ch 2, 3, 11 ---------------- */
{ ch:2, topic:"Tall vs flat structures", marks:2, type:"mcq",
  q:"Which of the following is a characteristic of a FLAT organisation structure?",
  opts:["Wide spans of control","Many levels of management","Narrow spans of control","A long scalar chain"], ans:0,
  exp:"A flat structure has few levels of management, so each manager supervises more people – <b>wide spans of control</b> and a <b>short</b> scalar chain. B, C and D describe a tall structure." },

{ ch:2, topic:"Matrix structure", marks:2, type:"mcq",
  q:"Which of the following is a disadvantage of a matrix structure?",
  opts:["Poor co-ordination between functional departments",
        "Lack of access to specialist functional expertise",
        "Slow response to customer needs as all decisions are made by one person",
        "Dual authority, which may cause conflict and confusion for employees"], ans:3,
  exp:"In a matrix structure employees report to two managers (e.g. a functional manager and a project/product manager). This <b>dual authority</b> can create conflict and confusion. Better co-ordination and access to specialist expertise are advantages of a matrix." },

{ ch:3, topic:"Handy's cultures", marks:2, type:"mcq",
  q:"Z Co is a consultancy firm. Staff work in project teams which are formed to solve particular client problems. Expertise is valued more than position or seniority.<br><br>Which of Handy's cultures does Z Co display?",
  opts:["Power","Role","Task","Person"], ans:2,
  exp:"A <b>task</b> culture focuses on getting the job done, using teams and valuing expertise – typical of project-based organisations. Power = central figure; role = bureaucracy and rules; person = exists to serve the individuals within it." },

{ ch:3, topic:"Hofstede's dimensions", marks:2, type:"multi",
  q:"Which TWO of the following are dimensions of national culture identified by Hofstede?",
  opts:["Power distance","Uncertainty avoidance","Espoused values","Task orientation"], ans:[0,1],
  exp:"Hofstede's dimensions include <b>power distance</b>, <b>uncertainty avoidance</b>, individualism vs collectivism, masculinity vs femininity and long-term orientation. Espoused values is one of Schein's levels of culture." },

{ ch:11, topic:"Role of non-executive directors", marks:2, type:"mcq",
  q:"Which of the following is a key role of independent non-executive directors (NEDs)?",
  opts:["Managing the day-to-day operations of the company",
        "Acting as the company's internal auditors",
        "Preparing the company's annual financial statements",
        "Objectively scrutinising the performance of executive management and contributing to strategy"], ans:3,
  exp:"NEDs bring independence and objectivity to the board. They scrutinise executive performance, contribute to strategy, and sit on the audit, remuneration and nomination committees. Day-to-day management is the role of executive directors." },

{ ch:3, topic:"Informal organisation – grapevine", marks:1, type:"mcq",
  q:"The informal organisation can speed up communication through the 'grapevine'.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:0,
  exp:"True. The grapevine is informal communication between staff. It can be very fast, although messages may be inaccurate." },

{ ch:11, topic:"Separation of chair and CEO", marks:1, type:"mcq",
  q:"Under corporate governance best practice, the roles of chairman and chief executive should be:",
  opts:["Held by the same person, to ensure strong leadership","Held by different people"], ans:1,
  exp:"Separating the roles avoids too much power being concentrated in one individual. The chair runs the board; the CEO runs the business." },

/* ---------------- AREA C : Ch 4, 12, 13, 14, 15, 16, 17 ---------------- */
{ ch:4, topic:"Big data – 3Vs", marks:2, type:"mcq",
  q:"Which characteristic of big data refers to the speed at which data is generated and needs to be processed?",
  opts:["Volume","Variety","Velocity","Veracity"], ans:2,
  exp:"<b>Velocity</b> is the speed at which data changes and must be updated/processed. Volume = amount of data; variety = range of sources/formats; veracity = accuracy/truthfulness of the data." },

{ ch:4, topic:"Cloud computing", marks:2, type:"mcq",
  q:"Which of the following is an advantage of cloud computing for an organisation?",
  opts:["All data is held on the organisation's own premises",
        "All data security risks are removed",
        "Systems can be accessed without any internet connection",
        "Storage capacity can be increased or reduced quickly, paying only for what is used"], ans:3,
  exp:"Cloud computing offers <b>scalability</b> and flexible pay-as-you-use pricing. Data is held off-site by the provider, an internet connection is needed, and security risks still exist (and may increase)." },

{ ch:12, topic:"Money laundering – stages", marks:2, type:"mcq",
  q:"A criminal moves illegally obtained funds through a complex series of transfers between bank accounts in several countries to hide their origin.<br><br>Which stage of money laundering does this describe?",
  opts:["Placement","Layering","Integration","Tipping off"], ans:1,
  exp:"<b>Layering</b> involves complex transactions to disguise the source of the funds. Placement = getting the illegal cash into the financial system; integration = the funds re-enter the economy appearing legitimate. Tipping off is a separate offence (warning a suspect)." },

{ ch:13, topic:"Treasury function", marks:2, type:"multi",
  q:"Which TWO of the following are normally responsibilities of the treasury function?",
  opts:["Managing cash and short-term investments","Raising long-term finance","Processing the monthly payroll","Recording sales invoices in the ledger"], ans:[0,1],
  exp:"Treasury manages the company's <b>cash, liquidity and funding</b> – including raising finance and investing surplus cash. Payroll processing and recording invoices are financial accounting tasks." },

{ ch:16, topic:"External audit", marks:2, type:"mcq",
  q:"Which of the following statements about external auditors is correct?",
  opts:["They give an opinion on whether the financial statements give a true and fair view",
        "They report to management on the efficiency of the company's operations",
        "They are usually employees of the company being audited",
        "Their main responsibility is to detect all fraud within the company"], ans:0,
  exp:"External auditors are independent of the company and report to the <b>shareholders</b> with an opinion on whether the financial statements give a <b>true and fair view</b>. Reporting on operational efficiency is a typical internal audit role; preventing and detecting fraud is the responsibility of management." },

{ ch:17, topic:"Prerequisites of fraud", marks:2, type:"mcq",
  q:"What are the three prerequisites for fraud to occur?",
  opts:["Dishonesty, opportunity and motivation","Pressure, capability and concealment","Dishonesty, collusion and control weakness","Opportunity, concealment and motivation"], ans:0,
  exp:"Fraud usually requires <b>dishonesty</b> (lack of integrity), <b>opportunity</b> (often from weak controls) and <b>motivation</b> (rewards outweigh the risk of being caught)." },

{ ch:16, topic:"Segregation of duties", marks:1, type:"mcq",
  q:"One employee authorises purchases, records them in the ledger and makes the payments to suppliers. This is an example of:",
  opts:["Good segregation of duties","A lack of segregation of duties"], ans:1,
  exp:"Segregation of duties requires these tasks to be split between different people so that no one person can both commit and conceal an error or fraud." },

{ ch:14, topic:"Purchases system controls", marks:1, type:"mcq",
  q:"Matching the supplier's invoice to the purchase order and goods received note before payment helps ensure the company pays only for goods it ordered and received.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:0,
  exp:"True. This 'three-way match' is a key control in the purchases system." },

{ ch:12, topic:"IASB and IFRS", marks:1, type:"mcq",
  q:"Which body is responsible for issuing International Financial Reporting Standards (IFRS)?",
  opts:["International Accounting Standards Board (IASB)","International Federation of Accountants (IFAC)"], ans:0,
  exp:"The <b>IASB</b> develops and issues IFRS. IFAC is the global body for the accountancy profession (e.g. its ethics board issues the IESBA Code)." },

/* ---------------- AREA D : Ch 18 – 22 ---------------- */
{ ch:18, topic:"Ashridge leadership styles", marks:2, type:"mcq",
  q:"Sara, a team manager, explains a problem to her team and asks for their views. She takes these into account but makes the final decision herself.<br><br>Which Ashridge leadership style is Sara using?",
  opts:["Tells","Sells","Consults","Joins"], ans:2,
  exp:"<b>Consults</b> (participative) – the manager confers with the team and takes their views into account but retains the final say. Tells = manager decides and instructs; sells = manager decides then persuades; joins = decision made together by consensus." },

{ ch:18, topic:"Blake and Mouton grid", marks:2, type:"mcq",
  q:"On Blake and Mouton's managerial grid, a manager with high concern for production and low concern for people would be described as:",
  opts:["1.9 Country club management","9.1 Task management","5.5 Middle of the road management","9.9 Team management"], ans:1,
  exp:"The first number is concern for production, the second concern for people. <b>9.1 Task management</b> – concerned only with production. 1.9 = country club; 5.5 = middle of the road; 9.9 = team management (the ideal)." },

{ ch:19, topic:"Belbin's team roles", marks:2, type:"mcq",
  q:"In Belbin's team roles model, which team member is painstaking, checks details for errors and ensures deadlines are met?",
  opts:["Plant","Resource investigator","Shaper","Completer finisher"], ans:3,
  exp:"The <b>completer finisher</b> polishes the work, checks for errors and makes sure it is delivered on time. Plant = creative ideas; shaper = drives the team forward; resource investigator = explores outside contacts and opportunities." },

{ ch:19, topic:"Tuckman's stages", marks:2, type:"mcq",
  q:"A newly formed project team has stopped arguing over roles. Members are now agreeing ways of working and how decisions will be made.<br><br>Which of Tuckman's stages has the team reached?",
  opts:["Forming","Storming","Norming","Performing"], ans:2,
  exp:"<b>Norming</b> – the team establishes norms, procedures and roles, and co-operation begins. Storming (the conflict stage) has passed; performing comes next when the team is fully productive." },

{ ch:20, topic:"Herzberg – hygiene factors", marks:2, type:"multi",
  q:"Which TWO of the following are hygiene factors according to Herzberg?",
  opts:["Salary","Working conditions","Recognition","Responsibility"], ans:[0,1],
  exp:"Hygiene factors (e.g. <b>pay, working conditions</b>, company policy, supervision) prevent dissatisfaction but do not motivate. Motivators include recognition, responsibility, achievement and advancement." },

{ ch:21, topic:"Honey and Mumford learning styles", marks:2, type:"mcq",
  q:"Ravi prefers to learn by trying out new techniques in practice to see whether they actually work in his job.<br><br>Which of Honey and Mumford's learning styles does Ravi display?",
  opts:["Activist","Reflector","Theorist","Pragmatist"], ans:3,
  exp:"<b>Pragmatists</b> are practical learners interested in how ideas can be applied in the real world. Activists like new experiences and learning by doing; reflectors observe and think before acting; theorists want logical models and concepts." },

{ ch:20, topic:"Vroom's expectancy theory", marks:1, type:"mcq",
  q:"In Vroom's expectancy theory, 'valence' refers to:",
  opts:["The strength of an individual's preference for a particular outcome","The individual's belief that effort will lead to that outcome"], ans:0,
  exp:"Force = Valence × Expectancy. <b>Valence</b> is how much the person values the outcome; <b>expectancy</b> is the belief that effort will lead to it." },

{ ch:22, topic:"360-degree appraisal", marks:1, type:"mcq",
  q:"360-degree appraisal relies only on the views of the employee's immediate line manager.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:1,
  exp:"False. 360-degree appraisal gathers feedback from many sources – managers, peers, subordinates, and sometimes customers and suppliers." },

{ ch:18, topic:"Scientific management – Taylor", marks:1, type:"mcq",
  q:"The scientific management approach is most closely associated with:",
  opts:["F W Taylor","Elton Mayo"], ans:0,
  exp:"<b>Taylor</b> developed scientific management (one best way to do a job, work study, pay linked to output). Mayo is associated with the human relations school (Hawthorne studies)." },

/* ---------------- AREA E : Ch 23, 24 ---------------- */
{ ch:23, topic:"SMART objectives", marks:2, type:"mcq",
  q:"Which of the following objectives is SMART?",
  opts:["Improve customer service","Reduce customer complaints by 10% within the next six months","Become the best company in the industry","Increase sales as much as possible"], ans:1,
  exp:"A SMART objective is Specific, Measurable, Achievable, Relevant and Time-bound. Only B has a measurable target (10%) and a time limit (six months)." },

{ ch:23, topic:"Coaching, mentoring and counselling", marks:2, type:"mcq",
  q:"Which of the following BEST describes counselling in the workplace?",
  opts:["A long-term relationship in which a senior person guides an individual's overall career development",
        "Helping an individual to recognise and resolve personal or work problems that are affecting their performance",
        "Short-term, task-focused help to develop a specific skill",
        "Formal classroom training delivered by external experts"], ans:1,
  exp:"<b>Counselling</b> helps individuals explore and resolve problems (personal or work-related) that affect performance. A describes mentoring; C describes coaching." },

{ ch:24, topic:"Communication process – noise", marks:2, type:"mcq",
  q:"In the communication process, anything that interferes with a message being received and understood as intended, such as the use of jargon, is known as:",
  opts:["Noise","Feedback","Encoding","Channel"], ans:0,
  exp:"<b>Noise</b> is any barrier or interference that distorts the message – e.g. jargon, physical noise, distractions, cultural differences." },

{ ch:24, topic:"Written vs oral communication", marks:2, type:"multi",
  q:"Which TWO of the following are advantages of written communication compared with oral communication?",
  opts:["It provides a permanent record","Complex information can be set out in detail for later reference","It allows immediate feedback","Non-verbal cues such as tone and body language can be used"], ans:[0,1],
  exp:"Written communication gives a <b>permanent record</b> and suits <b>detailed/complex information</b>. Immediate feedback and non-verbal cues are advantages of oral (face-to-face) communication." },

{ ch:23, topic:"Mentoring", marks:1, type:"mcq",
  q:"Mentoring typically involves a longer-term relationship focused on an individual's overall career and personal development.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:0,
  exp:"True. Mentoring is usually long-term and broad (career development); coaching is shorter-term and task-specific." },

{ ch:24, topic:"Direction of communication", marks:1, type:"mcq",
  q:"Communication between managers at the same level in different departments is described as:",
  opts:["Vertical communication","Lateral (horizontal) communication"], ans:1,
  exp:"<b>Lateral/horizontal</b> communication is between people at a similar level. Vertical communication is upwards or downwards through the hierarchy." },

/* ---------------- AREA F : Ch 10 ---------------- */
{ ch:10, topic:"Fundamental principles – objectivity", marks:2, type:"mcq",
  q:"Meera is an accountant preparing the accounts of a client. The client has offered her an expensive holiday as a 'thank you' gift.<br><br>Which fundamental principle is MOST threatened?",
  opts:["Confidentiality","Objectivity","Professional competence and due care","Professional behaviour"], ans:1,
  exp:"Accepting significant gifts may bias Meera's judgement, threatening <b>objectivity</b> (not allowing bias, conflict of interest or undue influence to override professional judgement)." },

{ ch:10, topic:"Threats – self-review", marks:2, type:"mcq",
  q:"Arun is asked to carry out an internal audit of the payroll system which he designed and implemented last year.<br><br>Which threat to his objectivity does this create?",
  opts:["Self-review","Self-interest","Advocacy","Intimidation"], ans:0,
  exp:"A <b>self-review</b> threat arises when an accountant evaluates their own previous work – they may not spot or report their own errors." },

{ ch:10, topic:"Fundamental principles", marks:2, type:"multi",
  q:"Which TWO of the following are fundamental principles in the ACCA Code of Ethics and Conduct?",
  opts:["Integrity","Confidentiality","Independence","Loyalty"], ans:[0,1],
  exp:"The five fundamental principles are <b>integrity, objectivity, professional competence and due care, confidentiality and professional behaviour</b>. Independence and loyalty are not among them." },

{ ch:10, topic:"Principles-based vs rules-based codes", marks:2, type:"mcq",
  q:"Which of the following is an advantage of a principles-based ethical code compared with a rules-based code?",
  opts:["It can be applied to new and unforeseen situations","It is easy to check whether it has been complied with","It provides a definitive answer for every situation","It removes the need for professional judgement"], ans:0,
  exp:"A principles-based code (like the ACCA Code) sets out principles that can be applied to <b>any situation, including new ones</b>. B, C and D are features (claimed) of rules-based codes." },

{ ch:10, topic:"Confidentiality – legal disclosure", marks:1, type:"mcq",
  q:"An accountant may disclose confidential client information without consent where there is a legal duty to do so, for example to report suspected money laundering.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:0,
  exp:"True. Confidentiality can be overridden where disclosure is required by law (e.g. money laundering reporting) or permitted in the public interest." },

{ ch:10, topic:"Threats – familiarity", marks:1, type:"mcq",
  q:"An audit manager has worked on the same client for twelve years and is close friends with its directors. Which threat does this create?",
  opts:["Familiarity","Advocacy"], ans:0,
  exp:"A long or close relationship creates a <b>familiarity</b> threat – the accountant may become too sympathetic to the client's interests." },

{ ch:10, topic:"Professional competence and due care", marks:1, type:"mcq",
  q:"The principle of professional competence and due care means an accountant must have expert knowledge of every area of accounting before accepting any work.<br><br>Is this statement true or false?",
  opts:["True","False"], ans:1,
  exp:"False. The accountant must maintain the knowledge and skill needed for the work they undertake, and act diligently. They should not take on work they are not competent to do – but expertise in every area is not required." }
],

/* =================== SECTION B : 6 multi-task questions =================== */
sectionB: [

/* MTQ 1 – Area A */
{ ch:5, title:"Brightwave Co",
  scenario:"Brightwave Co manufactures smartphones. It has a large factory on the edge of a small town, borrows heavily from its bank, and sells most of its output through a few large electronics retailers. The specialised processor chips used in its phones are available from only two suppliers worldwide.",
  parts:[
    { ch:5, topic:"Internal, connected and external stakeholders", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following stakeholders of Brightwave Co.",
      cols:["Internal","Connected","External"],
      rows:[["Brightwave's bank",1],["Residents of the local town",2],["The production manager",0],["The government",2]],
      exp:"Internal = employees and managers (production manager). Connected = those with a contractual/economic link: shareholders, customers, suppliers, <b>lenders such as the bank</b>. External = government, local community, pressure groups. 0.5 marks each." },
    { ch:9, topic:"Porter's five forces – applying to a scenario", marks:2, type:"gap", markEach:1,
      q:"Identify which of Porter's five forces is illustrated by each statement.",
      text:"(i) Only two suppliers in the world make the processor chips that Brightwave needs: [[0]]<br>(ii) A few large retailers buy most of Brightwave's output and could easily switch to rival brands: [[1]]",
      gaps:[["Threat of new entrants","Threat of substitutes","Bargaining power of suppliers","Bargaining power of customers","Competitive rivalry"],
            ["Threat of new entrants","Threat of substitutes","Bargaining power of suppliers","Bargaining power of customers","Competitive rivalry"]],
      ans:[2,3],
      exp:"(i) Few suppliers of a key input = high <b>bargaining power of suppliers</b>. (ii) A few large buyers who can switch easily = high <b>bargaining power of customers (buyers)</b>. 1 mark each." }
  ]},

/* MTQ 2 – Area B */
{ ch:3, title:"Kavi Co",
  scenario:"Kavi Co is a growing retail chain. A new HR director is reviewing the company's culture and its approach to sustainability before a planned expansion.",
  parts:[
    { ch:3, topic:"Schein's levels of culture", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following aspects of Kavi Co's culture using Schein's three levels.",
      cols:["Artefacts","Espoused values","Basic assumptions"],
      rows:[["All store staff wear the company uniform",0],["The slogan 'Customers come first' is displayed in every store",1],["An unspoken belief that staying late shows commitment to the company",2],["The open-plan layout of head office",0]],
      exp:"<b>Artefacts</b> are visible aspects (uniforms, office layout). <b>Espoused values</b> are stated values, goals and slogans. <b>Basic assumptions</b> are unseen, unconscious beliefs (e.g. staying late shows commitment). 0.5 marks each." },
    { ch:11, topic:"Sustainable business practices", marks:2, type:"multi", markEach:1,
      q:"Which TWO of the following proposals are examples of sustainable business practice?",
      opts:["Reducing packaging and using recycled materials","Delaying payments to small suppliers to improve cash flow","Recruiting and training staff from local communities and sourcing products locally","Cutting all staff training to maximise short-term dividends"],
      ans:[0,2],
      exp:"Sustainability means meeting present needs without compromising future generations – balancing environmental, social and economic impacts. <b>Reducing packaging/recycling</b> (environmental) and <b>local recruitment and sourcing</b> (social/economic) are sustainable. B and D focus only on the short term at others' expense. 1 mark each." }
  ]},

/* MTQ 3 – Area C */
{ ch:16, title:"Ravi's Retail",
  scenario:"Ravi's Retail is a medium-sized company. Its finance manager is reviewing the internal controls in place after a small fraud was discovered in the purchases department last year.",
  parts:[
    { ch:16, topic:"Preventive, detective and corrective controls", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following controls.",
      cols:["Preventive","Detective","Corrective"],
      rows:[["The stockroom is kept locked and only the storekeeper holds the key",0],["A bank reconciliation is performed every month",1],["All purchase orders over $1,000 must be authorised by the finance manager",0],["Errors identified by an exception report are investigated and the records corrected",2]],
      exp:"<b>Preventive</b> controls stop errors/fraud happening (physical security, authorisation). <b>Detective</b> controls identify problems after they occur (reconciliations, exception reports). <b>Corrective</b> controls rectify problems found (follow-up and correction). 0.5 marks each." },
    { ch:17, topic:"Fraud risk indicators", marks:2, type:"multi", markEach:1,
      q:"Which TWO of the following would MOST increase the risk of fraud at Ravi's Retail?",
      opts:["A purchases manager who refuses to take any holiday","Regular rotation of staff between roles","Weak internal controls with little supervision","Thorough background checks on new recruits"],
      ans:[0,2],
      exp:"Staff who refuse holidays may be concealing a fraud (someone covering for them might discover it). <b>Weak controls and poor supervision</b> create opportunity. Job rotation and recruitment checks <b>reduce</b> fraud risk. 1 mark each." }
  ]},

/* MTQ 4 – Area D */
{ ch:20, title:"Sunrise Hotels",
  scenario:"Sunrise Hotels is reviewing how it motivates its staff, after a staff survey showed low morale. The HR team is using motivation theories to evaluate the current reward package and management approach.",
  parts:[
    { ch:20, topic:"Maslow's hierarchy of needs", marks:2, type:"matrix", markEach:0.5,
      q:"Identify which level of Maslow's hierarchy each of the following benefits would satisfy.",
      cols:["Safety","Social","Esteem","Self-actualisation"],
      rows:[["A company pension scheme and secure employment contracts",0],["Regular team social events",1],["An 'employee of the month' award",2],["The chance to lead challenging projects and reach full potential",3]],
      exp:"Safety = security and stability (pension, job security). Social = belonging and friendship (team events). Esteem = recognition and status (awards). Self-actualisation = fulfilling one's potential (challenging projects). 0.5 marks each." },
    { ch:20, topic:"McGregor's Theory X and Theory Y", marks:2, type:"gap", markEach:1,
      q:"Complete the following statements about McGregor's theory.",
      text:"(i) A manager at one hotel believes staff dislike work and must be closely supervised and controlled. This manager holds [[0]] assumptions.<br>(ii) Another manager delegates authority, believing staff will seek responsibility and use their initiative. This manager holds [[1]] assumptions.",
      gaps:[["Theory X","Theory Y"],["Theory X","Theory Y"]], ans:[0,1],
      exp:"<b>Theory X</b> managers assume people are lazy, dislike work and need control. <b>Theory Y</b> managers assume people can enjoy work, seek responsibility and are self-directed. 1 mark each." }
  ]},

/* MTQ 5 – Area E */
{ ch:24, title:"Delta Logistics",
  scenario:"Delta Logistics has grown quickly. Its managers are concerned about the way information is communicated across the business and about disagreements that have arisen between staff in the warehouse.",
  parts:[
    { ch:24, topic:"Formal and informal communication", marks:2, type:"matrix", markEach:0.5,
      q:"Classify each of the following as formal or informal communication.",
      cols:["Formal","Informal"],
      rows:[["Minutes of the monthly board meeting",0],["Rumours passed between warehouse staff (the grapevine)",1],["An email from HR announcing a new holiday policy",0],["A chat between two colleagues during their lunch break",1]],
      exp:"<b>Formal</b> communication follows official channels (minutes, policy announcements). <b>Informal</b> communication happens outside official structures (grapevine, casual conversations). 0.5 marks each." },
    { ch:23, topic:"Conflict management strategies", marks:2, type:"gap", markEach:1,
      q:"Identify the conflict management strategy used in each case.",
      text:"(i) The warehouse manager tells two arguing employees that they will face disciplinary action unless they stop: [[0]]<br>(ii) The manager investigates the root cause of the dispute and finds a solution that fully satisfies both employees: [[1]]",
      gaps:[["Denial","Suppression","Reduction/negotiation","Resolution"],["Denial","Suppression","Reduction/negotiation","Resolution"]], ans:[1,3],
      exp:"<b>Suppression</b> – threatening the parties to make them stop (short-term only). <b>Resolution</b> – finding and solving the root cause for a win-win outcome. Denial = ignoring the conflict; reduction/negotiation = compromise. 1 mark each." }
  ]},

/* MTQ 6 – Area F */
{ ch:10, title:"Priya – Lotus Co",
  scenario:"Priya is a part-qualified ACCA student working in the finance department of Lotus Co. She is facing several situations that may affect her compliance with the fundamental ethical principles.",
  parts:[
    { ch:10, topic:"Identifying threats to the fundamental principles", marks:2, type:"gap", markEach:0.5,
      q:"Identify the type of threat in each situation.",
      text:"(i) Priya owns shares in a key customer whose credit limit she sets: [[0]]<br>(ii) The managing director says Priya will lose her job unless she changes the profit figure: [[1]]<br>(iii) Priya is asked to promote Lotus Co's shares to potential investors: [[2]]<br>(iv) Priya is asked to check the budgets she prepared herself: [[3]]",
      gaps:[["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"],["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"],["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"],["Self-interest","Self-review","Advocacy","Familiarity","Intimidation"]],
      ans:[0,4,2,1],
      exp:"(i) Financial interest = <b>self-interest</b>. (ii) Threats of dismissal = <b>intimidation</b>. (iii) Promoting the employer's position = <b>advocacy</b>. (iv) Checking own work = <b>self-review</b>. 0.5 marks each." },
    { ch:10, topic:"Resolving an ethical conflict", marks:2, type:"mcq",
      q:"Following the managing director's threat, what should Priya do FIRST?",
      opts:["Change the profit figure as instructed, as the managing director is responsible for the accounts",
            "Resign immediately",
            "Gather the relevant facts, follow Lotus Co's internal procedures and raise the matter with an appropriate senior person, documenting her actions",
            "Report the matter to a newspaper"],
      ans:2,
      exp:"When facing an ethical conflict, Priya should first establish the facts and use the organisation's <b>internal procedures</b> (e.g. escalate to the finance director/audit committee), keeping records. She can seek advice from ACCA. Resignation is a last resort; going to the press is not appropriate." }
  ]}
]
};
