import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input.jsx';
import Login from '../Auth/Login.jsx';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx';
import { UserContext } from '../../Context/userContext.jsx';
import validateEmail  from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosinstance.js';
import { API_PATHS } from '../../utils/apiPath.js';
import uploadImage from '../../utils/uploadImage.js';
import { useContext } from 'react';

const SignUp = ({setCurrentPage}) => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();
    // Handle sign up submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        
        let profileImageUrl = "";

        if(fullName.trim() === ""){
          setError("Please enter Full Name")
          return;
        }

        if(!validateEmail(email)){
          setError("Please enter a valid email address.");
          return;
        }

        if(!password){
          setError("Please enter password")
          return;
        }

        setError("");

        // signup api call
        try {
          // upload image if present
          if(profilePic) {
            const imageUploadRes = await uploadImage(profilePic);
            profileImageUrl = imageUploadRes.imageUrl || "";
          }


          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
            name: fullName,
            email,
            password,
            profileImageUrl,
          });
          
          
          // console.log(response.data.data);
          const token = response.data.data.token;
          

          if(token) {
            localStorage.setItem("token", token);
            await updateUser(response.data.data)
            navigate("/dashboard");

          }
        } catch (e) {
          if(e.response && e.response.data.message){
                setError(e.response.data.message);
            }
            else{
                setError("Something went wrong. Please try again.")
            }
        }
    }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
            <Input 
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder='John Doe'  
            type='text'
            />
            <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type='text'
            />
            <Input
            value={password}    
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type='password'
            />
    </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type ="submit" className='btn-primary'>
            Sign Up
            </button>
        <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
            <button
              className='font-medium text-[#f39324] underline cursor-pointer'
              onClick={() => setCurrentPage("login")}
              > Login</button>
        </p>
        </form>
      </div>
  )
};


export default SignUp;
