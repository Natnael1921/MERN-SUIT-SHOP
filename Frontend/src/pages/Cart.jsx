import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/cart.css";
export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
        toast.error("Error fetching cart items");
      }
    }
    fetchCartItems();
  }, []);

  const deleteCartItem = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div style={{ marginTop: 8 }}>
            <button
              style={{ marginRight: 8 }}
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:5000/api/cart/${id}`);
                  setCartItems((prev) =>
                    prev.filter((item) => item._id !== id)
                  );
                  toast.success("Deleted successfully");
                } catch (err) {
                  console.error(err);
                  toast.error("Error deleting item");
                }
                closeToast();
              }}
            >
              Yes
            </button>
            <button onClick={closeToast}>No</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleOrder = (item) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to place this order?</p>
          <div style={{ marginTop: 8 }}>
            <button
              style={{ marginRight: 8 }}
              onClick={() => {
                const body = {
                  userId,
                  items: [
                    {
                      clothId: item.clothId._id,
                      image: item.clothId.image,
                      description: item.clothId.description,
                      price: item.clothId.price,
                      size: item.clothId.size,
                      quantity: item.quantity || 1,
                    },
                  ],
                };
                axios
                  .post("http://localhost:5000/api/orders/create", body)
                  .then((res) => {
                    if (res.status === 201)
                      toast.success("Order placed successfully");
                    else toast.error("Failed to place order");
                  })
                  .catch((error) => {
                    console.error("Error placing order", error);
                    toast.error("Error placing order. Try again later");
                  });
                closeToast();
              }}
            >
              Yes
            </button>
            <button onClick={closeToast}>No</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="cart-page" data-aos="fade-up">
      {cartItems.map(
        (item) =>
          item.clothId && (
            <div className="cart-box" key={item._id} data-aos="fade-up">
              <img src={item.clothId.image} alt="cart-item" />
              <div>
                <p>Type: {item.clothId.description}</p>
                <p>Size: {item.clothId.size}</p>
                <p>Price: {item.clothId.price}</p>

                <button
                  data-aos="fade-up"
                  className="order-button"
                  onClick={() => handleOrder(item)}
                >
                  Order
                </button>
                <button
                  data-aos="fade-up"
                  className="delete-button"
                  onClick={() => deleteCartItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
      )}
      <ToastContainer position="top-right" />
    </div>
  );
}
