import React, { useState } from 'react';
import { Youtube, Play, ThumbsUp, Eye, Clock, Search, Filter } from 'lucide-react';

const YouTubeChannel = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'TSSA 3-1 Rival FC | Match Highlights & Goals',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '12:45',
      views: '125K',
      likes: '8.9K',
      uploadDate: '2 days ago',
      category: 'Match Highlights',
      description: 'Extended highlights from our thrilling victory over Rival FC. Watch all the goals and key moments from the match.',
    },
    {
      id: 2,
      title: 'Behind the Scenes: Training Session Analysis',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '18:30',
      views: '45K',
      likes: '3.2K',
      uploadDate: '5 days ago',
      category: 'Training',
      description: 'Join our coaching staff as they break down training drills and tactical preparations for upcoming matches.',
    },
    {
      id: 3,
      title: 'Player Interview: Marcus Rodriguez Story',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '25:15',
      views: '89K',
      likes: '6.7K',
      uploadDate: '1 week ago',
      category: 'Interview',
      description: 'Exclusive interview with our new star striker about his journey to TSSA and future ambitions.',
    },
    {
      id: 4,
      title: 'TSSA Academy: Future Stars Documentary',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '35:20',
      views: '67K',
      likes: '4.5K',
      uploadDate: '2 weeks ago',
      category: 'Academy',
      description: 'Follow the journey of our academy prospects as they dream of making it to the first team.',
    },
    {
      id: 5,
      title: 'Stadium Tour 2024 | New Facilities',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '15:00',
      views: '156K',
      likes: '12K',
      uploadDate: '3 weeks ago',
      category: 'Club',
      description: 'Take an exclusive tour of our newly renovated stadium facilities including locker rooms and training areas.',
    },
    {
      id: 6,
      title: 'Top 10 Goals of the Season',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '8:45',
      views: '234K',
      likes: '18K',
      uploadDate: '1 month ago',
      category: 'Highlights',
      description: 'Count down the best goals scored by TSSA this season. Spectacular strikes and memorable moments.',
    },
    {
      id: 7,
      title: 'Fan Day 2024 | Community Celebration',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '22:10',
      views: '78K',
      likes: '5.6K',
      uploadDate: '1 month ago',
      category: 'Community',
      description: 'Highlights from our annual fan day event. Meet the players, signings, and family activities.',
    },
    {
      id: 8,
      title: 'Tactical Analysis: Formation Breakdown',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '28:30',
      views: '92K',
      likes: '7.8K',
      uploadDate: '1 month ago',
      category: 'Analysis',
      description: 'Deep dive into our tactical approach and formation analysis with expert commentary.',
    },
  ];

  const categories = ['All', 'Match Highlights', 'Training', 'Interview', 'Academy', 'Club', 'Highlights', 'Community', 'Analysis'];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const channelStats = {
    subscribers: '245K',
    totalViews: '12.5M',
    videoCount: '156',
    joinDate: 'Jan 2020',
  };

  const formatViews = (views: string) => {
    return views;
  };

  return (
    <section id="youtube" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Youtube className="w-8 h-8 mr-3 text-red-600" />
            YouTube Channel
          </h2>
          <p className="text-xl text-gray-300">Exclusive content, match highlights, and behind the scenes footage</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <Youtube className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">TSSA Official</h3>
                  <p className="text-gray-400">@TSSAOfficial</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <div className="text-2xl font-bold text-white">{channelStats.subscribers}</div>
                  <div className="text-gray-400">Subscribers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{channelStats.totalViews}</div>
                  <div className="text-gray-400">Total Views</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{channelStats.videoCount}</div>
                  <div className="text-gray-400">Videos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{channelStats.joinDate}</div>
                  <div className="text-gray-400">Joined</div>
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center">
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe
            </button>
          </div>
        </div>

        <div className="mb-8 bg-gray-800 rounded-lg overflow-hidden">
          {isPlaying ? (
            <video
              src="/images/tssplayvideo.mp4"
              className="w-full max-h-[70vh] bg-black"
              controls
              autoPlay
            />
          ) : (
            <div
              className="relative cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <video
                src="/images/tssplayvideo.mp4"
                className="w-full max-h-[70vh] object-cover bg-black"
                preload="metadata"
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 transition-transform">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-left">
                <h3 className="text-2xl font-bold text-white">TSSA Play Video</h3>
                <p className="text-gray-300 text-sm">Click to watch</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer group">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="mr-3">{formatViews(video.views)} views</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{video.uploadDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{video.likes}</span>
                  </div>
                  <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {video.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            Load More Videos
          </button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeChannel;
