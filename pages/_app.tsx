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
        <Component {...pageProps} />
      {/* <div className="z-10 fixed top-0 w-full">
      </div> */}
      
    </>
  );
}
export default MyApp;
