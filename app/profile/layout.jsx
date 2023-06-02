import ChannelModal from "@components/modals/ChannelModal";
import DelUserModal from "@components/modals/DelUserModal";
import SocialsModal from "@components/modals/SocialsModal";
import UpdateChannelModal from "@components/modals/UpdateChannelModal";
import UpdateModal from "@components/modals/UpdateModal";
import UserInfoModal from "@components/modals/UserInfoModal";
import VideoModal from "@components/modals/VideoModal";
import Tabs from "@components/profile/Tabs";

const ProfileLayout = ({ children }) => (
    <div>
      <Tabs />
      <UserInfoModal />
      <SocialsModal />
      <DelUserModal />
      <ChannelModal />
      <VideoModal />
      <UpdateModal />
      <UpdateChannelModal />
      {children}
    </div>
);

export default ProfileLayout;
