import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import {Home} from "../home/home";
import {ShowDetails} from "../showDetails/show-details";


export const ApplicationRoutes = ()=> {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showDetails:detailId" element={<ShowDetails />} />
    </Routes>
  );
}
