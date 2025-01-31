import EditUserPageComponent from "./components/EditUserPageComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminEditUserPage = () => {
  const [userUpdated, setUserUpdated] = useState()
  const [userDetails, setUserDetails] = useState()

  const fetchUser = async (userId) => {
    const { data } = await axios.get(`/api/users/${userId}`);
    return data;
  };

  const updateUserApiRequest = async (
    userId,
    name,
    lastName,
    email,
    phone,
    mobile,
    ipAddress,
    isAdmin,
    verified,
    isPD,
    isSiteManager,
    isSitePerson,
    company,
    location,
    isSales,
    isMarketing,
    accounts,
    abn,
    role
  ) => {
    const { data } = await axios.put(`/api/users/${userId}`, {
      name,
      lastName,
      email,
      phone,
      mobile,
      ipAddress,
      isAdmin,
      verified,
      isPD,
      isSiteManager,
      isSitePerson,
      company,
      location,
      isSales,
      isMarketing,
      accounts,
      abn,
      role
    });
    setUserUpdated(data)
    setUserDetails({ "_id": userId, "userName": name + " " + lastName, "company": company, "role": role })
    return data;
  };

  const getdeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
    return data;
  };

  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      getdeliveryBooks={getdeliveryBooks}
    />
  );
};

export default AdminEditUserPage;
