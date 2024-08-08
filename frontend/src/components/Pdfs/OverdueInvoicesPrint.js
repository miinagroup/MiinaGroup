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
  selectedinvoiceData
*/
const OverdueInvoicesPrint = (invoicesData) => {
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
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
    },
    tableBorderBottomSpecialMain: {
      width: "98%",
      marginLeft: "6px",
      marginRight: "6px",
      flexDirection: "row",
    },
    tableBorderBottomSpecial: {
      width: "48%",
      height: "auto",
    },
    tableBorderBottomSpecial1: {
      width: "48%",
      height: "auto",
      paddingTop: 10,
    },
    tableCellBillBoxSpecial: {
      paddingLeft: 5,
      fontSize: 10,
      textAlign: "center",
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
      borderStyle: "solid",
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
      height: "18px",
      width: "100%",
    },
    tableRowProducts1: {
      flexDirection: "row",
      height: "18px",
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
      width: "40%",
      borderStyle: "solid",
      textAlign: "left",
      marginTop: 15,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 8,
    },
    tableColHeader1: {
      width: "50%",
      borderStyle: "solid",
      textAlign: "left",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 8,
    },
    tableColHeaderLeftMain: {
      width: "100%",
      borderStyle: "solid",
      textAlign: "left",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      flexDirection: "row",
    },
    tableColHeaderLeft: {
      width: "50%",
      borderStyle: "solid",
      textAlign: "right",
      borderWidth: 0,
      paddingTop: 5,
      paddingLeft: 20,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColHeaderTop: {
      width: "100%",
      borderStyle: "solid",
      textAlign: "left",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      marginTop: -5,
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
    tableColHeadingHeader: {
      width: "50%",
      height: "80px",
      borderStyle: "solid",
      marginTop: 0,
      marginRight: -15,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColHeaderSideHead: {
      float: "left",
      width: "50%",
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
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
      width: "20%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingRight: 15,
    },
    tableColHeaderCenter: {
      float: "left",
      width: "60%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 0,
    },
    tableColHeaderMedium: {
      float: "left",
      width: "12%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 0,
    },
    tableColHeaderMedium: {
      float: "left",
      width: "15%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 0,
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
      fontSize: 9,
      textAlign: "center",
      paddingTop: 5,
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
      fontSize: 9,
    },
    tableCellBillHeader: {
      paddingLeft: 0,
      marginTop: 10,
      fontSize: 15,
      color: "red",
      textAlign: "right",
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

  const invoiceData = invoicesData.selectedInvoices;
  const overDueInvoiceTotal = invoicesData.totalAmount;
  const billingAddress = invoicesData.billingAddress;
  const companyCurrentTotalAmount = invoicesData.companyCurrentTotalAmount;

  // console.log(typeof overDueInvoiceTotal, typeof companyCurrentTotalAmount);

  const totalAmountDue = overDueInvoiceTotal + companyCurrentTotalAmount;

  const formattedTotalAmountDue = totalAmountDue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedCompanyCurrentTotalAmount =
    companyCurrentTotalAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const past30TotalAmountNumber = parseFloat(invoicesData.past30TotalAmount);
  const past60TotalAmountNumber = parseFloat(invoicesData.past60TotalAmount);
  const past90TotalAmountNumber = parseFloat(invoicesData.past90TotalAmount);

  const past30TotalAmount = past30TotalAmountNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const past60TotalAmount = past60TotalAmountNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const past90TotalAmount = past90TotalAmountNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  //console.log(invoiceData);

  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function splitpurchaseOrderData(invoiceData) {
    const firstChunk = invoiceData?.slice(0, 30);
    const remainingItems = invoiceData?.slice(30);
    const chunks = splitArrayIntoChunks(remainingItems, 40);
    return [firstChunk, ...chunks];
  }

  const [firstItems, ...otherChunks] = splitpurchaseOrderData(invoiceData);
  const currentDate = new Date();
  const dateToday =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear();

  // console.log("firstItemsAAAAA", firstItems);

  return (
    <>
      <Document id={"100"}>
        <Page style={styles.body} size="A4" orientation="portrait">
          {/* ******* header ******* */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColImageHeader}>
                <Image
                  style={styles.image}
                  src="https://ctladmin.b-cdn.net/CTL%20Brand%20Images/letterhead1.png"
                />
              </View>
              <View style={styles.tableColHeadingHeader}>
                <View style={styles.tableColHeaderTop}>
                  <Text style={styles.tableCellBillHeader}>
                    STATEMENT OF ACCOUNTS
                  </Text>
                </View>
                <View style={styles.tableColHeaderLeftMain}>
                  <View style={styles.tableColHeaderLeft}>
                    {/* <Text style={styles.tableCellBill}>Date : {dateToday}</Text> */}
                  </View>
                  <View style={styles.tableColHeaderLeft}>
                    <Text style={styles.tableCellBill}>
                      CTL Australia PTY LTD
                    </Text>

                    <Text style={styles.tableCellBill}>Perth, WA 6062</Text>
                    <Text style={styles.tableCellBill}>
                      Phone: 0498 139 213
                    </Text>
                    <Text style={styles.tableCellBill}>
                      ABN : 12 609 518 809
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <br />
          {/* ******* header ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow5}>
                <View style={styles.tableColHeaderSideHead}>
                  <Text>Customer :</Text>
                </View>
                <View style={styles.tableColHeaderSideHead}>
                  <Text>Payments To :</Text>
                </View>
              </View>
              <View style={styles.tableRow4}>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>
                    {billingAddress.replaceAll(",", "\n")}
                  </Text>
                </View>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>BSB : 036-231</Text>
                  <Text style={styles.tableCellBill}>ACC : 585602</Text>
                  <Text style={styles.tableCellBill}>Westpac Bank</Text>
                  <Text style={styles.tableCellBill}> </Text>
                  <Text style={styles.tableCellBill}> </Text>
                  <Text style={styles.tableCellBill}>Date : {dateToday}</Text>
                </View>
              </View>

              {/* <View style={styles.tableRow1}>
                <View style={styles.tableCellHeaderSide}>
                  <Text style={styles.tableColBill}>Total Amount Due</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Current</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}>Past 30</Text>
                </View>
                {/* <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}></Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableColBill}></Text>
                </View> 
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCellHeaderSide}>
                  <Text style={styles.tableCellBillBox}>
                    {overDueInvoiceTotal}
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {invoiceData.wareHouse}
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {invoiceData.currency}
                  </Text>
                </View>
                {/* <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {invoiceData.orderTerm}
                  </Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text style={styles.tableCellBillBox}>
                    {invoiceData.requiredBy}
                  </Text>
                </View> 
              </View> */}
            </View>
          </View>
          {/* ******* Product List (first page) ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Date</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Document</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Client's P/O</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Due Date</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Currency</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Debit</Text>
                </View>
                <View style={styles.tableColHeaderSideTotal}>
                  <Text style={styles.tableColBillItemHeader}>Credit</Text>
                </View>
                <View style={styles.tableColHeaderSideTotal}>
                  <Text style={styles.tableColBillItemHeader}>Balance</Text>
                </View>
              </View>
              {firstItems?.map((item, idx) => {
                return idx % 2 == 0 ? (
                  <>
                    <View style={styles.tableRowProducts} key={idx}>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.deliveredAt.split("T")[0]}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.invoiceNumber}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.purchaseNumber}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {(() => {
                            const deliveredAtDate = new Date(item.deliveredAt);
                            const dueDate = new Date(
                              deliveredAtDate.setDate(
                                deliveredAtDate.getDate() + item.dueDays
                              )
                            );
                            const formattedDate = dueDate
                              .toISOString()
                              .split("T")[0];
                            return formattedDate;
                          })()}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>AUD</Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemRight}>
                          {item.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Text>
                      </View>

                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>0.00</Text>
                      </View>
                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>
                          {parseFloat(item.overDueBalance).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.tableRowProducts1} key={idx}>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.deliveredAt.split("T")[0]}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.invoiceNumber}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.purchaseNumber}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {(() => {
                            const deliveredAtDate = new Date(item.deliveredAt);
                            const dueDate = new Date(
                              deliveredAtDate.setDate(
                                deliveredAtDate.getDate() + item.dueDays
                              )
                            );
                            const formattedDate = dueDate
                              .toISOString()
                              .split("T")[0];
                            return formattedDate;
                          })()}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>AUD</Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemRight}>
                          {item.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Text>
                      </View>

                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>0.00</Text>
                      </View>
                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>
                          {parseFloat(item.overDueBalance).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
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
              <View style={styles.tableBorderBottomSpecialMain}>
                {invoiceData?.specialNote !== "" ? (
                  <>
                    <View style={styles.tableBorderBottomSpecial1}>
                      <Text style={styles.tableCellBillBoxSpecial}>
                        For Statement Enquiries Please Contact :
                      </Text>
                      <Text style={styles.tableCellBillBoxSpecial}>
                        email : accounts@ctlaus.com
                      </Text>
                    </View>
                  </>
                ) : (
                  ""
                )}
                <View style={styles.tableBorderBottomSpecial}>
                  <View style={styles.tableBorderBottom}>
                    <View style={styles.tableCellHeaderLeftBottom}>
                      <Text style={styles.tableCellBillBox}>
                        Total Amount Due :
                      </Text>
                    </View>
                    <View style={styles.tableCellBottom}>
                      <Text style={styles.tableCellBillBoxRight}>
                        $
                        {formattedTotalAmountDue}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableBorderBottom}>
                    <View style={styles.tableCellHeaderLeftBottom}>
                      <Text style={styles.tableCellBillBox}>
                        Current Balance :{" "}
                      </Text>
                    </View>
                    <View style={styles.tableCellBottom}>
                      <Text style={styles.tableCellBillBoxRight}>
                        ${formattedCompanyCurrentTotalAmount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableBorderBottom}>
                    <View style={styles.tableCellHeaderLeftBottom}>
                      <Text style={styles.tableCellBillBox}>Past 30 Days :</Text>
                    </View>
                    <View style={styles.tableCellBottom}>
                      <Text style={styles.tableCellBillBoxRight}>
                        ${past30TotalAmount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableBorderBottom}>
                    <View style={styles.tableCellHeaderLeftBottom}>
                      <Text style={styles.tableCellBillBox}>Past 60 Days :</Text>
                    </View>
                    <View style={styles.tableCellBottom}>
                      <Text style={styles.tableCellBillBoxRight}>
                        ${past60TotalAmount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableBorderBottom}>
                    <View style={styles.tableCellHeaderLeftBottom}>
                      <Text style={styles.tableCellBillBox}>Past 90 Days :</Text>
                    </View>
                    <View style={styles.tableCellBottom}>
                      <Text style={styles.tableCellBillBoxRight}>
                        ${past90TotalAmount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </Page>

        {/* ******* Product List (other pages) ******* */}
        {otherChunks?.map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk?.length > 0 && (
              <Page style={styles.body} size="A4" orientation="portrait">
                <View style={styles.tableItemChunk}>
                  <View style={styles.tableBorder}>
                    <View style={styles.tableRow1}>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>Date</Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>
                          Document
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>
                          Client's P/O
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>
                          Due Date
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>
                          Currency
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItemHeader}>Debit</Text>
                      </View>
                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemHeader}>
                          Credit
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemHeader}>
                          Balance
                        </Text>
                      </View>
                    </View>
                    {chunk?.map((item, idx) => {
                      return idx % 2 == 0 ? (
                        <>
                          <View style={styles.tableRowProducts} key={idx}>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItem}>
                                {item.deliveredAt.split("T")[0]}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItem}>
                                {item.invoiceNumber}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItem}>
                                {item.purchaseNumber}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItem}>
                                {
                                  (item.deliveredAt + item.dueDays).split(
                                    "T"
                                  )[0]
                                }
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItem}>AUD</Text>
                            </View>
                            <View style={styles.tableColHeaderMedium}>
                              <Text style={styles.tableColBillItemRight}>
                                {item.balance.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </Text>
                            </View>

                            <View style={styles.tableColHeaderSideTotal}>
                              <Text style={styles.tableColBillItemRight}>
                                0.00
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderSideTotal}>
                              <Text style={styles.tableColBillItemRight}>
                                {item.overDueBalance.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </Text>
                            </View>
                          </View>
                        </>
                      ) : (
                        <View style={styles.tableRowProducts1} key={idx}>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItem}>
                              {item.deliveredAt.split("T")[0]}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItem}>
                              {item.invoiceNumber}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItem}>
                              {item.purchaseNumber}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItem}>
                              {(item.deliveredAt + item.dueDays).split("T")[0]}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItem}>AUD</Text>
                          </View>
                          <View style={styles.tableColHeaderMedium}>
                            <Text style={styles.tableColBillItemRight}>
                              {item.balance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </Text>
                          </View>

                          <View style={styles.tableColHeaderSideTotal}>
                            <Text style={styles.tableColBillItemRight}>
                              0.00
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderSideTotal}>
                            <Text style={styles.tableColBillItemRight}>
                              {item.overDueBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
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
                  <View style={styles.tableBorderBottomSpecialMain}>
                    <>
                      {invoiceData?.specialNote !== "" ? (
                        <>
                          <View style={styles.tableBorderBottomSpecial1}>
                            <Text style={styles.tableCellBillBoxSpecial}>
                              For Statement Enquiries Please Contact :
                            </Text>
                            <Text style={styles.tableCellBillBoxSpecial}>
                              email : accounts@ctlaus.com
                            </Text>
                          </View>
                        </>
                      ) : (
                        ""
                      )}
                      <View style={styles.tableBorderBottomSpecial}>
                        <View style={styles.tableBorderBottom}>
                          <View style={styles.tableCellHeaderLeftBottom}>
                            <Text style={styles.tableCellBillBox}>
                              Total Amount Due :
                            </Text>
                          </View>
                          <View style={styles.tableCellBottom}>
                            <Text style={styles.tableCellBillBoxRight}>
                              ${formattedTotalAmountDue}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableBorderBottom}>
                          <View style={styles.tableCellHeaderLeftBottom}>
                            <Text style={styles.tableCellBillBox}>
                              Current Balance :{" "}
                            </Text>
                          </View>
                          <View style={styles.tableCellBottom}>
                            <Text style={styles.tableCellBillBoxRight}>
                              ${formattedCompanyCurrentTotalAmount}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableBorderBottom}>
                          <View style={styles.tableCellHeaderLeftBottom}>
                            <Text style={styles.tableCellBillBox}>
                              Past 30 Days :
                            </Text>
                          </View>
                          <View style={styles.tableCellBottom}>
                            <Text style={styles.tableCellBillBoxRight}>
                              ${past30TotalAmount}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableBorderBottom}>
                          <View style={styles.tableCellHeaderLeftBottom}>
                            <Text style={styles.tableCellBillBox}>
                              Past 60 Days :
                            </Text>
                          </View>
                          <View style={styles.tableCellBottom}>
                            <Text style={styles.tableCellBillBoxRight}>
                              ${past60TotalAmount}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableBorderBottom}>
                          <View style={styles.tableCellHeaderLeftBottom}>
                            <Text style={styles.tableCellBillBox}>
                              Past 90 Days :
                            </Text>
                          </View>
                          <View style={styles.tableCellBottom}>
                            <Text style={styles.tableCellBillBoxRight}>
                              ${past90TotalAmount}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </>
                  </View>
                )}
              </Page>
            )}
          </React.Fragment>
        ))}
      </Document>
    </>
  );
};

export default OverdueInvoicesPrint;
