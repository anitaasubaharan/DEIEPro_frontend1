import React, { useState, useEffect } from "react";
import styles from "./request.module.css";
import Footer from "../footer/footer";
import axios from "axios";
import Header2 from "../header/Header2";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [formDataList, setFormDataList] = useState([]);

  const fetchFormData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/formdata");
      setFormDataList(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Header2 />
      <div className={styles.container}>
        <div
          style={{
            width: "40%",
            height: "60%",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: 100,
              display: "flex",
              flexGrow: 1,
              overflow: "scroll",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {formDataList.map((formData) => (
              <div
                key={formData._id}
                style={{
                  padding: 20,
                  paddingRight: "30%",
                  paddingLeft: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {formData.picture && (
                  <img
                    src={`http://localhost:8000/${formData.picture}`}
                    alt={formData.name}
                    width={150}
                    height={150}
                    style={{ borderRadius: 10, overflow: "hidden" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              display: "right",
              marginBottom: 10,
              marginLeft: 50,
            }}
          >
            <button
              onClick={() => navigate("/other")}
              style={{
                padding: 15,
                backgroundColor: "#bda678",
                border: 0,
                borderRadius: 10,
              }}
            >
              Add Other
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Add;
