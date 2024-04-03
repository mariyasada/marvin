import React, { useState, useEffect } from "react";
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
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    console.log(draggedItem, "check");
  }, [draggedItem]);

  const handleDrop = (e, targetFolder) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(targetFolder, draggedItem, "check target folder");

    // Ensure the dragged item exists
    if (!draggedItem) return;

    // Move the dragged item to the target folder
    // Update the folder structure
    const updatedFoldersData = [...foldersData];
    console.log(updatedFoldersData, "folder dat");
    // Find the source folder from which the dragged item is being dragged
    const sourceFolder = updatedFoldersData.find((folder) => {
      return folder.sub_folder.some(
        (subfolder) => subfolder.id === draggedItem.id
      );
    });

    console.log(sourceFolder, "check source folder");

    if (sourceFolder) {
      // Remove the dragged item from its original parent folder
      sourceFolder.sub_folder = sourceFolder.sub_folder.filter(
        (subfolder) => subfolder.id !== draggedItem.id
      );

      // Add the dragged item to the target folder
      targetFolder.sub_folder.push(draggedItem);
      console.log(updatedFoldersData, "check");

      // Update the state with the modified folders data
      setFoldersData(updatedFoldersData);
    }

    // Reset draggedItem state
    setDraggedItem(null);
  };

  if (data?.sub_folder?.length > 0) {
    return (
      <div
        draggable="true"
        className={"folder_row"}
        onDragStart={(e) => {
          handleDragStart(e, data);
        }}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, data)}
      >
        <div
          style={{ display: "block" }}
          className={
            isExpand && selectedFolder.id === data.id ? "selected_folder" : ""
          }
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
          margin: "5px",
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
