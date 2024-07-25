
import React, { useState, useRef, useEffect } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const ClientQuote = (quotePrintData) => {
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
      paddingBottom: 0,
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0,
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
      width: "40%",
      borderStyle: "solid",
      borderWidth: 1,
      marginLeft: "55.3%",
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
      width: "103%",
      borderBottom: 1,
      borderTopWidth: 1,
      borderRight: 1,
      marginLeft: -5,
      marginTop: 5,
      backgroundColor: "#cccccc",

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
    tableRowProducts2: {
      flexDirection: "row",
      height: "50px",
      width: "100%",
      borderRight: 1,
      textAlign: "center",
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
    tableColBottomInfo: {
      width: "53%",
      borderStyle: "solid",
      textAlign: "left",
      marginLeft: "5%",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
      position: "absolute",
      bottom: "15px"
    },
    tableColInfo: {
      paddingTop: "10px",
      paddingBottom: "10px",
      width: "100%",
      borderStyle: "solid",
      textAlign: "center",
      marginTop: 0,
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
      width: "40%",
      borderStyle: "solid",
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
    },
    tableColHeaderSide: {
      float: "left",
      width: "40%",
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
    tableColHeaderSide2: {
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
    tableColHeaderShort: {
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
      fontSize: 8,
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
      width: "30%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 0,
    },
    tableCellHeaderSales: {
      width: "25%",
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
      fontSize: 10,
    },
    tableCellBillHeading: {
      paddingLeft: 5,
      marginTop: 0,
      fontSize: 11,
      fontWeight: "bold",
      textDecoration: "underline",
      paddingBottom: "2px"
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
    tableCellBillBoxDate: {

      marginTop: 5,
      fontSize: 10,
      height: "15px",
      width: "100%",
      textAlign: "left",
      flexDirection: "row"
    },
    tableCellBillBoxDate1: {
      width: "51%",
      paddingLeft: 5,
    },
    tableCellBillBoxExtra: {
      paddingLeft: 5,
      marginTop: 5,
      fontSize: 10,
      textAlign: "left",
    },
    tableCellBillBoxRight: {
      paddingLeft: 5,
      paddingRight: 25,
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

  const quoteData = quotePrintData.selectedQuotes;
  const quoteListProducts = quotePrintData.quoteListProducts;
  const totalAmount = quotePrintData.totalAmount;
  const quoteExpiryDate = quotePrintData.quoteExpiryDate;
  const quoteExpiresDate = new Date(quoteExpiryDate).getDate() + "-" + (new Date(quoteExpiryDate).getMonth() + 1) + "-" + new Date(quoteExpiryDate).getFullYear()

  const user = quoteData[0]?.user
  const currentDate = new Date();
  const dateToday = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear()
  const quoteNumber = quotePrintData.quoteNumber

  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function splitQuoteList(quoteListData) {
    const firstChunk = quoteListData?.slice(0, 15);
    const remainingItems = quoteListData?.slice(15);
    const chunks = splitArrayIntoChunks(remainingItems, 25);
    return [firstChunk, ...chunks];
  }

  const [firstItems, ...otherChunks] = splitQuoteList(quoteListProducts);
  // console.log(firstItems);
  return (
    <>
      <Document id={1}>
        <Page style={styles.body} size="A4" orientation="landscape">
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColImageHeader}>
                <Image
                  style={styles.image}
                  src="https://res.cloudinary.com/dxvwresim/image/upload/v1683083956/CTL%20Brand%20Images/CTL-blueDelivering_g3qe9u.png"
                />
              </View>
              <View style={styles.tableColHeader}>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellBillHeader}>QUOTATION</Text>
                <Text style={styles.tableCellBill}>Josh Collins</Text>
                <Text style={styles.tableCellBill}>0498 139 213</Text>
                <Text style={styles.tableCellBill}>admin@ctlaus.com</Text>
                {/* <Text style={styles.tableCellBill}>W : ctlaus.com</Text> */}
                {/* <Text style={styles.tableCellBill}>ABN : 12 609 518 809</Text> */}
              </View>
            </View>

          </View>
          <br />
          {/* ******* header ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>

              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderSideHead}>
                  <Text>Quoted To :</Text>
                </View>
                <View style={styles.tableColHeaderCenter}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCellHeaderLeft}>
                      <Text>Quoted By :</Text>
                    </View>
                    <View style={styles.tableCellHeaderSales}>
                      <Text>Quote Date :</Text>
                    </View>
                    <View style={styles.tableCellHeaderSales}>
                      <Text>Quote Expiry Date :</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderSide}>
                  <Text style={styles.tableCellBill}>{user?.name + " " + user?.lastName}</Text>
                  <Text style={styles.tableCellBill}>{user?.company}</Text>
                </View>
                <View style={styles.tableColHeaderSide1}>
                  <Text>CTL Australia Pty Ltd</Text>
                </View>
                <View style={styles.tableColHeaderSide1}>
                  <View style={styles.tableCellBillBoxDate}>
                    <View style={styles.tableCellBillBoxDate1}>
                      <Text style={styles.tableCellBill} >{dateToday}</Text>
                    </View>
                    <View style={styles.tableCellBillBoxDate1}>
                      <Text style={styles.tableCellBill} >{quoteExpiresDate}</Text>
                    </View>
                  </View>
                  {/* <View style={styles.tableCellBillBoxDate}>
                    
                  </View> */}
                  <View style={styles.tableRow3}>
                    <Text> Quote No :</Text>
                  </View>
                  <View style={styles.tableCellBillBox}>
                    <Text>{quoteNumber}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/******* Product List (first page) ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>

              <View style={styles.tableRowProducts2}>
                <View style={styles.tableColInfo}>
                  <Text style={styles.tableCellBill} >
                    PLEASE ENSURE ALL QUANTITIES, TYPES, DESCRIPTIONS AND MEASUREMENTS ARE CHECKED AS SOME QTYS MAY DIFFER FROM SUPPLIER QUOTE.
                  </Text>
                  <Text style={styles.tableCellBill}>
                    ALL PRODUCTS QUOTED ARE TO SUIT THE INFORMATION PROVIDED.
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Item No.</Text>
                </View>
                <View style={styles.tableColHeaderMedium}>
                  <Text style={styles.tableColBillItemHeader}>Item Code</Text>
                </View>
                <View style={styles.tableColHeaderCenter}>
                  <Text style={styles.tableColBillItemHeader}>
                    Item Description
                  </Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Qty</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Unit Ex. GST</Text>
                </View>
                <View style={styles.tableColHeaderShort}>
                  <Text style={styles.tableColBillItemHeader}>Total Ex. GST</Text>
                </View>
              </View>
              {firstItems.map((item, idx) => {
                return (idx % 2 == 0 ? (
                  <>
                    <View style={styles.tableRowProducts} key={item._id} >
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {idx + 1}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.stock[0].ctlsku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>
                          {item.name.toUpperCase() + ` (${item?.stock[0].attrs})`}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          1
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.stock[0].price
                            ? item.stock[0].price
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.stock[0].price
                            ? (
                              item.stock[0].price
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.tableRowProducts1} key={item._id}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {idx + 1}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderMedium}>
                        <Text style={styles.tableColBillItem}>
                          {item.stock[0].ctlsku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>
                          {item.name.toUpperCase() + ` (${item?.stock[0].attrs})`}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          1
                        </Text>
                      </View>

                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.stock[0].price
                            ? item.stock[0].price
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.stock[0].price
                            ? (
                              item.stock[0].price
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                    </View>
                  </>)
                );
              })}
            </View>
          </View>
          {/* bottom total price */}
          {otherChunks[0] ? (
            ""
          ) : (
            <>
              {" "}

              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>
                    TOTAL AMOUNT Excl.GST
                  </Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}
                    {totalAmount
                      ? (totalAmount)
                        .toFixed(2)
                        .toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>GST PAYABLE</Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}
                    {totalAmount
                      ? ((totalAmount) * 0.1)
                        .toFixed(2)
                        .toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>TOTAL AMOUNT Inc.GST</Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}
                    {totalAmount
                      ? (totalAmount + (totalAmount * 0.1)).toFixed(2).toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>

              <View style={styles.tableColBottomInfo}>
                <Text style={styles.tableCellBillHeading}>Terms and Conditions of Quotation.</Text>
                <Text style={styles.tableCellBill}>1. Any variation in quantities or types may require a requote.</Text>
                <Text style={styles.tableCellBill}>2. Pricing is valid until the expiry date, thereafter it will be subject to revalidation.</Text>
                <Text style={styles.tableCellBill}>3. All Pricing is Subject to GST.</Text>
                <Text style={styles.tableCellBill}>4. Standard Terms and Conditions apply.</Text>
              </View>

            </>

          )}

          <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} />
        </Page >

        {/* ******* Product List (other pages) ******* */}
        {otherChunks.map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk.length > 0 && (
              <Page style={styles.body} size="A4" orientation="landscape">
                <View style={styles.tableItemChunk}>
                  <View style={styles.tableBorder}>
                    <View style={styles.tableRow1}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Item No.</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Item Code</Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItemHeader}>
                          Item Description
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Qty</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Unit Ex. GST</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>Total Ex. GST</Text>
                      </View>

                    </View>
                    {chunk.map((item, idx) => {
                      return (
                        idx % 2 == 0 ? (
                          <>
                            <View style={styles.tableRowProducts} key={idx}>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  {idx + 1}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  {item.stock[0].ctlsku}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderCenter}>
                                <Text style={styles.tableColBillItem}>
                                  {item.name.toUpperCase() + ` (${item?.stock[0].attrs})`}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  1
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  ${" "}
                                  {item.stock[0].price
                                    ? item.stock[0].price
                                      .toFixed(2)
                                      .toLocaleString()
                                    : ""}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  ${" "}
                                  {item.stock[0].price
                                    ? (
                                      item.stock[0].price
                                    )
                                      .toFixed(2)
                                      .toLocaleString()
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </>
                        ) : (
                          <>
                            <View style={styles.tableRowProducts1} key={idx}>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  {idx + 1}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  {item.stock[0].ctlsku}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderCenter}>
                                <Text style={styles.tableColBillItem}>
                                  {item.name.toUpperCase() + ` (${item?.stock[0].attrs})`}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  1
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  ${" "}
                                  {item.stock[0].price
                                    ? item.stock[0].price
                                      .toFixed(2)
                                      .toLocaleString()
                                    : ""}
                                </Text>
                              </View>
                              <View style={styles.tableColHeaderShort}>
                                <Text style={styles.tableColBillItem}>
                                  ${" "}
                                  {item.stock[0].price
                                    ? (
                                      item.stock[0].price
                                    )
                                      .toFixed(2)
                                      .toLocaleString()
                                    : ""}
                                </Text>
                              </View>
                            </View>
                          </>)
                      );
                    })}

                  </View>
                </View>
                <View style={styles.tableBorderBottom}>
                  <View style={styles.tableCellHeaderLeftBottom}>
                    <Text style={styles.tableCellBillBox}>
                      TOTAL AMOUNT Excl.GST
                    </Text>
                  </View>
                  <View style={styles.tableCellBottom}>
                    <Text style={styles.tableCellBillBoxRight}>
                      ${" "}
                      {totalAmount
                        ? (totalAmount)
                          .toFixed(2)
                          .toLocaleString()
                        : ""}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBorderBottom}>
                  <View style={styles.tableCellHeaderLeftBottom}>
                    <Text style={styles.tableCellBillBox}>GST PAYABLE</Text>
                  </View>
                  <View style={styles.tableCellBottom}>
                    <Text style={styles.tableCellBillBoxRight}>
                      ${" "}
                      {totalAmount
                        ? ((totalAmount) * 0.1)
                          .toFixed(2)
                          .toLocaleString()
                        : ""}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBorderBottom}>
                  <View style={styles.tableCellHeaderLeftBottom}>
                    <Text style={styles.tableCellBillBox}>TOTAL AMOUNT Inc.GST</Text>
                  </View>
                  <View style={styles.tableCellBottom}>
                    <Text style={styles.tableCellBillBoxRight}>
                      ${" "}
                      {totalAmount
                        ? (totalAmount + (totalAmount * 0.1)).toFixed(2).toLocaleString()
                        : ""}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableColBottomInfo}>
                  <Text style={styles.tableCellBillHeading}>Terms and Conditions of Quotation.</Text>
                  <Text style={styles.tableCellBill}>1. Any variation in quantities or types may require a requote.</Text>
                  <Text style={styles.tableCellBill}>2. Pricing is valid for 30 days from date of quotation thereafter will be subject to revalidation.</Text>
                  <Text style={styles.tableCellBill}>3. All Pricing is Subject to GST.</Text>
                  <Text style={styles.tableCellBill}>4. Standard Terms and Conditions apply.</Text>
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                  `${pageNumber} / ${totalPages}`
                )} />
              </Page>
            )}
          </React.Fragment>
        ))}
      </Document >
    </>
  );
};

export default ClientQuote;
