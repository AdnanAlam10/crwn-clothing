import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

import ShoppingIcon from "../../assets/shopping-bag.svg?react";

import "./cartIcon.styles.scss";

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;
