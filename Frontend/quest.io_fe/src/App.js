import "./App.css";
import Data from "./components/Data";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <main
          style={{
            background: "url(/img/bg-QuestIo.png)",
            backgroundSize: "cover",
          }}
          className="relative w-screen h-screen flex justify-center items-center"
        >
          <img
            src="/img/login.png"
            className="absolute top-[31px] left-[40px] w-[434px] h-[108px] hover:scale-105 "
            alt="login"
          />
          <img
            src="/img/absolute monas.png"
            className="absolute top-[196px] right-0 w-[206px] h-[239px] brightness-90 hover:brightness-100 hover:scale-105 "
            alt="login"
          />
          <img
            src="/img/absolute padang.png"
            className="absolute top-[374px] left-0 w-[239px] h-[96px] brightness-90 hover:brightness-100 hover:scale-105 "
            alt="login"
          />
          <img
            src="/img/absolute todo.png"
            className="absolute top-[273px] left-[505px] w-[179px] h-[486px] brightness-90 hover:brightness-100 hover:scale-105 "
            alt="login"
            onClick={() => setOpen(!open)}
          />
          {open ? (
            <>
              <Data />
              <button
                className="absolute bottom-1/2 translate-y-[300px]  py-2 px-4 w-fit bg-blue-500 rounded-full  "
                onClick={() => setOpen(!open)}
              >
                Close
              </button>
            </>
          ) : null}
        </main>
      </header>
    </div>
  );
}

export default App;
