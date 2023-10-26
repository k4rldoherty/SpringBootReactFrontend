import './App.css';
import './components/Appbar'
import ButtonAppBar from './components/Appbar';
import Student from './components/Student';

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <Student/>
    </div>
  );
}

export default App;
