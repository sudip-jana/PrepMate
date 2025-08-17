// import React from 'react';
// import { useState } from 'react';
// import  {APP_FEATURES} from '../utils/data.js'
// import { useNavigate } from 'react-router-dom';
// import {LuSparkles} from 'react-icons/lu';
// import Modal from '../components/loader/Modal.jsx';
// import Login from '../pages/Auth/Login.jsx';
// import SignUp from '../pages/Auth/SignUp.jsx';
// import { useContext } from 'react';
// import { UserContext } from '../Context/userContext.jsx';
// import ProfileInfoCard from '../components/cards/ProfileCard.jsx'
// import hero from '../assets/hero.png';

// const LandingPage = () => {
//   const {user} = useContext(UserContext);
//   const navigate = useNavigate();

//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState("login");

//   const handleCTA = () => {

//   }

//   return (
//     <>
//       <div className='w-full min-h-full bg-[#FFFCEF]'>
//       <div clasName="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0">
//         <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
//           <header className='flex justify-between items-center mb-16'>
//             <div className='text-xl text-black font-bold'>
//               PrepMate.ai
//             </div>
//             {user ? (<ProfileInfoCard/>) : (<button
//             className='bg-[#ff9324] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer'
//             onClick={()=> setOpenAuthModal(true)}>
//               Login / SignUp
//             </button>)}
//           </header>

//           <div className='flex flex-col md:flex-row items-center'>
//             <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
//               <div className='flex items-center justify-left mb-2'>
//                 <div className='flex items center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border-amber-300'>
//                 <LuSparkles />AI Powered
//                 </div>
//               </div>

//               <h1 className='text-5xl text-black font-medium  mb-6 leading-tight'>
//                 Ace Interviews with <br />
//                 <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
//                   AI-Powered</span>
//                 {" "}
//                 Learning
//               </h1>
//             </div>

//             <div className='w-full md:w-1/2'>
//               <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
//                 Get role-specific questions, expand answers when you need them,
//                 dive deeper into concepts, and organize everything your way.
//                 From preparation to mastery - your ultimate interview toolkit is here.
//               </p>

//               <button 
//               className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer' 
//               onClick={handleCTA}>
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>

//       </div>

//       <div className='w-full min-h-full relative z-10 mb-56'>
//         <div>
//           <section className='flex items-center justify-center -mt-36'>
//             <img src = {hero}
//               alt="Hero Image"
//               className='w-[80vw] rounded-lg'
//             />
//           </section>
//         </div>

//         <div className='w-full min-h-full bg-[#FFFCEF] mt-10'>
//           <div className='container mx-auto px-4 pt-10 pb-20'>
//             <section clasName='mt-5'>
//               <h2 className='text-2xl font-medium text-center mb-12'>
//                 Features that Make PrepMate Stand Out
//               </h2>

//               <div className='flex flex-col items-center gap-8'>
//                 {/* first 3 cards */}
//                 <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
//                   {APP_FEATURES.slice(0,3).map((feature) => (
//                     <div key={feature.id} className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
//                       <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
//                       <p className='text-gray-600'>{feature.description}</p>
//                     </div>
//                   ))}
//                 </div>
//                 {/* last 2 cards */}
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
//                   {APP_FEATURES.slice(3).map((feature) => (
//                     <div key={feature.id} className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
//                       <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
//                       <p className='text-gray-600'>{feature.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>

//         <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
//                   Made with ❤️... Happy Coding!
//         </div>
//       </div>

//       <Modal 
//       isOpen={openAuthModal}
//       onClose={() => {
//         setOpenAuthModal(false);
//         setCurrentPage("login");
//       }}
//       hideHeader
//       >

//         <div>
//           {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
//           {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default LandingPage;


import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';

import { APP_FEATURES } from '../utils/data.js';
import Modal from '../components/loader/Modal.jsx';
import Login from '../pages/Auth/Login.jsx';
import SignUp from '../pages/Auth/SignUp.jsx';
import { UserContext } from '../Context/userContext.jsx';
import ProfileInfoCard from '../components/cards/ProfileCard.jsx';
import sample from '../assets/sample.png';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <>
      {/* Blurred Background Glow */}
      <div className="relative w-full min-h-full bg-[#FFFCEF] overflow-hidden">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-[-100px] left-[-100px] z-0" />

        <div className="container mx-auto px-6 md:px-12 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">PrepMate.ai</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-[#ff9324] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / SignUp
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border-amber-300">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors transform hover:scale-105 duration-300 ease-in-out"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full min-h-full relative z-10 mb-56">
        <section className="flex items-center justify-center mt-10 md:-mt-36">
          <img src={sample} alt="Hero Image" className="w-[80vw] rounded-lg" />
        </section>

        {/* Features */}
        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-6 md:px-12 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features that Make PrepMate Stand Out
              </h2>

              <div className="flex flex-col items-center gap-8">
                {/* First 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Last 2 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Made with ❤️... Happy Coding!
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
