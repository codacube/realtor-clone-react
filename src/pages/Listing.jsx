import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { db } from "../firebase"
import Spinner from "../components/Spinner"
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa"
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

            <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                {/* Property Info */}
                <div className="w-full h-[200px] lg:h-[400px] ">
                    {/* Title */}
                    <p className="text-2xl font-bold mb-3 text-blue-900">
                        {listing.name} - $ {listing.offer ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,",")
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,",")
                        }
                        {listing.type === "rent" ? " / month" : ""}
                    </p>

                    {/* Address */}
                    <p className="flex items-center mt-6 mb-3 font-semibold">
                        <FaMapMarkerAlt className="text-green-700 mr-1" />
                        {listing.address}
                    </p>

                    {/*  */}
                    <div className="flex justify-start items-center space-x-4 w-[75%]">
                        <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.type === "rent" ? "Rent" : "Sale"}</p>
                        {listing.offer && (
                            <p classNam="bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">${+listing.regularPrice - +listing.discountedPrice} discount</p>
                        )}
                    </div>

                    {/* Description */}
                    <p className="mt-3 mb-3">
                        <span className="font-semibold">Description - </span>
                        {listing.description}
                    </p>

                    {/* Details */}
                    <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold">
                        <li className="flex items-center whitespace-nowrap">
                            <FaBed className="text-lg mr-1"/>
                            {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaBath className="text-lg mr-1"/>
                            {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaParking className="text-lg mr-1"/>
                            {listing.parking ? "Parking spot" : "No parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaChair className="text-lg mr-1"/>
                            {listing.furnished ? "Furnished" : "Not furnished"}
                        </li>
                    </ul>

                </div>
                
                
                <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden">
                    
                </div>
            </div>
        </main>
    )
}