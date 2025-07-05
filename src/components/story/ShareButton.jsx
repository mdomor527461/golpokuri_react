import { useState } from 'react';
import { ShareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faFacebookMessenger,
  faWhatsapp,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function ShareButton({ storyTitle, storyUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FontAwesomeIcon icon={faFacebookF} />,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}&quote=${encodeURIComponent(storyTitle)}`
    },
    {
      name: 'Messenger',
      icon: <FontAwesomeIcon icon={faFacebookMessenger} />,
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://m.me/?text=${encodeURIComponent(`${storyTitle} - ${storyUrl}`)}`
    },
    {
      name: 'WhatsApp',
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${encodeURIComponent(`${storyTitle} - ${storyUrl}`)}`
    },
    {
      name: 'Instagram',
      icon: <FontAwesomeIcon icon={faInstagram} />,
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'Twitter',
      icon: <FontAwesomeIcon icon={faTwitter} />,
      color: 'bg-sky-600 hover:bg-sky-700',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(storyTitle)}&url=${encodeURIComponent(storyUrl)}`
    },
    {
      name: 'Copy Link',
      icon: <FontAwesomeIcon icon={faLink} />,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => {
        navigator.clipboard.writeText(storyUrl);
        alert('Link copied to clipboard!');
      }
    }
  ];

  const handleShare = (option) => {
    if (option.action) {
      option.action();
    } else if (option.url !== '#') {
      window.open(option.url, '_blank', 'width=600,height=400');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-gray-100"
      >
        <ShareIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
          Share
        </span>
      </button>

      {/* Share Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Share Options Panel */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 min-w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Share Story</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option, index) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option)}
                  className={`${option.color} text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>

            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </>
      )}
    </div>
  );
}