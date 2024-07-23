import React from "react";
import MarketingPostsTrackComponenet from "./components/MarketingPostsTrackComponenet";
import axios from "axios";

const MarketingPostsTrack = () => {
  const createVisitorTrack = async (formInputs) => {
    const { data } = await axios.post("/api/visitorTracks/create", formInputs);
    return data;
  };

  const getVisitorTracks = async () => {
    const { data } = await axios.get("/api/visitorTracks/");
    return data;
  };

  const getVisitorTrackById = async (id) => {
    const { data } = await axios.get("/api/visitorTracks/track?id=" + id);
    return data;
  };

  return (
    <MarketingPostsTrackComponenet
      createVisitorTrack={createVisitorTrack}
      getVisitorTracks={getVisitorTracks}
      getVisitorTrackById={getVisitorTrackById}
    />
  );
};

export default MarketingPostsTrack;
