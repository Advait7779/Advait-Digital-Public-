import SEOHead from '../components/SEOHead';
import { 
  Briefcase, GraduationCap, Users, MapPin, Clock, 
  CheckCircle, Phone, Envelope
} from '@phosphor-icons/react';

export default function Careers() {
  const openPositions = [
    {
      title: 'Full Stack Developer',
      icon: Briefcase,
      color: 'text-brand-orange bg-brand-orange/10',
      qualification: 'Graduate / Under Graduate',
      vacancies: 2,
      location: 'Pune (Hadapsar)',
      type: 'Full-time',
      responsibilities: [
        'Design, develop, and maintain end-to-end web applications using the MERN stack.',
        'Build responsive, pixel-perfect, and reusable UI components using React.js.',
        'Develop and manage high-performance RESTful APIs and backend services with Node.js and Express.js.',
        'Proficient in ReactJS, ExpressJS, Node.js, and MongoDB for secure backend and database management.'
      ]
    },
    {
      title: 'Sales Executive',
      icon: Briefcase,
      color: 'text-emerald-600 bg-emerald-50',
      qualification: 'Graduate / Under Graduate',
      vacancies: 5,
      location: 'Pune (Hadapsar)',
      type: 'Full-time',
      responsibilities: [
        'Proven experience as a Sales Executive, Business Development executive, or similar role.',
        'Engage with prospective clients to pitch enterprise communication solutions and close leads.',
        'Thorough understanding of marketing, pitching, and negotiating techniques.',
        'Excellent verbal and written communication and presentation skills.',
        'Fast learner with a strong passion for technology sales and client relationship building.',
        'Freshers with excellent communication skills can also apply.'
      ]
    }
  ];

  return (
    <div className="pt-24 space-y-12 sm:space-y-16 md:space-y-20 pb-12 sm:pb-16 md:pb-20 bg-[#fbfbf7]">
      <SEOHead
        title="Careers at Advait Digital — Jobs in Pune for Developers & Sales Executives"
        description="Join Advait Digital's growing team in Pune. We are hiring Full Stack Developers and Sales Executives for our digital marketing and bulk messaging business in Hadapsar, Pune."
        keywords="jobs at Advait Digital, careers Advait Digital Pune, Full Stack Developer job Pune, Sales Executive job Pune, Hadapsar jobs, digital marketing jobs Pune, tech jobs Pune, messaging company jobs"
        canonical="/careers"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://advaitdigital.co.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Careers",
              "item": "https://advaitdigital.co.in/careers"
            }
          ]
        }}
      />
      {/* Hero Section */}
      <section className="bg-brand-charcoal text-white py-10 sm:py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
            Careers at Advait Digital
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight mt-4">
            Want to Join Our Growing Team?
          </h1>
          <p className="text-[#E5E4DE]/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4 font-medium">
            At Advait Digital, we offer excellent opportunities to talented individuals. We need talented, enthusiastic, and self-starters like you to build next-generation communication and marketing solutions.
          </p>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 border border-brand-charcoal/5 shadow-md bg-white text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">How to Apply</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-charcoal">
              Start Your Journey With Us
            </h2>
            <p className="text-brand-charcoal-light text-xs sm:text-sm max-w-md mx-auto font-medium">
              If you want to be a part of our exciting journey, simply reach out to us directly via phone call or send your CV/Resume to our recruitment inbox.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
            <a 
              href="tel:+918282982829" 
              className="flex items-center gap-3 bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 w-full sm:w-auto justify-center shadow-md shadow-brand-orange/15 hover:scale-[1.01]"
            >
              <Phone size={18} weight="fill" />
              Call: +91 8282982829
            </a>
            <a 
              href="mailto:sales@advaitteleservices.com" 
              className="flex items-center gap-3 bg-brand-charcoal hover:bg-brand-orange text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 w-full sm:w-auto justify-center shadow-md hover:scale-[1.01]"
            >
              <Envelope size={18} weight="fill" />
              Email: sales@advaitteleservices.com
            </a>
          </div>
        </div>
      </section>

      {/* Open Positions Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center md:text-left border-b border-brand-charcoal/10 pb-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal inline-flex items-center gap-3">
            Open Positions
            <span className="text-xs font-sans bg-brand-orange/10 text-brand-orange font-bold px-3 py-1 rounded-full">
              2 Roles Available
            </span>
          </h2>
        </div>

        {/* Side-by-Side Job Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {openPositions.map((job, idx) => {
            const Icon = job.icon;

            return (
              <div 
                key={idx} 
                className="glass-card rounded-3xl border border-brand-charcoal/5 shadow-md bg-white p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-brand-orange/20 transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Job Header */}
                  <div className="flex gap-4 items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${job.color}`}>
                      <Icon size={24} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-charcoal text-lg sm:text-xl font-serif">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-brand-charcoal-light font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-brand-orange" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-brand-orange" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Info Boxes (Qualification & Vacancies) */}
                  <div className="grid grid-cols-2 gap-4 bg-[#fbfbf7] border border-brand-charcoal/5 p-4 rounded-2xl text-xs sm:text-sm font-semibold text-brand-charcoal-light">
                    <div className="flex items-start gap-2">
                      <GraduationCap size={18} className="text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Qualification</p>
                        <p className="mt-0.5 leading-tight">{job.qualification}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users size={18} className="text-brand-orange shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vacancies</p>
                        <p className="mt-0.5 leading-tight">{job.vacancies} Positions</p>
                      </div>
                    </div>
                  </div>

                  {/* Job Responsibilities List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-xs text-brand-charcoal uppercase tracking-wider">
                      Responsibilities & Requirements
                    </h4>
                    <ul className="space-y-3">
                      {job.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex gap-3 text-xs sm:text-sm text-brand-charcoal-light leading-relaxed font-medium">
                          <CheckCircle size={18} className="text-brand-orange shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
