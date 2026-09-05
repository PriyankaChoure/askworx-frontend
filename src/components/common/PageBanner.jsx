const PageBanner = ({ title, breadcrumb, bgImageUrl }) => {
  return (
    <section className="bg-[#2e2751] px-4 py-16 text-white sm:py-20 overlay breadcrumb" style={{ backgroundImage: `url(${bgImageUrl ?? '/images/branding/OurServiceBanner.jpg'})` }}>
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <div className="mt-4 text-lg text-gray-300">
          <a href="/" className="hover:underline hover:text-[#ae7027] font-bold">Home</a><span className="mx-2">/</span> 
          <a href='/service' className="hover:underline hover:text-[#ae7027] font-bold">{breadcrumb || title} </a>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;