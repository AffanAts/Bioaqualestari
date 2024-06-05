import React from 'react';

const Services = () => {
  return (
    <div className="bg-white font-sans  min-h-96">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            LATEST BLOGS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
          <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative transition-all duration-300">
            <img src="https://readymadeui.com/Imagination.webp" alt="Blog Post 1" className="w-full h-60 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white text-center">
              <div>
                <span className="text-sm block mb-2">10 FEB 2023 | BY JOHN DOE</span>
                <h3 className="text-xl font-bold">A Guide to Igniting Your Imagination</h3>
                <hr className="my-6 border-gray-300" />
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              </div>
            </div>
          </div>
          <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative transition-all duration-300">
            <img src="https://readymadeui.com/hacks-watch.webp" alt="Blog Post 2" className="w-full h-60 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white text-center">
              <div>
                <span className="text-sm block mb-2">7 JUN 2023 | BY MARK ADAIR</span>
                <h3 className="text-xl font-bold">Hacks to Supercharge Your Day</h3>
                <hr className="my-6 border-gray-300" />
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              </div>
            </div>
          </div>
          <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative transition-all duration-300">
            <img src="https://readymadeui.com/prediction.webp" alt="Blog Post 3" className="w-full h-60 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white text-center">
              <div>
                <span className="text-sm block mb-2">5 OCT 2023 | BY SIMON KONECKI</span>
                <h3 className="text-xl font-bold">Trends and Predictions</h3>
                <hr className="my-6 border-gray-300" />
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
