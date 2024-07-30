import { Row, Col, Form, Tab, Tabs, Table, Button } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../pages/general.css"
const AdminCheckPage = () => {
  const [missingCount, setMissingCount] = useState([]);
  const [emptyProduct, setEmptyProduct] = useState([]);
  const [productsNoCTLSKU, setProductsNoCTLSKU] = useState([]);
  const [productsMissingMainFields, setProductsMissingMainFields] = useState([]);
  const [productsMissingStockFields, setProductsMissingStockFields] = useState([]);
  const [productsWithDuplicateCtlSku, setProductsWithDuplicateCtlSku] = useState([]);
  const [noProdCategories, setNoProdCategories] = useState([]);
  const [formattedUser, setFormattedUser] = useState([]);
  const [missingCTLskus, setMissingCTLskus] = useState([])
  const [isChecking, setIsChecking] = useState(false);
  const [countChecked, setCountChecked] = useState(false);
  const [productChecked, setProductChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState(false);
  const [userFormatted, setUserFormatted] = useState(false);
  const [ctlskuChecked, setCtlskuChecked] = useState(false)


  //Hobson API integration
  const [btnFetchEx, setBtnFetchEx] = useState("Fetch Existing Data")
  const [btnFetchPc, setBtnFetchPc] = useState("Fetch Product Codes")
  const [btnFetchPd, setBtnFetchPd] = useState("Fetch Product Details")
  const [btnFetchPp, setBtnFetchPp] = useState("Fetch Product Prices")
  const [btnFetchCat, setBtnFetchCat] = useState("Fetch Categories")
  const [displayResults, setDisplayResults] = useState("")

  const [appToken, setAppToken] = useState("9Ark2TryUeCOQObeKkxnVoB4IwPznpoE")
  const [storeCode, setStoreCode] = useState("EMBLETON")
  const [apiKey, setApiKey] = useState("6d234218-9973-4e57-9b29-d93d1c98e436")
  const [productsData, setProductsData] = useState([])
  const [hobsonData, setHobsonData] = useState([])
  const [hobsonProductCodes, setHobsonProductCodes] = useState([])
  const [hobsonCategories, setHobsonCategories] = useState([])
  const [hobsonProductsDetails, setHobsonProductsDetails] = useState([])
  const [hobsonProductsPrices, setHobsonProductsPrices] = useState([])


  /*******Existing Products******/
  const handleExistingProducts = async () => {
    setBtnFetchEx("Processing...")
    const productResponse = await axios.get("/api/products/admin/getSupplierSKU" + "HOBSON");
    const productList = productResponse.data;
    let productListArray = []
    productList?.map((product) => {
      productListArray.push(product?.stock[0]?.suppliersku)
    })

    const url = 'https://hdi.hobson.com.au/v3/stock/price';
    const data = JSON.stringify({
      "app_token": `${appToken}`,
      "store_code": `${storeCode}`,
      "data": { "part_numbers": [...productListArray] }
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-key': `${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const hobsonResponse = await response.json();
    const hobsonList = hobsonResponse.data
    setTimeout(() => { setBtnFetchEx("Processed") }, 1000);

    let finalProductsArray = []
    hobsonList?.map((hObj) => {
      productList?.map((pObj) => {
        // if ((hObj.hobson_part === pObj.stock[0].suppliersku) && (pObj.stock[0].attrs.includes(hObj.std_portal_pr[0].quantity_break))) {
        if (hObj.hobson_part === pObj.stock[0].suppliersku) {
          finalProductsArray.push({
            "name": pObj.name,
            "productCode": pObj.stock[0].suppliersku,
            "CTL_price": pObj.stock[0].price,
            "CTL_quantity": pObj.stock[0].attrs,
            "Hobson_price": hObj.std_portal_pr[0].price,
            "Hobson_quantity": hObj.std_portal_pr[0].quantity_break,
          })
        }
      })
    })
    setProductsData(finalProductsArray)
    console.log("Hobson List", hobsonList);

    setTimeout(() => { setBtnFetchEx("Fetch Existing Data") }, 1000);
    setDisplayResults("Fetched Live Hobson Products That Exists In Our System. Items Count : " + hobsonList.length)
  }

  /********Fetch Full Range Categories********/
  const fetchAllCategories = async () => {
    setBtnFetchCat("Processing...")
    const url = 'https://hdi.hobson.com.au/v3/stock/filter';
    const data = JSON.stringify({
      "app_token": `${appToken}`,
      "store_code": `${storeCode}`,
      "data": { "matched_parts_only": false }
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-key': `${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const fullCategories = await response.json();

    //setHobsonCategories(fullCategories.data)
    setTimeout(() => { setBtnFetchCat("Processed") }, 1000);
    console.log('Complete Categories', fullCategories);
    setTimeout(() => { setBtnFetchCat("Fetch Categories") }, 1000);
    setDisplayResults("Fetched Live Hobson Categories :" + fullCategories.data.length)

    let fetchedCategories = []
    let fetchedMembers = []
    if (fullCategories.data) {
      fullCategories.data.map((category) => {
        fetchedCategories.push({
          name: category.code,
          description: category.description,
          image: category.icon_large || category.icon,
          display: true,
          members: category.members
        })
        if (category.members.length > 0) {
          category.members?.map((member) => {
            fetchedMembers.push({ name: member, father: category.description })
          })
        }
      })
    }
    let completeCategoryList = []
    fetchedCategories?.map((category) => {
      if (category.members.length === 0) {
        completeCategoryList.push({
          name: category.description.trimEnd().replace(' & ', '-').replace(/&/g, '-').replace(/ /g, '_').toUpperCase(),
          description: category.description,
          image: category.image,
          display: true,
          members: []
        })
      }
    })
    fetchedMembers?.map((member) => {
      fetchedCategories?.map((category) => {
        if (member.name === category.name) {
          completeCategoryList.push({
            name: member.father.trimEnd().replace(' & ', '-').replace(/&/g, '-').replace(/ /g, '_').toUpperCase() + "/" + category.description.trimEnd().replace(' & ', '-').replace(/&/g, '-').replace(/ /g, '_').toUpperCase(),
            description: member.father + "/" + category.description,
            image: category.image,
            display: true,
            members: []
          })
        }
      })
    })
    console.log("completeCategoryList", completeCategoryList);
  }

  /********Fetch Full Range Of Hobson Products Codes********/
  const fetchAllProductsNumber = async () => {
    setBtnFetchPc("Processing...")
    const url = 'https://hdi.hobson.com.au/v3/stock/number';
    const data = JSON.stringify({
      "app_token": `${appToken}`,
      "store_code": `${storeCode}`,
      "data": { "matched_parts_only": false }
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-key': `${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const fullProductsCodes = await response.json();
    setHobsonProductCodes(fullProductsCodes.data)
    setTimeout(() => { setBtnFetchPc("Processed") }, 1000);
    console.log('Complete Products Codes', fullProductsCodes);
    setTimeout(() => { setBtnFetchPc("Fetch Product Codes") }, 1000);
    setDisplayResults("Fetched Live Hobson Products Codes :" + fullProductsCodes.data.length)
  }

  /************Fetch all Products Details ******************/
  const fetchAllProductsDetails = async () => {
    setBtnFetchPd("Processing...")
    //hobsonProductsDetails.length = 0
    let displayString = "";
    let productsCodeArray = []
    let productsDetailsArray = []
    hobsonProductCodes?.map((productCode) => {
      productsCodeArray.push(productCode.part_number)
    })
    // console.log("productsCodeArray", productsCodeArray);
    const chunkSize = 500;
    for (let i = 0, j = 1; i < productsCodeArray.length; i += chunkSize, j++) {
      const chunk = productsCodeArray.slice(i, i + chunkSize);

      const url = 'https://hdi.hobson.com.au/v3/stock/detail';
      const data = JSON.stringify({
        "app_token": `${appToken}`,
        "store_code": `${storeCode}`,
        "data": { "part_numbers": [...chunk] }
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'api-key': `${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: data,
      });

      const fullProductsDetails = await response.json();
      const batchResults = fullProductsDetails.data
      productsDetailsArray.push(...batchResults)
      displayString = displayString + "\nLive Hobson Products Details - Batch:" + j + " Count : " + fullProductsDetails.data.length
      setDisplayResults(displayString + "\n...")
      console.log(productsDetailsArray);

    }
    setHobsonProductsDetails(productsDetailsArray)
    setTimeout(() => { setBtnFetchPd("Processed") }, 1000);
    setTimeout(() => { setBtnFetchPd("Fetch Product Details") }, 1000);
    displayString = displayString + "\nCompleted :" + productsDetailsArray.length
    setDisplayResults(displayString)
    console.log("hobsonProductsDetails", productsDetailsArray);
  }

  /**************Fetch all Products Pricing*********/
  const fetchAllProductsPrices = async () => {
    setBtnFetchPp("Processing...")
    //hobsonProductsDetails.length = 0
    let displayString = "";
    let productsCodeArray = []
    let productsPricesArray = []
    hobsonProductCodes?.map((productCode) => {
      productsCodeArray.push(productCode.part_number)
    })
    // console.log("productsCodeArray", productsCodeArray);
    const chunkSize = 500;
    for (let i = 0, j = 1; i < productsCodeArray.length; i += chunkSize, j++) {
      const chunk = productsCodeArray.slice(i, i + chunkSize);

      const url = 'https://hdi.hobson.com.au/v3/stock/price';
      const data = JSON.stringify({
        "app_token": `${appToken}`,
        "store_code": `${storeCode}`,
        "data": { "part_numbers": [...chunk] }
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'api-key': `${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: data,
      });

      const fullProductsPrices = await response.json();
      const batchResults = fullProductsPrices.data
      productsPricesArray.push(...batchResults)
      displayString = displayString + "\nLive Hobson Products Prices - Batch:" + j + " Count : " + fullProductsPrices.data.length
      setDisplayResults(displayString + "\n...")
      console.log(productsPricesArray);

    }
    setHobsonProductsPrices(productsPricesArray)
    setTimeout(() => { setBtnFetchPp("Processed") }, 1000);
    setTimeout(() => { setBtnFetchPp("Fetch Product Prices") }, 1000);
    displayString = displayString + "\nCompleted :" + productsPricesArray.length
    setDisplayResults(displayString)
    console.log("hobsonProductsPrices", productsPricesArray);
  }

  // useEffect(() => {
  //   let ctlSku = 200100
  //   hobsonProductsDetails?.map((product) => {

  //     let purchaseprice;
  //     let price;
  //     let categoryChoosen;

  //     const stock = [];
  //     for (let i = 0; i < 1; i++) {
  //       const count = 1

  //       hobsonProductsPrices?.map((productPrice) => {
  //         if (product.part_number === productPrice.part_number) {
  //           purchaseprice = productPrice.price
  //           price = productPrice.price
  //         }
  //       })

  //       hobsonCategories?.map((category) => {

  //       })

  //       const attrs = product.size
  //       const uom = product.pack_quantity
  //       const barcode = ""
  //       const ctlsku = "CTL" + ctlSku
  //       const slrsku = ""
  //       const suppliersku = product.part_number
  //       const slrRandallsSku = ""
  //       const slrDaisyMilanoSku = ""
  //       const slrMaxwellsSku = ""
  //       const fmlCGOSku = ""
  //       const fmlTMHCSku = ""
  //       const evnMungariSku = ""

  //       stock.push({
  //         count,
  //         price: price,
  //         purchaseprice,
  //         attrs,
  //         uom,
  //         barcode,
  //         ctlsku,
  //         slrsku,
  //         suppliersku,
  //         slrRandallsSku,
  //         slrDaisyMilanoSku,
  //         slrMaxwellsSku,
  //         fmlCGOSku,
  //         fmlTMHCSku,
  //         evnMungariSku,
  //       });
  //     }

  //     const formInputs = {
  //       name: product.description,
  //       description: product.description + product.extra_description,
  //       saleunit: 1,
  //       max: 1,
  //       displayPrice: price,
  //       supplier: "HOBSON",
  //       category: categoryChoosen,
  //       attributesTable: [],
  //       sortOrder: 0,
  //       createdBy: "Praveen Padincharayi",
  //       editedBy: "",
  //       stock: stock,
  //     };
  //   })
  // })


  /*************Handle Image Path Change********* */
  const handleImagePathChange = async () => {
    // try {
    //   const id = "654de27a6cdf2bdc71035b41"
    //   const images = [
    //     {
    //       path: 'https://ctladmin.b-cdn.net/image/70445_1.JPG',
    //       _id: '655c171bfc060dc8f105ad48'
    //     }
    //   ]
    //   const iresponse = axios.put(
    //     `/api/products/admin/updateImages/${id}`,
    //     { images: images }
    //   );
    //   console.log(iresponse);
    // } catch (err) {
    //   console.error("Error fetching data", err);
    // }


    try {
      const response = await axios.get("/api/products/admin");
      const allProducts = response.data
      let flag = 0
      console.log(allProducts);
      allProducts?.map((product) => {

        if (product.pdfs) {
          // product.pdfs.map((image) => {
          //   if (image.path === null || image.path === "" || image.path === undefined) {
          //     console.log(product);
          //   }
          // })
          flag = 0
          product.pdfs.map((pdf) => {
            if (pdf.path?.includes("https://ctladmin.b-cdn.net/pdf/ITM/")) {
              let pathSplit = pdf.path.split("/")
              const pdfName = pathSplit[pathSplit.length - 1]
              pdf.path = "https://ctladmin.b-cdn.net/pdf/" + pdfName
              flag++
            }
          })
          if (flag !== 0) {
            const pdfs = product.pdfs
            const id = product._id
            console.log(id, pdfs);
            try {
              const iresponse = axios.put(
                `/api/products/admin/updatepdfs/${id}`,
                { pdfs: pdfs }
              );
              console.log(iresponse);
            } catch (err) {
              console.error("Error fetching data", err);
            }
          }

        }
      })

    } catch (error) {
      console.error("Error fetching data", error);
    }
    console.log("finished");
  }

  const handleCTLSKURange = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/products/admin");
      const allProducts = response.data
      let ctlList = []
      let ctlMissingList = []
      allProducts?.map((product) => {
        if (product.stock[0]?.ctlsku.includes("-")) {
          ctlList.push(product.stock[0]?.ctlsku.split("-")[0].split("L")[1]);
        } else {
          ctlList.push(product.stock[0]?.ctlsku.split("L")[1]);
        }
      })
      ctlList.sort((a, b) => a - b)
      for (let i = 1; i < ctlList.length; i++) {
        if (ctlList[i] - ctlList[i - 1] > 1) {
          const x = ctlList[i] - ctlList[i - 1]
          if (x > 100) {
            console.log(ctlList[i - 1], "-", ctlList[i], "(", x, ")");
            ctlMissingList.push({ "item": ctlList[i - 1] + " - " + ctlList[i] + "  (" + x + ")" })
          }
        }
      }
      setMissingCTLskus(ctlMissingList)
      setCtlskuChecked(true)
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  }

  /* ********* CHECK COUNT ********* */
  const checkStockCount = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/products/admin/checkStockCount");
      // console.log("checkStockCount", response);
      setMissingCount(response.data.updatedProducts);
      setEmptyProduct(response.data.deletedProducts);
      setProductsNoCTLSKU(response.data.productsNoCTLSKU);
      setCountChecked(true);
      setCategoryChecked(false);
      setUserFormatted(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };

  /* ********* CHECK PRODUCTS ********* */
  const checkProduct = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/products/admin/productsCheck");
      console.log("productsCheck", response);
      setProductsMissingMainFields(response.data.missingMainFields);
      setProductsMissingStockFields(response.data.missingStockFields);
      setProductsWithDuplicateCtlSku(response.data.duplicateCtlSku);
      setProductChecked(true);
      setCountChecked(false);
      setCategoryChecked(false);
      setUserFormatted(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };
  /* ********* CATEGORIES DISPLAY ********* */
  const checkCategoriesDisplay = async () => {
    setIsChecking(true);
    try {
      const response = await axios.post("/api/categories/updateDisplay");
      setNoProdCategories(response.data.categories);
      setCategoryChecked(true);
      setCountChecked(false);
      setUserFormatted(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };

  /* ********* FORMAT USERS ********* */
  const formatUsers = async () => {
    setIsChecking(true);
    try {
      const response = await axios.post("/api/users/formatUserName");
      setFormattedUser(response.data);
      setUserFormatted(true);
      setCategoryChecked(false);
      setCountChecked(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };
  // console.log("formatUsers", formattedUser);

  /* ********* GET GPS ********* */
  const [gpsData, setGpsData] = useState(null);
  const getGPSInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setGpsData(null);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  /* ********* Fetch Quotes ********* */
  const fetchQuotes = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/quotes/admin");
      setFormattedUser(response.data);
      setUserFormatted(true);
      setCategoryChecked(false);
      setCountChecked(false);
      setProductChecked(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
  };

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Tabs
            defaultActiveKey="Checks"
            transition={false}
            id="noanim-tab-example"
            className="mb-3">
            <Tab eventKey="Checks" title="Admin Checks">
              {/* ********** check product missing count ********** */}
              <div>
                <Button
                  onClick={handleImagePathChange}>Change Image Path
                </Button>
              </div>
              {/* <div>
                <Button
                  onClick={handleCTLSKURange}
                  className="mt-2">Display CTLSKU List
                </Button>
              </div> */}
              <div>
                <h4>Missing CTLSKUs</h4>
                <button onClick={handleCTLSKURange} disabled={isChecking}>
                  {isChecking ? "Checking..." : "Check Missing CTLSKUs"}
                </button>

                <h4>Check Product Missing Count</h4>
                <button onClick={checkStockCount} disabled={isChecking}>
                  {isChecking ? "Checking..." : "Check Missing Count"}
                </button>

                <h4>Check Product Info</h4>
                <button onClick={checkProduct} disabled={isChecking}>
                  {isChecking ? "Checking..." : "Check Product Info"}
                </button>

                <h4>Check Categories Display</h4>
                <button onClick={checkCategoriesDisplay} disabled={isChecking}>
                  {isChecking ? "Checking..." : "Check Category"}
                </button>

                <h4>Format Users</h4>
                <button onClick={formatUsers} disabled={isChecking}>
                  {isChecking ? "Formatting..." : "Format Users"}
                </button>

                <h4>Fetch GPS</h4>
                <button onClick={getGPSInfo} disabled={isChecking}>
                  {isChecking ? "Fetching..." : "Get GPS Info"}
                </button>

                <h4>Fetch Quotes</h4>
                <button onClick={fetchQuotes} disabled={isChecking}>
                  {isChecking ? "Fetching..." : "Fetch Quotes"}
                </button>
                <br />----------------------------------------------------------------------<br />

                {productsMissingStockFields.length === 0 ? null : (
                  <div className="mt-3" hidden={productChecked === false}>
                    <p className="fw-bold">
                      Check the following: {productsMissingStockFields.length}{" "}
                      products STOCK fields!!! Check attrs,price,ctlsku & displayPrice fields
                    </p>
                    {productsMissingStockFields.map((item, index) => (
                      <p key={index}>
                        <span className="me-2">{index + 1}.</span>
                        {/* <span className="fw-bold">Product Name: </span> */}
                        <a
                          href={`/admin/edit-product/${item._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name} <i class="bi bi-box-arrow-up-right" />
                        </a>
                      </p>
                    ))}
                  </div>
                )}

                {missingCTLskus.length === 0 ? null : (
                  <div className="mt-3" hidden={ctlskuChecked === false}>
                    <p className="fw-bold">
                      We have unused CTLSKU numbers in the following gaps
                    </p>
                    {missingCTLskus.map((item, index) => (
                      <>
                        <label>{item.item}</label><br />
                      </>
                    ))}
                  </div>
                )}

                {productsMissingMainFields.length === 0 ? (
                  <div className="mt-3" hidden={productChecked === false}>
                    No product missing main field data!!!
                  </div>
                ) : (
                  <div className="mt-3" hidden={productChecked === false}>
                    <p className="fw-bold">
                      The Following: {productsMissingMainFields.length} Products
                      missing MAIN fields!!! Check name,description,category & saleunit fields
                    </p>
                    {productsMissingMainFields.map((item, index) => (
                      <p key={index}>
                        <span className="me-2">{index + 1}.</span>
                        {/* <span className="fw-bold">Product Name: </span> */}
                        <a
                          href={`/admin/edit-product/${item._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name} <i class="bi bi-box-arrow-up-right" />
                        </a>
                      </p>
                    ))}
                  </div>
                )}

                {productsWithDuplicateCtlSku.length === 0 ? (
                  <div className="mt-3" hidden={productChecked === false}>
                    No product with duplicated CTLSKU!!!
                  </div>
                ) : (
                  <div className="mt-3" hidden={productChecked === false}>
                    <p className="fw-bold">
                      The Following: {productsWithDuplicateCtlSku.length} Products
                      are found duplicated CTLSKU!!!
                    </p>
                    {productsWithDuplicateCtlSku.map((duplicate, index) => (
                      <div key={index} className="mb-2">
                        <div className="me-2">
                          <span className="fw-bold">{index + 1}.</span> Duplicate
                          ctlsku found:{" "}
                          <span className="fw-bold">{duplicate._id}</span>, in
                          products:
                        </div>
                        {duplicate.products.map((product, pIndex) => (
                          <div key={pIndex}>
                            <a
                              href={`/admin/edit-product/${product.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {product.name}{" "}
                              <i className="bi bi-box-arrow-up-right me-2" />
                            </a>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {emptyProduct.length === 0 ? (
                  <div className="mt-3" hidden={countChecked === false}>
                    No EMPTY product found!!!
                  </div>
                ) : (
                  <div className="mt-3" hidden={countChecked === false}>
                    <p className="fw-bold">
                      Total: {emptyProduct.length} Products have been removed, as
                      EMPTY EMPTY EMPTY EMPTY EMPTY!!!
                    </p>
                  </div>
                )}

                {missingCount.length === 0 ? /* (
              <div className="mt-3" hidden={countChecked === false}>
                No product found!!!
              </div>
            ) */ null : (
                    <div className="mt-3" hidden={countChecked === false}>
                      <p className="fw-bold">
                        Total: {missingCount.length} Products have been UPDATED as NO
                        COUNT!!!
                      </p>
                    </div>
                  )}

                {productsNoCTLSKU.length === 0 ? (
                  <div className="mt-3" hidden={countChecked === false}>
                    No missing count product found!!!
                  </div>
                ) : (
                  <div className="mt-3" hidden={countChecked === false}>
                    <p className="fw-bold">
                      The Following: {productsNoCTLSKU.length} Products do NOT have
                      CTLSKU!!!
                    </p>
                    {productsNoCTLSKU.map((item, index) => (
                      <p key={index}>
                        <span className="me-2">{index + 1}.</span>
                        <span className="fw-bold">Product Name: </span>
                        <a
                          href={`/admin/edit-product/${item._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.productName} <i class="bi bi-box-arrow-up-right" />
                        </a>
                      </p>
                    ))}
                  </div>
                )}

                {noProdCategories.length === 0 ? (
                  <div className="mt-3" hidden={categoryChecked === false}>
                    No category found!!!
                  </div>
                ) : (
                  <div className="mt-3" hidden={categoryChecked === false}>
                    <p className="">
                      Total categories without products:{" "}
                      <span className="fw-bold">{noProdCategories.length}</span>!!!
                    </p>
                    {noProdCategories.map((item, index) => (
                      <p key={index}>
                        <span className="me-2">{index + 1}.</span>
                        <span className="">No product in </span>
                        <span className="fw-bold">{item}</span>
                      </p>
                    ))}
                  </div>
                )}

                {formattedUser.length === 0 ? (
                  <div className="mt-3" hidden={userFormatted === false}>
                    No User Formatted!!!
                  </div>
                ) : (
                  <div className="mt-3" hidden={userFormatted === false}>
                    <p className="">
                      Total{" "}
                      <span className="fw-bold">
                        {formattedUser.formattedUsers?.length
                          ? formattedUser.formattedUsers?.length
                          : "0"}
                      </span>{" "}
                      User Formatted !!!
                    </p>
                    <p className="fw-bold">
                      {" "}
                      No Delivery Book found for the following Users:
                    </p>
                    {formattedUser.notFound.map((item, index) => (
                      <p key={index}>
                        <span className="me-2">{index + 1}.</span>
                        <span className="">{item.split(":")[1]}</span>
                      </p>
                    ))}
                  </div>
                )}

                {gpsData && (
                  <div className="mt-3">
                    <p className="fw-bold">GPS Information:</p>
                    <p>Latitude: {gpsData.latitude}</p>
                    <p>Longitude: {gpsData.longitude}</p>
                  </div>
                )}
              </div>
            </Tab>
            <Tab eventKey="hobsonApi" title="Hobson API">
              <div className="d-flex justify-content-start mb-2">
                <div className="hobson_content">
                  <div className="hobson_item">
                    <label className="h_label">App_Token : </label>
                    <input className="h_text" type="text" defaultValue={appToken} onChange={(e) => setAppToken(e.target.value)} disabled></input><br />
                  </div>
                  <div className="hobson_item">
                    <label className="h_label">Store_Code : </label>
                    <input className="h_text" type="text" defaultValue={storeCode} onChange={(e) => setStoreCode(e.target.value)} disabled></input><br />
                  </div>
                  <div className="hobson_item">
                    <label className="h_label">Api_Key : </label>
                    <input className="h_text" type="text" defaultValue={apiKey} onChange={(e) => setApiKey(e.target.value)}></input><br />
                  </div>
                </div>
                <div className="ms-5 hobson_content">
                  <textarea
                    className="h_results"
                    value={displayResults} />

                </div>
              </div>


              <div className="d-flex justify-content-start mb-2 h_button_group">
                <div className="bd-highlight">
                  <Button
                    className="hobson_button me-2"
                    onClick={handleExistingProducts}>
                    {btnFetchEx}
                  </Button>
                </div>
                <div className="bd-highlight me-2">
                  <Button
                    className="hobson_button"
                    onClick={fetchAllCategories}>
                    {btnFetchCat}
                  </Button>
                </div>
                <div className="bd-highlight me-2">
                  <Button
                    className="hobson_button"
                    onClick={fetchAllProductsNumber}>
                    {btnFetchPc}
                  </Button>
                </div>
                <div className="bd-highlight me-2">
                  <Button
                    className="hobson_button"
                    onClick={fetchAllProductsDetails}>
                    {btnFetchPd}
                  </Button>
                </div>
                <div className="bd-highlight me-2">
                  <Button
                    className="hobson_button"
                    onClick={fetchAllProductsPrices}>
                    {btnFetchPp}
                  </Button>
                </div>
              </div>
              <div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th width="25%">Product Name</th>
                      <th width="15%">Product Code</th>
                      <th width="15%">CTL Price</th>
                      <th width="15%">Hobson Price <i class="bi bi-broadcast-pin"></i></th>
                      <th width="15%">CTL Quantity</th>
                      <th width="15%">Hobson Quantity <i class="bi bi-broadcast-pin"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData.map((product, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.productCode}</td>
                        <td>{product.CTL_price}</td>
                        <td>{product.Hobson_price}</td>
                        <td>{product.CTL_quantity}</td>
                        <td>{product.Hobson_quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default AdminCheckPage;
