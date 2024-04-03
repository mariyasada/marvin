import "./App.css";
import ListComponent from "./Components/ListComponent/ListComponent";
import Sidebar from "./Components/Siderbar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <ListComponent />
    </div>
  );
}

export default App;
