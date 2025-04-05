import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { db } from "../firebase"
import Spinner from "../components/Spinner"
import { FaShare } from "react-icons/fa"
// Swiper now uses Swiper Elements (Swiper React has been discontinued)
import { register } from 'swiper/element/bundle'
register()

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Listing() {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
    
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingID)
            const docSnapshot = await getDoc(docRef)
            if (docSnapshot.exists()) {
                setListing(docSnapshot.data())
                setLoading(false)
            }
        }
        fetchListing()
    }, [params.listingID])

    if (loading) {
        return <Spinner />
    }

    // Can either lazy load the images or revert back to the spinner - I've gone back to background image because the first one is stretched using this method - might be a cache issue?
    // <swiper-slide lazy="true" key={idx}>
    //  <img loading="lazy" src={`${url}`} className="h-full w-full object-cover object-center"/>
 
    const sliderImages = listing.imgUrls.map((url, idx) => (
        <swiper-slide key={idx}>
            <div className={`relative w-full overflow-hidden h-[300px] bg-[url(${url})] bg-center bg-no-repeat bg-cover`}>
            </div>
        </swiper-slide>
    ))
    // console.log(sliderImages)

    // // For debugging
    // console.log(listing.imgUrls)
    // listing.imgUrls.map((url, idx) => (
    //     console.log(`<swiper-slide key="${idx}">
    //         <div className={\`relative w-full overflow-hidden h-[300px] bg-[url(${url})] bg-center bg-no-repeat bg-cover\`}>
    //         </div>
    //     </swiper-slide>`)
    // ))
    //console.log(sliderImagesHTML)

    return (
        <main>
            <swiper-container
                slidesPerView={1}
                navigation={true}
                pagination={{ type: "progressbar" }}
                effect="fade"
                autoplay={{delay: 3000}}
                className="w-full h-[300px] center"
                style={
                    {
                    "--swiper-navigation-color": "#a8dadc", 
                    "--swiper-pagination-color": "#a8dadc"
                    }
                }
            >
                {/* <swiper-slide key="10">
                    <div className={`relative w-full overflow-hidden h-[300px] bg-[url(https://firebasestorage.googleapis.com/v0/b/realtor-clone-react-84cd0.firebasestorage.app/o/KO8I4fppW4OmmgT35Lou70d13LA2-francesca-tosolini-tHkJAMcO3QE-unsplash.jpg-b49abef3-50eb-4a16-b42f-7be8816d1faf?alt=media&token=09ea724a-4aea-412a-afbc-ec50eb6db8be)] bg-center bg-no-repeat bg-cover`}>
                    </div>
                </swiper-slide>
                <swiper-slide key="20">
                    <div className={`relative w-full overflow-hidden h-[300px] bg-[url(https://firebasestorage.googleapis.com/v0/b/realtor-clone-react-84cd0.firebasestorage.app/o/KO8I4fppW4OmmgT35Lou70d13LA2-webaliser-_TPTXZd9mOo-unsplash.jpg-359cda50-fb09-488b-a651-1060b04094a0?alt=media&token=44f3d5bd-bf5d-4fb0-87ac-1a6fb8e0e9f8)] bg-center bg-no-repeat bg-cover`}>
                    </div>
                </swiper-slide> */}
                {sliderImages}
            </swiper-container>
            <div
                className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
                onClick={() => {
                    // Standard javascript to copy the url to the clipboard
                    navigator.clipboard.writeText(window.location.href)
                    setShareLinkCopied(true)
                    setTimeout(() => {
                        setShareLinkCopied(false)
                    }, 2000)
                }}
            >
                <FaShare className="text-lg text-slate-500" />
            </div>
            {shareLinkCopied && (
                <p className="fixed top-[23%] right-[5%] z-10 font-semibold border-2 border-gray-400 rounded-md bg-white p-2">Link Copied</p>
            )}
        </main>
    )
}