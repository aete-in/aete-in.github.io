export const PRICING_PLANS = [
  {
    role: "Student",
    title: "Student Learner Pass",
    subtitle: "FREE TIER AVAILABLE",
    price: "₹99",
    originalPrice: null,
    numericPrice: 99,
    description: "For engineering students. Start for Free or upgrade for ₹99 to get certified access.",
    features: [
      "Access to Academic Resource Pool (Basic / Full when Paid)",
      "Certified Student Learner Credential (Paid Only)",
      "Discounts on workshops & hackathons",
      "Access to Technical Study Groups"
    ],
    buttonText: "Get Learner Pass",
    ui: {
      color: "var(--color-primary)",
      iconName: "User",
      period: "Lifetime",
      isOffer: false
    }
  },
  {
    role: "Professional",
    title: "Professional Membership Pass",
    subtitle: "FREE TIER AVAILABLE",
    price: "₹999",
    originalPrice: null,
    numericPrice: 999,
    description: "For Faculty & Industry Professionals. Join for Free or pay ₹999 for full directory visibility.",
    features: [
      "Access to Academic Resource Pool (Basic / Full when Paid)",
      "Professional Competence Certificate (Paid Only)",
      "Priority Access to Advisory Board Meetings (Paid Only)",
      "Eligibility for Senior Mentor Certification"
    ],
    buttonText: "Get Membership Pass",
    ui: {
      color: "var(--color-secondary)",
      iconName: "Briefcase",
      period: "Lifetime",
      isOffer: false
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
      "Access to Academic Resource Pool",
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
