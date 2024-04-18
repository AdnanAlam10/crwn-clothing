import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cartIcon/cartIcon";
import CartDropdown from "../../components/cartDropdown/cartDropdown";

import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

function Navigation() {
  // The context checks user state
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default Navigation;
