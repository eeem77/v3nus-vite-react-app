import DataViewInfo from "./components/DataViewInfo";
import "primereact/resources/themes/soho-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Image } from "primereact/image";
import Particle from "./components/Particle";
import "./App.css";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <>
      <div id="header-app">
        <Particle></Particle>
      </div>
      <center>
        <div id="header-logo">
          <Image
            src="v3nus-boutique-logo-purple.png"
            alt="V3nus Boutique"
            width="300vw"
          />
        </div>
      </center>
      <DataViewInfo></DataViewInfo>
      <ScrollToTop smooth />
    </>
  );
}

export default App;
