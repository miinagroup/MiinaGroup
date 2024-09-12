import { useEffect, useState } from "react";
import styles from "./NewCategoryComponent.module.css";

const mainCategoryForVisitor = [
    {
      label: "PPE",
      link: "PPE",
      image: "/images/categoriesIcons/PPE.png"
    },
    {
      label: "SITE SAFETY",
      link: "SITE-SAFETY",
      image: "/images/categoriesIcons/SITE_SAFETY.png"

    },
    {
      label: "POWER/AIR",
      link: "POWER-AIR",
      image: "/images/categoriesIcons/POWER.png"

    },
    {
      label: "HAND TOOLS",
      link: "HAND-TOOLS",
      image: "/images/categoriesIcons/HAND_TOOLS.png"
    },
    {
      label: "INDUSTRIAL",
      link: "INDUSTRIAL",
      image: "/images/categoriesIcons/INDUSTRIAL.png"
    },
    {
      label: "MECHANICAL",
      link: "MECHANICAL",
      image: "/images/categoriesIcons/MECHANICAL.png"

    },
    {
      label: "ELECTRICAL",
      link: "ELECTRICAL",
      image: "/images/categoriesIcons/ELECTRICAL.png"
    },
    {
      label: "MINING",
      link: "MINING",
      image: "/images/categoriesIcons/MINING.png"

    },
  ];

  const NewCategoryComponent = ({subcategories}) => {
    const [newArraySubcategories , setNewArraySubcategories] = useState([]);
    const convertToArrayOfObjects = (data, numPerRow) => {
    const result = [];
    const categories = Object.keys(data);
  
  for (let i = 0; i < categories.length; i += Number(numPerRow)) {
    const chunk = categories.slice(i, i + Number(numPerRow)).reduce((acc, category) => {
      acc[category] = data[category];
      return acc;
    }, {});
    
    result.push(chunk);
  }
  
  return result;
};


useEffect(() => {
  if (window.innerWidth > 1025) {
    const newArray = convertToArrayOfObjects(subcategories, 4);
    setNewArraySubcategories(newArray);
  } else if(window.innerWidth > 482 ) {
    const newArray = convertToArrayOfObjects(subcategories, 2);
    setNewArraySubcategories(newArray);
  } else if( window.innerWidth > 350 ) {
    const newArray = convertToArrayOfObjects(subcategories, 1);
    setNewArraySubcategories(newArray);
  }
}, [])

return<>
  {newArraySubcategories?.map(subcategories => {
      return <section className={styles.category_grid}>
  <div className={styles.category_grid__wrap}>
  {mainCategoryForVisitor?.map(card => {

return Object.keys(subcategories).map(name => {
  if(name === card.link) {       
    return <div className={styles.category_grid__single}>
        <img className={styles.category_grid__img} loading="lazy" src={card.image} alt={card.label} />
    <div className={styles.category_grid__text_wrap}>
        <div className={styles.category_grid__text}>
            <a href={`/product-list?categoryName=${card.link}`}><h2 className={styles.category_grid__title}>{card.label}</h2></a>
            <div className={styles.category_grid__menu}>
                <div className={styles.category_grid__menu_wrap}>
                {subcategories[name].sort().map(subcategory => {
                  return <a className={styles.category_grid__menu_link} href={`/product-list?categoryName=${card.link}&subCategoryName=${subcategory}`}>{subcategory.replace(/[-_]/g,' ')}</a>
                })}
                </div>
            </div>
        </div>
        <a  className={styles.category_grid__link} href={`/product-list?categoryName=${card.link}`}><span>Shop now</span><i class="bi bi-chevron-double-right"></i></a>
    </div>
  </div>
  }
})
    })
    } 
    </div>
  </section>
      })
    }
    </>   
  }

  export default NewCategoryComponent;
