import React, { useState } from "react";
import CommonFolderRow from "../CommonFolderRow/CommonFolderRow";
import { useFolders } from "../../context/FolderContext";
import "./Sidebar.css";

const Sidebar1 = () => {
  const { foldersData } = useFolders();

  return (
    <div className="container">
      <input placeholder="Search Projects" />
      <div>
        {foldersData.folders.map((folder, index) => (
          <CommonFolderRow key={folder.id} data={folder} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar1;
