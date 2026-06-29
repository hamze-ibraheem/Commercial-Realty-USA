/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Building2,
  KeyRound,
  TrendingUp,
  FileText,
  MapPin,
  Briefcase,
  Phone,
  Clock,
  Menu,
  X,
  ChevronRight,
  Check,
  Award,
  Users,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Star,
  ArrowRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Definitions of Services with extra B2B consulting details
interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  longDesc: string;
  bullets: string[];
  idealFor: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [currentTimeState, setCurrentTimeState] = useState({
    timeStr: "",
    isOpen: false,
    dayName: "",
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [leadReference, setLeadReference] = useState("");

  const services: ServiceItem[] = [
    {
      id: "sales",
      icon: <Building2 className="w-6 h-6 text-[#C9A84C]" />,
      title: "Commercial Property Sales",
      shortDesc: "Strategic marketing and expert negotiation for buying or listing office, retail, and industrial properties across South Georgia.",
      longDesc: "Whether procuring a high-visibility retail storefront on North Valdosta Road or listing an industrial warehouse near the I-75 transit corridor, our brokerage merges rich analytical valuations with localized marketing tools to drive competition and capture absolute market value.",
      bullets: [
        "Rigorous financial underwriting & cash flow analysis",
        "Targeted marketing strategies aimed at qualified buyers & corporate users",
        "Expert assistance with contract negotiations & local regulatory guidance",
        "Strict confidentiality protocols to safeguard sensitive commercial transactions",
      ],
      idealFor: "Corporate owner-users, family offices, and private equity investors looking to acquire or liquidate yield-producing real estate."
    },
    {
      id: "leasing",
      icon: <KeyRound className="w-6 h-6 text-[#C9A84C]" />,
      title: "Leasing & Tenant Representation",
      shortDesc: "Helping expanding businesses identify, evaluate, and secure retail, office, and medical space with aggressive lease terms.",
      longDesc: "Securing commercial tenancy requires comprehensive local intelligence. We map out vacant inventories (including off-market pocket availability), forecast total occupancy expenses, and structurally negotiate lease constructs tailored to enhance tenant operational flexibility.",
      bullets: [
        "Comprehensive market mapping of competitive spaces in Valdosta and beyond",
        "Detailed comparison models featuring base rents, NNN lease structures, and CAM reconciliations",
        "Surgical lease negotiation including tenant improvement allowances (TIA) and renewal concessions",
        "Expansion, subleasing, and spatial realignment advisory services",
      ],
      idealFor: "Growing medical groups, regional retail operators, and corporate headquarters looking for optimal layout parameters."
    },
    {
      id: "investment",
      icon: <TrendingUp className="w-6 h-6 text-[#C9A84C]" />,
      title: "Investment Property Consulting",
      shortDesc: "In-depth underwriting, cap rate sensitivity forecasting, and qualitative risk analysis to evaluate cash flow properties.",
      longDesc: "Our advisory builds concrete investment summaries. We stress-test rental rolls, analyze lease maturities, model long-term debt-service requirements, and calculate post-tax internal rates of return (IRR) to ensure capital matches calculated risk profiles.",
      bullets: [
        "In-depth discount cash flow (DCF) scheduling and multi-year pro-forma modeling",
        "Reconciliation of current capital markets data including cap rate parameters across South Georgia",
        "Evaluation of single-tenant net-lease (STNL) and multi-tenant assets",
        "1031 Exchange transaction placement and structural calendar tracking",
      ],
      idealFor: "Syndicators, high-net-worth developers, and conservative wealth managers aiming to allocate assets safely into physical property."
    },
    {
      id: "valuation",
      icon: <FileText className="w-6 h-6 text-[#C9A84C]" />,
      title: "Property Valuation & Market Analysis",
      shortDesc: "Data-backed valuation using direct transaction history, local absorption tracking, and localized economic data.",
      longDesc: "Precision valuations represent the initial step of any smart real estate decision. By tracking proprietary local datasets, relative zoning developments, and direct regional lease pricing, we compile actionable Broker Opinions of Value (BOV) for transactional or estate purposes.",
      bullets: [
        "Comprehensive evaluation matching Sales Comparison, Income Capitalization, and Replacement Cost methods",
        "Real-time absorption, submarket vacancy, and development pipeline analytics",
        "Historical asset performance comparisons and zoning modification stress testing",
        "Lender-packaged commercial property evaluations and collateral breakdowns",
      ],
      idealFor: "Estates, lending partners, asset holders, and developers requiring objective, highly detailed evaluations."
    },
    {
      id: "site-selection",
      icon: <MapPin className="w-6 h-6 text-[#C9A84C]" />,
      title: "Site Selection & Due Diligence",
      shortDesc: "Identifying high-growth corridors in Valdosta and South Georgia, evaluating utility access, zoning regulations, and demographics.",
      longDesc: "Acquiring undeveloped or redevelopable land is highly risk-sensitive. We bridge site selection with functional due diligence—inspecting Lowndes County zoning frameworks, assessing traffic statistics, verifying environmental utilities, and mapping physical coordinates.",
      bullets: [
        "Full-scope traffic count assessment and demographic target maps",
        "Detailed coordination with municipal zoning administrators and utility inspectors",
        "Infrastructure development cost estimates and environmental overlay review",
        "Close alignment with South Georgia economic development incentives",
      ],
      idealFor: "National franchise developers, industrial logistics firms, and institutional multi-family builders."
    },
    {
      id: "landlord",
      icon: <Briefcase className="w-6 h-6 text-[#C9A84C]" />,
      title: "Landlord Representation",
      shortDesc: "Comprehensive landlord marketing and tenant vetting to capture credit covenants and maximize building valuation.",
      longDesc: "Vacancy decays building equity. We construct customized leasing campaigns to secure investment-grade tenants, structure rent escalator clauses, and improve cumulative Net Operating Income (NOI) to position properties for institutional-grade valuation.",
      bullets: [
        "Syndication across premium commercial directories and national MLS channels",
        "Rigorous background checks of prospective commercial credit covenants",
        "Strategic advice on property positioning, facade enhancements, and market pricing",
        "Advanced lease structures designed to protect capital improvement investments",
      ],
      idealFor: "Property owners, pension trusts, and developers striving to minimize retail or office vacancies."
    }
  ];

  // Map section navigation items
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "why-us", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute Open/Closed status in Georgia (Eastern Standard/Daylight Time)
  useEffect(() => {
    const calculateGeorgiaTime = () => {
      const d = new Date();
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "America/New_York",
          hour12: false,
          weekday: "long",
          hour: "numeric",
          minute: "numeric",
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const parts = formatter.formatToParts(d);
        
        let weekday = "";
        let hour = 0;
        let minute = 0;
        
        parts.forEach((part) => {
          if (part.type === "weekday") weekday = part.value;
          if (part.type === "hour") hour = parseInt(part.value, 10);
          if (part.type === "minute") minute = parseInt(part.value, 10);
        });

        const isWeekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(weekday);
        const isWorkingHours = hour >= 8 && hour < 17;
        const isOpen = isWeekday && isWorkingHours;

        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour >= 12 ? "PM" : "AM";
        const minStr = minute < 10 ? `0${minute}` : minute;

        setCurrentTimeState({
          timeStr: `${displayHour}:${minStr} ${ampm} Eastern Time`,
          isOpen: isOpen,
          dayName: weekday,
        });
      } catch (e) {
        setCurrentTimeState({
          timeStr: "8:00 AM - 5:00 PM Eastern Time",
          isOpen: true,
          dayName: "Mon-Fri",
        });
      }
    };

    calculateGeorgiaTime();
    const interval = setInterval(calculateGeorgiaTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("3219 N Oak Street Extension, Valdosta, GA 31602");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("submitting");

    setTimeout(() => {
      const generatedRef = "CRU-" + Math.floor(100000 + Math.random() * 900000);
      setLeadReference(generatedRef);
      setFormStatus("success");
    }, 1200);
  };

  const handleFormReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setFormStatus("idle");
  };

  const smoothScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F5F5F5] overflow-y-auto lg:overflow-hidden select-none text-slate-800 antialiased font-sans">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="h-16 bg-[#1B2D5B] text-white flex items-center justify-between px-6 sm:px-10 shadow-lg shrink-0 border-b border-[#C9A84C]/20">
        <div className="flex flex-col cursor-pointer" onClick={() => smoothScrollTo("home")}>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-none text-white text-left" style={{ fontFamily: "Georgia, serif" }}>
            COMMERCIAL REALTY <span className="text-[#C9A84C]">USA, LLC</span>
          </h1>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold mt-0.5">
            Commercial Real Estate Consultants
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-8 text-xs font-semibold uppercase tracking-widest align-middle">
          {[
            { label: "Home", id: "home" },
            { label: "Services", id: "services" },
            { label: "About", id: "about" },
            { label: "Why Us", id: "why-us" },
            { label: "Contact", id: "contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => smoothScrollTo(item.id)}
              className={`pb-1 transition-colors duration-200 cursor-pointer ${
                activeSection === item.id 
                  ? "text-[#C9A84C] border-b-2 border-[#C9A84C]" 
                  : "text-white/80 hover:text-[#C9A84C]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Button CTA */}
        <div className="hidden lg:block">
          <button 
            onClick={() => smoothScrollTo("contact")}
            className="px-4 py-1.5 font-sans font-bold text-xs uppercase tracking-widest text-[#1B2D5B] bg-[#C9A84C] hover:bg-[#B3933E] rounded shadow transition-all cursor-pointer"
          >
            Inquire Today
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded text-white hover:text-[#C9A84C] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden w-full overflow-hidden bg-[#1B2D5B] border-t border-[#C9A84C]/20 shadow-xl z-30 shrink-0"
          >
            <div className="px-6 py-4 space-y-3">
              {[
                { label: "Home", id: "home" },
                { label: "Services", id: "services" },
                { label: "About Our Firm", id: "about" },
                { label: "Why Choose Us", id: "why-us" },
                { label: "Contact Us", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => smoothScrollTo(item.id)}
                  className={`block w-full text-left font-sans text-sm font-medium py-2 px-3 rounded transition-all ${
                    activeSection === item.id
                      ? "text-[#1B2D5B] bg-[#C9A84C] font-semibold"
                      : "text-slate-200 hover:text-[#C9A84C]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => smoothScrollTo("contact")}
                  className="w-full text-center font-sans font-bold py-2 text-xs uppercase tracking-wider text-[#1B2D5B] bg-[#C9A84C] rounded"
                >
                  Consultation Request
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN TWO-COLUMN DASHBOARD LAYOUT */}
      <main className="flex flex-col lg:flex-row flex-1 p-4 lg:p-6 gap-6 min-h-0 overflow-x-hidden">
        
        {/* LEFT COLUMN (2/3 width on desktop): Hero & Services */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 min-h-0">
          
          {/* HERO SECTION - Gilded Navy Card */}
          <section 
            id="home"
            className="bg-[#1B2D5B] rounded-lg p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden h-auto lg:h-[240px] shrink-0 shadow-inner border border-white/5"
          >
            {/* Elegant SVG Diagonal Slices on Right */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 Z" fill="white" />
                <path d="M0 50 L50 100 L0 100 Z" fill="#C9A84C" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 mb-2.5 px-2.5 py-0.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/35">
                <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#C9A84C]">
                  Valdosta & South Georgia Region
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl text-white font-bold leading-tight mb-3" style={{ fontFamily: "Georgia, serif" }}>
                South Georgia's Trusted <br />
                <span className="text-[#C9A84C]">Commercial Real Estate Experts</span>
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mb-5 leading-relaxed font-light">
                Helping businesses, investors, developers, and landlords buy, sell, lease, and invest in commercial property in Valdosta, GA and surrounding coordinates with strict analytical diligence.
              </p>

              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => smoothScrollTo("services")}
                  className="bg-[#C9A84C] hover:bg-[#B3933E] text-[#1B2D5B] px-5 py-2 text-xs font-bold uppercase tracking-wider rounded shadow flex items-center gap-1 cursor-pointer transition-colors"
                >
                  Browse Services <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => smoothScrollTo("contact")}
                  className="border border-white hover:bg-white/10 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  Contact Us Today
                </button>
              </div>
            </div>
          </section>

          {/* SERVICES SECTION - Compact list with grid structure */}
          <section id="services" className="flex-1 flex flex-col min-h-0 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 h-8 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-[#C9A84C] rounded-sm" />
                <h3 className="text-[#1B2D5B] font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "Georgia, serif" }}>
                  Consulting Services & Specialities
                </h3>
              </div>
              <span className="hidden sm:inline text-[10px] text-slate-400 font-mono">
                Click Card to Toggle Deep Analytics
              </span>
            </div>

            {/* Grid container with independent scrollbar for desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-1 flex-1 min-h-0">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="bg-[#F9FBFD] p-4.5 border-l-4 border-[#C9A84C] rounded shadow-sm flex flex-col justify-between hover:bg-[#C9A84C]/5 transition-all duration-200 cursor-pointer border border-[#C9A84C]/10 hover:border-[#C9A84C]"
                  id={`service-card-${service.id}`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2 shrink-0">
                      <div className="p-1 rounded bg-[#1B2D5B]/5 text-[#1B2D5B]">
                        {service.icon}
                      </div>
                      <h4 className="text-[#1B2D5B] font-bold text-xs uppercase tracking-wider line-clamp-1">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-500 font-light line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>
                  
                  <div className="pt-2 text-[10px] font-bold text-[#1B2D5B] uppercase flex items-center gap-0.5 justify-end mt-1">
                    <span>Explore Specialties</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN (1/3 width on desktop): Scrollable Sidebar containing About, Pillars, Testimonials, Inquiry, Map */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto lg:pr-2 pb-6 lg:pb-0 min-h-0">
          
          {/* ABOUT THE FIRM CARD */}
          <section id="about" className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg shrink-0">
            <h3 className="text-[#1B2D5B] font-bold text-sm uppercase mb-3 tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
              About the Firm
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
              "Based in Valdosta, GA, we are authoritative yet approachable experts who bridge the gap between global Standards and local South Georgia intelligence."
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Commercial Realty USA, LLC is established as Valdosta's primary boutique consulting practice exclusively devoted to corporate properties, commercial business leasing, and investment portfolios. Wespeak the language of cap rates, zoning variables, and operational cash flows.
            </p>
            <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-[#C9A84C]">
              <span>ZONING & GIS INTEL</span>
              <span>100% COMMERCIAL ONLY</span>
            </div>
          </section>

          {/* WHY CHOOSE US CARD */}
          <section id="why-us" className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 p-6 shadow-sm rounded-lg shrink-0">
            <h3 className="text-[#1B2D5B] font-bold text-sm uppercase mb-4 tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
              Why Choose Us
            </h3>
            <ul className="space-y-4">
              {[
                {
                  id: "01",
                  title: "Local Market Expertise",
                  desc: "Deep roots in Lowndes County and strategic I-75 transit routes."
                },
                {
                  id: "02",
                  title: "Full-Service Diligence",
                  desc: "From initial corporate zoning search to the final contract seal."
                },
                {
                  id: "03",
                  title: "Client-Centered Confidentiality",
                  desc: "Direct advisory by senior personnel. Zero handoff to sub-tier agents."
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-[#1B2D5B] text-white p-1 rounded text-[8px] mt-0.5 uppercase font-bold tracking-tighter shrink-0 w-5 h-5 flex items-center justify-center">
                    {item.id}
                  </span>
                  <div className="text-xs font-bold text-[#1B2D5B]">
                    {item.title}
                    <p className="font-normal text-[11px] text-gray-500 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* TESTIMONIALS SIDEBAR EXAMPLES */}
          <section className="bg-white p-5 shadow-sm border border-gray-200 rounded-lg shrink-0">
            <h3 className="text-[#1B2D5B] font-bold text-sm uppercase mb-3.5 tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
              Representative Case Outcomes
            </h3>
            
            <div className="space-y-3">
              {[
                {
                  quote: "Their knowledge of Valdosta industrial logistics near I-75 saved us months of selection delay.",
                  client: "Marcus Reynolds, Reynolds Logistics"
                },
                {
                  quote: "Superb analytical evaluation capability and excellent commercial underwriting.",
                  client: "Sarah Lin, Lin-Steward Properties"
                }
              ].map((test, i) => (
                <div key={i} className="p-3 bg-[#F9FBFD] border-l-2 border-[#1B2D5B] rounded text-[11px]">
                  <p className="text-gray-600 font-light italic mb-1">"{test.quote}"</p>
                  <span className="font-semibold text-slate-500 uppercase tracking-tight text-[10px] block text-right">
                    — {test.client}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* INTERACTIVE INQUIRY FORM */}
          <section id="contact" className="bg-white p-6 shadow-md border-t-4 border-[#1B2D5B] rounded-lg shrink-0">
            <h3 className="text-[#1B2D5B] font-bold text-sm uppercase mb-1 tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
              Consultation Inquiry
            </h3>
            <p className="text-[10px] text-gray-400 lowercase mb-4 tracking-normal">
              provide parameters details for executive review
            </p>

            <AnimatePresence mode="wait">
              {formStatus !== "success" ? (
                <motion.form 
                  key="sidebar-consultation-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-3.5"
                >
                  <div>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name *" 
                      className="w-full text-xs p-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C9A84C] bg-gray-50"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company Name" 
                      className="w-full text-xs p-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C9A84C] bg-gray-50"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address *" 
                      className="w-full text-xs p-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C9A84C] bg-gray-50"
                    />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone Number" 
                      className="w-full text-xs p-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C9A84C] bg-gray-50"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
                    >
                      <option value="">Select Specialty Requirement</option>
                      {services.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe property site / investment goal..." 
                      className="w-full text-xs p-2.5 border border-gray-300 rounded h-20 resize-none focus:outline-none focus:border-[#C9A84C] bg-gray-50"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === "submitting"}
                    className="w-full bg-[#1B2D5B] hover:bg-[#C9A84C] hover:text-[#1B2D5B] text-white font-bold py-3 text-xs uppercase tracking-widest rounded transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {formStatus === "submitting" ? "Processing..." : "Send Consulting Request"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="sidebar-form-receipt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded text-slate-800 text-xs text-center space-y-3"
                >
                  <div className="w-10 h-10 bg-[#BCF0DA] rounded-full flex items-center justify-center text-[#03543F] mx-auto text-sm font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-[#03543F] tracking-wide">CONSULTATION RECORDED</h4>
                  <p className="text-[11px] text-gray-600 leading-tight">
                    Thank you, <strong className="font-bold">{formData.name}</strong>. Your advisory file code is:
                  </p>
                  <div className="py-1.5 px-3 bg-[#1B2D5B] text-white rounded font-mono text-[11px] font-bold">
                    {leadReference}
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-light mt-1">
                    An executive real estate specialist will dial your contact line within 1 working hour.
                  </p>
                  <button
                    onClick={handleFormReset}
                    className="mt-2 text-[10px] text-[#1B2D5B] hover:underline uppercase tracking-wider font-bold block mx-auto cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LIVE DYNAMIC WORKING HOURS PANEL & LOCATION AT LEADS SECTION */}
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span className="font-semibold text-[#1B2D5B] uppercase block">Valdosta Headquarters:</span>
                <span className="font-mono text-[10px] text-gray-400">3219 N Oak Street</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className={`w-2 h-2 rounded-full inline-block ${currentTimeState.isOpen ? "bg-emerald-500" : "bg-red-400"}`} />
                  <span className="font-medium text-slate-700">
                    {currentTimeState.isOpen ? "Advisors Active" : "Office Closed"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 bg-gray-100 p-1 rounded">
                  {currentTimeState.timeStr}
                </span>
              </div>

              {/* Copy coordinates interaction */}
              <button
                onClick={copyToClipboard}
                className="w-full mt-1.5 py-1.5 text-[11px] bg-slate-100 hover:bg-[#C9A84C]/10 text-slate-600 rounded flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                {copiedText ? (
                  <>✓ Address Copied</>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Office Address
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-gray-400 italic font-light text-center">
                Phone Direct: +1 (229) 560-4037
              </p>
            </div>
          </section>

          {/* GOOGLE MAPS IFRAME CARD */}
          <section className="rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0">
            <iframe
              title="Commercial Realty USA LLC - Interactive Location Map"
              src="https://maps.google.com/maps?q=3219%20N%20Oak%20Street%20Extension,%20Valdosta,%20GA%2031602&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="200"
              style={{ border: 0, filter: "grayscale(0.65) contrast(1.1)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>

        </aside>

      </main>

      {/* FOOTER - Minimal, aligned to exact design instructions */}
      <footer className="h-auto md:h-12 bg-[#1B2D5B] border-t border-white/10 text-white flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-3 md:py-0 text-[10px] shrink-0 uppercase tracking-widest gap-2 text-center font-semibold">
        <p>&copy; 2025 Commercial Realty USA, LLC | 3219 N Oak Street Extension, Valdosta, GA</p>
        <p>Call Today: +1 (229) 560-4037</p>
      </footer>

      {/* SERVICE DETAIL INTERACTIVE DIALOG (MODAL) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm" id="service-detail-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="bg-[#1B2D5B] text-white p-5 sm:p-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded text-[#C9A84C]">
                    {selectedService.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                      {selectedService.title}
                    </h3>
                    <p className="text-[9px] text-[#C9A84C] uppercase tracking-widest font-bold font-sans mt-0.5">
                      B2B Specialized Consulting Services
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1 rounded bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/25 text-white transition-colors cursor-pointer"
                  aria-label="Close details dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto text-left">
                <div>
                  <h4 className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider mb-1 font-mono">Scope & Methodology</h4>
                  <p className="font-sans text-slate-700 leading-relaxed font-light text-xs sm:text-sm">
                    {selectedService.longDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-[#1B2D5B] uppercase tracking-wider mb-2 font-mono">Service Activities & Deliverables</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 font-light leading-snug">
                        <Check className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded bg-gray-50 border-l-4 border-[#C9A84C] flex gap-2.5">
                  <Info className="w-4 h-4 text-[#1B2D5B] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-bold text-[#1B2D5B] uppercase tracking-wide">Target Audiences</h5>
                    <p className="text-xs text-slate-600 leading-snug font-light mt-0.5">
                      {selectedService.idealFor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="border-t border-slate-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50">
                <p className="text-[10px] text-slate-500 font-light">
                  Georgia Real Estate licensed advisory service reference.
                </p>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      smoothScrollTo("contact");
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-[#C9A84C] text-[#1B2D5B] font-bold text-xs uppercase tracking-wide rounded border border-[#C9A84C] hover:bg-transparent hover:text-brand-navy transition-colors text-center cursor-pointer"
                  >
                    Contact an Advisor
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium text-xs rounded hover:bg-slate-50 transition-colors text-center cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <a 
        href="https://auroraadv.co/?tab=wizard"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-28 h-28 bg-[#1B2D5B] text-white rounded-full flex items-center justify-center p-3 text-center shadow-[0_4px_20px_rgba(27,45,91,0.4)] border-2 border-[#C9A84C] hover:scale-110 hover:shadow-[0_4px_25px_rgba(201,168,76,0.4)] transition-all duration-300 cursor-pointer group"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest leading-snug group-hover:text-[#C9A84C] transition-colors">
          Get this website <br />
          <span className="text-[#C9A84C] text-sm block mt-1 font-serif group-hover:text-white transition-colors">for only $999</span>
        </span>
      </a>

    </div>
  );
}
