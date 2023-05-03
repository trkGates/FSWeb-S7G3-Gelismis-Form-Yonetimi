import './App.css';
import Form from './pages/Form';
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      
      <Router>
      <Form/>
    </Router>
    </div>
  );
}

export default App;
