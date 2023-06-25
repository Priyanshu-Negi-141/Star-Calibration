import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useStateContext } from './contexts/ContextProvider';
const SignIn = (props) => {

    const {signupEmployee,credential, setCredential} = useStateContext()
    
    const [error, setError] = useState('')
    let navigate = useNavigate()
    const [LoggedIn,setLoggedIn] = useState(false)
    
    const handleLoggedIn = () => {
        setLoggedIn(true)
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        signupEmployee()
    }

    const onChange = (e) => {
        setCredential({...credential,[e.target.name]: e.target.value})
    }
  return (
    <div className='bg-[#385c6a] w-full'>
        <div className='text-justify text-white h-screen'>
        {/* <div className='flex flex-col justify-evenly items-center pt-5'>
            <h1 className='text-5xl'>Validex India</h1>
            <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ullam commodi praesentium, culpa quaerat impedit rerum velit dolorem maiores blanditiis autem optio quisquam eos officia! A quos quo et dolorum eum eius quam dicta eos reprehenderit fuga debitis, temporibus mollitia laboriosam soluta illo accusamus dignissimos, delectus numquam explicabo dolorem inventore sint. Eum suscipit maxime qui, odio consectetur delectus ea illo.</p>
        </div> */}
            <div className='grid h-screen items-center justify-center'>
                
                <div class=" w-full border border-gray-300 p-4 bg-white rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h4 class="text-center font-semibold text-gray-900 md:text-2xl dark:text-white">
                        Validex India
                    </h4>
                    <div className='w-80'>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 text-black dark:text-white gap-3'>
                                {/* <div><label for="">Select Option</label>
                                <select id="countries" class="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {...register('option', {required:false})}
                                    <option selected>: : : Select Option : : :</option>
                                    <option value="admin">Admin</option>
                                    <option value="tm-qm">TM/QM</option>
                                    <option value="account">Account</option>
                                    <option value="hod">HOD</option>
                                    <option value="computer-opr">Computer Operator</option>
                                    <option value="site_engg">Site Engineer</option>
                                </select>
                                {errors.option && <span>This field is required</span>}
                                </div> */}
                                <div><label for="email">Username</label> <input type="email" value={credential.email} onChange={onChange} id="email" name="email" class="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                                    
                                </div>

                                <div><label for="password">Password</label> <input type="password" value={credential.password} onChange={onChange} id="password" name='password' class="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"  />
                                    
                                </div>
                                <div>
                                <button type="submit" class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                        </div>

                    
                    </div>

    </div>
  )
}

export default SignIn