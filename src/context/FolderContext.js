import { createContext, useContext, useState } from "react";
import folderData from "../Data/folderData.json";

const FolderContext = createContext();

const FolderProvider = ({ children }) => {
  const [foldersData, setFoldersData] = useState(folderData);
  const [selectedFolder, setSelectedFolder] = useState();

  return (
    <FolderContext.Provider
      value={{ foldersData, selectedFolder, setSelectedFolder, setFoldersData }}
    >
      {children}
    </FolderContext.Provider>
  );
};

const useFolders = () => useContext(FolderContext);

export { useFolders, FolderProvider };
