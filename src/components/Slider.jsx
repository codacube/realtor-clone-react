import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

import { register } from 'swiper/element/bundle'
register()

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    // Run this once (empty dependancy)
    useEffect(() => {
        // Has to be asynchronous (for the await)
        async function fetchListings() {
            const listingsRef = collection(db, "listings")
            const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
            // Get the data
            const querySnapshot = await getDocs(q)
            let listings = []
            querySnapshot.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchListings()
    }, [])

    if (loading) {
        return <Spinner />
    }

    // Handle the situation where there are no listings
    if (listings.length === 0) {
        return <></>
    }

    //<h1 key={listing.id}>{listing.data.imgUrls[0]}</h1>
    /*
              {/* <swiper-slide key="10">
                        <div className={`relative w-full overflow-hidden h-[300px] bg-[url(https://firebasestorage.googleapis.com/v0/b/realtor-clone-react-84cd0.firebasestorage.app/o/KO8I4fppW4OmmgT35Lou70d13LA2-francesca-tosolini-tHkJAMcO3QE-unsplash.jpg-b49abef3-50eb-4a16-b42f-7be8816d1faf?alt=media&token=09ea724a-4aea-412a-afbc-ec50eb6db8be)] bg-center bg-no-repeat bg-cover`}>
                        </div>
                    </swiper-slide>
                    <swiper-slide key="20">
                        <div className={`relative w-full overflow-hidden h-[300px] bg-[url(https://firebasestorage.googleapis.com/v0/b/realtor-clone-react-84cd0.firebasestorage.app/o/KO8I4fppW4OmmgT35Lou70d13LA2-webaliser-_TPTXZd9mOo-unsplash.jpg-359cda50-fb09-488b-a651-1060b04094a0?alt=media&token=44f3d5bd-bf5d-4fb0-87ac-1a6fb8e0e9f8)] bg-center bg-no-repeat bg-cover`}>
                        </div>
                    </swiper-slide> * /}
                    {/* {sliderImages} * /}
    */

    return (
        listings && (
        <>
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
                {listings.map(({data, id}) => (
                    <swiper-slide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <div
                            style={{
                                background: `url(${data.imgUrls[0]}) center, no-repeat`,
                                backgroundSize: "cover",
                            }} 
                            className={`relative w-full overflow-hidden h-[300px]`}>
                        </div>
                        <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                            {data.name}
                        </p>
                        <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                            ${data.discountedPrice ?? data.regularPrice}
                            {data.type === "rent" && " / month"}
                        </p>
                    </swiper-slide>
                ))}
            </swiper-container>
        </>
    ))
}

