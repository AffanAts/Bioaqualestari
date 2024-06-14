import Image from "next/image";
import { Header, Footer } from "../components/navbar/page";
import { LandingPage, Services, AboutUs, ContactUs,  } from "../components/main/page";

export default function Home() {
  return (
    <>
      <Header></Header>
      <LandingPage></LandingPage>
      <div className="bg-white">
        <AboutUs></AboutUs>
      </div>
      <div className="py-10 bg-white  ">
        <Services></Services>
      </div>
      {/* <Products></Products> */}
      <ContactUs></ContactUs>
      <Footer></Footer>
    </>
  );
}
