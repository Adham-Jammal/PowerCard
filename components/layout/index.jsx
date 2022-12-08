import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import MobileMenu from "./mobile-menu";
import walletService from "../../services/wallet";
import homeService from "../../services/home";
import { useSelector } from "react-redux";

export default function AppLayout({ children }) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [points, setPoints] = useState(0);
  const [logos, setLogos] = useState({
    header_light_logo: undefined,
    header_dark_logo: undefined,
    footer_light_logo: undefined,
    footer_dark_logo: undefined,
  });
  const [links, setLinks] = useState({
    twitter_url: null,
    facebook_url: null,
    instagram_url: null,
    youtube_url: null,
    whatsapp_url: null,
    snapchat_url: null,
    tiktok_url: null,
    linkedin_url: null,
    email_url: null,
  });

  const userName = useSelector((state) => state.auth.value.name);

  useEffect(() => {
    let walletResult = {};

    async function getSetting() {
      return await homeService.getSetting();
    }
    async function getData() {
      if (userName) walletResult = await walletService.getWallet();
    }
    getData().then(() => {
      if (userName) {
        setWallet(+walletResult?.data?.total | 0);
        setPoints(+walletResult?.data?.point | 0);
      }
    });
    getSetting().then((setting) => {
      setLogos({
        header_light_logo: setting.header_light_logo || null,
        header_dark_logo: setting.header_dark_logo || null,
        footer_light_logo: setting.footer_light_logo || null,
        footer_dark_logo: setting.footer_dark_logo || null,
      });
      setLinks({
        twitter_url: setting.twitter || null,
        facebook_url: setting.facebook || null,
        instagram_url: setting.instagram || null,
        youtube_url: setting.youtube || null,
        whatsapp_url: setting.whatsapp || null,
        snapchat_url: setting.snapchat || null,
        tiktok_url: setting.tiktok || null,
        linkedin_url: setting.linkedin || null,
        email_url: setting.email || null,
      });
    });
  }, []);
  return (
    <div id="dd">
      <Header
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        wallet={wallet}
        setPoints={setPoints}
        setWallet={setWallet}
        header_dark_logo={logos.header_dark_logo}
        header_light_logo={logos.header_light_logo}
      />
      <MobileMenu
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        points={points}
      />
      {children}
      <Footer
        footer_dark_logo={logos.footer_dark_logo}
        footer_light_logo={logos.footer_light_logo}
        links={links}
      />
    </div>
  );
}
