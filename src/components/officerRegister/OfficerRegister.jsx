import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./officerRegister.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Footer from "../footer/footer";

const OfficerRegister = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters long"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const formData = {
        ...values,
        role: "officer", // Set the role as "lecturer"
      };
      const response = await axios.post(
        "http://localhost:8000/api/v1/register",
        formData
      );
      const { success, user } = response.data;
      if (success) {
        navigate("/officer-login");
        // You can also store user data in your state if needed
        setStatus({ success: true, user });
      } else {
        setStatus({ success: false });
      }
    } catch (error) {
      alert(error.response.data.message);
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <MetaData title={`Lecturer Register`} />
          <h2>Lecturer Registration Form</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div>
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfficerRegister;
