import React, { useState } from "react";
import CommonFolderRow from "../CommonFolderRow/CommonFolderRow";
import { useFolders } from "../../context/FolderContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { foldersData } = useFolders();

  const handleDragEnd = (e) => {
    console.log("drag ho bhi raha h k nahi");
    const source = e.source;
    const destination = e.destination;
    const sourceDroppableId = source?.droppableId;
    const destinationDroppableId = destination?.droppableId;

    if (!destination) {
      return;
    }
    if (
      destinationDroppableId === sourceDroppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = foldersData;
    if (source.droppableId === "data") {
      add = active[source.index];
      active.splice(source.index, 1);
    }
    // Destination Logic
    if (destination.droppableId === "data") {
      active.splice(destination.index, 0, add);
    }
  };

  return (
    <div className="container">
      <input placeholder="Search Projects" />
      <div>
        {foldersData.sub_folder.map((folder, index) => (
          <CommonFolderRow key={folder.id} data={folder} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
