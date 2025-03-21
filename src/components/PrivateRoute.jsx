import { Outlet, Navigate } from "react-router"
import { useAuthStatus } from "../hooks/useAuthStatus"

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus()

    // Display loading until checkingStatus changes
    if (checkingStatus) {
        return <h3>Loading</h3>
    }

    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}