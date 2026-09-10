import React from 'react';
import { Calendar, Trophy, Target, Users } from 'lucide-react';

const MatchesPlayed = () => {
  const matchStats = [
    { season: '2023-24', played: 45, won: 32, drawn: 8, lost: 5, goalsFor: 89, goalsAgainst: 31 },
    { season: '2022-23', played: 42, won: 28, drawn: 10, lost: 4, goalsFor: 76, goalsAgainst: 28 },
    { season: '2021-22', played: 40, won: 25, drawn: 9, lost: 6, goalsFor: 68, goalsAgainst: 35 },
    { season: '2020-21', played: 38, won: 22, drawn: 8, lost: 8, goalsFor: 61, goalsAgainst: 33 },
  ];

  const recentMatches = [
    { opponent: 'Kazinga Giants FC', date: '2026-09-09', result: 'W', score: '2-1', competition: 'League' },
    { opponent: 'NACOA GALA (U-16)', date: '2026-09-10', result: 'upcoming', score: '-', competition: 'League' },
    { opponent: 'URA (U-17)', date: '2026-09-11', result: 'upcoming', score: '-', competition: 'League' },
  ];

  const getResultColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-100 text-green-800 border-green-300';
      case 'D': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'L': return 'bg-red-100 text-red-800 border-red-300';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section id="matches" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Matches Played</h2>
          <p className="text-xl text-gray-600">Track our performance throughout the seasons</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Season Statistics
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {matchStats.map((stat) => (
                    <tr key={stat.season} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.season}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.played}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{stat.won}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-semibold">{stat.drawn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{stat.lost}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.goalsFor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.goalsAgainst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-600" />
              Recent Matches
            </h3>
            <div className="space-y-4">
              {recentMatches.map((match, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{match.opponent}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getResultColor(match.result)}`}>
                          {match.result} {match.score}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {match.date}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {match.competition}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-3" />
            <div className="text-3xl font-bold">165</div>
            <div className="text-blue-100">Total Matches</div>
          </div>
          <div className="bg-green-600 text-white rounded-lg p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3" />
            <div className="text-3xl font-bold">107</div>
            <div className="text-green-100">Total Wins</div>
          </div>
          <div className="bg-yellow-600 text-white rounded-lg p-6 text-center">
            <Target className="w-12 h-12 mx-auto mb-3" />
            <div className="text-3xl font-bold">294</div>
            <div className="text-yellow-100">Goals Scored</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3" />
            <div className="text-3xl font-bold">65%</div>
            <div className="text-purple-100">Win Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchesPlayed;
