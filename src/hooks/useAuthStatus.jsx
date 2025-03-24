import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

// We are returning two values, so we don't need the 'default' keyword
export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=> {
            if (user) {
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })

    }, [])

    return { loggedIn, checkingStatus }
}