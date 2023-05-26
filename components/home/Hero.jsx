"use client";
import useRegisterModal from "@hooks/useRegisterModal";

const Hero = () => {
  const registerModal = useRegisterModal();

  return (
    <section id="home" className={`flex md:flex-row flex-col padding_y`}>
      <div className={`flex-1 flex_start flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-col justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] xs:text-[52px] text-[48px] text-white ss:leading-[100px] leading-[75px] text-center">
            Youtube Community <br className="sm:block hidden" />{" "}
          </h1>
          <p className={`paragraph text-center max-w-[470px] mt-5`}>
            A communtiy for small youtube channels. Get the opportunity to share
            content beyond your social circle and a few tips from the community
          </p>
          <div className={`flex_center mt-10`}>
            <button
              onClick={registerModal.onOpen}
              type="button"
              className={`py-3 px-6 bg-purple-700 font-poppins font-medium text-[18px] text-white outline-none rounded-[10px] transition-all transform ring-0 ring-gray-50 hover:ring-2 ring-opacity-80 duration-200`}
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
      <div className={`flex-1 flex flex_center md:my-0 my-10 relative`}>
        <img
          src="/assets/images/youtubelogo2.png"
          alt="youtubelogo"
          className="sm:max-w-[90%] max-w-[80%] relative z-[5] rounded-[30px] rotate-9"
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>
    </section>
  );
};

export default Hero;
