import Image from "next/image";
import { Header, Footer } from "../components/navbar/page";
import { LandingPage, Services, AboutUs, ContactUs, OurAdvantages, Client, Blogs, OurProject } from "../components/main/page";

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
      <OurAdvantages></OurAdvantages>
      <OurProject></OurProject>
      <Client></Client>
      <Blogs></Blogs>
      <Footer></Footer>
      </div>
    </>
  );
}
