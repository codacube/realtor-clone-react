import { Link } from "react-router"
import { MdLocationOn } from "react-icons/md"

const TimestampDisplay = ({ className, timestamp }) => {
    if (!timestamp) {
        return <p>Unknown</p>
    }
    
    // Convert Firestore timestamp to a JavaScript Date object
    const date = timestamp.toDate() // Assuming timestamp is a Firestore Timestamp
    const now = new Date()
    const secondsDiff = Math.floor((now - date) / 1000)

    // Define the relative time format
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

    // Determine the appropriate unit and value
    let value
    let unit

    if (secondsDiff < 60) {
        value = -secondsDiff
        unit = 'second'
    } else if (secondsDiff < 3600) {
        value = -Math.floor(secondsDiff / 60)
        unit = 'minute'
    } else if (secondsDiff < 86400) {
        value = -Math.floor(secondsDiff / 3600)
        unit = 'hour'
    } else if (secondsDiff < 604800) {
        value = -Math.floor(secondsDiff / 86400)
        unit = 'day'
    } else if (secondsDiff < 2419200) {
        value = -Math.floor(secondsDiff / 604800)
        unit = 'week'
    } else if (secondsDiff < 29030400) {
        value = -Math.floor(secondsDiff / 2419200)
        unit = 'month'
    } else {
        value = -Math.floor(secondsDiff / 29030400)
        unit = 'year'
    }

    return <span className={className}>{rtf.format(value, unit)}</span>
}

export default function ListingItem({ listing, id }) {
    return (
        <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
            <Link className="contents" to={`/category/${listing.type}/${id}`}>
                <img 
                    className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
                    loading="lazy"
                    src={listing.imgUrls[0]} alt=""
                />
                <TimestampDisplay 
                    className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
                    timestamp={listing.timestamp}
                />
                <div className="w-full p-[10px]">
                    <div className="flex items-center space-x-1">
                        <MdLocationOn className="h-4 w-4 text-green-600" />
                        <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{listing.address}</p>
                    </div>
                    <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
                    <p className="text-[#457b9d] mt-2 font-semibold">
                        ${listing.offer
                            ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,",")
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,",")
                        }
                        {listing.type === "rent" && " / month"}
                    </p>
                    <div className="flex items-center mt-[10px] space-x-3">
                        <div className="flex items-center space-x-1">
                            <p className="font-bold text-xs">
                                {listing.bedrooms > 1 
                                    ? `${listing.bedrooms} Beds ` 
                                    : "1 Bed"
                                }
                            </p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <p className="font-bold text-xs">
                                {listing.bathrooms > 1 
                                ? `${listing.bathrooms} Baths ` 
                                : "1 Bath"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}