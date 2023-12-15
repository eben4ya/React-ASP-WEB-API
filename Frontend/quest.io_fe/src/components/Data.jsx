import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GrCheckbox } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";

const Data = ({ onClick = "" }) => {
  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = useState(true);
  // const questRef = useRef(null);
  // const descRef = useRef(null);
  // const dlRef = useRef(null);
  const [quest, setQuest] = useState("");
  const [desc, setDesc] = useState("");
  const [dl, setDl] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [isDone, setIsDone] = useState(false);

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

  const CreateTask = async (e) => {
    // e.preventDefault();
    // const options = {
    //   timeZone: "Asia/Jakarta",
    //   hour12: false,
    // };
    // const WIB = new Date().toLocaleString("en-GB", options);

    if (quest === "" || desc === "" || dl === "") {
      alert("Please fill all the field");
      e.preventDefault();
    } else {
      try {
        const response = await axios.post("https://localhost:7189/api/Todos", {
          quest: quest,
          desc: desc,
          // dl: WIB,
          dl: dl,
          done: isDone,
        });
        console.log(response.data);
        setQuest("");
        setDesc("");
        setDl("");
        setIsDone(false);
      } catch (err) {
        console.error("Error creating data :", err);
      }
    }
  };

  const Edit = (id, Quest, Desc, Dl, Done) => {
    setOpenForm((prev) => !prev);
    setEdit(true); // menandakan bahwa kita sedang mengedit
    // semua nilai di tag input di set sesuai dengan data yang akan di edit
    setQuest(Quest);
    setDesc(Desc);
    setDl(Dl);
    setIsDone(Done);
    setId(id);
  };

  const UpdateTask = async (e, id) => {
    if (quest === "" || desc === "" || dl === "") {
      alert("Please fill all the field");
      e.preventDefault();
    } else {
      const result = window.confirm("Are you sure want to update this task?");
      if (result) {
        try {
          const response = await axios.put(
            `https://localhost:7189/api/Todos/${id}`,
            {
              id: id, // id harus ditambahkan agar bisa di update
              quest: quest,
              desc: desc,
              dl: dl,
              done: isDone,
            },
          );

          console.log(response.data);
          // semua value di tag input dan id di set ke kosong
          setQuest("");
          setDesc("");
          setDl("");
          setId("");
          setIsDone(false);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      } else {
        e.preventDefault();
      }
    }
  };

  const DeleteTask = async (id) => {
    const result = window.confirm("Are you sure want to delete this task?");
    if (result) {
      try {
        const response = await axios.delete(
          `https://localhost:7189/api/Todos/${id}`,
        );
        GetAllTask();
        console.log(response.data);
      } catch (err) {
        console.error("Error deleting data : ", err);
      }
    }
  };

  const handleViewButton = () => {
    setOpenForm((prev) => !prev);
    setEdit(false); // menonaktifkan edit
    // semua value di tag input dan id di set ke kosong
    setQuest("");
    setDesc("");
    setDl("");
    setId(""); // nilai id di set ke kosong agar tidak terjadi error tidak jadi mengedit
    setIsDone(false);
  };

  return (
    <>
      {openForm ? (
        <section className="relative z-[99999999] flex max-h-[400px] max-w-[600px] flex-col gap-y-4 overflow-y-scroll rounded-xl bg-blue-300 p-2">
          <div className="flex h-fit w-full justify-between ">
            <button
              className="w-fit rounded-full bg-blue-500 px-4 py-2 text-white "
              onClick={() => setOpenForm((prev) => !prev)}
            >
              Create Quest
            </button>
            <IoMdCloseCircleOutline className="h-8 w-8" onClick={onClick} />
          </div>
          <h1 className="text-center text-3xl text-black">
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
                  <td>
                    {item.done ? (
                      <GrCheckboxSelected className="" />
                    ) : (
                      <GrCheckbox className="" />
                    )}
                  </td>

                  <td>
                    <FaPen
                      onClick={() =>
                        Edit(item.id, item.quest, item.desc, item.dl, item.done)
                      }
                    />
                  </td>
                  <td>
                    <FaTrash onClick={() => DeleteTask(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="relative z-[99999999] flex max-h-[400px] max-w-[600px] flex-col gap-y-4 rounded-xl bg-blue-300 p-2">
          <div className="flex h-fit w-full justify-between">
            <h1 className="text-2xl text-black">
              {edit ? "Update quest" : " Create quest"}
            </h1>
            <IoMdCloseCircleOutline className="h-8 w-8" onClick={onClick} />
          </div>
          <form className="flex flex-col space-y-8">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-10">
                <label htmlFor="quest">Quest</label>
                <label htmlFor="desc">Description</label>
                <label htmlFor="dl">Deadline</label>
                <label htmlFor="isDone">isDone</label>
              </div>
              <div className="flex flex-col space-y-4">
                <input
                  className="rounded border p-2 text-black"
                  type="text"
                  id="quest"
                  placeholder="add quest"
                  // ref={questRef}
                  value={quest}
                  onChange={(e) => setQuest(e.target.value)}
                />
                <input
                  className="rounded border p-2 text-black"
                  type="text"
                  id="desc"
                  placeholder="add desc"
                  // ref={descRef}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <input
                  className="rounded border p-2 text-black"
                  type="datetime-local"
                  id="dl"
                  placeholder="add deadline"
                  // ref={dlRef}
                  value={dl}
                  onChange={(e) => setDl(e.target.value)}
                />
                <input
                  className="h-8 w-8 "
                  type="checkbox"
                  checked={isDone}
                  onChange={(e) => setIsDone(e.target.checked)}
                  value={isDone}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mr-8 w-fit rounded-full bg-blue-500 px-4 py-2 text-white"
                onClick={edit ? (e) => UpdateTask(e, id) : (e) => CreateTask(e)}
              >
                {edit ? "Update" : "Create"}
              </button>
              <button
                onClick={handleViewButton}
                className="w-fit rounded-full bg-blue-500 px-4 py-2 text-white"
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
