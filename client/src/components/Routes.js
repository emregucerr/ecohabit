/**
 *To avoid bloated App.js component, page routes created at this component.
 */
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import MainLayout from "./MainLayout";
import Homepage from "../pages/Homepage";
import LocationsPage from "../pages/LocationsPage";
import ErrorPage from "../pages/ErrorPage";
import GuidesPage from "../pages/GuidesPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import TermsConditionPage from "../pages/TermsConditionPage";
import Demo from "../pages/Demo";
import Logout from "./Logout";

/*
 * Creating routes via createBrowserRouter method makes project ready for react-router-dom 6.4 data fetching.
 * MainLayout component has common items like navbar and footer.
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Homepage />} />
<PrivateRoute path="/homepage"><Navigate replace to="/" /></PrivateRoute>
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/guides" element={<GuidesPage />} />
      <Route path="/about" element={<AboutPage />} />
<PrivateRoute path="/profile"><ProfilePage /></PrivateRoute>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/terms" element={<TermsConditionPage />} />
<PrivateRoute path="/locations"><LocationsPage /></PrivateRoute>
<PrivateRoute path="/guides"><GuidesPage /></PrivateRoute>
      <Route path="/Demo" element={<Demo />} />
    </Route>
  )
);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
