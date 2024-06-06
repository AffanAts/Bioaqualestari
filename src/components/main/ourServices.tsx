import React from 'react';
import {dataServices}  from './page';

const Services: React.FC = () => {
  return (
    <div className="bg-white font-sans min-h-96">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            Our Services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
          {dataServices.map(post => (
            <div key={post.id} className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative transition-all duration-300 group">
              <img src={post.imageUrl} alt={`Blog Post ${post.id}`} className="w-full h-60 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white text-center">
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <hr className="my-6 border-gray-300" />
                  <p className="text-sm">{post.description}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold absolute bottom-4 left-4 z-10 text-white p-2 transition-opacity duration-300 group-hover:opacity-0">
                {post.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
