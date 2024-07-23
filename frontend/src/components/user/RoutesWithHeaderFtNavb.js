import { Outlet } from "react-router-dom";
import HeaderComponent from "../HeaderComponent";
import Navb from "../Navb";
import FooterComponent from "../FooterComponent";



const RoutesWithHeaderFtNavb = () => {
  return (
    <>
    <HeaderComponent />
    <Navb/>
    <Outlet />
    <FooterComponent/> 
    </>
  );
};

export default RoutesWithHeaderFtNavb;

