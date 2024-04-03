import "./App.css";
import ListComponent from "./Components/ListComponent/ListComponent";
import Sidebar from "./Components/Siderbar/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="app_container">
        <Sidebar></Sidebar>
        <ListComponent />
      </div>
    </div>
  );
}

export default App;
