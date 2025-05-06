import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Applications from './pages/Applications'
import RectruiterLogin from './components/RectruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJobs from './pages/AddJobs'
import ManageJobs from './pages/ManageJobs'
import SeeApplications from './pages/SeeApplications'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const {showRecruiterLogin, companyToken} = useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin &&  <RectruiterLogin/>}
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<Applyjob/>}/>
        <Route path='/applications' 
        element={<Applications/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
        {companyToken ? <><Route path='add-job' element={<AddJobs/>}/>
        <Route path='manage-jobs' element={<ManageJobs/>}/>
        <Route path='see-applications' element={<SeeApplications/>}/>
        </> : null}
        

        </Route>
      </Routes>
      
    </div>
  )
}

export default App