import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-[#ad7429] px-4 py-12 text-white opacity-1">
      <div className="mx-auto max-w-5xl text-center">

        <h2 className="text-3xl font-bold sm:text-4xl">
          We help our clients succeed with our smart insights
        </h2>

        <p className="mx-auto mt-5 text-gray-300">
          Our team of market experts is dedicated to helping our clients
          meet their strategic business goals.
        </p>

        <Link
          to="/contact"
          className="mt-8 inline-block rounded-md bg-white px-7 py-3
                     font-semibold text-[#2e2751]
                     transition hover:bg-gray-100"
        >
          Contact Us
        </Link>

      </div>
    </section>
  );
};

export default CTASection;