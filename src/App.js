import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: "" });

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get("/api/users");
      setUserData(response.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
    console.log(userData);
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Label htmlFor="destination">Name</Label>
        <Input {...register("name")} id="name" />
        <Label htmlFor="notes">Email</Label>
        <Input {...register("email")} id="email" />
        <button type="submit">Add</button>
        <button>update</button>
        <ErrorMessage>
          <p>{errors.destination && errors.destination.message}</p>
          <p>{errors.notes && errors.notes.message}</p>
        </ErrorMessage>
      </Form>

      {userData &&
        userData.map((user) => (
          <div key={user._id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <button
              onClick={() => {
                handleDelete(user._id);
              }}
            >
              delete
            </button>
            <button onClick={() => handleEdit(user._id)}>edit</button>
          </div>
        ))}
    </div>
  );

  async function onSubmit(data) {
    const newUser = { username: data.name, email: data.email };
    try {
      await axios.post("/api/users", newUser);
      getUsers();
    } catch (error) {
      console.log("Error", error.messages);
    }
  }

  async function handleDelete(_id) {
    console.log(_id);
    try {
      await axios.delete("/api/users/", { data: { _id: _id } });
      getUsers();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function handleEdit(_id) {
    const data = {
      _id: _id,
      user: {
        username: "Eli",
        email: "dsfsdfsdf",
      },
    };
    try {
      await axios.put("/api/users/", data);
      getUsers();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
}

export default App;

const Form = styled.form`
  display: grid;
  width: 300px;
  gap: 10px;
  padding: 20px;
  background-color: #000000;
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 0.8rem;
`;
