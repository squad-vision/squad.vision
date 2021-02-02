import "../styles/globals.css";
import { VertoProvider } from "@verto/ui";

function MyApp({ Component, pageProps }) {
  return (
    <VertoProvider theme={"Light"}>
      <Component {...pageProps} />
    </VertoProvider>
  );
}

export default MyApp;
