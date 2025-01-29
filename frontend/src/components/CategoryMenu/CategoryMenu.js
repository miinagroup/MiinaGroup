import styles from "./CategoryMenu.module.css";
import { mainCategories } from "../../constants.js";

const CategoryMenu = ({isMobile, selectedCategory, setSelectedCategory}) => {

  console.log("isMobile", isMobile)

    return <div className={`${styles.categoriesList} ${styles.mobile} category-list-links`}>
    {mainCategories.map(category => {
      return <a
        key={category.label}
        className={selectedCategory === category.link ? styles.highlighted : styles.categoryItem}
        onClick={() => setSelectedCategory(category.link)}
        href={`/product-list?categoryPath=${category.link}`}
      >
        {category.label}
      </a>
    })}
  </div>
}

export default CategoryMenu;