import { Button } from "react-bootstrap";

const AdminProductPanel = ({ handleShow, selectedProduct, addToPOCartCheck, poCartBtnText }) => {
  return <Button
      onClick={handleShow}
      className="ms-2 p-0 ps-1 pe-1 mb-1"
    >
      Edit
    </Button>
 
}

export default AdminProductPanel;
