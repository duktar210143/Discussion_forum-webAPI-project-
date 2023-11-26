import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import custom hook RecentAddedQuestion
import { RecentAddedQuestion } from "../../Providers/LatestQuestionContext";

import "./SetUserQuestions.css";
import jwt from "jsonwebtoken";

{/*  pass the state  state from appbar component to open and close Question field
and functions from dashboard components */}
const SetUserQuestions = ({ isOpen, onClose }) => {
  const [newQuestion, setNewQuestion] = useState([]); // To store the value of the text area
  const { setQuestion } = RecentAddedQuestion();
  const navigate = useNavigate();

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleSubmit = () => {
    postQuestions();
    onClose();
  };

  // post request to add the question to the database
  async function postQuestions() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        console.log("token does not exist");
        return;
      }
      const user = jwt.decode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // send a fetch request to the api endPoint
      const req = await fetch("http://localhost:1337/api/setQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          question: newQuestion,
        }),
      });

      const data = await req.json();
      if (data.status === "ok") {
        const reversedQuestions = data.questions
          ? data.questions.reverse()
          : [];
        setQuestion(reversedQuestions);
        setNewQuestion('')
      }
    } catch (error) {
      console.error("An error occurred while updating the quote:", error);
      alert(
        "An error occurred while updating the quote. Please check the console for details."
      );
    }
  }

  return (
    isOpen && (
      <div className="full-screen-modal">
        <div className="modal-content">
          <textarea
            placeholder="Ask your question..."
            value={newQuestion}
            onChange={handleQuestionChange}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="close-button " onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default SetUserQuestions;
