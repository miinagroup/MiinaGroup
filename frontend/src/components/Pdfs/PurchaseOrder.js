
import React, { useState, useRef, useEffect } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
/* 
  invoiceNumber,
  userInfo,
  purchaseNumber,
  cartSubtotal,
  invoiceDate,
  selectedpurchaseData
*/
const PurchaseOrder = ({ purchaseOrderData, purchaseOrderTotal }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 50,
      paddingTop: 70,
    },
    pageNumbers: {
      position: "absolute",
      width: "50%",
      bottom: "5px",
      left: "50%",
      fontSize: 10,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      width: "90%",
      marginBottom: 5,
    },
    image: {
      position: "absolute",
      top: 5,
      width: "100%",
    },

    table: {
      paddingLeft: 50,
      paddingRight: 50,
      paddingTop: 10,
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0,
    },
    tableItem: {
      paddingLeft: 50,
      paddingBottom: 5,
      display: "table",
      width: "100%",
    },

    tableItemChunk: {
      paddingLeft: 50,
      paddingBottom: 5,
      paddingTop: 30,
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0,
    },

    tableBorder: {
      display: "table",
      width: "95%",
      borderStyle: "solid",
      borderWidth: 1,
      borderTop: 0,
      borderRight: 0,
    },
    tableBorderBottom: {
      flexDirection: "row",
      display: "table",
      width: "30%",
      borderStyle: "solid",
      borderWidth: 1,
      marginLeft: "65%",
    },
    tableBorderBottomSpecialMain: {
      position: "relative",
      width: "98%",
      marginLeft: "6px",
      overflow: "hidden",
    },
    tableBorderBottomSpecial: {
      position: "absolute",
      bottom: "10px",
      width: "54%",
      height: "10%",
      marginLeft: "6%",
      overflow: "hidden",
      display: "table",
      // borderStyle: "solid",
      // borderWidth: 1,
    },
    tableBorderBottomSpecial1: {
      position: "absolute",
      bottom: "0",
      width: "54%",
      height: "10%",
      marginLeft: "5%",
      overflow: "hidden",
      display: "table",
      // borderStyle: "solid",
      // borderWidth: 1,
    },
    tableCellBillBoxSpecial: {
      paddingLeft: 5,
      fontSize: 10,
      textAlign: "center",
    },
    tableCellBillBoxSpecial1: {
      paddingLeft: 5,
      fontSize: 11,
      textAlign: "center",
      color: "red"
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      height: "auto",
      width: "100%",
    },
    tableRow1: {
      margin: "auto",
      flexDirection: "row",
      height: "auto",
      backgroundColor: "#cccccc",
      width: "100%",
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    tableRow2: {
      flexDirection: "row",
      height: "auto",
      width: "100%",
      borderBottom: 1,
    },
    tableRow3: {
      flexDirection: "row",
      height: "auto",
      width: "104%",
      borderBottom: 1,
      borderTopWidth: 1,
      borderRight: 1,
      marginLeft: -5,
      marginTop: 5,
      backgroundColor: "#cccccc",

    },
    tableRow5: {
      margin: "auto",
      marginLeft: "0",
      flexDirection: "row",
      height: "auto",
      backgroundColor: "#cccccc",
      width: "100%",
      borderTopWidth: 1,
      borderStyle: "solid"
    },
    tableRow4: {
      margin: "auto",
      marginLeft: "0",
      flexDirection: "row",
      height: "auto",
      minHeight: "70px",
      width: "100%",
    },
    tableRowProducts: {
      flexDirection: "row",
      height: "auto",
      width: "100%",
    },
    tableRowProducts1: {
      flexDirection: "row",
      height: "auto",
      width: "100%",
      backgroundColor: "#e6e6e6",
    },
    tableOrder: {
      padding: 10,
      marginLeft: 30,
      display: "table",
      width: "90%",
      borderStyle: "solid",
      borderWidth: 1,
    },
    tableColHeader: {
      width: "30%",
      borderStyle: "solid",
      textAlign: "right",
      marginTop: 0,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
    },
    tableColHeaderLeft: {
      width: "30%",
      borderStyle: "solid",
      textAlign: "left",
      marginTop: 12,
      paddingLeft: 15,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
    },
    tableColImageHeader: {
      width: "50%",
      height: "80px",
      borderStyle: "solid",
      marginTop: 0,
      marginRight: 10,
      paddingRight: 10,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 20,
    },
    tableColHeaderSideHead: {
      float: "left",
      width: "50%",
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1
    },
    tableColHeaderSideHeadEmpty: {
      float: "left",
      width: "50%",
      backgroundColor: "white",
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
    },
    tableColHeaderSide: {
      float: "left",
      width: "50%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingBottom: 5,
      paddingTop: 5,
      textTransform: "uppercase",
    },
    tableColHeaderSide1: {
      float: "left",
      width: "30%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingBottom: 5,
      paddingTop: 5,
    },
    tableColHeaderSideTotal: {
      float: "left",
      width: "15%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingRight: 15,
    },
    tableColHeaderCenter: {
      float: "left",
      width: "45%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 0,
    },
    tableColHeaderShort: {
      float: "left",
      width: "10%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 0,
    },
    tableColHeaderMedium: {
      float: "left",
      width: "20%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 0,
      inlineSize: "150px"
    },

    tableColBill: {
      width: "100%",
      borderStyle: "solid",
      textAlign: "center",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
    },
    tableColBillItem: {
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 7,
      textAlign: "center",
      paddingLeft: 2,
      paddingBottom: 5,
      paddingTop: 5,
      paddingRight: 2,
    },
    tableColBillItemRight: {
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 8,
      textAlign: "right",
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 15,
    },
    tableColBillItemHeader: {
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
      textAlign: "center",
      paddingTop: 5,

    },

    tableCellHeader: {
      width: "22%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 1,
    },
    tableCellHeaderSide: {
      width: "22%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 1,
    },

    tableCellBottom: {
      width: "50%",
      paddingLeft: 5,
      fontSize: 10,
    },
    tableCellHeaderSales: {
      width: "50%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 0,
    },
    tableCellHeaderLeft: {
      width: "50%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 1,
    },
    tableCellHeaderLeftBottom: {
      width: "75%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 1,
    },
    tableCellBill: {
      paddingLeft: 5,
      marginTop: 0,
      fontSize: 11,
    },
    tableCellBillHeader: {
      paddingLeft: 0,
      marginTop: 10,
      fontSize: 20,
      color: "red",
    },
    tableCellBillBox: {
      paddingLeft: 5,
      marginTop: 5,
      fontSize: 10,
      height: "15px",
      textAlign: "center",
    },
    tableCellBillBoxExtra: {
      paddingLeft: 5,
      marginTop: 5,
      fontSize: 10,
      textAlign: "left",
    },
    tableCellBillBoxRight: {
      paddingLeft: 5,
      paddingRight: 15,
      marginTop: 5,
      fontSize: 10,
      height: "15px",
      textAlign: "right",
    },
    tableColOrderName: {
      width: "40%",
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColOrder: {
      width: "20%",
      borderStyle: "solid",
      borderBottomWidth: 1,
    },
    tableCellOrderName: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
    tableCellOrder: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
    tableCell7day: {
      margin: 5,
      justifyContent: "right",
    },
  });

  const purchaseData = purchaseOrderData;
  const purchaseTotal = purchaseOrderTotal;
  //console.log("purchaseData", purchaseData, purchaseTotal);

  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function splitpurchaseOrderData(purchaseData) {
    const firstChunk = purchaseData?.poCartItems?.slice(0, 15);
    const remainingItems = purchaseData?.poCartItems?.slice(15);
    const chunks = splitArrayIntoChunks(remainingItems, 25);
    return [firstChunk, ...chunks];
  }

  const [firstItems, ...otherChunks] = splitpurchaseOrderData(purchaseData);
  const createdAt = new Date(purchaseData.createdAt);

  const createdDate =
    ("0" + createdAt.getDate()).slice(-2) + "/" +
    ("0" + (createdAt.getMonth() + 1)).slice(-2) + "/" +
    createdAt.getFullYear();

  const deliveryAddress = "CTL Australia, Unit 2/36 Finance Place, Malaga, WA - 6090";

  return (
    <>
      <Document id={"100"}>
        <Page style={styles.body} size="A4" orientation="landscape">
          {/* ******* header ******* */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColImageHeader}>
                <Image
                  style={styles.image}
                  src="https://ctladmin.b-cdn.net/CTL%20Brand%20Images/letterhead1.png"
                />
              </View>
              <View style={styles.tableColHeaderLeft}>
                <Text style={styles.tableCellBill}>CTL Australia PTY LTD</Text>

                <Text style={styles.tableCellBill}>Perth, WA 6062</Text>
                <Text style={styles.tableCellBill}>Phone: 0498 139 213</Text>
                <Text style={styles.tableCellBill}>ABN : 12 609 518 809</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellBillHeader}>PURCHASE ORDER</Text>
                <Text>Order No : {purchaseData?.poNumber}</Text>
                <Text>Date : {createdDate}</Text>
              </View>
            </View>
          </View>
          <br />
          {/* ******* header ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow5}>
                <View style={styles.tableColHeaderSideHead}>
                  <Text>Supplier :</Text>
                </View>
                <View style={styles.tableColHeaderSideHead}>
                  <Text>Delivered To :</Text>
                </View>
              </View>
              <View style={styles.tableRow4}>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>
                    {purchaseData?.supplierName + "\n" + purchaseData?.supplierAddress?.replaceAll(',', '\n')}
                  </Text>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>
                    {purchaseData?.deliveryMethod === "pick up" ? "PICK UP" : deliveryAddress.toUpperCase().replaceAll(',', '\n')}
                  </Text>
                </View>
              </View>


              <View style={styles.tableRow1}>
                <View style={styles.tableCellHeaderSide}>
                  <Text style={styles.tableColBill}>Account Code</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Warehouse</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Currency</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Order Terms</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Required By</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCellHeaderSide}>
                  <Text style={styles.tableCellBillBox}>
                    {purchaseData?.supplierId?.ctlCreditAccount}
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {purchaseData?.wareHouse}
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    AUD
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {purchaseData?.orderTerm ? purchaseData.orderTerm : "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {purchaseData?.requiredBy ? purchaseData.requiredBy : "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* ******* Product List (first page) ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Item Code</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Supplier Item Code</Text>
                </View>
                <View style={styles.tableColHeaderCenter}>
                  <Text style={styles.tableColBillItemHeader}>Item Description</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>UOM</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Quantity</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Unit Price</Text>
                </View>
                <View style={styles.tableColHeaderSideTotal}>
                  <Text style={styles.tableColBillItemHeader}>Line Total</Text>
                </View>
              </View>
              {firstItems?.map((item, idx) => {
                return idx % 2 == 0 ? (
                  <>
                    <View style={styles.tableRowProducts} key={idx}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].ctlsku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].suppliersku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>
                          {item.name} ({item.poCartProducts[0].attrs})
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].uom}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].quantity}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}{item.poCartProducts[0].purchaseprice}
                        </Text>
                      </View>

                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.poCartProducts[0].lineTotal}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.tableRowProducts1} key={idx}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].ctlsku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].suppliersku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>
                          {item.name} ({item.poCartProducts[0].attrs})
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].uom}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.poCartProducts[0].quantity}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.poCartProducts[0].purchaseprice}
                        </Text>
                      </View>

                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.poCartProducts[0].lineTotal}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <Text
            style={styles.pageNumbers}
          // render={({ pageNumber, totalPages }) =>
          //   `${pageNumber} / ${totalPages}`
          // }
          />

          {/* bottom total price */}
          {otherChunks[0] ? (
            ""
          ) : (
            <>
              {" "}
              {/* <View style={styles.tableBorderBottomSpecialMain}> */}
              {purchaseData?.specialNote && purchaseData?.specialNote !== "" ? (
                <>
                  <View style={styles.tableBorderBottomSpecial}>
                    <Text style={styles.tableCellBillBoxSpecial}>
                      **Special Instruction**
                    </Text>
                    <Text style={styles.tableCellBillBoxSpecial}>
                      {purchaseData?.specialNote}
                    </Text>
                  </View>
                </>
              ) : ("")}

              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>
                    Total :
                  </Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}{purchaseTotal?.orderNetAmount}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>GST : </Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}{purchaseTotal?.TAX}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>Total Inc.GST :</Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}{purchaseTotal?.incGSTPrice}
                  </Text>
                </View>
              </View>
              {/* </View> */}
            </>
          )}
          <View style={styles.tableBorderBottomSpecial1}>
            <Text style={styles.tableCellBillBoxSpecial1}>
              PLEASE EMAIL INVOICE TO ACCOUNTS@CTLAUS.COM. NO INVOICE WITH GOODS
            </Text>
          </View>
        </Page>

        {/* ******* Product List (other pages) ******* */}
        {otherChunks?.map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk?.length > 0 && (
              <Page style={styles.body} size="A4" orientation="landscape">
                <View style={styles.tableItemChunk}>
                  <View style={styles.tableBorder}>
                    <View style={styles.tableRow1}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Item Code</Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>Supplier Item Code</Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItemHeader}>Item Description</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>UOM</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Quantity</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Unit Price</Text>
                      </View>
                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemHeader}>Line Total</Text>
                      </View>
                    </View>
                    {chunk?.map((item, idx) => {
                      return idx % 2 == 0 ? (
                        <>
                          <View style={styles.tableRowProducts} key={idx}>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                {item.poCartProducts[0].ctlsku}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItem}>
                                {item.poCartProducts[0].suppliersku}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderCenter}>
                              <Text style={styles.tableColBillItem}>
                                {item.name} ({item.poCartProducts[0].attrs})
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                {item.poCartProducts[0].uom}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                {item.poCartProducts[0].quantity}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItemRight}>
                                ${" "}
                                {item.poCartProducts[0].purchaseprice}
                              </Text>
                            </View>

                            <View style={styles.tableColHeaderSideTotal}>
                              <Text style={styles.tableColBillItemRight}>
                                ${" "}
                                {item.poCartProducts[0].lineTotal}
                              </Text>
                            </View>
                          </View>
                        </>
                      ) : (
                        <View style={styles.tableRowProducts1} key={idx}>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.poCartProducts[0].ctlsku}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItem}>
                              {item.poCartProducts[0].suppliersku}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderCenter}>
                            <Text style={styles.tableColBillItem}>
                              {item.name} ({item.poCartProducts[0].attrs})
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.poCartProducts[0].uom}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.poCartProducts[0].quantity}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItemRight}>
                              ${" "}
                              {item.poCartProducts[0].purchaseprice}
                            </Text>
                          </View>

                          <View style={styles.tableColHeaderSideTotal}>
                            <Text style={styles.tableColBillItemRight}>
                              ${" "}
                              {item.poCartProducts[0].lineTotal}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <Text
                  style={styles.pageNumbers}
                // render={({ pageNumber, totalPages }) =>
                //   `${pageNumber} / ${totalPages}`
                // }
                />

                {/* show total price in last page */}
                {index === otherChunks?.length - 1 && (
                  <>
                    {purchaseData?.specialNote !== "" ? (
                      <>
                        <View style={styles.tableBorderBottomSpecial}>
                          <Text style={styles.tableCellBillBoxSpecial}>
                            **Special Instruction**
                          </Text>
                          <Text style={styles.tableCellBillBoxSpecial}>
                            {purchaseData?.specialNote}
                          </Text>
                        </View>
                      </>
                    ) : ("")}
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeftBottom}>
                        <Text style={styles.tableCellBillBox}>
                          Total :
                        </Text>
                      </View>
                      <View style={styles.tableCellBottom}>
                        <Text style={styles.tableCellBillBoxRight}>
                          ${" "}{purchaseTotal?.orderNetAmount}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeftBottom}>
                        <Text style={styles.tableCellBillBox}>GST : </Text>
                      </View>
                      <View style={styles.tableCellBottom}>
                        <Text style={styles.tableCellBillBoxRight}>
                          ${" "}{purchaseTotal?.TAX}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeftBottom}>
                        <Text style={styles.tableCellBillBox}>
                          Total Inc.GST :
                        </Text>
                      </View>
                      <View style={styles.tableCellBottom}>
                        <Text style={styles.tableCellBillBoxRight}>
                          ${" "}{purchaseTotal?.incGSTPrice}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
                <View style={styles.tableBorderBottomSpecial1}>
                  <Text style={styles.tableCellBillBoxSpecial1}>
                    PLEASE EMAIL INVOICE TO ACCOUNTS@CTLAUS.COM. NO INVOICE WITH GOODS
                  </Text>
                </View>
              </Page>
            )}
          </React.Fragment>
        ))}
      </Document>
    </>
  );
};

export default PurchaseOrder;
