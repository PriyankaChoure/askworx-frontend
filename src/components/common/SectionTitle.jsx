const SectionTitle = ({ subtitle, title, description }) => {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {subtitle && (
        <span className="mb-4 text-3xl uppercase text-[#ae7027] font-bold">
          {subtitle}
        </span>
      )}

      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;