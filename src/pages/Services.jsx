// src/pages/Services.jsx

import PageBanner from "../components/common/PageBanner";
import SectionTitle from "../components/common/SectionTitle";
import CTASection from "../components/common/CTASection";
import ServiceCard from "../components/services/ServiceCard";
import Navbar from "../components/home/Navbar";
import TopContact from "../components/home/TopContact";
import Footer from "../components/home/Footer";

import { services, projectStages } from "../data/services";
import { audiences } from "../data/audiences";

const Services = () => {
  return (
    <div>
      <TopContact />
      <Navbar />
      <PageBanner title="Our Services" bgImageUrl="/images/branding/OurServiceBanner.jpg" />

      {/* Sectors */}
      <section className="bg-gray-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <SectionTitle
            subtitle="Services"
            title="Sectors and Industries We Cover"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
              />
            ))}
          </div>

        </div>
      </section>


      {/* Project stages */}
      <section className="px-4 py-16 sm:py-20 bg-[#00008013]">
        <div className="mx-auto max-w-7xl p-4">

          <SectionTitle
            title="Stages of Project We Cover"
          />

          <div className="grid gap-6 md:grid-cols-5 ">

            {projectStages.map((stage) => (
              <div
                key={stage.number}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center"
              >
                <div 
                className="flex h-14 w-20 items-center justify-center  font-bold text-white"
                style= {{ backgroundImage: `url(${stage.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'rotate(-22deg)' }}
                >
                  {stage.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-center">
                  {stage.title}
                </h3>

                <p className="mt-3 text-lg leading-6 text-gray-600">
                  {stage.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>
      {/* To whom we serve */}
      <section className="bg-gray-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="To Whom We Serve" />

          <div className="grid gap-8 md:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >
                <div className="h-44 overflow-hidden bg-gray-200">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/placeholders/service-placeholder.jpg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2e2751]">{a.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer details */}
      <section className="bg-[#00008013] px-4 py-16">
        <div className="mx-auto max-w-5xl">

          <SectionTitle className="text-[#2e2751]"
            title="Customer Detail We Provide to You"
          />

          <div className="grid gap-6 md:grid-cols-3">

            <InfoBox 
              title="Project Details"
              items={[
                "Project Name",
                "Company Name",
                "Industry Type",
              ]}
            />

            <InfoBox
              title="Contact Details"
              items={[
                "Contact Person Name",
                "Designation",
                "Contact Number",
                "Mail ID",
                "Address",
                "Industrial Estate / SEZ",
                "Pin Code",
                "State & District",
              ]}
            />

            <InfoBox
              title="Project Features"
              items={[
                "Project Cost",
                "Company Area",
                "Height / No. of Floor",
                "Number of Shop / Office",
                "Contractor / Consultant / Architect Detail",
                "Manufacturing Product Cost",
              ]}
            />

          </div>

        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};


const InfoBox = ({ title, items }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h3 className="text-xl font-bold text-[#2e2751] border-b-4 border-[#ae7027] pb-3 mb-4">
      {title}
    </h3>
    
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-b pb-2 text-l text-[#2e2751]"
        >
          <div 
                className="h-10 w-15 inline-block"
                style= {{ backgroundImage: `url(${'/images/services/stagesBgImg.png/'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
          {item}
                  </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Services;