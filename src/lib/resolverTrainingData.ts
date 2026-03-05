export interface ResolverFAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  isNew?: boolean;
  isUpdated?: boolean;
}

export interface ResolverVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail?: string;
  description: string;
}

export interface ResolverDownload {
  id: string;
  name: string;
  description: string;
  type: string;
  size: string;
  url: string;
}

export const RESOLVER_FAQ_CATEGORIES = [
  'Issue Classification',
  'Ticket Management',
  'Escalation Rules',
  'Citizen Feedback',
  'SLA & Timelines',
  'Field Actions',
  'Citizen Interaction',
];

export const RESOLVER_FAQS: ResolverFAQ[] = [
  // Issue Classification
  {
    id: 'faq_class_1',
    category: 'Issue Classification',
    question: 'How do I classify an incoming issue correctly?',
    answer: `When a new issue arrives, follow these steps to classify it properly:

1. **Read the Description Carefully**: Understand what the citizen is reporting. Look for keywords like "pothole", "garbage", "water leak", "broken light", etc.

2. **Check the Location**: The ward and sub-county help determine which department should handle it.

3. **Select Primary Category**: Choose from: Environment (garbage, pollution), Water & Sewerage (leaks, blockages), Works (roads, drainage), Health (inspections, pests), or Mobility & ICT (traffic systems, digital services).

4. **Assign Priority**:
   - **Critical**: Public safety risk, major infrastructure failure
   - **High**: Service disruption affecting many people
   - **Medium**: Standard service request
   - **Low**: Minor cosmetic or informational issues

5. **Add Tags**: Use relevant tags for easier filtering (e.g., "recurring", "commercial-area", "school-zone").

Accurate classification ensures faster routing and resolution.`,
    isNew: true,
  },
  {
    id: 'faq_class_2',
    category: 'Issue Classification',
    question: 'What if an issue spans multiple departments?',
    answer: `Multi-department issues require coordination:

1. **Identify Primary Owner**: Determine which department has the main responsibility based on the core issue.

2. **Create Linked Tickets**: If necessary, create related tickets for other departments and link them to the primary ticket.

3. **Use "Multi-Department" Tag**: This flags the ticket for supervisory review and coordination meetings.

4. **Document Dependencies**: In the remarks, note which department actions depend on others completing first.

5. **Communicate Proactively**: Reach out to counterparts in other departments to align on timelines.

Example: A flooded road might need Works (drainage), Water (pipe check), and Environment (debris cleanup). Works would typically be the primary owner.`,
  },
  // Ticket Management
  {
    id: 'faq_ticket_1',
    category: 'Ticket Management',
    question: 'How do I update or close a ticket?',
    answer: `**Updating a Ticket:**

1. Open the ticket from your Tasks queue
2. Click "Update Status" button
3. Select the new status: Open → Assigned → In Progress → Closed
4. Add a detailed remark explaining the update
5. Attach any photos of progress (especially for field work)
6. Save changes

**Closing a Ticket:**

1. Ensure all required actions are completed
2. Document the resolution in the remarks
3. Attach "after" photos showing resolved issue
4. Change status to "Closed"
5. Select the resolution type (Resolved, Cannot Resolve, Duplicate, Invalid)
6. The citizen will be notified and asked to rate the service

**Important**: Never close a ticket without adding resolution remarks. This helps with quality assurance and citizen communication.`,
    isUpdated: true,
  },
  {
    id: 'faq_ticket_2',
    category: 'Ticket Management',
    question: 'What do I do when a citizen reopens a closed ticket?',
    answer: `When a ticket is reopened:

1. **Review the Reopen Reason**: Check what the citizen wrote about why they're unsatisfied.

2. **Assess Validity**: Determine if the original issue wasn't fully resolved or if this is a new occurrence.

3. **If Original Issue Persists**:
   - Acknowledge the oversight in remarks
   - Plan corrective action
   - Update expected resolution time
   - Consider escalating if it's been reopened multiple times

4. **If New Issue**:
   - Explain to citizen (via remarks) that this appears to be a new occurrence
   - Create a new linked ticket if appropriate
   - Close the reopened ticket with explanation

5. **Update Your Supervisor**: Reopened tickets affect KPIs and may indicate systemic issues.`,
  },
  // Escalation Rules
  {
    id: 'faq_esc_1',
    category: 'Escalation Rules',
    question: 'When should I escalate an issue?',
    answer: `Escalate when:

**Auto-Escalation Triggers:**
- SLA deadline exceeded by more than 24 hours
- Citizen has reopened the same ticket 3+ times
- Issue marked as "Critical" priority

**Manual Escalation Criteria:**
- Issue requires resources beyond your authority (budget, equipment, personnel)
- Cross-departmental coordination is failing
- Political sensitivity or media attention
- Public safety risk that can't be immediately addressed
- You need supervisor approval for a proposed solution

**How to Escalate:**
1. Click "Escalate" button on the ticket
2. Select escalation type (Resource, Authority, Coordination, Safety)
3. Write a clear escalation note explaining the situation
4. Tag the appropriate supervisor or department head
5. Set the escalation urgency level

**Do NOT escalate** simply because an issue is difficult. Attempt resolution first and document your efforts.`,
    isNew: true,
  },
  {
    id: 'faq_esc_2',
    category: 'Escalation Rules',
    question: 'What is the escalation matrix?',
    answer: `**Escalation Matrix by Time Overdue:**

| Overdue Duration | Escalation Level | Who Gets Notified |
|------------------|------------------|-------------------|
| 0-24 hours | Level 0 | Auto-reminder to resolver |
| 24-48 hours | Level 1 | Team Lead notified |
| 48-72 hours | Level 2 | Department Head notified |
| 72+ hours | Level 3 | Director + County Coordinator |

**Escalation Matrix by Priority:**

| Priority | Initial Handling Time | Escalation Point |
|----------|----------------------|------------------|
| Critical | 4 hours | Immediate to Department Head |
| High | 24 hours | To Team Lead |
| Medium | 72 hours | To Team Lead |
| Low | 5 days | Standard process |

**Special Escalation Paths:**
- VIP/Government complaints → Direct to Director
- Media mentions → Communications + Director
- Safety hazards → Emergency Response Team`,
  },
  // Citizen Feedback
  {
    id: 'faq_feedback_1',
    category: 'Citizen Feedback',
    question: 'How do I handle negative feedback from citizens?',
    answer: `**Receiving Negative Feedback:**

1. **Don't Take It Personally**: Citizens are frustrated with the situation, not with you personally.

2. **Acknowledge Their Feelings**: "I understand this has been frustrating for you."

3. **Review the Case History**: Understand what happened from start to finish.

4. **Identify Valid Concerns**: Separate emotional venting from actionable feedback.

5. **Respond Professionally**:
   - Apologize for any genuine service failures
   - Explain what happened (without making excuses)
   - Detail the steps being taken to resolve
   - Provide realistic timelines

6. **Document Everything**: Add all interactions to the ticket remarks.

7. **Follow Up**: After resolution, check if the citizen is now satisfied.

**Never Respond When Emotional**: If you feel defensive, wait before responding. Ask a colleague to review your response.`,
  },
  {
    id: 'faq_feedback_2',
    category: 'Citizen Feedback',
    question: 'What do I do with appreciation messages?',
    answer: `**When You Receive an Appreciation:**

1. **Acknowledge It**: Thank the citizen in your remarks.

2. **Share with Your Team**: Forward positive feedback to your supervisor and team. It boosts morale!

3. **Log It**: The system automatically tracks appreciations, but ensure it's properly attributed.

4. **Learn From It**: What made this resolution successful? Apply those learnings to other cases.

**Benefits of Appreciations:**
- Counted in your performance metrics
- Used in recognition programs
- Help identify best practices
- Improve department ratings visible to citizens

**Encouraging Appreciations:**
- Always be courteous and professional
- Keep citizens informed of progress
- Go the extra mile when possible
- Follow up after resolution`,
  },
  // SLA & Timelines
  {
    id: 'faq_sla_1',
    category: 'SLA & Timelines',
    question: 'What are the expected resolution times for different issue types?',
    answer: `**Standard Expected Resolution Times:**

| Category | Issue Type | Expected Time |
|----------|-----------|---------------|
| Environment | Garbage collection | 24 hours |
| Environment | Illegal dumping | 48 hours |
| Environment | Noise complaint | 72 hours |
| Water | Burst pipe | 4 hours |
| Water | Sewer blockage | 12 hours |
| Water | Low pressure | 5 days |
| Works | Pothole (main road) | 72 hours |
| Works | Pothole (side road) | 7 days |
| Works | Blocked drain | 48 hours |
| Health | Vector control | 72 hours |
| Health | Food safety complaint | 24 hours |
| ICT | Traffic light fault | 4 hours |
| ICT | System outage | 2 hours |

**Notes:**
- Times are from assignment, not submission
- Critical priority issues have 50% shorter expected times
- Weather/emergency events may extend timelines (must be documented)`,
    isUpdated: true,
  },
  {
    id: 'faq_sla_2',
    category: 'SLA & Timelines',
    question: 'How is SLA achievement calculated?',
    answer: `**SLA Achievement Formula:**

SLA % = (Tickets Closed On Time / Total Tickets Closed) × 100

**What Counts as "On Time":**
- Ticket closed before expected resolution deadline
- Clock starts when ticket is assigned to you
- Clock pauses when "Awaiting Citizen Response"
- Clock stops when status changed to "Closed"

**Factors That Affect Your SLA:**
- Response time to new assignments
- Accuracy of status updates
- Time spent in "In Progress" state
- Reopened tickets (count as new against SLA)

**Monthly Targets:**
- Individual: 85% minimum
- Team: 90% minimum
- Department: 92% minimum

**Improving Your SLA:**
- Prioritize oldest tickets first
- Update status regularly (shows activity)
- Request deadline extensions BEFORE expiry
- Use the "Blocked" status when genuinely blocked`,
  },
  // Field Actions
  {
    id: 'faq_field_1',
    category: 'Field Actions',
    question: 'How do I record field actions and visits?',
    answer: `**Recording Field Visits:**

1. **Before Leaving Office:**
   - Update ticket status to "In Progress"
   - Add remark: "Departing for field visit"
   - Note your expected arrival time

2. **At the Location:**
   - Take "before" photos if issue is visible
   - Use the mobile app to check in (GPS logged)
   - Document what you observe
   - Interview any witnesses or affected parties
   - Take measurements if relevant

3. **During Resolution:**
   - Take photos of work in progress
   - Log resources used (materials, equipment, personnel)
   - Note any obstacles encountered
   - Document coordination with other teams

4. **After Completion:**
   - Take "after" photos showing resolution
   - Update ticket with full field report
   - Log actual time spent
   - Request citizen sign-off if available
   - Update status appropriately

**Important**: Field logs are auditable. Be accurate and honest in all recordings.`,
    isNew: true,
  },
  {
    id: 'faq_field_2',
    category: 'Field Actions',
    question: 'What equipment should I have for field visits?',
    answer: `**Standard Field Kit:**

**Documentation:**
- Mobile phone with resolver app installed
- Backup battery/power bank
- Notepad and pen (for no-signal areas)
- Printed ticket details

**Safety:**
- ID badge (always visible)
- Reflective vest (for road work areas)
- First aid kit
- Emergency contact list

**Measurement & Assessment:**
- Measuring tape
- Flashlight
- Camera (phone camera usually sufficient)
- PPE as required by issue type

**Communication:**
- Radio (for team coordination)
- Contact numbers for utilities (water, power)
- Supervisor's direct line

**Before Each Visit:**
- Charge your phone
- Check app is updated
- Review ticket details
- Plan your route
- Inform team of your schedule`,
  },
  // Citizen Interaction
  {
    id: 'faq_citizen_1',
    category: 'Citizen Interaction',
    question: 'What are the best approaches for interacting with citizens respectfully?',
    answer: `**Core Principles:**

1. **Treat Every Citizen with Dignity**
   - Use respectful titles (Sir, Madam, or their name if known)
   - Listen actively without interrupting
   - Acknowledge their concerns as valid

2. **Communicate Clearly**
   - Use simple, non-technical language
   - Explain processes step by step
   - Confirm understanding: "Is that clear?" or "Any questions?"

3. **Be Honest and Transparent**
   - Don't make promises you can't keep
   - If you don't know something, say so and find out
   - Explain delays honestly

4. **Show Empathy**
   - "I understand this is frustrating"
   - "I would feel the same way"
   - "Let me see what I can do to help"

5. **Stay Professional Under Pressure**
   - Never argue or raise your voice
   - If a citizen is aggressive, stay calm
   - Request supervisor assistance if needed
   - Document all interactions

6. **Follow Up**
   - Do what you say you will do
   - Proactively update citizens on progress
   - Check if they're satisfied after resolution`,
  },
  {
    id: 'faq_citizen_2',
    category: 'Citizen Interaction',
    question: 'How do I handle angry or aggressive citizens?',
    answer: `**De-escalation Techniques:**

1. **Stay Calm**: Your calmness can help reduce their anger. Take slow breaths.

2. **Listen First**: Let them express their frustration completely before responding.

3. **Acknowledge Emotions**: "I can see this has really upset you" or "That sounds very frustrating."

4. **Don't Get Defensive**: Avoid "but", "however", or making excuses.

5. **Find Common Ground**: "We both want this resolved" or "I'm here to help."

6. **Offer Solutions**: Move from the problem to what can be done.

7. **Set Boundaries Politely**: "I want to help you, but I need you to speak to me respectfully."

**When to Escalate:**
- Threats of violence
- Abusive language that continues after warning
- Citizen refuses to engage constructively
- You feel unsafe

**After Difficult Interactions:**
- Document everything immediately
- Report to supervisor
- Take a short break if needed
- Don't dwell on it – it's not personal

**Remember**: Most angry citizens just want to be heard and have their problem solved.`,
  },
];

export const RESOLVER_VIDEOS: ResolverVideo[] = [
  {
    id: 'vid_triage',
    title: 'How to Triage a Complaint',
    duration: '3:15',
    description: 'Learn the step-by-step process for quickly assessing and prioritizing incoming complaints.',
  },
  {
    id: 'vid_dashboard',
    title: 'How to Use the Resolver Dashboard',
    duration: '4:45',
    description: 'Complete walkthrough of the resolver dashboard, including metrics, tasks, and quick actions.',
  },
  {
    id: 'vid_escalate',
    title: 'How to Escalate to Departments',
    duration: '2:30',
    description: 'When and how to escalate issues to other departments or supervisors.',
  },
  {
    id: 'vid_field_logs',
    title: 'Filling Field Logs on Mobile',
    duration: '3:00',
    description: 'Using the mobile app to document field visits, take photos, and update tickets.',
  },
  {
    id: 'vid_citizen_comm',
    title: 'Effective Citizen Communication',
    duration: '5:20',
    description: 'Best practices for communicating with citizens professionally and empathetically.',
  },
  {
    id: 'vid_sla_manage',
    title: 'Managing Your SLA Performance',
    duration: '4:10',
    description: 'Tips and techniques for meeting your SLA targets and improving resolution times.',
  },
];

export const RESOLVER_DOWNLOADS: ResolverDownload[] = [
  {
    id: 'dl_customer_sop',
    name: 'Customer Service SOP',
    description: 'Standard operating procedures for handling citizen inquiries and complaints.',
    type: 'PDF',
    size: '2.4 MB',
    url: '#',
  },
  {
    id: 'dl_escalation_matrix',
    name: 'Escalation Matrix (Department Roles)',
    description: 'Complete escalation paths and contact information for all departments.',
    type: 'PDF',
    size: '890 KB',
    url: '#',
  },
  {
    id: 'dl_field_checklist',
    name: 'Field Visit Checklist',
    description: 'Checklist for preparing and conducting field visits effectively.',
    type: 'PDF',
    size: '450 KB',
    url: '#',
  },
  {
    id: 'dl_ict_troubleshoot',
    name: 'ICT Troubleshooting Guide',
    description: 'Common system issues and how to resolve them quickly.',
    type: 'PDF',
    size: '1.2 MB',
    url: '#',
  },
  {
    id: 'dl_service_charter',
    name: 'Service Charter Summary',
    description: 'Key points from the Bengaluru Citizen Service Charter 2025.',
    type: 'PDF',
    size: '650 KB',
    url: '#',
  },
  {
    id: 'dl_behavior_guide',
    name: 'Professional Behavior Guidelines',
    description: 'Expected conduct and interaction standards for county staff.',
    type: 'PDF',
    size: '380 KB',
    url: '#',
  },
];
