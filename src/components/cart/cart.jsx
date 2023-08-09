import React, { useContext, useEffect, useState } from "react";
import styles from "./cart.module.css";
import CartContext from "../../context/cartContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";
import AuthContext from "../../context/authContext";
import Cookies from "js-cookie";


const Home = () => {
  const { cart, removeEquipment } = useContext(CartContext);
  const [users, setUsers] = useState([]);
  const [lecturer, setLecturer] = useState("");
  // const { user, logout } = useContext(AuthContext);

  let user = Cookies.get("user");
  user = JSON.parse(user);

  const handleRemove = (equipment) => {
    removeEquipment(equipment);
  };

  const handleSubmit = async () => {
    // Logic for submitting cart for approval

    const cartItems = cart.map((item, index) => {
      return {
        name: item.name,
        quantity: 1,
        image: item.imageURL,
        product: "64a953706228289e46c6a859",
      };
    });

    const reqObj = {
      user: user._id,
      orderItems: cartItems,
      lecturerId: lecturer,
    };
    console.log(reqObj);

    const response = await axios.post(
      "http://localhost:8000/api/v1/order/new",
      reqObj
    );
    console.log(response.data);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/lecturer");

      setUsers(response.data.lecturers);
      console.log(response.data.lecturers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const onOptionChangeHandler = (event) => {
    console.log(event.target.value);
    setLecturer(event.target.value);
  };

  return (
    <div>
      <Header />

      <div className={styles.cartContainer}>
        <div className={styles.itemContainer}>
          <div className={styles.lecturerContainer}>
            <label>Select Lecturer:</label>
            <select onChange={onOptionChangeHandler}>
              <option>Select Lecturer</option>
              {users.map((user, index) => {
                return (
                  <option key={index} value={user._id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          <h2>Cart:</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((equipment) => (
                <div className={styles.cartItem} key={equipment.id}>
                  <img src={equipment.imageURL} alt="" />
                  <div>{equipment.name}</div>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemove(equipment)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className={styles.submitContainer}>
                <Button variant="contained" onClick={handleSubmit}>
                  Submit for Approval
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
