import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", image);

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Upload successful");
      setForm({ name: "", description: "", price: "", category: "" });
      setImage(null);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage(err?.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Margherita Pizza"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="e.g. A delicious cheesy pizza..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price and Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Pizza">Pizza</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Thali</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Non Veg">Non Veg</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover border rounded"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Submit
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}
    </div>
  );
};

export default Add;
