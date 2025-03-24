import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

export default function Header() {
    const [pageState, setPageState] = useState("Sign In")
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    
    // Watch for changes to auth
    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            // If user is authenticated, then
            if (user) {
                setPageState("Profile")
            } else {
                setPageState("Sign In")
            }
        })
    }, [auth])

    function pathMatchesRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }

    return (
        <div className="bg-white border-b shadow-sm sticky top-0 z-40">
            <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
                <div>
                    <img
                        src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                        alt="logo"
                        className="h-5 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                </div>
                <div>
                    <ul className="flex space-x-10">
                        <li 
                            className={
                                `cursor-pointer py-3 text-sm font-semibold border-b-[3px] 
                                ${pathMatchesRoute("/") 
                                    ? "text-black border-b-red-500" 
                                    : "text-gray-400 border-b-transparent"
                                }`
                            }
                            onClick={() => navigate("/")}>Home</li>
                        <li 
                            className={
                                `cursor-pointer py-3 text-sm font-semibold border-b-[3px] 
                                ${pathMatchesRoute("/offers")
                                    ? "text-black border-b-red-500" 
                                    : "text-gray-400 border-b-transparent"
                                }`
                            }
                            onClick={() => navigate("/offers")}>Offers</li>
                        <li 
                            className={
                                `cursor-pointer py-3 text-sm font-semibold border-b-[3px] 
                                ${
                                    (pathMatchesRoute("/sign-in") || pathMatchesRoute("/profile"))
                                    ? "text-black border-b-red-500" 
                                    : "text-gray-400 border-b-transparent"
                                }`
                            }
                            onClick={() => navigate("/profile")}>{pageState}</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}