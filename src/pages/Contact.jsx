// src/pages/Contact.jsx

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import PageBanner from "../components/common/PageBanner";
import SectionTitle from "../components/common/SectionTitle";
import CTASection from "../components/common/CTASection";
import { siteConfig } from "../config/siteConfig";

const Contact = () => {
  return (
    <div>

      <PageBanner title="Contact Us" />

      <section className="px-4 py-16 sm:py-20">

        <div className="mx-auto max-w-7xl">

          <SectionTitle
            subtitle="Contact"
            title="Get In Touch"
            description="We would love to hear from you. Share your requirements with us."
          />

          <div className="grid gap-10 lg:grid-cols-2">

            {/* Contact information */}
            <div className="space-y-6">

              <ContactItem
                icon={<Phone />}
                title="Call Us Now"
                value={siteConfig.contact.phone}
                href={`tel:${siteConfig.contact.phone}`}
              />

              <ContactItem
                icon={<Mail />}
                title="Email Us"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />

              <ContactItem
                icon={<MapPin />}
                title="Reach Us"
                value={siteConfig.contact.address}
              />

              {/* Map placeholder */}
              <div className="flex h-64 items-center justify-center rounded-xl bg-gray-200">
                <p className="text-gray-500">
                  Google Map Placeholder
                </p>
              </div>

            </div>


            {/* Form */}
            <div className="rounded-2xl bg-gray-50 p-6 sm:p-8">

              <h3 className="text-2xl font-bold text-[#2e2751]">
                Send Us a Message
              </h3>

              <form className="mt-6 space-y-5">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#2e2751]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-md border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#2e2751]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-md border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#2e2751]"
                />

                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full rounded-md border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#2e2751]"
                />

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#2e2751] px-6 py-3
                             font-semibold text-white hover:opacity-90"
                >
                  Send Now
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      <CTASection />

    </div>
  );
};


const ContactItem = ({ icon, title, value, href }) => {
  const content = (
    <div className="flex gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2e2751] text-white">
        {icon}
      </div>

      <div>
        <h3 className="font-bold">
          {title}
        </h3>

        <p className="mt-1 text-gray-600">
          {value}
        </p>
      </div>

    </div>
  );

  return href ? (
    <a href={href}>{content}</a>
  ) : (
    content
  );
};

export default Contact;