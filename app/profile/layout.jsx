import ChannelModal from "@components/modals/ChannelModal";
import DeleteModal from "@components/modals/DeleteModal";
import SocialsModal from "@components/modals/SocialsModal";
import UserInfoModal from "@components/modals/UserInfoModal";
import VideoModal from "@components/modals/VideoModal";
import Tabs from "@components/profile/Tabs";

const ProfileLayout = ({ children }) => (
    <div>
      <Tabs />
      <UserInfoModal />
      <SocialsModal />
      <DeleteModal />
      <ChannelModal />
      <VideoModal />
      {children}
    </div>
);

export default ProfileLayout;
