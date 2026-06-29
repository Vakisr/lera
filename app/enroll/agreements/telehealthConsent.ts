import type { Agreement } from "./types";

export const telehealthConsent: Agreement = {
  slug: "telehealth-consent",
  title: "Telehealth Consent",
  effectiveDate: "April 6, 2026",
  consentLabel:
    "I have read and agree to the Telehealth Informed Consent, including the use of telehealth services (video, messaging, and asynchronous communication), and understand its risks and limitations.",
  blocks: [
    {
      kind: "para",
      text: "LERA operates an organized healthcare arrangement designed to deliver whole-body care through a coordinated structure.",
    },
    {
      kind: "para",
      text: 'Clinical services are provided exclusively by LERA Medical Informatics LLC ("LMI"), a healthcare services entity. Your clinical relationship as a member is with LMI.',
    },
    {
      kind: "para",
      text: "LMI delivers health and wellness services through a team of licensed medical practitioners, whole-body health coaches, and mindful resilience coaches, all of whom are independent contractors of LMI.",
    },
    {
      kind: "para",
      text: 'LERA Health LLC ("LERA Health") provides the technology platform, administrative services, and operational support that enable care delivery.',
    },
    {
      kind: "para",
      text: 'LERA Nutraceuticals LLC ("LN") provides LERA\'s proprietary professional-grade supplements.',
    },
    {
      kind: "para",
      text: 'LMI, LERA Health and LN may be referred to collectively as "LERA" where appropriate; however, clinical services and medical decision-making are provided solely by LMI.',
    },
    {
      kind: "para",
      text: 'This Telehealth Informed Consent ("Consent") explains how telehealth services are delivered through LERA Medical Informatics LLC ("LMI") and your rights when receiving care remotely.',
    },
    {
      kind: "para",
      text: "By signing electronically, you acknowledge that you understand and agree to receive services through telehealth.",
    },

    { kind: "section", n: 1, title: "What Telehealth Means" },
    {
      kind: "para",
      text: "Telehealth involves the delivery of healthcare services using electronic communications and information technologies. This may include:",
    },
    {
      kind: "list",
      items: [
        "Secure messaging",
        "Asynchronous clinical review",
        "Video consultations using secure telehealth tools",
        "Review of laboratory results and health data",
      ],
    },
    {
      kind: "para",
      text: "Telehealth allows you to receive care without being physically present in the same location as your clinician.",
    },

    { kind: "section", n: 2, title: "Nature of Services" },
    { kind: "para", text: "Telehealth services through LMI may include:" },
    {
      kind: "list",
      items: [
        "Review of health assessments and biomarker results",
        "Development and adjustment of personalized care plans",
        "Hormone replacement therapy consultations",
        "Follow-up monitoring and support",
        "Optional live video consultations",
      ],
    },
    {
      kind: "para",
      text: "If your clinician determines that your needs fall outside the scope of telehealth care, you will be advised to seek appropriate in-person or specialty evaluation.",
    },
    {
      kind: "para",
      text: "LERA does not replace your primary care provider. Members are encouraged to maintain a relationship with a local primary care physician for routine screenings, urgent issues, and in-person examination when needed.",
    },
    {
      kind: "callout",
      text: "If you are experiencing a medical emergency, call 911 or go to the nearest emergency room.",
    },
    {
      kind: "para",
      text: "The identity, credentials, and licensure of your clinician will be disclosed to you prior to or at the time services are provided.",
    },
    {
      kind: "para",
      text: "Services delivered via telehealth are provided in accordance with the same professional standard of care that would apply to in-person services.",
    },
    {
      kind: "para",
      text: "Not all services may be available in all states. Services are provided only where LERA practitioners are appropriately licensed.",
    },

    { kind: "section", n: 3, title: "Potential Benefits of Telehealth" },
    {
      kind: "list",
      items: [
        "Increased access to care",
        "Greater convenience",
        "Continuity of care",
        "Reduced travel burden",
      ],
    },

    { kind: "section", n: 4, title: "Potential Risks & Limitations" },
    { kind: "para", text: "Telehealth has limitations, including:" },
    {
      kind: "list",
      items: [
        "The inability to perform a physical examination in person",
        "Possible technical interruptions or delays",
        "Potential, though unlikely, risks to privacy despite reasonable safeguards",
        "Situations where telehealth may not be clinically appropriate",
      ],
    },
    {
      kind: "para",
      text: "If your clinician determines that telehealth is not appropriate, you may be advised to seek in-person care.",
    },

    { kind: "section", n: 5, title: "Privacy & Security" },
    {
      kind: "para",
      text: "LERA uses reasonable administrative, technical, and physical safeguards to protect your health information.",
    },
    {
      kind: "para",
      text: "Telehealth communications may involve the use of secure third-party platforms (such as Zoom). While these platforms use encryption and security measures, no electronic system is completely risk-free.",
    },
    {
      kind: "para",
      text: "Your health information is protected in accordance with HIPAA and LERA's Notice of Privacy Practices.",
    },

    { kind: "section", n: 6, title: "Emergencies" },
    { kind: "para", text: "Telehealth is not appropriate for emergencies." },
    {
      kind: "callout",
      text: "If you are experiencing a medical emergency, call 911 or go to the nearest emergency room immediately.",
    },
    {
      kind: "para",
      text: "LERA does not monitor communications in real time and cannot guarantee immediate response.",
    },

    { kind: "section", n: 7, title: "Your Responsibilities" },
    { kind: "para", text: "By consenting to telehealth, you agree to:" },
    {
      kind: "list",
      items: [
        "Provide accurate and complete information",
        "Inform your clinician of your physical location at the time of each telehealth interaction so that appropriate licensure and emergency protocols can be followed",
        "Participate in a private setting when possible",
        "Seek in-person care when advised",
      ],
    },

    { kind: "section", n: 8, title: "Voluntary Participation" },
    { kind: "para", text: "Telehealth services are voluntary." },
    {
      kind: "para",
      text: "You may withdraw your consent to receive telehealth services at any time by notifying LERA in writing. Withdrawal will not affect your access to other services where available but may limit LERA's ability to continue providing care.",
    },

    { kind: "section", n: 9, title: "Consent to Treatment via Telehealth" },
    { kind: "para", text: "By signing electronically, you acknowledge that:" },
    {
      kind: "list",
      items: [
        "You have read and understand this Telehealth Informed Consent",
        "You have had the opportunity to ask questions",
        "You consent to receive healthcare services through telehealth technologies",
        "A provider-patient relationship may be established through telehealth where permitted by law",
        "Telehealth services are subject to state licensure requirements",
      ],
    },
  ],
};
