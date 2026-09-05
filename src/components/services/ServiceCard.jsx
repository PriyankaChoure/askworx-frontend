// src/components/services/ServiceCard.jsx

const ServiceCard = ({ service }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      <div className="h-52 overflow-hidden bg-gray-200">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "/images/placeholders/service-placeholder.jpg";
          }}
        />
      </div>

      <div className="p-6">

        <h3 className="text-xl font-bold text-[#2e2751]">
          {service.title}
        </h3>

        <ul className="mt-4 space-y-2">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="mt-1 font-bold text-[#ae7027]">✓</span>
              {item}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default ServiceCard;