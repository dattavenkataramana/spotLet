import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './componets/Login'
import SignUp from './componets/SignUp'
import Home from './componets/Home';

import './App.css';

function App() { 
  return(
     <BrowserRouter>
     <Routes> 
         <Route  path="/" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/> 
         <Route path="/home" element={<Home/>}/> 
      </Routes>
     </BrowserRouter>
  )
}

export default App;
