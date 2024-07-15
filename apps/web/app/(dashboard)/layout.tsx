import { SidebarItem } from "../../components/clients/SidebarItem";
import React from "react";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex bg-gray-100 ">
      <div className="hidden lg:block w-72 border-r border-slate-300 min-h-screen mr-4 pt-8 bg-white rounded-md ">
        <div className="m-2">
          <SidebarItem href={"/dashboard"} title="Home" />
          <SidebarItem href={"/take-register"} title="Take register" />
        </div>
      </div>
      <div className="p-8 w-full ">
        {children}
      </div>

    </div>
  );
}

