"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, UserCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CreatePost({
  userImage,
  username,
}: {
  userImage?: string;
  username?: string;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(newPreviews);
  };

  const handlePublish = () => {
    console.log("Publishing:", { files: selectedFiles, description });
    // Add your publish logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/25">
          <ImagePlus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-0 gap-0 rounded-3xl overflow-hidden shadow-2xl ">
        <div className="flex h-[600px]">
          {/* Left side - Image upload/preview */}
          <div className="flex-1 bg-black/95 flex items-center justify-center">
            {!preview.length ? (
              <div className="text-center p-8">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                <div
                  className="p-8 rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer bg-white/5"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-4 text-white h-auto py-6  hover:bg-gradient-to-r from-primary/50 to-secondary/50 transition-all duration-300"
                  >
                    <ImagePlus className="w-12 h-12 opacity-80" />
                    <div className="space-y-2 ">
                      <h3 className="font-semibold text-lg">
                        Drop your images here
                      </h3>
                      <p className="text-sm text-white/60">
                        or click to upload
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full group">
                <Image
                  src={preview[0]}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setSelectedFiles([]);
                    setPreview([]);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Right side - Description and publish */}
          <div className="w-[400px] flex flex-col border-l border-border/30 bg-background/95 backdrop-blur-sm">
            <div className="p-6 border-b border-border/30">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userImage} />
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

              {/* <div className="space-y-4 mt-6">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground"
                >
                  <UserCircle2 className="w-4 h-4 mr-2" />
                  Tag people
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Add location
                </Button>
              </div> */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
