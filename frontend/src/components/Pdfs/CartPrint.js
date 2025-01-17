import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const CartPrint = (cartItems) => {
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
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      height: "auto",
      width: "100%",
    },
    tableRow1: {
      margin: "auto",
      flexDirection: "row",
      height: "20px",
      backgroundColor: "#cccccc",
      width: "100%",
      fontWeight: "bold",
    },
    tableRow2: {
      margin: "auto",
      flexDirection: "row",
      height: "20px",
      width: "100%",
      borderBottomWidth: 0,

    },
    tableColImageHeader: {
      width: "60%",
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
    tableColHeader: {
      width: "33.33%",
      borderStyle: "solid",
      marginTop: 8,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
      textAlign: "right"
    },
    tableItem: {
      paddingLeft: 50,
      paddingBottom: 5,
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
    },
    tableColHeaderLeftHead: {
      float: "left",
      width: "40%",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 3,
    },
    tableColHeaderRightHead: {
      float: "left",
      width: "40%",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 0,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 3,
    },
    tableColHeaderMiddleHead: {
      float: "left",
      width: "20%",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 3,
    },
    tableColHeaderSideTotal: {
      float: "left",
      width: "20%",
      borderStyle: "solid",
      borderRightWidth: 0,
      borderBottomWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 3,
    },
    tableColHeaderCenter: {
      float: "left",
      width: "60%",
      borderStyle: "solid",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 3,
    },
    tableColHeaderShort: {
      float: "center",
      width: "12%",
      borderStyle: "solid",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      fontSize: 10,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 3,
    },


    //************************************* */

    tableItemChunk: {
      paddingLeft: 50,
      paddingBottom: 5,
      paddingTop: 30,
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 0,
    },


    tableBorderBottom: {
      flexDirection: "row",
      display: "table",
      width: "40%",
      borderStyle: "solid",
      borderWidth: 1,
      marginLeft: "55%",
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

    tableColDeiliveryHeader: {
      width: "50%",
      borderStyle: "solid",
      marginTop: 8,
      paddingLeft: "33%",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 10,
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
      paddingBottom: 5,
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
      paddingTop: 2,
      paddingBottom: 2,
    },

    tableColCartHeader: {
      borderStyle: "solid",
      borderWidth: 0,
      fontSize: 20,
      textAlign: "center",
      backgroundColor: "#cccccc",
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
      width: "33%",
      paddingLeft: 5,
      fontSize: 10,
      borderRight: 0,
    },
    tableCellHeaderLeft: {
      width: "60%",
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
    tableCellBillBox: {
      paddingLeft: 5,
      marginTop: 5,
      fontSize: 10,
      height: "15px",
      textAlign: "center",
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

  const InvCartItems = cartItems.cartItems;
  const InvUserInfo = cartItems.userInfo;
  const InvAddress = cartItems.userAddress;
  var counter = 0;

  /*   console.log("InvCartItems", InvCartItems);
    console.log("InvUserInfo", InvUserInfo);
    console.log("InvAddress", InvAddress);
    console.log("cart items", cartItems); */
  //console.log("InvAddress", InvAddress.deliveryAddress);

  function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function splitCartItems(InvCartItems) {
    const firstChunk = InvCartItems.slice(0, 16);
    const remainingItems = InvCartItems.slice(16);
    const chunks = splitArrayIntoChunks(remainingItems, 25);
    return [firstChunk, ...chunks];
  }

  const [firstItems, ...otherChunks] = splitCartItems(InvCartItems);

  const invoiceDate = new Date(cartItems.invoiceDate).toLocaleString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  //Area needs editing in future as we get more clients -- starts here
  const deliverDate = new Date(cartItems.invoiceDate);
  if (InvUserInfo.email) {
    if (InvUserInfo.email.split("@")[1] === "slrltd.com") {
      if (cartItems.cartSubtotal < 20000) {
        deliverDate.setDate(deliverDate.getDate() + 7);
      } else {
        deliverDate.setDate(deliverDate.getDate() + 30);
      }
    } else if (InvUserInfo.email.split("@")[1] === "focusminerals.com.au") {
      deliverDate.setDate(deliverDate.getDate() + 30);
    }
  }
  const deliveryDate = new Date(deliverDate).toLocaleString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  //Area needs editing in future as we get more clients -- ends here

  return (
    <>
      <Document id={cartItems.invoiceNumber}>
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
              <View style={styles.tableColHeader}>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellBill}>CTL Australia</Text>
                <Text style={styles.tableCellBill}>T : +61 498 139 213</Text>
                <Text style={styles.tableCellBill}>E : sales@ctlaus.com</Text>
                <Text style={styles.tableCellBill}>W : ctlaustralia.com.au</Text>
                <Text style={styles.tableCellBill}>ABN : 12 609 518 809</Text>
              </View>
            </View>
          </View>
          {/* ******* header ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <Text style={styles.tableColCartHeader}>CART DETAILS</Text>
            </View>
          </View>

          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderLeftHead}>
                  <Text>Cart Owner :</Text>
                </View>
                <View style={styles.tableColHeaderMiddleHead}>
                  <Text>Despatch From :</Text>
                </View>
                <View style={styles.tableColHeaderMiddleHead}>
                  <Text>Page #</Text>
                </View>
                <View style={styles.tableColHeaderRightHead}>
                  <Text>Ship To :</Text>
                </View>
              </View>
              <View style={styles.tableRow2}>
                <View style={styles.tableColHeaderLeftHead}>
                  <Text >
                    {InvUserInfo.name}: {`<${InvUserInfo.email}>`}
                  </Text>
                </View>
                <View style={styles.tableColHeaderMiddleHead}>
                  <Text>Perth Warehouse</Text>
                </View>
                <View style={styles.tableColHeaderMiddleHead}>
                  <Text
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber} / ${totalPages}`
                    }
                  />
                </View>
                <View style={styles.tableColHeaderRightHead}>
                  <Text style={styles.tableCellBill}>
                    {InvAddress
                      ? InvAddress.replaceAll(',', '\n')
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ******* Product List (first page) ******* */}
          <View style={styles.tableItem}>
            <View style={styles.tableBorder}>
              <View style={styles.tableRow1}>
                <View style={styles.tableColHeaderShort}><Text style={styles.tableColBillItemHeader}>Item Code</Text></View>
                <View style={styles.tableColHeaderCenter}><Text style={styles.tableColBillItemHeader}>Item Description</Text></View>
                <View style={styles.tableColHeaderShort}><Text style={styles.tableColBillItemHeader}>Qty Order</Text></View>
                <View style={styles.tableColHeaderShort}><Text style={styles.tableColBillItemHeader}>Unit Price</Text></View>
                <View style={styles.tableColHeaderShort}><Text style={styles.tableColBillItemHeader}>Net Amount</Text></View>
                <View style={styles.tableColHeaderShort}><Text style={styles.tableColBillItemHeader}>GST</Text></View>
                {/* <View style={styles.tableColHeaderSideTotal}><Text>Total Inc. GST</Text></View> */}
              </View>
              {firstItems.map((item, idx) => {
                return idx % 2 == 0 ? (
                  <>
                    <View style={styles.tableRowProducts} key={idx}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.cartProducts[0].mnasku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>{item.name.toUpperCase()}</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.cartProducts[0].quantity}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? item.cartProducts[0].price
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? (
                              item.cartProducts[0].price *
                              item.cartProducts[0].quantity
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          10% {"  "}
                        </Text>
                        {/* <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? (
                              (item.cartProducts[0].price *
                                item.cartProducts[0].quantity *
                                10) /
                              100
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text> */}
                      </View>
                      {/* <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? (
                              item.cartProducts[0].price *
                              item.cartProducts[0].quantity +
                              (item.cartProducts[0].price *
                                item.cartProducts[0].quantity *
                                10) /
                              100
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View> */}
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.tableRowProducts1} key={idx}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.cartProducts[0].mnasku}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItem}>{item.name.toUpperCase()}</Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItem}>
                          {item.cartProducts[0].quantity}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? item.cartProducts[0].price
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? (
                              item.cartProducts[0].price *
                              item.cartProducts[0].quantity
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemRight}>
                          10% {"  "}
                        </Text>
                        {/* <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? (
                              (item.cartProducts[0].price *
                                item.cartProducts[0].quantity *
                                10) /
                              100
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text> */}
                      </View>
                      {/* <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemRight}>
                          ${" "}
                          {item.cartProducts[0].price
                            ? (
                              item.cartProducts[0].price *
                              item.cartProducts[0].quantity +
                              (item.cartProducts[0].price *
                                item.cartProducts[0].quantity *
                                10) /
                              100
                            )
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View> */}
                    </View>
                  </>
                );
              })}
            </View>
          </View>
          <Text
            style={styles.pageNumbers}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />

          {/* bottom total price */}
          {otherChunks[0] ? (
            ""
          ) : (
            <>
              {" "}
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>
                    Inv. Amount Excl. Tax
                  </Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}
                    {cartItems.cartSubtotal
                      ? (cartItems.cartSubtotal - cartItems.taxAmount)
                        .toFixed(2)
                        .toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>Total GST</Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}
                    {cartItems.taxAmount
                      ? cartItems.taxAmount
                        .toFixed(2)
                        .toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.tableBorderBottom}>
                <View style={styles.tableCellHeaderLeftBottom}>
                  <Text style={styles.tableCellBillBox}>Invoice Amount</Text>
                </View>
                <View style={styles.tableCellBottom}>
                  <Text style={styles.tableCellBillBoxRight}>
                    ${" "}
                    {cartItems.cartSubtotal
                      ? cartItems.cartSubtotal.toFixed(2).toLocaleString()
                      : ""}
                  </Text>
                </View>
              </View>
            </>
          )}
        </Page>

        {/* ******* Product List (other pages) ******* */}
        {otherChunks.map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk.length > 0 && (
              <Page style={styles.body} size="A4" orientation="landscape">
                <View style={styles.tableItemChunk}>
                  <View style={styles.tableBorder}>
                    <View style={styles.tableRow1}>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>
                          Item Code
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderCenter}>
                        <Text style={styles.tableColBillItemHeader}>
                          Item Description
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>
                          Qty Order
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>
                          Qty Supply
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>
                          Unit Price
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>
                          Net Amount
                        </Text>
                      </View>
                      <View style={styles.tableColHeaderShort}>
                        <Text style={styles.tableColBillItemHeader}>GST</Text>
                      </View>
                      {/* <View style={styles.tableColHeaderSideTotal}>
                        <Text style={styles.tableColBillItemHeader}>
                          Total Inc. GST
                        </Text>
                      </View> */}
                    </View>
                    {chunk.map((item, idx) => {
                      return idx % 2 == 0 ? (
                        <>
                          <View style={styles.tableRowProducts} key={idx}>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                {item.cartProducts[0].mnasku}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderCenter}>
                              <Text style={styles.tableColBillItem}>
                                {item.name.toUpperCase()}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                {item.cartProducts[0].quantity}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                {item.cartProducts[0].quantity}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                $
                                {item.cartProducts[0].price
                                  ? item.cartProducts[0].price
                                    .toFixed(2)
                                    .toLocaleString()
                                  : ""}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                ${" "}
                                {item.cartProducts[0].price
                                  ? (
                                    item.cartProducts[0].price *
                                    item.cartProducts[0].quantity
                                  )
                                    .toFixed(2)
                                    .toLocaleString()
                                  : ""}
                              </Text>
                            </View>
                            <View style={styles.tableColHeaderShort}>
                              <Text style={styles.tableColBillItem}>
                                10% {"  "}
                              </Text>
                              {/* <Text style={styles.tableColBillItem}>
                                ${" "}
                                {item.cartProducts[0].price
                                  ? (
                                    (item.cartProducts[0].price *
                                      item.cartProducts[0].quantity *
                                      10) /
                                    100
                                  )
                                    .toFixed(2)
                                    .toLocaleString()
                                  : ""}
                              </Text> */}
                            </View>
                            {/* <View style={styles.tableColHeaderSideTotal}>
                              <Text style={styles.tableColBillItem}>
                                ${" "}
                                {item.cartProducts[0].price
                                  ? (
                                    item.cartProducts[0].price *
                                    item.cartProducts[0].quantity +
                                    (item.cartProducts[0].price *
                                      item.cartProducts[0].quantity *
                                      10) /
                                    100
                                  )
                                    .toFixed(2)
                                    .toLocaleString()
                                  : ""}
                              </Text>
                            </View> */}
                          </View>
                        </>
                      ) : (
                        <View style={styles.tableRowProducts1} key={idx}>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.cartProducts[0].mnasku}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderCenter}>
                            <Text style={styles.tableColBillItem}>
                              {item.name.toUpperCase()}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.cartProducts[0].quantity}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              {item.cartProducts[0].quantity}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              $
                              {item.cartProducts[0].price
                                ? item.cartProducts[0].price
                                  .toFixed(2)
                                  .toLocaleString()
                                : ""}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              ${" "}
                              {item.cartProducts[0].price
                                ? (
                                  item.cartProducts[0].price *
                                  item.cartProducts[0].quantity
                                )
                                  .toFixed(2)
                                  .toLocaleString()
                                : ""}
                            </Text>
                          </View>
                          <View style={styles.tableColHeaderShort}>
                            <Text style={styles.tableColBillItem}>
                              10% {"  "}
                            </Text>
                            {/* <Text style={styles.tableColBillItem}>
                              ${" "}
                              {item.cartProducts[0].price
                                ? (
                                  (item.cartProducts[0].price *
                                    item.cartProducts[0].quantity *
                                    10) /
                                  100
                                )
                                  .toFixed(2)
                                  .toLocaleString()
                                : ""}
                            </Text> */}
                          </View>
                          {/* <View style={styles.tableColHeaderSideTotal}>
                            <Text style={styles.tableColBillItem}>
                              ${" "}
                              {item.cartProducts[0].price
                                ? (
                                  item.cartProducts[0].price *
                                  item.cartProducts[0].quantity +
                                  (item.cartProducts[0].price *
                                    item.cartProducts[0].quantity *
                                    10) /
                                  100
                                )
                                  .toFixed(2)
                                  .toLocaleString()
                                : ""}
                            </Text>
                          </View> */}
                        </View>
                      );
                    })}
                  </View>
                </View>
                <Text
                  style={styles.pageNumbers}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                />

                {/* show total price in last page */}
                {index === otherChunks.length - 1 && (
                  <>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeftBottom}>
                        <Text style={styles.tableCellBillBox}>
                          Inv. Amount Excl. Tax
                        </Text>
                      </View>
                      <View style={styles.tableCellBottom}>
                        <Text style={styles.tableCellBillBoxRight}>
                          ${" "}
                          {cartItems.cartSubtotal
                            ? (cartItems.cartSubtotal / 1.1)
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeftBottom}>
                        <Text style={styles.tableCellBillBox}>Total GST</Text>
                      </View>
                      <View style={styles.tableCellBottom}>
                        <Text style={styles.tableCellBillBoxRight}>
                          ${" "}
                          {cartItems.cartSubtotal
                            ? (cartItems.cartSubtotal / 1.1 * 0.1)
                              .toFixed(2)
                              .toLocaleString()
                            : ""}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableBorderBottom}>
                      <View style={styles.tableCellHeaderLeftBottom}>
                        <Text style={styles.tableCellBillBox}>
                          Invoice Amount
                        </Text>
                      </View>
                      <View style={styles.tableCellBottom}>
                        <Text style={styles.tableCellBillBoxRight}>
                          ${" "}
                          {cartItems.cartSubtotal
                            ? cartItems.cartSubtotal.toFixed(2).toLocaleString()
                            : ""}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </Page>
            )}
          </React.Fragment>
        ))}
      </Document>
    </>
  );
};

export default CartPrint;
