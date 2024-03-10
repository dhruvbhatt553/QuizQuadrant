import './App.css';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import ExamPage from './components/ExamPage/ExamPage';
import dummyData from './dummy-data/data';
import questionData from './dummy-data/questionData';
import examData from './dummy-data/examData';
import CreateExam from './components/CreateExam/CreateExam';

function App() {
  return (
    <div className="App">
      {/* <CreateQuestion subjectwiseTopics={dummyData} /> */}
      {/* <ExamPage examData={examData} questionData={questionData} /> */}
      <CreateExam />
    </div>
  );
}

export default App;