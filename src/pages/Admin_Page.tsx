"use client";

import { useState } from "react";
import CreateUser from "./Create_User";
import UsersManage from "./Users_Manage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle, Users } from "lucide-react";

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<"create" | "users">("create");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 h-full border-r border-border/40 bg-card">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Admin Panel
          </h2>

          <nav className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                currentView === "create" && "bg-secondary/20"
              )}
              onClick={() => setCurrentView("create")}
            >
              <PlusCircle className="h-5 w-5" />
              Create User
            </Button>

            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                currentView === "users" && "bg-secondary/20"
              )}
              onClick={() => setCurrentView("users")}
            >
              <Users className="h-5 w-5" />
              Manage Users
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentView === "create" ? <CreateUser /> : <UsersManage />}
      </div>
    </div>
  );
}
