import React from 'react';
import { Users, Trophy, Target, Heart, Award, Calendar, MapPin, Mail, Phone, Star, Shield, History } from 'lucide-react';

const TheClub = () => {
  const clubInfo = {
    founded: '2016',
    president: 'NTAMBI ROGERS TABULA',
    manager: 'JOSH CHERMBERLINE',
    stadium: 'Good Shepherd High School, Nansana',
    nickname: 'The Elephants of Mabira',
    location: 'Nansana Ward 7/8, Ochengi Zone, Wakiso District, Uganda',
    colors: ['Blue', 'Yellow', 'White'],
    league: 'Community Leagues',
    website: 'TSSA.com',
  };

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from player development to fan experience.',
      icon: Trophy,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Community',
      description: 'We are committed to giving back to our community and being a positive force for change.',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'Innovation',
      description: 'We embrace new ideas and technologies to stay at the forefront of football.',
      icon: Target,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and respect for all stakeholders.',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const achievements = [
    {
      year: '2023',
      achievement: 'NCOA League & Ganda League',
      description: 'Competed and won in local community and league tournaments.',
    },
    {
      year: '2022',
      achievement: 'Kasule Tournament',
      description: 'Division One Winners and relocation after Mabira Playground was destroyed.',
    },
    {
      year: '2021',
      achievement: 'Nansana League',
      description: 'League Tournament Winners.',
    },
    {
      year: '2019-2022',
      achievement: 'Regional & Community Tournaments',
      description: 'Active in Watoto Wasoka, Wakiso Academy Association League, Rangers Tournament and more.',
    },
    {
      year: '2016',
      achievement: 'Club Foundation',
      description: 'Established by Mr. Ntambi Rogers Tabula at Mabira Playground on Sunday 14th April 2016.',
    },
  ];

  const leadership = [
    {
      name: 'NTAMBI ROGERS TABULA',
      position: 'Club President',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      bio: 'Former player turned administrator with vision for sustainable growth.',
    },
    {
      name: 'KAIJA EDWARD',
      position: 'Head Coach',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      bio: 'Tactical innovator with proven track record of developing young talent.',
    },
    {
      name: 'KAIJA EDWARD',
      position: 'Director of Football',
      experience: '6 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
      bio: 'Strategic planner responsible for player recruitment and development.',
    },
    {
      name: 'JOSH CHERMBERLINE',
      position: 'Academy Director',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      bio: 'Youth development specialist with passion for nurturing future stars.',
    },
  ];

  const partners = [
    { name: 'Nike', category: 'Kit Sponsor', logo: 'https://via.placeholder.com/150x80/000000/FFFFFF?text=Nike' },
    { name: 'gracetravels', category: 'Technology Partner', logo: 'https://via.placeholder.com/150x80/0000FF/FFFFFF?text=TechCorp' },
    { name: 'BankPlus', category: 'Financial Partner', logo: 'https://via.placeholder.com/150x80/0066CC/FFFFFF?text=BankPlus' },
    { name: 'cb1011', category: 'Hydration Partner', logo: 'https://via.placeholder.com/150x80/00AA00/FFFFFF?text=SportsDrink' },
    { name: 'MediaGroup', category: 'Broadcast Partner', logo: 'https://via.placeholder.com/150x80/CC0000/FFFFFF?text=MediaGroup' },
    { name: 'Giftedgivings', category: 'Transport Partner', logo: 'https://via.placeholder.com/150x80/666666/FFFFFF?text=AutoBrand' },
  ];

  const communityPrograms = [
    {
      name: 'Sports Talent Development',
      description: 'Football, netball and volleyball training for boys and girls from the slums.',
      participants: '300+',
      impact: 'High',
    },
    {
      name: 'Vocational Skills Training',
      description: 'Teaching soap making, book making and bakery to help children earn a living.',
      participants: '150+',
      impact: 'High',
    },
    {
      name: 'Slum Children Support',
      description: 'Supporting vulnerable children with mentorship, life skills and safe spaces to learn and play.',
      participants: '200+',
      impact: 'High',
    },
  ];

  return (
    <section id="club" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            The Club
          </h2>
          <p className="text-xl text-gray-600">More than a football club - A community united by passion</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{clubInfo.founded}</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{clubInfo.league}</div>
              <div className="text-gray-600">League</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-gray-600">Trophies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">45K</div>
              <div className="text-gray-600">Stadium Capacity</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">President</div>
                <div className="text-gray-600">{clubInfo.president}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Target className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Manager</div>
                <div className="text-gray-600">{clubInfo.manager}</div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Home Ground</div>
                <div className="text-gray-600">{clubInfo.stadium}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Nickname</div>
              <div className="text-gray-600">{clubInfo.nickname}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Location</div>
              <div className="text-gray-600">{clubInfo.location}</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-gray-700">Blue</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-white border border-gray-300 rounded-full mr-2"></div>
                <span className="text-gray-700">White</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-gray-700">Gold</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg ${value.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <History className="w-6 h-6 mr-2 text-blue-600" />
            Club History & Achievements
          </h3>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Triple Stars Soccer Academy, nicknamed <strong>The Elephants of Mabira</strong>, is a non-government organization based on developing talents and supporting both the boy child and the girl child through talent development and teaching them different skills that can help them make a difference in their lives.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The academy teaches kids soap making, book making, bakery, netball, football, volleyball and more, helping slum children change their lives. It was formed by <strong>Mr. Ntambi Rogers Tabula</strong> and established on <strong>Sunday 14th April 2016</strong>. It started at Mabira Playground, a green grass field surrounded by trees that attracted elephants to graze peacefully while people played, inspiring the nickname. Mabira Playground was destroyed in July 2022 and no longer exists.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The academy now uses <strong>Good Shepherd High School, Nansana</strong> (near the cheapest supermarket) and is located in <strong>Nansana Ward 7/8, Ochengi Zone, Wakiso District, Uganda, Africa</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{achievement.year}</div>
                    <h4 className="font-semibold text-gray-900">{achievement.achievement}</h4>
                  </div>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900">{person.name}</h4>
                  <div className="text-blue-600 text-sm mb-2">{person.position}</div>
                  <div className="text-gray-500 text-xs mb-3">{person.experience} experience</div>
                  <p className="text-gray-600 text-sm">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Community Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{program.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    program.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {program.impact} Impact
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {program.participants} participants
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Partners & Sponsors</h3>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 object-contain mb-2 grayscale hover:grayscale-0 transition-all"
                  />
                  <div className="text-sm text-gray-600 text-center">{partner.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Involved</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Newsletter</h4>
              <p className="text-gray-600 text-sm mb-3">Stay updated with club news</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Membership</h4>
              <p className="text-gray-600 text-sm mb-3">Join our loyal supporters club</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Join Now
              </button>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Volunteer</h4>
              <p className="text-gray-600 text-sm mb-3">Help with community programs</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheClub;
