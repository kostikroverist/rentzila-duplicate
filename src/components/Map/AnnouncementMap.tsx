import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { renderToString } from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import L from "leaflet";
import { forwardRef } from "react";
import './announcementMap.css'
const iconUrl = `data:image/svg+xml;base64,${btoa(
    renderToString(<FaLocationDot />)
)}`;


const DefaultIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 30],
});

type Props = {
    eventHandlers: {
        dragend: () => void;
    };
    loc: [number, number];
    defaultPosition: {
        lat: number;
        lng: number;
        zoom: number;
    }
    error?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnnouncementMap = forwardRef<any, Props>(({ eventHandlers, loc, defaultPosition, error }, ref) => {
    return (
        <div className="">
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <MapContainer className="leaflet-container-form" center={loc} zoom={defaultPosition.zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={loc}
                    draggable={true}
                    eventHandlers={eventHandlers}
                    ref={ref}
                    icon={DefaultIcon}
                >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
})

export default AnnouncementMap
