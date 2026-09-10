import React from 'react';
import { Trophy, Star, Award, Medal } from 'lucide-react';

const TrophiesWon = () => {
  const trophies = [
    {
      id: 1,
      name: 'Ganda League',
      year: '2023',
      category: 'League',
      description: ' Division Winners',
      icon: Trophy,
      color: 'bg-yellow-500',
    },
    {
      id: 2,
      name: 'NCOA Leaguue',
      year: '2023',
      category: 'Cup',
      description: 'Knockout Tournament Champions',
      icon: Award,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      name: 'Kasule Tournament',
      year: '2022',
      category: 'League',
      description: 'Division One Winners',
      icon: Trophy,
      color: 'bg-green-500',
    },
    {
      id: 4,
      name: 'Super Cup',
      year: '2022',
      category: 'Cup',
      description: 'Champions vs Cup Winners',
      icon: Star,
      color: 'bg-purple-500',
    },
    {
      id: 5,
      name: 'Nansana League',
      year: '2021',
      category: 'Cup',
      description: 'League Tournament Winners',
      icon: Medal,
      color: 'bg-red-500',
    },
    {
      id: 6,
      name: 'Fair Play Award',
      year: '2021',
      category: 'Award',
      description: 'Best Sportsmanship Team',
      icon: Award,
      color: 'bg-indigo-500',
    },
  ];

  const achievements = [
    { title: 'Total Trophies', value: '24', icon: Trophy, color: 'text-yellow-600' },
    { title: 'League Titles', value: '8', icon: Star, color: 'text-blue-600' },
    { title: 'Cup Wins', value: '12', icon: Award, color: 'text-green-600' },
    { title: 'Special Awards', value: '4', icon: Medal, color: 'text-purple-600' },
  ];

  return (
    <section id="trophies" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trophies Won</h2>
          <p className="text-xl text-gray-600">Celebrating our achievements and success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <achievement.icon className={`w-12 h-12 mx-auto mb-3 ${achievement.color}`} />
              <div className="text-3xl font-bold text-gray-900 mb-1">{achievement.value}</div>
              <div className="text-gray-600 text-sm">{achievement.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trophies.map((trophy) => (
            <div key={trophy.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`${trophy.color} h-32 flex items-center justify-center`}>
                <trophy.icon className="w-20 h-20 text-white" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{trophy.name}</h3>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {trophy.year}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {trophy.category}
                  </span>
                </div>
                <p className="text-gray-600">{trophy.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Trophy className="w-4 h-4 mr-2" />
                    Championship Trophy
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Trophy Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-lg font-bold text-gray-900">2023</div>
                <div className="text-xs text-gray-500">Recent</div>
              </div>
              <div className="flex-1">
                <div className="bg-yellow-100 rounded-lg p-3 border-l-4 border-yellow-500">
                  <div className="font-semibold text-gray-900 mb-1">Tournaments & Leagues</div>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-0.5">
                    <li>NCOA League</li>
                    <li>Watoto Wasoka Tournament</li>
                    <li>Wakiso Academy Association League</li>
                    <li>Nansana League</li>
                    <li>Rangers Tournament</li>
                    <li>Ganda League</li>
                    <li>Kasule Tournament</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-lg font-bold text-gray-900">2022</div>
                <div className="text-xs text-gray-500">2 years ago</div>
              </div>
              <div className="flex-1">
                <div className="bg-blue-100 rounded-lg p-3 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900">Regional Championship & Super Cup</div>
                  <div className="text-sm text-gray-600">Promotion to premier division</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-lg font-bold text-gray-900">2021</div>
                <div className="text-xs text-gray-500">3 years ago</div>
              </div>
              <div className="flex-1">
                <div className="bg-green-100 rounded-lg p-3 border-l-4 border-green-500">
                  <div className="font-semibold text-gray-900">League Cup & Fair Play Award</div>
                  <div className="text-sm text-gray-600">Recognized for sportsmanship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrophiesWon;
