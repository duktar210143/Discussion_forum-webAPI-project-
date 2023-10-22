import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import backgroundImage from "../../Assets/Images/mario.png";
import AppBar from "../CommonComponents/AppBar";

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
  margin-bottom: 120px;
  flex-grow: 1;
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

const AlertContainer = styled.div`
  background-color: #ff0000;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  display: ${(props) => (props.$visible ? "block" : "none")};
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  async function handleSignUp(event) {
    event.preventDefault();

    if (email.length < 1) {
      setAlertMessage("Email must not be empty");
      return false; // Prevent form submission
    }
    // validate email
    if (email.length < 5) {
      setAlertMessage("Email must have at least 3 characters");
      return false; // Prevent form submission
    }

    //
    if (password.length < 4) {
      setAlertMessage("Password must be longer than 4 characters");
      return false;
    }
    if (password === confirmPassword) {
      const response = await fetch("http://localhost:1337/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });

      const signUpData = await response.json();
      console.log(signUpData);

      if (signUpData.status === "ok") {
        // Signup was successful, navigate to the login page
        navigate("/login");
      } else {
        // Signup failed, handle the error
        navigate("/signup");
        console.log("Signup failed:", signUpData.error);
        // You can display an error message to the user or take other actions here
      }
    } else {
      setAlertMessage("Confirm password doesn't match password");
      return false;
    }
  }

  // handling input change
  function handleInputChange() {
    setAlertMessage(""); // Clear the alert message
  }

  return (
    <Container>
      <AppBar>
        <label>Sign Up</label>
      </AppBar>
      <Content>
        <form onSubmit={handleSignUp}>
          <StyledInputDiv>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange();
              }}
              placeholder="Email"
            />
          </StyledInputDiv>
          <StyledInputDiv>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAlertMessage(""); // Clear the alert message
              }}
              type="password"
              placeholder="Create password"
            />
          </StyledInputDiv>
          <StyledInputDiv>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm password"
            />
          </StyledInputDiv>

          <StyledButton type="submit">Sign Up</StyledButton>
        </form>
        <AlertContainer $visible={alertMessage !== ""}>
          {alertMessage}
        </AlertContainer>
      </Content>
    </Container>
  );
};

export default Signup;
