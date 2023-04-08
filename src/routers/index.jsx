import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config/path";
import { lazy } from "react";
import { profile } from "./ca-nhan";
import { AuthRoute } from "@/components/AuthRoute";
import SignIn from "@/pages/dang-nhap";
import SignUp from "@/pages/dang-ky";
import Course from "@/pages/khoa-hoc";
import CourseDetail from "@/pages/khoa-hoc/[slug]";
import Register from "@/pages/register/[slug]-id[id]";
import Contact from "@/pages/contact";
import Team from "@/pages/team";
import Project from "@/pages/project";
import ResetPassword from "@/pages/resetPassword";

const Home = lazy(() => import("@/pages"))
const Page404 = lazy(() => import("@/pages/404"))
const MainLayout = lazy(() => import("@/layouts/MainLayout"))

export const routers = [
    {
        element: <MainLayout />,
        children: [
            {
                path: PATH.Home,
                element: <Home />
            },
            {
                element: <Course />,
                path:PATH.Course
            },
            {
                element: <CourseDetail />,
                path:PATH.CourseDetail
            },
            {
                element: <Register />,
                path:PATH.CourseRegister
            },
            {
                element: <Contact />,
                path:PATH.Contact
            },
            {
                element: <Team />,
                path:PATH.Team
            },
            {
                element: <Project />,
                path:PATH.Project
            },
            {
                path: PATH.ResetPassword,
                element :<ResetPassword />
            },
            {
                element: <PrivateRoute redirect={PATH.SignIn} />,
                children:profile,
                path:PATH.Profile.index
            },
            {
                element : <AuthRoute redirect={PATH.Profile.index} />,
                children: [
                    {
                        path :PATH.SignIn,
                        element :<SignIn />
                    },
                    {
                        path :PATH.SignUp,
                        element :<SignUp />
                    },
                    
                ]
            },
            {
                path: '*',
                element: <Page404 />
            }
        ]
    }
]