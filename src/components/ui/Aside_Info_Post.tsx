import { formatLikes } from "@/lib/utils";
import { Heart } from "lucide-react";
// MAKING SOME CHANGES
const AsideInfoPost = ({
  likes,
  caption,
  username,
  showProfile = true,
  className,
  description,
}: {
  likes: number;
  caption: string;
  username: string;
  showProfile?: boolean;
  className?: string;
  description?: string;
}) => {
  return (
    <aside
      className={`p-4 md:p-6 lg:p-8 border-l border-gray-100 flex flex-col justify-between  ${
        className || ""
      }`}
    >
      {/* User header */}
      {showProfile && (
        <ProfilePlaceholder
          username={username}
          className="flex justify-between"
        />
      )}
      {/* <div className="sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://cdn.openart.ai/uploads/image_9YFkLViJ_1757401222855_raw.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-medium text-gray-900">
              {username || "Username"}
            </p>
          </div>
          <button className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
            Follow
          </button>
        </div>
      </div> */}

      {/* Description */}
      <div className={`overflow-y-auto ${description}`}>
        <p className="text-gray-700 leading-relaxed">
          {caption || "No caption available."}
        </p>
      </div>

      {/* Heart button */}
      <div className="p-6 border-t border-gray-100">
        <button
          className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={() => {
            /* Add your like logic here */
          }}
        >
          <Heart className="w-7 h-7 text-gray-900 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-900">
            {formatLikes(likes)}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AsideInfoPost;

export const ProfilePlaceholder = ({
  username,
  className,
  colorText = "text-gray-900",
}: {
  username: string;
  className?: string;
  colorText?: string;
}) => {
  return (
    <div className={`sm:p-6 border-b border-gray-100 `}>
      <div className={` ${className || ""}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://cdn.openart.ai/uploads/image_9YFkLViJ_1757401222855_raw.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className={`font-medium text-gray-900 ${colorText}`}>
            {username || "Username"}
          </p>
        </div>
        <button className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
          Follow
        </button>
      </div>
    </div>
  );
};
