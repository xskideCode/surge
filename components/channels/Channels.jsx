
import ChannelCard from "./ChannelCard";
import Container from "@components/Container";

const Channels = ({ channels , currentUser }) => {
  return (
    <Container>
      <div
        className="
            pt-14
            grid 
            grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-1 
            lg:grid-cols-2
            xl:grid-cols-1
            2xl:grid-cols-1
            gap-8
          "
      >
        {channels.map((channel) => (
          <ChannelCard
            currentUser={currentUser}
            key={channel._id}
            data={channel}
          />
        ))}
      </div>
    </Container>
  );
};

export default Channels;
