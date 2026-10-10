/* Builds the five Enterprise project detail pages from a shared template.
   Run:  node tools/build-projects.js   */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'projects');
fs.mkdirSync(OUT, { recursive: true });

/* reuse the exact icon sprite already in index.html so nothing drifts */
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sprite = indexHtml.match(/<svg class="svg-sprite"[\s\S]*?<\/svg>/)[0];

/* ══════════════════════ DATA ══════════════════════ */
const projects = [
  {
    slug: 'erp',
    title: 'Enterprise Resource Planning Platform',
    kicker: 'Enterprise Software',
    accent: '#22d3ee',
    lede:
      'A <strong>complete ERP platform</strong> built to run the operations of large Bangladeshi enterprises — finance, procurement, inventory, production and HR on a single database, replacing a patchwork of disconnected spreadsheets and legacy tools.',
    facts: [
      ['Clients', 'BRAC · Priyojon · BNB'],
      ['Sectors', 'Retail, Distribution, Micro-finance'],
      ['Delivered', '2019 — 2021'],
      ['My role', 'Software Engineer']
    ],
    preview: { src: 'assets/img/mock/erp-dashboard.svg', alt: 'ERP executive dashboard' },
    badgeOne: '11 modules live',
    badgeTwo: '6,000+ daily users',
    challenge: {
      title: 'The challenge',
      items: [
        'Operations ran across <strong>seven disconnected spreadsheets</strong> per department — finance never matched sales, and month-end closing took weeks.',
        'Branch data arrived late and inconsistently, so leadership made decisions on <strong>outdated numbers</strong>.',
        'Multi-division structures with different pricing rules meant <strong>every report needed manual rework</strong>.',
        'Existing off-the-shelf ERP could not be adapted to the client’s credit, payroll and distribution rules without heavy customisation.'
      ]
    },
    solution: {
      title: 'The solution',
      items: [
        'One <strong>modular monolith</strong> — shared master data, role-based access, and a single source of truth across every branch.',
        'A <strong>workflow engine</strong> for approval chains: purchase orders, stock transfers, credit notes and payroll all route by rule, not by email.',
        'Real-time dashboards that aggregate from transaction tables, so a figure on screen is never a cached copy.',
        'A <strong>role-aware reporting layer</strong> that generates statutory and management reports from the same data, with export to Excel and PDF.'
      ]
    },
    gallery: [
      {
        src: 'assets/img/mock/erp-dashboard.svg',
        alt: 'ERP executive dashboard with KPIs and revenue charts',
        cap: 'Executive dashboard',
        text: 'Live KPIs, revenue trends by division and the open-order pipeline, aggregated from transaction data — no manual refresh.',
        span: 'wide'
      },
      {
        src: 'assets/img/mock/erp-orders.svg',
        alt: 'Sales order listing with filters and status',
        cap: 'Order lifecycle',
        text: 'Every order from draft to dispatch, with division filters, approval state and export.'
      },
      {
        src: 'assets/img/mock/erp-inventory.svg',
        alt: 'Inventory control screen with warehouse ledger and reorder alerts',
        cap: 'Inventory control',
        text: 'Multi-warehouse stock ledger with reorder alerts, valuation and stock-health tracking.'
      }
    ],
    modules: [
      ['i-briefcase', 'Sales & Distribution', 'Quotation, sales order, dispatch, delivery confirmation, returns and territory-wise billing.'],
      ['i-db', 'Procurement & Inventory', 'Supplier masters, purchase orders, GRN, multi-warehouse transfers, batch and serial tracking with live reorder alerts.'],
      ['i-code', 'Accounts & Finance', 'Double-entry ledger, chart of accounts, VAT, bank reconciliation, ageing reports and financial statements.'],
      ['i-server', 'Production Planning', 'Bill of materials, work orders, machine scheduling and finished-goods receipts.'],
      ['i-tools', 'HR & Payroll', 'Employee masters, attendance, leave, salary structure, payslips and statutory deductions.'],
      ['i-cap', 'Branch & Territory', 'Multi-branch setup, territory allocation, branch-wise P&L and consolidated group reporting.'],
      ['i-phone', 'Mobile Field Companion', 'Officers capture orders and stock checks on Android; data syncs to the server when online.'],
      ['i-tools', 'Reporting & Audit', 'Scheduled report generation, an immutable audit log and role-restricted data export.']
    ],
    tech: {
      colA: ['i-code', 'Application', [
        ['Language', 'C# · .NET'], ['Web framework', 'ASP.NET Core'], ['Data access', 'Entity Framework Core'],
        ['Real-time', 'SignalR'], ['Reporting', 'RDLC / Excel export'], ['Auth', 'ASP.NET Identity']
      ]],
      colB: ['i-db', 'Data & Infrastructure', [
        ['Primary database', 'SQL Server'], ['Procedures', '150+ stored procedures'], ['Reporting store', 'Indexed views'],
        ['Hosting', 'IIS / Windows Server'], ['Version control', 'Git'], ['Method', 'Agile / SCRUM']
      ]]
    },
    role: [
      'Designed the <strong>domain model</strong> and the module boundaries that let eleven functional areas share one database safely.',
      'Wrote the majority of the <strong>stored procedure layer</strong> and the authorisation rules behind every screen.',
      'Built reusable <strong>reporting components</strong> that saved the team weeks on each new client report.',
      'Ran integration testing across modules and mentored junior developers through code review.'
    ],
    stack: [
      ['Architecture', 'Modular monolith, service/repository layers'],
      ['Database', 'SQL Server · 150+ stored procedures · indexed views'],
      ['Team', 'Cross-functional squad of 6, SCRUM sprints'],
      ['Duration', '≈ 18 months across two engagements']
    ],
    results: [
      ['98%', 'Month-end close accuracy across audited branches'],
      ['6×', 'Faster month-end reporting cycle'],
      ['11', 'Modules delivered in one platform'],
      ['5k+', 'Concurrent users supported']
    ],
    quote: {
      text: 'The ERP replaced seven spreadsheets and gave us one number we can trust. Reporting that used to take a week now takes an afternoon.',
      who: 'Head of Operations',
      where: 'Enterprise client · 2021'
    }
  },

  {
    slug: 'field-force',
    title: 'Field Force Management System',
    kicker: 'Sales Operations',
    accent: '#f59e0b',
    lede:
      'A sales-force platform that plans outlet visits, tracks 400+ field officers across territories, and turns every visit into <strong>verified, geo-tagged, auditable data</strong> for the sales leadership team.',
    facts: [
      ['Client', 'Enterprise FMCG distributor'],
      ['Scale', '412 field officers · 8 territories'],
      ['Delivered', '2020 — 2021'],
      ['My role', 'Software Engineer']
    ],
    preview: { src: 'assets/img/mock/ffm-command.svg', alt: 'Field force command centre' },
    badgeOne: '412 officers live',
    badgeTwo: '1,986 visits / day',
    challenge: {
      title: 'The challenge',
      items: [
        'Field officers worked from <strong>memory and paper diaries</strong> — no proof a visit happened, and no idea why a territory was underperforming.',
        'Sales managers spent the morning <strong>chasing status updates</strong> instead of coaching the team.',
        'New leads discovered in the field were lost or double-visited because nothing <strong>shared the picture</strong> centrally.',
        'Target achievement was measured <strong>month-end, too late to act</strong> within a selling cycle.'
      ]
    },
    solution: {
      title: 'The solution',
      items: [
        'A daily <strong>visit plan</strong> that auto-generates from territory targets, then adjusts when an officer misses a slot.',
        '<strong>Geo-tagged check-in/check-out</strong> with a configurable visit radius, so attendance is proven rather than reported.',
        'A live <strong>command centre</strong> showing who is on-site, who is travelling and who is falling behind target.',
        'Instant <strong>lead capture and reorder</strong> from the field, syncing to the sales and inventory systems the moment a device reconnects.'
      ]
    },
    gallery: [
      {
        src: 'assets/img/mock/ffm-command.svg',
        alt: 'Field force command centre with live map and daily targets',
        cap: 'Live command centre',
        text: 'Officer locations, real-time daily target progress and division-level attainment, updated continuously.',
        span: 'wide'
      },
      {
        src: 'assets/img/mock/ffm-visits.svg',
        alt: 'Visit schedule planner with officer and outlet assignment',
        cap: 'Visit scheduling',
        text: 'Plan and reassign outlet visits by territory, with completed, in-progress and missed states.'
      },
      {
        src: 'assets/img/field-force.png',
        alt: 'Field force management concept illustration',
        cap: 'From paper to platform',
        text: 'The original paper-diary workflow the system replaced — and the data model that made it digital.',
        span: 'wide'
      }
    ],
    modules: [
      ['i-pin', 'Territory Planning', 'Division, district, territory and outlet hierarchy with capacity and distance-aware assignment.'],
      ['i-calendar', 'Visit Scheduling', 'Auto-generated daily plans from targets, drag-to-reschedule, and carry-forward of missed slots.'],
      ['i-phone', 'Mobile Companion', 'Offline-first Android client for check-in, order capture, stock count and proof of visit.'],
      ['i-briefcase', 'Leads & Reorders', 'Lead capture with duplicates detection, and reorder suggestions from outlet sell-through data.'],
      ['i-server', 'Performance Scoring', 'Attainment, visit frequency, order value and territory penetration per officer and per manager.'],
      ['i-code', 'Sync & Offline', 'Conflict-safe delta sync that survives patchy field connectivity without losing a single record.'],
      ['i-tools', 'Manager Coaching', 'Call and check-in logs, feedback notes and rank boards to target coaching where it matters.'],
      ['i-quote', 'Dashboards & Alerts', 'Exception alerts for missed targets, unplanned absence and sudden outlet churn.']
    ],
    tech: {
      colA: ['i-code', 'Application', [
        ['Backend', 'ASP.NET Core Web API'], ['Language', 'C#'], ['Front end', 'JavaScript · jQuery'],
        ['Mobile client', 'Android (WebView + REST)'], ['Realtime', 'SignalR push'], ['Maps', 'Territory polygon mapping']
      ]],
      colB: ['i-db', 'Data & Infrastructure', [
        ['Database', 'SQL Server'], ['Sync', 'Delta sync with conflict resolution'],
        ['Reporting', 'Indexed views + SSRS'], ['Hosting', 'IIS farm'],
        ['Offline store', 'SQLite on device'], ['Method', 'Agile / SCRUM']
      ]]
    },
    role: [
      'Designed the <strong>visit, outlet and territory data model</strong> and the assignment algorithms behind it.',
      'Built the <strong>offline sync engine</strong> — the hardest part of the project, since field connectivity is unreliable.',
      'Implemented <strong>geo-fencing and attendance verification</strong> rules in the API.',
      'Designed the manager dashboards and the exception-alerting service.'
    ],
    stack: [
      ['Architecture', 'API-first, offline-tolerant mobile sync'],
      ['Sync engine', 'Delta sync + conflict resolution'],
      ['Team', 'Squad of 5 with a dedicated QA analyst'],
      ['Duration', '≈ 11 months, rolled out territory by territory']
    ],
    results: [
      ['1,986', 'Verified visits recorded daily'],
      ['98%', 'Plan adherence, up from ~61%'],
      ['+34%', 'New outlet discovery rate'],
      ['0', 'Data disputes after geo-verification']
    ],
    quote: {
      text: 'For the first time I can see where my team actually is during the day, and which outlets we are about to lose.',
      who: 'National Sales Manager',
      where: 'FMCG distribution client'
    }
  },

  {
    slug: 'accounting',
    title: 'Accounts & Bookkeeping Software',
    kicker: 'Finance · Statutory Compliance',
    accent: '#d946ef',
    lede:
      'Double-entry accounting and bookkeeping software built for <strong>NRB Bangladesh</strong> and VAT-certified by the National Board of Revenue — producing statutory returns straight from the ledger instead of a month of manual preparation.',
    facts: [
      ['Client', 'NRB Bangladesh'],
      ['Compliance', 'VAT certified by NRB'],
      ['Delivered', '2019 — 2021'],
      ['My role', 'Software Engineer']
    ],
    preview: { src: 'assets/img/mock/accounts-ledger.svg', alt: 'General ledger screen' },
    badgeOne: 'NRB VAT certified',
    badgeTwo: '100% audit trail',
    challenge: {
      title: 'The challenge',
      items: [
        'Books were maintained in Excel, so the <strong>ledger and the bank statement drifted apart</strong> and reconciliation was painful.',
        'The VAT return was assembled <strong>by hand every period</strong>, taking days and carrying transcription risk.',
        'No enforced double-entry meant <strong>misstatements slipped through</strong> unnoticed for months.',
        'Auditors asked for a <strong>trail of who changed what, and when</strong> — something spreadsheets could not provide.'
      ]
    },
    solution: {
      title: 'The solution',
      items: [
        'A strict <strong>double-entry engine</strong> where every posting is balanced and unbalanced journals are impossible to save.',
        'A <strong>chart of accounts</strong> with NRB-friendly ledgers and automatic VAT treatment on sales and purchases.',
        'The statutory VAT return is <strong>generated and schema-validated</strong> from the ledger — no re-keying.',
        'An <strong>immutable audit log</strong> recording every entry, edit, reversal and approval with user and timestamp.'
      ]
    },
    gallery: [
      {
        src: 'assets/img/mock/accounts-ledger.svg',
        alt: 'General ledger with vouchers and balance summary',
        cap: 'General ledger',
        text: 'Voucher-level ledger with debit/credit postings and an always-current balance summary.',
        span: 'wide'
      },
      {
        src: 'assets/img/mock/accounts-vat.svg',
        alt: 'VAT return generation and filing screen',
        cap: 'Statutory VAT return',
        text: 'The NRB return generated and validated directly from the ledger, then submitted in one action.'
      },
      {
        src: 'assets/img/accounting.jpg',
        alt: 'Accounting and bookkeeping illustration',
        cap: 'Compliance by design',
        text: 'Accounting rules encoded once in the system, so every voucher is compliant the moment it is posted.',
        span: 'wide'
      }
    ],
    modules: [
      ['i-code', 'Double-Entry Engine', 'Balanced journal enforcement, automatic reversals, multi-currency posting and period locking.'],
      ['i-db', 'Chart of Accounts', 'Hierarchical ledgers, cost centres, NRB-aligned heads and prior-year comparatives.'],
      ['i-quote', 'Vouchers & Journal', 'JV, PV, CV, Dr/Cr and sales/purchase vouchers with approval workflow.'],
      ['i-server', 'Bank Reconciliation', 'Auto-matching of statement lines to vouchers with one-click manual override and unmatched tracking.'],
      ['i-tools', 'VAT & Tax', 'Input/output VAT, VAT returns, TIN validation and statutory filing history.'],
      ['i-briefcase', 'Payables & Receivables', 'Ageing analysis, due dates, credit limits, follow-up lists and settlement tracking.'],
      ['i-tools', 'Inventory Accounting', 'Weighted-average and FIFO valuation with automatic GRN and dispatch postings.'],
      ['i-cap', 'Financial Statements', 'Trial balance, P&L, balance sheet and cash flow generated on demand for any period.']
    ],
    tech: {
      colA: ['i-code', 'Application', [
        ['Language', 'C# · .NET'], ['Framework', 'ASP.NET Core MVC'], ['Data access', 'Entity Framework Core'],
        ['Excel engine', 'ClosedXML / EPPlus'], ['PDF', 'Rotativa'], ['Auth', 'Role-based with approval matrix']
      ]],
      colB: ['i-db', 'Data & Infrastructure', [
        ['Database', 'SQL Server'], ['Validation', 'NRB schema validation'], ['Audit', 'Append-only audit tables'],
        ['Reporting', 'Crystal Reports + Excel'], ['Hosting', 'IIS on-premise'],
        ['Compliance', 'VAT certified by NRB']
      ]]
    },
    role: [
      'Implemented the <strong>posting engine</strong> that guarantees balanced, immutable journal entries.',
      'Encoded NRB VAT rules and the return schema so statutory filing <strong>could not be produced incorrectly</strong>.',
      'Built the bank reconciliation auto-matching service and the ageing report engine.',
      'Handled data migration from the client’s existing Excel books with full reconciliation.'
    ],
    stack: [
      ['Architecture', 'Service-oriented finance core'],
      ['Compliance', 'NRB VAT certification'],
      ['Migration', 'Excel → validated ledger'],
      ['Duration', '≈ 9 months including parallel run']
    ],
    results: [
      ['3 days → 20 min', 'VAT return preparation time'],
      ['100%', 'Balanced postings, enforced by the engine'],
      ['12 yrs', 'Ledgers migrated without variance'],
      ['Zero', 'Statutory filing rejections since go-live']
    ],
    quote: {
      text: 'The return now builds itself from the books. Our accountant spends the time checking rather than typing.',
      who: 'Finance Manager',
      where: 'NRB Bangladesh · 2021'
    }
  },

  {
    slug: 'school-management',
    title: 'School Management System',
    kicker: 'Education · ERP',
    accent: '#22c55e',
    lede:
      'An advanced school management platform with <strong>integrated payroll</strong>, delivered for Aloha Bangladesh — covering admissions, attendance, examinations, grading, fee collection and staff payroll in one system.',
    facts: [
      ['Client', 'Aloha Bangladesh'],
      ['Scope', 'Admissions → Payroll'],
      ['Delivered', '2019 — 2021'],
      ['My role', 'Software Engineer']
    ],
    preview: { src: 'assets/img/mock/school-dashboard.svg', alt: 'School management dashboard' },
    badgeOne: '4,182 students',
    badgeTwo: 'Payroll integrated',
    challenge: {
      title: 'The challenge',
      items: [
        'Admissions, attendance, exam results and fees lived in <strong>four different registers</strong>, so a single student’s record took hours to assemble.',
        'Staff payroll was calculated in a spreadsheet from <strong>manually typed attendance</strong> — regular errors and arguments.',
        'Parents wanted <strong>prompt, accurate updates</strong> that the front office could not provide at that volume.',
        'Fee collection was tracked on paper, giving <strong>no reliable receivables picture</strong> for the trust.'
      ]
    },
    solution: {
      title: 'The solution',
      items: [
        'A <strong>single student record</strong> spanning admission, enrolment, attendance, grades, fees and transport.',
        '<strong>Attendance captured at source</strong> — biometric device import — flowing automatically into payroll deductions.',
        'A payroll engine handling salary structure, overtime, absences and statutory deductions with payslip generation.',
        'Automated <strong>receivables ageing and fee reminders</strong>, plus role-scoped portals for office, teacher and guardian.'
      ]
    },
    gallery: [
      {
        src: 'assets/img/mock/school-dashboard.svg',
        alt: 'School dashboard with student statistics and class distribution',
        cap: 'Academic overview',
        text: 'Enrolment, attendance and collection at a glance, with per-class distribution.',
        span: 'wide'
      },
      {
        src: 'assets/img/mock/school-payroll.svg',
        alt: 'Payroll run with attendance-synced deductions',
        cap: 'Integrated payroll',
        text: 'Attendance synced from the biometric device, deductions computed automatically, then approved and disbursed.'
      }
    ],
    modules: [
      ['i-cap', 'Admissions & Enrolment', 'Online and desk applications, merit lists, seat allocation, document tracking and admission tests.'],
      ['i-server', 'Student Records', 'One profile per student spanning enrolment, class history, guardians, medical notes and documents.'],
      ['i-calendar', 'Attendance', 'Biometric device sync, teacher mark-taking, leave handling and daily register with auto-parent alerts.'],
      ['i-quote', 'Exams & Grading', 'Exam schedules, mark entry, grade computation, GPA and report-card generation with templates.'],
      ['i-briefcase', 'Payroll', 'Salary structures, attendance-linked deductions, overtime, payslips and bank disbursement file.'],
      ['i-db', 'Fees & Accounts', 'Fee structures, instalments, receipts, arrears ageing, concessions and financial reports.'],
      ['i-phone', 'Parent Portal', 'Attendance, results, fee dues and notices scoped to each guardian’s own children only.'],
      ['i-server', 'Transport', 'Route and stop allocation, vehicle manifest, student pickup log and staff duty roster.']
    ],
    tech: {
      colA: ['i-code', 'Application', [
        ['Backend', 'ASP.NET Core'], ['Language', 'C#'], ['Front end', 'HTML5 · CSS3 · Bootstrap'],
        ['Biometric', 'Device SDK import'], ['Reports', 'RDLC report cards'], ['Portals', 'Web + responsive']
      ]],
      colB: ['i-db', 'Data & Infrastructure', [
        ['Database', 'SQL Server'], ['Fee rules', 'Configurable engine'], ['Payroll', 'Stored-procedure batch runs'],
        ['Hosting', 'On-premise + campus LAN'], ['Version control', 'Git'],
        ['Method', 'Agile / SCRUM']
      ]]
    },
    role: [
      'Built the <strong>attendance-to-payroll pipeline</strong>, replacing manual spreadsheet entry entirely.',
      'Designed the <strong>fee and receivables engine</strong> supporting instalments, concessions and arrears.',
      'Implemented report-card generation with configurable templates for each class level.',
      'Integrated the biometric device SDK and hardened the import against duplicate and out-of-order records.'
    ],
    stack: [
      ['Architecture', 'Modular monolith with portal layer'],
      ['Integration', 'Biometric attendance device'],
      ['Team', 'Squad of 5 across two quarters'],
      ['Duration', '≈ 8 months, phased by term']
    ],
    results: [
      ['4,182', 'Students onboarded in one academic year'],
      ['96.4%', 'Average attendance accuracy recorded'],
      ['~4 days', 'Payroll time cut per month'],
      ['100%', 'Fees traceable per guardian']
    ],
    quote: {
      text: 'One place for admission, attendance, results and payroll. The office stopped reconciling registers every evening.',
      who: 'Administrator',
      where: 'Aloha Bangladesh'
    }
  },

  {
    slug: 'hrm-redcross',
    title: 'HRM System — Red Cross Bangladesh',
    kicker: 'Human Resources',
    accent: '#6366f1',
    lede:
      'A human resource management system for <strong>Red Cross Bangladesh</strong> covering the full employee lifecycle — recruitment, records, attendance, leave, payroll and performance — for more than 1,600 staff across 11 departments.',
    facts: [
      ['Client', 'Red Cross Bangladesh'],
      ['Scale', '1,642 employees · 11 departments'],
      ['Delivered', '2019 — 2021'],
      ['My role', 'Software Engineer']
    ],
    preview: { src: 'assets/img/mock/hrm-directory.svg', alt: 'HRM employee directory' },
    badgeOne: '1,642 employees',
    badgeTwo: '11 departments',
    challenge: {
      title: 'The challenge',
      items: [
        'Employee data lived in <strong>several registers per office</strong>, so the authoritative record was never obvious.',
        '<strong>Leave balances were tracked manually</strong> and recalculated from scratch at year end.',
        'A national organisation needed <strong>consistent policy enforcement</strong> across departments with very different rhythms.',
        'Field and programme staff needed a way to <strong>apply for leave from anywhere</strong>, not just from an office desk.'
      ]
    },
    solution: {
      title: 'The solution',
      items: [
        'A <strong>single employee master record</strong> with a documented, non-duplicated data model and an effective-dated history.',
        'A <strong>leave engine</strong> that accrues entitlement monthly, tracks category balances and routes approvals by hierarchy.',
        'Role- and department-scoped <strong>self-service access</strong>, so staff see only their own record and their team’s relevant data.',
        'An <strong>immutable history of every change</strong> to a master record — essential for an organisation of this nature.'
      ]
    },
    gallery: [
      {
        src: 'assets/img/mock/hrm-directory.svg',
        alt: 'Employee directory with department filters',
        cap: 'Employee directory',
        text: 'The authoritative master record, filterable by department, with employment status at a glance.',
        span: 'wide'
      },
      {
        src: 'assets/img/mock/hrm-leave.svg',
        alt: 'Leave management with balances and pending approvals',
        cap: 'Leave management',
        text: 'Category balances, monthly accrual and the approval queue, all computed automatically.'
      },
      {
        src: 'assets/img/mock/school-payroll.svg',
        alt: 'Monthly payroll run with deductions',
        cap: 'Monthly payroll',
        text: 'The same payroll engine pattern later applied to staff salary runs with absence-linked deductions.'
      }
    ],
    modules: [
      ['i-server', 'Employee Masters', 'Effective-dated records, department and designation hierarchy, transfer and promotion history.'],
      ['i-cap', 'Recruitment', 'Requisition approvals, job posting, applicant tracking, interview scheduling and offer letters.'],
      ['i-calendar', 'Attendance', 'Office and field attendance, shift rosters, overtime requests and monthly summaries.'],
      ['i-quote', 'Leave Management', 'Category-based accrual, balance ledger, application, multi-level approval and encashment.'],
      ['i-briefcase', 'Payroll', 'Salary structures, deductions, allowances, payslips and bank disbursement files.'],
      ['i-tools', 'Performance', 'Appraisal cycles, goals, reviewer feedback and calibration reports by department.'],
      ['i-tools', 'Employee Self-Service', 'Personal profile, payslips, leave balance and application status — scoped per user.'],
      ['i-db', 'Audit & Compliance', 'Append-only change log, document vault and confidential field-level access control.']
    ],
    tech: {
      colA: ['i-code', 'Application', [
        ['Backend', 'ASP.NET Core Web API + MVC'], ['Language', 'C#'], ['Front end', 'JavaScript · jQuery'],
        ['Auth', 'Windows / Forms authentication'], ['Authorisation', 'Role + department scoping'],
        ['Documents', 'Server-side vault']
      ]],
      colB: ['i-db', 'Data & Infrastructure', [
        ['Database', 'SQL Server'], ['Leave accrual', 'Scheduled job engine'],
        ['Reporting', 'SSRS + Excel export'], ['Hosting', 'On-premise, multi-office'],
        ['Version control', 'Git'], ['Method', 'Agile / SCRUM']
      ]]
    },
    role: [
      'Designed the <strong>employee data model</strong> with effective dating so history survives every change.',
      'Built the <strong>leave accrual and approval engine</strong>, including encashment and carry-forward rules.',
      'Implemented <strong>department-scoped authorisation</strong> so sensitive data stayed correctly restricted.',
      'Drove data cleanup and migration of legacy registers into a single validated master.'
    ],
    stack: [
      ['Architecture', 'Service-oriented HR core'],
      ['Access model', 'Role + department scoping'],
      ['Privacy', 'Field-level confidentiality'],
      ['Duration', '≈ 10 months, deployed office by office']
    ],
    results: [
      ['1,642', 'Employees on one authoritative record'],
      ['11', 'Departments unified'],
      ['~90%', 'Reduction in manual leave recalculation'],
      ['100%', 'Change history retained on master records']
    ],
    quote: {
      text: 'We finally trust the HR data — every record has a history, and leave balances calculate themselves.',
      who: 'HR Director',
      where: 'Red Cross Bangladesh'
    }
  }
];

/* ══════════════════════ TEMPLATE ══════════════════════ */
/* accept ids with or without the leading '#' */
const id = s => String(s).replace(/^#/, '');
const ic = i => `<svg class="ico-sm"><use href="#${id(i)}"/></svg>`;
const ico = i => `<svg class="ico"><use href="#${id(i)}"/></svg>`;
const arrow = i => `<svg class="ico"><use href="#${id(i)}"/></svg>`;
/* project pages live one folder deep, so local assets need ../ */
const up = src => src.replace(/^(?!\.\.\/|https?:)/, '../');

function galleryItem(g, i) {
  const span = g.span === 'wide' ? ' wide' : '';
  return `<figure class="gal-item${span}" data-reveal="fade-up" data-delay="${i * 90}" data-tilt>
  <img src="${up(g.src)}" alt="${g.alt}" loading="lazy" width="1280" height="800">
  <figcaption class="gal-cap">
    <div><h4>${g.cap}</h4><p>${g.text}</p></div>
    <span class="gal-num">0${i + 1}</span>
  </figcaption>
</figure>`;
}

function page(p, idx) {
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const modules = p.modules.map(([i, h, t], k) => `<article class="mod glass" data-reveal="fade-up" data-delay="${(k % 3) * 80}" data-tilt>
  <div class="mod-ico">${ico(i)}</div><h4>${h}</h4><p>${t}</p></article>`).join('');

  const techCol = ([i, h, rows]) => `<div class="tech-col glass" data-reveal="fade-up">
  <h3>${ic(i)}${h}</h3>
  <div class="stack-lines">
    ${rows.map(([k, v]) => `<div class="stack-line"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}
  </div></div>`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark" class="no-js">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title} — Md. Mahamudul Hasan Tonoy</title>
<meta name="description" content="${p.lede.replace(/<[^>]+>/g, '').slice(0, 155)}">
<meta name="author" content="Md. Mahamudul Hasan Tonoy">
<meta name="theme-color" content="#070a18">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-family='Segoe UI'>⚡</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="../assets/css/project.css">
<noscript>
  <style>
    .scroll-progress,.to-top{display:none!important}
    .p-hero{padding-top:40px}
  </style>
</noscript>
</head>
<body>
${sprite}

<div class="bg-orbs" aria-hidden="true">
  <span class="orb orb-1"></span><span class="orb orb-2"></span><span class="orb orb-3"></span><span class="grid-lines"></span>
</div>
<div class="noise" aria-hidden="true"></div>

<div class="scroll-progress" id="scrollProgress" aria-hidden="true"><i></i></div>

<!-- PAGE BAR -->
<div class="page-bar">
  <div class="container page-bar-inner">
    <a class="back-link" href="../index.html#projects" data-cursor="hover">${arrow('#i-arrow')}<span>All Projects</span></a>
    <span class="page-bar-crumb">/</span>
    <span class="page-bar-title">${p.title}</span>
    <div class="page-bar-actions">
      <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle colour theme" data-cursor="hover">
        <svg class="ico"><use href="#i-sun"/></svg><svg class="ico ico-alt"><use href="#i-moon"/></svg>
      </button>
      <a class="icon-btn" href="../index.html#contact" aria-label="Contact" data-cursor="hover">${ico('#i-mail')}</a>
    </div>
  </div>
</div>

<main>

<!-- HERO -->
<section class="p-hero">
  <div class="container p-hero-grid">
    <div>
      <span class="p-kicker" data-reveal="fade-up"><i style="width:6px;height:6px;border-radius:50%;background:${p.accent};box-shadow:0 0 12px ${p.accent}"></i>${p.kicker}</span>
      <h1 data-reveal="fade-up" data-delay="60">${p.title}</h1>
      <p class="p-lede" data-reveal="fade-up" data-delay="120">${p.lede}</p>

      <div class="p-facts">
        ${p.facts.map(([k, v], i) => `<div class="p-fact" data-reveal="fade-up" data-delay="${160 + i * 70}">
          <label>${k}</label><span>${v}</span></div>`).join('')}
      </div>

      <div class="p-hero-cta" data-reveal="fade-up" data-delay="440">
        <a class="btn btn-primary" href="../index.html#contact" data-magnetic data-cursor="hover"><span>Discuss a similar build</span>${arrow('#i-arrow')}</a>
        <a class="btn btn-ghost" href="../index.html#projects" data-magnetic data-cursor="hover"><span>More projects</span></a>
      </div>
    </div>

    <div class="p-preview reveal" data-reveal="zoom-in" data-delay="200" data-tilt>
      <div class="p-glow"></div>
      <div class="p-preview-frame">
        <img src="${up(p.preview.src)}" alt="${p.preview.alt}" width="1280" height="800">
      </div>
      <span class="p-badge-float one">${ic('#i-rocket')}${p.badgeOne}</span>
      <span class="p-badge-float two">${ic('#i-server')}${p.badgeTwo}</span>
    </div>
  </div>
</section>

<!-- PROBLEM / SOLUTION -->
<section class="p-section">
  <div class="container">
    <div class="p-section-head" data-reveal="fade-up">
      <span class="p-sec-label"><i></i>Background</span>
      <h2>Why it existed, and how it was solved</h2>
      <p>Every engagement in this portfolio started the same way — a business process that had outgrown the tools it ran on.</p>
    </div>
    <div class="ps-grid">
      <article class="ps-card problem glass" data-reveal="fade-right">
        <h3><span class="ps-dot">!</span>${p.challenge.title}</h3>
        <ul>${p.challenge.items.map(t => `<li>${t}</li>`).join('')}</ul>
      </article>
      <article class="ps-card solution glass" data-reveal="fade-left">
        <h3><span class="ps-dot">✓</span>${p.solution.title}</h3>
        <ul>${p.solution.items.map(t => `<li>${t}</li>`).join('')}</ul>
      </article>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="p-section">
  <div class="container">
    <div class="p-section-head center" data-reveal="fade-up">
      <span class="p-sec-label"><i></i>Sample screens</span>
      <h2>Inside the interface</h2>
      <p>Representative screens, drawn from the modules I designed and built. Layouts and labels are illustrative.</p>
    </div>
    <div class="gal">${p.gallery.map(galleryItem).join('')}</div>
  </div>
</section>

<!-- MODULES -->
<section class="p-section">
  <div class="container">
    <div class="p-section-head" data-reveal="fade-up">
      <span class="p-sec-label"><i></i>Scope</span>
      <h2>Modules delivered</h2>
      <p>What the system actually did for the people using it every day.</p>
    </div>
    <div class="mod-grid">${modules}</div>
  </div>
</section>

<!-- TECHNOLOGY -->
<section class="p-section">
  <div class="container">
    <div class="p-section-head" data-reveal="fade-up">
      <span class="p-sec-label"><i></i>Under the hood</span>
      <h2>Technology</h2>
    </div>
    <div class="tech-grid">${techCol(p.tech.colA)}${techCol(p.tech.colB)}</div>
  </div>
</section>

<!-- ROLE -->
<section class="p-section">
  <div class="container">
    <div class="p-section-head" data-reveal="fade-up">
      <span class="p-sec-label"><i></i>My contribution</span>
      <h2>What I owned</h2>
    </div>
    <div class="role-grid">
      <article class="role-card glass" data-reveal="fade-right">
        <div class="who">
          <span class="role-avatar"><img src="../assets/img/avatar.jpg" alt="Md. Mahamudul Hasan Tonoy" loading="lazy"></span>
          <div><h4>Md. Mahamudul Hasan Tonoy</h4><span>${p.facts.find(f => f[0] === 'My role')[1]}</span></div>
        </div>
        <ul class="role-list">${p.role.map(r => `<li>${r}</li>`).join('')}</ul>
      </article>
      <div class="tech-col glass" data-reveal="fade-left">
        <h3>${ic('#i-briefcase')}Engagement detail</h3>
        <div class="stack-lines">
          ${p.stack.map(([k, v]) => `<div class="stack-line"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RESULTS -->
<section class="p-section">
  <div class="container">
    <div class="p-section-head center" data-reveal="fade-up">
      <span class="p-sec-label"><i></i>Outcome</span>
      <h2>What changed</h2>
    </div>
    <div class="res-grid">
      ${p.results.map(([v, l], i) => `<article class="res glass" data-reveal="zoom-in" data-delay="${i * 80}">
        <b>${v}</b><span>${l}</span></article>`).join('')}
    </div>
  </div>
</section>

<!-- QUOTE -->
<section class="p-section">
  <div class="container">
    <blockquote class="quote-card glass" data-reveal="fade-up">
      ${ico('#i-quote')}
      <p>${p.quote.text}</p>
      <footer><span class="role-avatar"><img src="../assets/img/avatar.jpg" alt="" loading="lazy"></span>
      <div><strong>${p.quote.who}</strong><br><span>${p.quote.where}</span></div></footer>
    </blockquote>
  </div>
</section>

<!-- CTA -->
<section class="p-section">
  <div class="container">
    <div class="p-cta" data-reveal="zoom-in">
      <h2>Need something like this?</h2>
      <p>I design and build enterprise web applications, ERPs and internal platforms — from schema to screen. Tell me what your process looks like today and I will map the system it needs.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="../index.html#contact" data-magnetic data-cursor="hover"><span>Start a conversation</span>${arrow('#i-arrow')}</a>
        <a class="btn btn-ghost" href="../index.html" data-magnetic data-cursor="hover"><span>Back to home</span></a>
      </div>
    </div>
  </div>
</section>

<!-- NEXT -->
<section class="p-section">
  <div class="container">
    <div class="next-nav">
      <a class="next-card prev glass" href="${prev.slug}.html" data-reveal="fade-right" data-cursor="hover">
        ${arrow('#i-arrow')}<span class="dir">← Previous project</span>
        <h3>${prev.title}</h3><p>${prev.kicker}</p>
      </a>
      <a class="next-card glass" href="${next.slug}.html" data-reveal="fade-left" data-cursor="hover">
        ${arrow('#i-arrow')}<span class="dir">Next project →</span>
        <h3>${next.title}</h3><p>${next.kicker}</p>
      </a>
    </div>
  </div>
</section>

</main>

<footer class="site-footer">
  <div class="container footer-bottom" style="border-top:0">
    <p>© <span id="year">2026</span> Md. Mahamudul Hasan Tonoy. All rights reserved.</p>
    <p class="footer-made">Designed &amp; built with <span class="heart">♥</span> using HTML, CSS &amp; JavaScript</p>
  </div>
</footer>

<button class="to-top" id="toTop" aria-label="Back to top" data-cursor="hover">${arrow('#i-arrow')}</button>
<script src="../assets/js/main.js"></script>
</body>
</html>`;
}

/* ══════════════════════ WRITE ══════════════════════ */
projects.forEach((p, i) => {
  const file = path.join(OUT, p.slug + '.html');
  fs.writeFileSync(file, page(p, i), 'utf8');
  console.log('  ✓ projects/' + p.slug + '.html');
});

/* slugs used by index.html to link each enterprise card */
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(projects.map(p => p.slug), null, 2));
console.log('\n' + projects.length + ' project pages written to projects/');