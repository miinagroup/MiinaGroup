import "./CartItemDropDown.css"


const CartItemDropDownRemoveFromCart = ({ productId, orderCreated, quantity, price, item, uniformUserId, removeFromCartHandler = false }) => {



    return (

        <i
            onClick={removeFromCartHandler ? () => removeFromCartHandler(productId, quantity, price, item, uniformUserId) : undefined}
            className="bi bi-trash my-trash-icon" />

    )
}

export default CartItemDropDownRemoveFromCart;
