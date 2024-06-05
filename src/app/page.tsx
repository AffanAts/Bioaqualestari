import Image from "next/image";
import {Header, Footer} from "../components/navbar/page";
import {LandingPage, Services} from "../components/main/page";

export default function Home() {
  return (
    <>
    <Header></Header>
    <LandingPage></LandingPage>
    <Services></Services>
    <Footer></Footer>
    </>
  );
}
