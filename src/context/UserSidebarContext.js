import React, { useState, createContext, useContext } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserSidebar from "../components/UserSidebar";


const SidebarContext = createContext({});

export const UserSidebarProvider = ({ children }) => {
  const [sidebarRTL, setSidebarRTL] = useState(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState(undefined);
  const [sidebarImage, setSidebarImage] = useState(undefined);
  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarBackgroundColor,
          setSidebarBackgroundColor,

          sidebarImage,
          setSidebarImage,

          sidebarRTL,
          setSidebarRTL,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <UserSidebar/>
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const UserSidebarContext = () => useContext(SidebarContext);
