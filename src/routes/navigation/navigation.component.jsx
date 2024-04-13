import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cartIcon/cartIcon";
import CartDropdown from "../../components/cartDropdown/cartDropdown";

import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

function Navigation() {
  // The context checks user state
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
