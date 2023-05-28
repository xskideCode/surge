import ChannelModal from "@components/modals/ChannelModal";
import ImageModal from "@components/modals/ImageModal";
import SocialsModal from "@components/modals/SocialsModal";
import UserInfoModal from "@components/modals/UserInfoModal";
import VideoModal from "@components/modals/VideoModal";
import Tabs from "@components/profile/Tabs";
import Provider from "@components/providers/Provider";

const ProfileLayout = ({ children }) => (
  <Provider>
    <div>
      <Tabs />
      <UserInfoModal />
      <SocialsModal />
      <ImageModal />
      <ChannelModal />
      <VideoModal />
      {children}
    </div>
  </Provider>
);

export default ProfileLayout;
