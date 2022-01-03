import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AskQuesPage from './pages/AskQuesPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import QuestionPage from './pages/QuestionPage';
import EditAnswerPage from './pages/EditAnswerPage';
import SearchedQuesPage from './pages/SearchedQuesPage';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import QuestionsPage from './pages/QuestionsPage';


function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Header />
            <Routes>

              {/* Public Routes */}

              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Private Routes */}

              <Route path="/questions" element={<PrivateRoute><QuestionsPage /></PrivateRoute>} />
              <Route path='/questions/:search' element={<PrivateRoute><SearchedQuesPage /></PrivateRoute>} />
              <Route path="/ask" element={<PrivateRoute><AskQuesPage /></PrivateRoute>} />
              <Route path="/update_question/:slug" element={<PrivateRoute><AskQuesPage /></PrivateRoute>} />
              <Route path="/profile/:username" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/edit_profile" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
              <Route path="/question/:slug" element={<PrivateRoute><QuestionPage /></PrivateRoute>} />
              <Route path="/edit_answer/:pk" element={<PrivateRoute><EditAnswerPage /></PrivateRoute>} />
            
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
