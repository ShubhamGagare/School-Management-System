"use client"
import { SidebarItem } from "../../components/SidebarItem";
import React from "react";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
      <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
        <div>
          <SidebarItem href={"/dashboard"} title="Home" />
          <SidebarItem href={"/take-register"} title="Take register" />
        </div>
      </div>
      <div className="p-8 w-full">
        {children}
      </div>

    </div>
  );
}

