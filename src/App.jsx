import React from 'react'

import '@radix-ui/themes/styles.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import User from './components/User';
import LandingPge from './components/LandingPge';
import Download from './components/Download';
import './App.css'
import DashBoard from './components/DashBoard';



function App() {
  return (
  
    <Router>
    <div>
    <Routes>
       
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/" element={<LandingPge/> }/>
        <Route path='/c/:slug' element={<User/> }/>
        <Route path='/download' element={ <Download/>  }/>

      </Routes>
    
    </div>
   </Router>
 

    
     
  )
}



export default App
