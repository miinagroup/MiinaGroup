const promotions = [
  {
    category: "banners",
    detail: [
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Commodore_banner_1.jpg",
        description: "banner-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Alemlube_banner_1.jpg",
        description: "banner-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Coolon_Banner_1.png",
        description: "banner-3",
      },
    ],
    startDate: "2023-08-01 09:00:00",
    endDate: "2023-08-07 11:59:59",
  },
  {
    category: "banners",
    detail: [
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Commodore_banner_2.jpg",
        description: "banner-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Alemlube_banner_2.jpg",
        description: "banner-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Coolon_Banner_2.png",
        description: "banner-3",
      },
    ],
    startDate: "2023-08-07 12:00:00",
    endDate: "2023-08-14 11:59:59",
  },
  {
    category: "banners",
    detail: [
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Commodore_banner_1.jpg",
        description: "banner-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Alemlube_banner_1.jpg",
        description: "banner-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Coolon_Banner_1.png",
        description: "banner-1",
      },
    ],
    startDate: "2023-08-14 12:00:00",
    endDate: "2023-08-21 11:59:59",
  },
  {
    category: "banners",
    detail: [
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Commodore_banner_2.jpg",
        description: "banner-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Alemlube_banner_2.jpg",
        description: "banner-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/banners/Coolon_Banner_2.png",
        description: "banner-1",
      },
    ],
    startDate: "2023-08-21 12:00:00",
    endDate: "2023-08-28 11:59:59",
  },
  {
    category: "blocks",
    detail: [
      {
        image: "https://ctladmin.b-cdn.net/promotion/blocks/Brilliant_Connected_Lights_by_Coolon_1.mp4",
        redirectURL: "/product-list?brandName=COOLON",
        description: "video-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Commodore_Australia___Making_Off-Grid_Solar_Simple.mp4",
        redirectURL:
          "/product-list?categoryName=POWER-AIR&subCategoryName=CLEAN-ENERGY&childCategoryName=TRANSPORTABLE-POWER-SKIDS",
        description: "video-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Commodore_block_9.jpg",
        redirectURL:
          "/product-list?categoryName=POWER-AIR&subCategoryName=GENERATORS&childCategoryName=SINGLE-PHASE",
        description: "bottom-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Commodore_block_1.jpg",
        redirectURL:
          "/product-list?categoryName=POWER-AIR&subCategoryName=CLEAN-ENERGY&childCategoryName=POWER-HUB-OFF-GRID-SYSTEMS",
        description: "bottom-3",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Alemlube_block_1.jpg",
        redirectURL:
          "/product-list?categoryName=INDUSTRIAL&subCategoryName=PUMPS-VALVES-PARTS&childCategoryName=PUMPS&fourCategoryName=GREASE-PUMP",
        description: "upper-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Alemlube_block_5.jpg",
        redirectURL:
          "/product-list?categoryName=INDUSTRIAL&subCategoryName=HOSES-FITTINGS&childCategoryName=HOSE-REELS",
        description: "upper-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Coolon_Block2.jpg",
        redirectURL:
          "/product-list?brandName=Coolon",
        description: "bottom-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Coolon_Block1.jpg",
        redirectURL:
          "/product-list?brandName=Coolon",
        description: "bottom-4",
      },
    ],
    startDate: "2023-08-01 12:00:00",
    endDate: "2023-08-02 11:59:59",
  },
  {
    category: "blocks",
    detail: [
      {
        image: "https://ctladmin.b-cdn.net/promotion/blocks/Brilliant_Connected_Lights_by_Coolon_1.mp4",
        redirectURL: "/product-list?brandName=COOLON",
        description: "video-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Commodore_Australia___Making_Off-Grid_Solar_Simple.mp4",
        redirectURL:
          "/product-list?categoryName=POWER-AIR&subCategoryName=CLEAN-ENERGY&childCategoryName=TRANSPORTABLE-POWER-SKIDS",
        description: "video-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Commodore_block_6.jpg",
        redirectURL:
          "/product-list?categoryName=POWER-AIR&subCategoryName=CLEAN-ENERGY&childCategoryName=TRANSPORTABLE-POWER-SKIDS",
        description: "bottom-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Commodore_block_4.jpg",
        redirectURL:
          "/product-list?categoryName=POWER-AIR&subCategoryName=CLEAN-ENERGY&childCategoryName=POWER-HUB-OFF-GRID-SYSTEMS",
        description: "bottom-3",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Alemlube_block_10.jpg",
        redirectURL:
          "/product-list?categoryName=INDUSTRIAL&subCategoryName=PUMPS-VALVES-PARTS&childCategoryName=TRANSFER-KITS&fourCategoryName=TRANSFERING-KIT",
        description: "upper-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Alemlube_block_7.jpg",
        redirectURL:
          "/product-list?categoryName=INDUSTRIAL&subCategoryName=PUMPS-VALVES-PARTS&childCategoryName=PUMPS&fourCategoryName=DIAPHRAGM-PUMP",
        description: "upper-2",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Coolon_Block9.jpg",
        redirectURL:
          "/product-list?brandName=Coolon",
        description: "bottom-1",
      },
      {
        image:
          "https://ctladmin.b-cdn.net/promotion/blocks/Coolon_Block6.jpg",
        redirectURL:
          "/product-list?brandName=Coolon",
        description: "bottom-4",
      },
    ],
    startDate: "2023-08-01 12:00:00",
    endDate: "2023-08-02 11:59:59",
  },
];

module.exports = promotions;
