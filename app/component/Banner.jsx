const Banner = () => {
  return (
    <section className="flex justify-center lg:flex-row sm:flex-col md:flex-col items-center min-h-[100vh] ">
      {/* Text Container */}
      <div className=" text-black  p-6 sm:px-12 md:p-16 lg:p-24 leading-6 text-justify">
        <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-4 leading-tight">
          Phones
        </h1>
        <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-medium mb-6">
          That Power Your Life
        </h2>
        <h4 className="text-[clamp(.5rem,2vw,2rem)] font-light mb-6">
          THE PERFORMANCE BEST
        </h4>
        <p className="text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed opacity-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Earum tempore
          sequi amet omnis aperiam accusamus.
        </p>
        <button className="bg-transparent border-2 shadow-lg text-black py-2 px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300">
          Learn More
        </button>
      </div>

      {/* Image Container */}
      <div className=" w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[600px] p-4">
        <div className="shadow-lg rounded-xl overflow-hidden">
          <img
            src="https://www.bigcmobiles.com/media/catalog/product/cache/6f935541fc7266f00577560114fa3a98/m/i/midnight_1.jpg"
            alt="Mobile Phone"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
