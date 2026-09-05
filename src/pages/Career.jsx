// src/pages/Career.jsx

import PageBanner from "../components/common/PageBanner";
import SectionTitle from "../components/common/SectionTitle";
import CTASection from "../components/common/CTASection";

import { siteConfig } from "../config/siteConfig";
import { jobs } from "../data/jobs";

const Career = () => {
  const job = jobs[0];

  return (
    <div>

      <PageBanner title="Career" />

      <section className="px-4 py-16 sm:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* Application form */}
            <div className="rounded-2xl bg-gray-50 p-6 sm:p-8">

              <SectionTitle
                title="Fill Your Details Here"
              />

              <form className="space-y-5">

                <select
                  className="w-full rounded-md border bg-white px-4 py-3"
                >
                  <option>
                    Select Job Title
                  </option>

                  {jobs.map((item) => (
                    <option key={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-md border bg-white px-4 py-3"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-md border bg-white px-4 py-3"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-md border bg-white px-4 py-3"
                />

                <input
                  type="file"
                  className="w-full rounded-md border bg-white px-4 py-3"
                />

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#2e2751] px-6 py-3
                             font-semibold text-white hover:opacity-90"
                >
                  Send Now
                </button>

              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Or email your details on{" "}
                <a
                  href={`mailto:${siteConfig.contact.careerEmail}`}
                  className="font-semibold text-[#2e2751]"
                >
                  {siteConfig.contact.careerEmail}
                </a>
              </p>

            </div>


            {/* Job details */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#2e2751]">
                Job Title
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {job.title}
              </h2>


              <JobSection
                title="Job Specification"
                items={job.responsibilities}
              />

              <JobSection
                title="Desired Profile"
                items={job.desiredProfile}
              />


              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-lg bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Job Location
                  </p>

                  <p className="mt-1 font-semibold">
                    {job.location}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Average CTC
                  </p>

                  <p className="mt-1 font-semibold">
                    {job.ctc}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <CTASection />

    </div>
  );
};


const JobSection = ({ title, items }) => (
  <div className="mt-8">

    <h3 className="text-xl font-bold text-[#2e2751]">
      {title}
    </h3>

    <ul className="mt-4 space-y-3">

      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-gray-600"
        >
          <span className="text-[#2e2751]">✓</span>
          {item}
        </li>
      ))}

    </ul>

  </div>
);

export default Career;