import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AskQuesPage from './pages/AskQuesPage';
import QuestionsPage from './pages/QuestionsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import QuestionPage from './pages/QuestionPage';
import EditAnswerPage from './pages/EditAnswerPage';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'


function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/questions" element={<PrivateRoute />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ask" element={<AskQuesPage />} />
              <Route path="/update_question/:slug" element={<AskQuesPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/edit_profile" element={<EditProfilePage />} />
              <Route path="/question/:slug" element={<QuestionPage />} />
              <Route path="/edit_answer" element={<EditAnswerPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
