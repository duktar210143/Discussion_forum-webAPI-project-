import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import AppBar from "../AppBar/AppBar";
import backgroundImage from "../../Assets/Images/mario_login.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #eaf6f6;
  background-image: url(${backgroundImage});
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
  flex-grow: 1; /* Allow content to grow and take up available space */
`;

const StyledInputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  & input {
    margin-bottom: 10px;
    width: 500px;
    height: 50px;
    font-size: 15px;
    border-radius: 10px;
    border: 5px solid;
    padding-left: 20px;
  }
`;

const StyledButton = styled.button`
  width: 170px;
  height: 50px;
  color: white;
  background-color: rgb(89, 4, 4);
  font-size: 25px;
  font-weight: bold;
  padding-left: 40px;
  margin-top: 20px;
  margin-left: 190px;
  border-radius: 20px;
  border: 5px solid;
  display: flex;
  align-item: center;
  flex-direction: column;
  justify-content: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        localStorage.setItem('token',data.user);
        console.log(data);

        navigate("/dashboard");
      } else {
        // Signup failed, handle the error
        navigate("/login");
        console.log("login failed:", data.error);
        alert('wrong fukin password ya')
        // You can display an error message to the user or take other actions here
      }
    } catch {
      console.error("Error during fetch:");
    }
  }

  return (
    <Container>
      <AppBar>
        <label style={{ paddingRight: 30 }}>Login</label>
      </AppBar>
      <Content>
        <form onSubmit={loginUser}>
          <StyledInputDiv>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </StyledInputDiv>
          <StyledInputDiv>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="create password"
            />
          </StyledInputDiv>
          <StyledButton type="submit">Login</StyledButton>
        </form>
      </Content>
    </Container>
  );
};

export default Login;
