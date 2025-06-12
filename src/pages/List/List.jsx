import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ListSkeletonLoader from "../../components/ListSkeletonLoader/ListSkeletonLoader";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);

    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }

    setLoading(false);
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    await fetchList();

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list flex flex-col px-12 py-6">
      <p className="text-xl font-semibold mb-4">All Foods List</p>
      <div className="list-table">
        {/* Header row visible only on larger screens */}
        <div className="list-table-format grid grid-cols-5 items-center gap-4 p-3 border-b border-gray-300 font-semibold text-sm bg-gray-100 hidden sm:grid">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {loading ? (
          <ListSkeletonLoader />
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="list-table-format grid grid-cols-5 sm:grid-cols-5 items-center gap-4 p-3 border-b border-gray-300 text-sm"
            >
              <img
                src={`${url}/images/` + item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p
                onClick={() => removeFood(item._id)}
                className="cursor-pointer text-red-500 hover:text-red-700"
              >
                X
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
