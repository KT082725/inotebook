import {
  BrowserRouter as Router,  
    Routes,  
    Route,   
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert message="This is amazing!"/>
<Routes>  
    <Route exact path='/' element={< Home />}></Route>  
    <Route exact path='/about' element={< About />}></Route> 
    <Route exact path='/login' element={< Login/>}></Route>  
    <Route exact path='/signUp' element={< Signup />}></Route>  
</Routes>  
    </Router>
    </NoteState>
    </>
  );
}

export default App;
