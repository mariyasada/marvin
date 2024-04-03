import React from "react";
import { useFolders } from "../../context/FolderContext";
import "./ListComponent.css";

const ListComponent = () => {
  const { selectedFolder, setSelectedFolder } = useFolders();
  return (
    <div className="Listcontainer">
      <div className="title" style={{ fontSize: "2rem" }}>
        {selectedFolder?.folder_name}
      </div>

      <div className="list">
        {selectedFolder?.sub_folder?.map((folder, index) => {
          return (
            <div key={folder?.id} className="list_item">
              <div>
                <img
                  src="https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="folder image"
                />
              </div>
              <div className="title">{folder?.folder_name}</div>
              <span>updated 3 days ago</span>
              <div className="images_container">
                <img
                  src="https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="ronuded_image"
                />
                <img
                  src="https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="ronuded_image1"
                />
                <img
                  src="https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="ronuded_image2"
                />
                <div className="rounded_image3">+7</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListComponent;
