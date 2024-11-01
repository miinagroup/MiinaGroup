import EditUserPageComponent from "./components/EditUserPageComponent";
import axios from "axios";

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
  isDeveloper,
  isSuperAdmin,
  isVIP,
  isCreditVerified,
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
    isDeveloper,
    isSuperAdmin,
    isVIP,
    isCreditVerified,
    accounts,
    abn,
    role
  });
  return data;
};

const AdminEditUserPage = () => {
  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
    />
  );
};

export default AdminEditUserPage;
