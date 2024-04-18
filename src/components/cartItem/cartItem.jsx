import { ItemDetails, CartItemContainer } from "./cartItem.styles.jsx";

function CartItem({ cartItem }) {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="">
          {quantity} x {price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}

export default CartItem;
