import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.name || !data.description || !data.price || !image) {
      toast.error("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } 
      else {
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      toast.error("An error occurred while adding the product.");
      console.error(error);
    }
  };

  return (
    <div className="add max-w-4xl mx-auto mt-8 px-4 mb-12">
      <form className="space-y-6" onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="add-img-upload flex flex-col items-center space-y-2">
          <p className="text-lg font-semibold">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
              className="w-32 h-32 object-cover border-2 border-gray-300 rounded"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name Section */}
        <div className="add-product-name flex flex-col space-y-2">
          <label htmlFor="name" className="text-lg font-semibold">Product name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            id="name"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Description Section */}
        <div className="add-product-description flex flex-col space-y-2">
          <label htmlFor="description" className="text-lg font-semibold">Product description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id="description"
            rows="6"
            placeholder="Write content here"
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Category and Price Section */}
        <div className="add-category-price flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Category */}
          <div className="add-category flex flex-col space-y-2 w-full sm:w-1/2">
            <label htmlFor="category" className="text-lg font-semibold">Product Category</label>
            <select
              onChange={onChangeHandler}
              name="category"
              id="category"
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Salad">Pizza</option>
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

          {/* Price */}
          <div className="add-price flex flex-col space-y-2 w-full sm:w-1/2">
            <label htmlFor="price" className="text-lg font-semibold">Product Price</label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              id="price"
              placeholder="₹20"
              min="0"
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="add-btn px-6 py-2 bg-black text-white rounded-md w-full sm:w-auto hover:bg-gray-800 focus:outline-none"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
