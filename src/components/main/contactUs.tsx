const ContactUs = () => {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-none p-4 shadow-lg bg-[url('https://tecdn.b-cdn.net/img/new/slides/041.webp')] bg-cover bg-no-repeat p-12 text-center text-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
        <div className="flex h-full mt-20 ms-10 justify-start ml-5">
          <div className="text-white text-left ml-5">
            <h2 className="mb-4 text-4xl font-semibold">
              Hubungi kami sekarang untuk solusi terbaik dalam memenuhi kebutuhan perizinan lingkungan Anda.
            </h2>
            <h4 className="mb-6 text-xl font-semibold">Subheading</h4>
            <button
              type="button"
              className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Call to action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
