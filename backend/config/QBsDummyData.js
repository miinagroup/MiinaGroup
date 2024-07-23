const createPayment = [
  {
    "TotalAmt": 账单总价格,
    "CustomerRef": {
      "value": 客户的ID
    },
    "DepositToAccountRef": {
      "value": "56"
    },
    "CurrencyRef": {
      "value": "AUD",
      "name": "Australian Dollar"
    },
    "TxnDate": payment日期,
    "Line": [
      {
        "Amount": 第一笔invoice的金额,
        "LinkedTxn": [
          {
            "TxnId": 第一笔invoice的ID, 
            "TxnType": "Invoice"
          }
        ]
      },
      {
        "Amount": 第二笔invoice的金额,
        "LinkedTxn": [
          {
            "TxnId": 第二笔invoice的ID,
            "TxnType": "Invoice"
          }
        ]
      }
    ]
  }
]

const createItem = [
  {
    "Name": "300MM WRENCH",
    "Sku": "CTL174108",
    "Description": "300MM WRENCH",
    "Active": true,
    "FullyQualifiedName": "300MM WRENCH",
    "Taxable": false,
    "SalesTaxIncluded": false,
    "UnitPrice": 62.82,
    "Type": "NonInventory",
    "IncomeAccountRef": {
      "value": "4",
      "name": "Sales"
    },
    "PurchaseTaxIncluded": false,
    "PurchaseCost": 0,
    "TrackQtyOnHand": false,
    "SalesTaxCodeRef": {
      "value": "5",
      "name": "GST"
    }
  }
]

const createInv = [
  {
    "Line": [
      {
        "Description": "32 AMP 10M 'CONSTRUCTION' EXTENSION LEAD: 3 PHASE,4 PIN,415V",
        "Amount": 325.46,
        "DetailType": "SalesItemLineDetail",
        "SalesItemLineDetail": {
          "ServiceDate": "2023-08-28",
          "TaxInclusiveAmt": 358.01,
          "ItemRef": {
            "name": "POWERSAFE:32 AMP 10M 'CONSTRUCTION' EXTENSION LEAD"
          },
          "UnitPrice": 325.46,
          "Qty": 1
        }
      },
      {
        "Description": "ARC AIR GOUGING TORCH 1000 AMP HEAVY DUTY - 2M GOUGING CARBON COMPLETE ASSEMBLY",
        "Amount": 373.75,
        "DetailType": "SalesItemLineDetail",
        "SalesItemLineDetail": {
          "ServiceDate": "2023-08-28",
          "TaxInclusiveAmt": 411.13,
          "ItemRef": {
            "name": "HAMPDON:ARC AIR GOUGING TORCH"
          },
          "UnitPrice": 373.75,
          "Qty": 1
        }
      },
      {
        "Description": "400A EARTH CLAMP AND LEAD - 5 METER - 35-50 LARGE PLUG",
        "Amount": 238.67,
        "DetailType": "SalesItemLineDetail",
        "SalesItemLineDetail": {
          "ServiceDate": "2023-08-28",
          "TaxInclusiveAmt": 262.54,
          "ItemRef": {
            "name": "HAMPDON:400A EARTH CLAMP AND LEAD - 5 METER"
          },
          "UnitPrice": 238.67,
          "Qty": 1
        }
      }
    ],
    "CustomerRef": {
      "value": "7"
    }
  }

]


const createInv_two = [
  {
    "Line": [
      {
        "DetailType": "SalesItemLineDetail",
        "Amount": 325.46,
        "SalesItemLineDetail": {
          "ItemRef": {
            "name": "POWERSAFE:32 AMP 10M 'CONSTRUCTION' EXTENSION LEAD"
          },
          "UnitPrice": 325.46,
          "Qty": 1
        }
      },
      {
        "DetailType": "SalesItemLineDetail",
        "Amount": 373.75,
        "SalesItemLineDetail": {
          "ItemRef": {
            "name": "HAMPDON:ARC AIR GOUGING TORCH"
          },
          "UnitPrice": 373.75,
          "Qty": 1
        }
      },
      {
        "DetailType": "SalesItemLineDetail",
        "Amount": 238.67,
        "SalesItemLineDetail": {
          "ItemRef": {
            "name": "HAMPDON:400A EARTH CLAMP AND LEAD - 5 METER"
          },
          "UnitPrice": 238.67,
          "Qty": 1
        }
      }
    ],
    "CustomerRef": {
      "value": "7"
    }
  }

]

const realInvData = [
  {
    "Line": [
      {
        "Id": "1", // line 1 
        "LineNum": 1, // line 1
        "Description": "WIRE - GASLESS PROMAX E-21 0.9MM WELDCLASS 4.5KG WC-00260", // description
        "Amount": 62.73, // unit price
        "DetailType": "SalesItemLineDetail", // ???
        "SalesItemLineDetail": {
          "ServiceDate": "2023-08-29",
          "TaxInclusiveAmt": 69, // after GST
          "ItemRef": {
            "value": "231", // product ID
            "name": "WELDCLASS:WIRE - GASLESS PROMAX E-21" // product name
          },
          "UnitPrice": 62.73, // unit price 
          "Qty": 1, // qty
          "ItemAccountRef": {
            "value": "4", // ???
            "name": "0560 Sales" // ???
          },
          "TaxCodeRef": {
            "value": "5" // ???
          }
        }
      },
      {
        "Id": "2",
        "LineNum": 2,
        "Description": "WELDCLASS 0.9MM MIG WIRE STAINLESS STEEL PLATINUM 316LSI 200MM/5KG",
        "Amount": 208.18,
        "DetailType": "SalesItemLineDetail",
        "SalesItemLineDetail": {
          "ServiceDate": "2023-08-29",
          "TaxInclusiveAmt": 229,
          "ItemRef": {
            "value": "232",
            "name": "WELDCLASS:WELDCLASS MIG WIRE STAINLESS STEEL PLATINUM"
          },
          "UnitPrice": 208.18,
          "Qty": 1,
          "ItemAccountRef": {
            "value": "4",
            "name": "0560 Sales"
          },
          "TaxCodeRef": {
            "value": "5"
          }
        }
      },
      {
        "Amount": 270.91,
        "DetailType": "SubTotalLineDetail",
        "SubTotalLineDetail": {}
      }
    ],
  }
]

const weathes1 = [
  {
    "QueryResponse": {
      "Invoice": [
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2753",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-09-21T02:06:33-07:00",
            "LastUpdatedTime": "2023-09-21T02:06:33-07:00"
          },
          "CustomField": [],
          "DocNumber": "100040",
          "TxnDate": "2023-09-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "NORDLOCK STD WASH:M30(1-1/8) - (PACK-50)",
              "Amount": 1183,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-09-12",
                "TaxInclusiveAmt": 1301.3,
                "ItemRef": {
                  "value": "243",
                  "name": "HOBSON:NORDLOCK WASHER - M30"
                },
                "UnitPrice": 591.5,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1183,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 118.3,
            "TaxLine": [
              {
                "Amount": 118.3,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1183
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "136",
            "name": "Focus Minerals Ltd"
          },
          "CustomerMemo": {
            "value": "PO# FOP 202332\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "145",
            "Line1": "Level 2, 159 Adelaide Terrace, East Perth, WA 6004",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "ShipAddr": {
            "Id": "146",
            "Line1": "Three Mile Hill Processing Plant, Coolgardie, WA",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "7"
          },
          "DueDate": "2023-10-11",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1301.3,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 1301.3
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2508",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-09T06:49:17-07:00",
            "LastUpdatedTime": "2023-09-21T01:28:24-07:00"
          },
          "CustomField": [],
          "DocNumber": "211",
          "TxnDate": "2023-08-09",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2752",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "BOC MIG WIRE 70S6 0.9MM 15KG",
              "Amount": 277.69,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 305.46,
                "ItemRef": {
                  "value": "206",
                  "name": "BOC:BOC MIG WIRE 70S6 0.9MM 15KG"
                },
                "UnitPrice": 92.5633333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "ALPHAWELD OXT ACETYLENE GAS BOTTLE TROLLEY - 200KG",
              "Amount": 3108.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 3419.8,
                "ItemRef": {
                  "value": "208",
                  "name": "ALPHAWELD:ALPHAWELD OXT ACETYLENE GAS BOTTLE TROLLEY - 200KG"
                },
                "UnitPrice": 1554.455,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "GAS NOZZLE M16 GALVANIZED CONICAL L=69MM",
              "Amount": 79.55,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 87.5,
                "ItemRef": {
                  "value": "209",
                  "name": "BOC:GAS NOZZLE M16 GALVANIZED CONICAL L=69MM"
                },
                "UnitPrice": 39.775,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "CONTACT TIP M8",
              "Amount": 38.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 42.8,
                "ItemRef": {
                  "value": "210",
                  "name": "WELDCLASS:CONTACT TIP M8"
                },
                "UnitPrice": 19.455,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "CONTACT TIP HOLDER M16/M8",
              "Amount": 49.2,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 54.12,
                "ItemRef": {
                  "value": "211",
                  "name": "BOC:CONTACT TIP HOLDER M16/M8"
                },
                "UnitPrice": 24.6,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "GUID SPIRAL LINER INSULATED:2.0/4.5 RED FOR WIRE.",
              "Amount": 18.15,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 19.97,
                "ItemRef": {
                  "value": "212",
                  "name": "BOC:GUID SPIRAL LINER INSULATED 2.0/4.5 RED FOR WIRE"
                },
                "UnitPrice": 18.15,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "ENGINEER CHALK 75X10X5",
              "Amount": 19.98,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 21.98,
                "ItemRef": {
                  "value": "213",
                  "name": "WELDCLASS:ENGINEER CHALK 75X10X5"
                },
                "UnitPrice": 19.98,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 3592.39,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 359.24,
            "TaxLine": [
              {
                "Amount": 359.24,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 3592.39
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "136",
            "name": "Focus Minerals Ltd"
          },
          "CustomerMemo": {
            "value": "PO# FOP 201858\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "145",
            "Line1": "Level 2, 159 Adelaide Terrace, East Perth, WA 6004",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "ShipAddr": {
            "Id": "146",
            "Line1": "Three Mile Hill Processing Plant, Coolgardie, WA",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "3"
          },
          "DueDate": "2023-09-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 3951.63,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "corp_invoice@focusminerals.com.au"
          },
          "BillEmailCc": {
            "Address": "dleilua@focusminerals.com.au"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-09T06:49:20-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2507",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-09T06:33:54-07:00",
            "LastUpdatedTime": "2023-09-21T01:28:24-07:00"
          },
          "CustomField": [],
          "DocNumber": "210",
          "TxnDate": "2023-08-09",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2752",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "SMOOTHARC ADVANCE III 425R MIG WELDER",
              "Amount": 3267.83,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-10",
                "TaxInclusiveAmt": 3594.61,
                "ItemRef": {
                  "value": "205",
                  "name": "BOC:SMOOTHARC ADVANCE III 425R MIG WELDER"
                },
                "UnitPrice": 3267.83,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 3267.83,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 326.78,
            "TaxLine": [
              {
                "Amount": 326.78,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 3267.83
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "136",
            "name": "Focus Minerals Ltd"
          },
          "CustomerMemo": {
            "value": "PO# FOP 201919\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "145",
            "Line1": "Level 2, 159 Adelaide Terrace, East Perth, WA 6004",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "ShipAddr": {
            "Id": "146",
            "Line1": "Three Mile Hill Processing Plant, Coolgardie, WA",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "3"
          },
          "DueDate": "2023-09-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 3594.61,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "corp_invoice@focusminerals.com.au"
          },
          "BillEmailCc": {
            "Address": "dleilua@focusminerals.com.au"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-09T06:33:57-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2568",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-22T02:47:49-07:00",
            "LastUpdatedTime": "2023-09-08T04:01:32-07:00"
          },
          "CustomField": [],
          "DocNumber": "222",
          "TxnDate": "2023-08-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2676",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 8",
              "Amount": 720,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-22",
                "TaxInclusiveAmt": 792,
                "ItemRef": {
                  "value": "112",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  8"
                },
                "UnitPrice": 6,
                "Qty": 120,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 9 L CUT 5",
              "Amount": 1440,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-22",
                "TaxInclusiveAmt": 1584,
                "ItemRef": {
                  "value": "87",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  9"
                },
                "UnitPrice": 6,
                "Qty": 240,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2160,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 216,
            "TaxLine": [
              {
                "Amount": 216,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2160
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159884\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2376,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 0
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2517",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-11T04:13:48-07:00",
            "LastUpdatedTime": "2023-09-08T04:01:32-07:00"
          },
          "CustomField": [],
          "DocNumber": "217",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2676",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "OLI VIBRATORS - MTF 15/200-S02",
              "Amount": 2110,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-15",
                "TaxInclusiveAmt": 2321,
                "ItemRef": {
                  "value": "217",
                  "name": "OLI VIBRATING MOTORS:OLI VIBRATORS - MTF 15/200-S02"
                },
                "UnitPrice": 1055,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2110,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 211,
            "TaxLine": [
              {
                "Amount": 211,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2110
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159547\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2321,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-28T00:09:30-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2667",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-09-04T04:31:25-07:00",
            "LastUpdatedTime": "2023-09-08T03:58:06-07:00"
          },
          "CustomField": [],
          "DocNumber": "100027",
          "TxnDate": "2023-09-04",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2675",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "ELECTRICAL PRE WIRE",
              "Amount": 7106.62,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-09-04",
                "TaxInclusiveAmt": 7817.28,
                "ItemRef": {
                  "value": "240",
                  "name": "ELECTRICAL PRE WIRE 1"
                },
                "UnitPrice": 7106.62,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 7106.62,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 710.66,
            "TaxLine": [
              {
                "Amount": 710.66,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 7106.62
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "93",
            "name": "Paul Bedford"
          },
          "CustomerMemo": {
            "value": "We appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "ShipAddr": {
            "Id": "62",
            "Line1": "359 Lillie Rd, Gidgygannup"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-11",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 7817.28,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "baders@zoho.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-09-04T04:31:30-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2669",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-09-04T14:09:03-07:00",
            "LastUpdatedTime": "2023-09-04T14:09:03-07:00"
          },
          "CustomField": [],
          "DocNumber": "100028",
          "TxnDate": "2023-08-31",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "SS BALL VLV - 2P FLGD TBL E",
              "Amount": 10499.05,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-31",
                "TaxInclusiveAmt": 11548.95,
                "ItemRef": {
                  "value": "242",
                  "name": "BAT INDUSTRIAL:SS BALL VLV - 2P FLGD TBL E"
                },
                "UnitPrice": 3499.6833333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 10499.05,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 1049.9,
            "TaxLine": [
              {
                "Amount": 1049.9,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 10499.05
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "136",
            "name": "Focus Minerals Ltd"
          },
          "CustomerMemo": {
            "value": "PO# FOP 202050\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "145",
            "Line1": "Level 2, 159 Adelaide Terrace, East Perth, WA 6004",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "ShipAddr": {
            "Id": "146",
            "Line1": "Three Mile Hill Processing Plant, Coolgardie, WA",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "7"
          },
          "DueDate": "2023-09-30",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 11548.95,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 11548.95
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2552",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-15T02:43:15-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "221",
          "TxnDate": "2023-08-15",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "REGULATOR OXYGEN BOC MAX OUTLET 1000 KPA VERTICAL INLET",
              "Amount": 206,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-16",
                "TaxInclusiveAmt": 226.6,
                "ItemRef": {
                  "value": "160",
                  "name": "REGULATOR OXYGEN BOC MAX OUTLET 1000 KPA VERTICAL INLET"
                },
                "UnitPrice": 103,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 206,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 20.6,
            "TaxLine": [
              {
                "Amount": 20.6,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 206
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159755 \n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-22",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 226.6,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 0
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2516",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-11T04:04:50-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "216",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "IPSSSR404020",
              "Amount": 4440,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 4884,
                "ItemRef": {
                  "value": "17",
                  "name": "STAINLESS STEEL ENCLOSURE"
                },
                "UnitPrice": 1480,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "316 STAINLESS STEEL ENCLOSURE 300x300x150",
              "Amount": 1398,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 1537.8,
                "ItemRef": {
                  "value": "20",
                  "name": "IP-SS303015"
                },
                "UnitPrice": 699,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "SAFETY GLASSES 1600 - CLEAR",
              "Amount": 89.28,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 98.21,
                "ItemRef": {
                  "value": "46",
                  "name": "PARAMOUNT SAFETY:PARAMOUNT SAFETY 1600 CLEAR"
                },
                "UnitPrice": 2.0290909,
                "Qty": 44,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 5927.28,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 592.73,
            "TaxLine": [
              {
                "Amount": 592.73,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 5927.28
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159547\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 6520.01,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-28T00:09:08-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2515",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-08-11T03:45:24-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "215",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "316 STAINLESS STEEL ENCLOSURE 300x300x150",
              "Amount": 699.95,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 769.94,
                "ItemRef": {
                  "value": "20",
                  "name": "IP-SS303015"
                },
                "UnitPrice": 699.95,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 699.95,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 69.99,
            "TaxLine": [
              {
                "Amount": 69.99,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 699.95
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158919\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 769.94,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-28T00:09:23-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2514",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-11T03:37:21-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "214",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "FLUKE 789 PROCESS METER",
              "Amount": 2500,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 2750,
                "ItemRef": {
                  "value": "173",
                  "name": "FLUKE:FLUKE 789 PROCESS METER"
                },
                "UnitPrice": 2500,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2500,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 250,
            "TaxLine": [
              {
                "Amount": 250,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2500
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159032\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2750,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-11T03:37:41-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2510",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-10T20:15:49-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "213",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RED LION PXU SERIES\nPID CONTROLLER PXU",
              "Amount": 602.1,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 662.31,
                "ItemRef": {
                  "value": "216",
                  "name": "IPD:RED LION PXU - SERIES CONTROLLER"
                },
                "UnitPrice": 602.1,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 602.1,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 60.21,
            "TaxLine": [
              {
                "Amount": 60.21,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 602.1
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159497\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 662.31,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "pstearne@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "admin@ctlservices.com.au"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-10T20:15:52-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2509",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-10T20:11:23-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "212",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "T HANDLE TO SUIT ENCLOSURE",
              "Amount": 380.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 419,
                "ItemRef": {
                  "value": "214",
                  "name": "POWER CONTROL:T HANDLE TO SUIT ENCLOSURE"
                },
                "UnitPrice": 38.091,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 380.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 38.09,
            "TaxLine": [
              {
                "Amount": 38.09,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 380.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159457\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 419,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "pstearne@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "admin@ctlservices.com.au"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-10T20:11:27-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2506",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-08T06:16:07-07:00",
            "LastUpdatedTime": "2023-09-01T04:12:28-07:00"
          },
          "CustomField": [],
          "DocNumber": "209",
          "TxnDate": "2023-08-08",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2615",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE MEDIUM",
              "Amount": 594.55,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 654,
                "ItemRef": {
                  "value": "26",
                  "name": "PARAMOUNT SAFETY:CGL41NM"
                },
                "UnitPrice": 4.9545833,
                "Qty": 120,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE XL",
              "Amount": 594.55,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 654,
                "ItemRef": {
                  "value": "27",
                  "name": "PARAMOUNT SAFETY:CGL41NXL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 120,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "DRILL BIT HSS JOBBER 10MM",
              "Amount": 55.55,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 61.1,
                "ItemRef": {
                  "value": "202",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 10MM"
                },
                "UnitPrice": 5.555,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "DRILL BIT HSS JOBBER 10.5MM",
              "Amount": 63.18,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 69.5,
                "ItemRef": {
                  "value": "204",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 10.5MM"
                },
                "UnitPrice": 6.318,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "DRILL BIT HSS JOBBER 12MM",
              "Amount": 46.14,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 50.75,
                "ItemRef": {
                  "value": "203",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 12MM"
                },
                "UnitPrice": 9.228,
                "Qty": 5,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE XL",
              "Amount": 356.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 392.4,
                "ItemRef": {
                  "value": "27",
                  "name": "PARAMOUNT SAFETY:CGL41NXL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "12V CTEK BATTERY CHARGER - MXS25 12VOLT",
              "Amount": 1224,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 1346.4,
                "ItemRef": {
                  "value": "72",
                  "name": "BAXTERS MTQ:12V CTEK BATTERY CHARGER"
                },
                "UnitPrice": 612,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "8",
              "LineNum": 8,
              "Description": "GLOVE MAXIDRY SIZE 8 ATG",
              "Amount": 662.4,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 728.64,
                "ItemRef": {
                  "value": "45",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 8"
                },
                "UnitPrice": 6.9,
                "Qty": 96,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "9",
              "LineNum": 9,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE10",
              "Amount": 496.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 546.48,
                "ItemRef": {
                  "value": "43",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 10"
                },
                "UnitPrice": 6.9,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "10",
              "LineNum": 10,
              "Description": "SAFETY GLASSES 1600 SMOKE",
              "Amount": 269.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-09",
                "TaxInclusiveAmt": 296.64,
                "ItemRef": {
                  "value": "47",
                  "name": "PARAMOUNT SAFETY:PARAMOUNT SAFETY 1600 SMOKE"
                },
                "UnitPrice": 1.8727083,
                "Qty": 144,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 4363.57,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 436.34,
            "TaxLine": [
              {
                "Amount": 436.34,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 4363.57
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159547\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-15",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 4799.91,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "astapp@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-28T00:08:47-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2594",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-28T19:06:43-07:00",
            "LastUpdatedTime": "2023-08-28T19:06:56-07:00"
          },
          "CustomField": [],
          "DocNumber": "100026",
          "TxnDate": "2023-08-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "19 Piece Alpha Cobalt Metric Tuffbox Drill Set",
              "Amount": 136.41,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 150.05,
                "ItemRef": {
                  "value": "238",
                  "name": "ALPHA:19 Piece Alpha Cobalt Metric Tuffbox Drill Set"
                },
                "UnitPrice": 136.41,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 136.41,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 13.64,
            "TaxLine": [
              {
                "Amount": 13.64,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 136.41
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "134",
            "name": "Evolution Mining Services"
          },
          "CustomerMemo": {
            "value": "PO# W1 252632\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "143",
            "Line1": "Level 24, 175 Liverpool Street",
            "Line2": "Sydney, NSW 2000",
            "City": "Sydney",
            "Country": "Australia",
            "CountrySubDivisionCode": "NSW",
            "PostalCode": "2000"
          },
          "ShipAddr": {
            "Id": "143",
            "Line1": "Level 24, 175 Liverpool Street",
            "Line2": "Sydney, NSW 2000",
            "City": "Sydney",
            "Country": "Australia",
            "CountrySubDivisionCode": "NSW",
            "PostalCode": "2000"
          },
          "FreeFormAddress": false,
          "SalesTermRef": {
            "value": "7"
          },
          "DueDate": "2023-09-28",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 150.05,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 150.05
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2593",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-08-28T19:01:56-07:00",
            "LastUpdatedTime": "2023-08-28T19:01:56-07:00"
          },
          "CustomField": [],
          "DocNumber": "100023",
          "TxnDate": "2023-08-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "32 AMP 10M 'CONSTRUCTION' EXTENSION LEAD: 3 PHASE,4 PIN,415V",
              "Amount": 325.46,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-28",
                "TaxInclusiveAmt": 358.01,
                "ItemRef": {
                  "value": "234",
                  "name": "POWERSAFE:32 AMP 10M 'CONSTRUCTION' EXTENSION LEAD"
                },
                "UnitPrice": 325.46,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "ARC AIR GOUGING TORCH 1000 AMP HEAVY DUTY - 2M GOUGING CARBON COMPLETE ASSEMBLY",
              "Amount": 373.75,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-28",
                "TaxInclusiveAmt": 411.13,
                "ItemRef": {
                  "value": "236",
                  "name": "HAMPDON:ARC AIR GOUGING TORCH"
                },
                "UnitPrice": 373.75,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "400A EARTH CLAMP AND LEAD - 5 METER - 35-50 LARGE PLUG",
              "Amount": 238.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-28",
                "TaxInclusiveAmt": 262.54,
                "ItemRef": {
                  "value": "237",
                  "name": "HAMPDON:400A EARTH CLAMP AND LEAD - 5 METER"
                },
                "UnitPrice": 238.67,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 937.88,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 93.8,
            "TaxLine": [
              {
                "Amount": 93.8,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 937.88
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "136",
            "name": "Focus Minerals Ltd"
          },
          "CustomerMemo": {
            "value": "PO# FOP 202078\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "145",
            "Line1": "Level 2, 159 Adelaide Terrace, East Perth, WA 6004",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "ShipAddr": {
            "Id": "146",
            "Line1": "Three Mile Hill Processing Plant, Coolgardie, WA",
            "City": "Perth",
            "CountrySubDivisionCode": "WA",
            "PostalCode": "6004"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "7"
          },
          "DueDate": "2023-09-28",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1031.68,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 1031.68
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2583",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-08-28T17:17:01-07:00",
            "LastUpdatedTime": "2023-08-28T17:27:27-07:00"
          },
          "CustomField": [],
          "DocNumber": "100024",
          "TxnDate": "2023-08-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "WIRE - GASLESS PROMAX E-21 0.9MM WELDCLASS 4.5KG WC-00260",
              "Amount": 62.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 69,
                "ItemRef": {
                  "value": "231",
                  "name": "WELDCLASS:WIRE - GASLESS PROMAX E-21"
                },
                "UnitPrice": 62.73,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "WELDCLASS 0.9MM MIG WIRE STAINLESS STEEL PLATINUM 316LSI 200MM/5KG",
              "Amount": 208.18,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 229,
                "ItemRef": {
                  "value": "232",
                  "name": "WELDCLASS:WELDCLASS MIG WIRE STAINLESS STEEL PLATINUM"
                },
                "UnitPrice": 208.18,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 270.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 27.09,
            "TaxLine": [
              {
                "Amount": 27.09,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 270.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159854\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-05",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 298,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 298
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2582",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-08-28T17:11:13-07:00",
            "LastUpdatedTime": "2023-08-28T17:11:13-07:00"
          },
          "CustomField": [],
          "DocNumber": "228",
          "TxnDate": "2023-08-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CONTACT BLOCK 1 NC ALLEN BRADLEY",
              "Amount": 77.89,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 85.68,
                "ItemRef": {
                  "value": "167",
                  "name": "CONTACT BLOCK 1 NC ALLEN BRADLEY"
                },
                "UnitPrice": 25.9633333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 77.89,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 7.79,
            "TaxLine": [
              {
                "Amount": 7.79,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 77.89
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158919\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-05",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 85.68,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 85.68
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2422",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-26T16:20:46-07:00",
            "LastUpdatedTime": "2023-08-28T01:03:52-07:00"
          },
          "CustomField": [],
          "DocNumber": "204",
          "TxnDate": "2023-07-27",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2581",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 11 2XL",
              "Amount": 720,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-26",
                "TaxInclusiveAmt": 792,
                "ItemRef": {
                  "value": "62",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  11"
                },
                "UnitPrice": 6,
                "Qty": 120,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 720,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 72,
            "TaxLine": [
              {
                "Amount": 72,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 720
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159293\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 792,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-28T00:08:31-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2421",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-24T21:54:02-07:00",
            "LastUpdatedTime": "2023-08-28T01:03:52-07:00"
          },
          "CustomField": [],
          "DocNumber": "203",
          "TxnDate": "2023-07-25",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2581",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "DRILL BIT HSS JOBBER 3.5MM",
              "Amount": 34,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-25",
                "TaxInclusiveAmt": 37.4,
                "ItemRef": {
                  "value": "187",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 3.5MM"
                },
                "UnitPrice": 1.7,
                "Qty": 20,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "DRILL BIT HSS JOBBER 4MM",
              "Amount": 21,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-25",
                "TaxInclusiveAmt": 23.1,
                "ItemRef": {
                  "value": "188",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 4MM"
                },
                "UnitPrice": 2.1,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "DRILL BIT HSS JOBBER 4.5MM",
              "Amount": 22,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-25",
                "TaxInclusiveAmt": 24.2,
                "ItemRef": {
                  "value": "189",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 4.5MM"
                },
                "UnitPrice": 2.2,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "DRILL BIT HSS JOBBER 5MM",
              "Amount": 34,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-25",
                "TaxInclusiveAmt": 37.4,
                "ItemRef": {
                  "value": "190",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 5MM"
                },
                "UnitPrice": 1.7,
                "Qty": 20,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "DRILL BIT HSS JOBBER 5.5MM",
              "Amount": 31,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-25",
                "TaxInclusiveAmt": 34.1,
                "ItemRef": {
                  "value": "191",
                  "name": "ALPHA:DRILL BIT HSS JOBBER 5.5MM"
                },
                "UnitPrice": 3.1,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "NYLON TIE S/D 300X4.8MM UV BLACK PK100\n300mm x 4.8mm\nUV Black",
              "Amount": 64.4,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-25",
                "TaxInclusiveAmt": 70.84,
                "ItemRef": {
                  "value": "143",
                  "name": "CARROLL:CT280B"
                },
                "UnitPrice": 5.8545455,
                "Qty": 11,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 206.4,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 20.64,
            "TaxLine": [
              {
                "Amount": 20.64,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 206.4
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159196\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-01",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 227.04,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-28T00:07:48-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2425",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-26T21:22:38-07:00",
            "LastUpdatedTime": "2023-08-28T00:38:34-07:00"
          },
          "CustomField": [],
          "DocNumber": "207",
          "TxnDate": "2023-07-27",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2580",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Tyvek 500 (L)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "TYVEK 500 (XL)",
              "Amount": 690,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 759,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 75,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 920,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 92,
            "TaxLine": [
              {
                "Amount": 92,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 920
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159201\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "3"
          },
          "DueDate": "2023-08-26",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1012,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-26T21:23:04-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2471",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-02T07:07:37-07:00",
            "LastUpdatedTime": "2023-08-28T00:06:24-07:00"
          },
          "CustomField": [],
          "DocNumber": "208",
          "TxnDate": "2023-08-02",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2575",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "10-25 MALE DINSE CABLE CONNECT",
              "Amount": 105.55,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-03",
                "TaxInclusiveAmt": 116.1,
                "ItemRef": {
                  "value": "200",
                  "name": "WELDCLASS:10-25 MALE DINSE CABLE CONNECT"
                },
                "UnitPrice": 10.555,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "10-25 FEMALE SOCK CONNECT",
              "Amount": 105.55,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-03",
                "TaxInclusiveAmt": 116.1,
                "ItemRef": {
                  "value": "201",
                  "name": "WELDCLASS:10-25 FEMALE SOCK CONNECT"
                },
                "UnitPrice": 10.555,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 211.1,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 21.1,
            "TaxLine": [
              {
                "Amount": 21.1,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 211.1
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159405\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-09",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 232.2,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-02T07:07:47-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2424",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-26T19:29:13-07:00",
            "LastUpdatedTime": "2023-08-28T00:06:24-07:00"
          },
          "CustomField": [],
          "DocNumber": "206",
          "TxnDate": "2023-07-27",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2575",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "LAPP-0041052 4G4 FLAT CABLE\n4MM 3 CORE & E",
              "Amount": 805.45,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 886,
                "ItemRef": {
                  "value": "197",
                  "name": "LAPP CABLES:LAPP-0041052 FLAT CABLE"
                },
                "UnitPrice": 40.2725,
                "Qty": 20,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "LAPP-0041059 4G4 FLAT CABLE\n16MM 3 CORE& E",
              "Amount": 3077.64,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 3385.4,
                "ItemRef": {
                  "value": "198",
                  "name": "LAPP CABLES:LAPP-0041059 FLAT CABLE"
                },
                "UnitPrice": 153.882,
                "Qty": 20,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 3883.09,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 388.31,
            "TaxLine": [
              {
                "Amount": 388.31,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 3883.09
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO#159041\n\nWe appreciate your business and are looking forward to \ndelivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 4271.4,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-26T19:32:04-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2423",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-26T19:21:52-07:00",
            "LastUpdatedTime": "2023-08-28T00:06:24-07:00"
          },
          "CustomField": [],
          "DocNumber": "205",
          "TxnDate": "2023-07-27",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2575",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "FLASHBACK ARRESTOR REGULATOR MOUNTED ACETYLENE F2R CIGWELD",
              "Amount": 157.45,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 173.2,
                "ItemRef": {
                  "value": "192",
                  "name": "BOC:FLASHBACK ARRESTOR REGULATOR MOUNTED ACETYLENE F2R CIGWELD"
                },
                "UnitPrice": 31.49,
                "Qty": 5,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "FLASHBACK ARRESTOR REGULATOR MOUNTED OXYGEN F2R CIGWELD",
              "Amount": 157.45,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 173.2,
                "ItemRef": {
                  "value": "193",
                  "name": "BOC:FLASHBACK ARRESTOR REGULATOR MOUNTED OXYGEN F2R CIGWELD"
                },
                "UnitPrice": 31.49,
                "Qty": 5,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "FLASHBACK ARRESTOR BLOWPIPE MOUNTED ACETYLENE",
              "Amount": 62.98,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 69.28,
                "ItemRef": {
                  "value": "194",
                  "name": "BOC:FLASHBACK ARRESTOR BLOWPIPE MOUNTED ACETYLENE"
                },
                "UnitPrice": 31.49,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "FLASHBACK ARRESTOR BLOWPIPE MOUNTED OXYGEN",
              "Amount": 157.45,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 173.2,
                "ItemRef": {
                  "value": "195",
                  "name": "BOC:FLASHBACK ARRESTOR BLOWPIPE MOUNTED OXYGEN"
                },
                "UnitPrice": 31.49,
                "Qty": 5,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "BOLT M16 X 60 CL8.8 ZINC HEX HEAD (25/BOX)",
              "Amount": 39.4,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-28",
                "TaxInclusiveAmt": 43.34,
                "ItemRef": {
                  "value": "166",
                  "name": "BOLT M16 X 60 CL8.8 ZINC HEX HEAD (25/BOX)"
                },
                "UnitPrice": 19.7,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 574.73,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 57.49,
            "TaxLine": [
              {
                "Amount": 57.49,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 574.73
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159196\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 632.22,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-26T19:22:57-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2551",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-15T02:32:52-07:00",
            "LastUpdatedTime": "2023-08-27T23:57:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "220",
          "TxnDate": "2023-08-15",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2574",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "TL160102",
              "Amount": 496.36,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-16",
                "TaxInclusiveAmt": 546,
                "ItemRef": {
                  "value": "221",
                  "name": "SWARTZ:TL160102"
                },
                "UnitPrice": 1.6545333,
                "Qty": 300,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 496.36,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 49.64,
            "TaxLine": [
              {
                "Amount": 49.64,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 496.36
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159547\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-22",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 546,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 0
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2518",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-11T04:24:52-07:00",
            "LastUpdatedTime": "2023-08-27T23:57:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "218",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2574",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Amount": 69.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 76.9,
                "ItemRef": {
                  "value": "180",
                  "name": "STERLING:NIGHTHAWK KNIFE"
                },
                "UnitPrice": 34.955,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "WIHA 12 PIECE SCREW DRIVE",
              "Amount": 173,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 190.3,
                "ItemRef": {
                  "value": "218",
                  "name": "WIHA:WIHA 12 PIECE SCREW DRIVE"
                },
                "UnitPrice": 173,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 242.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 24.29,
            "TaxLine": [
              {
                "Amount": 24.29,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 242.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159404\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 267.2,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 0
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2573",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-27T23:27:10-07:00",
            "LastUpdatedTime": "2023-08-27T23:39:33-07:00"
          },
          "CustomField": [],
          "DocNumber": "227",
          "TxnDate": "2023-08-28",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "STAINLESS STEEL WALL MOUNT ENCLOSURES PSX606030",
              "Amount": 8442.87,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 9287.16,
                "ItemRef": {
                  "value": "230",
                  "name": "PHOENIX:STAINLESS STEEL WALL MOUNT ENCLOSURES PSX606030"
                },
                "UnitPrice": 2814.29,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 8442.87,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 844.29,
            "TaxLine": [
              {
                "Amount": 844.29,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 8442.87
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159748\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-04",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 9287.16,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 9287.16
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2572",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-08-27T23:04:31-07:00",
            "LastUpdatedTime": "2023-08-27T23:04:31-07:00"
          },
          "CustomField": [],
          "DocNumber": "226",
          "TxnDate": "2023-08-28",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "NEMA 2 FRP CABLE LADDER - 600",
              "Amount": 4846,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 5330.6,
                "ItemRef": {
                  "value": "227",
                  "name": "EZYSTRUT:NEMA 2 FRP CABLE LADDER - 600"
                },
                "UnitPrice": 484.6,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "NEMA 2 FRP CABLE LADDER SPLICE PLATE",
              "Amount": 2386.36,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 2625,
                "ItemRef": {
                  "value": "228",
                  "name": "EZYSTRUT:NEMA 2 FRP CABLE LADDER SPLICE PLATE"
                },
                "UnitPrice": 39.7726667,
                "Qty": 60,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 7232.36,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 723.24,
            "TaxLine": [
              {
                "Amount": 723.24,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 7232.36
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159750\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-04",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 7955.6,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 7955.6
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2571",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-08-27T22:56:43-07:00",
            "LastUpdatedTime": "2023-08-27T22:59:49-07:00"
          },
          "CustomField": [],
          "DocNumber": "225",
          "TxnDate": "2023-08-28",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "NEMA 2 FRP CABLE LADDER - 300",
              "Amount": 4853.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 5339.2,
                "ItemRef": {
                  "value": "226",
                  "name": "EZYSTRUT:NEMA 2 FRP CABLE LADDER - 300"
                },
                "UnitPrice": 485.382,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 4853.82,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 485.38,
            "TaxLine": [
              {
                "Amount": 485.38,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 4853.82
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159749\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-04",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 5339.2,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 5339.2
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2570",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-08-27T22:46:32-07:00",
            "LastUpdatedTime": "2023-08-27T22:46:32-07:00"
          },
          "CustomField": [],
          "DocNumber": "224",
          "TxnDate": "2023-08-28",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "NEMA 2 FRP CABLE LADDER",
              "Amount": 4531.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 4985,
                "ItemRef": {
                  "value": "225",
                  "name": "EZYSTRUT:NEMA 2 FRP CABLE LADDER"
                },
                "UnitPrice": 453.182,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 4531.82,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 453.18,
            "TaxLine": [
              {
                "Amount": 453.18,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 4531.82
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159751\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-04",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 4985,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 4985
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2569",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-08-27T17:19:18-07:00",
            "LastUpdatedTime": "2023-08-27T17:19:23-07:00"
          },
          "CustomField": [],
          "DocNumber": "223",
          "TxnDate": "2023-08-28",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "WP40GR4KN01",
              "Amount": 73.47,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 80.82,
                "ItemRef": {
                  "value": "70",
                  "name": "INTEGRATED POWER:1200 WP SERIES OUTDOOR LED"
                },
                "UnitPrice": 73.47,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "DIN SAFE RCBO 10KA 10A",
              "Amount": 276.49,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-29",
                "TaxInclusiveAmt": 304.14,
                "ItemRef": {
                  "value": "222",
                  "name": "NHP:DIN SAFE RCBO 10KA 10A"
                },
                "UnitPrice": 92.1633333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 349.96,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 35,
            "TaxLine": [
              {
                "Amount": 35,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 349.96
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159351\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-09-04",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 384.96,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 384.96,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-27T17:19:21-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "domain": "QBO",
          "sparse": false,
          "Id": "2519",
          "SyncToken": "0",
          "MetaData": {
            "CreateTime": "2023-08-11T04:37:08-07:00",
            "LastUpdatedTime": "2023-08-11T04:37:08-07:00"
          },
          "CustomField": [],
          "DocNumber": "219",
          "TxnDate": "2023-08-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "300MM WRENCH",
              "Amount": 62.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 69.1,
                "ItemRef": {
                  "value": "183",
                  "name": "STERLING:300MM WRENCH"
                },
                "UnitPrice": 62.82,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "150MM WRENCH",
              "Amount": 47.2,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 51.92,
                "ItemRef": {
                  "value": "184",
                  "name": "STERLING:150MM WRENCH"
                },
                "UnitPrice": 23.6,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "WIDE JAW WRENCH 200MM (8 INCH)",
              "Amount": 59,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-08-11",
                "TaxInclusiveAmt": 64.9,
                "ItemRef": {
                  "value": "219",
                  "name": "STERLING:WIDE JAW WRENCH 200MM (8 INCH)"
                },
                "UnitPrice": 29.5,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 169.02,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 16.9,
            "TaxLine": [
              {
                "Amount": 16.9,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 169.02
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159385\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-08-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 185.92,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "Balance": 185.92
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2355",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-13T05:19:03-07:00",
            "LastUpdatedTime": "2023-08-11T00:26:46-07:00"
          },
          "CustomField": [],
          "DocNumber": "193",
          "TxnDate": "2023-07-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2513",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "SWITCH BODY 32A 3P SIRCO M",
              "Amount": 137.54,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 151.29,
                "ItemRef": {
                  "value": "168",
                  "name": "SWITCH BODY 32A 3P SIRCO M"
                },
                "UnitPrice": 137.54,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "LOAD BREAK SWITCH SLBM\n3P 32A EXTERNAL HANDLE KIT",
              "Amount": 254,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 279.4,
                "ItemRef": {
                  "value": "169",
                  "name": "LOAD BREAK SWITCH"
                },
                "UnitPrice": 254,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 391.54,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 39.15,
            "TaxLine": [
              {
                "Amount": 39.15,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 391.54
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158511\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 430.69,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-13T05:19:22-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2353",
          "SyncToken": "3",
          "MetaData": {
            "CreateTime": "2023-07-13T02:47:43-07:00",
            "LastUpdatedTime": "2023-08-11T00:26:46-07:00"
          },
          "CustomField": [],
          "DocNumber": "191",
          "TxnDate": "2023-07-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2513",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "DISSOLVED OXYGEN PROBE \nPORTABLE HANDHELD DISSOLVED OXYGEN & BOD METER WITH DIN \nCONNECTOR AND 4M CABLE",
              "Amount": 1809.79,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 1990.77,
                "ItemRef": {
                  "value": "103",
                  "name": "DISSOLVED OXYGEN PROBE"
                },
                "UnitPrice": 1809.79,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1809.79,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 180.98,
            "TaxLine": [
              {
                "Amount": 180.98,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1809.79
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158867\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1990.77,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-01T01:44:36-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2420",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-21T21:02:08-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "202",
          "TxnDate": "2023-07-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "300MM WRENCH",
              "Amount": 125.64,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 138.2,
                "ItemRef": {
                  "value": "183",
                  "name": "STERLING:300MM WRENCH"
                },
                "UnitPrice": 62.82,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "150MM WRENCH",
              "Amount": 47.2,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 51.92,
                "ItemRef": {
                  "value": "184",
                  "name": "STERLING:150MM WRENCH"
                },
                "UnitPrice": 23.6,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "ALPHA BLACK DRILL BIT SET (25)",
              "Amount": 142.78,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 157.06,
                "ItemRef": {
                  "value": "186",
                  "name": "ALPHA:ALPHA BLACK DRILL BIT SET"
                },
                "UnitPrice": 142.78,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 315.62,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 31.56,
            "TaxLine": [
              {
                "Amount": 31.56,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 315.62
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159103\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 347.18,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-21T21:02:25-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2419",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-21T20:55:50-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "201",
          "TxnDate": "2023-07-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "THH3200AA 3200W HEATER",
              "Amount": 899.99,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 989.99,
                "ItemRef": {
                  "value": "182",
                  "name": "BUNNINGS:3200W HEATER"
                },
                "UnitPrice": 899.99,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 899.99,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 90,
            "TaxLine": [
              {
                "Amount": 90,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 899.99
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159045\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 989.99,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-01T01:46:00-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2418",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-21T20:52:09-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "200",
          "TxnDate": "2023-07-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CTL170107 WIHA VDE 6 PEICE",
              "Amount": 317.4,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 349.14,
                "ItemRef": {
                  "value": "178",
                  "name": "WIHA:CTL170107 WIHA VDE 6 PEICE"
                },
                "UnitPrice": 105.8,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CTL174100 STERL NIGHTHAWK FOLD",
              "Amount": 139.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 153.8,
                "ItemRef": {
                  "value": "180",
                  "name": "STERLING:NIGHTHAWK KNIFE"
                },
                "UnitPrice": 34.955,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 457.22,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 45.72,
            "TaxLine": [
              {
                "Amount": 45.72,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 457.22
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159000\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 502.94,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-21T20:52:27-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2417",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-21T20:46:25-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "199",
          "TxnDate": "2023-07-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "40MM MOUNT BRACKET SMC",
              "Amount": 78.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 86.8,
                "ItemRef": {
                  "value": "176",
                  "name": "SMC:40MM MOUNT BRACKET SMC"
                },
                "UnitPrice": 7.891,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 78.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 7.89,
            "TaxLine": [
              {
                "Amount": 7.89,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 78.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159107\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 86.8,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mseah@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-01T01:45:22-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2416",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-21T20:42:34-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "198",
          "TxnDate": "2023-07-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "50W SOLAR PANEL 630x545x25",
              "Amount": 119.98,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 131.98,
                "ItemRef": {
                  "value": "174",
                  "name": "WA SOLAR:50W SOLAR PANEL 630x545x25"
                },
                "UnitPrice": 119.98,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "SCC010010010 BLUE SOLAR CONT",
              "Amount": 69.98,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-24",
                "TaxInclusiveAmt": 76.98,
                "ItemRef": {
                  "value": "175",
                  "name": "WA SOLAR:SCC010010010 BLUE SOLAR CONT"
                },
                "UnitPrice": 69.98,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 189.96,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 19,
            "TaxLine": [
              {
                "Amount": 19,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 189.96
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159043\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 208.96,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-21T20:42:48-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2414",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-21T19:51:49-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "197",
          "TxnDate": "2023-07-22",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Tyvek 500 (L)",
              "Amount": 690,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-21",
                "TaxInclusiveAmt": 759,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 75,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "TYVEK 500 (XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-21",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "TYVEK 500 (2XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-21",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "11",
                  "name": "COVERALLS (2XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "TYVEK 500 (3XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-21",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "12",
                  "name": "COVERALLS (3XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1610,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 161,
            "TaxLine": [
              {
                "Amount": 161,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1610
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159201\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-29",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1771,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-21T19:52:01-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2356",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-07-13T05:26:41-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "194",
          "TxnDate": "2023-07-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "REGULATOR OXYGEN BOC MAX OUTLET 1000 KPA VERTICAL INLET",
              "Amount": 103,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-18",
                "TaxInclusiveAmt": 113.3,
                "ItemRef": {
                  "value": "160",
                  "name": "REGULATOR OXYGEN BOC MAX OUTLET 1000 KPA VERTICAL INLET"
                },
                "UnitPrice": 103,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "NOZZLE CUTTING TYPE 41 SIZE 12",
              "Amount": 23.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-18",
                "TaxInclusiveAmt": 26.04,
                "ItemRef": {
                  "value": "170",
                  "name": "NOZZLE CUTTING TYPE 41 SIZE 12"
                },
                "UnitPrice": 7.89,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "HOSE OXY / ACET SET 5MM X 20M TWINWELD CIGWELD",
              "Amount": 84,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-18",
                "TaxInclusiveAmt": 92.4,
                "ItemRef": {
                  "value": "171",
                  "name": "HOSE OXY - ACET SET 5MM X 20M TWINWELD CIGWELD"
                },
                "UnitPrice": 84,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "CF2150BL5KN01",
              "Amount": 1050.79,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-18",
                "TaxInclusiveAmt": 1155.87,
                "ItemRef": {
                  "value": "65",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 150W"
                },
                "UnitPrice": 350.2633333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1261.46,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 126.15,
            "TaxLine": [
              {
                "Amount": 126.15,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1261.46
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 159016\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1387.61,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-13T05:27:15-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2354",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-13T03:27:50-07:00",
            "LastUpdatedTime": "2023-08-11T00:25:59-07:00"
          },
          "CustomField": [],
          "DocNumber": "192",
          "TxnDate": "2023-07-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2512",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "FLASHBACK ARRESTOR BLOWPIPE MOUNTED ACETYLENE",
              "Amount": 62.96,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 69.26,
                "ItemRef": {
                  "value": "158",
                  "name": "FLASHBACK ARRESTOR BLOWPIPE MOUNTED ACETYLENE"
                },
                "UnitPrice": 31.48,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CUTTING ATTACHMENT OXY TORCH",
              "Amount": 283.47,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 311.82,
                "ItemRef": {
                  "value": "159",
                  "name": "CUTTING ATTACHMENT OXY TORCH"
                },
                "UnitPrice": 94.49,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "REGULATOR OXYGEN BOC MAX OUTLET 1000 KPA VERTICAL INLET",
              "Amount": 206,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 226.6,
                "ItemRef": {
                  "value": "160",
                  "name": "REGULATOR OXYGEN BOC MAX OUTLET 1000 KPA VERTICAL INLET"
                },
                "UnitPrice": 103,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "NOZZLE CUTTING OXY/ACET TYPE 41 SIZE 20",
              "Amount": 23.95,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 26.35,
                "ItemRef": {
                  "value": "161",
                  "name": "NOZZLE CUTTING OXY/ACET TYPE 41 SIZE 20"
                },
                "UnitPrice": 7.9833333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "CONTACT BLOCK 1 NC ALLEN BRADLEY",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "167",
                  "name": "CONTACT BLOCK 1 NC ALLEN BRADLEY"
                },
                "UnitPrice": 0,
                "Qty": 0,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "DIN SAFE 10A NHP MCB 1P 10KA 30MA",
              "Amount": 1105.96,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 1216.56,
                "ItemRef": {
                  "value": "163",
                  "name": "DIN SAFE 10A NHP MCB 1P 10KA 30MA"
                },
                "UnitPrice": 92.1633333,
                "Qty": 12,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "DIN SAFE 16A NHP MCB 10KA 30MA",
              "Amount": 994.69,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 1094.16,
                "ItemRef": {
                  "value": "164",
                  "name": "DIN SAFE 16A NHP MCB 10KA 30MA"
                },
                "UnitPrice": 82.8908333,
                "Qty": 12,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "8",
              "LineNum": 8,
              "Description": "DIN SAFE 20A NHP MCB 1P 10KA 30MA",
              "Amount": 1105.96,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 1216.56,
                "ItemRef": {
                  "value": "165",
                  "name": "DIN SAFE 20A NHP MCB 1P 10KA 30MA"
                },
                "UnitPrice": 92.1633333,
                "Qty": 12,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "9",
              "LineNum": 9,
              "Description": "BOLT M16 X 60 CL8.8 ZINC HEX HEAD (25/BOX)",
              "Amount": 98.5,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 108.35,
                "ItemRef": {
                  "value": "166",
                  "name": "BOLT M16 X 60 CL8.8 ZINC HEX HEAD (25/BOX)"
                },
                "UnitPrice": 19.7,
                "Qty": 5,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "10",
              "LineNum": 10,
              "Description": "BE40WHXKN01",
              "Amount": 2939.45,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 3233.4,
                "ItemRef": {
                  "value": "66",
                  "name": "INTEGRATED POWER:1200 BE SERIES INDOOR LED"
                },
                "UnitPrice": 97.9816667,
                "Qty": 30,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "11",
              "LineNum": 11,
              "Description": "12V CTEK BATTERY CHARGER - MXS25 12VOLT",
              "Amount": 1224,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 1346.4,
                "ItemRef": {
                  "value": "72",
                  "name": "BAXTERS MTQ:12V CTEK BATTERY CHARGER"
                },
                "UnitPrice": 612,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "12",
              "LineNum": 12,
              "Description": "316 STAINLESS STEEL ENCLOSURE 300x300x150",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "20",
                  "name": "IP-SS303015"
                },
                "UnitPrice": 0,
                "Qty": 0,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "13",
              "LineNum": 13,
              "Description": "240W LED FLOODLIGHT, 4000K, 80CRI,ASEMMETRIC OPTIC",
              "Amount": 900,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-14",
                "TaxInclusiveAmt": 990,
                "ItemRef": {
                  "value": "58",
                  "name": "INTEGRATED POWER:240W LED FLOODLIGHT"
                },
                "UnitPrice": 900,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 8944.94,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 894.52,
            "TaxLine": [
              {
                "Amount": 894.52,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 8944.94
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158919\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 9839.46,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-08-01T01:45:03-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2164",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-07T19:59:56-07:00",
            "LastUpdatedTime": "2023-07-21T20:02:25-07:00"
          },
          "CustomField": [],
          "DocNumber": "168",
          "TxnDate": "2023-06-08",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2415",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CP-135-1 Premium Off Grid\nDiesel Generator 13.2KVA\nsingle phase 2 wire auto start",
              "Amount": 9499,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-09",
                "TaxInclusiveAmt": 10448.9,
                "ItemRef": {
                  "value": "128",
                  "name": "Commodore:Off Grid Diesel Generator"
                },
                "UnitPrice": 9499,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 9499,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 949.9,
            "TaxLine": [
              {
                "Amount": 949.9,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 9499
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157502\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-15",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 10448.9,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "slayton@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-07T20:00:00-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2332",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-07-08T22:14:46-07:00",
            "LastUpdatedTime": "2023-07-21T04:23:51-07:00"
          },
          "CustomField": [],
          "DocNumber": "190",
          "TxnDate": "2023-07-09",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2371",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE MEDIUM",
              "Amount": 297.27,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 327,
                "ItemRef": {
                  "value": "26",
                  "name": "PARAMOUNT SAFETY:CGL41NM"
                },
                "UnitPrice": 4.9545,
                "Qty": 60,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE LARGE",
              "Amount": 297.27,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 327,
                "ItemRef": {
                  "value": "25",
                  "name": "PARAMOUNT SAFETY:CGL41NL"
                },
                "UnitPrice": 4.9545,
                "Qty": 60,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE XL",
              "Amount": 356.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 392.4,
                "ItemRef": {
                  "value": "27",
                  "name": "PARAMOUNT SAFETY:CGL41NXL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE 2XL",
              "Amount": 178.36,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 196.2,
                "ItemRef": {
                  "value": "34",
                  "name": "PARAMOUNT SAFETY:CGL41N2XL"
                },
                "UnitPrice": 4.9544444,
                "Qty": 36,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE 9",
              "Amount": 496.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 546.48,
                "ItemRef": {
                  "value": "44",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 9"
                },
                "UnitPrice": 6.9,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE10",
              "Amount": 662.4,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 728.64,
                "ItemRef": {
                  "value": "43",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 10"
                },
                "UnitPrice": 6.9,
                "Qty": 96,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE 11",
              "Amount": 496.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 546.48,
                "ItemRef": {
                  "value": "32",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 11"
                },
                "UnitPrice": 6.9,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "8",
              "LineNum": 8,
              "Description": "SAFETY GLASSES 1600 - CLEAR",
              "Amount": 267.05,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 293.76,
                "ItemRef": {
                  "value": "46",
                  "name": "PARAMOUNT SAFETY:PARAMOUNT SAFETY 1600 CLEAR"
                },
                "UnitPrice": 1.8545139,
                "Qty": 144,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "9",
              "LineNum": 9,
              "Description": "Tyvek 500 (L)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "10",
              "LineNum": 10,
              "Description": "TYVEK 500 (XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "11",
              "LineNum": 11,
              "Description": "TYVEK 500 (2XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-09",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "11",
                  "name": "COVERALLS (2XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 4432.68,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 443.28,
            "TaxLine": [
              {
                "Amount": 443.28,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 4432.68
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158857\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-16",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 4875.96,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-08T22:15:16-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2232",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-16T14:10:17-07:00",
            "LastUpdatedTime": "2023-07-21T04:22:45-07:00"
          },
          "CustomField": [],
          "DocNumber": "178",
          "TxnDate": "2023-06-17",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2370",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Speedglas™ Welding Helmet G5-01VC With Welding Lens And Heavy Duty Adflo Respirator",
              "Amount": 5108.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-17",
                "TaxInclusiveAmt": 5619.8,
                "ItemRef": {
                  "value": "149",
                  "name": "BOC:Speedglas™ Welding Helmet G5-01VC With Welding Lens And Heavy Duty Adflo Respirator"
                },
                "UnitPrice": 2554.455,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 5108.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 510.89,
            "TaxLine": [
              {
                "Amount": 510.89,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 5108.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "134",
            "name": "Evolution Mining Services"
          },
          "CustomerMemo": {
            "value": "PO# W1249508\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "143",
            "Line1": "Level 24, 175 Liverpool Street",
            "Line2": "Sydney, NSW 2000",
            "City": "Sydney",
            "Country": "Australia",
            "CountrySubDivisionCode": "NSW",
            "PostalCode": "2000"
          },
          "ShipAddr": {
            "Id": "143",
            "Line1": "Level 24, 175 Liverpool Street",
            "Line2": "Sydney, NSW 2000",
            "City": "Sydney",
            "Country": "Australia",
            "CountrySubDivisionCode": "NSW",
            "PostalCode": "2000"
          },
          "FreeFormAddress": false,
          "SalesTermRef": {
            "value": "7"
          },
          "DueDate": "2023-07-17",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 5619.8,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mgo.invoices@evolutionmining.com"
          },
          "BillEmailCc": {
            "Address": "matthew.haines@evolutionmining.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-16T14:10:22-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2331",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-05T06:25:44-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "189",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "STERLING STRAIGHT CUT AVIATION\nTIN SNIPS",
              "Amount": 72.51,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 79.76,
                "ItemRef": {
                  "value": "157",
                  "name": "STERLING STRAIGHT CUT TIN SNIPS"
                },
                "UnitPrice": 36.255,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 72.51,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 7.25,
            "TaxLine": [
              {
                "Amount": 7.25,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 72.51
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158557\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 79.76,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-05T06:25:46-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2330",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-05T06:17:52-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "188",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CF2150BL5KN01",
              "Amount": 1401.05,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 1541.16,
                "ItemRef": {
                  "value": "65",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 150W"
                },
                "UnitPrice": 350.2625,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1401.05,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 140.11,
            "TaxLine": [
              {
                "Amount": 140.11,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1401.05
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158604\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1541.16,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-05T06:17:55-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2329",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-05T06:15:10-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "187",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "SIR05M90423\nSOUNDER BEACON SIR-EJ 11 TONE",
              "Amount": 416.08,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 457.69,
                "ItemRef": {
                  "value": "155",
                  "name": "SOUNDER BEACON"
                },
                "UnitPrice": 416.08,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "SIR01M90345\nBASE DEEP SIR-E/SIR-EJ 12-24VA",
              "Amount": 53.34,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 58.67,
                "ItemRef": {
                  "value": "156",
                  "name": "BASE DEEP"
                },
                "UnitPrice": 53.34,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 469.42,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 46.94,
            "TaxLine": [
              {
                "Amount": 46.94,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 469.42
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158558\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 516.36,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-05T06:15:14-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2328",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-05T06:10:46-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "186",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CABAC K684/T 400MM\nRATCHETING CABLE CUTTER",
              "Amount": 262,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 288.2,
                "ItemRef": {
                  "value": "154",
                  "name": "CABAC RATCHETING CABLE CUTTER"
                },
                "UnitPrice": 262,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 262,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 26.2,
            "TaxLine": [
              {
                "Amount": 26.2,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 262
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158573\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 288.2,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-05T06:10:55-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2327",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-05T06:05:45-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "185",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "IPSSSR404020",
              "Amount": 1480,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 1628,
                "ItemRef": {
                  "value": "17",
                  "name": "STAINLESS STEEL ENCLOSURE"
                },
                "UnitPrice": 1480,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1480,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 148,
            "TaxLine": [
              {
                "Amount": 148,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1480
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158387\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1628,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-05T06:05:47-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2326",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-05T06:02:14-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "184",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "12V CTEK BATTERY CHARGER - MXS25 12VOLT",
              "Amount": 612,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 673.2,
                "ItemRef": {
                  "value": "72",
                  "name": "BAXTERS MTQ:12V CTEK BATTERY CHARGER"
                },
                "UnitPrice": 612,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CF250BL5KN02",
              "Amount": 581,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-06",
                "TaxInclusiveAmt": 639.1,
                "ItemRef": {
                  "value": "86",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 50W"
                },
                "UnitPrice": 290.5,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1193,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 119.3,
            "TaxLine": [
              {
                "Amount": 119.3,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1193
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158493 \n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1312.3,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-05T06:02:21-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2308",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-07-04T19:50:16-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "183",
          "TxnDate": "2023-07-05",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "IP-L027 8MM DOOR LATCH S/S",
              "Amount": 593.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-07-05",
                "TaxInclusiveAmt": 653.3,
                "ItemRef": {
                  "value": "153",
                  "name": "POWER CONTROL:IP-L027 8MM DOOR LATCH S/S"
                },
                "UnitPrice": 59.391,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 593.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 59.39,
            "TaxLine": [
              {
                "Amount": 59.39,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 593.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158752\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-12",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 653.3,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-07-04T19:50:20-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2293",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-27T21:24:40-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "182",
          "TxnDate": "2023-06-28",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CONCEPT/PREM PBOARD DIN-T 24W\n250A MSW 3M-648MM ORG",
              "Amount": 4251.25,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-28",
                "TaxInclusiveAmt": 4676.38,
                "ItemRef": {
                  "value": "152",
                  "name": "NHP:CPR24M250O"
                },
                "UnitPrice": 4251.25,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 4251.25,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 425.13,
            "TaxLine": [
              {
                "Amount": 425.13,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 4251.25
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158135\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-05",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 4676.38,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-27T21:24:43-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2271",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-24T18:40:49-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "180",
          "TxnDate": "2023-06-25",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "BE40WHXKN01",
              "Amount": 1371.75,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-25",
                "TaxInclusiveAmt": 1508.92,
                "ItemRef": {
                  "value": "66",
                  "name": "INTEGRATED POWER:1200 BE SERIES INDOOR LED"
                },
                "UnitPrice": 97.9821429,
                "Qty": 14,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CF2150BL5KN01",
              "Amount": 700.53,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-25",
                "TaxInclusiveAmt": 770.58,
                "ItemRef": {
                  "value": "65",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 150W"
                },
                "UnitPrice": 350.265,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE 9",
              "Amount": 496.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-25",
                "TaxInclusiveAmt": 546.48,
                "ItemRef": {
                  "value": "44",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 9"
                },
                "UnitPrice": 6.9,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 11 2XL",
              "Amount": 360,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-25",
                "TaxInclusiveAmt": 396,
                "ItemRef": {
                  "value": "62",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  11"
                },
                "UnitPrice": 6,
                "Qty": 60,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2929.08,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 292.9,
            "TaxLine": [
              {
                "Amount": 292.9,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2929.08
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158387\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-02",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 3221.98,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "sritchie@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-24T18:40:52-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2226",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-13T17:24:29-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "176",
          "TxnDate": "2023-06-14",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE10",
              "Amount": 496.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 546.48,
                "ItemRef": {
                  "value": "43",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 10"
                },
                "UnitPrice": 6.9,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 496.8,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 49.68,
            "TaxLine": [
              {
                "Amount": 49.68,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 496.8
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158147\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-21",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 546.48,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com, astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-13T17:24:38-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2217",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-12T23:07:35-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "175",
          "TxnDate": "2023-06-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Tyvek 500 (L)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "TYVEK 500 (XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "TYVEK 500 (2XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "11",
                  "name": "COVERALLS (2XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "TYVEK 500 (3XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "12",
                  "name": "COVERALLS (3XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE MEDIUM",
              "Amount": 237.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 261.6,
                "ItemRef": {
                  "value": "26",
                  "name": "PARAMOUNT SAFETY:CGL41NM"
                },
                "UnitPrice": 4.9545833,
                "Qty": 48,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE LARGE",
              "Amount": 356.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 392.4,
                "ItemRef": {
                  "value": "25",
                  "name": "PARAMOUNT SAFETY:CGL41NL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE XL",
              "Amount": 118.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-14",
                "TaxInclusiveAmt": 130.8,
                "ItemRef": {
                  "value": "27",
                  "name": "PARAMOUNT SAFETY:CGL41NXL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 24,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2323.46,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 232.34,
            "TaxLine": [
              {
                "Amount": 232.34,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2323.46
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158236\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2555.8,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com, astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-12T23:07:37-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2216",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-12T22:58:14-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "174",
          "TxnDate": "2023-06-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CHICAGO PNEUMATIC IMPACT WRENCH",
              "Amount": 1925.29,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-13",
                "TaxInclusiveAmt": 2117.82,
                "ItemRef": {
                  "value": "108",
                  "name": "CHICAGO PNEUMATIC AUSTRALIA:CHICAGO PNEUMATIC IMPACT WRENCH"
                },
                "UnitPrice": 1925.29,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1925.29,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 192.53,
            "TaxLine": [
              {
                "Amount": 192.53,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1925.29
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158024\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2117.82,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com, astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-12T22:58:18-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2215",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-12T19:50:04-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "173",
          "TxnDate": "2023-06-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "LQH300W-64243011\n300w 240v R7s 118mm\ndouble jacket",
              "Amount": 680,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-13",
                "TaxInclusiveAmt": 748,
                "ItemRef": {
                  "value": "142",
                  "name": "LQH 300W 64243011"
                },
                "UnitPrice": 68,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 680,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 68,
            "TaxLine": [
              {
                "Amount": 68,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 680
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158157\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 748,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com, astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-12T19:50:07-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2214",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-12T19:46:32-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "172",
          "TxnDate": "2023-06-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CF2150BL5KN01",
              "Amount": 1401.05,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-13",
                "TaxInclusiveAmt": 1541.16,
                "ItemRef": {
                  "value": "65",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 150W"
                },
                "UnitPrice": 350.2625,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1401.05,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 140.11,
            "TaxLine": [
              {
                "Amount": 140.11,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1401.05
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158173\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1541.16,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com.au"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com, astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-12T19:46:36-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2213",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-12T19:43:24-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "171",
          "TxnDate": "2023-06-13",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "MOTOR AC 11KW 4P 415V 19.8A 1460RPM D160M FRAME FOOT MOUNT",
              "Amount": 2360,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-20",
                "TaxInclusiveAmt": 2596,
                "ItemRef": {
                  "value": "141",
                  "name": "004/H0011D4R"
                },
                "UnitPrice": 1180,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2360,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 236,
            "TaxLine": [
              {
                "Amount": 236,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2360
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158182\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-20",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2596,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com, astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-12T19:43:30-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2212",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-10T05:41:08-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "170",
          "TxnDate": "2023-06-10",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "240W LED FLOODLIGHT, 4000K, 80CRI,ASEMMETRIC OPTIC",
              "Amount": 3600,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-11",
                "TaxInclusiveAmt": 3960,
                "ItemRef": {
                  "value": "58",
                  "name": "INTEGRATED POWER:240W LED FLOODLIGHT"
                },
                "UnitPrice": 900,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CF2150BL5KN01",
              "Amount": 1401.05,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-11",
                "TaxInclusiveAmt": 1541.16,
                "ItemRef": {
                  "value": "65",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 150W"
                },
                "UnitPrice": 350.2625,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 5001.05,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 500.11,
            "TaxLine": [
              {
                "Amount": 500.11,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 5001.05
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158173\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-17",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 5501.16,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-10T05:41:11-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2211",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-09T05:58:24-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "169",
          "TxnDate": "2023-06-09",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "MS16PPM060020 M6 X 20MM",
              "Amount": 43.47,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 47.82,
                "ItemRef": {
                  "value": "130",
                  "name": "HOBSON:MS16PPM060020 M6 X 20MM"
                },
                "UnitPrice": 21.735,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "MS16PPM060030 M6 X 30MM",
              "Amount": 53.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 59.2,
                "ItemRef": {
                  "value": "131",
                  "name": "HOBSON:MS16PPM060030 M6 X 30MM"
                },
                "UnitPrice": 26.91,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "MS16PPM060050 M6 X 50MM",
              "Amount": 55.87,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 61.46,
                "ItemRef": {
                  "value": "132",
                  "name": "HOBSON:MS16PPM060050 M6 X 50MM"
                },
                "UnitPrice": 27.935,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "MS16PPM040020 M4 X 20",
              "Amount": 16.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 18.48,
                "ItemRef": {
                  "value": "133",
                  "name": "HOBSON:MS16PPM040020 M4 X 20"
                },
                "UnitPrice": 8.4,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "MS16PPM040030 M4 X 30MM",
              "Amount": 31.04,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 34.14,
                "ItemRef": {
                  "value": "134",
                  "name": "HOBSON:MS16PPM040030 M4 X 30MM"
                },
                "UnitPrice": 15.52,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "MS16PPM040050 M4 X 50MM",
              "Amount": 44.64,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 49.1,
                "ItemRef": {
                  "value": "135",
                  "name": "HOBSON:MS16PPM040050 M4 X 50MM"
                },
                "UnitPrice": 22.32,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "T9PMYAP0818012 WAFER G8",
              "Amount": 19.72,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 21.69,
                "ItemRef": {
                  "value": "136",
                  "name": "HOBSON:T9PMYAP0818012 WAFER G8"
                },
                "UnitPrice": 19.72,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "8",
              "LineNum": 8,
              "Description": "T9PMYAP0818020 WFER G8",
              "Amount": 26.04,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 28.64,
                "ItemRef": {
                  "value": "137",
                  "name": "HOBSON:T9PMYAP0818020 WFER G8"
                },
                "UnitPrice": 26.04,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "9",
              "LineNum": 9,
              "Description": "T9PDYRP0809020 WOOD SCREW",
              "Amount": 17.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 19.44,
                "ItemRef": {
                  "value": "138",
                  "name": "HOBSON:T9PDYRP0809020 WOOD SCREW"
                },
                "UnitPrice": 17.67,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "10",
              "LineNum": 10,
              "Description": "T9DYRP0809032 WOOD SCREW",
              "Amount": 16.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 18.34,
                "ItemRef": {
                  "value": "139",
                  "name": "HOBSON:T9DYRP0809032 WOOD SCREW"
                },
                "UnitPrice": 16.67,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "11",
              "LineNum": 11,
              "Description": "T9PDYRP0809051 WOOD SCREW",
              "Amount": 25.5,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-10",
                "TaxInclusiveAmt": 28.05,
                "ItemRef": {
                  "value": "140",
                  "name": "HOBSON:T9PDYRP0809051 WOOD SCREW"
                },
                "UnitPrice": 25.5,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 351.24,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 35.12,
            "TaxLine": [
              {
                "Amount": 35.12,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 351.24
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158079\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-16",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 386.36,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-09T05:58:28-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2161",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-07T05:21:31-07:00",
            "LastUpdatedTime": "2023-07-14T03:09:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "165",
          "TxnDate": "2023-06-07",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2361",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Bermad DN50 WP Dynamic\nTurbine water meter\nWPD50-50/16/200",
              "Amount": 2745,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-09",
                "TaxInclusiveAmt": 3019.5,
                "ItemRef": {
                  "value": "124",
                  "name": "GALVINS:Bermad Turbine water meter"
                },
                "UnitPrice": 915,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2745,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 274.5,
            "TaxLine": [
              {
                "Amount": 274.5,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2745
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157765\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-14",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 3019.5,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-07T05:21:56-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2282",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-26T21:21:59-07:00",
            "LastUpdatedTime": "2023-07-11T04:41:40-07:00"
          },
          "CustomField": [],
          "DocNumber": "181",
          "TxnDate": "2023-06-27",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2336",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CP-135-1 Premium Off Grid\nDiesel Generator 13.2KVA\nsingle phase 2 wire auto start",
              "Amount": 10509.08,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-27",
                "TaxInclusiveAmt": 11559.99,
                "ItemRef": {
                  "value": "128",
                  "name": "Commodore:Off Grid Diesel Generator"
                },
                "UnitPrice": 10509.08,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 10509.08,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 1050.91,
            "TaxLine": [
              {
                "Amount": 1050.91,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 10509.08
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158180\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-07-04",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 11559.99,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-26T21:22:03-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2257",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-20T23:17:46-07:00",
            "LastUpdatedTime": "2023-07-11T04:41:16-07:00"
          },
          "CustomField": [],
          "DocNumber": "179",
          "TxnDate": "2023-06-21",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2335",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "9AH 12V SLA BATTERY",
              "Amount": 130.42,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-22",
                "TaxInclusiveAmt": 143.46,
                "ItemRef": {
                  "value": "150",
                  "name": "12V BATTERY"
                },
                "UnitPrice": 65.21,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 130.42,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 13.04,
            "TaxLine": [
              {
                "Amount": 13.04,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 130.42
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158313\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-28",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 143.46,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-20T23:17:53-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2231",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-16T04:00:38-07:00",
            "LastUpdatedTime": "2023-07-11T04:40:43-07:00"
          },
          "CustomField": [],
          "DocNumber": "177",
          "TxnDate": "2023-06-16",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2334",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "NYLON TIE S/D 300X4.8MM UV BLACK PK100\n300mm x 4.8mm\nUV Black",
              "Amount": 23.42,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-16",
                "TaxInclusiveAmt": 25.76,
                "ItemRef": {
                  "value": "143",
                  "name": "CARROLL:CT280B"
                },
                "UnitPrice": 5.855,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CABLE ELECT 4MM ORG CIRC 3C+E 0.6/1KV 7/0.85 (DRUM/200M)",
              "Amount": 852,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-16",
                "TaxInclusiveAmt": 937.2,
                "ItemRef": {
                  "value": "145",
                  "name": "ELECTRA CABLES:SRC3040+E+B"
                },
                "UnitPrice": 852,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "CABLE ELECT 6MM ORG CIRC 3C+E 0.6/1KV 7/0.85 (DRUM/200M)",
              "Amount": 1134,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-16",
                "TaxInclusiveAmt": 1247.4,
                "ItemRef": {
                  "value": "146",
                  "name": "ELECTRA CABLES:SRC3060+E+B"
                },
                "UnitPrice": 1134,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "CABLE ELECT 10MM ORG CIRC 3C+E 0.6/1KV 7/0.85 (DRUM/200M)",
              "Amount": 1870,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-16",
                "TaxInclusiveAmt": 2057,
                "ItemRef": {
                  "value": "147",
                  "name": "ELECTRA CABLES:XLPE3100E-BORE"
                },
                "UnitPrice": 1870,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 3879.42,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 387.94,
            "TaxLine": [
              {
                "Amount": 387.94,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 3879.42
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 158147\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-23",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 4267.36,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com, sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-16T04:00:44-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2156",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-03T00:07:30-07:00",
            "LastUpdatedTime": "2023-07-11T04:37:25-07:00"
          },
          "CustomField": [],
          "DocNumber": "160",
          "TxnDate": "2023-06-03",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2333",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "DULUX 4L ENAMEL PRIMER",
              "Amount": 854.33,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-04",
                "TaxInclusiveAmt": 939.76,
                "ItemRef": {
                  "value": "121",
                  "name": "DULUX PAINT:DULUX 4L ENAMEL PRIMER"
                },
                "UnitPrice": 213.5825,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "DULUX 4L METAL SHIELD RAFFIA X31",
              "Amount": 494.76,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-04",
                "TaxInclusiveAmt": 544.24,
                "ItemRef": {
                  "value": "122",
                  "name": "DULUX PAINT:DULUX 4L METAL SHIELD RAFFIA X31"
                },
                "UnitPrice": 123.69,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1349.09,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 134.91,
            "TaxLine": [
              {
                "Amount": 134.91,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1349.09
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "134",
            "name": "Evolution Mining Services"
          },
          "CustomerMemo": {
            "value": "PO# W1 249415\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "143",
            "Line1": "Level 24, 175 Liverpool Street",
            "Line2": "Sydney, NSW 2000",
            "City": "Sydney",
            "Country": "Australia",
            "CountrySubDivisionCode": "NSW",
            "PostalCode": "2000"
          },
          "ShipAddr": {
            "Id": "143",
            "Line1": "Level 24, 175 Liverpool Street",
            "Line2": "Sydney, NSW 2000",
            "City": "Sydney",
            "Country": "Australia",
            "CountrySubDivisionCode": "NSW",
            "PostalCode": "2000"
          },
          "FreeFormAddress": false,
          "SalesTermRef": {
            "value": "7"
          },
          "DueDate": "2023-07-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1484,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mgo.invoices@evolutionmining.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-03T00:08:01-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2163",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-07T19:56:31-07:00",
            "LastUpdatedTime": "2023-06-26T04:47:41-07:00"
          },
          "CustomField": [],
          "DocNumber": "167",
          "TxnDate": "2023-06-08",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2276",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Supply Solar pumping System\nfor TSF2 groundwater recovery\nas per quote CTL30032023-14",
              "Amount": 59950.11,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-09",
                "TaxInclusiveAmt": 65945.12,
                "ItemRef": {
                  "value": "127",
                  "name": "Commodore:Solar pumping System"
                },
                "UnitPrice": 59950.11,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 59950.11,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 5995.01,
            "TaxLine": [
              {
                "Amount": 5995.01,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 59950.11
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157022\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-15",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 65945.12,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "slayton@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-07T19:56:40-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2162",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-07T05:26:46-07:00",
            "LastUpdatedTime": "2023-06-26T04:47:25-07:00"
          },
          "CustomField": [],
          "DocNumber": "166",
          "TxnDate": "2023-06-07",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2275",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Submersible solar pump system\nincluding:\nBrushless DC multistage\npumps\n80m 3-core heavy duty power\ncable\nTrina Vertex 425W solar panel",
              "Amount": 10949.07,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-13",
                "TaxInclusiveAmt": 12043.98,
                "ItemRef": {
                  "value": "126",
                  "name": "Commodore:Solar water pump"
                },
                "UnitPrice": 5474.535,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 10949.07,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 1094.91,
            "TaxLine": [
              {
                "Amount": 1094.91,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 10949.07
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157736\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-14",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 12043.98,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-07T05:26:55-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2160",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-06T05:51:10-07:00",
            "LastUpdatedTime": "2023-06-26T04:47:06-07:00"
          },
          "CustomField": [],
          "DocNumber": "164",
          "TxnDate": "2023-06-06",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2274",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Borehole Well Water Pump",
              "Amount": 3399.65,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-07",
                "TaxInclusiveAmt": 3739.62,
                "ItemRef": {
                  "value": "18",
                  "name": "SPWP02246"
                },
                "UnitPrice": 1699.825,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 3399.65,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 339.97,
            "TaxLine": [
              {
                "Amount": 339.97,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 3399.65
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157598\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-13",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 3739.62,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-06T05:52:30-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2159",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-06T05:43:12-07:00",
            "LastUpdatedTime": "2023-06-26T04:46:41-07:00"
          },
          "CustomField": [],
          "DocNumber": "163",
          "TxnDate": "2023-06-06",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2273",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "LOCTITE 243 THREADLOCKER 50ML",
              "Amount": 45.34,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-07",
                "TaxInclusiveAmt": 49.87,
                "ItemRef": {
                  "value": "114",
                  "name": "LOCTITE 243 THREADLOCKER 50ML"
                },
                "UnitPrice": 45.34,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "LOCTITE 567 THREAD SEALANT PIPE MASTER 50ML",
              "Amount": 115.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-07",
                "TaxInclusiveAmt": 127.4,
                "ItemRef": {
                  "value": "115",
                  "name": "LOCTITE 567 THREAD SEALANT PIPE MASTER 50ML"
                },
                "UnitPrice": 28.955,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "DRILL BIT HSS JOBBER 6MM",
              "Amount": 45,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-07",
                "TaxInclusiveAmt": 49.5,
                "ItemRef": {
                  "value": "116",
                  "name": "DRILL BIT HSS JOBBER 6MM"
                },
                "UnitPrice": 4.5,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "DRILL BIT HSS JOBBER 12.5MM",
              "Amount": 50.95,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-07",
                "TaxInclusiveAmt": 56.05,
                "ItemRef": {
                  "value": "117",
                  "name": "DRILL BIT HSS JOBBER 12.5MM"
                },
                "UnitPrice": 10.19,
                "Qty": 5,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 257.11,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 25.71,
            "TaxLine": [
              {
                "Amount": 25.71,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 257.11
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157878\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-13",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 282.82,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-06T05:43:40-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2043",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-16T22:39:53-07:00",
            "LastUpdatedTime": "2023-06-26T04:46:04-07:00"
          },
          "CustomField": [],
          "DocNumber": "153",
          "TxnDate": "2023-05-17",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2272",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CHICAGO PNEUMATIC IMPACT WRENCH",
              "Amount": 1925.29,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-17",
                "TaxInclusiveAmt": 2117.82,
                "ItemRef": {
                  "value": "108",
                  "name": "CHICAGO PNEUMATIC AUSTRALIA:CHICAGO PNEUMATIC IMPACT WRENCH"
                },
                "UnitPrice": 1925.29,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1925.29,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 192.53,
            "TaxLine": [
              {
                "Amount": 192.53,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1925.29
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 290248\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-24",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2117.82,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com, admin@ctlservices.com.au"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-18T22:40:18-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2141",
          "SyncToken": "4",
          "MetaData": {
            "CreateTime": "2023-05-30T05:37:27-07:00",
            "LastUpdatedTime": "2023-06-17T16:45:34-07:00"
          },
          "CustomField": [],
          "DocNumber": "157",
          "TxnDate": "2023-05-30",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2237",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE MEDIUM",
              "Amount": 118.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-31",
                "TaxInclusiveAmt": 130.8,
                "ItemRef": {
                  "value": "26",
                  "name": "PARAMOUNT SAFETY:CGL41NM"
                },
                "UnitPrice": 4.9545833,
                "Qty": 24,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "FACESHIELD CLEAR VISOR RATCHET HARNESS",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "113",
                  "name": "PARAMOUNT SAFETY:FACESHIELD CLEAR VISOR RATCHET HARNESS"
                },
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "LOCTITE 243 THREADLOCKER 50ML",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "114",
                  "name": "LOCTITE 243 THREADLOCKER 50ML"
                },
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "LOCTITE 567 THREAD SEALANT PIPE MASTER 50ML",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "115",
                  "name": "LOCTITE 567 THREAD SEALANT PIPE MASTER 50ML"
                },
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "DRILL BIT HSS JOBBER 6MM",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "116",
                  "name": "DRILL BIT HSS JOBBER 6MM"
                },
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "DRILL BIT HSS JOBBER 12.5MM",
              "Amount": 0,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "TaxInclusiveAmt": 0,
                "ItemRef": {
                  "value": "117",
                  "name": "DRILL BIT HSS JOBBER 12.5MM"
                },
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 10 XL CUT 5",
              "Amount": 936,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-31",
                "TaxInclusiveAmt": 1029.6,
                "ItemRef": {
                  "value": "73",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  10"
                },
                "UnitPrice": 6,
                "Qty": 156,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1054.91,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 105.49,
            "TaxLine": [
              {
                "Amount": 105.49,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1054.91
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157878\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-06",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1160.4,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "accounts@ctlservices.com.au"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-12T15:48:42-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2042",
          "SyncToken": "3",
          "MetaData": {
            "CreateTime": "2023-05-13T13:24:08-07:00",
            "LastUpdatedTime": "2023-06-17T16:45:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "152",
          "TxnDate": "2023-05-14",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2236",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "006/0055D4S\nMOTOR 55KW 4P 415V 1485RPM\nD250SC FRAME FOOT",
              "Amount": 5633.27,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-10",
                "TaxInclusiveAmt": 6196.6,
                "ItemRef": {
                  "value": "91",
                  "name": "TECO MOTORS:55KW AC MOTOR"
                },
                "UnitPrice": 5633.27,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 5633.27,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 563.33,
            "TaxLine": [
              {
                "Amount": 563.33,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 5633.27
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156320\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-21",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 6196.6,
          "PrintStatus": "NotSet",
          "EmailStatus": "NotSet",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-18T21:27:00-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2143",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-06-01T01:23:22-07:00",
            "LastUpdatedTime": "2023-06-09T05:37:33-07:00"
          },
          "CustomField": [],
          "DocNumber": "159",
          "TxnDate": "2023-06-01",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2210",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "FACESHIELD CLEAR VISOR RATCHET HARNESS",
              "Amount": 477.81,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-02",
                "TaxInclusiveAmt": 525.59,
                "ItemRef": {
                  "value": "113",
                  "name": "PARAMOUNT SAFETY:FACESHIELD CLEAR VISOR RATCHET HARNESS"
                },
                "UnitPrice": 36.7546154,
                "Qty": 13,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 477.81,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 47.78,
            "TaxLine": [
              {
                "Amount": 47.78,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 477.81
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157878\nIN157 + IN159 + IN163\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 525.59,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-06T05:46:41-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2142",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-06-01T00:43:20-07:00",
            "LastUpdatedTime": "2023-06-09T05:37:21-07:00"
          },
          "CustomField": [],
          "DocNumber": "158",
          "TxnDate": "2023-06-01",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2209",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RATCHET STRAP - 5MT\n44557-7",
              "Amount": 149.38,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-02",
                "TaxInclusiveAmt": 164.32,
                "ItemRef": {
                  "value": "118",
                  "name": "RATCHET STRAP"
                },
                "UnitPrice": 9.33625,
                "Qty": 16,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "RATCHET STRAP - 50MM\n50000 - 12",
              "Amount": 37.25,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-06-02",
                "TaxInclusiveAmt": 40.98,
                "ItemRef": {
                  "value": "119",
                  "name": "RATCHET STRAP 50MM"
                },
                "UnitPrice": 18.625,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 186.63,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 18.67,
            "TaxLine": [
              {
                "Amount": 18.67,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 186.63
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO#157689\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-06-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 205.3,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-06-01T00:48:14-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2105",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-23T21:48:54-07:00",
            "LastUpdatedTime": "2023-06-02T23:47:49-07:00"
          },
          "CustomField": [],
          "DocNumber": "156",
          "TxnDate": "2023-05-24",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2155",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE MEDIUM",
              "Amount": 237.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 261.6,
                "ItemRef": {
                  "value": "26",
                  "name": "PARAMOUNT SAFETY:CGL41NM"
                },
                "UnitPrice": 4.9545833,
                "Qty": 48,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE LARGE",
              "Amount": 356.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 392.4,
                "ItemRef": {
                  "value": "25",
                  "name": "PARAMOUNT SAFETY:CGL41NL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE XL",
              "Amount": 356.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 392.4,
                "ItemRef": {
                  "value": "27",
                  "name": "PARAMOUNT SAFETY:CGL41NXL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "Tyvek 500 (L)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "TYVEK 500 (XL)",
              "Amount": 690,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 759,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 75,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "6",
              "LineNum": 6,
              "Description": "TYVEK 500 (2XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "11",
                  "name": "COVERALLS (2XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "7",
              "LineNum": 7,
              "Description": "TYVEK 500 (3XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "12",
                  "name": "COVERALLS (3XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "8",
              "LineNum": 8,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE 2XL",
              "Amount": 118.91,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 130.8,
                "ItemRef": {
                  "value": "34",
                  "name": "PARAMOUNT SAFETY:CGL41N2XL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 24,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "9",
              "LineNum": 9,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 8",
              "Amount": 1080,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 1188,
                "ItemRef": {
                  "value": "112",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  8"
                },
                "UnitPrice": 6,
                "Qty": 180,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "10",
              "LineNum": 10,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 9 L CUT 5",
              "Amount": 1440,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 1584,
                "ItemRef": {
                  "value": "87",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  9"
                },
                "UnitPrice": 6,
                "Qty": 240,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "11",
              "LineNum": 11,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 10 XL CUT 5",
              "Amount": 1008,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 1108.8,
                "ItemRef": {
                  "value": "73",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  10"
                },
                "UnitPrice": 6,
                "Qty": 168,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "12",
              "LineNum": 12,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 11 2XL",
              "Amount": 360,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 396,
                "ItemRef": {
                  "value": "62",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  11"
                },
                "UnitPrice": 6,
                "Qty": 60,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 6798.19,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 679.81,
            "TaxLine": [
              {
                "Amount": 679.81,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 6798.19
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157619\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-31",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 7478,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-23T21:48:56-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2104",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-23T21:35:43-07:00",
            "LastUpdatedTime": "2023-06-02T23:47:38-07:00"
          },
          "CustomField": [],
          "DocNumber": "155",
          "TxnDate": "2023-05-24",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2154",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "OSLO 96 PIECE CUTLERY SET",
              "Amount": 392.4,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 431.64,
                "ItemRef": {
                  "value": "111",
                  "name": "CAMP KITCHEN:OSLO 96 PIECE CUTLERY SET"
                },
                "UnitPrice": 65.4,
                "Qty": 6,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 392.4,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 39.24,
            "TaxLine": [
              {
                "Amount": 39.24,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 392.4
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157252\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-31",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 431.64,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-23T21:35:46-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2103",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-23T21:32:07-07:00",
            "LastUpdatedTime": "2023-06-02T23:47:26-07:00"
          },
          "CustomField": [],
          "DocNumber": "154",
          "TxnDate": "2023-05-24",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2153",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "7.5KW TECO MOTOR - 4P - 3PH - 14.2A - 1465 RPM - D132M\n023/0007DF4S",
              "Amount": 1078.66,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-24",
                "TaxInclusiveAmt": 1186.53,
                "ItemRef": {
                  "value": "109",
                  "name": "TECO MOTORS:7.5KW TECO MOTOR - 4P"
                },
                "UnitPrice": 1078.66,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1078.66,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 107.87,
            "TaxLine": [
              {
                "Amount": 107.87,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1078.66
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157460\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-31",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1186.53,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-23T21:32:14-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "1969",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-01T05:22:53-07:00",
            "LastUpdatedTime": "2023-06-02T23:47:09-07:00"
          },
          "CustomField": [],
          "DocNumber": "145",
          "TxnDate": "2023-05-01",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2152",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Borehole Well Water Pump",
              "Amount": 1698.92,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-02",
                "TaxInclusiveAmt": 1868.81,
                "ItemRef": {
                  "value": "18",
                  "name": "SPWP02246"
                },
                "UnitPrice": 1698.92,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1698.92,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 169.89,
            "TaxLine": [
              {
                "Amount": 169.89,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1698.92
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157023\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1868.81,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-01T05:23:00-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "1954",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-04-25T20:02:12-07:00",
            "LastUpdatedTime": "2023-05-29T05:13:55-07:00"
          },
          "CustomField": [],
          "DocNumber": "137",
          "TxnDate": "2023-04-26",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2106",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "SIEMENS CONTROLLER 230V\nLME22.233C2",
              "Amount": 450,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-02",
                "TaxInclusiveAmt": 495,
                "ItemRef": {
                  "value": "100",
                  "name": "SIEMENS:SIEMENS CONTROLLER"
                },
                "UnitPrice": 450,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 450,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 45,
            "TaxLine": [
              {
                "Amount": 45,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 450
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO#156796\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 495,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T20:03:11-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2029",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-09T01:33:13-07:00",
            "LastUpdatedTime": "2023-05-23T04:46:16-07:00"
          },
          "CustomField": [],
          "DocNumber": "151",
          "TxnDate": "2023-05-09",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2089",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "BE40WHXKN01",
              "Amount": 979.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-10",
                "TaxInclusiveAmt": 1077.8,
                "ItemRef": {
                  "value": "66",
                  "name": "INTEGRATED POWER:1200 BE SERIES INDOOR LED"
                },
                "UnitPrice": 97.982,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE 9",
              "Amount": 828,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-10",
                "TaxInclusiveAmt": 910.8,
                "ItemRef": {
                  "value": "44",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 9"
                },
                "UnitPrice": 6.9,
                "Qty": 120,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1807.82,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 180.78,
            "TaxLine": [
              {
                "Amount": 180.78,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1807.82
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157290\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-16",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1988.6,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-09T01:37:04-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2028",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-05T15:56:48-07:00",
            "LastUpdatedTime": "2023-05-23T04:46:04-07:00"
          },
          "CustomField": [],
          "DocNumber": "150",
          "TxnDate": "2023-05-06",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2088",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "STAINLESS STEEL DENSITY BUCKETS\n1 LITRE",
              "Amount": 144,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-03",
                "TaxInclusiveAmt": 158.4,
                "ItemRef": {
                  "value": "106",
                  "name": "ROWE SCIENTIFIC:DENSITY BUCKETS"
                },
                "UnitPrice": 72,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 144,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 14.4,
            "TaxLine": [
              {
                "Amount": 14.4,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 144
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157025\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-13",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 158.4,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-05T16:25:34-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "2027",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-05T15:51:38-07:00",
            "LastUpdatedTime": "2023-05-23T04:45:53-07:00"
          },
          "CustomField": [],
          "DocNumber": "149",
          "TxnDate": "2023-05-06",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2087",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "240W LED FLOODLIGHT, 4000K, 80CRI,ASEMMETRIC OPTIC",
              "Amount": 900,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-06",
                "TaxInclusiveAmt": 990,
                "ItemRef": {
                  "value": "58",
                  "name": "INTEGRATED POWER:240W LED FLOODLIGHT"
                },
                "UnitPrice": 900,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 900,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 90,
            "TaxLine": [
              {
                "Amount": 90,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 900
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157157\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-13",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 990,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-05T15:51:54-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "2026",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-05-05T01:55:04-07:00",
            "LastUpdatedTime": "2023-05-23T04:45:42-07:00"
          },
          "CustomField": [],
          "DocNumber": "148",
          "TxnDate": "2023-05-03",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2086",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "DISSOLVED OXYGEN PROBE \nPORTABLE HANDHELD DISSOLVED OXYGEN & BOD METER WITH DIN \nCONNECTOR AND 4M CABLE",
              "Amount": 1809.79,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-03",
                "TaxInclusiveAmt": 1990.77,
                "ItemRef": {
                  "value": "103",
                  "name": "DISSOLVED OXYGEN PROBE"
                },
                "UnitPrice": 1809.79,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1809.79,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 180.98,
            "TaxLine": [
              {
                "Amount": 180.98,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1809.79
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157030\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-10",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1990.77,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-05T01:55:09-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "1971",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-01T05:36:07-07:00",
            "LastUpdatedTime": "2023-05-23T04:45:19-07:00"
          },
          "CustomField": [],
          "DocNumber": "147",
          "TxnDate": "2023-05-01",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2085",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "WP40GR4KN01",
              "Amount": 734.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-03",
                "TaxInclusiveAmt": 808.2,
                "ItemRef": {
                  "value": "70",
                  "name": "INTEGRATED POWER:1200 WP SERIES OUTDOOR LED"
                },
                "UnitPrice": 73.473,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 734.73,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 73.47,
            "TaxLine": [
              {
                "Amount": 73.47,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 734.73
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156993\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 808.2,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-01T05:36:11-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1970",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-05-01T05:29:22-07:00",
            "LastUpdatedTime": "2023-05-23T04:45:01-07:00"
          },
          "CustomField": [],
          "DocNumber": "146",
          "TxnDate": "2023-05-01",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2084",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "316 STAINLESS STEEL ENCLOSURE 300x300x150",
              "Amount": 699.95,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-03",
                "TaxInclusiveAmt": 769.94,
                "ItemRef": {
                  "value": "20",
                  "name": "IP-SS303015"
                },
                "UnitPrice": 699.95,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "240W LED FLOODLIGHT, 4000K, 80CRI,ASEMMETRIC OPTIC",
              "Amount": 900,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-03",
                "TaxInclusiveAmt": 990,
                "ItemRef": {
                  "value": "58",
                  "name": "INTEGRATED POWER:240W LED FLOODLIGHT"
                },
                "UnitPrice": 900,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1599.95,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 159.99,
            "TaxLine": [
              {
                "Amount": 159.99,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1599.95
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157053\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-08",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1759.94,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-05-01T05:29:25-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1958",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-04-25T21:11:36-07:00",
            "LastUpdatedTime": "2023-05-23T04:44:47-07:00"
          },
          "CustomField": [],
          "DocNumber": "141",
          "TxnDate": "2023-05-03",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2083",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "VERTEX 2 WAY HAND PIECE\nVX2200-G7-25",
              "Amount": 189.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-03",
                "TaxInclusiveAmt": 208.78,
                "ItemRef": {
                  "value": "102",
                  "name": "VERTEX:VERTEX 2 WAY HAND PIECE"
                },
                "UnitPrice": 189.8,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 189.8,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 18.98,
            "TaxLine": [
              {
                "Amount": 18.98,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 189.8
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156841\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-10",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 208.78,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T21:13:10-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1968",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-04-29T01:36:22-07:00",
            "LastUpdatedTime": "2023-05-12T03:23:22-07:00"
          },
          "CustomField": [],
          "DocNumber": "144",
          "TxnDate": "2023-04-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2041",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Tyvek 500 (L)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-30",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "TYVEK 500 (XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-30",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "TYVEK 500 (2XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-30",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "11",
                  "name": "COVERALLS (2XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "SAFETY GLASSES 1600 - CLEAR",
              "Amount": 269.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-30",
                "TaxInclusiveAmt": 296.64,
                "ItemRef": {
                  "value": "46",
                  "name": "PARAMOUNT SAFETY:PARAMOUNT SAFETY 1600 CLEAR"
                },
                "UnitPrice": 1.8727083,
                "Qty": 144,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "5",
              "LineNum": 5,
              "Description": "SAFETY GLASSES 1600 SMOKE",
              "Amount": 269.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-30",
                "TaxInclusiveAmt": 296.64,
                "ItemRef": {
                  "value": "47",
                  "name": "PARAMOUNT SAFETY:PARAMOUNT SAFETY 1600 SMOKE"
                },
                "UnitPrice": 1.8727083,
                "Qty": 144,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1229.34,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 122.94,
            "TaxLine": [
              {
                "Amount": 122.94,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1229.34
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157036\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-06",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1352.28,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-29T01:56:45-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1960",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-04-28T19:20:12-07:00",
            "LastUpdatedTime": "2023-05-12T03:22:57-07:00"
          },
          "CustomField": [],
          "DocNumber": "143",
          "TxnDate": "2023-04-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2040",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE MEDIUM",
              "Amount": 237.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-29",
                "TaxInclusiveAmt": 261.6,
                "ItemRef": {
                  "value": "26",
                  "name": "PARAMOUNT SAFETY:CGL41NM"
                },
                "UnitPrice": 4.9545833,
                "Qty": 48,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "RIGGAMATE NATURAL COWGRAIN GLOVES SIZE LARGE",
              "Amount": 356.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-29",
                "TaxInclusiveAmt": 392.4,
                "ItemRef": {
                  "value": "25",
                  "name": "PARAMOUNT SAFETY:CGL41NL"
                },
                "UnitPrice": 4.9545833,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "GLOVES PU/NITRILE PALM COATED KNITWRIST CUT 5 SIZE 11 2XL",
              "Amount": 360,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-29",
                "TaxInclusiveAmt": 396,
                "ItemRef": {
                  "value": "62",
                  "name": "PARAMOUNT SAFETY:NITRILE GLOVE SIZE  11"
                },
                "UnitPrice": 6,
                "Qty": 60,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 954.55,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 95.45,
            "TaxLine": [
              {
                "Amount": 95.45,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 954.55
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 157024\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-06",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1050,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-28T19:20:15-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "1959",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-04-28T19:12:46-07:00",
            "LastUpdatedTime": "2023-05-12T03:22:41-07:00"
          },
          "CustomField": [],
          "DocNumber": "142",
          "TxnDate": "2023-04-29",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2039",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "BE40WHXKN01",
              "Amount": 1763.67,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-29",
                "TaxInclusiveAmt": 1940.04,
                "ItemRef": {
                  "value": "66",
                  "name": "INTEGRATED POWER:1200 BE SERIES INDOOR LED"
                },
                "UnitPrice": 97.9816667,
                "Qty": 18,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "WP40GR4KN01",
              "Amount": 220.42,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-29",
                "TaxInclusiveAmt": 242.46,
                "ItemRef": {
                  "value": "70",
                  "name": "INTEGRATED POWER:1200 WP SERIES OUTDOOR LED"
                },
                "UnitPrice": 73.4733333,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1984.09,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 198.41,
            "TaxLine": [
              {
                "Amount": 198.41,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1984.09
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156993\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-06",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2182.5,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "sritchie@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-28T19:13:07-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1957",
          "SyncToken": "3",
          "MetaData": {
            "CreateTime": "2023-04-25T20:59:04-07:00",
            "LastUpdatedTime": "2023-05-12T03:22:21-07:00"
          },
          "CustomField": [],
          "DocNumber": "140",
          "TxnDate": "2023-04-26",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2038",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "CF250BL5KN02",
              "Amount": 1162,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-28",
                "TaxInclusiveAmt": 1278.2,
                "ItemRef": {
                  "value": "86",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 50W"
                },
                "UnitPrice": 290.5,
                "Qty": 4,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 2,
              "Description": "EXCITER OLI MOTOR MVE9000/1",
              "Amount": 6849,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-05-04",
                "TaxInclusiveAmt": 7533.9,
                "ItemRef": {
                  "value": "88",
                  "name": "OLI VIBRATING MOTORS:EXCITER OLI MOTOR MVE9000/1"
                },
                "UnitPrice": 6849,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 8011,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 801.1,
            "TaxLine": [
              {
                "Amount": 801.1,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 8011
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156863\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 8812.1,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T21:05:28-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "1956",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-04-25T20:10:21-07:00",
            "LastUpdatedTime": "2023-05-12T03:21:38-07:00"
          },
          "CustomField": [],
          "DocNumber": "139",
          "TxnDate": "2023-04-26",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2037",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "BE40WHXKN01",
              "Amount": 979.82,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-24",
                "TaxInclusiveAmt": 1077.8,
                "ItemRef": {
                  "value": "66",
                  "name": "INTEGRATED POWER:1200 BE SERIES INDOOR LED"
                },
                "UnitPrice": 97.982,
                "Qty": 10,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 979.82,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 97.98,
            "TaxLine": [
              {
                "Amount": 97.98,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 979.82
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156884\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1077.8,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T20:10:50-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1955",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-04-25T20:07:58-07:00",
            "LastUpdatedTime": "2023-05-12T03:21:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "138",
          "TxnDate": "2023-04-26",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2036",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE 9",
              "Amount": 496.8,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-27",
                "TaxInclusiveAmt": 546.48,
                "ItemRef": {
                  "value": "44",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 9"
                },
                "UnitPrice": 6.9,
                "Qty": 72,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 496.8,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 49.68,
            "TaxLine": [
              {
                "Amount": 49.68,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 496.8
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156898\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 546.48,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T20:08:17-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1953",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-04-25T18:48:12-07:00",
            "LastUpdatedTime": "2023-05-12T03:20:51-07:00"
          },
          "CustomField": [],
          "DocNumber": "136",
          "TxnDate": "2023-04-26",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "2035",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "SMC REDUCERS 6MM X 4MM\nKQ2R06-04A1",
              "Amount": 118.36,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-27",
                "TaxInclusiveAmt": 130.2,
                "ItemRef": {
                  "value": "96",
                  "name": "SMC:SMC REDUCERS 6MM X 4MM"
                },
                "UnitPrice": 5.918,
                "Qty": 20,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "FREIGHT",
              "Amount": 22.73,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-27",
                "TaxInclusiveAmt": 25,
                "ItemRef": {
                  "value": "98",
                  "name": "FREIGHT:FREIGHT"
                },
                "UnitPrice": 22.73,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 141.09,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 14.11,
            "TaxLine": [
              {
                "Amount": 14.11,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 141.09
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156752\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 155.2,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T18:48:54-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1952",
          "SyncToken": "2",
          "MetaData": {
            "CreateTime": "2023-04-25T16:26:43-07:00",
            "LastUpdatedTime": "2023-05-04T22:53:14-07:00"
          },
          "CustomField": [],
          "DocNumber": "135",
          "TxnDate": "2023-04-26",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "1973",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "EXTENDED REAR SHAFT MAIN DRIVE MOTOR\n0.55KW 4P 1405RPM\n100-5947+1014779",
              "Amount": 1642.48,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-26",
                "TaxInclusiveAmt": 1806.73,
                "ItemRef": {
                  "value": "94",
                  "name": "STANTIL:EXTENDED REAR SHAFT MAIN DRIVE MOTOR"
                },
                "UnitPrice": 1642.48,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1642.48,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 164.25,
            "TaxLine": [
              {
                "Amount": 164.25,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1642.48
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 154830\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-05-03",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1806.73,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "jocollins@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-25T16:27:20-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Sent",
          "domain": "QBO",
          "sparse": false,
          "Id": "1942",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-04-19T02:30:34-07:00",
            "LastUpdatedTime": "2023-04-28T19:25:18-07:00"
          },
          "CustomField": [],
          "DocNumber": "134",
          "TxnDate": "2023-04-19",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "1964",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "12V CTEK BATTERY CHARGER - MXS25 12VOLT",
              "Amount": 1224,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-19",
                "TaxInclusiveAmt": 1346.4,
                "ItemRef": {
                  "value": "72",
                  "name": "BAXTERS MTQ:12V CTEK BATTERY CHARGER"
                },
                "UnitPrice": 612,
                "Qty": 2,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1224,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 122.4,
            "TaxLine": [
              {
                "Amount": 122.4,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1224
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156675\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-04-26",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1346.4,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-19T02:30:38-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1903",
          "SyncToken": "1",
          "MetaData": {
            "CreateTime": "2023-04-16T15:40:30-07:00",
            "LastUpdatedTime": "2023-04-28T19:25:11-07:00"
          },
          "CustomField": [],
          "DocNumber": "133",
          "TxnDate": "2023-04-17",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "1963",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "Tyvek 500 (L)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-17",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "9",
                  "name": "COVERALLS"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "TYVEK 500 (XL)",
              "Amount": 230,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-17",
                "TaxInclusiveAmt": 253,
                "ItemRef": {
                  "value": "10",
                  "name": "COVERALLS (XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 25,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "TYVEK 500 (2XL)",
              "Amount": 460,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-17",
                "TaxInclusiveAmt": 506,
                "ItemRef": {
                  "value": "11",
                  "name": "COVERALLS (2XL)"
                },
                "UnitPrice": 9.2,
                "Qty": 50,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "316 STAINLESS STEEL ENCLOSURE 300x300x150",
              "Amount": 699.95,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-17",
                "TaxInclusiveAmt": 769.94,
                "ItemRef": {
                  "value": "20",
                  "name": "IP-SS303015"
                },
                "UnitPrice": 699.95,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1849.95,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 184.99,
            "TaxLine": [
              {
                "Amount": 184.99,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1849.95
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156671\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-04-24",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2034.94,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "swells@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-16T15:40:33-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1895",
          "SyncToken": "3",
          "MetaData": {
            "CreateTime": "2023-04-10T22:27:40-07:00",
            "LastUpdatedTime": "2023-04-28T19:25:00-07:00"
          },
          "CustomField": [],
          "DocNumber": "132",
          "TxnDate": "2023-04-11",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "1962",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "1",
              "LineNum": 1,
              "Description": "WP40GR4KN01",
              "Amount": 73.47,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-12",
                "TaxInclusiveAmt": 80.82,
                "ItemRef": {
                  "value": "70",
                  "name": "INTEGRATED POWER:1200 WP SERIES OUTDOOR LED"
                },
                "UnitPrice": 73.47,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "2",
              "LineNum": 2,
              "Description": "CF250BL5KN02",
              "Amount": 871.5,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-12",
                "TaxInclusiveAmt": 958.65,
                "ItemRef": {
                  "value": "86",
                  "name": "INTEGRATED POWER:LED FLOODLIGHT 50W"
                },
                "UnitPrice": 290.5,
                "Qty": 3,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 3,
              "Description": "240W LED FLOODLIGHT, 4000K, 80CRI,ASEMMETRIC OPTIC",
              "Amount": 900,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-12",
                "TaxInclusiveAmt": 990,
                "ItemRef": {
                  "value": "58",
                  "name": "INTEGRATED POWER:240W LED FLOODLIGHT"
                },
                "UnitPrice": 900,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "4",
              "LineNum": 4,
              "Description": "GLOVE MAXIDRY GAUNTLET SIZE10",
              "Amount": 828,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-12",
                "TaxInclusiveAmt": 910.8,
                "ItemRef": {
                  "value": "43",
                  "name": "MAYO HARDWARE:MAXIDRY GAUNTLET VENT 10"
                },
                "UnitPrice": 6.9,
                "Qty": 120,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 2672.97,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 267.3,
            "TaxLine": [
              {
                "Amount": 267.3,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 2672.97
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156519\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-04-18",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 2940.27,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-16T15:32:47-07:00"
          }
        },
        {
          "AllowIPNPayment": false,
          "AllowOnlinePayment": false,
          "AllowOnlineCreditCardPayment": false,
          "AllowOnlineACHPayment": false,
          "EInvoiceStatus": "Viewed",
          "domain": "QBO",
          "sparse": false,
          "Id": "1850",
          "SyncToken": "4",
          "MetaData": {
            "CreateTime": "2023-04-07T17:38:45-07:00",
            "LastUpdatedTime": "2023-04-28T19:24:46-07:00"
          },
          "CustomField": [],
          "DocNumber": "131",
          "TxnDate": "2023-04-19",
          "CurrencyRef": {
            "value": "AUD",
            "name": "Australian Dollar"
          },
          "LinkedTxn": [
            {
              "TxnId": "1961",
              "TxnType": "Payment"
            }
          ],
          "Line": [
            {
              "Id": "2",
              "LineNum": 1,
              "Description": "102/02.2D2ME\nMOTOR 2.2KW 3P 2875RPM \n90L-2 FRAME",
              "Amount": 399.49,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-12",
                "TaxInclusiveAmt": 439.44,
                "ItemRef": {
                  "value": "92",
                  "name": "TECO MOTORS:2.2KW AC MOTOR"
                },
                "UnitPrice": 399.49,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Id": "3",
              "LineNum": 2,
              "Description": "023/0004DF4S\nMOTOR 4KW 4P D112MD FRAME FOOT/FLANGE",
              "Amount": 795.89,
              "DetailType": "SalesItemLineDetail",
              "SalesItemLineDetail": {
                "ServiceDate": "2023-04-12",
                "TaxInclusiveAmt": 875.48,
                "ItemRef": {
                  "value": "93",
                  "name": "TECO MOTORS:4KW AC MOTOR"
                },
                "UnitPrice": 795.89,
                "Qty": 1,
                "ItemAccountRef": {
                  "value": "4",
                  "name": "0560 Sales"
                },
                "TaxCodeRef": {
                  "value": "5"
                }
              }
            },
            {
              "Amount": 1195.38,
              "DetailType": "SubTotalLineDetail",
              "SubTotalLineDetail": {}
            }
          ],
          "TxnTaxDetail": {
            "TotalTax": 119.54,
            "TaxLine": [
              {
                "Amount": 119.54,
                "DetailType": "TaxLineDetail",
                "TaxLineDetail": {
                  "TaxRateRef": {
                    "value": "3"
                  },
                  "PercentBased": true,
                  "TaxPercent": 10,
                  "NetAmountTaxable": 1195.38
                }
              }
            ]
          },
          "CustomerRef": {
            "value": "104",
            "name": "Sliver Lake Resources"
          },
          "CustomerMemo": {
            "value": "PO# 156320\n\nWe appreciate your business and looking forward to delivering exceptional service again soon."
          },
          "BillAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "ShipAddr": {
            "Id": "138",
            "Line1": "Silver Lake Resources Limited Suite 4, Level 3 South Shore Centre 85 South Perth Esplanade South Perth",
            "City": "Perth",
            "CountrySubDivisionCode": "Western Australia"
          },
          "FreeFormAddress": true,
          "SalesTermRef": {
            "value": "6"
          },
          "DueDate": "2023-04-26",
          "GlobalTaxCalculation": "TaxInclusive",
          "TotalAmt": 1314.92,
          "PrintStatus": "NotSet",
          "EmailStatus": "EmailSent",
          "BillEmail": {
            "Address": "ap@slrltd.com"
          },
          "BillEmailCc": {
            "Address": "mseah@slrltd.com"
          },
          "BillEmailBcc": {
            "Address": "astapp@slrltd.com"
          },
          "Balance": 0,
          "DeliveryInfo": {
            "DeliveryType": "Email",
            "DeliveryTime": "2023-04-18T21:48:55-07:00"
          }
        }
      ],
      "startPosition": 1,
      "maxResults": 100,
      "totalCount": 100
    },
    "time": "2023-09-21T02:45:37.957-07:00"
  }
];

const weathes2 = [
  {
    QueryResponse: {
      Invoice: [
        {
          AllowIPNPayment: false,
          AllowOnlinePayment: false,
          AllowOnlineCreditCardPayment: false,
          AllowOnlineACHPayment: false,
          domain: "QBO",
          sparse: false,
          Id: "151",
          SyncToken: "0",
          MetaData: {
            CreateTime: "2023-09-20T21:48:56-07:00",
            LastModifiedByRef: {
              value: "9130355886942906",
            },
            LastUpdatedTime: "2023-09-20T21:48:56-07:00",
          },
          CustomField: [
            {
              DefinitionId: "1",
              Name: "Crew #",
              Type: "StringType",
            },
          ],
          DocNumber: "112233",
          TxnDate: "2023-09-20",
          CurrencyRef: {
            value: "USD",
            name: "United States Dollar",
          },
          LinkedTxn: [],
          Line: [
            {
              Id: "1",
              LineNum: 1,
              Description: "GLOVES SIZE 8",
              Amount: 720,
              DetailType: "SalesItemLineDetail",
              SalesItemLineDetail: {
                ServiceDate: "2023-08-22",
                ItemRef: {
                  value: "1",
                  name: "Services",
                },
                UnitPrice: 6,
                Qty: 120,
                ItemAccountRef: {
                  value: "1",
                  name: "Services",
                },
                TaxCodeRef: {
                  value: "NON",
                },
              },
            },
            {
              Amount: 720,
              DetailType: "SubTotalLineDetail",
              SubTotalLineDetail: {},
            },
          ],
          TxnTaxDetail: {
            TotalTax: 0,
          },
          CustomerRef: {
            value: "1",
            name: "Amy's Bird Sanctuary",
          },
          BillAddr: {
            Id: "2",
            Line1: "4581 Finch St.",
            City: "Bayshore",
            CountrySubDivisionCode: "CA",
            PostalCode: "94326",
            Lat: "INVALID",
            Long: "INVALID",
          },
          ShipAddr: {
            Id: "2",
            Line1: "4581 Finch St.",
            City: "Bayshore",
            CountrySubDivisionCode: "CA",
            PostalCode: "94326",
            Lat: "INVALID",
            Long: "INVALID",
          },
          FreeFormAddress: true,
          ShipFromAddr: {
            Id: "102",
            Line1: "123 Sierra Way",
            Line2: "San Pablo, CA  87999",
          },
          DueDate: "2023-10-20",
          TotalAmt: 720,
          ApplyTaxAfterDiscount: false,
          PrintStatus: "NeedToPrint",
          EmailStatus: "NotSet",
          Balance: 720,
        },
      ],
      startPosition: 1,
      maxResults: 1,
      totalCount: 1,
    },
    time: "2023-09-20T21:49:07.508-07:00",
  },
];


BHP.AU,
  FMG.AU,
  RIO.AU,
  NCM.AU,
  S32.AU,
  PLS.AU,
  NST.AU,
  MIN.AU,
  IGO.AU,
  AKE.AU,
  BSL.AU,
  LYC.AU,
  EVN.AU,
  LTR.AU,
  ILU.AU,
  AWC.AU,
  CIA.AU,
  SGM.AU,
  AVZ.AU,
  SFR.AU,
  ZIM.AU,
  NIC.AU,
  CRN.AU,
  DRR.AU,
  DEG.AU,
  PRU.AU,
  CHN.AU,
  SMR.AU,
  SYA.AU,
  CXO.AU,
  BGL.AU,
  CMM.AU,
  GOR.AU,
  RRL.AU,
  EMR.AU,
  RMS.AU,
  GMD.AU,
  LLL.AU,
  VSL.AU,
  SLR.AU,
  IMD.AU,
  LRS.AU,
  WAF.AU,
  RSG.AU,
  ADT.AU,
  WGX.AU,
  PRN.AU,
  MCR.AU,
  VUL.AU,
  RED.AU,
  INR.AU,
  ARU.AU,
  DVP.AU,
  GRR.AU,
  AZS.AU,
  SYR.AU,
  PMT.AU,
  TIE.AU,
  AGY.AU,
  TLG.AU;



