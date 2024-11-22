import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./modules/login/components/Login";
import MainLayout from "@/modules/core/components/MainLayout";

import { ProtectedRoute } from "./modules/login/hoc/withAuth";
import ChallengeLayout from "./modules/challenge/components/ChallengeLayout";
import "../src/styles/styles.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>} >
        <Route path="challenges" element={<ChallengesAvailable />} />

        </Route>
        <Route path="/practice" element={<ChallengeLayout />} />

      </Routes>
    </Router>
  );
};

export default App;
