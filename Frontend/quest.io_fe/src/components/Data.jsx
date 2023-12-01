import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Data = () => {
  const [data, setData] = useState([]);

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

  return (
    <section>
      <p className="text-red-500">Data dari MongoDB : </p>
      {/* <p>{JSON.stringify(data)}</p> */}

      <ul>
        {data.map((item, index) => (
          <li className="text-red-500" key={index}>
            {item.quest} - {item.desc}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Data;
