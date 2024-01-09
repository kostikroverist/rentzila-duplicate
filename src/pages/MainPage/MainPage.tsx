import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import useServerAnnouncement from "../../hooks/useServerAnnouncement";
import { MapContainer, TileLayer, } from "react-leaflet";
import './mainPage.css'
import { Announcement } from "../../interface/AnnouncementInterface";
import MapComponent from "../../components/Map/MapComponent";

const defaultPosition = {
    lat: 49.47311448871094,
    lng: 30.544871580076776,
    zoom: 7
};


const MainPage = () => {


    const { data, isLoading } = useServerAnnouncement();
    const [filterData, setFilterData] = useState<Announcement[]>(data)

    useEffect(() => {
        if (data.length > 0) {
            setFilterData(data)
        }
    }, [data])

    return (
        <>
            <SideBar data={filterData} isLoading={isLoading} />
            <div className="w-2/3">


                <MapContainer
                    className="leaflet-container-main" center={[defaultPosition.lat,
                    defaultPosition.lng]} zoom={defaultPosition.zoom} scrollWheelZoom>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapComponent data={data} filterData={filterData} setFilterData={setFilterData} />
                </MapContainer>
            </div>
        </>
    );
};

export default MainPage;
