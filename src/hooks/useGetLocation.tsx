import { useEffect, useState } from 'react';
import axios from 'axios';
import { LocationData } from '../interface/LocationData';

const defaultPosition = {
    lat: 49.47311448871094,
    lng: 30.544871580076776,
    zoom: 7
};

const useGetLocation = () => {
    const [townName, setTownName] = useState<LocationData>();
    const [location, setLocation] = useState<[number, number]>([defaultPosition.lat, defaultPosition.lng]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<LocationData>(`https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=json`);
                setTownName(response.data);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchData();
    }, [location]);
    // console.log(townName?.address.state)
    return { townName, setLocation };
};

export default useGetLocation;
