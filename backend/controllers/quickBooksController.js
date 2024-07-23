const OAuthClient = require("intuit-oauth");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const axios = require("axios");

// 另外的
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const fetchAuthori = async (req, res) => {
  // console.log(req.query);
  oauthClient = new OAuthClient({
    clientId: req.query.clientId,
    clientSecret: req.query.clientSecret,
    environment: req.query.environment,
    redirectUri: req.query.redirectUri,
  });

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: "intuit-test",
  });
  res.send(authUri);
};

let oauth2_token_json = null;

const callback = async (req, res) => {
  console.log("I am callback CONTROLLER!!!!");
  try {
    const authResponse = await oauthClient.createToken(req.url);
    oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
    return res.send(`
      <script>
        window.opener.postMessage('successCallback', '*');
        window.close();
      </script>
      success callback
    `);
  } catch (e) {
    console.log("I am callback ERROR !!!!");
    console.error(e);
    return res.status(500).send("Server Error");
  }
};

const refreshAccessToken = async (req, res) => {
  console.log("I am refreshAccessToken CONTROLLER!!!!");
  try {
    const authResponse = await oauthClient.refresh();
    // console.log(`The Refresh Token is ${JSON.stringify(authResponse.getJson())}`);
    res.status(200).send(JSON.stringify(authResponse.getJson(), null, 2));
  } catch (e) {
    console.error("I am refreshAccessToken ERROR !!!!");
    console.error(e);
    res.status(500).send("Failed to refresh access token");
  }
};

const retrieveToken = async (req, res) => {
  res.send(oauth2_token_json);
  // console.log(oauth2_token_json);
};

const makeAPICall = async (req, res) => {
  try {
    console.log("I am here!!!!");
    // console.log("oauthClient", oauthClient);
    const queryDatabase = req.query.type;
    const queryString = req.query.queryString;

    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    // console.log(
    //   `${url}v3/company/${companyID}/query?query=select * from ${queryDatabase} Where ${queryString}&minorversion=70`
    // );

    oauthClient
      .makeApiCall({
        url: `${url}v3/company/${companyID}/query?query=select * from ${queryDatabase} Where ${queryString}&minorversion=70`,
      })
      .then(function (authResponse) {
        // console.log(
        //   `The returned response :${JSON.stringify(authResponse.text())}`
        // );
        res.send(JSON.parse(authResponse.text()));
        let response = JSON.stringify(authResponse.text());
        // console.log(response);
      })
      .catch(function (e) {
        console.error(e);
      });
  } catch (e) {
    console.error("Error during API call:", e.message);
    res.status(500).send("Error during API call");
  }
};

const updateData = async (req, res) => {
  try {
    console.log("I am updateData!!!!");
    const queryDatabase = req.query.type;
    const requestBody = req.body;
    // console.log(requestBody);
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const fullURL = `${url}v3/company/${companyID}/${queryDatabase}?minorversion=70`;
    console.log("Constructed URL:", fullURL);

    oauthClient
      .makeApiCall({
        method: "POST",
        url: fullURL,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
      .then(function (authResponse) {
        // console.log(`The returned response :${JSON.stringify(authResponse)}`);
        res.send(JSON.parse(authResponse.text()));
      })
      .catch(function (e) {
        console.error(e);
      });
  } catch (e) {
    console.error("Error during updateData:", e.message);
    res.status(500).send("Error during updateData");
  }
};

const disconnect = async (req, res) => {
  try {
    console.log("The disconnect called ");
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.OpenId, OAuthClient.scopes.Email],
      state: "intuit-test",
    });
    res.redirect(authUri);
  } catch (e) {
    console.error("Error during Disconnect:", e.message);
    res.status(500).send("Error during Disconnect");
  }
};

/* ************* GET ITEM_ID and CREATE ITEM(PRODUCT in ORDER TABLE) ************* */

const fetchItemId = async (ctlsku) => {
  try {
    const companyID = oauthClient.getToken().realmId;
    const url =
      oauthClient.environment === "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const query = `select * from Item Where Sku='${encodeURIComponent(
      ctlsku
    )}'`;
    const fullUrl = `${url}v3/company/${companyID}/query?query=${query}&minorversion=70`;

    const headers = {
      Authorization: `Bearer ${oauthClient.getToken().access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await axios.get(fullUrl, { headers: headers });

    if (
      response.data.QueryResponse &&
      response.data.QueryResponse.Item &&
      response.data.QueryResponse.Item.length > 0
    ) {
      let itemId = response.data.QueryResponse.Item[0].Id;
      console.log(`The Item ID is: ${itemId}`);
      return itemId;
    } else {
      console.error("No items found for:", ctlsku);
      return null;
    }
  } catch (e) {
    console.error("Error during API call:", e);
    return null;
  }
};

const createProduct = async (productData) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const fullURL = `${url}v3/company/${companyID}/item?minorversion=70`;

    const authResponse = await oauthClient.makeApiCall({
      method: "POST",
      url: fullURL,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    let jsonResponse = JSON.parse(authResponse.text());
    let itemId = jsonResponse.Item.Id;
    console.log(`The Item ID is: ${itemId}`);
    return itemId;
  } catch (e) {
    console.error("Error during updateData:", e.message);
    console.error("Failed product data:", productData);
    return null;
  }
};

const processProductsInOrderTable = async (req, res) => {
  try {
    console.log("I am processing products");

    let errorProducts = [];
    let integratedOrders = [];

    const orders = await Order.find({});

    for (const order of orders) {
      if (order.quickBooksInvID) {
        integratedOrders.push(order.invoiceNumber);
        continue;
      }

      for (const cartItem of order.cartItems) {
        if (cartItem.cartProducts[0].ctlsku) {
          if (cartItem.cartProducts[0].QuickBooksItemID) {
            console.log(
              `product: ${cartItem.cartProducts[0].ctlsku} is in QB: itemId: ${cartItem.cartProducts[0].QuickBooksItemID}`
            );
            continue;
          }

          const itemId = await fetchItemId(cartItem.cartProducts[0].ctlsku);

          if (itemId) {
            cartItem.cartProducts[0].QuickBooksItemID = itemId;
            console.log("item updated", itemId);
          } else {
            const productData = {
              Name: `${cartItem.name} (${cartItem.cartProducts[0].attrs})`.slice(
                0,
                100
              ),
              Sku: `${cartItem.cartProducts[0].ctlsku}`,
              Description: `${cartItem.name} (${cartItem.cartProducts[0].attrs})`,
              Active: true,
              Taxable: false,
              SalesTaxIncluded: false,
              UnitPrice: `${cartItem.cartProducts[0].price}`,
              Type: "NonInventory",
              IncomeAccountRef: {
                value: "4",
                name: "Sales",
              },
              PurchaseTaxIncluded: false,
              PurchaseCost: 0,
              TrackQtyOnHand: false,
              SalesTaxCodeRef: {
                value: "5",
                name: "GST",
              },
            };
            const newItemId = await createProduct(productData);

            if (newItemId === null) {
              console.warn("Error creating product. Skipping...");
              errorProducts.push(productData);
              continue;
            }

            cartItem.cartProducts[0].QuickBooksItemID = newItemId;
            console.log("New itemID created:", newItemId);
          }
        } else {
          console.warn(
            `Stock in product ${cartItem.name} does not contain ctlsku.`
          );
        }
      }

      await order.save();
    }

    if (errorProducts.length > 0) {
      console.error("Products with errors:", errorProducts);
    }

    if (integratedOrders.length > 0) {
      console.log(
        "Orders already integrated with QuickBooks:",
        integratedOrders
      );
    }

    res.json({ message: "Products have been proceessed!!!" });
  } catch (e) {
    console.error("Error during processing products:", e);
  }
};

/* ************* GET INV adn CREATE INV ************* */

const fetchInvId = async (invoiceNumber) => {
  try {
    const companyID = oauthClient.getToken().realmId;
    const url =
      oauthClient.environment === "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const query = `select * from Invoice Where DocNumber = '${invoiceNumber}'`;
    const fullUrl = `${url}v3/company/${companyID}/query?query=${query}&minorversion=70`;

    const headers = {
      Authorization: `Bearer ${oauthClient.getToken().access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    // console.log(fullUrl);

    const response = await axios.get(fullUrl, { headers: headers });
    // console.log(response.data);

    if (
      response.data.QueryResponse &&
      response.data.QueryResponse.Invoice &&
      response.data.QueryResponse.Invoice.length > 0
    ) {
      let invId = response.data.QueryResponse.Invoice[0].Id;
      let invBalance = response.data.QueryResponse.Invoice[0].Balance;
      let invAmount = response.data.QueryResponse.Invoice[0].TotalAmt;
      let taxAmt = response.data.QueryResponse.Invoice[0].TxnTaxDetail.TotalTax;
      let SyncToken = response.data.QueryResponse.Invoice[0].SyncToken;
      let netTotalAmount =
        response.data.QueryResponse.Invoice[0].TxnTaxDetail.TaxLine[0]
          .TaxLineDetail.NetAmountTaxable;

      invQbData = {
        invId: invId,
        invBalance: invBalance,
        invAmount: invAmount,
        taxAmt: taxAmt,
        SyncToken: SyncToken,
        netTotalAmount: netTotalAmount,
      };

      // console.log(`The Inv ID is: ${invId}, with balance: ${invBalance}`);
      return invQbData;
    } else {
      console.error("No Inv found for:", invoiceNumber);
      return null;
    }
  } catch (e) {
    console.error("Error during API call:", e);
    return null;
  }
};

const fixTnxDate = async (modifiedTaxData) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const fullURL = `${url}v3/company/${companyID}/invoice?minorversion=70`;

    const authResponse = await oauthClient.makeApiCall({
      method: "POST",
      url: fullURL,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedTaxData),
    });

    let jsonResponse = JSON.parse(authResponse.text());
    let invNo = jsonResponse.Invoice.DocNumber;

    return invNo;
  } catch (e) {
    console.error("Error during API call:", e);
    return null;
  }
};

const createInv = async (invData) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const fullURL = `${url}v3/company/${companyID}/invoice?minorversion=70`;

    const authResponse = await oauthClient.makeApiCall({
      method: "POST",
      url: fullURL,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invData),
    });

    let jsonResponse = JSON.parse(authResponse.text());
    let invId = jsonResponse.Invoice.Id;
    let TotalAmt = jsonResponse.Invoice.TotalAmt;
    let taxAmt = jsonResponse.Invoice.TxnTaxDetail.TotalTax;
    let netTotalAmount =
      jsonResponse.Invoice.TxnTaxDetail.TaxLine[0].TaxLineDetail
        .NetAmountTaxable;
    let SyncToken = jsonResponse.Invoice.SyncToken;
    console.log(`The Inv ID is: ${invId}`);
    console.log(`The TotalAmt is: ${TotalAmt}`);
    return { invId, TotalAmt, taxAmt, SyncToken, netTotalAmount };
  } catch (e) {
    console.error("Error during create Invoice:", e.message);
    console.error("Failed Inv data:", JSON.stringify(invData, null, 2));
    return null;
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const processInovices = async (req, res) => {
  try {
    console.log("I am processing Invoices!");

    let errorInvs = [];

    let createdInvs = [];

    let unDispatchedOrders = [];

    let waitingIntegrated = [];

    const orders = await Order.find({});

    for (const order of orders) {
      if (!order.deliveredAt) {
        unDispatchedOrders.push(order.invoiceNumber);
        continue;
      }

      if (order.invoiceNumber) {
        if (order.quickBooksInvID) {
          // console.log(
          //   `Inv: ${order.invoiceNumber} is in QB with Id: ${order.quickBooksInvID}`
          // );
          continue;
        }

        const invQbData = await fetchInvId(order.invoiceNumber);
        // console.log("invQbData", invQbData);
        if (invQbData) {
          order.quickBooksInvID = invQbData.invId;
          // order.balance = invQbData.invBalance;
          /*           if (invQbData.invBalance === 0) {
                      order.isPaid = true;
                    console.log(order.invoiceNumber, "is marked as PAID");
                    } */
          // console.log(order.invoiceNumber, "QB Id updated to:", invQbData.invId);
        } else {
          /*           console.log(order.invoiceNumber, "is waiting to be integrated!!");
                    waitingIntegrated.push(order.invoiceNumber) */
          const invData = {
            Line: order.cartItems.map((cartItem) => ({
              Amount:
                cartItem.cartProducts[0].price *
                cartItem.cartProducts[0].suppliedQty,
              DetailType: "SalesItemLineDetail",
              SalesItemLineDetail: {
                ItemRef: {
                  name: `${cartItem.name} (${cartItem.cartProducts[0].attrs})`.slice(
                    0,
                    100
                  ),
                  value: cartItem.cartProducts[0].QuickBooksItemID,
                },
                TaxInclusiveAmt: Number(
                  (
                    cartItem.cartProducts[0].price +
                    cartItem.cartProducts[0].price * 0.1
                  ).toFixed(2)
                ),
                UnitPrice: cartItem.cartProducts[0].price,
                Qty: cartItem.cartProducts[0].suppliedQty,
                ItemAccountRef: {
                  value: "4",
                  name: "0560 Sales",
                },
                TaxCodeRef: {
                  value: "5", // 5 or NON
                },
              },
            })),
            DocNumber: order.invoiceNumber,
            TxnDate: formatDate(order.deliveredAt),
            DueDate: formatDate(
              new Date(
                order.deliveredAt.getTime() +
                order.dueDays * 24 * 60 * 60 * 1000
              )
            ),
            CustomerRef: {
              value: order.quickBooksCustomerId,
            },
          };

          const invResponse = await createInv(invData);
          const newInvId = invResponse.invId;
          const newTotalAmt = invResponse.TotalAmt;
          const newTaxAmt = invResponse.taxAmt;
          const SyncToken = invResponse.SyncToken;
          const netTotalAmount = invResponse.netTotalAmount;

          createdInvs.push(invData.DocNumber);

          if (newInvId === null) {
            console.warn("Error creating Invoice Skipping...");
            errorInvs.push(invData.DocNumber);
            continue;
          }

          if (newTotalAmt !== order.orderTotal.cartSubtotal) {
            const modifiedTax = {
              SyncToken: SyncToken,
              Id: newInvId,
              sparse: true,
              TxnTaxDetail: {
                TotalTax: order.orderTotal.taxAmount,
                TaxLine: [
                  {
                    Amount: order.orderTotal.taxAmount,
                    DetailType: "TaxLineDetail",
                    TaxLineDetail: {
                      TaxRateRef: {
                        value: "3",
                      },
                      PercentBased: true,
                      TaxPercent: 10,
                      NetAmountTaxable: netTotalAmount,
                    },
                  },
                ],
              },
              TotalAmt: order.orderTotal.cartSubtotal,
              Balance: order.orderTotal.cartSubtotal,
            };
            const taxResponse = await fixTnxDate(modifiedTax);
            console.log(
              `The Inv ${taxResponse} has been updated with new tax amount`
            );
          }
          order.quickBooksInvID = newInvId;
        }
      } else {
        console.warn(
          `Inv in order table ${order.invoiceNumber} does not contain invoice number.`
        );
      }

      await order.save();
    }

    if (errorInvs.length > 0) {
      console.error("Invoices with errors:", errorInvs);
    }

    if (createdInvs.length > 0) {
      console.error("Invoices has Integrated:", createdInvs);
    }

    if (unDispatchedOrders.length > 0) {
      console.log(
        "The Following Orders are NOT dispatched:",
        unDispatchedOrders
      );
    }

    if (waitingIntegrated.length > 0) {
      console.log(
        "The Following Invoices are waiting to be integrated:",
        unDispatchedOrders
      );
    }

    res.json({ message: "Invoices have been proceessed!!!" });
  } catch (e) {
    console.error("Error during processing Invoices:", e);
  }
};

/* ************* CHECK INV BALANCE ************* */

const processTnxDate = async (req, res) => {
  try {
    console.log("I am processing TnxDate!");
    const orders = await Order.find({});

    for (const order of orders) {
      if (order.quickBooksPaymentId) {
        const TxnDate = await fetchTnxDate(order.quickBooksPaymentId);
        if (TxnDate) {
          order.paidAt = TxnDate;
          console.log(
            "Invoice:",
            order.invoiceNumber,
            "has paid on and updated to:",
            TxnDate
          );
        }
      }
      await order.save();
    }
  } catch (e) {
    console.error("Error during processing TnxDate:", e);
  }
};

const checkInvTax = async (req, res) => {
  try {
    console.log("I am processing tax checking!");

    let unDispatchedOrders = [];
    let noInv = [];

    const orders = await Order.find({});

    for (const order of orders) {
      if (!order.deliveredAt) {
        unDispatchedOrders.push(order.invoiceNumber);
        continue;
      }

      if (order.balance > 0) {
        const invQbData = await fetchInvId(order.invoiceNumber);
        if (
          invQbData &&
          order.orderTotal.cartSubtotal !== invQbData.invAmount
        ) {
          console.log(`Inv ${order.invoiceNumber} is updating tax amount!`);
          const modifiedTax = {
            SyncToken: invQbData.SyncToken,
            Id: invQbData.invId,
            sparse: true,
            TxnTaxDetail: {
              TotalTax: order.orderTotal.taxAmount,
              TaxLine: [
                {
                  Amount: order.orderTotal.taxAmount,
                  DetailType: "TaxLineDetail",
                  TaxLineDetail: {
                    TaxRateRef: {
                      value: "3",
                    },
                    PercentBased: true,
                    TaxPercent: 10,
                    NetAmountTaxable: invQbData.netTotalAmount,
                  },
                },
              ],
            },
            TotalAmt: order.orderTotal.cartSubtotal,
            Balance: order.orderTotal.cartSubtotal,
          };

          const taxResponse = await fixTnxDate(modifiedTax);

          console.log(
            `The Inv ${taxResponse} has been updated with new tax amount`
          );
        } else if (invQbData === null) {
          noInv.push(order.invoiceNumber);
        }
      }
    }

    res.json({ message: "Balance check have been proceessed!!!" });
  } catch (e) {
    console.error("Error during processing Invoices:", e);
  }
};

/* ************* Payment ************* */
const createPayment = async (paymentData) => {
  try {
    const companyID = oauthClient.getToken().realmId;
    const environmentUrl =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;
    const fullURL = `${environmentUrl}v3/company/${companyID}/payment?minorversion=70`;

    const authResponse = await oauthClient.makeApiCall({
      method: "POST",
      url: fullURL,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const jsonResponse = JSON.parse(authResponse.text());

    if (jsonResponse.Payment && jsonResponse.Payment.Id) {
      const paymentId = jsonResponse.Payment.Id;
      // console.log(jsonResponse.Payment);
      console.log(`Payment created successfully with ID: ${paymentId}`);
      return paymentId;
    } else {
      console.error("Payment creation unsuccessful. No ID found in response.");
      return null;
    }
  } catch (e) {
    console.error("Error during create payment:", e);
    console.error("Failed payment data:", JSON.stringify(paymentData, null, 2));
    return null;
  }
};

const processPayment = async (req, res) => {
  try {
    console.log("I am processing payment");
    const pmData = req.body;

    const paymentData = {
      Line: pmData.invoices.map((invoice) => ({
        Amount: invoice.amount.toFixed(2),
        LinkedTxn: [
          {
            TxnId: invoice.quickBooksInvID,
            TxnType: "Invoice",
          },
        ],
      })),
      TxnDate: pmData.date,
      CustomerRef: {
        value: pmData.quickBooksCustomerId,
      },
      DepositToAccountRef: {
        value: "56",
      },
      CurrencyRef: {
        value: "AUD",
        name: "Australian Dollar",
      },
      TotalAmt: pmData.totalAmount.toFixed(2),
    };

    const paymentId = await createPayment(paymentData);
    if (paymentId === null) {
      console.warn("Error!!! creating Payment. Skipping...");
      res.status(500).send("Failed to create payment");
      return;
    }

    for (const invoice of pmData.invoices) {
      const orderId = invoice.invoiceID;
      const order = await Order.findById(orderId);

      if (!order) {
        console.error(`Order with ID ${orderId} not found.`);
        continue;
      }

      order.balance -= invoice.amount;
      order.quickBooksPaymentId = paymentId;
      order.paidAt = pmData.date;
      console.log(
        "Invoice:",
        order.invoiceNumber,
        "is updated with payment ID:",
        paymentId
      );

      await order.save();
    }

    res.status(200).send("Payment processed successfully.");
  } catch (e) {
    console.error("Error during processing payment:", e);
    res.status(500).send("Error processing payment");
  }
};

module.exports = {
  fetchAuthori,
  callback,
  retrieveToken,
  refreshAccessToken,
  makeAPICall,
  disconnect,
  updateData,
  processProductsInOrderTable,
  processInovices,
  processPayment,
  checkInvTax,
  processTnxDate,
};

/* let oauth2_token_json = null;
// 这个是老的code，因为从server那边改写过来的，用的异步 async，所以要用await去等待返回数据。
const callback = async (req, res) => {
  console.log("I am callback CONTROLLER!!!!");
  // console.log(req.url);
  oauthClient
    .createToken(req.url)
    .then(function (authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
    })
    .catch(function (e) {
      console.log("I am callback ERROR !!!!");
      console.error(e);
    });
  console.log("====================================");
  console.log("oauthClient", oauth2_token_json);
  console.log("====================================");

  res.send("");
}; */

/* const OAuthClient = require("intuit-oauth");

// Instance of client
const oauthClient = new OAuthClient({
  clientId: "<ABT4HYgUBgv1buWIgvXp7oXt14D1a79LhwmatQAVh0I795Z3kH>",
  clientSecret: "<D13kWfnNg4L10XtL9UTz38Dv0gq6r4nQakL4NMPG>",
  environment: "sandbox",
  redirectUri: "https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl",
});

// AuthorizationUri
const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
  state: "testState",
}); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

// Redirect the authUri
res.redirect(authUri);

// Parse the redirect URL for authCode and exchange them for tokens
const parseRedirect = req.url;

// Exchange the auth code retrieved from the **req.url** on the redirectUri
oauthClient
  .createToken(parseRedirect)
  .then(function (authResponse) {
    console.log("The Token is  " + JSON.stringify(authResponse.getJson()));
  })
  .catch(function (e) {
    console.error("The error message is :" + e.originalMessage);
    console.error(e.intuit_tid);
  });

if (oauthClient.isAccessTokenValid()) {
  console.log("The access_token is valid");
}

if (!oauthClient.isAccessTokenValid()) {
  oauthClient
    .refresh()
    .then(function (authResponse) {
      console.log("Tokens refreshed : " + JSON.stringify(authResponse.json()));
    })
    .catch(function (e) {
      console.error("The error message is :" + e.originalMessage);
      console.error(e.intuit_tid);
    });
}

// Body sample from API explorer examples

oauthClient
  .makeApiCall({
    url: "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365273108130/invoice/12?minorversion=65",
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(function (response) {
    console.log("The API response is  : " + response);
  })
  .catch(function (e) {
    console.log("The error is " + JSON.stringify(e));
  });


  
function fetchInvoice(companyId, invoiceId) {
  return oauthClient
    .makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyId}/invoice/${invoiceId}?minorversion=65`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("The API response is:", response);
      return response;
    })
    .catch((e) => {
      console.error("Error fetching the invoice:", JSON.stringify(e));
      throw e;
    });
}

// Example usage:
// fetchInvoice('4620816365273108130', '12');

module.exports = {
  fetchInvoice, // Export the function to be used elsewhere
};
 */

/* 
const oauthClient = new OAuthClient({
  clientId: "ABT4HYgUBgv1buWIgvXp7oXt14D1a79LhwmatQAVh0I795Z3kH",
  clientSecret: "D13kWfnNg4L10XtL9UTz38Dv0gq6r4nQakL4NMPG",
  environment: "sandbox",
  redirectUri: "https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl",
});

const getAuthorizationUri = () => {
  return oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: "testState",
  });
};

const redirectToAuthUri = (res) => {
  const authUri = getAuthorizationUri();
  res.redirect(authUri);
};

const exchangeToken = async (redirectUrl) => {
  try {
    const authResponse = await oauthClient.createToken(redirectUrl);
    console.log("The Token is", JSON.stringify(authResponse.getJson()));
    return authResponse.getJson();
  } catch (e) {
    console.error("The error message is:", e.originalMessage);
    console.error(e.intuit_tid);
    throw e;
  }
};

const isAccessTokenValid = () => {
  return oauthClient.isAccessTokenValid();
};

const refreshAccessToken = async () => {
  if (!isAccessTokenValid()) {
    try {
      const authResponse = await oauthClient.refresh();
      console.log("Tokens refreshed:", JSON.stringify(authResponse.json()));
      return authResponse.json();
    } catch (e) {
      console.error("The error message is:", e.originalMessage);
      console.error(e.intuit_tid);
      throw e;
    }
  }
};

const fetchInvoice = async (companyId, invoiceId) => {
  try {
    console.log("I am here!!!!");
    const response = await oauthClient.makeApiCall({
      url: "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365273108130/invoice/12?minorversion=65",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("The API response is:", response);
    return response;
  } catch (e) {
    console.error("Error fetching the invoice:", JSON.stringify(e));
    throw e;
  }
};
*/

/* const processProducts = async (req, res) => {
  console.log("I am process products");
  try {
    const products = await Product.find({}); 
    for (let product of products) {
      await syncWithQuickBooks(product);
    }

    res.status(200).send("Products synced with QuickBooks successfully.");
  } catch (error) {
    console.error("Error processing products: ", error);
    res.status(500).send("Error during product processing");
  }
}; */

/* const checkAndUploadItems = async (order) => {
  try {
    for (let item of order.cartItems) {
      for (let product of item.cartProducts) {
        const { ctlsku } = product;
        const companyID = oauthClient.getToken().realmId;

        const url =
          oauthClient.environment == "sandbox"
            ? OAuthClient.environment.sandbox
            : OAuthClient.environment.production;

        const response = await oauthClient.makeApiCall({
          url: `${url}v3/company/${companyID}/query?query=select * from Item Where sku='${ctlsku}'&minorversion=70`,
        });

        // Check if product exists
        const responseData = JSON.parse(response.text());

        // If the product does not exist, we create it in QuickBooks
        if (
          !responseData.QueryResponse.Item ||
          responseData.QueryResponse.Item.length === 0
        ) {
          const productData = {
            Name: item.name,
            Sku: product.ctlsku,
            Description: item.name,
            Active: true,
            Taxable: false,
            SalesTaxIncluded: false,
            UnitPrice: product.price,
            Type: "NonInventory",
            IncomeAccountRef: {
              value: "4",
              name: "Sales",
            },
            PurchaseTaxIncluded: false,
            PurchaseCost: 0,
            TrackQtyOnHand: false,
            SalesTaxCodeRef: {
              value: "5",
              name: "GST",
            },
          };

          // Update in QuickBooks
          await updateData({ body: productData, query: { type: "item" } }, {});
        }
      }
    }
  } catch (error) {
    console.error("Error while checking and uploading items:", error.message);
  }
}; */

/* const fetchItemId = async (ctlsku) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const environmentUrl = oauthClient.environment === "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

    const query = `select * from item Where Sku='${ctlsku}'`; 

    const url = `${environmentUrl}v3/company/${companyID}/query?query=${encodeURIComponent(query)}&minorversion=70`;

    const authResponse = await oauthClient.makeApiCall({ url });

    console.log(`The returned response: ${JSON.stringify(authResponse.json())}`);
    
    let jsonResponse = authResponse.json();

    if (
      jsonResponse.QueryResponse &&
      jsonResponse.QueryResponse.Item &&
      jsonResponse.QueryResponse.Item.length > 0
    ) {
      let itemId = jsonResponse.QueryResponse.Item[0].Id;
      console.log(`The Item ID is: ${itemId}`);
      return itemId;
    } else {
      console.error("No items found in response");

      return null;
    }
  } catch (e) {
    console.error("Error during API call:", e);
    throw e; 
  }
}; */

/* const fetchItemIdOriginal = async (req, res ctlsku) => {
  try {
    console.log("I am here!!!!");
    console.log("oauthClient", oauthClient);
    const queryDatabase = req.query.type;
    const queryString = req.query.queryString;

    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    console.log(
      `${url}v3/company/${companyID}/query?query=select * from ${queryDatabase} Where sku='${ctlsku}'&minorversion=70`
    );

    oauthClient
      .makeApiCall({
        url: `${url}v3/company/${companyID}/query?query=select * from ${queryDatabase} Where sku='${ctlsku}'&minorversion=70`,
      })
      .then(function (authResponse) {
        console.log(
          `The returned response :${JSON.stringify(authResponse.text())}`
        );
        res.send(JSON.parse(authResponse.text()));
        let jsonResponse = JSON.parse(authResponse.text());

        if (
          jsonResponse.QueryResponse &&
          jsonResponse.QueryResponse.Item &&
          jsonResponse.QueryResponse.Item.length > 0
        ) {
          let itemId = jsonResponse.QueryResponse.Item[0].Id;

          console.log(`The Item ID is: ${itemId}`);

          let response = JSON.stringify(authResponse.text());
          console.log(`The complete response: ${response}`);
        } else {
          console.error("No items found in response");
          res.status(404).send("No items found");
        }
      })
      .catch(function (e) {
        console.error(e);
        res.status(500).send("Error during API call");
      });
  } catch (e) {
    console.error("Error during API call:", e.message);
    res.status(500).send("Error during API call");
  }
};

const fetchItemId3 = async (ctlsku) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    console.log(
      `${url}v3/company/${companyID}/query?query=select * from item Where sku='${ctlsku}'&minorversion=70`
    );

    oauthClient
      .makeApiCall({
        url: `${url}v3/company/${companyID}/query?query=select * from item Where sku='${ctlsku}'&minorversion=70`,
      })
      .then(function (authResponse) {
        console.log(
          `The returned response :${JSON.stringify(authResponse.text())}`
        );
        // res.send(JSON.parse(authResponse.text()));
        let jsonResponse = JSON.parse(authResponse.text());

        if (
          jsonResponse.QueryResponse &&
          jsonResponse.QueryResponse.Item &&
          jsonResponse.QueryResponse.Item.length > 0
        ) {
          let itemId = jsonResponse.QueryResponse.Item[0].Id;

          console.log(`The Item ID is: ${itemId}`);

          let response = JSON.stringify(authResponse.text());
          console.log(`The complete response: ${response}`);
        } else {
          console.error("No items found in response");
          // res.status(404).send('No items found');
        }
      })
      .catch(function (e) {
        console.error(e);
        // res.status(500).send('Error during API call');
      });

    return;
    if (
      response.data.QueryResponse &&
      response.data.QueryResponse.Item &&
      response.data.QueryResponse.Item.length > 0
    ) {
      let itemId = response.data.QueryResponse.Item[0].Id;
      console.log(`The Item ID is: ${itemId}`);
      return itemId;
    } else {
      console.error("No items found for:", ctlsku);
      return null;
    }
  } catch (e) {
    console.error("Error during API call:", e);
    return null;
  }
};

const processProducts3 = async () => {
  try {
    console.log("I am processing products");

    const products = await Product.find({});

    for (const product of products) {
      for (const stock of product.stock) {
        if (stock.ctlsku) {
          const itemId = await fetchItemId(stock.ctlsku);

          if (itemId) {
            stock.QuickBooksItemID = itemId;
            console.log("item updated", itemId);
          } else {
            // Here, handle the case when the item is not found in QuickBooks
            // Possibly you want to create a new item in QuickBooks?
          }
        } else {
          console.warn(
            `Stock in product ${product.name} does not contain ctlsku.`
          );
        }
      }

      await product.save();
    }
  } catch (e) {
    console.error("Error during processing products:", e);
  }
}; */

/* const createProduct = async (productData, res) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const fullURL = `${url}v3/company/${companyID}/item?minorversion=70`;
    console.log("Constructed URL:", fullURL);

    oauthClient
      .makeApiCall({
        method: "POST",
        url: fullURL,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
      .then(function (authResponse) {
        console.log(`The returned response :${JSON.stringify(authResponse)}`);
        res.send(JSON.parse(authResponse.text()));

        let jsonResponse = JSON.parse(authResponse.text());
        console.log("jsonResponse", jsonResponse);

        let itemId = jsonResponse.Item.Id;

        console.log(`The Item ID is: ${itemId}`);

      })
      .catch(function (e) {
        console.error(e);
      });
  } catch (e) {
    console.error("Error during updateData:", e.message);
    res.status(500).send("Error during updateData");
  }
}; */

/* 
const createProduct1 = async (productData) => {
  try {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    const fullURL = `${url}v3/company/${companyID}/item?minorversion=70`;
    // console.log("Constructed URL:", fullURL);

    const authResponse = await oauthClient.makeApiCall({
      method: "POST",
      url: fullURL,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    // console.log(`The returned response :${JSON.stringify(authResponse)}`);

    let jsonResponse = JSON.parse(authResponse.text());
    // console.log("jsonResponse", jsonResponse);

    let itemId = jsonResponse.Item.Id;
    console.log(`The Item ID is: ${itemId}`);

    return itemId;

  } catch (e) {
    console.error("Error during updateData:", e.message);
    throw new Error("Error during updateData");
  }
}; */

/* const processProducts1 = async () => {
  try {
    console.log("I am processing products");

    const products = await Product.find({});

    for (const product of products) {
      for (const stock of product.stock) {
        if (stock.ctlsku) {
          const itemId = await fetchItemId(stock.ctlsku);

          if (itemId) {
            stock.QuickBooksItemID = itemId;
            console.log("item updated", itemId);
          } else {
            const productData = {
              "Name": `${product.name} (${stock.attrs})`,
              "Sku": `${stock.ctlsku}`,
              "Description": `${product.name} (${stock.attrs})`,
              "Active": true,
              "Taxable": false,
              "SalesTaxIncluded": false,
              "UnitPrice": `${stock.price}`,
              "Type": "NonInventory",
              "IncomeAccountRef": {
                "value": "4",
                "name": "Sales",
              },
              "PurchaseTaxIncluded": false,
              "PurchaseCost": 0,
              "TrackQtyOnHand": false,
              "SalesTaxCodeRef": {
                "value": "5",
                "name": "GST",
              },
            };
            const newItemId = await createProduct(productData);
            stock.QuickBooksItemID = newItemId;
            console.log("New itemID created:", newItemId);
          }
        } else {
          console.warn(
            `Stock in product ${product.name} does not contain ctlsku.`
          );
        }
      }

      await product.save();
    }
  } catch (e) {
    console.error("Error during processing products:", e);
  }
};
 */
/* const processProductsInProductTable = async () => {
  try {
    console.log("I am processing products");

    let errorProducts = [];

    const products = await Product.find({});

    for (const product of products) {
      for (const stock of product.stock) {
        if (stock.ctlsku) {
          if (stock.QuickBooksItemID) {
            console.log(`product: ${stock.ctlsku} is in QB: itemId: ${QuickBooksItemID}`);
            continue;
          }

          const itemId = await fetchItemId(stock.ctlsku);

          if (itemId) {
            stock.QuickBooksItemID = itemId;
            console.log("item updated", itemId);
          } else {
            const productData = {
              "Name": `${product.name} (${stock.attrs})`,
              "Sku": `${stock.ctlsku}`,
              "Description": `${product.name} (${stock.attrs})`,
              "Active": true,
              "Taxable": false,
              "SalesTaxIncluded": false,
              "UnitPrice": `${stock.price}`,
              "Type": "NonInventory",
              "IncomeAccountRef": {
                "value": "4",
                "name": "Sales",
              },
              "PurchaseTaxIncluded": false,
              "PurchaseCost": 0,
              "TrackQtyOnHand": false,
              "SalesTaxCodeRef": {
                "value": "5",
                "name": "GST",
              },
            };
            const newItemId = await createProduct(productData);

            if (newItemId === null) {
              console.warn("Error creating product. Skipping...");
              errorProducts.push(productData);
              continue;
            }

            stock.QuickBooksItemID = newItemId;
            console.log("New itemID created:", newItemId);
          }
        } else {
          console.warn(
            `Stock in product ${product.name} does not contain ctlsku.`
          );
        }
      }

      await product.save();
    }

    if (errorProducts.length > 0) {
      console.error("Products with errors:", errorProducts);
    }
  } catch (e) {
    console.error("Error during processing products:", e);
  }
}; */

/* const processProductsInOrderTable = async () => {
  try {
    console.log("I am processing products");

    let errorProducts = [];
    let integratedOrders = [];

    const orders = await Order.find({});


    for (const order of orders) {
      for (const cartItem of order.cartItems) {
        if (cartItem.cartProducts[0].ctlsku) {
          if (cartItem.cartProducts[0].QuickBooksItemID) {
            console.log(`product: ${cartItem.cartProducts[0].ctlsku} is in QB: itemId: ${cartItem.cartProducts[0].QuickBooksItemID}`);
            continue;
          }

          const itemId = await fetchItemId(cartItem.cartProducts[0].ctlsku);

          if (itemId) {
            cartItem.cartProducts[0].QuickBooksItemID = itemId;
            console.log("item updated", itemId);
          } else {
            const productData = {
              "Name": `${cartItem.name} (${cartItem.cartProducts[0].attrs})`.slice(0, 100),
              "Sku": `${cartItem.cartProducts[0].ctlsku}`,
              "Description": `${cartItem.name} (${cartItem.cartProducts[0].attrs})`,
              "Active": true,
              "Taxable": false,
              "SalesTaxIncluded": false,
              "UnitPrice": `${cartItem.cartProducts[0].price}`,
              "Type": "NonInventory",
              "IncomeAccountRef": {
                "value": "4",
                "name": "Sales",
              },
              "PurchaseTaxIncluded": false,
              "PurchaseCost": 0,
              "TrackQtyOnHand": false,
              "SalesTaxCodeRef": {
                "value": "5",
                "name": "GST",
              },
            };
            const newItemId = await createProduct(productData);

            if (newItemId === null) {
              console.warn("Error creating product. Skipping...");
              errorProducts.push(productData);
              continue;
            }

            cartItem.cartProducts[0].QuickBooksItemID = newItemId;
            console.log("New itemID created:", newItemId);
          }
        } else {
          console.warn(
            `Stock in product ${cartItem.name} does not contain ctlsku.`
          );
        }
      }

      await order.save();
    }

    if (errorProducts.length > 0) {
      console.error("Products with errors:", errorProducts);
    }
  } catch (e) {
    console.error("Error during processing products:", e);
  }
}; */

/* const makeAPICall = async (req, res) => {
  try {
    console.log("I am here!!!!");
    console.log("oauthClient", oauthClient);
    const queryDatabase = req.query.type;
    const queryString = req.query.queryString;

    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    // console.log(
    //   `${url}v3/company/${companyID}/query?query=select * from ${queryDatabase} Where ${queryString}&minorversion=70`
    // );
    
    const query = `select * from ${queryDatabase} Where ${queryString}`;
    const fullUrl = `${url}v3/company/${companyID}/query?query=${query}&minorversion=70`;

    const headers = {
      Authorization: `Bearer ${oauthClient.getToken().access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    console.log(fullUrl);

    const response = await axios.get(fullUrl, { headers: headers });
    console.log(response.data);

    if (
      response.data.QueryResponse &&
      response.data.QueryResponse.Invoice &&
      response.data.QueryResponse.Invoice.length > 0
    ) {
      let invId = response.data.QueryResponse.Invoice[0].Id;
      let invBalance = response.data.QueryResponse.Invoice[0].Balance;
      console.log(`The Inv ID is: ${invId},with balance:${invBalance}`);
    } else {
      console.error("No Inv found for:", invoiceNumber);
    }

  } catch (e) {
    console.error("Error during API call:", e.message);
    res.status(500).send("Error during API call");
  }
}; */

/* const processInovices = async () => {
  try {
    console.log("I am processing Invoices!");

    let errorInvs = [];

    let createdInvs = [];

    let unDispatchedOrders = [];

    const orders = await Order.find({});

    for (const order of orders) {

      if (!order.deliveredAt) {
        console.warn(`Order ${order.invoiceNumber} does not have a delivery date. Skipping...`);
        unDispatchedOrders.push(order.invoiceNumber)
        continue;
      }

      if (order.invoiceNumber) {
        if (order.quickBooksInvID) {
          console.log(`Inv: ${order.invoiceNumber} is in QB with Id: ${order.quickBooksInvID}`);
          continue;
        }

        const invId = await fetchInvId(order.invoiceNumber);

        if (invId) {
          order.quickBooksInvID = invId;
          console.log(order.invoiceNumber, "QB Id updated to:", invId);
        } else {
          console.log(order.invoiceNumber, "is waiting to be integrated!!");
          const invData = {
            "Line": order.cartItems.map(cartItem => ({
              "Amount": cartItem.cartProducts[0].price * cartItem.cartProducts[0].suppliedQty,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ItemRef": {
                  "name": `${cartItem.name} (${cartItem.cartProducts[0].attrs})`.slice(0, 100),
                  "value": cartItem.cartProducts[0].QuickBooksItemID
                },
                "TaxInclusiveAmt": Number((cartItem.cartProducts[0].price + cartItem.cartProducts[0].price*0.1).toFixed(2)),
                "UnitPrice": cartItem.cartProducts[0].price,
                "Qty": cartItem.cartProducts[0].suppliedQty,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5" // 5 or NON
                }
              }
            })),
            "DocNumber": order.invoiceNumber,
            "TxnDate": formatDate(order.deliveredAt),
            "DueDate": formatDate(new Date(order.deliveredAt.getTime() + order.dueDays * 24 * 60 * 60 * 1000)),
            "CustomerRef": {
              "value": order.quickBooksCustomerId
            }
          };

          const newInvId = await createInv(invData);
          createdInvs.push(invData.DocNumber)

          if (newInvId === null) {
            console.warn("Error creating Invoice Skipping...");
            errorInvs.push(invData.DocNumber);
            continue;
          }

          order.quickBooksInvID = newInvId;
          console.log("New Inv ID created:", newInvId);
        }
      } else {
        console.warn(
          `Inv in order table ${order.invoiceNumber} does not contain invoice number.`
        );
      }


      await order.save();
    }

    if (errorInvs.length > 0) {
      console.error("Invoices with errors:", errorInvs);
    }
    
    if (createdInvs.length > 0) {
      console.error("Invoices has Integrated:", createdInvs);
    }

    if (unDispatchedOrders.length > 0) {
      console.log("The Following Orders are NOT dispatched:", unDispatchedOrders);
    }

  } catch (e) {
    console.error("Error during processing Invoices:", e);
  }
};
 */

/* const refreshAccessToken = async (req, res) => {
  console.log("I am refreshAccessToken CONTROLLER!!!!");
  try {
    oauthClient
      .refresh()
      .then(function (authResponse) {
        console.log(
          `The Refresh Token is  ${JSON.stringify(authResponse.getJson())}`
        );
        oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
        res.send(oauth2_token_json);
      })
      .catch(function (e) {
        console.error(e);
      });
  } catch (e) {
    console.log("I am refreshAccessToken ERROR !!!!");
    console.error(e);
  }

  res.send("");
}; */
