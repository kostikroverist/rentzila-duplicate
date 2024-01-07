import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import useUploadFormHooks from "../../hooks/useUploadForm";
import Input from "../../components/Input/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Announcement } from "../../interface/AnnouncementInterface";
import useServerAnnouncement from "../../hooks/useServerAnnouncement";

const AnnouncementEmpty = {
    title: "",
    description: "",
    price: 0,
    img: "",
};

const AnnouncementPage = () => {
    const navigation = useNavigate();
    const { url, handleFileChange } = useUploadFormHooks();
    const { postAnnouncements } = useServerAnnouncement();
    const [announcement, setAnnouncement] = useState<Announcement>(AnnouncementEmpty);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setAnnouncement({ ...announcement, [name]: value })
    }

    const formHandler = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            postAnnouncements({ ...announcement, img: url as string })
            navigation(-1)
        }
    }

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!announcement.title.trim()) {
            errors.title = 'pls write Title'
        }
        if (!announcement.description.trim()) {
            errors.description = 'pls write Description'
        }
        if (announcement.price === 0) {
            errors.price = 'pls write Price'
        }
        if (!url) {
            errors.img = 'pls put img'
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

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

            <form className="flex flex-col w-2/4 mx-auto mt-10" onSubmit={formHandler}>
                <Input
                    label="Title"
                    type="text"
                    name="title"
                    placeholder="Put your title"
                    value={announcement.title}
                    onChange={handleChangeInput}
                    error={errors.title && <span className="flex  text-red-600">{errors.title}</span>}
                />
                <Input
                    label="Description"
                    type="text"
                    name="description"
                    placeholder="Put your description"
                    value={announcement.description}
                    onChange={handleChangeInput}
                    error={errors.description && <span className="flex  text-red-600">{errors.description}</span>}
                />
                <Input
                    label="Price"
                    type="number"
                    name="price"
                    placeholder="Put your price"
                    value={announcement.price}
                    onChange={handleChangeInput}
                    error={errors.price && <span className="flex  text-red-600">{errors.price}</span>}
                />
                <Input
                    label="Put img"
                    type="file"
                    onChange={handleFileChange}
                    name={"img"}
                    value={announcement.img}
                    error={errors.img && <span className="flex  text-red-600">{errors.img}</span>}
                />

                <button
                    className="flex h-10 mt-4  font-bold rounded-lg text-lg justify-evenly items-center 
             bg-[#ceff7b] hover:bg-[#a9df4d] py-[12px] px-[23px]"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            {url ? <img id="imgPreview" src={url as string} alt="" /> : ""}
        </div>
    );
};

export default AnnouncementPage;
