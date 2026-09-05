// src/components/plans/PlanCard.jsx

import { Check } from "lucide-react";

const PlanCard = ({ plan, popular = false }) => {
  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 shadow-sm ease-in-out transition hover:-translate-y-1 hover:shadow-lg
      ${
        popular
          ? "border-[#2e2751] shadow-lg"
          : "border-gray-200"
      }`}
    >

      {popular && (
        <span className="absolute right-4 top-4 rounded-full bg-[#2e2751] px-3 py-1 text-xs text-white">
          Popular
        </span>
      )}
      <div className="bg-[#ae7027] rounded-md">
      <h3 className="text-2xl font-bold text-white  px-4 py-2 text-center">
        {plan.name}
      </h3>
      </div>

      <div className="mt-6 space-y-3">

        <Price
          label="6 Month"
          value={plan.prices.sixMonth}
        />

        <Price
          label="1 Year"
          value={plan.prices.oneYear}
        />

        <Price
          label="2 Year"
          value={plan.prices.twoYear}
        />

      </div>

      <div className="mt-6 border-t pt-5">

        <p className="flex items-center gap-2 text-sm text-gray-600">
          <Check size={16} />
          {plan.mailAccess}
        </p>

        <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <Check size={16} />
          Mail {plan.mailDuration}
        </p>

      </div>
      <div className="mt-6 flex justify-center items-center text-center">
      <a href="/contact"
        className=" w-full rounded-md bg-[#2e2751] px-5 py-3
                   font-semibold text-white transition hover:opacity-90"
      >
        Get Started
      </a>
      </div>

    </div>
  );
};


const Price = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">
      {label}
    </span>

    <span className="font-bold">
      ₹{value.toLocaleString("en-IN")}
    </span>
  </div>
);

export default PlanCard;