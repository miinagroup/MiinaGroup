import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./AdminProductPanel.module.css";

const AdminProductPanel = ({handleShow, selectedProduct, addToPOCartCheck, poCartBtnText}) => {
     return <>
     <button
       onClick={handleShow}
       className="ms-2 p-0 ps-1 pe-1 mb-1"
     >
       Edit
     </button>
     <Button
       onClick={() => addToPOCartCheck()}
       className="ms-2 p-0 ps-1 pe-1 mb-1 btn btn-success"
       disabled={
         selectedProduct === "Please-Select" ||
         poCartBtnText !== "Add to PO cart"
       }
     >
       {poCartBtnText}
     </Button>
     <LinkContainer to="/admin/poCart-details">
       <Button className="ms-2 p-0 ps-1 pe-1 mb-1 btn btn-success" ><i class="bi bi-box-arrow-in-up-right"></i></Button>
     </LinkContainer>
   </>
}

export default AdminProductPanel;
