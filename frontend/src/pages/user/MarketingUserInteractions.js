import AdminUserInteractionsPageComponent from "./components/MarketingUserInteractionsPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const getUserTrackData = async () => {
  const { data } = await axios.get("/api/tracks/admin");
  return data
}

const MarketingUserInteractions = () => {
  return <AdminUserInteractionsPageComponent
    getUserTrackData={getUserTrackData}
  />
};

export default MarketingUserInteractions;