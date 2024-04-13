import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/signUpForm/signUpForm";
import SignInForm from "../../components/signInForm/signInForm";

import "./authentication.styles.scss";

function Authentication() {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
