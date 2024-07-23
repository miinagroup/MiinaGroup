import { Button } from "react-bootstrap";


const RemoveFromOrderComponent = ({ orderId, itemId, removeFromOrderHandler = false }) => {



    return (
       <Button
       type="button"
       variant="light"
       onClick={removeFromOrderHandler ? () => removeFromOrderHandler(orderId, itemId,) : undefined}
       >
         <i className="bi bi-trash"></i>  
       </Button>  
    )
}

export default RemoveFromOrderComponent;
