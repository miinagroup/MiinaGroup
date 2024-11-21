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

  useEffect(() => {
    if (userUpdated === "user updated") {
      try {
        getAllUniformRole()
          .then((data) => {
            let userData = []
            let roleData = []
            let flag = 0

            if (data?.map((role) => {
              if (role.role?.toUpperCase() === userDetails.role?.toUpperCase()) {
                if (role.stock) {
                  role.stock?.map((sRole) => {
                    roleData.push({
                      "_id": sRole._id,
                      "itemName": sRole.itemName,
                      "cartCount": 0,
                      "purchaseCount": 0,
                      "purchaseLimit": sRole.itemLimit
                    })
                  })
                }
                userData.push({
                  "userId": userDetails._id,
                  "userName": userDetails.userName,
                  "userCompany": userDetails.company,
                  "userRole": userDetails.role,
                  "stock": roleData
                })
                flag++
              }
            }))
              if (flag === 0) {
                roleData = [{
                  "_id": "6620a0445e581b7b980b107a",
                  "itemName": "SHIRTS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0585e581b7b980b1083",
                  "itemName": "JACKETS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0685e581b7b980b108c",
                  "itemName": "PANTS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0805e581b7b980b1095",
                  "itemName": "OVERALLS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0925e581b7b980b109e",
                  "itemName": "BOOTS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                }]
                userData.push({
                  "userId": userDetails._id,
                  "userName": userDetails.name + " " + userDetails.lastName,
                  "userCompany": userDetails.company,
                  "userRole": userDetails.role,
                  "stock": roleData
                })
              }
            handleUniformCart(userDetails._id, userData)
          })
          .catch((er) => console.log(er));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    setUserUpdated("")
  }, [userUpdated])


  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      getAllUniformRole={getAllUniformRole}
    />
  );
};

export default AdminEditUserPage;
