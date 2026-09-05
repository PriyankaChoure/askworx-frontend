// src/pages/About.jsx

import PageBanner from "../components/common/PageBanner";
// import SectionTitle from "../components/common/SectionTitle";
import CTASection from "../components/common/CTASection";
import Navbar from "../components/home/Navbar";
import TopContact from "../components/home/TopContact";
import Footer from "../components/home/Footer";

// const About = () => {
//   const steps = [
//     {
//       number: "01",
//       title: "Get Customer Detail",
//       description:
//         "Get entire detail of the project like project officials, contact numbers, locations, area and cost of project.",
//     },
//     {
//       number: "02",
//       title: "Contact With Them",
//       description:
//         "Contact directly with project officials through mails, telephone, one-to-one meeting and send brochures, quotation and samples.",
//     },
//     {
//       number: "03",
//       title: "Get Order",
//       description:
//         "Get your purchase order, send pro-forma and terms and conditions.",
//     },
//   ];

//   const pillars = [
//     {
//       title: "Sales Funnel",
//       description:
//         "We provide customer lists which help you find prospects and build better customer relationships.",
//     },
//     {
//       title: "Network",
//       description:
//         "A strong network enables you to access multiple project data and enhance your brand value.",
//     },
//     {
//       title: "Strategy",
//       description:
//         "Focused strategies help your marketing and sales team reach definite customers with minimum investment.",
//     },
//     {
//       title: "Data",
//       description:
//         "Qualitative project data helps planning, forecasting and business growth.",
//     },
//     {
//       title: "Market",
//       description:
//         "Market insights help you understand the present market scenario and future opportunities.",
//     },
//     {
//       title: "Competitive Advantage",
//       description:
//         "Early and detailed project information gives you an edge over your competitors.",
//     },
//   ];

//   return (
//     <div>
//       <TopContact />
//       <Navbar />
//       <PageBanner title="About Company" />

//       {/* Introduction */}
//       <section className="px-4 py-16 sm:py-20">

//         <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

//           <div>
//             <p className="text-sm font-semibold uppercase tracking-wider text-[#2e2751]">
//               About AskWorx
//             </p>

//             <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//               How AskWorx Helps Your Business
//             </h2>

//             <p className="mt-5 leading-7 text-gray-600">
//               AskWorx helps businesses discover authentic upcoming project
//               information, connect with project decision makers and identify
//               opportunities that match their requirements.
//             </p>

//             <p className="mt-4 leading-7 text-gray-600">
//               Our platform connects businesses with relevant project
//               opportunities and helps them expand their market reach.
//             </p>
//           </div>

//           {/* Placeholder */}
//           <div className="flex h-80 items-center justify-center rounded-2xl bg-gray-200">
//             <span className="text-gray-500">
//               About Image Placeholder
//             </span>
//           </div>

//         </div>

//       </section>


//       {/* Three steps */}
//       <section className="bg-gray-50 px-4 py-16 sm:py-20">

//         <div className="mx-auto max-w-7xl">

//           <SectionTitle
//             title="Grow Your Business in Three Simple Steps"
//           />

//           <div className="grid gap-8 md:grid-cols-3">

//             {steps.map((step) => (
//               <div
//                 key={step.number}
//                 className="rounded-xl bg-white p-7 shadow-sm"
//               >

//                 <span className="text-4xl font-bold text-[#2e2751]">
//                   {step.number}
//                 </span>

//                 <h3 className="mt-5 text-xl font-bold">
//                   {step.title}
//                 </h3>

//                 <p className="mt-3 leading-7 text-gray-600">
//                   {step.description}
//                 </p>

//               </div>
//             ))}

//           </div>

//         </div>

//       </section>


//       {/* Six pillars */}
//       <section className="px-4 py-16 sm:py-20">

//         <div className="mx-auto max-w-7xl">

//           <SectionTitle
//             subtitle="Six Pillars of AskWorx"
//             title="Pillars That Help Grow Your Business"
//           />

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

//             {pillars.map((pillar) => (
//               <div
//                 key={pillar.title}
//                 className="rounded-xl border bg-white p-6
//                            transition hover:-translate-y-1 hover:shadow-lg"
//               >

//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2e2751] text-xl text-white">
//                   ✓
//                 </div>

//                 <h3 className="mt-5 text-xl font-bold">
//                   {pillar.title}
//                 </h3>

//                 <p className="mt-3 text-sm leading-6 text-gray-600">
//                   {pillar.description}
//                 </p>

//               </div>
//             ))}

//           </div>

//         </div>

//       </section>


//       {/* Statistics */}
//       <section className="bg-[#2e2751] px-4 py-16 text-white">

//         <div className="mx-auto max-w-7xl">

//           <SectionTitle
//             title="Market Analysis & Insights"
//             description="Analyze, Generate & Deliver data of thousands of projects from all over the country every year."
//           />

//           <div className="grid gap-8 text-center md:grid-cols-3">

//             <Stat number="20,000+" label="Projects" />

//             <Stat number="100 CR +" label="Area (SqFt)" />

//             <Stat number="300000 CR +" label="Cost (INR)" />

//           </div>

//         </div>

//       </section>


//       <CTASection />

//     </div>
//   );
// };


// const Stat = ({ number, label }) => (
//   <div>
//     <p className="text-4xl font-bold sm:text-5xl">
//       {number}
//     </p>

//     <p className="mt-2 text-gray-300">
//       {label}
//     </p>
//   </div>
// );

const About = () => {
  return (
    <div>
      <TopContact />
      <Navbar />
      <PageBanner title="About Us" breadcrumb="About Us" />

      {/* Intro */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="flex h-30 items-center justify-center rounded-2xl bg-gray-200">
          <img
            src="/images/services/excellence.png"
            alt="Excellence"
            className="mx-auto object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          </div>
    <div className="items-center h-full justify-center rounded-2xl ">
          {/* <h1 className="text-3xl font-bold sm:text-4xl"> */}
            {/* <span>
            About Ask Worx
            </span> */}
            <h2 className="text-3xl font-bold text-[#2e2751] ">
              Excellence Market Intelligence
            </h2>
          {/* </h1> */}

          <p className="mt-6 leading-7 text-gray-600">
            Askworx is a <strong>Market intelligence platform</strong> to
            support our customers magnify their business growth and fulfill
            their project requirements through the data delivered to them by
            our experienced market research teams.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Our services enable you to know about the projects of your
            interest, help you maximize your profits and allow you to target
            your energy in the domains of your concern and expertise.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Our experienced and dedicated team makes it easier for you to
            build great market strategies and create strong business
            relations in private as well as public sector.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            So, with the data of around <strong>30 lakh+ projects</strong>{" "}
            covering 100cr+ area with detailed stage-wise data of projects
            from 4 major sectors from all across the country, Askworx helps
            you connect with multiple projects and companies. It assists you
            to optimize your potential to the fullest and make the best use
            of new opportunities.
          </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-[#2e2751]">
              Our Mission
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Our aim is to help our customers grow by providing an ocean of
              market opportunities at one stop and render them strategic
              marketing decisions to increase the profitability and foothold
              of their organization/business.
            </p>
          </div>

          <div className="flex h-30 items-center justify-center rounded-2xl bg-gray-200">
            <img
              src="/images/services/OurMission.png"
              alt="Our Mission"
              className="object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="order-2 flex h-30 items-center justify-center rounded-2xl bg-gray-200 lg:order-1">
            <img
              src="/images/services/OurVision.png"
              alt="Our Vision"
              className="object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-[#2e2751]">
              Our Vision
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Our goal is to become the leading and most trusted service
              provider in the field of construction and to act as a bridge
              between the customer and market/projects.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;