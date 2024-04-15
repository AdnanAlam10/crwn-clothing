import { useContext } from "react";

import { CartContext } from "../../contexts/cartContext";

import "./productCard.styles.scss";

import Button from "../button/button";

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
