import React, { useEffect, useState } from "react";
import "./EditUserQuestion.css";
import { baseApiUrl } from "../apiConfig";

const EditUserQuestion = ({ questionId, onClose, isEditOpen }) => {
  // state of the question to be edited
  const [editQuestionContent, setEditQuestionContent] = useState("");
  // Function to fetch edit question from the server

  async function getEditModal() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // send a fetch request from the api to the server for getting the question to change
      const response = await fetch(`${baseApiUrl}editQuestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          // send the questionId through the body of the request
          questionId: questionId,
        }),
      });

      if (!response.ok) {
        // Check for HTTP error status
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const fetchedData = await response.json();

      if (fetchedData.status === "ok") {
        console.log("data fetched");
        console.log(fetchedData.question.question);
        setEditQuestionContent(fetchedData.question.question);
      }
    } catch (e) {
      console.error("Error during fetch:", e);
    }
  }

  useEffect(() => {
    if (isEditOpen) {
      getEditModal();
    }
  }, [isEditOpen]);

  return (
    isEditOpen && (
      <div className="full-screen-modal">
        <div className="modal-content">
          <h1>Edit Question</h1>
          <textarea
            placeholder="Ask your question..."
            value={editQuestionContent}
            onChange={(event) => {
              setEditQuestionContent(event.target.value);
            }}
          />
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          {/* Add additional elements as needed */}
          {/* For example, a submit button */}
          {/* <button className="submit-button">Submit</button> */}
        </div>
      </div>
    )
  );
};

export default EditUserQuestion;
