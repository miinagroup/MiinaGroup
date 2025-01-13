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
    // isDeveloper,
    // isSuperAdmin,
    // isVIP,
    // isCreditVerified,
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
      // isDeveloper,
      // isSuperAdmin,
      // isVIP,
      // isCreditVerified,
      accounts,
      abn,
      role
    });
    setUserUpdated(data)
    setUserDetails({ "_id": userId, "userName": name + " " + lastName, "company": company, "role": role })
    return data;
  };

  const updateUniformCart = async () => {
    const { data } = await axios.get("/api/uniformCarts/admin");
    return data;
  }

  const getAllUniformRole = async () => {
    const { data } = await axios.get("/api/uniformRoles");
    return data;
  }

  const handleUniformCart = async (userId, userData) => {
    try {
      const userData1 = userData[0]
      const updateResponse = await axios.put(`/api/uniformCarts/admin/${userId}`, { userData1 });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      getAllUniformRole={getAllUniformRole}
    />
  );
};

export default AdminEditUserPage;
