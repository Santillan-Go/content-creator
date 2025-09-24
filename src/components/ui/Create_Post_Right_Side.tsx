// complete the code

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";

interface Create_Post_Right_Side_Props {
  userImage?: string;
  username?: string;
  description: string;
  setDescription: (desc: string) => void;
  selectedFiles: File[];
  handlePublish: () => void;
}

export function CreatePostRightSide({
  userImage,
  username,
  description,
  setDescription,
  selectedFiles,
  handlePublish,
}: Create_Post_Right_Side_Props) {
  return (
    <div className="flex-1  flex flex-col border-l border-border/30">
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={userImage}
              className="rounded-full w-full h-full object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-medium">{username}</span>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Textarea
          placeholder="Write a caption..."
          className="min-h-[200px] resize-none border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50 bg-transparent"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="p-6 border-t border-border/30 bg-muted/30">
        <Button
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-primary/25"
          disabled={!selectedFiles.length}
          onClick={handlePublish}
        >
          Share
        </Button>
      </div>
    </div>
  );
}
