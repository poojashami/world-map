import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import WorldMap from "./WorldMap";
function App() {
  return (
    <div className="App">
      <WorldMap />
    </div>
  );
}

export default App;
