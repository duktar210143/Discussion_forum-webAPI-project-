import React, { useState } from "react";
import AppBar from "../../../AppBar/AppBar";
import SetUserQuestions from "../Question/SetUserQuestions";
// import provider from profile image provider
import { ProfileImageProvider } from "../../Providers/ProfileImageContext";

// import question state provider
import { QuestionStateProvider } from "../../Providers/LatestQuestionContext";

import GetProfile from "../ProfileComponents/GetProfile";
import SetProfile from "../ProfileComponents/SetProfile";
import GetUserQuestions from "../Question/GetUserQuestions";
import "./Dashboard.css";

const Dashboard = () => {
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);

  const openQuestionModal = () => {
    setIsQuestionsModalOpen(true);
  };

  const closeQuestionModal = () => {
    setIsQuestionsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <AppBar openQuestionModal={openQuestionModal} />
      <ProfileImageProvider>
        <GetProfile />
        <SetProfile />
      </ProfileImageProvider>

{/* wrap the question components with providers to share state amongst components */}
      <QuestionStateProvider>
        <SetUserQuestions
          isOpen={isQuestionsModalOpen}
          onClose={closeQuestionModal}
        />
        <GetUserQuestions />
      </QuestionStateProvider>

    </div>
  );
};

export default Dashboard;
