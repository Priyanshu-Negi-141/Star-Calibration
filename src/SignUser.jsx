import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUser = () => {
    const history = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function submit(e){
        e.preventDefault()
        try{
            await axios.post("http://localhost:8000/signuser",{
                email,password
            })
            .then((res) => {
                if (res.data === "exist"){
                    alert("Email already exist")
                    
                } else if(res.data === "notexist") {
                    history("/home",{state:{id:email}})
                }
            }).catch((err) => {
                alert("Wrong details")
                console.log(err)
                
            });
            
        }
        catch(e) {
            console.log(e)
        }
    }
  return (
    <div>
        <h1>Sign Up</h1>
        <form action= "POST">
            <input type = "email" name = "email" onChange={(e) => {setEmail(e.target.value)}} placeholder = "Enter Email" />
            <input type='password' name = 'password' onChange={(e) => {setPassword(e.target.value)}} placeholder='Password'/>
            <input type='submit' onClick={submit} />
        </form>
        <br />
        <br />
        <Link to='/'>Login</Link>
    </div>
  )
}

export default SignUser