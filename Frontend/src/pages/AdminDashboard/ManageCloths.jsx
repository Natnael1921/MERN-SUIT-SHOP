import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export function ManageCloths({cloths,setClothes}) {
  const [clothForm, setClothForm] = useState({
    image: "",
    description: "",
    price: "",
    size: "",
  });
 
  useEffect(() => {
    async function fetchClothes() {
      try {
        const res = await axios.get("http://localhost:5000/api/clothes");
        console.log("Fetched clothes:", res.data);
        setClothes(res.data.data);
      } catch (error) {
        console.error("error fetching clothes", error);
      }
    }
    fetchClothes();
  }, []);
  function handleChange(e) {
    setClothForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/clothes",
        clothForm
      );
      console.log("added successfully!");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Error occurred. Try again.");
    }
  }

  //delete
  async function deleteCloth(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/clothes/${id}`);
      setClothes((prev) => prev.filter((cloth) => cloth._id !== id));
      alert("deleted succesfully!");
    } catch (error) {
      alert("error deleting cloth");
      console.error("error deleting cloth", error);
    }
  }
  return (
    <div className="cloth-form">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="cloth image"
          name="image"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="cloth description"
          name="description"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="size"
          name="size"
          onChange={handleChange}
        />
        <button type="sumbit">add</button>
      </form>
      {cloths.map((cloth) => (
        <div className="cloth-box" key={cloth._id}>
          <img src={cloth.image} />
          <p>{cloth.description}</p>
          <p>{cloth.size}</p>
          <p>{cloth.price} ETB</p>
          <button onClick={() => deleteCloth(cloth._id)}>delete</button>
        </div>
      ))}
    </div>
  );
}
