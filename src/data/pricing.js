export const PRICING_PLANS = [
  {
    role: "Student",
    title: "Student Learner Pass",
    subtitle: "LIFETIME LEARNING ACCESS",
    price: "99% OFF", // Visual Big Display
    originalPrice: "₹150 + GST", // Visual Strikethrough
    numericPrice: 1.5,
    description: "For engineering students keen on upgrading skills and innovation. Access to student study groups and competitions.",
    features: [
      "Access to Resource Persons Network",
      "Certified Student Learner Credential",
      "Discounts on workshops & hackathons",
      "Access to Technical Study Groups"
    ],
    buttonText: "Get Learner Pass",
    ui: {
      color: "var(--color-primary)",
      iconName: "User",
      period: "Lifetime",
      isOffer: true
    }
  },
  {
    role: "Professional",
    title: "Professional Network Pass",
    subtitle: "LIFETIME NETWORK ACCESS",
    price: "99% OFF",
    originalPrice: "₹1,000 + GST",
    numericPrice: 10,
    description: "For Faculty, Academicians, and Industry Professionals. Unlocks unlimited access to the Resource Persons Network.",
    features: [
      "Access to Resource Persons Network",
      "Professional Competence Certificate",
      "Priority Access to Advisory Board Meetings",
      "Eligibility for Senior Mentor Certification"
    ],
    buttonText: "Get Network Pass",
    ui: {
      color: "var(--color-secondary)",
      iconName: "Briefcase",
      period: "Lifetime",
      isOffer: true
    }
  },
  {
    role: "Institution",
    title: "Campus Partner License",
    subtitle: "ANNUAL PARTNERSHIP FEE",
    price: "₹1,000", // Visual Big Display (No Strikethrough needed)
    originalPrice: null,
    numericPrice: 1000,
    description: "For Engineering Colleges and Universities. Establish innovation cells and gain direct access to expert speakers.",
    features: [
      "Access to Resource Persons Network",
      "Certificate of Institutional Partnership",
      "Sponsorship Support for Campus Events",
      "License to Host Official Workshops"
    ],
    buttonText: "Get Partner License",
    ui: {
      color: "#2b6cb0",
      iconName: "Building",
      period: "Yearly",
      isOffer: false
    }
  }
];
