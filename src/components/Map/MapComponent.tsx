import React, { Dispatch, FC, useCallback, useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet';
import { Announcement } from '../../interface/AnnouncementInterface';
import { renderToString } from 'react-dom/server';
import { FaLocationDot } from 'react-icons/fa6';
import L from 'leaflet';
const iconUrl = `data:image/svg+xml;base64,${btoa(
    renderToString(<FaLocationDot />)
)}`;
const DefaultIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 30],
});

type Props = {
    data: Announcement[],
    filterData: Announcement[];
    setFilterData: Dispatch<React.SetStateAction<Announcement[]>>
}
const MapComponent: FC<Props> = ({ data, filterData, setFilterData }) => {
    const map = useMap();
    const updateVisibleMarkers = useCallback(() => {
        const bounds = map.getBounds();
        const newMarkers = [];
        for (const point of data) {
            if (bounds.contains(point.location as L.LatLngBoundsExpression | L.LatLngExpression)) {
                console.log(newMarkers)
                newMarkers.push(point);
            }
        }
        setFilterData(newMarkers)
        console.log(
            '!!! map bounds:',
            map.getBounds(),
            ' visible markers: ',
            newMarkers
        );

    }, [data, map, setFilterData]);
    useEffect(() => {
        if (!map) return;
        // Updates markers after map initially renders
        updateVisibleMarkers();

        map.on('dragend', function () {
            // Updates markers after user drags the map to change position
            updateVisibleMarkers();
        });
        map.on('zoomend', function () {
            // Updates markers after user zooms in/out
            updateVisibleMarkers();
        });
    }, [map, updateVisibleMarkers]);


    return (
        <>
            {filterData.map((dataAnnouncement) => (
                <Marker
                    key={dataAnnouncement.id}
                    position={[dataAnnouncement.location[0], dataAnnouncement.location[1]]}
                    draggable={true}
                    icon={DefaultIcon}
                >
                    <Popup>
                        <p>
                            {dataAnnouncement.title}
                        </p>
                        <p>
                            {dataAnnouncement.price}грн
                        </p>
                    </Popup>
                </Marker>
            ))}
        </>

    )
}

export default MapComponent
