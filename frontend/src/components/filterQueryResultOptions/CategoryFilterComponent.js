import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {
  const { categories } = useSelector((state) => state.getCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const myRefs = useRef([]);

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      return { ...items, [category.name]: e.target.checked };
    });

    // 就是说选择 main catergory，用 / split，然后[0]截取所需内容：  0/1/2/3/4/5/6
    var selectedMainCategory = category.name.split("/")[0];
    // 应该是？ 给每个categories 的checkbox都 赋予一个idx id，用来跟下面的indexesofMainCategory来联动
    var allCategories = myRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    });
    // 自己查一下reduce是啥。 这里返回一个空的array []， 因为下面要写入东西。acc是个自定义变量accumulator
    // 如果selected的main category等于cat，那么push to the array item.idx， id of the category
    // 如果consol.log（indexesOfMainCategory， 就会发现，选择了一个category之后会返回其所在的index number，
    // 如果选了subcategories，就会返回所有的main category里的subcat
    // 懂了，就是说，先var一个indexesOfMainCategory 然后用reduce function
    // var indexesOfMainCategory = allCategories.reduce (（） => {}, []) 他会执行一个call back 以及一个空的array, 随后写入new value
    // 然后selectedMainCategory，判定一下，如果等于 cat，那么push idx进去，并写入 array里面
    // 这样的话，就能选定subcat 来锁定其main cat 下面所有的 sub cat

    var indexesOfMainCategory = allCategories.reduce((acc, item) => {
        var cat = item.name.split("/")[0];
        if (selectedMainCategory === cat) {
            acc.push(item.idx); 
        }
        return acc;
    }, [])

    // check一下check box，如果有值，则XXXX，如果没有则else
     if (e.target.checked) {
         setSelectedCategories((old) => [...old, "cat"]);
         // map一下indexesOfMainCategory，如果包含值，则其他的categories变成disabled。有！判定
         myRefs.current.map((_, idx) => {
             if (!indexesOfMainCategory.includes(idx)) myRefs.current[idx].disabled = true;
              return "";
         })
         // else 如果unselected所有的categories，然后should activity again
         // 所以如果没有选择了，就 window.location.href = "/product-list"; 一下
     } else {
         setSelectedCategories((old) => {
             var a = [...old];
             a.pop();
             if (a.length === 0) {
                window.location.href = "/product-list"; 
             }
             return a;
         })

         // 再搞一个idx2，然后判定一下 idx2 等不等于 idx，如果不等，则disable其他的。这样是如果只选择main category的时候用到
         myRefs.current.map((_, idx2) => {
             if (allCategories.length === 1) {
                 if (idx2 !== idx) myRefs.current[idx2].disabled = false;
             } else if (selectedCategories.length === 1) myRefs.current[idx2].disabled = false;
            return "";
         })
     }
  };

  return (
    <>
      <span className="fw-bold">Category</span>
      <Form>
        {categories.map((category, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              {/* ref 是用来 collect 所有的inputs */}
              <Form.Check.Input
                ref={(el) => (myRefs.current[idx] = el)}
                type="checkbox"
                isValid
                onChange={(e) => selectCategory(e, category, idx)}
              />
              <Form.Check.Label style={{ cursor: "pointer" }}>
                {category.name}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CategoryFilterComponent;





/* import React from "react";
import { Form } from "react-bootstrap";
import "./Filter.css"

const FilterComponent = () => {
  return (
    <div className="accordion_container">
      <div className="accordion">
        <div className="accordion-header">
          <a className="btn" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="true">
            PPE
          </a>
        </div>
        <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
          <div className="accordion-body">
            <Form>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div className="categories" key={idx}>
                  <a className="accordion_categories" type="checkbox" id={`check-api2-${idx}`}>
                    <Form.Check.Label style={{ cursor: "pointer" }}>
                      Category-{idx}
                    </Form.Check.Label>
                  </a>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion-header">
          <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseTwo">
            SITE SAFETY
          </a>
        </div>
        <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
          <div className="accordion-body">
          <Form>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div className="categories" key={idx}>
                  <a className="accordion_categories" type="checkbox" id={`check-api2-${idx}`}>
                    <Form.Check.Label style={{ cursor: "pointer" }}>
                      Category-{idx}
                    </Form.Check.Label>
                  </a>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion-header">
          <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseThree">
            POWER TOOLS
          </a>
        </div>
        <div id="collapseThree" className="collapse" data-bs-parent="#accordion">
          <div className="accordion-body">
          <Form>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div className="categories" key={idx}>
                  <a className="accordion_categories" type="checkbox" id={`check-api2-${idx}`}>
                    <Form.Check.Label style={{ cursor: "pointer" }}>
                      Category-{idx}
                    </Form.Check.Label>
                  </a>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion-header">
          <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseFour">
            ELECTRICAL
          </a>
        </div>
        <div id="collapseFour" className="collapse" data-bs-parent="#accordion">
          <div className="accordion-body">
          <Form>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div className="categories" key={idx}>
                  <a className="accordion_categories" type="checkbox" id={`check-api2-${idx}`}>
                    <Form.Check.Label style={{ cursor: "pointer" }}>
                      Category-{idx}
                    </Form.Check.Label>
                  </a>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion-header">
          <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseFive">
            MECHANICAL
          </a>
        </div>
        <div id="collapseFive" className="collapse" data-bs-parent="#accordion">
          <div className="accordion-body">
          <Form>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div className="categories" key={idx}>
                  <a className="accordion_categories" type="checkbox" id={`check-api2-${idx}`}>
                    <Form.Check.Label style={{ cursor: "pointer" }}>
                      Category-{idx}
                    </Form.Check.Label>
                  </a>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion-header">
          <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseSix">
            HYDRATION
          </a>
        </div>
        <div id="collapseSix" className="collapse" data-bs-parent="#accordion">
          <div className="accordion-body">
          <Form>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div className="categories" key={idx}>
                  <a className="accordion_categories" type="checkbox" id={`check-api2-${idx}`}>
                    <Form.Check.Label style={{ cursor: "pointer" }}>
                      Category-{idx}
                    </Form.Check.Label>
                  </a>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
 */