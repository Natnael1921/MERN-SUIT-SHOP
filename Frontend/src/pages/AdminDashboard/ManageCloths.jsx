import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/admin.css";
import api from "../../api";
export function ManageCloths({ cloths, setClothes }) {
  const [clothForm, setClothForm] = useState({
    image: "",
    description: "",
    price: "",
    size: "",
    type: "",
    color: "",
  });

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    async function fetchClothes() {
      const res = await api.get("/api/clothes");
      setClothes(res.data.data);
    }
    fetchClothes();
  }, []);

  function handleChange(e) {
    setClothForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Add cloth
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/clothes",
        clothForm
      );

      setAddIsOpen(false);
      setClothes((prev) => [...prev, res.data.cloth]);

      toast.success("Cloth added successfully!");
    } catch (err) {
      toast.error("Failed to add cloth");
    }
  }

  // Open edit form
  function openEdit(cloth) {
    setEditId(cloth._id);
    setClothForm(cloth);
    setEditIsOpen(true);
  }

  // Update cloth
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await api.put(
        `/api/clothes/${editId}`,
        clothForm
      );

      setClothes((prev) =>
        prev.map((c) => (c._id === editId ? res.data.cloth : c))
      );

      setEditIsOpen(false);
      toast.success("Cloth updated successfully!");
    } catch (err) {
      toast.error("Update failed!");
    }
  }

  // Delete cloth
  async function deleteCloth(id) {
    try {
      await api.delete(`/api/clothes/${id}`);
      setClothes((prev) => prev.filter((cloth) => cloth._id !== id));
      toast.info("Cloth deleted!");
    } catch (err) {
      toast.error("Delete failed!");
    }
  }

  return (
    <div className="manage-cloths">
      {(addIsOpen || editIsOpen) && <div className="overlay"></div>}
      <button
        className="add-button"
        onClick={() => setAddIsOpen(true)}
        data-aos="fade-up"
      >
        Add Cloth
      </button>
      {addIsOpen && (
        <form className="cloth-form" onSubmit={handleSubmit} >
          <button
            type="button"
            className="close-button"
            onClick={() => setAddIsOpen(false)}
          >
            ×
          </button>

          <h2>Add New Cloth</h2>

          <input
            type="url"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="size"
            placeholder="Size"
            onChange={handleChange}
          />

          <select name="type" onChange={handleChange}>
            <option value="">Type</option>
            <option value="wedding">Wedding</option>
            <option value="business">Business</option>
            <option value="vintage">Vintage</option>
            <option value="casual">Casual</option>
          </select>

          <select name="color" onChange={handleChange}>
            <option value="">Color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="blue">Blue</option>
          </select>

          <button className="submit-button">Add</button>
        </form>
      )}

      {editIsOpen && (
        <form className="cloth-form" onSubmit={handleUpdate}>
          <button
            type="button"
            className="close-button"
            onClick={() => setEditIsOpen(false)}
          >
            ×
          </button>

          <h2>Edit Cloth</h2>

          <input
            type="url"
            name="image"
            value={clothForm.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={clothForm.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={clothForm.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="size"
            value={clothForm.size}
            onChange={handleChange}
          />

          <select name="type" value={clothForm.type} onChange={handleChange}>
            <option value="">Type</option>
            <option value="wedding">Wedding</option>
            <option value="business">Business</option>
            <option value="vintage">Vintage</option>
            <option value="casual">Casual</option>
          </select>

          <select name="color" value={clothForm.color} onChange={handleChange}>
            <option value="">Color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="blue">Blue</option>
          </select>

          <button className="submit-button">Update</button>
        </form>
      )}

      <div className="admin-cloth-container">
        {cloths.map((cloth) => (
          <div className="cloth-box" key={cloth._id} data-aos="fade-up">
            <img src={cloth.image} alt={cloth.description} />
            <p>{cloth.description}</p>
            <p>Type: {cloth.type}</p>
            <p>Color: {cloth.color}</p>
            <p>Size: {cloth.size}</p>
            <p>{cloth.price} ETB</p>

            <button
              onClick={() => openEdit(cloth)}
              className="edit-button"
              data-aos="fade-up"
            >
              Edit
            </button>
            <button onClick={() => deleteCloth(cloth._id)} data-aos="fade-up">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
