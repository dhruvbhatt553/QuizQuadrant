import './App.css';
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

function App() {
  return (
    <div className="App">
      <NavBar/>  
      <CreateQuestion subjectwiseTopics={dummyData} />
      {/* <ExamPage examData={examData} questionData={questionData} /> */}
      {/* <CreateExam /> */}
      {/* <HomePage/> */}
      {/* <MockTestSelection/> */}
      <Sign/>
      
    </div>
  );
}

export default App;