import { useContext } from "react";

import { CartContext } from "../../contexts/cartContext";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./productCard.styles.jsx";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          Add to Cart
        </Button>
      </Footer>
    </ProductCartContainer>
  );
}

export default ProductCard;
