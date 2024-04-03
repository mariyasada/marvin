import "./App.css";
import ListComponent from "./Components/ListComponent/ListComponent";
import Sidebar from "./Components/Siderbar/Sidebar";
import Sidebar1 from "./Components/Siderbar/Sidebar1";

function App() {
  return (
    <div className="App">
      <div className="app_container">
        <Sidebar />
        <ListComponent />
      </div>
    </div>
  );
}

export default App;
