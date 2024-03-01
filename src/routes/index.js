import React from "react"
import { Redirect } from "react-router-dom"

// // Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import categoriesWithCoin from "../pages/categories/index"
import categoriesWithDetail from "../pages/categories/detail"

// Admin Dashboard
import AdminDashboard from "../admin/dashboard/index"
import AdminChangePassword from "../admin/account/index"
import AdminLiquidityPools from "../admin/liquidity/index"

import categories from "admin/categories/index"
import coin from "../admin/liquidity/index"
const authProtectedRoutes = [
  // Admin Routes
  { path: "/admin/dashboard", component: AdminDashboard },
  { path: "/admin/change-password", component: AdminChangePassword },
  { path: "/admin/liquidity-pools", component: AdminLiquidityPools },

  { path: "/dashboard", component: AdminDashboard },
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },

  //Category
  { path: "/admin/categories", component: categories },
  { path: "/admin/coin-website", component: coin },

]

const publicRoutes = [

  { path: "/categories-with-coin", component: categoriesWithCoin },
  { path: "/categories-detail/:id", component: categoriesWithDetail },
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

]

export { authProtectedRoutes, publicRoutes }
