import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./page.css";

//categories。
import { useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";

const NavbCopy = () => {
  // DO NOT REMOVE OR COMMENT THE CATEGORIES PART, IT WILL USED IN OTHER FILES
  //categories
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { categories } = useSelector((state) => state.getCategories);
  // console.log(categories);

  const mainCategory = [
    {
      label: "PPE",
      link: "PPE",
    },
    {
      label: "SITE SAFETY",
      link: "SITE-SAFETY",
    },
    {
      label: "POWER/AIR",
      link: "POWER-AIR",
    },
    {
      label: "HAND TOOLS",
      link: "HAND-TOOLS",
    },
    {
      label: "INDUSTRIAL",
      link: "INDUSTRIAL",
    },
    {
      label: "FABRICATION",
      link: "FABRICATION",
    },
    {
      label: "ELECTRICAL",
      link: "ELECTRICAL",
    },
    {
      label: "PROCESSING",
      link: "PROCESSING",
    },
  ];
  const [subCategory1, setSubCategory1] = useState({});
  const [subCategory2, setSubCategory2] = useState({});
  const [subCategory3, setSubCategory3] = useState({});
  const [childCategory, setChildCategory] = useState({});

  useEffect(() => {
    let subCategories = {};
    let childCategories = {};

    const mainLinks = mainCategory.map(category => category.link); // extract links for validation

    categories.forEach((category) => {
      // Only process this category if display is true
      if (!category.display) {
        return;
      }

      const parts = category.name.split("/");

      // Only process categories if they belong to the predefined main categories links
      if (mainLinks.includes(parts[0])) {
        if (parts.length >= 2) {
          if (!subCategories[parts[0]]) {
            subCategories[parts[0]] = [];
          }
          if (!subCategories[parts[0]].includes(parts[1])) {
            subCategories[parts[0]].push(parts[1]);
          }
        }

        if (parts.length >= 3) {
          const key = parts[0] + "/" + parts[1];
          if (!childCategories[key]) {
            childCategories[key] = [];
          }
          if (!childCategories[key].includes(parts[2])) {
            childCategories[key].push(parts[2]);
          }
        }
      }
    });
    
    let subCategories1 = {};
    let subCategories2 = {};
    let subCategories3 = {};

    Object.keys(subCategories).forEach(key => {
      const totalSubs = subCategories[key].length;
  
      if (totalSubs <= 3) {
          subCategories1[key] = subCategories[key].slice(0, 1);
          subCategories2[key] = totalSubs >= 2 ? subCategories[key].slice(1, 2) : [];
          subCategories3[key] = totalSubs >= 3 ? subCategories[key].slice(2, 3) : [];
      } else if (totalSubs === 4) {
        subCategories1[key] = [subCategories[key][0]];
        subCategories2[key] = [subCategories[key][1], subCategories[key][2]];
        subCategories3[key] = [subCategories[key][3]];
      } else {
          const thirdLength = Math.ceil(totalSubs / 3);
          subCategories1[key] = subCategories[key].slice(0, thirdLength);
          subCategories2[key] = subCategories[key].slice(thirdLength, thirdLength * 2);
          subCategories3[key] = subCategories[key].slice(thirdLength * 2);
      }
    });
  
    setSubCategory1(subCategories1);
    setSubCategory2(subCategories2);
    setSubCategory3(subCategories3);
    setChildCategory(childCategories);
  }, [categories]);



  console.log("mainCategory", mainCategory);
  console.log("subCategory1", subCategory1);
  console.log("subCategory2", subCategory2);
  console.log("subCategory3", subCategory3);
  console.log("childCategory", childCategory);

  /* ************** Brands ************* */
  /*   var BRANDS = [
      {
        label: "Paramount Safety",
        type: 1,
        link: "/product-list?brandName=PARAMOUNT-SAFETY",
        Brand_Logo: "/images/Brands/PARAMOUNT.jpg",
      },
      {
        label: "IP-ENCLOSURES",
        type: 1,
        link: "/product-list?brandName=IP-ENCLOSURES",
        Brand_Logo: "/images/Brands/IP-ENCLOSURES.png",
      },
      {
        label: "SWARTS TOOLS",
        type: 1,
        link: "/product-list?brandName=SWARTS-TOOLS",
        Brand_Logo: "/images/Brands/SWARTS-logo.jpg",
      },
      {
        label: "HOBSON",
        type: 1,
        link: "/product-list?brandName=HOBSON",
        Brand_Logo: "/images/Brands/Hobson.png",
      },
      {
        label: "MASTER LOCK",
        type: 1,
        link: "/product-list?brandName=MASTER-LOCK",
        Brand_Logo: "/images/Brands/master-lock-vector.png",
      },
      {
        label: "MINETECH TOOLS",
        type: 1,
        link: "/product-list?brandName=MINETECH-TOOLS",
        Brand_Logo: "/images/Brands/MINTECH.jpg",
      },
      {
        label: "INTEGRATED POWER",
        type: 1,
        link: "/product-list?brandName=INTEGRATED-POWER",
        Brand_Logo: "/images/Brands/integrated-power.jpg",
      },
    ]; */

  /* ************** Categories ************* */
  var nav_color = {
    2: "subCat",
    3: "childCat",
    4: "fourCat",
  };

  // #region
  /* FABRICATION */
  var FABRICATION = "/product-list?categoryName=FABRICATION";
  var FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING =
    FABRICATION + "&subCategoryName=OXYGEN-ACETYLENE-CUTTING-HEATING";
  var FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING_SUB = [
    {
      label: "OXYGEN , ACETYLENE-CUTTING & HEATING",
      type: 2,
      link: FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING,
    },
    {
      label: "CUTTING EQUIPMENTS",
      type: 3,
      link:
        FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING +
        "&childCategoryName=CUTTING-EQUIPMENTS",
    },
    {
      label: "HOSES , FITTINGS & REGULATORS",
      type: 3,
      link:
        FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING +
        "&childCategoryName=HOSES-FITTINGS-REGULATORS",
    },
    {
      label: "TORCHES & BLOWPIPES",
      type: 3,
      link:
        FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING +
        "&childCategoryName=TORCHES-BLOWPIPES",
    },
    {
      label: "GOUGING & LANCING",
      type: 3,
      link:
        FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING +
        "&childCategoryName=GOUGING-LANCING",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link:
        FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING +
        "&childCategoryName=ACCESSORIES",
    },
  ];
  var FABRICATION_MIG_WELDING = FABRICATION + "&subCategoryName=MIG-WELDING";
  var FABRICATION_MIG_WELDING_SUB = [
    {
      label: "MIG WELDING ",
      type: 2,
      link: FABRICATION_MIG_WELDING,
    },
    {
      label: "WELDERS",
      type: 3,
      link: FABRICATION_MIG_WELDING + "&childCategoryName=WELDERS",
    },
    {
      label: "SOLID WIRES",
      type: 3,
      link: FABRICATION_MIG_WELDING + "&childCategoryName=SOLID-WIRES",
    },
    {
      label: "FLUX WIRES",
      type: 3,
      link: FABRICATION_MIG_WELDING + "&childCategoryName=FLUX-WIRES",
    },
    {
      label: "HAND PIECES & TORCH PARTS",
      type: 3,
      link:
        FABRICATION_MIG_WELDING + "&childCategoryName=HAND-PIECES-TORCH-PARTS",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: FABRICATION_MIG_WELDING + "&childCategoryName=ACCESSORIES",
    },
  ];
  var FABRICATION_TIG_STICK_WELDING =
    FABRICATION + "&subCategoryName=TIG-STICK-WELDING";
  var FABRICATION_TIG_STICK_WELDING_SUB = [
    {
      label: "TIG & STICK WELDING",
      type: 2,
      link: FABRICATION_TIG_STICK_WELDING,
    },
    {
      label: "STICK WELDERS",
      type: 3,
      link: FABRICATION_TIG_STICK_WELDING + "&childCategoryName=STICK-WELDERS",
    },
    {
      label: "TIG WELDERS",
      type: 3,
      link: FABRICATION_TIG_STICK_WELDING + "&childCategoryName=TIG-WELDERS",
    },
    {
      label: "ELECTRODES",
      type: 3,
      link: FABRICATION_TIG_STICK_WELDING + "&childCategoryName=ELECTRODES",
    },
    {
      label: "FILLER RODS & TUNGSTEN",
      type: 3,
      link:
        FABRICATION_TIG_STICK_WELDING +
        "&childCategoryName=FILLER-RODS-TUNGSTEN",
    },
    {
      label: "TIG , STICK PARTS & ACCESSORIES",
      type: 3,
      link:
        FABRICATION_TIG_STICK_WELDING +
        "&childCategoryName=TIG-STICK-PARTS-ACCESSORIES",
    },
  ];
  var FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING =
    FABRICATION + "&subCategoryName=WELDING-HELMETS-ACCESSORIES-TOOLING";
  var FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING_SUB = [
    {
      label: "WELDING HELMETS & TOOLING",
      type: 2,
      link: FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING,
    },
    {
      label: "HELMETS",
      type: 3,
      link:
        FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING +
        "&childCategoryName=HELMETS",
    },
    {
      label: "LENSES",
      type: 3,
      link:
        FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING +
        "&childCategoryName=LENSES",
    },
    {
      label: "SWEAT BANDS",
      type: 3,
      link:
        FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING +
        "&childCategoryName=SWEAT-BANDS",
    },
    {
      label: "BATTERIES",
      type: 3,
      link:
        FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING +
        "&childCategoryName=BATTERIES",
    },
    {
      label: "CHIPPING HAMMERS",
      type: 3,
      link:
        FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING +
        "&childCategoryName=CHIPPING-HAMMERS",
    },
    {
      label: "NEEDLE GUNS & SCALERS",
      type: 3,
      link:
        FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING +
        "&childCategoryName=NEEDLE-GUNS-SCALERS",
    },
  ];
  var FABRICATION_WELDING_PPE = FABRICATION + "&subCategoryName=WELDING-PPE";
  var FABRICATION_WELDING_PPE_SUB = [
    {
      label: "WELDING PPE",
      type: 2,
      link: FABRICATION_WELDING_PPE,
    },
    {
      label: "JACKETS",
      type: 3,
      link: FABRICATION_WELDING_PPE + "&childCategoryName=JACKETS",
    },
    {
      label: "APRONS",
      type: 3,
      link: FABRICATION_WELDING_PPE + "&childCategoryName=APRONS",
    },
    {
      label: "OXY GOGGLES",
      type: 3,
      link: FABRICATION_WELDING_PPE + "&childCategoryName=OXY-GOGGLES",
    },
    {
      label: "GLOVES",
      type: 3,
      link: FABRICATION_WELDING_PPE + "&childCategoryName=GLOVES",
    },
    {
      label: "WELDING HOODS",
      type: 3,
      link: FABRICATION_WELDING_PPE + "&childCategoryName=WELDING-HOODS",
    },
    {
      label: "LEATHER WELDING SPATS",
      type: 3,
      link:
        FABRICATION_WELDING_PPE + "&childCategoryName=LEATHER-WELDING-SPATS",
    },
    {
      label: "WELDING BLANKETS",
      type: 3,
      link: FABRICATION_WELDING_PPE + "&childCategoryName=WELDING-BLANKETS",
    },
  ];

  /* MINING */
  var MINING = "/product-list?categoryName=MINING";

  /* PROCESSING */
  var PROCESSING = "/product-list?categoryName=PROCESSING";
  var PROCESSING_REAGENTS = PROCESSING + "&subCategoryName=REAGENTS";
  var PROCESSING_REAGENTS_SUB = [
    {
      label: "REAGENTS",
      type: 2,
      link: PROCESSING_REAGENTS,
    },
    {
      label: "LIME",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=LIME",
    },
    {
      label: "HYDROCHLORIC ACID",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=HYDROCHLORIC-ACID",
    },
    {
      label: "GOLD STANDARDS",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=GOLD-STANDARDS",
    },
    {
      label: "SILVER NITRATE",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=SILVER-NITRATE",
    },
    {
      label: "CAUSTIC",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=CAUSTIC",
    },
    {
      label: "DIBK",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=DIBK",
    },
    {
      label: "SODA",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=SODA",
    },
    {
      label: "ANTISCALANT",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=ANTISCALANT",
    },
    {
      label: "BORAX",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=BORAX",
    },
    {
      label: "SILICA",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=SILICA",
    },
    {
      label: "CARBON",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=CARBON",
    },
    {
      label: "LEACH AID",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=LEACH-AID",
    },
  ];
  var PROCESSING_GRINDING_MEDIA =
    PROCESSING + "&subCategoryName=GRINDING-MEDIA";
  var PROCESSING_GRINDING_MEDIA_SUB = [
    {
      label: "GRINDING MEDIA",
      type: 2,
      link: PROCESSING_GRINDING_MEDIA,
    },
  ];
  var PROCESSING_LAB_CHEMICALS = PROCESSING + "&subCategoryName=LAB-CHEMICALS ";
  var PROCESSING_LAB_CHEMICALS_SUB = [
    {
      label: "LAB CHEMICALS",
      type: 2,
      link: PROCESSING_LAB_CHEMICALS + "&subCategoryName=LAB-CHEMICALS",
    },
  ];
  var PROCESSING_LAB_EQUIPMENTS =
    PROCESSING + "&subCategoryName=LAB-EQUIPMENTS";
  var PROCESSING_LAB_EQUIPMENTS_SUB = [
    {
      label: "LAB EQUIPMENTS ",
      type: 2,
      link: PROCESSING_LAB_EQUIPMENTS,
    },
  ];

  /* POWER AIR */
  var POWER_AIR = "/product-list?categoryName=POWER-AIR";
  var POWER_AIR_AIR = POWER_AIR + "&subCategoryName=AIR";
  var POWER_AIR_AIR_SUB = [
    {
      label: "AIR TOOLS",
      type: 2,
      link: POWER_AIR_AIR,
    },
    {
      label: "IMPACT WRENCHES",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=IMPACT-WRENCHES",
    },
    {
      label: "RATCHET WRENCHES",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=RATCHET-WRENCHES",
    },
    {
      label: "DIE GRINDERS",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=DIE-GRINDERS",
    },
    {
      label: "ANGLE DIE GRINDERS",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=ANGLE-DIE-GRINDERS",
    },
    {
      label: "SANDERS",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=SANDER",
    },
    {
      label: "DRILL",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=DRILL",
    },
    {
      label: "NEEDLE SCALAR",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=NEEDLE-SCALAR",
    },
    {
      label: "CHIPPING HAMMER",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=CHIPPING-HAMMER",
    },
    {
      label: "HYDRAULIC-RIVERTER",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=HYDRAULIC-RIVERTER",
    },
    {
      label: "HYDRAULIC JACK",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=HYDRAULIC-JACK",
    },
    {
      label: "WORKSHOP PRESS",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=WORKSHOP-PRESS",
    },
    {
      label: "TORQUE WRENCH",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=TORQUE-WRENCH",
    },
    {
      label: "AIR BREAKER",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=AIR-BREAKER",
    },
  ];
  var POWER_AIR_POWER = POWER_AIR + "&subCategoryName=POWER";
  var POWER_AIR_POWER_SUB = [
    {
      label: "POWER TOOLS",
      type: 2,
      link: POWER_AIR_POWER,
    },
  ];
  var POWER_AIR_GENERATORS = POWER_AIR + "&subCategoryName=GENERATORS";
  var POWER_AIR_GENERATORS_SUB = [
    {
      label: "GENERATORS",
      type: 2,
      link: POWER_AIR_GENERATORS,
    },
    {
      label: "SINGLE PHASE",
      type: 3,
      link: POWER_AIR_GENERATORS + "&childCategoryName=SINGLE-PHASE",
    },
    {
      label: "THREE PHASE",
      type: 3,
      link: POWER_AIR_GENERATORS + "&childCategoryName=THREE-PHASE",
    },
  ];
  var POWER_AIR_CHARGERS = POWER_AIR + "&subCategoryName=CHARGERS";
  var POWER_AIR_CHARGERS_SUB = [
    {
      label: "CHARGERS",
      type: 2,
      link: POWER_AIR_CHARGERS,
    },
  ];
  var POWER_AIR_CLEAN_ENERGY = POWER_AIR + "&subCategoryName=CLEAN-ENERGY";
  var POWER_AIR_CLEAN_ENERGY_SUB = [
    {
      label: "CLEAN ENERGY",
      type: 2,
      link: POWER_AIR_CLEAN_ENERGY,
    },
    {
      label: "POWER HUB OFF GRID SYSTEMS ",
      type: 3,
      link:
        POWER_AIR_CLEAN_ENERGY +
        "&childCategoryName=POWER-HUB-OFF-GRID-SYSTEMS ",
    },
    {
      label: "TRANSPORTABLE POWER SKIDS",
      type: 3,
      link:
        POWER_AIR_CLEAN_ENERGY + "&childCategoryName=TRANSPORTABLE-POWER-SKIDS",
    },
    {
      label: "PUMPS",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=PUMPS",
    },
    {
      label: "SOLAR PANELS",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=SOLAR-PANELS",
    },
    {
      label: "CONTROLLERS",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=CONTROLLERS",
    },
    {
      label: "INVERTERS & BATTERIES",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=INVERTERS-BATTERIES",
    },
    {
      label: "CABLES & SENSORS",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=CABLES-SENSORS",
    },
    {
      label: "DC ISOLATORS & ENCLOSURES",
      type: 3,
      link:
        POWER_AIR_CLEAN_ENERGY + "&childCategoryName=DC-ISOLATORS-ENCLOSURES",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=ACCESSORIES",
    },
    {
      label: "IT ACCESSORIES",
      type: 3,
      link: POWER_AIR_CLEAN_ENERGY + "&childCategoryName=IT-ACCESSORIES",
    },
  ];
  var POWER_AIR_COMPRESSORS = POWER_AIR + "&subCategoryName=COMPRESSORS";
  var POWER_AIR_COMPRESSORS_SUB = [
    {
      label: "COMPRESSORS",
      type: 2,
      link: POWER_AIR_COMPRESSORS,
    },
  ];

  /* PPE */
  var PPE = "/product-list?categoryName=PPE";
  var PPE_HEADWEAR = PPE + "&subCategoryName=PROTECTIVE-HEADWEAR";
  var PPE_HEADWEAR_SUB = [
    {
      label: "PROTECTIVE HEADWEAR",
      type: 2,
      link: PPE_HEADWEAR,
    },
    {
      label: "HARD HATS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HATS",
    },
    {
      label: "HARD HAT ACCESSORIES",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-ACCESSORIES",
    },
    {
      label: "HARD HATS WITH LAMP BRACKETS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-WITH-LAMP-BRACKETS",
    },
  ];
  var PPE_FACE = PPE + "&subCategoryName=FACE-PROTECTION";
  var PPE_FACE_SUB = [
    {
      label: "FACE PROTECTION",
      type: 2,
      link: PPE_FACE,
    },
    {
      label: "BROWGUARD/ VISOR COMBO",
      type: 3,
      link: PPE_FACE + "&childCategoryName=BROWGUARD-VISOR-COMBO",
    },
    {
      label: "FACE ACCESSORIES",
      type: 3,
      link: PPE_FACE + "&childCategoryName=FACE-ACCESSORIES",
    },
  ];
  var PPE_HEARING = PPE + "&subCategoryName=HEARING-PROTECTION";
  var PPE_HEARING_SUB = [
    {
      label: "HEARING PROTECTION",
      type: 2,
      link: PPE_HEARING,
    },
    {
      label: "DISPOSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=DISPOSABLE-EARPLUGS",
    },
    {
      label: "REUSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=REUSABLE-EARPLUGS",
    },
    {
      label: "EARMUFFS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=EARMUFFS",
    },
    {
      label: "HEARING ACCESSORIES",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=HEARING-ACCESSORIES",
    },
  ];
  var PPE_EYE = PPE + "&subCategoryName=EYE-PROTECTION";
  var PPE_EYE_SUB = [
    {
      label: "EYE PROTECTION",
      type: 2,
      link: PPE_EYE,
    },
    {
      label: "SAFETY GLASSES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=SAFETY-GLASSES",
    },
    {
      label: "EYE ACCESSORIES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=EYE-ACCESSORIES",
    },
  ];
  var PPE_RESPIRATORY = PPE + "&subCategoryName=RESPIRATORY-GEAR";
  var PPE_RESPIRATORY_SUB = [
    {
      label: "RESPIRATORY GEAR",
      type: 2,
      link: PPE_RESPIRATORY,
    },
    {
      label: "HALF MASKS & ACCESSORIES",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=HALF-MASKS-ACCESSORIES",
    },
    {
      label: "PROMESH",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=PROMESH",
    },
    {
      label: "DISPOSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=DISPOSABLE-RESPIRATORY",
    },
    {
      label: "REUSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=REUSABLE-RESPIRATORY",
    },
  ];
  var PPE_HAND = PPE + "&subCategoryName=HAND-PROTECTION";
  var PPE_HAND_SUB = [
    {
      label: "HAND PROTECTION",
      type: 2,
      link: PPE_HAND,
    },
    {
      label: "CUT RESISTANT RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=CUT-RESISTANT-RANGE",
    },
    {
      label: "LEATHER RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=LEATHER-RANGE",
    },
    {
      label: "DISPOSABLE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=DISPOSABLE-RANGE",
    },
    {
      label: "WELDING RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=WELDING-RANGE",
    },
    {
      label: "HAND ACCESSORIES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=HAND-ACCESSORIES",
    },
    {
      label: "VEND READY GLOVE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=VEND-READY-GLOVE-RANGE",
    },
    {
      label: "GENERAL PURPOSE GLOVES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=GENERAL-PURPOSE",
    },
  ];
  var PPE_WORKWEAR = PPE + "&subCategoryName=PROTECTIVE-WORKWEAR";
  var PPE_WORKWEAR_SUB = [
    {
      label: "PROTECTIVE WORKWEAR",
      type: 2,
      link: PPE_WORKWEAR,
    },
    {
      label: "WELDING PROTECTION",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=WELDING-PROTECTION",
    },
    {
      label: "KNEE PADS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=KNEE-PADS",
    },
    {
      label: "APRONS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=APRONS",
    },
    {
      label: "PROTECTIVE HEADWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-HEADWEAR",
    },
    {
      label: "PROTECTIVE FOOTWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-FOOTWEAR",
    },
  ];
  var PPE_DISPOSABLE = PPE + "&subCategoryName=DISPOSABLE-PROTECTION";
  var PPE_DISPOSABLE_SUB = [
    {
      label: "DISPOSABLE PROTECTION",
      type: 2,
      link: PPE_DISPOSABLE,
    },
    {
      label: "BODY PROTECTION",
      type: 3,
      link: PPE_DISPOSABLE + "&childCategoryName=BODY-PROTECTION",
    },
  ];
  var PPE_SUN = PPE + "&subCategoryName=SUN-PROTECTION";
  var PPE_SUN_SUB = [
    {
      label: "SUN PROTECTION",
      type: 2,
      link: PPE_SUN,
    },
    {
      label: "SUNSCREEN",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUNSCREEN",
    },
    {
      label: "LIP BALM",
      type: 3,
      link: PPE_SUN + "&childCategoryName=LIP-BALM",
    },
    {
      label: "SUN PROTECTION ACCESSORIES",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUN-PROTECTION-ACCESSORIES",
    },
  ];
  var PPE_HYDRATION = PPE + "&subCategoryName=HYDRATION";
  var PPE_HYDRATION_SUB = [
    {
      label: "HYDRATION",
      type: 2,
      link: PPE_HYDRATION,
    },
    {
      label: "HYDRATION CONCENTRATES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-CONCENTRATES",
    },
    {
      label: "COOLERS & DRINK BOTTLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLERS-DRINK-BOTTLES",
    },
    {
      label: "COOLING APPAREL",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLING-APPAREL",
    },
    {
      label: "ICY POLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=ICY-POLES",
    },
    {
      label: "HYDRATION BACKPACK",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-BACKPACK",
    },
  ];

  /* SITE_SAFETY */
  var SITE_SAFETY = "/product-list?categoryName=SITE-SAFETY";
  var SS_DG_CABINETS = SITE_SAFETY + "&subCategoryName=DG-CABINETS";
  var SS_DG_CABINETS_SUB = [
    {
      label: "DANGEROUS GOODS CABINETS",
      type: 2,
      link: SS_DG_CABINETS,
    },
  ];
  var SS_SHORES_EYEWASH =
    SITE_SAFETY + "&subCategoryName=EMERGENCY-SHOWERS-EYEWASH";
  var SS_SHORES_EYEWASH_SUB = [
    {
      label: "EMERGENCY SHOWERS & EYEWASH",
      type: 2,
      link: SS_SHORES_EYEWASH,
    },
    {
      label: "COMBINATION UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=COMBINATION-UNITS",
    },
    {
      label: "FIXED WALL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-WALL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "FIXED PEDESTAL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-PEDESTAL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "LABORATORY UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=LABORATORY-UNITS",
    },
    {
      label: "PORTABLE EYE WASH UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=PORTABLE-EYE-WASH-UNITS",
    },
    {
      label: "SHOWER SPARE PARTS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-SPARE-PARTS",
    },
    {
      label: "SHOWER ACCESSORIES",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-ACCESSORIES",
    },
    {
      label: "SIGNS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SIGNS",
    },
  ];
  var SS_SPILL_KITS = SITE_SAFETY + "&subCategoryName=SPILL-KITS";
  var SS_SPILL_KITS_SUB = [
    {
      label: "SPILL KITS",
      type: 2,
      link: SS_SPILL_KITS,
    },
    {
      label: "GENERAL PURPOSE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=GENERAL-PURPOSE-SPILL-KITS",
    },
    {
      label: "HAZCHEM SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=HAZCHEM-SPILL-KITS",
    },
    {
      label: "OIL & FUEL SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=OIL-FUEL-SPILL-KITS",
    },
    {
      label: "LIGHT VEHICLE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=LIGHT-VEHICLE-SPILL-KITS",
    },
    {
      label: "REFILLS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=REFILLS",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=ACCESSORIES",
    },
  ];
  var SS_SPILL_CONTAINMENT = SITE_SAFETY + "&subCategoryName=SPILL-CONTAINMENT";
  var SS_SPILL_CONTAINMENT_SUB = [
    {
      label: "SPILL CONTAINMENT",
      type: 2,
      link: SS_SPILL_CONTAINMENT,
    },
    {
      label: "SPILL PALLET",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-PALLET",
    },
    {
      label: "LOW PROFILE SPILL DECKS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=LOW-PROFILE-SPILL-DECKS",
    },
    {
      label: "IBC SPILL PALLETS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=IBC-SPILL-PALLETS",
    },
    {
      label: "SPILL TRAYS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-TRAYS",
    },
    {
      label: "OVERPACK DRUMS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=OVERPACK-DRUMS",
    },
    {
      label: "SMOKE STOP CIGARETTE BUTT CANS",
      type: 3,
      link:
        SS_SPILL_CONTAINMENT +
        "&childCategoryName=SMOKE-STOP-CIGARETTE-BUTT-CANS",
    },
  ];
  var SS_FIRST_AID = SITE_SAFETY + "&subCategoryName=FIRST-AID";
  var SS_FIRST_AID_SUB = [
    {
      label: "FIRST AID",
      type: 2,
      link: SS_FIRST_AID,
    },
    {
      label: "RESPONSE KITS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=RESPONSE-KITS",
    },
    {
      label: "REFILLS & REPLACEMENTS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=REFILLS-REPLACEMENTS",
    },
    {
      label: "EYEWASH",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=EYEWASH",
    },
    {
      label: "HYGIENE",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=HYGIENE",
    },
    {
      label: "DEFIBRILLATORS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=DEFIBRILLATORS",
    },
    {
      label: "INCIDENT READY KIT",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=INCIDENT-READY-KIT",
    },
    {
      label: "MOTORIST",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=MOTORIST",
    },
  ];
  var SS_ACCESSORIES = SITE_SAFETY + "&subCategoryName=ACCESSORIES";
  var SS_ACCESSORIES_SUB = [
    {
      label: "ACCESSORIES",
      type: 2,
      link: SS_ACCESSORIES,
    },
    {
      label: "BARRIERS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRIERS",
    },
    {
      label: "BUNTING",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BUNTING",
    },
    {
      label: "PLASTIC CHAIN",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=PLASTIC-CHAIN",
    },
    {
      label: "SAFETY TAGS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=SAFETY-TAGS",
    },
    {
      label: "BARRICADE/HAZARD TAPES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRICADE-HAZARD-TAPES",
    },
    {
      label: "BOLLARDS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BOLLARDS",
    },
    {
      label: "TRAFFIC CONES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=TRAFFIC-CONES",
    },
  ];

  /* HAND TOOLS */
  var HAND_TOOLS = "/product-list?categoryName=HAND-TOOLS";
  var HAND_TOOLS_CUTTINGTOOLS = HAND_TOOLS + "&subCategoryName=CUTTING-TOOLS";
  var HAND_TOOLS_CUTTINGTOOLS_SUB = [
    {
      label: "CUTTING TOOLS",
      type: 2,
      link: HAND_TOOLS_CUTTINGTOOLS,
    },
    {
      label: "CABLE CUTTERS",
      type: 3,
      link: HAND_TOOLS_CUTTINGTOOLS + "&childCategoryName=CABLE-CUTTERS",
    },
    {
      label: "SNIPS & SHEARS",
      type: 3,
      link: HAND_TOOLS_CUTTINGTOOLS + "&childCategoryName=SNIPS-SHEARS",
    },
  ];
  var HAND_TOOLS_FASTENING = HAND_TOOLS + "&subCategoryName=FASTENING";
  var HAND_TOOLS_FASTENING_SUB = [
    {
      label: "FASTENING",
      type: 2,
      link: HAND_TOOLS_FASTENING,
    },
    {
      label: "RATCHET PODGERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=RATCHET-PODGERS",
    },
    {
      label: "SLOGGING SPANNERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=SLOGGING-SPANNERS",
    },

    {
      label: "WRENCHES",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=WRENCHES",
    },
  ];
  var HAND_TOOLS_PLIERS = HAND_TOOLS + "&subCategoryName=PLIERS";
  var HAND_TOOLS_PLIERS_SUB = [
    {
      label: "PLIERS",
      type: 2,
      link: HAND_TOOLS_PLIERS,
    },
    {
      label: "LONG NOSE PLIER",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=LONG-NOSE-PLIER",
    },
    {
      label: "PLIERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=PLIERS",
    },

    {
      label: "SIDE CUTTERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=SIDE-CUTTERS",
    },
    {
      label: "STRIPPING TOOLS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=STRIPPING-TOOLS",
    },
  ];
  var HAND_TOOLS_KNIVES = HAND_TOOLS + "&subCategoryName=KNIVES";
  var HAND_TOOLS_KNIVES_SUB = [
    {
      label: "KNIVES",
      type: 2,
      link: HAND_TOOLS_KNIVES,
    },
    {
      label: "SAFETY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=SAFETY-KNIVES",
    },
    {
      label: "UTILITY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=UTILITY-KNIVES",
    },
    {
      label: "KNIFE",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=KNIFE",
    },
    {
      label: "BLADE REPLACEMENT",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=BLADE-REPLACEMENT",
    },
  ];
  var HAND_TOOLS_ELECTRICAL = HAND_TOOLS + "&subCategoryName=ELECTRICAL";
  var HAND_TOOLS_ELECTRICAL_SUB = [
    {
      label: "ELECTRICAL",
      type: 2,
      link: HAND_TOOLS_ELECTRICAL,
    },
    {
      label: "CABLE CUTTING",
      type: 3,
      link: HAND_TOOLS_ELECTRICAL + "&childCategoryName=CABLE-CUTTING",
    },
    {
      label: "CRIMPERS",
      type: 3,
      link: HAND_TOOLS_ELECTRICAL + "&childCategoryName=CRIMPERS",
    },
    {
      label: "SCREW DRIVERS",
      type: 3,
      link: HAND_TOOLS_ELECTRICAL + "&childCategoryName=SCREW-DRIVERS",
    },
  ];
  var HAND_TOOLS_GASTOOLS = HAND_TOOLS + "&subCategoryName=GAS-TOOLS";
  var HAND_TOOLS_GASTOOLS_SUB = [
    {
      label: "GAS TOOLS",
      type: 2,
      link: HAND_TOOLS_GASTOOLS,
    },
  ];
  var HAND_TOOLS_MEASURING = HAND_TOOLS + "&subCategoryName=MEASURING";
  var HAND_TOOLS_MEASURING_SUB = [
    {
      label: "MEASURING",
      type: 2,
      link: HAND_TOOLS_MEASURING,
    },
    {
      label: "TAPE MEASURES",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=TAPE-MEASURES",
    },
    {
      label: "RULERS",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=RULERS",
    },
  ];
  var HAND_TOOLS_HAMMERS = HAND_TOOLS + "&subCategoryName=HAMMERS";
  var HAND_TOOLS_HAMMERS_SUB = [
    {
      label: "HAMMERS",
      type: 2,
      link: HAND_TOOLS_HAMMERS,
    },
    {
      label: "SHOCK REDUCTION GRIP",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=SHOCK-REDUCTION-GRIP",
    },
    {
      label: "LEATHER GRIP",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=LEATHER-GRIP",
    },
    {
      label: "STEEL CLUB HAMMER",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=STEEL-CLUB-HAMMER",
    },
    {
      label: "SOFT FACE STEEL SLEDGE HAMMER",
      type: 3,
      link:
        HAND_TOOLS_MEASURING +
        "&childCategoryName=SOFT-FACE-STEEL-SLEDGE-HAMMER",
    },
    {
      label: "COPPER SLEDGE HAMMER",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=COPPER-SLEDGE-HAMMER",
    },
    {
      label: "BALL PEIN HAMMER",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=BALL-PEIN-HAMMER",
    },
    {
      label: "GENERAL",
      type: 3,
      link: HAND_TOOLS_MEASURING + "&childCategoryName=GENERAL",
    },
  ];

  /* ELECTRICAL UPDATE */
  // var ELECTRICAL = "/product-list?categoryName=ELECTRICAL";
  // var ELECTRICAL_LVVSD = ELECTRICAL + "&subCategoryName=LOW-VOLTAGE-VARIABLE-SPEED-DRIVES";
  // var ELECTRICAL_LVVSD_SUB = [
  //   {
  //     label: "LOW VOLTAGE VARIABLE SPEED DRIVES",
  //     type: 2,
  //     link: ELECTRICAL_LVVSD,
  //   },
  //   {
  //     label: "COMPACT DRIVES",
  //     type: 3,
  //     link: ELECTRICAL_LVVSD + "&childCategoryName=COMPACT-DRIVES",
  //   },
  // ];
  // var ELECTRICAL_MSAP = ELECTRICAL + "&subCategoryName=MOTOR-STARTING-AND-PROTECTION";
  // var ELECTRICAL_MSAP_SUB = [
  //   {
  //     label: "MOTOR STARTING AND PROTECTION",
  //     type: 2,
  //     link: ELECTRICAL_MSAP,
  //   },
  //   {
  //     label: "CONTACTORS",
  //     type: 3,
  //     link: ELECTRICAL_MSAP + "&childCategoryName=CONTACTORS",
  //   },
  //   {
  //     label: "MOTOR PROTECTION",
  //     type: 3,
  //     link: ELECTRICAL_MSAP + "&childCategoryName=MOTOR-PROTECTION",
  //   },
  // ];
  // var ELECTRICAL_MSAP = ELECTRICAL + "&subCategoryName=CIRCUIT-BREAKERS";
  // var ELECTRICAL_MSAP_SUB = [
  //   {
  //     label: "CIRCUIT BREAKERS",
  //     type: 2,
  //     link: ELECTRICAL_MSAP,
  //   },
  //   {
  //     label: "10A RCBO",
  //     type: 3,
  //     link: ELECTRICAL_MSAP + "&childCategoryName=10A-RCBO",
  //   },
  //   {
  //     label: "16A RCBO",
  //     type: 3,
  //     link: ELECTRICAL_MSAP + "&childCategoryName=16A-RCBO",
  //   },
  //   {
  //     label: "20A RCBO",
  //     type: 3,
  //     link: ELECTRICAL_MSAP + "&childCategoryName=20A-RCBO",
  //   },
  //   {
  //     label: "MOULDED CASE CIRCUIT BREAKERS",
  //     type: 3,
  //     link: ELECTRICAL_MSAP + "&childCategoryName=MOULDED-CASE-CIRCUIT-BREAKERS",
  //   },
  // ];
  // var ELECTRICAL_BCPC = ELECTRICAL + "&subCategoryName=BUSBAR-CHASSIS-POWER-CONNECTIONS";
  // var ELECTRICAL_BCPC_SUB = [
  //   {
  //     label: "BUSBAR, CHASSIS AND POWER CONNECTIONS",
  //     type: 2,
  //     link: ELECTRICAL_BCPC,
  //   },
  // ];
  // var ELECTRICAL_ITS = ELECTRICAL + "&subCategoryName=ISOLATORS-TRANSFER-SWITCHES";
  // var ELECTRICAL_ITS_SUB = [
  //   {
  //     label: "ISOLATORS AND TRANSFER SWITCHES",
  //     type: 2,
  //     link: ELECTRICAL_ITS,
  //   },
  //   {
  //     label: "LOADBREAK SWITCHES",
  //     type: 3,
  //     link: ELECTRICAL_ITS + "&childCategoryName=LOADBREAK-SWITCHES",
  //   },
  //   {
  //     label: "ENCLOSED ISOLATING SWITCHES",
  //     type: 3,
  //     link: ELECTRICAL_ITS + "&childCategoryName=ENCLOSED-ISOLATING-SWITCHES",
  //   },
  //   {
  //     label: "TRANSFER SWITCHES",
  //     type: 3,
  //     link: ELECTRICAL_ITS + "&childCategoryName=TRANSFER-SWITCHES",
  //   },
  // ];
  // var ELECTRICAL_FIFG = ELECTRICAL + "&subCategoryName=FUSE-ISOLATORS-FUSE-GEAR";
  // var ELECTRICAL_FIFG_SUB = [
  //   {
  //     label: "FUSE ISOLATORS AND FUSE GEAR",
  //     type: 2,
  //     link: ELECTRICAL_FIFG,
  //   },
  //   {
  //     label: "FUSES AND FUSE HOLDERS",
  //     type: 3,
  //     link: ELECTRICAL_FIFG + "&childCategoryName=FUSES-FUSE-HOLDERS",
  //   },
  // ];
  // var ELECTRICAL_DB = ELECTRICAL + "&subCategoryName=DISTRIBUTION-BOARDS";
  // var ELECTRICAL_DB_SUB = [
  //   {
  //     label: "DISTRIBUTION BOARDS",
  //     type: 2,
  //     link: ELECTRICAL_DB,
  //   },
  //   {
  //     label: "PANEL BOARDS",
  //     type: 3,
  //     link: ELECTRICAL_DB + "&childCategoryName=PANEL-BOARDS",
  //   },
  // ];
  // var ELECTRICAL_SE = ELECTRICAL + "&subCategoryName=STANDARD-ENCLOSURES";
  // var ELECTRICAL_SE_SUB = [
  //   {
  //     label: "STANDARD ENCLOSURES",
  //     type: 2,
  //     link: ELECTRICAL_SE,
  //   },
  //   {
  //     label: "TERMINAL BOXES",
  //     type: 3,
  //     link: ELECTRICAL_SE + "&childCategoryName=TERMINAL-BOXES",
  //   },
  //   {
  //     label: "WALL MOUNT ENCLOSURES",
  //     type: 3,
  //     link: ELECTRICAL_SE + "&childCategoryName=WALL-MOUNT-ENCLOSURES",
  //   },
  //   {
  //     label: "FLOOR STANDING ENCLOSURES",
  //     type: 3,
  //     link: ELECTRICAL_SE + "&childCategoryName=FLOOR-STANDING-ENCLOSURES",
  //   },
  // ];
  // var ELECTRICAL_CC = ELECTRICAL + "&subCategoryName=CLIMATE-CONTROL";
  // var ELECTRICAL_CC_SUB = [
  //   {
  //     label: "CLIMATE CONTROL",
  //     type: 2,
  //     link: ELECTRICAL_CC,
  //   },
  //   {
  //     label: "HEATERS AND REGULATING DEVICES",
  //     type: 3,
  //     link: ELECTRICAL_CC + "&childCategoryName=HEATERS-REGULATING-DEVICES",
  //   },
  //   {
  //     label: "FILTER FANS AND EXHAUST FANS",
  //     type: 3,
  //     link: ELECTRICAL_CC + "&childCategoryName=FILTER-FANS-EXHAUST-FANS",
  //   },
  // ];
  // var ELECTRICAL_EMCS = ELECTRICAL + "&subCategoryName=ENERGY-MANAGEMENT-CONTROL-SYSTEMS";
  // var ELECTRICAL_EMCS_SUB = [
  //   {
  //     label: "ENERGY MANAGEMENT CONTROL SYSTEMS",
  //     type: 2,
  //     link: ELECTRICAL_EMCS,
  //   },
  //   {
  //     label: "TRANSDUCERS AND TRANSFORMERS",
  //     type: 3,
  //     link: ELECTRICAL_EMCS + "&childCategoryName=HEATERS-REGULATING-DEVICES",
  //   },
  // ];
  // var ELECTRICAL_PBCS = ELECTRICAL + "&subCategoryName=PUSHBUTTONS-CONTROL-SWITCHES";
  // var ELECTRICAL_PBCS_SUB = [
  //   {
  //     label: "PUSHBUTTONS AND CONTROL SWITCHES",
  //     type: 2,
  //     link: ELECTRICAL_PBCS,
  //   },
  //   {
  //     label: "CONTROL AND CAM SWITCHES",
  //     type: 3,
  //     link: ELECTRICAL_PBCS + "&childCategoryName=CONTROL-CAM-SWITCHES",
  //   },
  //   {
  //     label: "PUSHBUTTON AND PILOT LIGHTS",
  //     type: 3,
  //     link: ELECTRICAL_PBCS + "&childCategoryName=PUSHBUTTON-PILOT-LIGHTS",
  //   },
  // ];
  // var ELECTRICAL_SSI = ELECTRICAL + "&subCategoryName=SIGHT-SOUND-INDICATION";
  // var ELECTRICAL_SSI_SUB = [
  //   {
  //     label: "SIGHT & SOUND INDICATION",
  //     type: 2,
  //     link: ELECTRICAL_SSI,
  //   },
  //   {
  //     label: "BEACONS",
  //     type: 3,
  //     link: ELECTRICAL_SSI + "&childCategoryName=BEACONS",
  //   },
  //   {
  //     label: "ELECTRONIC SOUNDERS",
  //     type: 3,
  //     link: ELECTRICAL_SSI + "&childCategoryName=ELECTRONIC-SOUNDERS",
  //   },
  // ];
  // var ELECTRICAL_TPWC = ELECTRICAL + "&subCategoryName=TERMINALS-PRE-WIRED-CABLES";
  // var ELECTRICAL_TPWC_SUB = [
  //   {
  //     label: "TERMINALS AND PRE-WIRED CABLES",
  //     type: 2,
  //     link: ELECTRICAL_TPWC,
  //   },
  // ];
  // var ELECTRICAL_GPR = ELECTRICAL + "&subCategoryName=GENERAL-PURPOSE-RELAYS";
  // var ELECTRICAL_GPR_SUB = [
  //   {
  //     label: "GENERAL PURPOSE RELAYS",
  //     type: 2,
  //     link: ELECTRICAL_GPR,
  //   },
  // ];
  // var ELECTRICAL_MR = ELECTRICAL + "&subCategoryName=MONITORING-RELAYS";
  // var ELECTRICAL_MR_SUB = [
  //   {
  //     label: "MONITORING RELAYS",
  //     type: 2,
  //     link: ELECTRICAL_MR,
  //   },
  // ];
  // var ELECTRICAL_TTSC = ELECTRICAL + "&subCategoryName=TIMERS-TIME-SWITCHES-COUNTERS";
  // var ELECTRICAL_TTSC_SUB = [
  //   {
  //     label: "TIMERS TIME SWITCHES AND COUNTERS",
  //     type: 2,
  //     link: ELECTRICAL_TTSC,
  //   },
  // ];

  /* ELECTRICAL */
  var ELECTRICAL = "/product-list?categoryName=ELECTRICAL";
  var ELECTRICAL_LIGHTING = ELECTRICAL + "&subCategoryName=LIGHTING";
  var ELECTRICAL_LIGHTING_SUB = [
    {
      label: "LIGHTING",
      type: 2,
      link: ELECTRICAL_LIGHTING,
    },
    {
      label: "FLOOD LIGHTING",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=FLOOD-LIGHTING",
    },
    {
      label: "ASY-FLOOD LIGHTING",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=ASY-FLOODLIGHT",
    },
    {
      label: "CONVEYOR TUNNEL LIGHTING",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=CONVEYOR-TUNNEL-LIGHTING",
    },
    {
      label: "MINING CAMPSITE LIGHTING",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=MINING-CAMPSITE-LIGHTING",
    },
    {
      label: "STREET LIGHT",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=STREET-LIGHT",
    },
    {
      label: "INDUSTRIAL",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=INDUSTRIAL",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: ELECTRICAL_LIGHTING + "&childCategoryName=ACCESSORIES",
    },
  ];
  var ELECTRICAL_SWITCH_GEAR = {
    label: "SWITCH GEAR",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=SWITCH-GEAR",
  };
  var ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION = {
    label: "CIRCUIT PROTECTION",
    type: 3,
    link: ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=CIRCUIT-PROTECTION",
  };
  var ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION_CHILD = [
    {
      label: "CIRCUIT BREAKERS",
      type: 4,
      link:
        ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION.link +
        "&fourCategoryName=CIRCUIT-BREAKERS",
    },
    {
      label: "OVERLOADS",
      type: 4,
      link:
        ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION.link +
        "&fourCategoryName=OVERLOADS",
    },
    {
      label: "CONTACTORS",
      type: 4,
      link:
        ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION.link +
        "&fourCategoryName=CONTACTORS",
    },
    {
      label: "RELAYS",
      type: 4,
      link:
        ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION.link +
        "&fourCategoryName=RELAYS",
    },
  ];
  var ELECTRICAL_SWITCH_GEAR_SUBS = [
    {
      label: "OUTLETS SWITCHES",
      type: 3,
      link: ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=OUTLETS-SWITCHES",
    },
    {
      label: "EXTENSION SOCKETS",
      type: 3,
      link:
        ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=EXTENSION-SOCKETS",
    },
    {
      label: "IP66 SOCKET OUTLETS",
      type: 3,
      link:
        ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=IP66-SOCKET-OUTLETS",
    },
    {
      label: "IP66 SWITCHES",
      type: 3,
      link: ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=IP66-SWITCHES",
    },
    {
      label: "IP66 SWITCHED SOCKETS",
      type: 3,
      link:
        ELECTRICAL_SWITCH_GEAR.link +
        "&childCategoryName=IP66-SWITCHED-SOCKETS",
    },
    {
      label: "IP66 PLUGS",
      type: 3,
      link: ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=IP66-PLUGS",
    },
    {
      label: "CHEMICAL RESISTANT SWITCHGEAR",
      type: 3,
      link:
        ELECTRICAL_SWITCH_GEAR.link +
        "&childCategoryName=CHEMICAL-RESISTANT-SWITCHGEAR",
    },
  ];
  var ELECTRICAL_MOTORS = ELECTRICAL + "&subCategoryName=MOTORS";
  var ELECTRICAL_MOTORS_SUB = [
    {
      label: "MOTORS",
      type: 2,
      link: ELECTRICAL_MOTORS,
    },
    {
      label: "VIBRATING MOTORS",
      type: 3,
      link: ELECTRICAL_MOTORS + "&childCategoryName=VIBRATING-MOTORS",
    },
    {
      label: "415V MOTORS",
      type: 3,
      link: ELECTRICAL_MOTORS + "&childCategoryName=415V-MOTORS",
    },
    {
      label: "EXCITER",
      type: 3,
      link: ELECTRICAL_MOTORS + "&childCategoryName=EXCITER",
    },
  ];
  var ELECTRICAL_BORE_PUMPS = ELECTRICAL + "&subCategoryName=BORE-PUMPS";
  var ELECTRICAL_BORE_PUMPS_SUB = [
    {
      label: "BORE PUMPS",
      type: 2,
      link: ELECTRICAL_BORE_PUMPS,
    },
  ];
  var ELECTRICAL_WIRING_ACCESSORIES =
    ELECTRICAL + "&subCategoryName=WIRING-ACCESSORIES";
  var ELECTRICAL_WIRING_ACCESSORIES_SUB = [
    {
      label: "WIRING ACCESSORIES",
      type: 2,
      link: ELECTRICAL_WIRING_ACCESSORIES,
    },
    {
      label: "PVC CONDUIT FITTINGS",
      type: 3,
      link:
        ELECTRICAL_WIRING_ACCESSORIES +
        "&childCategoryName=PVC-CONDUIT-FITTINGS",
    },
    {
      label: "CORRUGATED CONDUIT",
      type: 3,
      link:
        ELECTRICAL_WIRING_ACCESSORIES + "&childCategoryName=CORRUGATED-CONDUIT",
    },
  ];
  var ELECTRICAL_CABLES = {
    label: "CABLES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=CABLES",
  };
  var EC_CONSTRUCTION_CABLES = {
    label: "CONSTRUCTION CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=CONSTRUCTION-CABLES",
  };
  var EC_CC_4 = [
    {
      label: "SINGLE CORE",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SINGLE-CORE",
    },
    {
      label: "SDI 16MM",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SDI-16MM",
    },
    {
      label: "FLAT",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT",
    },
    {
      label: "FLAT 3 CORES",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT-3-CORES",
    },
    {
      label: "ORANGE CIRCULAR POWER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=ORANGE-CIRCULAR-POWER",
    },
    {
      label: "XLPE SINGLE CORE, COPPERCONDUCTOR(CU)",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=XLPE-SINGLE-CORE-CU",
    },
    {
      label: "XLPE MULTI CORE COPPER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-MULTI-CORE-COPPER",
    },
  ];
  var EC_INDUSTRIAL_CABLES = {
    label: "INDUSTRIAL CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=INDUSTRIAL-CABLES",
  };
  var EC_IC_4 = [
    {
      label: "FLEXIBLE CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=FLEXIBLE-CABLES",
    },
    {
      label: "WSD CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=WSD-CABLES",
    },
    {
      label: "STEEL WIRE AMOURED",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=STEEL-WIRE-AMOURED",
    },
  ];
  var EC_MINING_CABLES = {
    label: "MINING CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=MINING-CABLES",
  };
  var EC_MC_4 = [
    {
      label: "DETONATOR CABLES",
      type: 4,
      link: EC_MINING_CABLES.link + "&fourCategoryName=DETONATOR-CABLES",
    },
  ];
  var EC_SPECIALITY_CABLES = {
    label: "SPECIALITY CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=SPECIALITY-CABLES",
  };
  var EC_SC_4 = [
    {
      label: "SOLAR CABLE - SINGLE OR TWINCORES",
      type: 4,
      link:
        EC_SPECIALITY_CABLES.link +
        "&fourCategoryName=SOLAR-CABLE-SINGLE-OR-TWINCORES",
    },
  ];
  var ELECTRICAL_ENCLOSURES = {
    label: "ENCLOSURES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=ENCLOSURES",
  };
  var EE_WALL_MOUNTED = {
    label: "WALL MOUNTED",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=WALL-MOUNTED",
  };
  var EE_WM_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ALUMINIUM",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=ALUMINIUM",
    },
    {
      label: "GRP",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=GRP",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=ACCESSORIES",
    },
  ];
  var EE_SLOPING_ROOF = {
    label: "SLOPING ROOF",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=SLOPING-ROOF",
  };
  var EE_SR_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEELHD",
    },
    {
      label: "STAINLESS STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEELHD",
    },
    {
      label: "STEEL WITH SUN SHIELDS",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL-WITH-SUN-SHIELDS",
    },
  ];
  var EE_FLOOR_STANDING = {
    label: "FLOOR STANDING",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=FLOOR-STANDING",
  };
  var EE_FS_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=ACCESSORIES",
    },
  ];
  var EE_PVC_ADAPTABLE_BOXES = {
    label: "PVC ADAPTABLE BOXES",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=PVC-ADAPTABLE-BOXES",
  };

  /* INDUSTRIAL */
  var INDUSTRIAL = "/product-list?categoryName=INDUSTRIAL";
  var INDUSTRIAL_ABRASIVES_CUTTING =
    INDUSTRIAL + "&subCategoryName=ABRASIVES-CUTTING";
  var INDUSTRIAL_ABRASIVES_CUTTING_SUB = [
    {
      label: "ABRASIVES & CUTTING",
      type: 2,
      link: INDUSTRIAL_ABRASIVES_CUTTING,
    },
    {
      label: "BELTS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BELTS",
    },
    {
      label: "DISCS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=DISCS",
    },
    {
      label: "BONDED",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BONDED",
    },
    {
      label: "BRUSHES",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BRUSHES",
    },
    {
      label: "POLISHING & FINISHING",
      type: 3,
      link:
        INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=POLISHING-FINISHING",
    },
    {
      label: "SANDING",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=SANDING",
    },
    {
      label: "SURFACE CONDITIONING",
      type: 3,
      link:
        INDUSTRIAL_ABRASIVES_CUTTING +
        "&childCategoryName=SURFACE-CONDITIONING",
    },
  ];
  var INDUSTRIAL_DRILLING = INDUSTRIAL + "&subCategoryName=DRILLING";
  var INDUSTRIAL_DRILLING_SUB = [
    {
      label: "DRILLING",
      type: 2,
      link: INDUSTRIAL_DRILLING,
    },
    {
      label: "DRILL BITS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-BITS",
    },
    {
      label: "DRILL SETS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-SETS",
    },
    {
      label: "TCT HOLESAWS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=TCT-HOLESAWS",
    },
    {
      label: "TCT HOLE CUTTER",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=TCT-HOLE-CUTTER",
    },
    {
      label: "ARBORS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=ARBORS",
    },
    {
      label: "HSS HOLESAWS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=HSS-HOLESAWS",
    },
    {
      label: "HSS BROACH CUTTERS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=HSS-BROACH-CUTTERS",
    },
  ];
  var INDUSTRIAL_LUBRICATION_EQUIPMENT =
    INDUSTRIAL + "&subCategoryName=LUBRICATION-EQUIPMENT";
  var INDUSTRIAL_LUBRICATION_EQUIPMENT_SUB = [
    {
      label: "LUBRICATION & EQUIPMENT",
      type: 2,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT,
    },
    {
      label: "GENERAL",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GENERAL",
    },
    {
      label: "ANTI-SIEZE",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=ANTI-SIEZE",
    },
    {
      label: "CLEANERS & DISPERSANTS",
      type: 3,
      link:
        INDUSTRIAL_LUBRICATION_EQUIPMENT +
        "&childCategoryName=CLEANERS-DISPERSANTS",
    },
    {
      label: "CUTTING FLUIDS",
      type: 3,
      link:
        INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=CUTTING-FLUIDS",
    },
    {
      label: "GREASES",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GREASES",
    },
  ];
  var INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES =
    INDUSTRIAL + "&subCategoryName=PAINT-EQUIPMENT-SUPPLIES";
  var INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES_SUB = [
    {
      label: "PAINT,EQUIPMENT & SUPPLIES",
      type: 2,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES,
    },
    {
      label: "MARKING PAINT",
      type: 3,
      link:
        INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES +
        "&childCategoryName=MARKING-PAINT",
    },
    {
      label: "PAINT",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=PAINT",
    },
    {
      label: "AEROSOLS",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=AEROSOLS",
    },
  ];
  var INDUSTRIAL_PUMPS_VALVES_PARTS =
    INDUSTRIAL + "&subCategoryName=PUMPS-VALVES-PARTS";
  var INDUSTRIAL_PUMPS_VALVES_PARTS_SUB = [
    {
      label: "PUMPS,VALVES & PARTS",
      type: 2,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS,
    },
    {
      label: "FITTINGS & PARTS",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=FITTINGS-PARTS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=VALVES",
    },
    {
      label: "PUMPS",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=PUMPS",
    },
    {
      label: "TRANSFER KITS",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=TRANSFER-KITS",
    },
  ];
  var INDUSTRIAL_HOSES_FITTINGS =
    INDUSTRIAL + "&subCategoryName=HOSES-FITTINGS";
  var INDUSTRIAL_HOSES_FITTINGS_SUB = [
    { label: "HOSES & FITTINGS", type: 2, link: INDUSTRIAL_HOSES_FITTINGS },
    {
      label: "AIR & WATER HOSE",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-WATER-HOSE",
    },
    {
      label: "AIR LINE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-LINE-FITTINGS",
    },
    {
      label: "HOSE CLAMPS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-CLAMPS",
    },
    {
      label: "HOSE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-FITTINGS",
    },
    {
      label: "HOSE REELS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-REELS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=VALVES",
    },
    {
      label: "THREADED FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=THREADED-FITTINGS",
    },
  ];
  var INDUSTRIAL_PIPE_REPAIR = INDUSTRIAL + "&subCategoryName=PIPE-REPAIR";
  var INDUSTRIAL_PIPE_REPAIR_SUB = [
    { label: "PIPE REPAIR", type: 2, link: INDUSTRIAL_PIPE_REPAIR },
  ];
  var INDUSTRIAL_LADDERS = INDUSTRIAL + "&subCategoryName=LADDERS";
  var INDUSTRIAL_LADDERS_SUB = [
    { label: "LADDERS", type: 2, link: INDUSTRIAL_LADDERS },
    {
      label: "STAIRWAY LADDERS",
      type: 3,
      link: INDUSTRIAL_LADDERS + "&childCategoryName=STAIRWAY-LADDERS",
    },
    {
      label: "SINGLE SIDED STEPLADDERS",
      type: 3,
      link: INDUSTRIAL_LADDERS + "&childCategoryName=SINGLE-SIDED-STEPLADDERS",
    },
    {
      label: "DOUBLE SIDED STEPLADDERS",
      type: 3,
      link: INDUSTRIAL_LADDERS + "&childCategoryName=DOUBLE-SIDED-STEPLADDERS",
    },
    {
      label: "MULTI USE LADDERS",
      type: 3,
      link: INDUSTRIAL_LADDERS + "&childCategoryName=MULTI-LADDERS",
    },
    {
      label: "MULTI TELESCOPIC LADDERS",
      type: 3,
      link: INDUSTRIAL_LADDERS + "&childCategoryName=MULTI-TELESCOPIC-LADDERS",
    },
    {
      label: "LADDER PARTS",
      type: 3,
      link: INDUSTRIAL_LADDERS + "&childCategoryName=PARTS",
    },
  ];
  var INDUSTRIAL_FASTENERS = INDUSTRIAL + "&subCategoryName=FASTENERS";
  var INDUSTRIAL_FASTENERS_SUB = [
    { label: "FASTENERS", type: 2, link: INDUSTRIAL_FASTENERS },
    {
      label: "BOLTS",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=BOLTS",
    },
    {
      label: "NUTS",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=NUTS",
    },
    {
      label: "SCREWS",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=SCREWS",
    },
    {
      label: "WASHER FLAT",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=WASHER-FLAT",
    },
    {
      label: "WASHER SPRING",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=WASHER-SPRING",
    },
    {
      label: "ROD",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=ROD-THREADED",
    },
    {
      label: "STUD CHEMSET",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=STUD-CHEMSET",
    },
    {
      label: "HARDWARE",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=HARDWARE",
    },
  ];
  //#endregion

  // console.log(EC_CONSTRUCTION_CABLES);

  return (
    <>
      <Navbar collapseOnSelect className="nav_bgc w-100" expand="lg">
        <Container className="w-100 navb" fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            {/* ************   Mega Menu  ***************  */}
            <Nav className="w3c_nav">
              {mainCategory.map((main) => {
                return (
                  <div className="w3c_dropdown" key={main.link}>
                    <div className="dropbtn">
                      <a href={`/product-list?categoryName=${main.link}`}>
                        {main.label}
                      </a>
                    </div>
                    <div className="dropdown-content">
                      <div className="row">
                        <ul className="column">
                          {subCategory1[main.link]?.map((sub, index) => {
                            return (
                              <>
                                <li key={`${sub}-${index}`} className="subCat">
                                  <a
                                    href={`/product-list?categoryName=${main.link}&subCategoryName=${sub}`}
                                  >
                                    {sub.replace(/-/g, " ")}
                                  </a>
                                </li>
                                {childCategory[main.link + "/" + sub]?.map(
                                  (child, index) => {
                                    return (
                                      <>
                                        <li
                                          key={`${child}-${index}`}
                                          className="childCat"
                                        >
                                          <a
                                            href={`/product-list?categoryName=${main.link}&subCategoryName=${sub}&childCategoryName=${child}`}
                                          >
                                            {child.replace(/-/g, " ")}
                                          </a>
                                        </li>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            );
                          })}
                        </ul>
                        <ul className="column">
                          {subCategory2[main.link]?.map((sub, index) => {
                            return (
                              <>
                                <li key={`${sub}-${index}`} className="subCat">
                                  <a
                                    href={`/product-list?categoryName=${main.link}&subCategoryName=${sub}`}
                                  >
                                    {sub.replace(/-/g, " ")}
                                  </a>
                                </li>
                                {childCategory[main.link + "/" + sub]?.map(
                                  (child, index) => {
                                    return (
                                      <>
                                        <li
                                          key={`${child}-${index}`}
                                          className="childCat"
                                        >
                                          <a
                                            href={`/product-list?categoryName=${main.link}&subCategoryName=${sub}&childCategoryName=${child}`}
                                          >
                                            {child.replace(/-/g, " ")}
                                          </a>
                                        </li>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            );
                          })}
                        </ul>
                        <ul className="column">
                          {subCategory3[main.link]?.map((sub, index) => {
                            return (
                              <>
                                <li key={`${sub}-${index}`} className="subCat">
                                  <a
                                    href={`/product-list?categoryName=${main.link}&subCategoryName=${sub}`}
                                  >
                                    {sub.replace(/-/g, " ")}
                                  </a>
                                </li>
                                {childCategory[main.link + "/" + sub]?.map(
                                  (child, index) => {
                                    return (
                                      <>
                                        <li
                                          key={`${child}-${index}`}
                                          className="childCat"
                                        >
                                          <a
                                            href={`/product-list?categoryName=${main.link}&subCategoryName=${sub}&childCategoryName=${child}`}
                                          >
                                            {child.replace(/-/g, " ")}
                                          </a>
                                        </li>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar collapseOnSelect className="nav_bgc w-100" expand="lg">
        <Container className="w-100 navb" fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            {/* ************   Mega Menu  ***************  */}
            <Nav className="w3c_nav">
              {/* PPE */}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={PPE}>PPE</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {PPE_HEADWEAR_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}

                      {PPE_HEARING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PPE_HYDRATION_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>

                    <ul className="column">
                      {PPE_EYE_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PPE_RESPIRATORY_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PPE_HAND_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>

                    <ul className="column">
                      {PPE_WORKWEAR_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PPE_SUN_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PPE_FACE_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PPE_DISPOSABLE_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SITE SAFETY */}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={SITE_SAFETY}>SITE SAFETY</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {SS_SPILL_KITS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {SS_FIRST_AID_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {SS_SPILL_CONTAINMENT_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {SS_ACCESSORIES_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {SS_SHORES_EYEWASH_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {SS_DG_CABINETS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* POWER AIR */}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={POWER_AIR}>POWER/AIR</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {POWER_AIR_POWER_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {POWER_AIR_CHARGERS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {POWER_AIR_AIR_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {POWER_AIR_GENERATORS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {POWER_AIR_CLEAN_ENERGY_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* HAND TOOLS */}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={HAND_TOOLS}>HAND TOOLS</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {HAND_TOOLS_CUTTINGTOOLS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {HAND_TOOLS_FASTENING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {HAND_TOOLS_HAMMERS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {HAND_TOOLS_ELECTRICAL_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {HAND_TOOLS_MEASURING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {HAND_TOOLS_GASTOOLS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {HAND_TOOLS_PLIERS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {HAND_TOOLS_KNIVES_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* INDUSTRIAL*/}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={INDUSTRIAL}>INDUSTRIAL</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {INDUSTRIAL_ABRASIVES_CUTTING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {INDUSTRIAL_LUBRICATION_EQUIPMENT_SUB.map(
                        (item, index) => {
                          return (
                            <li
                              key={`${item.link}-${index}`}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        }
                      )}
                      {INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES_SUB.map(
                        (item, index) => {
                          return (
                            <li
                              key={`${item.link}-${index}`}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        }
                      )}
                    </ul>
                    <ul className="column">
                      {INDUSTRIAL_DRILLING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {INDUSTRIAL_FASTENERS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {INDUSTRIAL_PUMPS_VALVES_PARTS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {INDUSTRIAL_HOSES_FITTINGS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {INDUSTRIAL_LADDERS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {INDUSTRIAL_PIPE_REPAIR_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FABRICATION*/}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={FABRICATION}>FABRICATION</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {FABRICATION_OXYGEN_ACETYLENE_CUTTING_HEATING_SUB.map(
                        (item, index) => {
                          return (
                            <li
                              key={`${item.link}-${index}`}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        }
                      )}
                      {FABRICATION_MIG_WELDING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {FABRICATION_TIG_STICK_WELDING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {FABRICATION_WELDING_HELMETS_ACCESSORIES_TOOLING_SUB.map(
                        (item, index) => {
                          return (
                            <li
                              key={`${item.link}-${index}`}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        }
                      )}
                    </ul>
                    <ul className="column">
                      {FABRICATION_WELDING_PPE_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ELECTRICAL */}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={ELECTRICAL}>ELECTRICAL</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {/* CABLES */}
                      <li className="subCat">
                        <a href={ELECTRICAL_CABLES.link}>
                          {ELECTRICAL_CABLES.label}
                        </a>
                      </li>
                      <li className="parent childCat">
                        <a
                          className="parentA"
                          href={EC_CONSTRUCTION_CABLES.link}
                        >
                          {EC_CONSTRUCTION_CABLES.label}
                          <span className="expand ms-1"> »</span>
                        </a>
                        <ul className="child">
                          {EC_CC_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      <li className="parent childCat">
                        <a className="parentA" href={EC_INDUSTRIAL_CABLES.link}>
                          {EC_INDUSTRIAL_CABLES.label}
                          <span className="expand ms-1">»</span>
                        </a>
                        <ul className="child">
                          {EC_IC_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      <li className="parent childCat">
                        <a className="parentA" href={EC_MINING_CABLES.link}>
                          {EC_MINING_CABLES.label}
                          <span className="expand ms-1">»</span>
                        </a>
                        <ul className="child">
                          {EC_MC_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      <li className="parent childCat">
                        <a className="parentA" href={EC_SPECIALITY_CABLES.link}>
                          {EC_SPECIALITY_CABLES.label}
                          <span className="expand ms-1">»</span>
                        </a>
                        <ul className="child">
                          {EC_SC_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li className="subCat">
                        <a href={ELECTRICAL_SWITCH_GEAR.link}>
                          {ELECTRICAL_SWITCH_GEAR.label}
                        </a>
                      </li>
                      <li className="parent childCat">
                        <a
                          className="parentA"
                          href={ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION.link}
                        >
                          {ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION.label}
                          <span className="expand ms-1"> »</span>
                        </a>
                        <ul className="child">
                          {ELECTRICAL_SWITCH_GEAR_CIRCUIT_PROTECTION_CHILD.map(
                            (item, index) => {
                              return (
                                <li
                                  key={`${item.link}-${index}`}
                                  className={nav_color[item.type]}
                                >
                                  <a href={item.link}>{item.label} </a>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </li>
                      {ELECTRICAL_SWITCH_GEAR_SUBS.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>

                    <ul className="column">
                      {/* ENCLOSURES */}
                      <li className="subCat">
                        <a href={ELECTRICAL_ENCLOSURES.link}>
                          {ELECTRICAL_ENCLOSURES.label}
                        </a>
                      </li>
                      <li>
                        <a
                          className="parentA"
                          href={EE_PVC_ADAPTABLE_BOXES.link}
                        >
                          {EE_PVC_ADAPTABLE_BOXES.label}
                          {/* <span className="expand ms-2"> »</span> */}
                        </a>
                      </li>

                      <li className="parent childCat">
                        <a className="parentA" href={EE_WALL_MOUNTED.link}>
                          {EE_WALL_MOUNTED.label}
                          <span className="expand ms-1"> »</span>
                        </a>
                        <ul className="child">
                          {EE_WM_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      <li className="parent childCat">
                        <a className="parentA" href={EE_SLOPING_ROOF.link}>
                          {EE_SLOPING_ROOF.label}
                          <span className="expand ms-1">»</span>
                        </a>
                        <ul className="child">
                          {EE_SR_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      <li className="parent childCat">
                        <a className="parentA" href={EE_FLOOR_STANDING.link}>
                          {EE_FLOOR_STANDING.label}
                          <span className="expand ms-1">»</span>
                        </a>
                        <ul className="child">
                          {EE_FS_4.map((item, index) => {
                            return (
                              <li
                                key={`${item.link}-${index}`}
                                className={nav_color[item.type]}
                              >
                                <a href={item.link}>{item.label} </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>

                      {ELECTRICAL_LIGHTING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}

                      {/* <ul className="subCat">

                      {ELECTRICAL_LIGHTING_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul> */}
                    </ul>

                    <ul className="column">
                      {ELECTRICAL_MOTORS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {ELECTRICAL_BORE_PUMPS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}

                      {ELECTRICAL_WIRING_ACCESSORIES_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* PROCESSING */}
              <div className="w3c_dropdown">
                <div className="dropbtn">
                  <a href={PROCESSING}>PROCESSING</a>
                </div>
                <div className="dropdown-content">
                  <div className="row">
                    <ul className="column">
                      {PROCESSING_LAB_CHEMICALS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                      {PROCESSING_LAB_EQUIPMENTS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {PROCESSING_GRINDING_MEDIA_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="column">
                      {PROCESSING_REAGENTS_SUB.map((item, index) => {
                        return (
                          <li
                            key={`${item.link}-${index}`}
                            className={nav_color[item.type]}
                          >
                            <a href={item.link}>{item.label} </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbCopy;
