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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    description: "",
    isVerified: false,
    profileImage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to an API
    console.log("Form submitted:", formData);
    toast.success("User created successfully!");
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
        <Card className="max-w-2xl mx-auto border border-border/40 shadow-lg backdrop-blur-sm">
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
                    className="border-border/50 focus-visible:ring-primary"
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
                      className="pl-8 border-border/50 focus-visible:ring-primary"
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
                    className="min-h-[100px] border-border/50 focus-visible:ring-primary resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="profileImage"
                    className="text-sm font-medium text-foreground"
                  >
                    Profile Image URL
                  </Label>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    placeholder="https://example.com/image.jpg"
                    value={formData.profileImage}
                    onChange={handleChange}
                    required
                    className="border-border/50 focus-visible:ring-primary"
                  />
                  {formData.profileImage && (
                    <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                      <img
                        src={formData.profileImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
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
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Create User
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
