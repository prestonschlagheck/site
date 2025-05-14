'use client';

import React from 'react';

// Define types
type Position = {
  title: string;
  period: string;
  location: string;
  description?: string;
  responsibilities?: string[];
};

type Experience = {
  company: string;
  positions: Position[];
  logoInitial: string;
};

// Experience data - Sorted by recency
const experiences: Experience[] = [
  {
    company: "Madison Country Club",
    positions: [
      {
        title: "Member Services Associate",
        period: "May 2025 - Present · 1 mo",
        location: "Madison, Connecticut",
        responsibilities: [
          "Process an average of $10,000+ in daily transactions through club POS, including green fees, member charges, and additional invoices",
          "Manage and schedule over 80 member tee times per day using booking software, optimizing course flow and availability",
          "Serve as the first point of contact for over 500 members, ensuring accurate check-ins and resolving issues related to bookings, billing, or services"
        ]
      },
      {
        title: "Outside Operations Assistant",
        period: "Apr 2022 - May 2025 · 3 yrs 2 mos",
        description: "Seasonal",
        location: "Madison, Connecticut",
        responsibilities: [
          "Plan and coordinate 14 major tournaments and social events annually, directing staff to meet operational deadlines",
          "Assist with processing thousands of dollar of event registrations, merchandise sales, and membership inquiries",
          "Oversee and manage an average of 100 daily tee times and maintain a fleet of 50 golf carts to meet club standards"
        ]
      }
    ],
    logoInitial: "M"
  },
  {
    company: "Sigma Phi Epsilon (Official)",
    positions: [
      {
        title: "Graphic & Apparel Design Chair",
        period: "Nov 2024 - Present · 7 mos",
        location: "Columbia, South Carolina"
      },
      {
        title: "Mental Health Chair",
        period: "Jan 2025 - Present · 5 mos",
        location: "Columbia, South Carolina"
      },
      {
        title: "ACE Chair",
        period: "Mar 2025 - Present · 3 mos",
        location: "Columbia, South Carolina"
      },
      {
        title: "Member",
        period: "Oct 2024 - Present · 8 mos",
        location: "Columbia, South Carolina",
        responsibilities: [
          "Member of Finance, Recruitment, Programming, and Communications committees"
        ]
      }
    ],
    logoInitial: "Σ"
  },
  {
    company: "Alpha Kappa Psi - Beta Upsilon",
    positions: [
      {
        title: "Member",
        period: "Apr 2025 - Present · 2 mos",
        location: "Columbia, South Carolina"
      }
    ],
    logoInitial: "A"
  },
  {
    company: "Guilford Fund For Education",
    positions: [
      {
        title: "Web Developer",
        period: "Oct 2021 - Present · 3 yrs 8 mos",
        description: "Internship",
        location: "Guilford, Connecticut",
        responsibilities: [
          "Developed 30 web pages, providing website maintenance to enhance user experience and organizational outreach",
          "Assisted sponsor recruitment efforts, securing and retaining over 40 sponsors to ensure stable financial contributions",
          "Managed email campaigns and distributions, reaching 750+ subscribers with newsletters and fundraising initiatives"
        ]
      }
    ],
    logoInitial: "G"
  },
  {
    company: "Trinity Institute for Applied Neuroscience & Spirituality",
    positions: [
      {
        title: "Summer Research Intern",
        period: "Jun 2021 - Aug 2021 · 3 mos",
        description: "Internship",
        location: "New Haven, Connecticut, United States",
        responsibilities: [
          "Designed and structured the organization's website to enhance accessibility, functionality, and user engagement",
          "Conducted an analysis of 10 academic studies, summarizing key findings and creating visuals to enhance analysis",
          "Met with researchers to source, analyze, and format scholarly documents for online content and external publications"
        ]
      }
    ],
    logoInitial: "T"
  }
];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="w-full py-20 bg-[#161616]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-12 tracking-tight">
          Experience
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${index}`}
              className="bg-[#1a1a1a] border border-gray-800 rounded-md p-6 transition-all duration-300 hover:border-gray-700 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#242424] rounded-md flex items-center justify-center text-lg font-medium">
                  {exp.logoInitial}
                </div>
                <div>
                  <h3 className="font-medium text-white">{exp.company}</h3>
                  <p className="text-sm text-gray-400">{exp.positions[0].location}</p>
                </div>
              </div>
              
              <div className="space-y-3 flex-grow">
                {exp.positions.map((position, posIndex) => (
                  <div key={`${position.title}-${posIndex}`} className="border-l border-gray-700 pl-3 py-1">
                    <h4 className="font-medium text-sm text-white">{position.title}</h4>
                    <p className="text-xs text-gray-400 mb-1">{position.period}</p>
                    
                    {position.description && (
                      <p className="text-xs text-gray-500 mb-1">{position.description}</p>
                    )}
                    
                    {position.responsibilities && (
                      <ul className="text-xs text-gray-400 space-y-1 mt-2">
                        {position.responsibilities.slice(0, 2).map((resp, respIndex) => (
                          <li key={respIndex} className="line-clamp-2">{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://www.linkedin.com/in/preston-schlagheck/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 