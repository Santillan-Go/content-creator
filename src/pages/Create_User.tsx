import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Upload, Camera, Image as ImageIcon } from "lucide-react";
import { uploadToCloudinary } from "@/services/cloudinary";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

interface MediaPreview {
  src: string;
  type: string;
}

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    description: "",
    category: "",
    isVerified: false,
  });
  const [selectedProfile, setSelectedProfile] = useState<File>();
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  const [description, setDescription] = useState("");
  const [previewsCoverPhoto, setPreviewsCoverPhoto] = useState<MediaPreview>(
    {} as MediaPreview
  );
  const [previewsProfile, setPreviewsProfile] = useState<MediaPreview>(
    {} as MediaPreview
  );

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedProfile) {
      const objectUrl = URL.createObjectURL(selectedProfile);
      setPreviewsProfile({
        src: objectUrl,
        type: selectedProfile.type,
      });
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedProfile]);
  useEffect(() => {
    if (selectedCoverPhoto) {
      const objectUrl = URL.createObjectURL(selectedCoverPhoto);
      setPreviewsCoverPhoto({
        src: objectUrl,
        type: selectedCoverPhoto.type,
      });
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedCoverPhoto]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const isProfilePicture = e.target.name === "profileImage";
    if (isProfilePicture) {
      setSelectedProfile(files?.[0]);
    } else {
      setSelectedCoverPhoto(files?.[0]);
    }
    // if (files) {
    //   setSelectedFiles(Array.from(files));
    // }
  };
  //URL.revokeObjectURL(preview.src))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, username, description, isVerified, category } = formData;
    //MAKE SOME VALIDATION
    if (!selectedProfile || !selectedCoverPhoto) {
      toast.error("Please select both profile and cover photo.");
      return;
    }

    if (!name || !username || !description || !category) {
      toast.error("Please fill all the fields.");
      return;
    }
    //
    setIsLoading(true);
    try {
      const urlProfile = await uploadToCloudinary(selectedProfile!, true);
      const urlCover = await uploadToCloudinary(selectedCoverPhoto!);

      const response = await fetch(
        "https://content-creator-service.vercel.app/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add this!
          },
          body: JSON.stringify({
            name,
            username,
            category,
            bio: description,
            verify: isVerified,
            profilePicture: urlProfile,
            coverPhoto: urlCover,
          }),
        }
      );
      //
      // Here you would typically send this to an API
      setFormData({
        name: "",
        username: "",
        description: "",
        category: "",
        isVerified: false,
      });
      setSelectedProfile(undefined);
      setSelectedCoverPhoto(undefined);
      console.log("Form submitted with files:", formData);
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Error uploading images or creating user.");
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-background p-8 bg-gradient-to-b from-background to-secondary/10">
        <Card className="max-w-2xl mx-auto border border-border/40 shadow-lg backdrop-blur-sm rounded-xl">
          <CardHeader className="space-y-1 border-b border-border/40 bg-secondary/5">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create New User
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Add a new creator to the platform with verified status
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-border/50 focus-visible:ring-primary rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-foreground"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="username"
                      name="username"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="pl-8 border-border/50 focus-visible:ring-primary rounded-2xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-foreground"
                  >
                    Category
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="category"
                      name="category"
                      placeholder="AI Creator, Agency, Developer..."
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="pl-8 border-border/50 focus-visible:ring-primary rounded-2xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-foreground"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Content Creator | 100k+ followers"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="min-h-[100px] border-border/50 focus-visible:ring-primary resize-none rounded-2xl"
                  />
                </div>

                <div className="space-y-2 flex flex-col items-center">
                  <Label className="text-sm font-medium text-foreground">
                    Profile Image
                  </Label>
                  <div
                    onClick={() => profileInputRef.current?.click()}
                    className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 hover:border-primary bg-secondary/20 hover:bg-secondary/30 transition-all duration-200 cursor-pointer flex items-center justify-center group relative overflow-hidden"
                  >
                    {previewsProfile.src ? (
                      <>
                        <img
                          src={previewsProfile.src}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <Camera className="w-8 h-8 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Upload
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to upload profile image (square recommended)
                  </p>
                  <Input
                    ref={profileInputRef}
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden" // Hide the input
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Cover Photo
                  </Label>
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="w-full h-32 rounded-lg border-2 border-dashed border-primary/50 hover:border-primary bg-secondary/20 hover:bg-secondary/30 transition-all duration-200 cursor-pointer flex items-center justify-center group relative overflow-hidden"
                  >
                    {previewsCoverPhoto.src ? (
                      <>
                        <img
                          src={previewsCoverPhoto.src}
                          alt="Cover photo preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-10 h-10 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Upload Cover Photo
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to upload cover photo (landscape recommended)
                  </p>
                  <Input
                    ref={coverInputRef}
                    id="coverPhoto"
                    name="coverPhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden" // Hide the input
                  />
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/5 border border-border/40">
                  <Switch
                    id="verified"
                    checked={formData.isVerified}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isVerified: checked }))
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="verified"
                      className="text-sm font-medium text-foreground"
                    >
                      Verified Account
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Enable this to show the verification badge
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity rounded-2xl"
              >
                Create User
              </Button>
            </form>
          </CardContent>
        </Card>
        <FullScreenLoader isLoading={isLoading} message="Creating User..." />

        <Toaster />
      </div>
    </>
  );
}
