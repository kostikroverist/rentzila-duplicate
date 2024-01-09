import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import useUploadFormHooks from "../../hooks/useUploadForm";
import Input from "../../components/Input/Input";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Announcement } from "../../interface/AnnouncementInterface";
import useServerAnnouncement from "../../hooks/useServerAnnouncement";
import AnnouncementMap from "../../components/Map/AnnouncementMap";
import useGetLocation from "../../hooks/useGetLocation";
const defaultPosition = {
    lat: 49.47311448871094,
    lng: 30.544871580076776,
    zoom: 7
};
const AnnouncementEmpty = {
    title: "",
    description: "",
    price: 0,
    img: "",
    location: [defaultPosition.lat, defaultPosition.lng],
    town: '',
    region: ''
};

const AnnouncementPage = () => {
    const { townName, setLocation } = useGetLocation();
    const navigation = useNavigate();
    const { url, handleFileChange } = useUploadFormHooks();
    const { postAnnouncements } = useServerAnnouncement();
    const [announcement, setAnnouncement] = useState<Announcement>(AnnouncementEmpty);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [choseLocation, setChoseLocation] = useState(false);
    const [loc, setLoc] = useState<[number, number]>([defaultPosition.lat, defaultPosition.lng]);

    useEffect(() => {
        setLocation([loc[0], loc[1]])
    }, [loc, setLocation]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnnouncement({ ...announcement, [name]: value });
    };


    const formHandler = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            postAnnouncements({ ...announcement, img: url as string, location: loc, region: `${townName?.address.state}`, town: `${townName?.address.town}` });
            navigation(-1);
        }
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!announcement.title.trim()) {
            errors.title = "title is required";
        }
        if (!announcement.description.trim()) {
            errors.description = "Description is required";
        }
        if (announcement.price === 0) {
            errors.price = "Price is required";
        }
        if (!url) {
            errors.img = "Image is required";
        }
        if (loc[0] === defaultPosition.lat && loc[1] === defaultPosition.lng) {
            errors.location = 'Location is required'
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const marker: any = markerRef.current;
                if (marker != null) {
                    setLoc([marker.getLatLng().lat, marker.getLatLng().lng]);
                }
            }
        }),
        []
    );

    return (
        <div>
            <button
                className=" m-2 flex h-10  w-36 font-bold rounded-lg text-lg justify-evenly items-center  bg-[#ceff7b] hover:bg-[#a9df4d] py-[12px] px-[20px]"
                onClick={() => navigation(-1)}
            >
                <IoArrowBackSharp />
                Get back
            </button>
            <h1 className="text-center text-xl font-bold">Add Your announcement</h1>

            <form
                className="flex flex-col w-2/4 mx-auto mt-10"
                onSubmit={formHandler}
            >
                <Input
                    label="Title"
                    type="text"
                    name="title"
                    placeholder="Put your title"
                    value={announcement.title}
                    onChange={handleChangeInput}
                    error={
                        errors.title && (
                            <span className="flex  text-red-600">{errors.title}</span>
                        )
                    }
                />
                <Input
                    label="Description"
                    type="text"
                    name="description"
                    placeholder="Put your description"
                    value={announcement.description}
                    onChange={handleChangeInput}
                    error={
                        errors.description && (
                            <span className="flex  text-red-600">{errors.description}</span>
                        )
                    }
                />
                <Input
                    label="Price"
                    type="number"
                    name="price"
                    placeholder="Put your price"
                    value={announcement.price}
                    onChange={handleChangeInput}
                    error={
                        errors.price && (
                            <span className="flex  text-red-600">{errors.price}</span>
                        )
                    }
                />
                <Input
                    label="Put img"
                    type="file"
                    onChange={handleFileChange}
                    name={"img"}
                    value={announcement.img}
                    error={
                        errors.img && (
                            <span className="flex  text-red-600">{errors.img}</span>
                        )
                    }
                />
                <button
                    className="flex h-10 mt-4 w-56 font-bold rounded-lg text-lg justify-evenly items-center 
             bg-[#ceff7b] hover:bg-[#a9df4d] py-[12px] px-[23px]"
                    onClick={() => setChoseLocation(!choseLocation)}
                    type="button"
                >
                    Chose location
                </button>
                {choseLocation && <div><AnnouncementMap ref={markerRef} eventHandlers={eventHandlers} loc={loc} defaultPosition={defaultPosition}
                    error={
                        errors.location && (
                            <span className="flex  text-red-600">{errors.location}</span>
                        )
                    } />

                </div>}

                <button

                    className="flex h-10 mt-4 mb-4 font-bold rounded-lg text-lg justify-evenly items-center 
             bg-[#ceff7b] hover:bg-[#a9df4d] py-[12px] px-[23px]"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AnnouncementPage;
