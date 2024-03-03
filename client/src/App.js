import './App.css';
import CreateQuestion from './components/CreateQuestion';
import ExamPage from './components/ExamPage';
import dummyData from './data';

function App() {
  return (
    <div className="App">
      {/* <CreateQuestion subjectwiseTopics={dummyData} /> */}
      <ExamPage />
    </div>
  );
}

export default App;