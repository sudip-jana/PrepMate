import React from "react";
import { LuPlus } from "react-icons/lu";
import toast from 'react-hot-toast';
import { CARD_BG } from "../../utils/data.js";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import SummaryCard from "../../components/cards/SummaryCard.jsx";
import moment from "moment";
import Modal from "../../components/loader/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";
import DeleteAlertContent from "../../components/DeleteAlertContent.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      // console.log(response)
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error)
    }
  }

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:",error);
    }
  }

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard 
                key={data?._id}
                colors={CARD_BG[index%CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("DD MM YYYY") : ""
                }
                onSelect={()=> navigate(`/prep/${data?._id}`)}
                onDelete={()=> setOpenDeleteAlert({open: true, data})}
                ></SummaryCard>
          ))}
        </div>
        <button className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={()=> setOpenCreateModal(true)}>
            <LuPlus className="text-2xl text-white" />
            Add New
        </button>
      </div>

      <Modal 
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
        >
          <div>
            <CreateSessionForm />
          </div>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert?.open}
          onClose={() => {
            setOpenDeleteAlert({open: false, data: null});
          }}
          title="Delete Alert"
        >
          <div className="w-[30vw]"> 
            <DeleteAlertContent 
              content="Are you sure you want to delete this session detail?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;
