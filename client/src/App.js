import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import ExamPage from './components/ExamPage/ExamPage';
import dummyData from './dummy-data/data';
import questionData from './dummy-data/questionData';
import examData from './dummy-data/examData';
import CreateExam from './components/CreateExam/CreateExam';
import HomePage from './components/HomePage/HomePage';
import MockTestSelection from './components/MockTestSelection/MockTestSelection';
import NavBar from './components/NavBar';
import Sign from './components/Signin/Sign';
import PracticePage from './components/Practice/PracticePage';
import data from './dummy-data/data';



function App() {
  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <div className='mt-16'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/auth" element={<Sign />} />
              <Route exact path="/mock-test" element={<MockTestSelection />} />
              <Route exact path="/create-exam" element={<CreateExam />} />
              <Route exact path="/exam" element={<ExamPage examData={examData} questionData={questionData} />} />
              <Route exact path="/create-question" element={<CreateQuestion subjectwiseTopics={dummyData} />} />
              <Route exact path="/practice" element={<PracticePage subtopics={data[0].subtopics}/>} />


            </Routes>

          </div>
        </div>
      </Router>
    </>
  );
}

export default App;