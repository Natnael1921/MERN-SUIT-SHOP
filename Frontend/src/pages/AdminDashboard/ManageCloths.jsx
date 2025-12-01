import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/admin.css";
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
      const res = await axios.get("http://localhost:5000/api/clothes");
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
    const res = await axios.post(
      "http://localhost:5000/api/clothes",
      clothForm
    );
    alert("Cloth added!");
    setAddIsOpen(false);
    setClothes((prev) => [...prev, res.data.cloth]);
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
      const res = await axios.put(
        `http://localhost:5000/api/clothes/${editId}`,
        clothForm
      );

      setClothes((prev) =>
        prev.map((c) => (c._id === editId ? res.data.cloth : c))
      );

      alert("Updated successfully!");
      setEditIsOpen(false);
    } catch (err) {
      alert("Update failed");
    }
  }

  // Delete cloth
  async function deleteCloth(id) {
    await axios.delete(`http://localhost:5000/api/clothes/${id}`);
    setClothes((prev) => prev.filter((cloth) => cloth._id !== id));
  }

  return (
    <div className="manage-cloths">
      {(addIsOpen || editIsOpen) && <div className="overlay"></div>}
      <button className="add-button" onClick={() => setAddIsOpen(true)}>
        Add Cloth
      </button>
      {addIsOpen && (
        <form className="cloth-form" onSubmit={handleSubmit}>
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
          <div className="cloth-box" key={cloth._id}>
            <img src={cloth.image} alt={cloth.description} />
            <p>{cloth.description}</p>
            <p>Type: {cloth.type}</p>
            <p>Color: {cloth.color}</p>
            <p>Size: {cloth.size}</p>
            <p>{cloth.price} ETB</p>

            <button onClick={() => openEdit(cloth)} className="edit-button">
              Edit
            </button>
            <button onClick={() => deleteCloth(cloth._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
