import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.jsx";

function Home() {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
}

export default Home;
