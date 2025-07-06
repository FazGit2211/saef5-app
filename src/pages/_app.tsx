import { PlayerProvider } from "@/context/PlayersContext";
import "@/styles/globals.css";
import Layout from "@/ui/layouts/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </Layout>
  )
}
