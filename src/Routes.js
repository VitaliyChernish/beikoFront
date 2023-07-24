import UserCabinet from "./cabinet/UserCabinet"
import AdminCabinet from "./cabinet/AdminCabinet"
import Login from "./loginForm/Login";
import ShowAndHideMunu from "./pages/showAndHideMunu/ShowAndHideMunu";
import {
    LOGIN_FORM,
    USER_CABINET,
    ADMIN_CABINET,
    CONTACTS
} from "./utils/consts";


export const authRoutes = [
    {
        path: CONTACTS,
        Component: <ShowAndHideMunu />
    },
    {
        path: ADMIN_CABINET,
        Component: <AdminCabinet />
    },
    {
        path: USER_CABINET,
        Component: <UserCabinet />
    },
    {
        path: LOGIN_FORM,
        Component: <Login />
    }
]
