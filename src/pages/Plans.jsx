// src/pages/Plans.jsx

import PageBanner from "../components/common/PageBanner";
import Navbar from "../components/home/Navbar";
import TopContact from "../components/home/TopContact";
import SectionTitle from "../components/common/SectionTitle";
import CTASection from "../components/common/CTASection";
import PlanCard from "../components/plans/PlanCard";
import Footer from "../components/home/Footer";

import { plans } from "../data/plans";
// import TopContact from "../components/home/TopContact";

const Plans = () => {
  return (
    <div>
      <TopContact />
      <Navbar />
      <PageBanner
        title="Pricing Plan"
        breadcrumb="Plans"
      />

      <section className="bg-gray-50 px-4 py-16 sm:py-20">

        <div className="mx-auto max-w-7xl">

          <SectionTitle
            subtitle="Pricing"
            title="Choose the Right Plan for Your Business"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {plans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                popular={index === 2}
              />
            ))}

          </div>

        </div>

      </section>

      <CTASection />
      <Footer />

    </div>
  );
};

export default Plans;