import './App.css';
import HomePage from './components/HomePage/HomePage';
import MockTestSelection from './components/MockTestSelection/MockTestSelection';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <HomePage/> */}
      <MockTestSelection/>
      
    </div>
  );
}

export default App;