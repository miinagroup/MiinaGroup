import { Row, Col, Form, Tab, Tabs, Table, Button } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../pages/general.css"
import { Parser } from '@json2csv/plainjs';
import { saveAs } from 'file-saver';
import { FileSaver } from 'file-saver'
import { BSON, EJSON, ObjectId } from 'bson';
//import { MongoClient } from "mongodb";
// import { hobsonAvailability } from "../../../../backend/seeder/seeder/hobsonAvailability"
// import { hobsonCategories } from "../../../../backend/seeder/seeder/hobsonCategories"
// import { hobsonCodes } from "../../../../backend/seeder/seeder/hobsonCodes"
// import { hobsonPricing } from "../../../../backend/seeder/seeder/hobsonPricing"
// import { hobsonProducts } from "../../../../backend/seeder/seeder/hobsonProducts"



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
  const [duplicateCTLSKU, setDuplicateCTLSKU] = useState([])
  const [productDuplicateChecked, setProductDuplicateChecked] = useState(false);


  //Hobson API integration
  const [btnFetchEx, setBtnFetchEx] = useState("Fetch Existing Data")
  const [btnFetchPc, setBtnFetchPc] = useState("Fetch Product Codes")
  const [btnFetchPd, setBtnFetchPd] = useState("Fetch Product Details")
  const [btnFetchPp, setBtnFetchPp] = useState("Fetch Product Prices")
  const [btnProcessProducts, setBtnProcessProducts] = useState("Process Products")
  const [btnNewHobsonProducts, setBtnNewHobsonProducts] = useState("New Hobson Products")
  const [btnFetchCat, setBtnFetchCat] = useState("Fetch Categories")
  const [btnFetchAvailable, setBtnFetchAvailable] = useState("Fetch Availability")

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

  const [completeCategoryList, setCompleteCategoryList] = useState([])
  const [completePriceList, setCompletePriceList] = useState([])
  const [completeProductAvailability, setCompleteProductAvailability] = useState([])
  const [completeFilteredCategories, setCompleteFilteredCategories] = useState([])


  const handleUserCart = async () => {
    try {
      const roleResponse = await axios.get("/api/uniformRoles/");
      console.log(roleResponse.data);
      const response = await axios.get("/api/users/");
      const allUsers = response
      let userData = []
      let roleData = []
      let flag = 0
      console.log(allUsers.data);
      allUsers.data?.map((user) => {
        console.log(user.role, user.name);

        flag = 0
        //userData = []
        roleData = []
        if (roleResponse.data.map((role) => {
          if (role.role.toUpperCase() === user.role.toUpperCase()) {
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
              "userId": user._id,
              "userName": user.name + " " + user.lastName,
              "userCompany": user.company,
              "userRole": user.role,
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
              "userId": user._id,
              "userName": user.name + " " + user.lastName,
              "userCompany": user.company,
              "userRole": user.role,
              "stock": roleData
            })
          }
      })

      console.log("userData", userData);
      const updateResponse = await axios.post("/api/uniformCarts/admin/bulk", { userData });
      console.log(updateResponse);


    } catch (error) {
      console.error("Error fetching data", error);
    }
    console.log("finished");
  }
  /*************Handle Image Path Change********* */
  const handleImagePathChange = async () => {

    try {
      const response = await axios.get("/api/products/admin");
      const allProducts = response.data
      let flag = 0
      console.log(allProducts);
      allProducts?.map((product) => {

        if (product.images) {
          flag = 0
          product.images.map((image) => {
            if (image.path?.includes("https://res.cloudinary.com/dxvwresim/image/")) {
              let pathSplit = image.path.split("/")
              const imageName = pathSplit[pathSplit.length - 1]
              image.path = "https://ctladmin.b-cdn.net/image/" + imageName
              flag++
            }
          })
          if (flag !== 0) {
            const images = product.images
            const id = product._id
            console.log(id, images);
            try {
              const iresponse = axios.put(
                `/api/products/admin/updateImages/${id}`,
                { images: images }
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

  const handleSubcategoryNumbers = async () => {
    try {
      console.log("Started");
      const response = await axios.get("/api/products/admin");
      const allProducts = response.data
      let flag = 0
      let catProducts = []
      allProducts?.map((product) => {
        if (product.category !== null || product.category !== "") {
          if (product.category.split("/").length > 6) {
            console.log(product._id, product.category);
            catProducts.push(product)
          }
        }
      })
      console.log(catProducts.length);

    } catch (error) {
      console.error("Error fetching data", error);
    }
    console.log("finished");
  }

  const handleTagsCreate = async () => {
    console.log("creating tags");

    try {
      const response = await axios.get("/api/products/admin");
      const allProducts = response.data
      let flag = 0
      let categoryKeysArray = []
      let nameKeysArray = []
      let supplierKeysArray = []
      let completeArray = [{}]

      //console.log(allProducts);
      allProducts?.map((product) => {
        const id = product._id
        if (product.category !== "" || product.category !== null) {
          categoryKeysArray = product.category?.split(/[\/\-_]/)
          nameKeysArray = product.name?.split(/[\/\-_ ]/)
          supplierKeysArray = product.supplier?.split(/[\/\-_ ]/)
          const combinedArray = categoryKeysArray.concat(nameKeysArray, supplierKeysArray)
          //const cleanedKeywordsSymbols = combinedArray.filter(word => /^[a-zA-Z0-9]+$/.test(word));
          const tagsRaw = combinedArray.toString().replaceAll(",", " ")
          const tags = tagsRaw.replace(/\s+/g, ' ')
          completeArray.push({ "id": id, "tags": tags })
          //console.log(tags);
        }
      })
      try {
        const iresponse = axios.put(
          `/api/products/admin/updateTags`,
          { completeArray: completeArray }
        );
        console.log(iresponse);
      } catch (err) {
        console.error("Error fetching data", err);
      }

    } catch (error) {
      console.error("Error fetching data", error);
    }
    console.log("finished");
  }

  const handleDuplicateCTLSKU = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get("/api/products/admin/findDuplicateSKU")
      setDuplicateCTLSKU(response.data)
      setProductDuplicateChecked(true)
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsChecking(false);
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

  /********** Hobson New Products Fetching********* */
  const updateNewProducts = async () => {
    setBtnNewHobsonProducts("Processing...")
    const supplier = "HOBSON ENGINEERING"
    const ctlSkus = await axios.get(`/api/products/admin/getHobsonCTLSKU/${supplier}`)
    const completeHobsonCTLSkus = []
    ctlSkus.data?.map((sku) => {
      completeHobsonCTLSkus.push(Number(sku.stock[0].ctlsku.split("L")[1]))
    })
    let ctlSku = Math.max(...completeHobsonCTLSkus)
    ctlSku += 1
    const productResponse = await axios.get(`/api/products/admin/getSupplierSKU/${supplier}`);
    const hobsonProductCodes = productResponse.data;
    let productSupplierSkuArray = []
    let tempAvailabilityArray = []
    hobsonProductCodes?.map((productCode) => {
      productSupplierSkuArray.push(productCode?.stock[0]?.suppliersku)
    })

    setDisplayResults(displayResults + "\n CTL Products List Generated..")
    const url = 'https://hdi.hobson.com.au/v3/stock/number';
    const data1 = JSON.stringify({
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
      body: data1,
    });

    const fullProductsCodes = await response.json();
    setDisplayResults(displayResults + "\n Hobson Products List Generated..")
    let productSupplierSkuArray1 = []
    fullProductsCodes?.data?.map((productCode) => {
      productSupplierSkuArray1.push(productCode.part_number)
    })

    const filteredItems = [...new Set(productSupplierSkuArray1)].filter(item => !productSupplierSkuArray.includes(item));
    setDisplayResults(displayResults + "\n New Hobson Products Code Filtered..")
    var hobsonAvailabilityArray = []
    const chunkSize = 500;
    for (let i = 0, j = 1; i < filteredItems.length; i += chunkSize, j++) {
      const chunk = filteredItems.slice(i, i + chunkSize);

      const url = 'https://hdi.hobson.com.au/v3/stock/availability/logged-in';
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
      const fullProductAvailability = await response.json();
      const batchResults = fullProductAvailability.data
      hobsonAvailabilityArray.push(...batchResults)
    }

    var hobsonPriceArray = []
    for (let i = 0, j = 1; i < filteredItems.length; i += chunkSize, j++) {
      const chunk = filteredItems.slice(i, i + chunkSize);

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
      hobsonPriceArray.push(...batchResults)
    }

    var hobsonProductsDetailsArray = []
    for (let i = 0, j = 1; i < filteredItems.length; i += chunkSize, j++) {
      const chunk = filteredItems.slice(i, i + chunkSize);

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
      hobsonProductsDetailsArray.push(...batchResults)
    }

    let productsDetailsArray = []
    let categoryDetailsArray = []
    let fullCategoryList = []
    let categoryPath = ""
    let categoryLinks = ""
    hobsonProductsDetailsArray?.map((result) => {
      let categoryNameArray = []
      const categoryArray = result.filters.product_types
      categoryArray?.map((categoryValue) => {
        completeCategoryList?.map((categoryList) => {
          if (categoryList.code === categoryValue) {
            categoryNameArray.push(categoryList.name.replaceAll("_-_", "-").replaceAll("_/_", "/"))
          }
        })
      })
      var categoryList = categoryNameArray
      var categoryPathArray = []
      var categoryPathArray1 = []
      var categoryPath = ""
      var firstElementArray = []
      var firstElementArray1 = []
      var secondElementArray = []
      var secondElement = ""
      var lastElementArray = []
      var hasValue = []
      var noValue = []
      var finalCategoryLinks = []
      var finalCategory = ""
      var finalCategoryArray = []
      var fullCategoryArray = []
      var pCounter = 1
      var fl_1 = 1

      categoryList = Array.from(new Set(categoryList))
      lastElementArray = []
      firstElementArray = []
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].includes("PRODUCT_TYPES/"))
          firstElementArray.push(categoryList[i].split("/")[1])
        if (!(categoryList[i].includes("/")))
          lastElementArray.push(categoryList[i])
      }
      lastElementArray = Array.from(new Set(lastElementArray))
      noValue = []
      finalCategoryLinks = []
      finalCategoryArray = []
      pCounter++
      if (firstElementArray.length === 1) {
        categoryPath = "INDUSTRIAL/FASTENERS/" + firstElementArray
        fullCategoryArray.push(categoryPath)
        if (lastElementArray.length === 1) {
          while (!(categoryPath.includes(lastElementArray[0]))) {
            secondElementArray = Array.from(new Set(secondElementArray))
            if (secondElementArray.length > 1) {
              hasValue = []
              noValue = []
              var counter = 0
              categoryPathArray?.map((tempCategoryPath) => {
                if ((categoryPath + "/" + tempCategoryPath).includes(lastElementArray[0])) {
                  hasValue.push(tempCategoryPath)
                  if (counter === 0) {
                    finalCategoryArray.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                    fullCategoryArray.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                    counter++
                  }
                }
                else {
                  noValue.push(tempCategoryPath)
                }
              })
              if (noValue.length > 0) {
                firstElementArray = []
                noValue?.map((value) => {
                  firstElementArray.push(value?.split("/").pop())
                })
              } else {
                break;
              }
            }
            secondElementArray = []
            categoryPathArray1 = []
            firstElementArray = Array.from(new Set(firstElementArray))
            for (let i = 0; i < categoryList.length; i++) {
              if (categoryList[i].includes("/")) {
                firstElementArray?.map((firstElement) => {
                  if (categoryList[i].split("/")[0] === firstElement) {
                    secondElementArray.push(categoryList[i].split("/").slice(1).join("/"))
                    if (noValue.length > 0) {
                      if (firstElementArray.length > 1) {
                        categoryPathArray1.push(firstElement)
                      } else {
                        fullCategoryArray.push((categoryPath + "/" + firstElement).replaceAll(",", "-"))
                        categoryPath = (categoryPath + "/" + firstElement).replaceAll(",", "-")
                      }
                    }
                  }
                })
              }
            }
            if (categoryPathArray1.length > 0) {
              if (categoryPathArray1.length === 1) {
                categoryPath = categoryPath + "/" + categoryPathArray1[0]
              } else {
                categoryPath = categoryPath + "/" + categoryPathArray1[1]
              }
            }
            if (secondElementArray.length > 1) {
              secondElementArray = Array.from(new Set(secondElementArray))
            }
            if (secondElementArray.length > 0) {
              if (secondElementArray.length === 1) {
                firstElementArray = []
                if (secondElementArray[0] === lastElementArray[0]) {
                  finalCategoryArray.push((categoryPath + "/" + lastElementArray[0]).replaceAll(",", "-"))
                  fullCategoryArray.push((categoryPath + "/" + lastElementArray[0]).replaceAll(",", "-"))
                  break;
                }
                firstElementArray.push(secondElementArray[0])
                categoryPath = (categoryPath + "/" + secondElementArray[0]).replaceAll(",", "-")
                fullCategoryArray.push((categoryPath.replaceAll(",", "-")))
              }
              else {
                categoryPathArray = []
                secondElementArray?.map((secondElement) => {
                  categoryPathArray.push(secondElement)
                })
              }
            }
            else {
              if (categoryPathArray1.length > 1) {
                finalCategoryArray.push((categoryPathArray1 + "/" + lastElementArray).replaceAll(",", "-"))
                fullCategoryArray.push((categoryPathArray1 + "/" + lastElementArray).replaceAll(",", "-"))
              }
              else {
                finalCategoryArray.push((categoryPath + "/" + lastElementArray).replaceAll(",", "-"))
                fullCategoryArray.push((categoryPath + "/" + lastElementArray).replaceAll(",", "-"))
              }
              break;
            }
          }
          if (finalCategoryArray.length > 0) {
            if (finalCategoryArray.length === 1) {
              finalCategory = finalCategoryArray
            } else {
              finalCategory = finalCategoryArray[0]
              finalCategoryArray.shift()
              finalCategoryLinks = finalCategoryArray
            }
          }

        }

        else if (lastElementArray.length > 1) {
          finalCategoryArray = []
          var fCount = 0
          lastElementArray?.map((lastElement) => {
            secondElementArray = []
            while (!(categoryPath.includes(lastElement))) {
              secondElementArray = Array.from(new Set(secondElementArray))
              if (secondElementArray.length > 1) {
                hasValue = []
                noValue = []
                var counter = 0
                categoryPathArray?.map((tempCategoryPath) => {
                  if ((categoryPath + "/" + tempCategoryPath).includes(lastElement)) {
                    hasValue.push(tempCategoryPath)
                    if (counter === 0) {
                      finalCategoryArray.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                      fullCategoryArray.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                      counter++
                    }
                  }
                  else {
                    noValue.push(tempCategoryPath)
                  }
                })
                if (noValue.length > 0) {
                  firstElementArray = []
                  noValue?.map((value) => {
                    firstElementArray.push(value.split("/").pop())
                  })
                } else {
                  break;
                }
              }
              secondElementArray = []
              categoryPathArray1 = []
              firstElementArray = Array.from(new Set(firstElementArray))
              for (let i = 0; i < categoryList.length; i++) {
                if (categoryList[i].includes("/")) {
                  firstElementArray?.map((firstElement) => {
                    if (categoryList[i].split("/")[0] === firstElement) {
                      secondElementArray.push(categoryList[i].split("/").slice(1).join("/"))
                      if (noValue.length > 0) {
                        if (firstElementArray.length > 1) {
                          categoryPathArray1.push(firstElement)
                        } else {
                          fullCategoryArray.push((categoryPath + "/" + firstElement).replaceAll(",", "-"))
                          categoryPath = (categoryPath + "/" + firstElement).replaceAll(",", "-")
                        }
                      }
                    }
                  })
                }
              }
              if (categoryPathArray1.length > 0) {
                if (categoryPathArray1.length === 1) {
                  categoryPath = categoryPath + "/" + categoryPathArray1[0]
                } else {
                  categoryPath = categoryPath + "/" + categoryPathArray1[1]
                }
              }
              if (secondElementArray.length > 1) {
                secondElementArray = Array.from(new Set(secondElementArray))
              }
              if (secondElementArray.length > 0) {
                if (secondElementArray.length === 1) {
                  firstElementArray = []
                  if (secondElementArray[0] === lastElement) {
                    finalCategoryArray.push((categoryPath + "/" + lastElement).replaceAll(",", "-"))
                    fullCategoryArray.push((categoryPath + "/" + lastElement).replaceAll(",", "-"))
                    firstElementArray.push(secondElementArray[0])
                    break;
                  }
                  firstElementArray.push(secondElementArray[0])
                  categoryPath = (categoryPath + "/" + secondElementArray[0]).replaceAll(",", "-")
                  fullCategoryArray.push((categoryPath.replaceAll(",", "-")))
                }
                else {
                  categoryPathArray = []
                  secondElementArray?.map((secondElement) => {
                    categoryPathArray.push(secondElement)
                  })
                }
              }
              else {
                if (categoryPathArray1.length > 1) {
                  finalCategoryArray.push((categoryPathArray1).replaceAll(",", "-"))
                  fullCategoryArray.push((categoryPathArray1).replaceAll(",", "-"))
                }
                else {
                  finalCategoryArray.push((categoryPath).replaceAll(",", "-"))
                  fullCategoryArray.push((categoryPath).replaceAll(",", "-"))
                }
                break;
              }
            }
          })
          if (finalCategoryArray.length > 0) {
            if (finalCategoryArray.length === 1) {
              finalCategory = finalCategoryArray
            } else {
              finalCategory = finalCategoryArray[0]
              finalCategoryArray.shift()
              finalCategoryLinks = finalCategoryArray
            }
          }
        } else if (lastElementArray.length === 0) {
          finalCategory = "Assorted"
        }
      }
      else if (firstElementArray.length > 1) {
        var finalCategoryArray1 = []
        firstElementArray?.map((firstElement) => {
          firstElementArray1 = []
          firstElementArray1.push(firstElement)
          categoryPath = "INDUSTRIAL/FASTENERS/" + firstElementArray1
          fullCategoryArray.push(categoryPath)
          if (lastElementArray.length === 1) {
            while (!(categoryPath.includes(lastElementArray[0]))) {
              secondElementArray = Array.from(new Set(secondElementArray))
              if (secondElementArray.length > 1) {
                hasValue = []
                noValue = []
                var counter = 0
                categoryPathArray?.map((tempCategoryPath) => {
                  if ((categoryPath + "/" + tempCategoryPath).includes(lastElementArray[0])) {
                    hasValue.push(tempCategoryPath)
                    if (counter === 0) {
                      finalCategoryArray1.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                      fullCategoryArray.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                      counter++
                    }
                  }
                  else {
                    noValue.push(tempCategoryPath)
                  }
                })
                if (noValue.length > 0) {
                  firstElementArray1 = []
                  noValue?.map((value) => {
                    firstElementArray1.push(value?.split("/").pop())
                  })
                } else {
                  break;
                }
              }
              secondElementArray = []
              categoryPathArray1 = []
              firstElementArray1 = Array.from(new Set(firstElementArray1))
              for (let i = 0; i < categoryList.length; i++) {
                if (categoryList[i].includes("/")) {
                  firstElementArray1?.map((firstElement) => {
                    if (categoryList[i].split("/")[0] === firstElement) {
                      secondElementArray.push(categoryList[i].split("/").slice(1).join("/"))
                      if (noValue.length > 0) {
                        if (firstElementArray1.length > 1) {
                          categoryPathArray1.push(firstElement)
                        } else {
                          fullCategoryArray.push((categoryPath + "/" + firstElement).replaceAll(",", "-"))
                          categoryPath = (categoryPath + "/" + firstElement).replaceAll(",", "-")
                        }
                      }
                    }
                  })
                }
              }
              if (categoryPathArray1.length > 0) {
                if (categoryPathArray1.length === 1) {
                  categoryPath = categoryPath + "/" + categoryPathArray1[0]
                } else {
                  categoryPath = categoryPath + "/" + categoryPathArray1[1]
                }
              }
              if (secondElementArray.length > 1) {
                secondElementArray = Array.from(new Set(secondElementArray))
              }
              if (secondElementArray.length > 0) {
                if (secondElementArray.length === 1) {
                  firstElementArray1 = []
                  if (secondElementArray[0] === lastElementArray[0]) {
                    finalCategoryArray1.push((categoryPath + "/" + lastElementArray[0]).replaceAll(",", "-"))
                    fullCategoryArray.push((categoryPath + "/" + lastElementArray[0]).replaceAll(",", "-"))
                    break;
                  }
                  firstElementArray1.push(secondElementArray[0])
                  categoryPath = (categoryPath + "/" + secondElementArray[0]).replaceAll(",", "-")
                  fullCategoryArray.push((categoryPath.replaceAll(",", "-")))
                }
                else {
                  categoryPathArray = []
                  secondElementArray?.map((secondElement) => {
                    categoryPathArray.push(secondElement)
                  })
                }
              }
              else {
                if (categoryPathArray1.length > 1) {
                  finalCategoryArray1.push((categoryPathArray1 + "/" + lastElementArray).replaceAll(",", "-"))
                  fullCategoryArray.push((categoryPathArray1 + "/" + lastElementArray).replaceAll(",", "-"))
                }
                else {
                  finalCategoryArray1.push((categoryPath + "/" + lastElementArray).replaceAll(",", "-"))
                  fullCategoryArray.push((categoryPath + "/" + lastElementArray).replaceAll(",", "-"))
                }
                break;
              }
            }
            if (finalCategoryArray1.length > 0) {
              if (finalCategoryArray1.length === 1) {
                finalCategory = finalCategoryArray1
              } else {
                finalCategory = finalCategoryArray1[0]
                finalCategoryArray1.shift()
                finalCategoryLinks = finalCategoryArray1
              }
            }
          }
          else if (lastElementArray.length > 1) {
            var fCount = 0
            lastElementArray?.map((lastElement) => {
              secondElementArray = []
              while (!(categoryPath.includes(lastElement))) {
                secondElementArray = Array.from(new Set(secondElementArray))
                if (secondElementArray.length > 1) {
                  hasValue = []
                  noValue = []
                  var counter = 0
                  categoryPathArray?.map((tempCategoryPath) => {
                    if ((categoryPath + "/" + tempCategoryPath).includes(lastElement)) {
                      hasValue.push(tempCategoryPath)
                      if (counter === 0) {
                        finalCategoryArray1.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                        fullCategoryArray.push((categoryPath + "/" + tempCategoryPath).replaceAll(",", "-"))
                        counter++
                      }
                    }
                    else {
                      noValue.push(tempCategoryPath)
                    }
                  })
                  if (noValue.length > 0) {
                    firstElementArray1 = []
                    noValue?.map((value) => {
                      firstElementArray1.push(value.split("/").pop())
                    })
                  } else {
                    break;
                  }
                }
                secondElementArray = []
                categoryPathArray1 = []
                firstElementArray1 = Array.from(new Set(firstElementArray1))
                for (let i = 0; i < categoryList.length; i++) {
                  if (categoryList[i].includes("/")) {
                    firstElementArray1?.map((firstElement) => {
                      if (categoryList[i].split("/")[0] === firstElement) {
                        secondElementArray.push(categoryList[i].split("/").slice(1).join("/"))
                        if (noValue.length > 0) {
                          if (firstElementArray1.length > 1) {
                            categoryPathArray1.push(firstElement)
                          } else {
                            fullCategoryArray.push((categoryPath + "/" + firstElement).replaceAll(",", "-"))
                            categoryPath = (categoryPath + "/" + firstElement).replaceAll(",", "-")
                          }
                        }
                      }
                    })
                  }
                }
                if (categoryPathArray1.length > 0) {
                  if (categoryPathArray1.length === 1) {
                    categoryPath = categoryPath + "/" + categoryPathArray1[0]
                  } else {
                    categoryPath = categoryPath + "/" + categoryPathArray1[1]
                  }
                }
                if (secondElementArray.length > 1) {
                  secondElementArray = Array.from(new Set(secondElementArray))
                }
                if (secondElementArray.length > 0) {
                  if (secondElementArray.length === 1) {
                    firstElementArray1 = []
                    if (secondElementArray[0] === lastElement) {
                      finalCategoryArray1.push((categoryPath + "/" + lastElement).replaceAll(",", "-"))
                      fullCategoryArray.push((categoryPath + "/" + lastElement).replaceAll(",", "-"))
                      firstElementArray1.push(secondElementArray[0])
                      break;
                    }
                    firstElementArray1.push(secondElementArray[0])
                    categoryPath = (categoryPath + "/" + secondElementArray[0]).replaceAll(",", "-")
                    fullCategoryArray.push((categoryPath.replaceAll(",", "-")))
                  }
                  else {
                    categoryPathArray = []
                    secondElementArray?.map((secondElement) => {
                      categoryPathArray.push(secondElement)
                    })
                  }
                }
                else {
                  if (categoryPathArray1.length > 1) {
                    finalCategoryArray1.push((categoryPathArray1).replaceAll(",", "-"))
                    fullCategoryArray.push((categoryPathArray1).replaceAll(",", "-"))
                  }
                  else {
                    finalCategoryArray1.push((categoryPath).replaceAll(",", "-"))
                    fullCategoryArray.push((categoryPath).replaceAll(",", "-"))
                  }
                  break;
                }
              }
            })
          }
        })
        if (finalCategoryArray1.length > 0 && lastElementArray.length > 1) {
          if (finalCategoryArray1.length === 1) {
            finalCategory = finalCategoryArray1
          } else {
            finalCategory = finalCategoryArray1[0]
            finalCategoryArray1.shift()
            finalCategoryLinks = finalCategoryArray1
          }
        }
      }

      categoryPath = finalCategory.toString()
      categoryLinks = finalCategoryLinks.toString()
      fullCategoryList.push(...fullCategoryArray)

      const availabilityList = hobsonAvailabilityArray.find((element) => {
        return element.part_number === result.part_number
      })

      let localAvailability = 0
      let nationalAvailability = 0
      availabilityList.logged_in_user_availability?.map((site) => {
        if (site.warehouse === "Perth") {
          localAvailability = site.available
        } else {
          nationalAvailability = nationalAvailability + site.available
        }
      })

      const category = completeCategoryList.find((element) => {
        return element.code === result.filters.category
      })

      const priceArray = completePriceList.find((element) => {
        return element.hobson_part === result.hobson_part
      })

      const purchasePriceList = priceArray?.std_portal_pr.find((element) => {
        return element.quantity_break === result.pack_quantity
      })

      const purchasePrice = purchasePriceList?.price ? parseFloat(purchasePriceList?.price) / priceArray?.price_per : 0
      var keys = Object.keys(result.image);
      var last = keys[keys.length - 1];
      const imageUrl = result.image[last]

      let pdfs = []
      result.documents?.map((doc) => {
        pdfs.push({ path: doc.url })
      })

      productsDetailsArray.push({
        name: result.description,
        description:
          result.alternate_parts.length > 0 ? (
            result.extra_description +
            "\n<Alternate Parts" +
            "\n " + result.alternate_parts?.map((parts) => {
              return parts
            }) +
            "\n Category:" + category?.description +
            "\n Finish:" + result.finish +
            "\n Size:" + result.size +
            "\n Spec:" + result.spec +
            "\n Length:" + result.length +
            "\n Material:" + result.filters?.material[0] +
            "\n Width:" + result.size
          ) : (result.extra_description +
            "\n Category:" + category?.description +
            "\n Finish:" + result.finish +
            "\n Size:" + result.size +
            "\n Spec:" + result.spec +
            "\n Length:" + result.length +
            "\n Material:" + result.filters?.material[0] +
            "\n Width:" + result.size),

        saleunit: 1,
        max: 0,
        displayPrice: parseFloat((purchasePrice + (purchasePrice * .3)).toFixed(2)),
        supplier: "HOBSON ENGINEERING",
        category: categoryPath,
        categoryLinks: categoryLinks,
        sortOrder: 1,
        standards: "",
        createdBy: "API",
        editedBy: "",
        stock: [{
          attrs: result.pack_quantity > 1 ? "PACK-" + result.pack_quantity : "PER UNIT",
          uom: "PER UNIT",
          count: 0,
          purchaseprice: parseFloat((purchasePrice * result.pack_quantity).toFixed(2)),
          price: parseFloat(((purchasePrice * result.pack_quantity) + ((purchasePrice * result.pack_quantity) * .7)).toFixed(2)),
          barcode: "",
          ctlsku: "CTL" + ctlSku,
          suppliersku: result.hobson_part,
          clientsSku: "",
          sales: 0
        }],
        availability: [{
          local: localAvailability,
          national: nationalAvailability
        }],
        images: [{
          path: imageUrl
        }],
        pdfs: [...pdfs],
      })
      ctlSku++
    })

    fullCategoryList = Array.from(new Set(fullCategoryList))
    fullCategoryList?.map((categoryPath) => {
      categoryDetailsArray.push({
        name: categoryPath,
        display: "TRUE",
        description: categoryPath,
        image: "/images/tablets-category.png",
        attrs: [],
        brand: "HOBSON"
      })
    })

    const data = productsDetailsArray
    const maxPdfs = data.reduce((max, item) => Math.max(max, item.pdfs.length), 0);
    const maxImages = data.reduce((max, item) => Math.max(max, item.images.length), 0);

    const fields = [
      '_id',
      'name',
      'description',
      'saleunit',
      'max',
      'displayPrice',
      'supplier',
      'category',
      'categoryLinks',
      'sortOrder',
      'standards',
      'createdBy',
      'editedBy',
      'createdAt',
      'stock[0].attrs',
      'stock[0].uom',
      'stock[0].count',
      'stock[0].purchaseprice',
      'stock[0].price',
      'stock[0].barcode',
      'stock[0].ctlsku',
      'stock[0].suppliersku',
      'stock[0].clientsSku',
      'stock[0].sales',
      'stock[0]._id',
      'availability[0].local',
      'availability[0].national',
      'availability[0]._id',
    ];
    for (let i = 0; i < maxPdfs; i++) {
      fields.push(`pdfs[${i}].path`);
      fields.push(`pdfs[${i}]._id`);
    }
    for (let i = 0; i < maxImages; i++) {
      fields.push(`images[${i}].path`);
      fields.push(`images[${i}]._id`);
    }
    const parser = new Parser({ fields });
    const flattenedData = data.map(item => {
      const flatItem = {
        _id: new ObjectId(),
        name: item.name,
        description: item.description,
        saleunit: item.saleunit,
        max: item.max,
        displayPrice: item.displayPrice,
        supplier: item.supplier,
        category: item.category,
        categoryLinks: item.categoryLinks,
        sortOrder: item.sortOrder,
        standards: item.standards,
        createdBy: item.createdBy,
        editedBy: item.editedBy,
        createdAt: new Date(),
        'stock[0].attrs': item.stock[0] ? item.stock[0].attrs : '',
        'stock[0].uom': item.stock[0] ? item.stock[0].uom : '',
        'stock[0].count': item.stock[0] ? item.stock[0].count : '',
        'stock[0].purchaseprice': item.stock[0] ? item.stock[0].purchaseprice : '',
        'stock[0].price': item.stock[0] ? item.stock[0].price : '',
        'stock[0].barcode': item.stock[0] ? item.stock[0].barcode : '',
        'stock[0].ctlsku': item.stock[0] ? item.stock[0].ctlsku : '',
        'stock[0].suppliersku': item.stock[0] ? item.stock[0].suppliersku : '',
        'stock[0].clientsSku': item.stock[0] ? item.stock[0].clientsSku : '',
        'stock[0].sales': item.stock[0] ? item.stock[0].sales : '',
        'stock[0]._id': item.stock[0] ? new ObjectId() : '',
        'availability[0].local': item.availability[0] ? item.availability[0].local : '',
        'availability[0].national': item.availability[0] ? item.availability[0].national : '',
        'availability[0]._id': item.availability[0] ? new ObjectId() : '',
      };
      for (let i = 0; i < maxImages; i++) {
        flatItem[`images[${i}].path`] = item.images[i] ? item.images[i].path : '';
        flatItem[`images[${i}]._id`] = item.images[i] ? new ObjectId() : '';
      }
      for (let i = 0; i < maxPdfs; i++) {
        flatItem[`pdfs[${i}].path`] = item.pdfs[i] ? item.pdfs[i].path : '';
        flatItem[`pdfs[${i}]._id`] = item.pdfs[i] ? new ObjectId() : '';
      }
      return flatItem;
    });

    setDisplayResults(displayResults + "\n Hobson Products List Generated, " + flattenedData.length + " Products CSV File Downloading..")
    const csv = parser.parse(flattenedData);
    var file = new File([csv], "hobson.csv", { type: "text/csv;charset=utf-8" });
    saveAs(file);

    setTimeout(() => { setBtnNewHobsonProducts("Processed") }, 1000);
    setTimeout(() => { setBtnNewHobsonProducts("Process Products") }, 1000);
  }


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
                  onClick={handleTagsCreate}>Tags
                </Button>

                {/*<Button
                  onClick={handleSubcategoryNumbers}>Subcategories
                </Button> */}
                {/* <Button
                  onClick={handleOrdersPurchasePrice}>Order Purchase Price
                </Button> */}
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

                <h4>Duplicate CTLSKUs</h4>
                <button onClick={handleDuplicateCTLSKU} disabled={isChecking}>
                  {isChecking ? "Checking..." : "Check Duplicate CTLSKUs"}
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

                <h4>User Cart</h4>
                <button onClick={handleUserCart} disabled={isChecking}>
                  {isChecking ? "Formatting..." : "User Cart"}
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

                {duplicateCTLSKU.length === 0 ? null : (
                  <div className="mt-3" hidden={productDuplicateChecked === false}>
                    <p className="fw-bold">
                      Check the following: {duplicateCTLSKU?.length}{" "}

                    </p>
                    {duplicateCTLSKU?.map((item, index) => (
                      <p key={index}>
                        <span className="me-2">{index + 1}.</span>
                        {item._id[0]}
                      </p>
                    ))}
                  </div>
                )}

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
                <div className="bd-highlight me-2">
                  <Button
                    className="hobson_button"
                    onClick={updateNewProducts}>{btnNewHobsonProducts}
                  </Button>
                </div>
              </div>

            </Tab>

          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default AdminCheckPage;
