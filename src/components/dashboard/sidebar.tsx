import { Bookmark, Briefcase, Calendar, HeartHandshake, Home, Inbox, LayoutDashboard, LogOut, Settings, FileText, UserCircle, Lock } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu start.
const start = [
  {
    title: "Dashboard",
    url: "",
    icon: LayoutDashboard,
  },
  {
    title: "PDF Management",
    url: "pdf-manage",
    icon: FileText,
  },
 
];

const account = [
  {
    title: "Update Profile",
    url: "update-profile",
    icon: UserCircle,
  },
  {
    title: "Change Password",
    url: "change-password",
    icon: Lock,
  },
  
];

export function AppSidebar() {
  return (
    <Sidebar className="pl-4 bg-gray-100 h-screen border-r border-gray-200">
      <div className="h-full flex flex-col">
        {/* Main Navigation */}
        <div className="flex-shrink-0 overflow-y-auto">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {start.map((item) => (
                    <SidebarMenuItem
                      className="mt-2 p-2 rounded-md hover:bg-gray-200 transition"
                      key={item.title}
                    >
                      <Link
                        href={`/dashboard/${item.url}`}
                        className="flex items-center space-x-3"
                      >
                        <item.icon className="w-5 h-5 text-gray-700" />
                        <span className="text-base text-gray-700 leading-none">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>

        {/* Account Settings */}
        <div className="flex-shrink-0 mt-4">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                Account
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {account.map((item) => (
                    <SidebarMenuItem
                      className="my-2 p-2 rounded-md hover:bg-gray-200 transition"
                      key={item.title}
                    >
                      <Link
                        href={`/dashboard/${item.url}`}
                        className="flex items-center space-x-3"
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            item.title === "Logout"
                              ? "text-red-600"
                              : "text-gray-700"
                          }`}
                        />
                        <p
                          className={`text-base leading-none ${
                            item.title === "Logout"
                              ? "text-red-600 hover:text-red-800"
                              : "text-gray-700"
                          }`}
                        >
                          {item.title}
                        </p>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </div>
    </Sidebar>
  );
}
