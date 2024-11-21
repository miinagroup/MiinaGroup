import ManageUniformUsersPageComponent from "./components/ManageUniformUsersPageComponent";
import { addToCartUniformByManager } from "../../redux/actions/cartActions"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const getUniformCategories = async () => {
  const { data } = await axios.get("/api/uniformCategories")
  return data;
}

const getUniforms = async () => {
  const { data } = await axios.get("/api/uniforms");
  return data;
}

const getSelectedSuppliers = async () => {
  const { data } = await axios.get("/api/UniformSelectedSuppliers");
  return data;
}

const getSelectedSuppliersByCompanyName = async (companyName) => {
  const { data } = await axios.get("/api/UniformSelectedSuppliers/getByCompanyName/" + companyName);
  return data;
}

const addSelectedSuppliers = async (selectedData) => {
  const { data } = await axios.post("/api/UniformSelectedSuppliers/add", { ...selectedData });
  return data;
}

const updateSelectedSuppliers = async (id, selectedData) => {
  const { data } = await axios.put("/api/UniformSelectedSuppliers/update/" + id, { ...selectedData });
  return data;
}

const getUniformCartByCompany = async (userCompany) => {
  const { data } = await axios.get("/api/uniformCarts/getByCompany/" + userCompany);
  return data;
}

const updateUniformCart = async (id, purchaseData) => {
  const { data } = await axios.put(`/api/uniformCarts/updateOne/${id}`, { purchaseData });
  return data;
};

const getAllUniformRole = async () => {
  const { data } = await axios.get("/api/uniformRoles");
  return data;
}

const bulkUpdateUsers = async (updatedUniformUsers) => {
  const { data } = await axios.put("/api/users/bulkUpdate", { updatedUniformUsers });
  return data;
}

const handleBulkUniformCart = async (userData) => {
  try {
    const updateResponse = await axios.put("/api/uniformCarts/bulkUpdate", { userData });
    return updateResponse;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

const bulkUpdateUserRoles = async (updatedUniformUsers) => {
  if (updatedUniformUsers.length > 0) {
    try {
      const data = await getAllUniformRole()
      let userData = []
      updatedUniformUsers?.map((uniformUser) => {
        let flag = 0
        let roleData = []
        data?.forEach((role) => {
          if (role.role?.toUpperCase() === uniformUser.userRole?.toUpperCase()) {
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
              "userId": uniformUser.userId,
              "userName": uniformUser.userName,
              "userCompany": uniformUser.userCompany,
              "userRole": uniformUser.userRole,
              "stock": roleData
            })
            flag++
          }
        })
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
            "userId": uniformUser.userId,
            "userName": uniformUser.userName,
            "userCompany": uniformUser.userCompany,
            "userRole": uniformUser.userRole,
            "stock": roleData
          })
        }
      })

      if (userData.length > 0) {
        const result = handleBulkUniformCart(userData)
        return result
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }
}

const ManageUniformUsersPage = () => {
  const dispatch = useDispatch();

  return <ManageUniformUsersPageComponent
    getUniformCartByCompany={getUniformCartByCompany}
    getUniformCategories={getUniformCategories}
    getSelectedSuppliersByCompanyName={getSelectedSuppliersByCompanyName}
    getUniforms={getUniforms}
    addToCartReduxAction={addToCartUniformByManager}
    reduxDispatch={dispatch}
    updateUniformCart={updateUniformCart}
    getAllUniformRole={getAllUniformRole}
    bulkUpdateUsers={bulkUpdateUsers}
    bulkUpdateUserRoles={bulkUpdateUserRoles}
  />
};
export default ManageUniformUsersPage;
