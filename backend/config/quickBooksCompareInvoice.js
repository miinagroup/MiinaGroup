const QuickBooksInvoice = [
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
          SyncToken: "4",
          MetaData: {
            CreateTime: "2023-09-20T21:48:56-07:00",
            LastModifiedByRef: {
              value: "9130355886942906",
            },
            LastUpdatedTime: "2023-10-11T20:03:21-07:00",
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
          LinkedTxn: [
            {
              TxnId: "154",
              TxnType: "Payment",
            },
          ],
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
            Id: "103",
            Line1: "123 Sierra Way",
            Line2: "San Pablo, CA 87999",
          },
          DueDate: "2023-10-20",
          TotalAmt: 720,
          ApplyTaxAfterDiscount: false,
          PrintStatus: "NeedToPrint",
          EmailStatus: "NotSet",
          Balance: 0,
        },
      ],
      startPosition: 1,
      maxResults: 1,
      totalCount: 1,
    },
    time: "2023-10-11T20:03:50.903-07:00",
  },
];
