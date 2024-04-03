import React from "react";
import { useFolders } from "../../context/FolderContext";

const ListComponent = () => {
  const { selectedFolder, setSelectedFolder } = useFolders();
  console.log(selectedFolder, "selected folder");
  return (
    <div>
      {selectedFolder?.folder_name}

      <div>
        {selectedFolder?.sub_folder?.map((folder, index) => {
          return <div key={folder?.id}>{folder?.folder_name}</div>;
        })}
      </div>
    </div>
  );
};

export default ListComponent;
