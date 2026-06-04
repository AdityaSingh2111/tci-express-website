import { JobPosition } from '../types/data.types';

export const careersData = [
  {
    slug: 'branch-manager',
    title: 'Branch Manager',
    department: 'Operations',
    location: 'Multiple Locations',
    type: 'Full-Time',
    experience: '5-8 Years',
    responsibilities: [
      'Oversee day-to-day branch operations and ensure KPI targets are met.',
      'Manage local staff, driver scheduling, and ground operations.',
      'Ensure high customer satisfaction by resolving operational bottlenecks.',
      'Maintain compliance with company safety and procedural guidelines.'
    ],
    requirements: [
      'Bachelor’s degree in Business Administration, Logistics, or related field.',
      'Minimum 5 years of experience in logistics or supply chain operations.',
      'Strong leadership and team management skills.',
      'Excellent problem-solving and communication abilities.'
    ]
  },
  {
    slug: 'hub-supervisor',
    title: 'Hub Supervisor',
    department: 'Operations',
    location: 'Gurugram, Haryana',
    type: 'Full-Time',
    experience: '3-5 Years',
    responsibilities: [
      'Supervise daily loading and unloading activities at the regional hub.',
      'Maintain inventory records and shipment status logs.',
      'Coordinate with branch managers to ensure on-time dispatch.',
      'Monitor staff safety compliance and equipment maintenance.'
    ],
    requirements: [
      'Bachelor’s degree or diploma in a related field.',
      '3+ years experience in warehouse or hub supervision.',
      'Familiarity with modern warehouse management systems (WMS).',
      'Ability to work in shifts in a fast-paced environment.'
    ]
  },
  {
    slug: 'operations-executive',
    title: 'Operations Executive',
    department: 'Operations',
    location: 'Mumbai, Maharashtra',
    type: 'Full-Time',
    experience: '1-3 Years',
    responsibilities: [
      'Process daily dispatch logs and coordinate route planning.',
      'Communicate with drivers for real-time status updates.',
      'Assist in generating daily operational reports for management.',
      'Address any on-road contingencies or delays promptly.'
    ],
    requirements: [
      'Graduate in any discipline.',
      '1-3 years of experience in logistics coordination.',
      'Proficiency in MS Excel and logistics software.',
      'Detail-oriented with strong organizational skills.'
    ]
  },
  {
    slug: 'customer-support-executive',
    title: 'Customer Support Executive',
    department: 'Customer Support',
    location: 'Bengaluru, Karnataka',
    type: 'Full-Time',
    experience: '1-2 Years',
    responsibilities: [
      'Handle inbound customer inquiries via phone, email, and WhatsApp.',
      'Provide accurate shipment tracking and quotation information.',
      'Resolve customer complaints and coordinate with operations for solutions.',
      'Maintain detailed logs of customer interactions in the CRM.'
    ],
    requirements: [
      'Excellent verbal and written communication skills in English and Hindi.',
      '1+ years of experience in customer service, preferably in logistics.',
      'Empathy, patience, and a problem-solving mindset.',
      'Familiarity with CRM tools and ticketing systems.'
    ]
  },
  {
    slug: 'relationship-manager',
    title: 'Relationship Manager',
    department: 'Customer Support',
    location: 'New Delhi',
    type: 'Full-Time',
    experience: '4-6 Years',
    responsibilities: [
      'Manage key enterprise accounts and B2B corporate clients.',
      'Ensure SLAs are met and provide regular performance reviews to clients.',
      'Act as the primary point of contact for escalations and special requests.',
      'Identify cross-selling opportunities within existing accounts.'
    ],
    requirements: [
      'Bachelor’s degree in Business, Marketing, or similar field.',
      '4+ years in B2B account management or client relations.',
      'Strong negotiation and presentation skills.',
      'Ability to understand complex logistics requirements.'
    ]
  },
  {
    slug: 'packers-movers-staff',
    title: 'Packers & Movers Staff',
    department: 'Ground Operations',
    location: 'Pan India',
    type: 'Full-Time',
    experience: '0-2 Years',
    responsibilities: [
      'Safely pack household and commercial goods using premium materials.',
      'Load and unload goods with zero-damage handling techniques.',
      'Assist in the safe transportation of vehicles and delicate items.',
      'Follow instructions from the Loading Supervisor efficiently.'
    ],
    requirements: [
      'High school diploma or equivalent.',
      'Physical fitness and stamina to handle heavy lifting.',
      'Attention to detail and care for client property.',
      'Willingness to travel for interstate assignments.'
    ]
  },
  {
    slug: 'warehouse-associate',
    title: 'Warehouse Associate',
    department: 'Ground Operations',
    location: 'Pune, Maharashtra',
    type: 'Full-Time',
    experience: '1-2 Years',
    responsibilities: [
      'Receive, process, and store inbound shipments safely.',
      'Pick, pack, and prepare outward shipments for dispatch.',
      'Conduct regular stock checks and maintain warehouse cleanliness.',
      'Operate forklifts and pallet jacks (if certified).'
    ],
    requirements: [
      'Previous warehouse or store management experience.',
      'Familiarity with inventory scanning and tracking tools.',
      'Ability to stand and walk for extended periods.',
      'Safety-first approach to daily tasks.'
    ]
  },
  {
    slug: 'loading-supervisor',
    title: 'Loading Supervisor',
    department: 'Ground Operations',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-Time',
    experience: '3-5 Years',
    responsibilities: [
      'Supervise the loading and unloading crew to ensure safety standards.',
      'Optimize space utilization within transport vehicles.',
      'Verify quantities and documentation against shipment manifests.',
      'Train new staff on zero-damage handling protocols.'
    ],
    requirements: [
      '3+ years of experience in loading/unloading supervision.',
      'Strong understanding of vehicle load balancing and securing.',
      'Basic literacy to read manifests and documents.',
      'Leadership capability to manage ground crews.'
    ]
  },
  {
    slug: 'hr-executive',
    title: 'HR Executive',
    department: 'Corporate',
    location: 'Gurugram, Haryana (HQ)',
    type: 'Full-Time',
    experience: '2-4 Years',
    responsibilities: [
      'Manage end-to-end recruitment for operational and corporate roles.',
      'Handle employee onboarding, document verification, and induction.',
      'Process payroll inputs and manage leave and attendance records.',
      'Address employee grievances and foster a positive work culture.'
    ],
    requirements: [
      'MBA or Master’s in Human Resources.',
      '2+ years of HR generalist experience.',
      'Strong knowledge of Indian labor laws and compliance.',
      'Excellent interpersonal and communication skills.'
    ]
  },
  {
    slug: 'accounts-executive',
    title: 'Accounts Executive',
    department: 'Corporate',
    location: 'Gurugram, Haryana (HQ)',
    type: 'Full-Time',
    experience: '2-3 Years',
    responsibilities: [
      'Process daily accounting entries, invoices, and expense vouchers.',
      'Reconcile bank statements and vendor ledger accounts.',
      'Assist in GST calculation, TDS deductions, and return filings.',
      'Generate monthly financial reports for the management team.'
    ],
    requirements: [
      'B.Com or M.Com degree.',
      'Proficiency in Tally Prime and MS Excel.',
      'Familiarity with Indian taxation (GST, TDS).',
      'High accuracy and attention to detail.'
    ]
  },
  {
    slug: 'sales-executive',
    title: 'Sales Executive',
    department: 'Corporate',
    location: 'Ahmedabad, Gujarat',
    type: 'Full-Time',
    experience: '2-4 Years',
    responsibilities: [
      'Generate leads for B2B logistics and corporate relocation services.',
      'Conduct client meetings, present proposals, and negotiate contracts.',
      'Meet and exceed monthly and quarterly sales revenue targets.',
      'Maintain up-to-date sales pipelines and activity logs in the CRM.'
    ],
    requirements: [
      'Bachelor’s degree in any discipline.',
      'Proven track record in B2B field sales, preferably logistics.',
      'Strong presentation, negotiation, and closing skills.',
      'Self-motivated with a results-driven approach.'
    ]
  }
];
