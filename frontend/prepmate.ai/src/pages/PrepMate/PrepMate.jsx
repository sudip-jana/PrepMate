import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {AnimatePresence, motion} from "framer-motion"
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import {toast} from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import QuestionCard from "../../components/cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import Drawer from "../../components/Drawer.jsx";
import {Spinner} from 'flowbite-react'

const PrepMate = () => {
  const sessionId = useParams();
  // console.log(sessionId.id);
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId.id)
      );

      // console.log(response)

      if(response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Failed to fetch session data", error);
      toast.error("Failed to load session details");
    }
  }

  // Generate concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      )
      console.log(response)
      if(response.data) {
        setExplanation(response.data);
      }
    } catch (err) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, Try again later")
      console.error("Error: ", err)
    } finally {
      setIsLoading(false);
    }
  }

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try{
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      )

      if(response.data && response.data.question) {
        // toast.success('Question Pinned Successfully')
        fetchSessionDetailsById()
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  // Add more question to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS, {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestion: 5,
        }
      )
      // console.log(aiResponse);
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId: sessionId.id,
          questions: generatedQuestions,
        }
      )
     
      if(response.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message)
      } else {
        setErrorMsg("Something went wrong. Please try again.")
      }
    } finally {
      setIsUpdateLoader(false);
    }
  }

  
  useEffect(() => {
    if(sessionId.id) {
      fetchSessionDetailsById();
    }

    return () => {}
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-xl font-bold text-gray-800">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-8" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id ||index}
                    initial={{opacity: 0, y:-20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.95}}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <>
                      <QuestionCard 
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => generateConceptExplanation(data.question)}
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />
                    </>

                    {!isLoading && sessionData?.questions?.length == index+1 && (
                      <div className="flex items-center justify-center mt-5">
                        <button
                          className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? (
                            <Spinner size="sm"/>
                          ) : (
                            <LuListCollapse className="text-lg"/>
                          )} {" "}
                          LoadMore
                        </button>
                      </div>
                    )}
                  </motion.div>
                )
              })

              }
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default PrepMate;
