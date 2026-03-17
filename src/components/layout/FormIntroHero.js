import Image from "next/image";

const FormIntroHero = ({ title, imageSrc }) => {
  return (
    <section 
    className="relative h-[9rem] lg:h-[30rem] w-full"
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        aria-hidden="true"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div 
      className="absolute inset-0 bg-[#0075C9BF]"
      />
        <div className="relative px-[0.8rem] text-white text-center top-[40%] translate-y-[-40%] z-10">
          <h1 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem]">
            {title}
          </h1>
        </div>
    </section>
  );
};

export default FormIntroHero;
