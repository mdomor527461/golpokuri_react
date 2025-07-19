import {
  ChatBubbleLeftIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  PaperAirplaneIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

export default function CommentButton({ showCommentModal }) {
  return (
    <>
      <button className="group" onClick={showCommentModal}>
        <ChatBubbleLeftIcon className="w-8 h-8 text-gray-400 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300" />
      </button>
    </>
  );
}
