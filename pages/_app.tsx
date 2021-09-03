import "tailwindcss/tailwind.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import type { AppProps } from "next/app";

import dynamic from "next/dynamic";
const BackgroundImage = dynamic(() => import("components/BackgroundImage"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="z-10 fixed top-0 w-full">
        <Component {...pageProps} />
      </div>
      <div className="z-0 h-screen w-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        {/* <BackgroundImage /> */}
      </div>
    </>
  );
}
export default MyApp;
