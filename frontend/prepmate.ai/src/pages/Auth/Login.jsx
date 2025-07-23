import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input.jsx'
import SignUp from '../Auth/SignUp.jsx';
import validateEmail  from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosinstance.js';
import { API_PATHS } from '../../utils/apiPath.js';
import { UserContext } from '../../Context/userContext.jsx';
import { useContext } from 'react';

const Login = ({setCurrentPage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    // Hanld login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        
        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if(!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        // login Api call

        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            console.log(response.data.data);
            const token = response.data.data.token;
            
            if(token) {
                localStorage.setItem("token", token);
                updateUser(response.data.data)
                navigate("/dashboard");
            }
        }
        catch (e){
            if(e.response && e.response.data.message){
                setError(e.response.data.message);
            }
            else{
                setError("Something went wrong. Please try again.")
            }
        }
    };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'> Welcome Back </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>

        <form onSubmit={handleLogin}>
            <Input value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder='john@example.com'
            type='text'
            />

            <Input value={password}
            onChange={({target}) => setPassword(target.value)}
            label = 'Password'
            placeholder='Min 8 characters'
            type='password'
            />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='btn-primary'>
                LOGIN
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>
                Don't have an account?{' '}
                <button 
                    className='font-medium text-[#ff9324] underline cursor-pointer'
                    onClick={() => {
                        setCurrentPage("signup");
                    }}>
                    SignUp
                </button>
            </p>
        </form>
    </div>
  );
};

export default Login;
