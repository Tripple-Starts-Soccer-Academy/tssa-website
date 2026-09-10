import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheClub from './components/TheClub';
import MatchesPlayed from './components/MatchesPlayed';
import TrophiesWon from './components/TrophiesWon';
import PhotoGallery from './components/PhotoGallery';
import NextEvents from './components/NextEvents';
import OfficialStore from './components/OfficialStore';
import NewsReels from './components/NewsReels';
import YouTubeChannel from './components/YouTubeChannel';
import YearlySchedule from './components/YearlySchedule';
import Stadium from './components/Stadium';
import TassaPortal from './components/TassaPortal';

function App() {
  const [tassaOpen, setTassaOpen] = React.useState(false);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <TheClub />
      <MatchesPlayed />
      <TrophiesWon />
      <PhotoGallery />
      <NextEvents />
      <OfficialStore />
      <NewsReels />
      <YouTubeChannel />
      <YearlySchedule />
      <Stadium />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">TSSA</h3>
              <p className="text-gray-400">
                Triple Stars Soccer Academy - The Elephants of Mabira. Developing talent and supporting the boy child and girl child since 2016.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#club" className="hover:text-white">The Club</a></li>
                <li><a href="#matches" className="hover:text-white">Matches</a></li>
                <li><a href="#trophies" className="hover:text-white">Trophies</a></li>
                <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
                <li><a href="#store" className="hover:text-white">Store</a></li>
                <li><a href="#schedule" className="hover:text-white">Schedule</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Good Shepherd High School, Nansana</li>
                <li>Nansana Ward 7/8, Ochengi Zone</li>
                <li>Wakiso District, Uganda</li>
                <li>info@tssa.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">YouTube</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <button
              onClick={() => setTassaOpen(true)}
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors mb-4"
            >
              TASSA
            </button>
            <p>&copy; 2026 Triple Stars Soccer Academy - The Elephants of Mabira. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <TassaPortal open={tassaOpen} onClose={() => setTassaOpen(false)} />
    </div>
  );
}

export default App;
