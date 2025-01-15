import "./CartItemDropDown.css"


const CartItemDropDownRemoveFromCart = ({ productId, orderCreated, quantity, price, item, removeFromCartHandler = false }) => {



    return (

        <i
            onClick={removeFromCartHandler ? () => removeFromCartHandler(productId, quantity, price, item) : undefined}
            className="bi bi-trash my-trash-icon" />

    )
}

export default CartItemDropDownRemoveFromCart;
