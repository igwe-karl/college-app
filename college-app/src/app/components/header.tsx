import { mdiFacebook, mdiInstagram, mdiYoutube } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-orange-300 p-4">
      <div>
        <p className="text-4xl font-bold text-black">College App</p>
      </div>
      <div className="flex flex-row items-center justify-end bg-orange-300 p-4">
        <Icon
          path={mdiInstagram}
          title="User Profile"
          size={1.5}
          horizontal
          vertical
          rotate={90}
          color="red"
          spin
        />
        <Icon
          path={mdiYoutube}
          title="User Profile"
          size={1.5}
          horizontal
          vertical
          rotate={90}
          color="red"
          spin
        />
        <Icon
          path={mdiFacebook}
          title="User Profile"
          size={1.5}
          horizontal
          vertical
          rotate={90}
          color="blue"
          spin
        />
      </div>
    </div>
  );
};

export default Header;
