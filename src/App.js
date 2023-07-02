import {
  BrowserRouter as Router,  
    Routes,  
    Route,   
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Router>
      <Navbar/>
<Routes>  
    <Route exact path='/' element={< Home />}></Route>  
    <Route exact path='/about' element={< About />}></Route>  
</Routes>  
    </Router>
    <h1>This is iNotebook</h1>
    </>
  );
}

export default App;
