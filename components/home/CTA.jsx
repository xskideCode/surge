import Button from "@components/Button";
import useRegisterModal from "@hooks/useRegisterModal";

const CTA = () => {
  const registerModal = useRegisterModal();

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/ByUHkv7nNd", "_blank");
  };

  return (
    <section
      className="
      flex_center 
      margin_y 
      padding 
      sm:flex-row 
      flex-col 
      bg-black-gradient-2 
      rounded-[20px] 
      box-shadow 
      md:mx-0 
      mx-2
    "
    >
      <div className="flex-1 flex flex-col">
        <h2 className="heading2">Join our Discord community</h2>
        <p className="paragraph max-w-[470px] mt-5">
          Come join our Discord server! We're a welcoming community of small
          YouTube channels who support and help each other grow.
        </p>
      </div>

      <div className="flex_center min-w-[100px] sm:ml-10 ml-0 sm:mt-0 mt-10">
        <Button
          type="button"
          label={`Join Us`}
          
          onClick={handleJoinDiscord}
        />
      </div>
    </section>
  );
};

export default CTA;
