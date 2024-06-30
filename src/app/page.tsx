import Image from "next/image";
import { Header, Footer } from "../components/navbar/page";
import {
  LandingPage,
  Services,
  AboutUs,
  ContactUs,
  OurAdvantages,
  Client,
  Blogs,
  OurProject,
} from "../components/main/page";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="">
        <LandingPage></LandingPage>

        <AboutUs></AboutUs>

        <div className="py-10 bg-white  ">
          <Services></Services>
        </div>
        {/* <Products></Products> */}
        <ContactUs></ContactUs>
        <div className="bg-gradient-to-b from-white to-blue-950 p-8 text-black">
          <OurAdvantages></OurAdvantages>
          <OurProject></OurProject>
        </div>
        <Client></Client>
        <Blogs></Blogs>
        <Footer></Footer>
      </div>
    </>
  );
}
