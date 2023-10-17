import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Home } from "../home/home";
import { ShowDetails } from "../showDetails/show-details";
import { Users } from "../user";
import {Snapshot} from "../snapshot";


export const ApplicationRoutes = ()=> {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showDetails/:detailId" element={<ShowDetails />} />
      <Route path="/users" element={<Users />} />
      <Route path="/snapshot" element={<Snapshot />} />
    </Routes>
  );
}
