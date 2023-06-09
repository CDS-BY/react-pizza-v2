import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => (
  <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <Outlet /> 
      </div>
    </div>
  </div>
);

export default MainLayout;
