import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets/assets'
import moment from 'moment/moment';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
function ManageJobs() {
    const goTo = useNavigate();
    const [jobs, setJobs] = useState(false)
    const {backendUrl, companyToken} = useContext(AppContext)
    
    //function to fetch company job applications data
    const fetchCompanyJobs = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/company/list-jobs', {headers:{token:companyToken}})
            if(data.success){
                setJobs(data.jobsData.reverse())
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    //function to change job visibility
    const changeVisibility = async (id) =>{
          try {
            const {data} = await axios.post(backendUrl + '/api/company/change-visibility',{id}, {headers:{token:companyToken}})

            if(data.success){
                toast.success(data.message)
                fetchCompanyJobs()
            }else{
                toast.error(data.message)
            }

          } catch (error) {
            toast.error(error.message)
          }
    }
    useEffect(()=>{
        if(companyToken){
            fetchCompanyJobs()
        }
    },[companyToken])
  return jobs ? jobs.length === 0 ? (<div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>
  </div>):(
    <div className='container p-4 max-w-5xl'>
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
                <thead>
                    <tr>
                        <th className='px-4 py-2 text-left border-b max-sm:hidden'>#</th>
                        <th className='px-4 py-2 text-left border-b'>JobTitle</th>
                        <th className='px-4 py-2 text-left border-b max-sm:hidden'>Date</th>
                        <th className='px-4 py-2 text-left border-b max-sm:hidden'>Location</th>
                        <th className='px-4 py-2 text-center border-b'>Applicants</th>
                        <th className='px-4 py-2 text-left border-b'>Visible</th>
                     </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index)=>(
                        <tr className='text-gray-700' key={index}>
                            <td className='py-2 px-4 border-b max-sm:hidden'>{index +1 }</td>
                            <td className='py-2 px-4 border-b '>{job.title}</td>
                            <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll ')}</td>
                            <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                            <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                            <td className='py-2 px-4 border-b'>
                                <input className='scale-125 ml-4 ' type="checkbox" checked={job.visible} onChange={()=>changeVisibility(job._id)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className='mt-4 flex justify-end'>
            <button onClick={()=>goTo('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded cursor-pointer'>Add New Job</button>
        </div>
    </div>
  ):<Loading/>
}

export default ManageJobs