import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import OrderSkeletonLoader from "../../components/OrderSkeletonLoader/OrderSkeletonLoader";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchAllOrders = async () => {
    setLoading(true);
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error!");
    }
    setLoading(false);
  };

  // Update order status
  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });

    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add px-4 py-6">
      <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
      <div className="order-list">
        {loading ? (
          <OrderSkeletonLoader />
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="order-item grid grid-cols-5 gap-6 p-5 border border-tomato mb-8 text-sm text-gray-700"
            >
              <img
                src={assets.parcel_icon}
                alt="Order Icon"
                className="w-12 h-12 object-cover"
              />
              <div>
                <p className="order-item-food font-semibold">
                  {order.items.map((item, index) => {
                    return index === order.items.length - 1
                      ? item.name + " x " + item.quantity
                      : item.name + " x " + item.quantity + ", ";
                  })}
                </p>
                <p className="order-item-name font-semibold mt-6 mb-2">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address mb-2">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p className="text-lg">Items: {order.items.length}</p>
              <p className="text-lg">₹{order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="bg-[#FFE8E4] border border-tomato p-2 w-24 text-sm"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
