import { createContext, useContext, useEffect, useState } from "react";
import folderData from "../Data/folderData.json";

const FolderContext = createContext();

const FolderProvider = ({ children }) => {
  const [foldersData, setFoldersData] = useState(folderData?.sub_folder);
  const [selectedFolder, setSelectedFolder] = useState();
  const [draggedItem, setDraggedItem] = useState();

  useEffect(() => {}, [folderData]);

  return (
    <FolderContext.Provider
      value={{
        foldersData,
        selectedFolder,
        setSelectedFolder,
        setFoldersData,
        draggedItem,
        setDraggedItem,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

const useFolders = () => useContext(FolderContext);

export { useFolders, FolderProvider };
