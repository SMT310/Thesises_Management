// routes.js
import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Thesis from "../pages/Thesis";
import Faculty from "../pages/Faculty";
import Instruction from "../pages/Instruction";
import Login from "../pages/Login";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Student from "../pages/admin/Student/Student";



// Define your routes
export const publicRoutes = [
    { path: "/", component: Home, layout: DefaultLayout },
    { path: "/thesis", component: Thesis, layout: DefaultLayout },
    { path: "/faculty", component: Faculty, layout: DefaultLayout },
    { path: "/instruction", component: Instruction, layout: DefaultLayout },
    { path: "/login", component: Login },
];

export const privateRoutes = [
    { path: "/dashboard", component: Dashboard, layout: AdminLayout },
    { path: "/manage-student", component: Student, layout: AdminLayout },


];

// You can also define layouts if necessary
export const layouts = {
    default: React.Fragment,
};

// Map routes to components with layouts
export const mapRoutes = (routes, defaultLayout) =>
    routes.map((route, index) => (
        <Route
            key={index}
            path={route.path}
            element={<route.component layout={route.layout || defaultLayout} />}
        />
    ));