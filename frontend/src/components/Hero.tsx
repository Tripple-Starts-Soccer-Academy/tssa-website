import React from 'react';
import { Trophy, Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-yellow-400">TSSA Football Club</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Experience the passion, glory, and excitement of one of the most prestigious football clubs. 
              Join us on our journey to excellence both on and off the field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center">
                Buy Tickets
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Highlights
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24</div> 
                <div className="text-sm text-blue-100">Trophies Won</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15k</div>
                <div className="text-sm text-blue-100">Stadium Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">2017</div>
                <div className="text-sm text-blue-100">Year Founded</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/entryphotofortssa.jpg"
              alt="TSSA Young Players"
              className="rounded-md shadow-md w-md aspect-[3/4] object-cover h-80 w-95"
            />
            <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-blue-900 rounded-lg p-4 shadow-lg">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 mr-3" />
                <div>
                  <div className="font-bold">2023 Champions</div>
                  <div className="text-sm">2023 Esap tournament winners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
