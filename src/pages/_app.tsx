import { EventProvider } from "@/context/EventContext";
import { PlayerProvider } from "@/context/PlayersContext";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import Layout from "@/ui/layouts/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <EventProvider>
        <PlayerProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </PlayerProvider>
      </EventProvider>
    </Layout >
  )
}
