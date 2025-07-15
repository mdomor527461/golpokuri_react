import { XMarkIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import config from "../../config/config";
export default function ShowReactorsModal({story,closeModal,isOpen}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return  <>
    {
  isOpen && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <HeartIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Reactions ({story.all_user_reacts.length})
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {story.all_user_reacts.length === 0 ? (
            <div className="p-8 text-center">
              <HeartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reactions yet</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {story.all_user_reacts.map((reactor) => (
                <div
                  key={reactor.id}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative">
                    {reactor.image ? (
                      <img
                        src={`${config.apiUrl}${reactor.image}`}
                        alt={reactor.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-white" />
                      </div>
                    )}

                    {/* Reaction Icon */}
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1">
                      <HeartIcon className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {reactor.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(reactor.reacted_at)}
                    </p>
                  </div>

                  {/* Reaction Type */}
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      {reactor.reaction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
  </>
}
