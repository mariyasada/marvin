import React, { useState, useEffect } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdArrowRight } from "react-icons/md";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { useFolders } from "../../context/FolderContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CommonFolderRow.css";

const CommonFolderRow = ({ data, index }) => {
  const {
    selectedFolder,
    setSelectedFolder,
    setFoldersData,
    foldersData,
    draggedItem,
    setDraggedItem,
  } = useFolders();
  const [isExpand, setExpand] = useState(false);

  // handle opne and close action
  const handleClick = (e) => {
    e.preventDefault();
    setExpand(!isExpand);
    setSelectedFolder(data);
  };

  const handleDragStart = (e, folder) => {
    setDraggedItem(folder);
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const findParentFolder = (e, data, draggedItem) => {
    e.stopPropagation();
    let parentFolder = null;
    data.forEach((folder) => {
      // Find the subfolder in the current folder that matches the parent_id of the draggedItem
      const subfolder = folder.sub_folder.find(
        (subfolder) => subfolder.id === draggedItem.parent_id
      );

      // If the subfolder is found, assign it to parentFolder
      if (subfolder) {
        parentFolder = subfolder;
        return;
      }
    });
    return parentFolder;
  };

  // creating one function which recursively check the targetfolder in su folders

  const updateDataRecursively = (folder, targetData) => {
    if (folder.id === targetData.id) {
      return targetData;
    } else {
      return {
        ...folder,
        sub_folder: folder.sub_folder.map((subFolder) =>
          updateDataRecursively(subFolder, targetData)
        ),
      };
    }
  };

  const handleDrop = (e, targetFolder, draggedItem) => {
    e.stopPropagation();
    e.preventDefault();

    if (!draggedItem) return;

    // Find the source folder from which the dragged item is being dragged
    if (draggedItem.level === 2) {
      const sourceFolder = foldersData.find((folder) => {
        return folder.sub_folder.some(
          (subfolder) => subfolder.id === draggedItem.id
        );
      });

      if (!sourceFolder) return;

      // copy of source folder
      const updatedSourceFolder = {
        ...sourceFolder,
        sub_folder: sourceFolder.sub_folder.filter(
          (subfolder) => subfolder.id !== draggedItem.id
        ),
      };

      // Adding to the target folder
      const updatedTargetFolder = {
        ...targetFolder,
        sub_folder: targetFolder.sub_folder.concat(draggedItem),
      };

      // const updatedFoldersData = foldersData.map((folder) =>
      //   folder.id === updatedSourceFolder.id
      //     ? updatedSourceFolder

      //     : folder.id === updatedTargetFolder.id
      //     ? updatedTargetFolder
      //     : folder.sub_folder.some((sf) => sf.id === updatedTargetFolder.id)
      //     ? {
      //         ...folder,
      //         sub_folder: folder?.sub_folder?.map((sbf) =>
      //           sbf.id === updatedTargetFolder.id ? updatedTargetFolder : sbf
      //         ),
      //       }
      //     : folder
      const updatedFoldersData = foldersData.map((folder) =>
        folder.id === updatedSourceFolder.id
          ? updatedSourceFolder
          : updateDataRecursively(folder, updatedTargetFolder)
      );

      // check which folder is selected

      if (selectedFolder.id === sourceFolder.id) {
        setSelectedFolder(updatedSourceFolder);
      } else if (selectedFolder.id === targetFolder.id) {
        setSelectedFolder(updatedTargetFolder);
      }
      setFoldersData(updatedFoldersData);
      setDraggedItem(null);
    } else if (draggedItem.level === 3) {
      const sourceFolder = findParentFolder(e, foldersData, draggedItem);
      if (!sourceFolder) return;

      // copy of parent folder
      const updatedSourceFolder = {
        ...sourceFolder,
        sub_folder: sourceFolder.sub_folder.filter(
          (subfolder) => subfolder.id !== draggedItem.id
        ),
      };

      // Adding to the target folder
      const updatedTargetFolder = {
        ...targetFolder,
        sub_folder: targetFolder.sub_folder.concat(draggedItem),
      };

      // const updatedFoldersData = foldersData.map((folder) =>
      //   folder.sub_folder.some((f) => f.id === updatedSourceFolder.id)
      //     ? {
      //         ...folder,
      //         sub_folder: folder?.sub_folder?.map((sbf) =>
      //           sbf.id === updatedSourceFolder.id ? updatedSourceFolder : sbf
      //         ),
      //       }
      //     : folder.id === updatedTargetFolder.id
      //     ? updatedTargetFolder
      //     : folder.sub_folder.some((f) => f.id === updatedTargetFolder.id)
      //     ? {
      //         ...folder,
      //         sub_folder: folder?.sub_folder?.map((sbf) =>
      //           sbf.id === updatedTargetFolder.id ? updatedTargetFolder : sbf
      //         ),
      //       }
      //     : folder
      // );
      const updatedFoldersData = foldersData.map((folder) =>
        folder.sub_folder.some((f) => f.id === updatedSourceFolder.id)
          ? {
              ...folder,
              sub_folder: folder?.sub_folder?.map((sbf) =>
                sbf.id === updatedSourceFolder.id ? updatedSourceFolder : sbf
              ),
            }
          : updateDataRecursively(folder, updatedTargetFolder)
      );
      // check which folder is selected

      if (selectedFolder.id === sourceFolder.id) {
        setSelectedFolder(updatedSourceFolder);
      } else if (selectedFolder.id === targetFolder.id) {
        setSelectedFolder(updatedTargetFolder);
      }
      setFoldersData(updatedFoldersData);
      setDraggedItem(null);
    } else {
    }
  };

  if (data?.sub_folder) {
    return (
      <div
        draggable="true"
        className={"folder_row"}
        onDragStart={(e) => {
          handleDragStart(e, data);
        }}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, data, draggedItem)}
      >
        <div
          style={{ display: "block" }}
          className={
            isExpand && selectedFolder.id === data.id ? "selected_folder" : ""
          }
          onClick={handleClick}
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
              {data?.folder_name !== "" && data.folder_name}
              {isExpand &&
                selectedFolder.id === data.id &&
                `
             (${data?.sub_folder?.length} item)`}
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
        onDrop={(e) => handleDrop(e, data, draggedItem)}
      >
        {data?.folder_name}
      </div>
    );
  }
};

export default CommonFolderRow;
