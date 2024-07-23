import AdminUserInteractionsPageComponent from "./components/AdminUserInteractionsPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const getUserTrackData = async () => {
  const { data } = await axios.get("/api/tracks/admin");
  return data
}

const AdminUserInteractions = () => {
  return <AdminUserInteractionsPageComponent
    getUserTrackData={getUserTrackData}
  />
};

export default AdminUserInteractions;