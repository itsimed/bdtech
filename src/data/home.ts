import type { Service, ProcessStep, Testimonial, Partner } from '../types';

export const heroData = {
  title: "Infrastructure, Security, Mobility: Equip Yourself Intelligently",
  subtitle: "Expert IT Services for Enhanced Performance",
  description: "Optimize your IT environment with customized hardware and IT service solutions. BDTECH accompanies you in the selection, integration, and deployment of high-performance equipment: workstations, servers, peripherals, network security, and mobile infrastructure. Reliable expertise at the service of your growth.",
  ctaText: "Request a Demo",
  image: "/hero-illustration.svg"
};

export const aboutData = {
  title: "About BDTECH Solutions",
  content: "Founded in Dubai, BDTECH Solutions delivers smart, reliable IT and security services. Trusted by clients across sectors: Media, Healthcare, Luxury, and more. We provide comprehensive IT solutions that drive business growth and ensure operational excellence.",
  stats: [
    { label: "Satisfied Clients", value: "500+" },
    { label: "Completed Projects", value: "1000+" },
    { label: "Years of Experience", value: "10+" },
    { label: "24/7 Support", value: "100%" }
  ]
};

export const services: Service[] = [
  {
    id: 1,
    title: "Network & Security",
    description: "At BDTECH SOLUTIONS, we build fast, secure, and scalable networks. From cabling to firewalls and wireless access, we ensure seamless connectivity that grows with your business.",
    icon: "Shield",
    features: [
      "Complete Security Audit",
      "Firewall Configuration",
      "24/7 Network Monitoring",
      "Regulatory Compliance"
    ]
  },
  {
    id: 2,
    title: "IT Support",
    description: "We provide reliable on-site and remote IT support to keep your business running smoothly. Fast response, expert service, and peace of mind—every day.",
    icon: "Headphones",
    features: [
      "24/7 Technical Support",
      "Preventive Maintenance",
      "Incident Management",
      "User Training"
    ]
  },
  {
    id: 3,
    title: "IT Projects",
    description: "From planning to deployment, BDTECH SOLUTIONS manages your IT projects with precision and care. Whether upgrading infrastructure or launching new systems, we deliver on time, on budget, and with expert execution.",
    icon: "Code",
    features: [
      "Needs Analysis",
      "Custom Architecture",
      "Secure Deployment",
      "Complete Documentation"
    ]
  }
];

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Audit",
    description: "In-depth analysis of your existing IT infrastructure and identification of necessary improvements.",
    icon: "Search"
  },
  {
    id: 2,
    title: "Plan",
    description: "Development of a customized strategy and detailed implementation plan.",
    icon: "FileText"
  },
  {
    id: 3,
    title: "Deployment",
    description: "Progressive and secure implementation of solutions with minimal disruption.",
    icon: "Rocket"
  },
  {
    id: 4,
    title: "Maintenance",
    description: "Continuous support, preventive maintenance, and ongoing optimization of your systems.",
    icon: "Settings"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Al Mansouri",
    company: "TechCorp Dubai",
    role: "IT Director",
    content: "BDTECH Solutions has transformed our IT infrastructure. Their technical expertise and professional approach have significantly improved our operational efficiency.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "MediCare Plus",
    role: "CEO",
    content: "The security of our data was our priority. BDTECH has implemented a robust solution that gives us complete peace of mind.",
    rating: 5
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    company: "Luxury Retail Group",
    role: "Operations Director",
    content: "Their 24/7 IT support is exceptional. Our teams can focus on their core business knowing that our systems are in good hands.",
    rating: 5
  }
];

export const partners: Partner[] = [
  { id: 1, name: "Microsoft", logo: "/partners/microsoft.svg" },
  { id: 2, name: "Cisco", logo: "/partners/cisco.svg" },
  { id: 3, name: "VMware", logo: "/partners/vmware.svg" },
  { id: 4, name: "Dell", logo: "/partners/dell.svg" },
  { id: 5, name: "HP", logo: "/partners/hp.svg" },
  { id: 6, name: "Oracle", logo: "/partners/oracle.svg" }
];

export const contactData = {
  email: "contact@bdtech-solutions.com",
  phone: "+971 55 845 0710",
  address: "Dubai, UAE",
  socialMedia: {
    linkedin: "https://linkedin.com/company/bdtech-solutions",
    twitter: "https://twitter.com/bdtechsolutions",
    facebook: "https://facebook.com/bdtechsolutions"
  }
}; 