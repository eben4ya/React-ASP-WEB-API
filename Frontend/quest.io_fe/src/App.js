import "./App.css";
import { useState, useEffect, Suspense, lazy } from "react";
import Data from "./components/Data";
// const Data = lazy(() => import("./components/Data")); // cannot impot lazy to component that fetch data
const Loading = lazy(() => import("./components/Loading")); // suspense fallback dont work in react or maybe i am wrong

function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, [3000]);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main
          style={{
            background: "url(/img/bg-QuestIo.png)",
            backgroundSize: "cover",
          }}
          className="relative flex h-screen w-screen items-center justify-center"
        >
          <img
            src="/img/login.png"
            className="absolute left-[40px] top-[31px] h-[108px] w-[434px] hover:scale-105 "
            alt="login"
          />
          <img
            src="/img/absolute monas.png"
            className="absolute right-0 top-[196px] h-[239px] w-[206px] brightness-90 hover:scale-105 hover:brightness-100 "
            alt="login"
          />
          <img
            src="/img/absolute padang.png"
            className="absolute left-0 top-[374px] h-[96px] w-[239px] brightness-90 hover:scale-105 hover:brightness-100 "
            alt="login"
          />
          <img
            src="/img/absolute todo.png"
            className="absolute left-[505px] top-[273px] h-[486px] w-[179px] brightness-90 hover:scale-105 hover:brightness-100 "
            alt="login"
            onClick={() => setOpen(!open)}
          />
          {open ? (
            <>
              <Data />
              <button
                className="absolute bottom-1/2 w-fit translate-y-[300px] rounded-full bg-blue-500 px-4 py-2  "
                onClick={() => setOpen(!open)}
              >
                Close
              </button>
            </>
          ) : null}
        </main>
      )}
    </>
  );
}

export default App;
