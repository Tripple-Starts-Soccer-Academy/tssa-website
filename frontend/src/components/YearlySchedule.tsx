import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Users, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const YearlySchedule = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedCompetition, setSelectedCompetition] = useState('All');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const competitions = ['All', 'League', 'Cup', 'Friendly', 'Champions League', 'Community'];

  const scheduleData = [
    {
      id: 0,
      date: '2026-09-09',
      month: 8,
      time: '15:00',
      opponent: 'Kazinga Giants FC',
      competition: 'League',
      location: 'Home',
      result: 'W',
      score: '2-1',
      importance: 'high',
    },
    {
      id: 100,
      date: '2026-09-10',
      month: 8,
      time: '15:00',
      opponent: 'NACOA GALA (U-16)',
      competition: 'League',
      location: 'Home',
      result: 'upcoming',
      importance: 'high',
    },
    {
      id: 101,
      date: '2026-09-11',
      month: 8,
      time: '15:00',
      opponent: 'URA (U-17)',
      competition: 'League',
      location: 'Home',
      result: 'upcoming',
      importance: 'high',
    },
    {
      id: 1,
      date: '2024-02-01',
      month: 1,
      time: '19:30',
      opponent: 'Rival FC',
      competition: 'League',
      location: 'Home',
      result: 'upcoming',
      importance: 'high',
    },
    {
      id: 2,
      date: '2024-02-05',
      month: 1,
      time: '15:00',
      opponent: 'Fan Meet & Greet',
      competition: 'Community',
      location: 'Community Center',
      result: 'upcoming',
      importance: 'medium',
    },
    {
      id: 3,
      date: '2024-02-10',
      month: 1,
      time: '16:00',
      opponent: 'United SC',
      competition: 'Cup',
      location: 'Away',
      result: 'upcoming',
      importance: 'high',
    },
    {
      id: 4,
      date: '2024-02-15',
      month: 1,
      time: '10:00',
      opponent: 'Academy Open Day',
      competition: 'Community',
      location: 'Training Ground',
      result: 'upcoming',
      importance: 'low',
    },
    {
      id: 5,
      date: '2024-02-20',
      month: 1,
      time: '20:00',
      opponent: 'City Warriors',
      competition: 'League',
      location: 'Home',
      result: 'upcoming',
      importance: 'medium',
    },
    {
      id: 6,
      date: '2024-02-25',
      month: 1,
      time: '14:00',
      opponent: 'Charity Match',
      competition: 'Friendly',
      location: 'Home',
      result: 'upcoming',
      importance: 'medium',
    },
    {
      id: 7,
      date: '2024-01-15',
      month: 0,
      time: '19:30',
      opponent: 'Athletic Club',
      competition: 'League',
      location: 'Home',
      result: 'W',
      score: '4-2',
      importance: 'medium',
    },
    {
      id: 8,
      date: '2024-01-08',
      month: 0,
      time: '16:00',
      opponent: 'United SC',
      competition: 'Cup',
      location: 'Away',
      result: 'D',
      score: '2-2',
      importance: 'high',
    },
    {
      id: 9,
      date: '2024-01-01',
      month: 0,
      time: '15:00',
      opponent: 'City Warriors',
      competition: 'League',
      location: 'Home',
      result: 'W',
      score: '2-0',
      importance: 'medium',
    },
    {
      id: 10,
      date: '2024-03-01',
      month: 2,
      time: '20:00',
      opponent: 'FC Phoenix',
      competition: 'League',
      location: 'Away',
      result: 'upcoming',
      importance: 'high',
    },
    {
      id: 11,
      date: '2024-03-05',
      month: 2,
      time: '19:00',
      opponent: 'European Giants',
      competition: 'Champions League',
      location: 'Home',
      result: 'upcoming',
      importance: 'high',
    },
    {
      id: 12,
      date: '2024-03-10',
      month: 2,
      time: '17:30',
      opponent: 'Rival FC',
      competition: 'Cup',
      location: 'Away',
      result: 'upcoming',
      importance: 'high',
    },
  ];

  const filteredSchedule = scheduleData.filter(item => {
    const matchesMonth = item.month === selectedMonth;
    const matchesCompetition = selectedCompetition === 'All' || item.competition === selectedCompetition;
    return matchesMonth && matchesCompetition;
  });

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'League': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cup': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Friendly': return 'bg-green-100 text-green-800 border-green-300';
      case 'Champions League': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Community': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return '';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-100 text-green-800';
      case 'D': return 'bg-yellow-100 text-yellow-800';
      case 'L': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedMonth(selectedMonth > 0 ? selectedMonth - 1 : 11);
    } else {
      setSelectedMonth(selectedMonth < 11 ? selectedMonth + 1 : 0);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const monthStats = {
    total: filteredSchedule.length,
    upcoming: filteredSchedule.filter(item => item.result === 'upcoming').length,
    completed: filteredSchedule.filter(item => item.result !== 'upcoming').length,
    home: filteredSchedule.filter(item => item.location === 'Home').length,
    away: filteredSchedule.filter(item => item.location === 'Away').length,
  };

  return (
    <section id="schedule" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            Yearly Schedule
          </h2>
          <p className="text-xl text-gray-600">Complete fixture list and event calendar for 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button
                onClick={() => changeMonth('prev')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-gray-900 min-w-[150px] text-center">
                {months[selectedMonth]} 2024
              </h3>
              <button
                onClick={() => changeMonth('next')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCompetition}
                onChange={(e) => setSelectedCompetition(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {competitions.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{monthStats.total}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{monthStats.upcoming}</div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{monthStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{monthStats.home}</div>
              <div className="text-sm text-gray-600">Home</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{monthStats.away}</div>
              <div className="text-sm text-gray-600">Away</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredSchedule.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events scheduled</h3>
              <p className="text-gray-500">There are no events scheduled for {months[selectedMonth]} 2024.</p>
            </div>
          ) : (
            filteredSchedule.map((event) => (
              <div
                key={event.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 ${getImportanceColor(event.importance)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-center min-w-[80px]">
                      <div className="text-2xl font-bold text-gray-900">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCompetitionColor(event.competition)}`}>
                          {event.competition}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getResultColor(event.result)}`}>
                          {event.result === 'upcoming' ? 'UPCOMING' : `${event.result} ${event.score || ''}`}
                        </span>
                        {event.location === 'Home' && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                            HOME
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.location === 'Away' ? 'TSSA @ ' : ''}{event.opponent}
                      </h3>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location === 'Home' ? 'Home Stadium' : event.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {event.result === 'upcoming' && (
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Get Tickets
                      </button>
                    )}
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-blue-600" />
            Key Dates & Reminders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Transfer Window</h4>
              <p className="text-gray-600 text-sm">January 1 - January 31, 2024</p>
              <p className="text-gray-500 text-sm mt-1">Winter transfer period</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Season Break</h4>
              <p className="text-gray-600 text-sm">June 15 - July 15, 2024</p>
              <p className="text-gray-500 text-sm mt-1">Summer recess period</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Season Finale</h4>
              <p className="text-gray-600 text-sm">May 25, 2024</p>
              <p className="text-gray-500 text-sm mt-1">Final match of the season</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YearlySchedule;
