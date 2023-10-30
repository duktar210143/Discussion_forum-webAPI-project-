import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetUserQuestions.css";

// import question state provider
import { RecentAddedQuestion } from "../../Providers/LatestQuestionContext";

import { Pencil } from "lucide-react";
import { Heart } from "lucide-react";
import { Reply } from "lucide-react";

const GetUserQuestions = () => {
  const navigate = useNavigate();
  const { question, setQuestion } = RecentAddedQuestion();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  async function fetchUserSpecificQuestions() {
    try {
      // get token from client-side storage
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // send a fetch request to the API endpoint for questions
      const req = await fetch("http://localhost:1337/api/getQuestions", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      const data = await req.json();

      if (data.status === "ok") {
        const reversedQuestions = data.questions
          ? data.questions.reverse()
          : [];
        setQuestion(reversedQuestions);
        setIsLoading(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching the questions.");
    } finally {
      setIsLoading(false); // Mark loading as complete
    }
  }

  useEffect(() => {
    if (question) {
      fetchUserSpecificQuestions();
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="question-list">
          {question && question.length > 0 ? (
            question.map((addedQuestion) => (
              <li key={addedQuestion._id} className="question-item">
                <div className="question-header">
                  <h4>{addedQuestion.question}</h4>
                  <div className="question-actions">
                    <button className="heart-button">
                      <Heart strokeWidth={1.5} />
                    </button>
                    <button className="edit-button">
                      <Pencil strokeWidth={1.5} />
                    </button>
                    <button className="reply-button">
                      <Reply strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <p className="question-info"></p>
              </li>
            ))
          ) : (
            <div className="no-questions-found">
            <p>No questions found. Ask a question to get started!</p>
          </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default GetUserQuestions;
