import "./App.css";
import Data from "./components/Data";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main
          style={{
            background: "url(/img/bg-QuestIo.png)",
            backgroundSize: "cover",
          }}
          className="w-screen h-screen flex justify-center items-center"
        >
         
          <Data />
        </main>
      </header>
    </div>
  );
}

export default App;
