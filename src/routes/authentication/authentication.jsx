import SignUpForm from "../../components/signUpForm/signUpForm";
import SignInForm from "../../components/signInForm/signInForm";

import { AuthenticationContainer } from "./authentication.styles.jsx";

function Authentication() {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
}

export default Authentication;
