"use client";
import Filter from "../common/filter";

const Hero = () => {
  const text1 = "أنت اختار";
  const text2 = "إكتشف العالم";

  return (
    <section className="relative bg-[var(--bg-1)] border-t lg:border-t-0">
      <div
        className="pt-[70px] sm:pt-[100px] md:pt-[150px] xl:pt-[180px] pb-16  px-3 bg-no-repeat bg-cover bg-black/10 relative h-[500px]"
        style={{
          backgroundImage: `url(/imgs/slide-one.jpg)`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-black/60 ">
          <div className="container grid items-center h-full">
            <div className="text-center relative z-30">
              <h1 className="text-6xl lg:text-7xl  font-secondary text-primary">
                {text1}
              </h1>
              <p className=" mx-auto max-w-[600px] font-primary text-4xl lg:text-7xl text-white mt-4 md:mt-7 mb-6 ">
                {text2}
              </p>
              <section className="mt-8">
                <Filter onChange={false} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
