import { Outlet, Navigate } from "react-router"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus()

    // Display loading until checkingStatus changes
    if (checkingStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}