import type { Agreement } from "./types";

export const memberAgreement: Agreement = {
  slug: "member-agreement",
  title: "Member Agreement",
  effectiveDate: "April 6, 2026",
  consentLabel: "I have read and agree to the Member Agreement.",
  blocks: [
    {
      kind: "para",
      text: 'This Member Agreement ("Agreement") explains what it means to be a member of the LERA program described below.',
    },
    {
      kind: "para",
      text: "Please read it carefully. By enrolling, you are agreeing to the terms below.",
    },

    { kind: "section", n: 1, title: "Who Provides Your Care" },
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

    { kind: "section", n: 2, title: "What LMI Is and Is Not" },
    {
      kind: "para",
      text: "LMI provides whole-body functional medicine-informed care designed to help you understand your health and support progress over time.",
    },
    { kind: "subheading", text: "LMI does:" },
    {
      kind: "list",
      items: [
        "provides clinician-ordered diagnostic testing",
        "offers personalized care plans informed by biomarkers and health data",
        "supports longitudinal monitoring, education, and coaching",
      ],
    },
    { kind: "subheading", text: "LMI does not:" },
    {
      kind: "list",
      items: [
        "provide emergency medical services",
        "replace your primary care provider",
        "offer in-person visits",
        "provide unlimited or on-demand clinician visits",
        "treat all conditions or populations",
      ],
    },
    {
      kind: "callout",
      text: "If you believe you are experiencing a medical emergency, call 911 immediately or go to the nearest emergency room.",
    },

    { kind: "section", n: 3, title: "Telehealth & How Care Is Delivered" },
    {
      kind: "para",
      text: "Care through LMI is delivered via telehealth and may include:",
    },
    {
      kind: "list",
      items: [
        "asynchronous clinical review and follow-up",
        "secure messaging",
        "secure synchronous video consultations",
      ],
    },
    {
      kind: "para",
      text: "Video visits, when offered, are conducted using third-party telehealth tools (such as Zoom) and are available as add-on services, not included in the base membership.",
    },
    {
      kind: "para",
      text: "Telehealth availability depends on clinician licensure and may vary by state.",
    },

    { kind: "section", n: 4, title: "Membership Structure & Term" },
    { kind: "subheading", text: "Your Membership" },
    { kind: "para", text: "Your membership includes:" },
    {
      kind: "list",
      items: ["an upfront fee of $549", "a monthly subscription fee of $29"],
    },
    {
      kind: "para",
      text: "The upfront fee covers LMI's diagnostic testing, assessments, and personalized care plan.",
    },
    { kind: "para", text: "The monthly subscription covers:" },
    {
      kind: "list",
      items: [
        "ongoing biomarker tracking and plan support",
        "secure messaging access",
        "education and content",
        "coaching and community resources",
      ],
    },
    {
      kind: "note",
      label: "NOTE FOR FOUNDING MEMBERS",
      text: "Your monthly subscription is waived for the initial 12-month subscription period.",
    },
    { kind: "subheading", text: "Renewal" },
    {
      kind: "para",
      text: "Your membership will automatically renew on an annual basis at the then-current rate.",
    },
    {
      kind: "para",
      text: "You will receive advance notice prior to any annual renewal. You may choose to:",
    },
    {
      kind: "list",
      items: ["proceed with renewal", "defer your testing", "or cancel renewal"],
    },
    { kind: "para", text: "by providing notice prior to the renewal date." },
    {
      kind: "para",
      text: "If you do not cancel or defer prior to the renewal date, the annual testing fee and monthly membership will be charged to your payment method on file.",
    },

    { kind: "section", n: 5, title: "Cancellation" },
    { kind: "para", text: "If you choose to cancel during your annual commitment:" },
    {
      kind: "list",
      items: [
        "your contractual obligation continues through term of your annual contract",
        "you will continue to be charged $29/month for the remainder of the term",
        "you will retain app access during this period",
      ],
    },

    { kind: "section", n: 6, title: "Diagnostic Testing (Required)" },
    {
      kind: "para",
      text: "Participation in LMI requires completion of clinician-ordered diagnostic testing.",
    },
    { kind: "para", text: "Testing includes:" },
    {
      kind: "list",
      items: [
        "blood testing through national laboratory providers",
        "stool and saliva testing collected at home and mailed to national laboratories",
      ],
    },
    { kind: "subheading", text: "Important terms:" },
    {
      kind: "list",
      items: [
        "testing is not optional",
        "kits do expire",
        "if a sample fails, retesting is included",
        "additional or repeat testing beyond the initial program is available at an additional cost",
      ],
    },
    {
      kind: "para",
      text: "LMI's diagnostic testing is set to renew annually. You may adjust the timing of annual testing with advance notice.",
    },
    {
      kind: "para",
      text: "Once testing has been ordered or processed, fees related to testing are non-refundable.",
    },

    { kind: "section", n: 7, title: "LERA Care Team Consults & Add-On Services" },
    {
      kind: "para",
      text: "Live 1:1 LERA Care Team consultations are not included in the base membership.",
    },
    { kind: "para", text: "If purchased, these visits:" },
    {
      kind: "list",
      items: [
        "are optional add-on services",
        "are billed separately",
        "are delivered via secure video telehealth",
      ],
    },
    {
      kind: "para",
      text: "Availability and pricing will be disclosed at the time of booking.",
    },
    {
      kind: "para",
      text: "If you need to cancel or reschedule an appointment, we ask that you provide at least 24 hours' notice. This allows us to offer that time to another member. Appointments cancelled with less than 24 hours' notice, or missed without notice, may result in the forfeiture of the prepaid appointment fee. We understand that unexpected situations arise. If you experience an emergency or extenuating circumstance, please contact us as soon as possible, and we will review on a case-by-case basis.",
    },

    { kind: "section", n: 8, title: "Supplements" },
    { kind: "para", text: "Supplements are not included in membership fees." },
    {
      kind: "para",
      text: "Members may purchase LERA's proprietary nutraceuticals separately and receive a 20% member discount.",
    },
    {
      kind: "para",
      text: "If you are pregnant, trying to become pregnant, or become pregnant while a member, supplements should be discontinued unless reviewed and approved by a licensed healthcare provider.",
    },

    { kind: "section", n: 9, title: "What Is Not Included" },
    { kind: "para", text: "LMI membership does not include:" },
    {
      kind: "list",
      items: [
        "emergency care",
        "in-person visits",
        "unlimited clinician appointments",
        "certain prescription medications",
        "insurance billing",
      ],
    },
    {
      kind: "para",
      text: "LMI does not submit claims to insurance. HSA/FSA documentation may be provided where applicable.",
    },

    { kind: "section", n: 10, title: "Data Retention & Account Status" },
    { kind: "para", text: "If you discontinue membership:" },
    {
      kind: "list",
      items: [
        "your data will be retained securely in case you choose to resume later (subject to our standard record retention policies)",
        "you may request deletion of your information, subject to legal and clinical record retention requirements",
      ],
    },
    {
      kind: "para",
      text: "Requests for deletion will be honored where permitted by law.",
    },

    { kind: "section", n: 11, title: "Pauses & Special Circumstances" },
    {
      kind: "para",
      text: "Members may request a temporary pause (for example, due to pregnancy or other life events).",
    },
    {
      kind: "para",
      text: "Pauses are handled case by case at LERA's discretion and are not guaranteed.",
    },

    { kind: "section", n: 12, title: "Research & Secondary Use of Data" },
    {
      kind: "para",
      text: "LMI may conduct various research studies and IRB-approved clinical studies to evaluate health outcomes associated with its protocols.",
    },
    {
      kind: "para",
      text: "Your information may be used for research purposes in accordance with:",
    },
    {
      kind: "list",
      items: [
        "HIPAA",
        "applicable research regulations",
        "de-identification standards where required",
      ],
    },
    {
      kind: "para",
      text: "Participation in research will not affect your access to care, and additional consent may be required depending on the study.",
    },

    { kind: "section", n: 13, title: "Privacy & Confidentiality" },
    {
      kind: "para",
      text: "Your health information is protected under HIPAA and governed by LERA's:",
    },
    {
      kind: "list",
      items: [
        "Notice of Privacy Practices",
        "Privacy Policy",
        "Informed Consent & Data Use Authorization",
      ],
    },
    {
      kind: "para",
      text: "LERA does not sell your data and does not share identifiable health information with employers or sponsors.",
    },

    { kind: "section", n: 14, title: "Communications" },
    {
      kind: "para",
      text: "You consent to receive communications related to your membership, including:",
    },
    {
      kind: "list",
      items: [
        "email",
        "text messages",
        "secure in-app messages",
        "telehealth communications",
      ],
    },
    { kind: "para", text: "Electronic communications are not suitable for emergencies." },
    {
      kind: "para",
      text: "From time to time, we may request your permission to share your experience for educational or marketing purposes. Any such use will require your separate written consent.",
    },

    { kind: "section", n: 15, title: "Community Features & User Content" },
    {
      kind: "para",
      text: "LERA may offer access to community features that allow members to connect, share experiences, and engage with other users.",
    },
    {
      kind: "para",
      text: "By participating in the community, you acknowledge and agree that:",
    },
    {
      kind: "list",
      items: [
        "Participation is voluntary",
        "The community is not a clinical care environment",
        "Information shared is not protected under HIPAA",
        "Content you share may be visible to other members",
        "You are solely responsible for what you choose to share",
      ],
    },
    { kind: "para", text: "You further acknowledge that:" },
    {
      kind: "list",
      items: [
        "No medical advice, diagnosis, or treatment is provided through the community",
        "Information shared by other members should not be relied upon for medical decisions",
      ],
    },

    { kind: "section", n: 16, title: "Founding Members' Marketing" },
    {
      kind: "para",
      text: "At LERA, our mission is grounded in real women's experiences. If you choose to share yours, we're deeply grateful. By signing below, you're letting us know that:",
    },
    { kind: "subheading", text: "Sharing your experience" },
    {
      kind: "para",
      text: 'You\'ve engaged with LMI ("Provider"), which delivers services as part of the LERA Health platform ("LERA"), and have chosen to share feedback about your experience or health journey. This may include written reflections, photos, audio, or video.',
    },
    { kind: "subheading", text: "How we may capture your story" },
    { kind: "para", text: "You give LERA permission to:" },
    {
      kind: "list",
      items: [
        "record photos, video, or audio",
        "interview you",
        "share your story, feedback, or experience",
      ],
    },
    {
      kind: "para",
      text: "This may include references to your health journey or the care you've received through LERA.",
    },
    { kind: "subheading", text: "How your story may be used" },
    {
      kind: "para",
      text: "You authorize Provider, LERA, and their affiliates, representatives, and partners to use your story, likeness, and any materials you provide, including your name, voice, and images, in connection with sharing LERA's mission and services.",
    },
    { kind: "para", text: "This may include use across:" },
    {
      kind: "list",
      items: [
        "website and digital platforms",
        "social media",
        "email and print materials",
        "other marketing and media channels",
      ],
    },
    {
      kind: "para",
      text: "Your story may be used over time as part of LERA's ongoing work to educate and inspire others.",
    },
    { kind: "subheading", text: "A note on collaboration" },
    {
      kind: "para",
      text: "If you create and share content about LERA on your personal channels, we ask that it be coordinated with our team so we can ensure accuracy and consistency.",
    },
    { kind: "subheading", text: "Compensation" },
    {
      kind: "para",
      text: "You understand that this is a voluntary contribution and that no compensation will be provided for the use of these materials.",
    },
    { kind: "subheading", text: "Your control" },
    {
      kind: "para",
      text: "You may withdraw your permission at any time by contacting us at:",
    },
    {
      kind: "list",
      items: ["support@lerahealth.com", "P.O. Box 16242, Golden, CO 80402"],
    },
    {
      kind: "para",
      text: "We will honor your request for future use within a reasonable timeframe. Materials already in use prior to your request may continue to be used.",
    },

    { kind: "section", n: 17, title: "Arbitration & Dispute Resolution" },
    {
      kind: "para",
      text: "By agreeing to the Member Agreement, you agree that any claim or dispute between you and LERA (or any parent, subsidiary, affiliate, successor or assignee, officer, director, employee, agent or representative of you or LERA) arising from or relating to your relationship with LERA and/or the services that you obtain from LERA must be resolved by binding arbitration following these arbitration terms and the Commercial Dispute Resolution Procedures and Supplementary Procedures for Consumer-Related Disputes of the American Arbitration Association (AAA). If the AAA is unavailable or unwilling to serve as administrator, a substitute administrator will be selected by either: (a) our mutual agreement, or (b) if we cannot agree, by a court.",
    },
    {
      kind: "para",
      text: "You may get the AAA rules and forms by writing, calling or emailing: American Arbitration Association, 335 Madison Avenue, Floor 10, New York, New York 10017, 800-778-7879, www.adr.org. Any arbitration will take place in the county where you live. If a substitute arbitration administrator is appointed we will provide contact information for the substitute administrator.",
    },
    {
      kind: "para",
      text: "You will pay an administrative fee and arbitrator's fees. The AAA caps your fees depending on the amount of any claim that you file. LERA is responsible for administrative fees and arbitrator's fees in excess of the capped amounts. If you ask LERA in writing, LERA will pay the entire administrative fee and arbitrator's fees. LERA and you will pay each of our attorney's, expert's and other fees, except as otherwise provided by law.",
    },
    {
      kind: "para",
      text: "No class actions, etc. LERA and you also agree that the arbitrator only may resolve the claims, disputes, or controversies between LERA and you. The arbitration won't be conducted on a class-wide basis or be consolidated with claims or demands of other persons. You agree not to participate in a representative capacity or as a member of any class of claimants, pertaining to any claim.",
    },
    {
      kind: "para",
      text: 'These arbitration terms are governed by the Colorado Uniform Arbitration Act. The arbitrator shall follow the substantive law of Colorado. The arbitrator\'s findings, reasoning, decision, and award must be in writing and must be based upon and consistent with the law of the jurisdiction that applies to the Member Agreement. LERA and you agree that any award will be kept confidential. If any part of these arbitration terms (other than the paragraph titled "No class actions, etc.") cannot be enforced, the rest of these arbitration terms will continue to apply. If the paragraph titled "No class actions, etc." cannot be enforced, then the entire arbitration terms will be null and void. YOU AGREE THAT THE PROVISION OF ANY MEDICAL TREATMENTS BY ANY LERA PRACTITIONER ARE NOT CONTINGENT ON YOU AGREEING TO THESE ARBITRATION TERMS.',
    },

    { kind: "section", n: 18, title: "Relationship of the Parties" },
    {
      kind: "para",
      text: "Nothing in this Agreement creates an employment, partnership, or joint venture relationship between you and LERA.",
    },

    { kind: "section", n: 19, title: "Governing Documents" },
    { kind: "para", text: "This Agreement incorporates by reference:" },
    {
      kind: "list",
      items: [
        "Terms of Service",
        "Medical Disclaimer",
        "HIPAA Notice of Privacy Practices",
        "Privacy Policy",
        "Informed Consent & Data Use",
      ],
    },
    {
      kind: "para",
      text: "If there is a conflict, clinical consents and the NPP control with respect to care and health information.",
    },

    { kind: "section", n: 20, title: "Questions" },
    {
      kind: "para",
      text: "If you have questions about your membership or this Agreement, please contact: support@lerahealth.com.",
    },
  ],
};
