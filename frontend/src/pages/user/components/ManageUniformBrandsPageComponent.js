import { Row, Col, Modal, Button, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import UserOrderItemForOrderPageComponent from "./UserOrderItemForOrderPageComponent";
import { TbColorPicker } from "react-icons/tb";



const ManageUniformBrandsPageComponent = ({
  getUniformCategories,
  getUniforms,
  getSelectedSuppliers,
  getSelectedSuppliersByCompanyName,
  addSelectedSuppliers,
  updateSelectedSuppliers
}) => {

  const [uniforms, setUniforms] = useState()
  const [uniformCategories, setUniformCategories] = useState()
  const [itemGroup, setItemGroup] = useState()
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedSuppliers, setSelectedSuppliers] = useState()
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "Item", order: "desc" });
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const [save, setSave] = useState("Save Changes")
  const [dcolors, setDcolors] = useState("")

  const headers = [
    { name: "Brand", field: "Brand", sortable: true },
    { name: "Colors", field: "Colors", sortable: true },
    { name: "Sizes", field: "Sizes", sortable: true },
    { name: "Price Range", field: "Price Range", sortable: true },
    { name: "Select", field: "select", sortable: false },
  ];

  useEffect(() => {
    getUniformCategories()
      .then((data) => setUniformCategories(data));
    getUniforms()
      .then((data) => setUniforms(data));
    getSelectedSuppliers()
      .then((data) => setSelectedSuppliers(data));
  }, []);

  useEffect(() => {
    if (uniformCategories && uniforms) {
      var filteredCategories = []
      uniformCategories?.map((category, index) => {
        var brands = []
        //console.log("UNIFORMS", uniforms);
        uniforms?.uniforms?.map((uniform) => {
          if (uniform.category === category.name) {
            //console.log(uniform.brand);
            if (!brands.includes(uniform.brand)) {
              brands.push(uniform.brand)
            }
          }
        })
        //console.log(brands);

        brands.map((brand) => {
          var sizes = []
          var colors = []
          var prices = []
          var sortOrder = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
            '3XS', '2XS', 'XS', 'S', 'M', 'L', 'XL', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL',
            '8W', '9W', '10W', '11W', '12W', '13W',
            '87 Stout', '92 Stout', '97 Stout', '102 Stout', '107 Stout', '112 Stout', '117 Stout', '122 Stout', '127 Stout', '132 Stout',
            '67 Regular', '72 Regular', '77 Regular', '82 Regular', '87 Regular', '92 Regular', '97 Regular', '102 Regular', '107 Regular', '112 Regular', '117 Regular', '122 Regular', '127 Regular', '132 Regular',
            '74 Long', '79 Long', '84 Long', '89 Long', '94 Long',
          ]
          uniforms.uniforms?.map((uniform) => {
            if (brand === uniform.brand) {
              uniform.stock?.map((variant) => {
                //console.log(uniform, variant.size);
                if (!sizes.includes(variant.size)) {
                  sizes.push(variant.size)
                }
                if (!colors.includes(variant.color)) {
                  colors.push(variant.color)
                }
                if (!prices.includes(variant.price)) {
                  prices.push(variant.price)
                }
              })
            }
          })
          sizes.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
          prices.sort((a, b) => (a > b) ? 1 : -1);
          //console.log(sizes.join(",'"));
          setDcolors(colors.join(", "))
          filteredCategories.push({ "item": category.name, "brand": brand, "sizes": sizes, "colors": colors, "prices": prices, "checked": false })
        })
      })
      var preselectedBrands = []
      filteredCategories?.map((filterd) => {
        if (selectedSuppliers) {
          selectedSuppliers[0].stock?.map((selectedStock) => {
            if (selectedStock.item === filterd.item) {
              if (selectedStock.supplierName === filterd.brand) {
                filterd.checked = true
                preselectedBrands.push({ "item": selectedStock.item, "supplierName": selectedStock.supplierName })
              }
            }
          })
        }
      })
      setSelectedBrands(preselectedBrands)
      setItemGroup(filteredCategories)
    }
  }, [uniformCategories, uniforms, selectedSuppliers])

  const handleChange = (e) => {
    const { value, checked } = e.target
    const item = value.split(",")[0]
    const brand = value.split(",")[1]
    if (checked)
      setSelectedBrands((selectedBrands) => [...selectedBrands, { "item": item, "supplierName": brand }])
    else {
      selectedBrands?.map((sData) => {
        if ((sData.item === item) && (sData.supplierName === brand)) {
          setSelectedBrands(selectedBrands.filter(x => x !== sData))
        }
      })
    }
  };

  const updateChanges = () => {
    setTimeout(() => setSave("Saving Changes.."), 1000)
    const selectedData = {
      selectedBrands: selectedBrands,
      userData: {
        userCompany: userInfo.company,
        userSite: userInfo.location
      }
    }
    getSelectedSuppliersByCompanyName(userInfo.company)
      .then((data) => {
        if (data.length === 0) {
          addSelectedSuppliers(selectedData)
        } else {
          const id = data[0]._id
          updateSelectedSuppliers(id, selectedData)
        }
      })
    setSave("Saved Changes!")
    setTimeout(() => setSave("Save Changes"), 1000)

  }

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <h1>MANAGE UNIFORM BRANDS</h1>
          <Button onClick={updateChanges}>{save}</Button>
          {
            uniformCategories?.map((category, index) => {
              return (<>
                <Card>
                  <div style={{
                    backgroundColor: '#1e4881', color: 'white', height: '25px', textAlign: 'center', borderRadius: '4px 4px 0px 0px'
                  }}>
                    {category?.name.split("/")[1]}
                  </div>

                  <div>
                    <table className="table table-striped">
                      <TableHeader
                        headers={headers}
                        onSorting={(field, order) => setSorting({ field, order })}
                      />
                      <tbody>
                        {
                          itemGroup?.map((item) => {
                            if (item.item === category.name) {
                              return (<>
                                <tr>
                                  <td style={{ minWidth: "100px", maxWidth: "100px", textAlign: "left" }}>{item.brand}</td>
                                  <td style={{ minWidth: "250px", maxWidth: "250px", textAlign: "left" }}>
                                    {item.colors.length > 4 ? (
                                      item.colors.slice(0, 4).join(", ")
                                    ) : (
                                      item.colors.join(", ")
                                    )}
                                    {item.colors.length > 4 ? (
                                      <>
                                        <OverlayTrigger
                                          delay={{ hide: 450, show: 200 }}
                                          overlay={(props) => (
                                            <Tooltip {...props} >
                                              {item.colors.join(", ")}
                                            </Tooltip>
                                          )}
                                          placement="bottom"
                                        ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ color: "orange", cursor: "pointer" }}></i>
                                        </OverlayTrigger>
                                      </>
                                    ) : ("")}
                                  </td>
                                  <td style={{ minWidth: "100px", maxWidth: "100px", textAlign: "left" }}>
                                    {
                                      item.sizes.length > 2 ? (
                                        item.sizes[0] + " - " + item.sizes[item.sizes.length - 1]
                                      ) : (
                                        item.sizes.join(", ")
                                      )
                                    }
                                    {item.sizes.length > 2 ? (
                                      <>
                                        <OverlayTrigger
                                          delay={{ hide: 450, show: 200 }}
                                          overlay={(props) => (
                                            <Tooltip {...props} >
                                              {item.sizes.join(", ")}
                                            </Tooltip>
                                          )}
                                          placement="bottom"
                                        ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ color: "orange", cursor: "pointer" }}></i>
                                        </OverlayTrigger>
                                      </>
                                    ) : ("")}
                                  </td>
                                  <td style={{ minWidth: "100px", maxWidth: "100px", textAlign: "left" }}>{"$" + item.prices[0].toFixed(2) + " - $" + item.prices[item.prices.length - 1].toFixed(2)}</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={item.item + "," + item.brand}
                                      defaultChecked={item.checked}
                                      onChange={handleChange}>
                                    </input></td>
                                </tr >
                              </>)
                            }
                          })

                        }
                      </tbody>
                    </table>
                  </div>
                </Card >
              </>)
            })
          }
        </Col>
      </Row >
    </>
  );
};

export default ManageUniformBrandsPageComponent;
