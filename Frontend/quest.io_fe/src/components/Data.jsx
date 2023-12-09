import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Data = () => {
  const [data, setData] = useState([]);
  const [openForm, setOpenFormt] = useState(true);
  const questRef = useRef(null);
  const descRef = useRef(null);
  const dlRef = useRef(null);

  useEffect(() => {
    GetAllTask();
  }, []);

  const GetAllTask = () => {
    axios
      .get("https://localhost:7189/api/Todos")
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateTask = async (e) => {
    // e.preventDefault();
    // const options = {
    //   timeZone: "Asia/Jakarta",
    //   hour12: false,
    // };
    // const WIB = new Date().toLocaleString("en-GB", options);

    try {
      const response = await axios.post("https://localhost:7189/api/Todos", {
        quest: questRef.current.value,
        desc: descRef.current.value,
        // dl: WIB,
        dl: dlRef.current.value,
      });
      console.log(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // ================ CARA 2 ================
  // pakai fetch doang trus fungsinya dimasukin useEffect

  // const GetAllTask = () => {
  //   fetch("https://localhost:7189/api/Todos", {

  //     method: "GET", // Sesuaikan dengan metode yang dibutuhkan
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Jika diperlukan, Anda dapat menambahkan header lain di sini
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Lakukan sesuatu dengan data yang diterima dari API
  //       setData(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Tangani kesalahan yang mungkin terjadi saat mengambil data dari API
  //       console.error("Error:", error);
  //     });
  // };

  // ================ CARA 2 ================

  return (
    <>
      {openForm ? (
        <section className="flex flex-col max-w-[600px] max-h-[400px] p-2 gap-y-4 bg-blue-300 rounded-xl overflow-y-scroll">
          <button
            className="px-4 py-2 bg-blue-500 w-fit rounded-full text-white "
            onClick={() => setOpenFormt((prev) => !prev)}
          >
            Create Quest
          </button>
          <h1 className="text-black text-center text-3xl">
            Data dari MongoDB :
          </h1>
          {/* <p>{JSON.stringify(data)}</p> */}

          <table className="border-separate border-spacing-x-4">
            <thead>
              <th>Quest</th>
              <th>Desc</th>
              <th>Deadline</th>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td> {item.quest} </td>
                  <td> {item.desc} </td>
                  <td> {item.dl} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="flex flex-col max-w-[600px] max-h-[400px] p-2 gap-y-4 bg-blue-300 rounded-xl">
          <h1 className="">Create Quest</h1>
          <form className="flex flex-col space-y-8">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-10">
                <label htmlFor="quest">Quest</label>
                <label htmlFor="desc">Description</label>
                <label htmlFor="dl">Deadline</label>
              </div>
              <div className="flex flex-col space-y-4">
                <input
                  className="text-black border rounded p-2"
                  type="text"
                  id="quest"
                  placeholder="add quest"
                  ref={questRef}
                />
                <input
                  className="text-black border rounded p-2"
                  type="text"
                  id="desc"
                  placeholder="add desc"
                  ref={descRef}
                />
                <input
                  className="text-black border rounded p-2"
                  type="datetime-local"
                  id="dl"
                  placeholder="add deadline"
                  ref={dlRef}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-4 py-2 mr-8 bg-blue-500 w-fit rounded-full text-white"
                onClick={CreateTask}
              >
                Submit
              </button>
              <button
                onClick={() => setOpenFormt((prev) => !prev)}
                className="px-4 py-2 bg-blue-500 w-fit rounded-full text-white"
              >
                View Quest
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Data;
