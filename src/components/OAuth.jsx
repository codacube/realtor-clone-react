import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { db } from "../firebase"

export default function OAuth() {
    const navigate = useNavigate()

    async function onGoogleClick() {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            // console.log(user)

            // Check if the user already exists in the database
            const docRef = doc(db, "users", user.uid)
            const docSnapshot = await getDoc(docRef)
            
            // If the document reference does not exist, then add user to the database
            if (!docSnapshot.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
            }

            // Go to the home page
            navigate("/")
        } catch (error) {
            toast.error("Could not authorise with Google")
            console.log(error)
        }
    }

    return (
        // type = "button" because by default it's a submit button and will submit the form
        <button type="button" onClick={onGoogleClick} className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded">
            <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
            Continue with Google
        </button>
    )
}