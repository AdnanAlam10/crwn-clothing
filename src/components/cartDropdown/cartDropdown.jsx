import { useContext } from "react";

import { CartContext } from "../../contexts/cartContext";

import "./cartDropdown.styles.scss";

import CartItem from "../cartItem/cartItem";
import Button from "../button/button";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;
