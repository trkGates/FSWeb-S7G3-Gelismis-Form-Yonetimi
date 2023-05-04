import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("İsim girmediniz").min(5, "En az 5 karakter olmalı."),
  email: yup.string().required("Mail girmediniz").email("Mail hatalı girdiniz."),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short"),
});
const FormPage = () => {
  const [users, setUsers] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://reqres.in/api/users", values);
        const newUser = response.data;
        setUsers([...users, newUser]);
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    }, 
  });
  return (
    <>
      <div id="en-dıs">
        <div className="ortalama">
          <Form onSubmit={formik.handleSubmit} className="form">
            <Form.Group controlId="name">
              <Form.Label>Name and Surname:</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("name")}
                placeholder="Enter your name and surname"
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Enter your email"
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                {...formik.getFieldProps("password")}
                placeholder="Enter your password"
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="buttton">
              <Button variant="primary" type="submit">
                Ekle
              </Button>
            </div>
          </Form>
          {users.length > 0 && (
            <div className="user-tablosu">
              <h2>Users:</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FormPage;