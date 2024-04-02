import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import ExamPage from './components/ExamPage/ExamPage';
import dummyData from './dummy-data/data';
// import questionData from './dummy-data/questionData';
// import examData from './dummy-data/examData';
import CreateExam from './components/CreateExam/CreateExam';
import HomePage from './components/HomePage/HomePage';
import MockTestSelection from './components/MockTestSelection/MockTestSelection';
import NavBar from './components/NavBar';
import Sign from './components/Signin/Sign';
import PracticePage from './components/Practice/PracticePage';
import data from './dummy-data/data';
import Profile from './components/Profile/Profile';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ExamState from './context/exam/ExamState';
import {useContext, useEffect} from 'react';
import PracticequestionState from "./context/practiceQuestions/PracticequestionState";
import CreatequestionState from "./context/create-question/CreatequestionState";
import subjectContext from "./context/subject/subjectContext";
import ProfileState from "./context/profile/ProfileState";
import ResultState from "./context/result/ResultState";



function App() {

  const { fetchSubjects } = useContext(subjectContext);

  useEffect(() => {
    console.log("Appsladnvljasbgf");
    fetchSubjects();
  }, []);

  return (
    <>
      <Router>
        <div className='App h-screen pt-16'>
          <NavBar />
          <div className='h-full'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/auth" element={<Sign />} />
              <Route exact path="/mock-test" element={<MockTestSelection />} />
              <Route exact path="/create-exam" element={<CreateExam subjectwiseTopics={dummyData} />} />
              <Route exact path="/exam" element={<><ExamState><ExamPage /></ExamState></>} />
              <Route exact path="/create-question" element={<><CreatequestionState><CreateQuestion /></CreatequestionState></>} />
              <Route exact path="/practice" element={<><PracticequestionState><PracticePage subtopics={data[0].subtopics}/></PracticequestionState></>} />
              <Route exact path="/profile" element={<><ProfileState><Profile /></ProfileState></>} />
              <Route exact path="/leaderboard" element={<><ResultState><Leaderboard /></ResultState></>} />
              <Route exact path="/result" element={<><ResultState><Leaderboard /></ResultState></>} />
            </Routes>

          </div>
        </div>
      </Router>
    </>
  );
}

export default App;