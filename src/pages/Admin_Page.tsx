"use client";

import { useState } from "react";
import CreateUser from "./Create_User";
import UsersManage from "./Users_Manage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Menu, PlusCircle, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import BackButton from "@/components/ui/Back_Button";
import GetSession from "@/components/GetSession";
export default function AdminPage() {
  const [currentView, setCurrentView] = useState<"create" | "users">("create");

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 h-full border-r border-border/40 bg-card hidden sm:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Admin Panel
          </h2>

          <nav className="space-y-2 ">
            <Button
              // variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                currentView === "create"
                  ? "bg-secondary rounded-2xl"
                  : "text-secondary"
              )}
              onClick={() => setCurrentView("create")}
            >
              <PlusCircle className="h-5 w-5" />
              Create User
            </Button>

            <Button
              // variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                currentView === "users"
                  ? "bg-secondary rounded-2xl"
                  : "text-secondary"
              )}
              onClick={() => setCurrentView("users")}
            >
              <Users className="h-5 w-5" />
              Manage Users
            </Button>
            <BackButton
              href="/"
              icon={Home}
              className="mt-10 text-secondary hover:bg-secondary rounded-2xl hover:text-white   bg-transparent w-full  flex justify-center items-center"
            >
              Home
            </BackButton>
          </nav>
        </div>
      </div>

      <div className="md:hidden flex justify-between items-center">
        <BackButton
          href="/"
          icon={Home}
          className="text-gray-600 bg-transparent w-5 h-5"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon">
              <Menu
                className={`h-6 w-6 text-gray-600 `}
                //  ${
                //   isHomePage ? "text-white" : "text-gray-600"
                // }
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" title="Menu">
            <SheetHeader>
              <SheetTitle> Admin Panel</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <Button
                // variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  currentView === "create"
                    ? "bg-secondary rounded-2xl"
                    : "text-secondary"
                )}
                onClick={() => setCurrentView("create")}
              >
                <PlusCircle className="h-5 w-5" />
                Create User
              </Button>

              <Button
                // variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  currentView === "users"
                    ? "bg-secondary rounded-2xl"
                    : "text-secondary"
                )}
                onClick={() => setCurrentView("users")}
              >
                <Users className="h-5 w-5" />
                Manage Users
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentView === "create" ? (
          <CreateUser />
        ) : (
          <GetSession>
            <UsersManage />
          </GetSession>
        )}
      </div>
    </div>
  );
}
