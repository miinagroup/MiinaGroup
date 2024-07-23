const products = [
  // -*************PPE PRODUCTS**************************** -//
  {
    //hard hats
    name: "V9 HARD HAT UNVENTED PUSHLOCK HARNESS",
    description:
      "Unvented for situations where full head enclosure is required",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 22,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000001W",
        slrsku: "SLRSKU01W",
        suppliersku: "SPLSKU01W",
      },
      {
        attrs: "BLUE",
        count: 15,
        price: 555,
        barcode: "456789123",
        ctlsku: "CTL000001B",
        slrsku: "SLRSKU01B",
        suppliersku: "SPLSKU01B",
      },
      {
        attrs: "RED",
        count: 17,
        price: 444,
        barcode: "789123456",
        ctlsku: "CTL000001R",
        slrsku: "SLRSKU01R",
        suppliersku: "SPLSKU01R",
      },
    ],
    supplier: "PARAMOUNT-SAFETY",
    RRP: 9.99,
    category: "PPE/PROTECTIVE-HEADWEAR/HARD-HATS",
    images: [{ path: "/images/categories/hardhats.jpg" }],
    pdfs: [],
    purchaseprice: 5,
    /*     price: 12552, */
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  {
    //hard hat accessories
    name: "V6 HARD HAT PLASTIC BRIM",
    description:
      "Hard hat brims are rated to UPF 50+ and provide excellent protection against solar ultraviolet radiation (UVR).",
    stock: [
      {
        attrs: "S",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 22,
        price: 13212,
        barcode: "123456789",
        ctlsku: "CTL000002W",
        slrsku: "SLRSKU02W",
        suppliersku: "SPLSKU02W",
      },
      {
        attrs: "M",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 15,
        price: 555,
        barcode: "456789123",
        ctlsku: "CTL000002B",
        slrsku: "SLRSKU02B",
        suppliersku: "SPLSKU02B",
      },
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 17,
        price: 444,
        barcode: "789123456",
        ctlsku: "CTL000002R",
        slrsku: "SLRSKU02R",
        suppliersku: "SPLSKU02R",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/PROTECTIVE-HEADWEAR/HARD-HAT-ACCESSORIES",
    images: [{ path: "/images/categories/hhaccessories.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  {
    //hard hat lamp brackets
    name: "V9 HARD HAT VENTED + LAMP BRACKET PUSHLOCK HARNESS",
    description:
      "Fitted with front adjustable lamp bracket attachment & rear cable guide (lamp not included)",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 22,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000003W",
        slrsku: "SLRSKU03W",
        suppliersku: "SPLSKU03W",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/PROTECTIVE-HEADWEAR/HARD-HATS-WITH-LAMP-BRACKETS",
    images: [{ path: "/images/categories/hhaccessories.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  //----------------------------------------------------------------------------------------//

  {
    // ppe faceprotection
    name: "STRIKER BROWGUARD + MESH VISOR + ADDER EARMUFF COMBO",
    description:
      "One piece design offering 180 degree head protection made from Polyethylene",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 22,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000004W",
        slrsku: "SLRSKU04W",
        suppliersku: "SPLSKU04W",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/FACE-PROTECTION/BROWGUARD-VISOR-COMBO",
    images: [{ path: "/images/categories/browguard.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ppe face accessories
    name: "STRIKER BROWGUARD ORANGE",
    description:
      "Eye and face protectors when used in conjunction with Pro Choice Safety Gear Visors.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 22,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000005W",
        slrsku: "SLRSKU05W",
        suppliersku: "SPLSKU05W",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/FACE-PROTECTION/FACE-ACCESSORIES",
    images: [{ path: "/images/categories/faceacc.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  //-------------------------------------------------------------------------------------//
  {
    // ppe hearing protection
    name: "STRIKER BROWGUARD ORANGE",
    description: "PowerSoft Foam Hybrid Plug technology",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 22,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000006",
        slrsku: "SLRSKU06",
        suppliersku: "SPLSKU06",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/HEARING-PROTECTION/DISPOSABLE-EARPLUGS",
    images: [{ path: "/images/categories/dsi.jpg" }],

    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ppe reusable earplugs
    name: "PROSIL® REUSABLE CORDED EARPLUGS CORDED",
    description: "Hearing protection for noise levels to 100 dB(A)",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000007",
        slrsku: "SLRSKU07",
        suppliersku: "SPLSKU07",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/HEARING-PROTECTION/REUSABLE-EARPLUGS",
    images: [{ path: "/images/categories/rplugs.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ppe earmuffs
    name: "MAMBA EARMUFFS CLASS 5, -29DB",
    description: "Metal free, dielectric earmuffs.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000008",
        slrsku: "SLRSKU08",
        suppliersku: "SPLSKU08",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/HEARING-PROTECTION/EARMUFFS",
    images: [{ path: "/images/categories/muffs.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ppe HEARING-ACCESSORIES
    name: "POWERSOFT MEGA T-FIT EARPLUGS UNCORDED DISPENSER",
    description:
      "Dispenser holds 500 pairs of Powersoft Mega T-Fit Uncorded Earplugs.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL0000081",
        slrsku: "SLRSKU08",
        suppliersku: "EPDS500A",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/HEARING-PROTECTION/HEARING-ACCESSORIES",
    images: [{ path: "/images/categories/HEARING-ACCESSORIES.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  //---------------------------------------------------------------------------------------//
  {
    // ppe eye protection safety glasses.
    name: "SAFETY GLASSES FRONTSIDE CLEAR LENS WITH CLEAR FRAME",
    description:
      "Our FRONTSIDE TR90 Frame is extremely comfortable to wear. Highly flexible, they can bend under pressure which makes them resilient to damage",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000009",
        slrsku: "SLRSKU09",
        suppliersku: "SPLSKU09",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/EYE-PROTECTION/SAFETY-GLASSES",
    images: [{ path: "/images/categories/sglasses.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ppe eye protection safety glasses.
    name: "SPECTACLE CORD BLACK",
    description: "Can be worn around neck for convenience",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000010",
        slrsku: "SLRSKU010",
        suppliersku: "SPLSKU10",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "PPE/EYE-PROTECTION/EYE-ACCESSORIES",
    images: [{ path: "/images/categories/sling.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  //-------------------------------------SITE SAFETY-----------------------------------------------//
  {
    // ss emergency showers and eyewash combination unit
    name: "COMBINATION 316SS SHOWER WITH EYE & FACE WASH, BOWL & FOOT TREADLE",
    description:
      "All PRATT emergency showers and eye wash stations are designed and manufactured in an ISO 9001 accredited facility, with full conformance to both AS4775 and ANSI Z358.1 standard.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000011",
        slrsku: "SLRSKU011",
        suppliersku: "SPLSKU11",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "SITE-SAFETY/EMERGENCY-SHOWERS-EYEWASH/COMBINATION-UNITS",
    images: [{ path: "/images/categories/ss1.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss emergency showers and eyewash / fixed wall.......
    name: "WALL MOUNTED EYE WASH - NO BOWL OR FOOT TREADLE",
    description:
      "All PRATT emergency showers and eye wash stations are designed and manufactured in an ISO 9001 accredited facility, with full conformance to both AS4775 and ANSI Z358.1 standard.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000012",
        slrsku: "SLRSKU012",
        suppliersku: "SPLSKU12",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category:
      "SITE-SAFETY/EMERGENCY-SHOWERS-EYEWASH/FIXED-WALL-MOUNTED-EYE-WASH-UNITS",
    images: [{ path: "/images/categories/ss1.jpg" }],

    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss emergency showers and eyewash / pedestal wall.......
    name: "PEDESTAL MOUNTED EYE & FACE WASH, WITH BOWL & FOOT TREADLE",
    description:
      "All PRATT emergency showers and eye wash stations are designed and manufactured in an ISO 9001 accredited facility, with full conformance to both AS4775 and ANSI Z358.1 standard.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000013",
        slrsku: "SLRSKU013",
        suppliersku: "SPLSKU13",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category:
      "SITE-SAFETY/EMERGENCY-SHOWERS-EYEWASH/FIXED-WALL-MOUNTED-EYE-WASH-UNITS",
    images: [{ path: "/images/categories/ss2.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss emergency showers and eyewash / lab units
    name: "HAND HELD TWIN NON AERATED EYE WASH",
    description:
      "When working with small doses of dangerous substances, a spill or splash could still cause a serious injury.Â The handheld eye wash provides you with swift and effect decontamination for your eyes and body.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000014",
        slrsku: "SLRSKU014",
        suppliersku: "SPLSKU14",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "SITE-SAFETY/EMERGENCY-SHOWERS-EYEWASH/LABORATORY-UNITS",
    images: [{ path: "/images/categories/ss3.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss emergency showers and eyewash /portable eye wash units
    name: "PORTABLE EYEWASH TROLLEY TO SUIT SE590A",
    description:
      "When working with small doses of dangerous substances, a spill or splash could still cause a serious injury.Â The handheld eye wash provides you with swift and effect decontamination for your eyes and body.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000016",
        slrsku: "SLRSKU016",
        suppliersku: "SPLSKU16",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "SITE-SAFETY/EMERGENCY-SHOWERS-EYEWASH/PORTABLE-EYE-WASH-UNITS",
    images: [{ path: "/images/categories/ss4.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss emergency showers and eyewash /shower spare parts
    name: "TRIPLE AERATED EYE AND FACE WASH NOZZLE ASSEMBLY",
    description:
      "Providing aerated water stream. Suitable for eye wash, face wash or combined application.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000017",
        slrsku: "SLRSKU017",
        suppliersku: "SPLSKU17",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "SITE-SAFETY/EMERGENCY-SHOWERS-EYEWASH/SHOWER-SPARE-PARTS",
    images: [{ path: "/images/categories/ss5.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/general purpose one
    name: "ECONOMY 120LTR GENERAL PURPOSE",
    description:
      "For general industry and non-industry applications. Commonly used in the automotive, industrial, commercial markets, warehousing, waste management and manufacturing industries.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000018",
        slrsku: "SLRSKU018",
        suppliersku: "SPLSKU18",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "SITE-SAFETY/SPILL-KITS/GENERAL-PURPOSE-SPILL-KITS",
    images: [{ path: "/images/categories/ss6.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "ECONOMY 120LTR HAZCHEM",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000019",
        slrsku: "SLRSKU019",
        suppliersku: "SPLSKU19",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "SITE-SAFETY/SPILL-KITS/HAZCHEM-SPILL-KITS",
    images: [{ path: "/images/categories/ss7.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "Wilwaukee",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000020",
        slrsku: "SLRSKU020",
        suppliersku: "SPLSKU20",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "POWER TOOLS",
    images: [{ path: "/images/categories/powertools.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "Wiha",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000021",
        slrsku: "SLRSKU021",
        suppliersku: "SPLSKU21",
      },
    ],
    RRP: 9.99,
    supplier: "WIHA",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ELECTRICAL",
    images: [{ path: "/images/categories/electrical.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "Fastener",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000022",
        slrsku: "SLRSKU022",
        suppliersku: "SPLSKU22",
      },
    ],
    RRP: 9.99,
    supplier: "PARAMOUNT-SAFETY",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "FASTENERS",
    images: [{ path: "/images/categories/fastener.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "WIHA TOOLS",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: "SLRSKU023",
        suppliersku: "SPLSKU23",
      },
    ],
    RRP: 180,
    supplier: "WIHA",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "HAND TOOLS",
    images: [{ path: "/images/categories/handtools.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "Cobalt Drill Bit Set for Steel 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU024",
        suppliersku: "SW5100",
      },
    ],
    RRP: 180,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/DRILL-BITS-FOR-METAL",
    images: [{ path: "/images/categories/SW5100.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "Cobalt Drill Bit Set for Steel with Bullseye Tip 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU025",
        suppliersku: "SW5150",
      },
    ],
    RRP: 225,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/DRILL-BITS-FOR-METAL",
    images: [{ path: "/images/categories/SW5150.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "125mm 24 Grit Ceramic Fibre Disc 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU026",
        suppliersku: "PP10",
      },
    ],
    RRP: 60,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/FIBRE-DISCS",
    images: [{ path: "/images/categories/PP10.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "SDS Drill Bit Set 4pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: "  SLRSKU043",
        suppliersku: "SW6050",
      },
    ],
    RRP: 25,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/SDS-DRILL-BITS-FOR-MASONRY",
    images: [{ path: "/images/categories/SW6050.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "120 Grit 914 x 100mm Cubic Zirconia Linishing Belt 1pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU028",
        suppliersku: "SW4106",
      },
    ],
    RRP: 15,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/LINISHING-BELTS-DISCS",
    images: [{ path: "/images/categories/SW4106.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "125mm Grinding Wheels 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU029",
        suppliersku: "SW2370",
      },
    ],
    RRP: 51,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/GRINDING-WHEELS",
    images: [{ path: "/images/categories/SW2370.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "HC Half Moon Flush Cutting Multi Tool Blade 1pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU030",
        suppliersku: "SW2030",
      },
    ],
    RRP: 10,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/MULTI-TOOL-BLADES",
    images: [{ path: "/images/categories/SW2030.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "100mm 40 Grit Blue Cubic Zirconia Flap Wheels 10pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        saleUnits: [
          { unit: "per piece-1" },
          { unit: "per pack-10" },
          { unit: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU031",
        suppliersku: "SW2180",
      },
    ],
    RRP: 28,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/FLAP-WHEELS",
    images: [{ path: "/images/categories/SW2180.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "4” 100mm Thin Angle Grinder Cutting Discs 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU032",
        suppliersku: "SW2065",
      },
    ],
    RRP: 29,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/CUTTING-DISCS",
    images: [{ path: "/images/categories/SW2065.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "5” 1.6mm Thin Angle Grinder Cutting Discs 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU033",
        suppliersku: "SW2071",
      },
    ],
    RRP: 41,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/CUTTING-DISCS",
    images: [{ path: "/images/categories/SW2071.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
  {
    // ss spill kits/hazchem
    name: "7” 180mm Thin Angle Grinder Cutting Discs 25pc",
    description:
      "Economy Hazchem Spill Kits colour coded yellow for Hazchem liquid spill absorption.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU034",
        suppliersku: "SW2073",
      },
    ],
    RRP: 48,
    supplier: "SWARTS-TOOLS",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category: "ACCESSORIES/CUTTING-DISCS",
    images: [{ path: "/images/categories/SW2073.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },

  {
    // Cables
    name: "ORANGE CIRCULAR POWER CABLE (0.6/1kV)",
    description:
      "For mains, sub mains and sub circuits unenclosed, enclosed in conduit buried direct or underground ducts for buildings and industrial plants where not subject to mechanical damage. Suitable for glanding.",
    stock: [
      {
        attrs: "L",
        typeOfSale: [
          { one: "per piece-1" },
          { two: "per pack-10" },
          { three: "per carton-100" },
        ],
        count: 20,
        price: 666,
        barcode: "123456789",
        ctlsku: "CTL000023",
        slrsku: " SLRSKU035",
        suppliersku: "SW2073",
      },
    ],
    RRP: 2000,
    supplier: "ELECTRA-CABLES",
    pdfs: [{ path: "/images/documents/file.pdf" }],
    category:
      "ELECTRICAL/CABLES/CONSTRUCTION-CABLES/ORANGE-CIRCULAR-POWER/0.6-1Kv",
    images: [{ path: "/images/categories/orangeCable.jpg" }],
    purchaseprice: 5,
    displayPrice: 9.99,
    min: 100,
    max: 400,
  },
];

module.exports = products;
