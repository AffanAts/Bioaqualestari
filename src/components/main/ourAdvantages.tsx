const OurAdvantages = () => {
  return (
    <>
      <div className="pt-10 text-center text-black">
        <h1 className="flex justify-center font-extrabold text-4xl">Kelebihan Kami</h1>
        <p className="pt-7 px-4 sm:px-10 md:px-20 lg:px-40">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quasi reprehenderit quis nesciunt expedita vitae, eveniet sit voluptatibus obcaecati nihil in. Necessitatibus rem cupiditate, dolorum et saepe alias ea laborum.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:items-start md:px-10">
        <img 
          src="https://www.designingbuildings.co.uk/w/images/4/4a/Construction_Workers.jpg" 
          alt="Construction Workers" 
          className="rounded-lg pt-10  md:ps-10" 
          style={{ width: "300px", height: "350px" }} 
        />
        <div className="pt-10 md:ps-10 text-center md:text-left">
          <div className="text-black">
            <h5 className="font-bold">Pengalaman Teruji</h5>
            <p>Kami telah membantu berbagai industri</p>
          </div>
          <div className="text-black pt-10 md:pt-20">
            <h5 className="font-bold">Pengalaman Teruji</h5>
            <p>Kami telah membantu berbagai industri</p>
          </div>
          <div className="text-black pt-10 md:pt-20">
            <h5 className="font-bold">Pengalaman Teruji</h5>
            <p>Kami telah membantu berbagai industri</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurAdvantages;
