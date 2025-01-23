import React from "react";

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

const InvoicePrint = (cartItems) => {
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
            marginLeft: "55%",
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
            borderBottomWidth: 1,
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
            width: "30%",
            borderStyle: "solid",
            textAlign: "right",
            marginTop: 10,
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
            paddingBottom: 10,
            paddingTop: 5,
            textTransform: "uppercase",
        },
        tableColHeaderSideTotal: {
            float: "left",
            width: "20%",
            borderStyle: "solid",
            borderRightWidth: 1,
            fontSize: 10,
            fontWeight: "bold",
            paddingLeft: 5,
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
        tableCellBillHeader: {
            paddingLeft: 5,
            marginTop: 0,
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
    const dueDays = cartItems.dueDays;
    const deliverySite = cartItems.selectedDeliverySite;
    const companyAccount = cartItems.companyAccount;
    let counter = 0;
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
    const deliverDate = new Date(cartItems.deliveredAt)
    deliverDate.setDate(deliverDate.getDate() + dueDays);

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
                                <Text style={styles.tableCellBillHeader}>DELIVERY NOTE</Text>
                                <Text style={styles.tableCellBill}>CTL Australia</Text>
                                <Text style={styles.tableCellBill}>E : accounts@ctlaus.com</Text>
                                <Text style={styles.tableCellBill}>W : www.ctlaus.com</Text>
                                <Text style={styles.tableCellBill}>ABN : 12 609 518 809</Text>
                            </View>
                        </View>
                    </View>
                    {/* ******* header ******* */}
                    <View style={styles.tableItem}>
                        <View style={styles.tableBorder}>
                            <View style={styles.tableRow1}>
                                <View style={styles.tableColHeaderSideHead}>
                                    <Text>Invoice To :</Text>
                                </View>
                                <View style={styles.tableColHeaderCenter}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCellHeaderLeft}>
                                            <Text>Despatch From :</Text>
                                        </View>
                                        <View style={styles.tableCellHeaderSales}>
                                            <Text>Page #</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableColHeaderSideHead}>
                                    <Text>Delivered To :</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColHeaderSide}>
                                    <Text style={styles.tableCellBill}>
                                        {deliverySite?.billingAddress.replaceAll(',', '\n')}
                                    </Text>
                                </View>
                                <View style={styles.tableColHeaderCenter}>
                                    <View style={styles.tableRow2}>
                                        <View style={styles.tableCellHeaderLeft}>
                                            <View style={styles.tableCellBillBox}>
                                                <Text>Perth Warehouse</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableCellHeaderSales}>
                                            <View style={styles.tableCellBillBox}>
                                                <Text render={({ pageNumber, totalPages }) => (
                                                    `${pageNumber} / ${totalPages}`
                                                )} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableColHeaderSide}>
                                    <Text style={styles.tableCellBill}>
                                        {deliverySite?.name}
                                    </Text>
                                    <Text style={styles.tableCellBill}>
                                        {deliverySite?.deliveryAddress.replaceAll(',', '\n')}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.tableRow1}>
                                <View style={styles.tableCellHeaderSide}>
                                    <Text style={styles.tableColBill}>Account</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableColBill}>Invoice Number</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableColBill}>Invoice Date</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableColBill}>Due Date</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableColBill}>Purchase Order No.</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableColBill}>Sales Order No.</Text>
                                </View>

                            </View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableCellHeaderSide}>
                                    <Text style={styles.tableCellBillBox}>{companyAccount}</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableCellBillBox}>
                                        {cartItems.invoiceNumber}
                                    </Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableCellBillBox}>
                                        {invoiceDate.split("at")[0]}
                                    </Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableCellBillBox}>
                                        {deliveryDate === "Invalid Date" ? ("15-30 days") : (deliveryDate.split("at")[0])}
                                    </Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableCellBillBox}>
                                        {cartItems.purchaseNumber}
                                    </Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text style={styles.tableCellBillBox}>

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
                                    <Text style={styles.tableColBillItemHeader}>CTL Item Code</Text>
                                </View>
                                {/* <View style={styles.tableColHeaderShort}>
                                    <Text style={styles.tableColBillItemHeader}>Client Item Code</Text>
                                </View> */}
                                <View style={styles.tableColHeaderCenter}>
                                    <Text style={styles.tableColBillItemHeader}>Item Description</Text>
                                </View>
                                <View style={styles.tableColHeaderShort}>
                                    <Text style={styles.tableColBillItemHeader}>Qty Order</Text>
                                </View>
                                <View style={styles.tableColHeaderShort}>
                                    <Text style={styles.tableColBillItemHeader}>Qty Supply</Text>
                                </View>

                                <View style={styles.tableColHeaderShort}>
                                    <Text style={styles.tableColBillItemHeader}>Qty Back Order</Text>
                                </View>
                            </View>
                            {firstItems.map((item, idx) => {
                                return (
                                    idx % 2 == 0 ? (
                                        <>
                                            <View style={styles.tableRowProducts} key={idx}>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].mnasku}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableColHeaderCenter}>
                                                    <Text style={styles.tableColBillItem}>{item.name.toUpperCase() + ` (${item?.cartProducts[0].attrs})`}</Text>
                                                </View>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].quantity}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].suppliedQty}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].backOrder}
                                                    </Text>
                                                </View>

                                            </View>
                                        </>) : (
                                        <>
                                            <View style={styles.tableRowProducts1} key={idx}>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].mnasku}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableColHeaderCenter}>
                                                    <Text style={styles.tableColBillItem}>{item.name.toUpperCase() + ` (${item?.cartProducts[0].attrs})`}</Text>
                                                </View>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].quantity}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].suppliedQty}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableColHeaderShort}>
                                                    <Text style={styles.tableColBillItem}>
                                                        {item.cartProducts[0].backOrder}
                                                    </Text>
                                                </View>

                                            </View>
                                        </>)
                                );
                            })}
                        </View>
                    </View>
                    <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} />

                    {/* bottom total price */}

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
                                                <Text style={styles.tableColBillItemHeader}>CTL Item Code</Text>
                                            </View>
                                            {/* <View style={styles.tableColHeaderShort}>
                                                <Text style={styles.tableColBillItemHeader}>Client Item Code</Text>
                                            </View> */}
                                            <View style={styles.tableColHeaderCenter}>
                                                <Text style={styles.tableColBillItemHeader}>
                                                    Item Description
                                                </Text>
                                            </View>
                                            <View style={styles.tableColHeaderShort}>
                                                <Text style={styles.tableColBillItemHeader}>Qty Order</Text>
                                            </View>
                                            <View style={styles.tableColHeaderShort}>
                                                <Text style={styles.tableColBillItemHeader}>Qty Supply</Text>
                                            </View>
                                            <View style={styles.tableColHeaderShort}>
                                                <Text style={styles.tableColBillItemHeader}>Qty Back Order</Text>
                                            </View>

                                        </View>
                                        {chunk.map((item, idx) => {
                                            return (
                                                idx % 2 == 0 ? (
                                                    <>
                                                        <View style={styles.tableRowProducts} key={idx}>
                                                            <View style={styles.tableColHeaderShort}>
                                                                <Text style={styles.tableColBillItem}>
                                                                    {item.cartProducts[0].mnasku}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.tableColHeaderCenter}>
                                                                <Text style={styles.tableColBillItem}>
                                                                    {item.name.toUpperCase() + ` (${item?.cartProducts[0].attrs})`}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.tableColHeaderShort}>
                                                                <Text style={styles.tableColBillItem}>
                                                                    {item.cartProducts[0].quantity}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.tableColHeaderShort}>
                                                                <Text style={styles.tableColBillItem}>
                                                                    {item.cartProducts[0].suppliedQty}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.tableColHeaderShort}>
                                                                <Text style={styles.tableColBillItem}>
                                                                    {item.cartProducts[0].backOrder}
                                                                </Text>
                                                            </View>

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
                                                                {item.name.toUpperCase() + ` (${item?.cartProducts[0].attrs})`}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.tableColHeaderShort}>
                                                            <Text style={styles.tableColBillItem}>
                                                                {item.cartProducts[0].quantity}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.tableColHeaderShort}>
                                                            <Text style={styles.tableColBillItem}>
                                                                {item.cartProducts[0].suppliedQty}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.tableColHeaderShort}>
                                                            <Text style={styles.tableColBillItem}>
                                                                {item.cartProducts[0].backOrder}
                                                            </Text>
                                                        </View>

                                                    </View>
                                                )
                                            );
                                        })}

                                    </View>
                                </View>
                                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                                    `${pageNumber} / ${totalPages}`
                                )} />
                            </Page>
                        )}
                    </React.Fragment>
                ))}
            </Document>
        </>
    );
};

export default InvoicePrint;
