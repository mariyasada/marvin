import React, { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdArrowRight } from "react-icons/md";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { useFolders } from "../../context/FolderContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CommonFolderRow.css";

const CommonFolderRow = ({ data, index }) => {
  const { selectedFolder, setSelectedFolder, setFoldersData, foldersData } =
    useFolders();
  const [isExpand, setExpand] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, folder) => {
    setDraggedItem(folder);
    console.log(draggedItem, "dragged item");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetFolder) => {
    e.preventDefault();

    // Ensure the dragged item exists
    if (!draggedItem) return;

    // Move the dragged item to the target folder
    // Update the folder structure
    const updatedFoldersData = [...foldersData];
  };

  if (data?.sub_folder?.length > 0) {
    return (
      <div
        draggable="true"
        className={"folder_row"}
        onDragStart={(e) => handleDragStart(e, data)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, data)}
      >
        <div
          style={{ display: "block" }}
          className={isExpand ? "selected_folder" : ""}
          onClick={(e) => {
            setExpand(!isExpand);
            setSelectedFolder(data);
          }}
        >
          <div className="folder_icon">
            {isExpand ? (
              <IoMdArrowDropdown color="gray" />
            ) : (
              <MdArrowRight color="gray" />
            )}
            <div>
              {isExpand ? (
                <FaFolderOpen color="#7AA6FE" />
              ) : (
                <FaFolder color="#7AA6FE" />
              )}
              {data?.folder_name !== "" && data.folder_name} (
              {`
              ${data?.sub_folder?.length} item`}
              )
            </div>
          </div>
        </div>

        <div
          style={{
            display: isExpand ? "block" : "none",
            paddingLeft: "2rem",
          }}
        >
          {data?.sub_folder.map((folder, index) => (
            <CommonFolderRow key={folder.id} data={folder} index={index} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "block",
          paddingLeft: "2rem",
        }}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, data)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, data)}
      >
        {data?.folder_name}
      </div>
    );
  }
};

export default CommonFolderRow;
