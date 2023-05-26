import Image from "next/image";

const Community = () => (
  <section id="product" className="sectionReverse">
    <div className="sectionImgReverse">
      <img
        src="/assets/images/community.png"
        alt="community"
        className="w-[90%]  relative z-[5]"
      />

      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient" />
    </div>

    <div className="sectionInfo">
      <h2 className="heading4 md:px-0 px-2">
        Welcome to our community <br className="sm:block hidden" />
        for small YouTube channels!{" "}
      </h2>
      <p className="paragraph max-w-[470px] mt-5 md:px-0 px-2">
        Our goal is to provide a supportive and collaborative space where
        creators can share their content, receive feedback and tips from their
        peers, and grow their channels. Whether you're just starting out on
        YouTube or have been making videos for a while, we invite you to join us
        and connect with other like-minded creators. Together, we can help each
        other succeed and reach a wider audience.
      </p>
      <div className="flex flex-row flex-wrap sm:mt-10 mt-6"></div>
    </div>
  </section>
);

export default Community;
