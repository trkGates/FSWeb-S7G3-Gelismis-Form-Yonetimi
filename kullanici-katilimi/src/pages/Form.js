import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";

const FormPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.length < 3) {
      setNameError("Name should be at least 3 characters long.");
      return;
    }
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      return;
    }
    try {
      const response = await axios.post("https://reqres.in/api/users", {
        name,
        email,
        password,
      });
      const newUser = response.data;
      setUsers([...users, newUser]);
      console.log(response.data);
      setName("");
      setEmail("");
      setPassword("");
      setNameError("");
      setEmailError("");
      setPasswordError("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="en-dıs">
        <div className="ortalama">
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="name">
              <Form.Label>Name and Surname:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name and surname"
                isInvalid={nameError}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                isInvalid={emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                isInvalid={passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="buttton"> <Button variant="primary" type="submit">
              Ekle
            </Button></div>
           
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
