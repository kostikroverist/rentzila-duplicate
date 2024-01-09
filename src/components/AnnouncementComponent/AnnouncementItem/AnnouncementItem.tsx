import { FC } from "react";
import { Announcement } from "../../../interface/AnnouncementInterface";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

type Props = {
    announcement: Announcement;
};

const AnnouncementItem: FC<Props> = ({ announcement }) => {
    const checkLength = (str: string) => {
        if (str.length >= 48) {
            return str.slice(0, 38) + "...";
        } else {
            return str;
        }
    };
    return (
        <>
            <Link to={""}>
                <li
                    className="m-3 mb-2 h-full min-w-72 bg-white flex flex-col rounded-lg"
                    key={announcement.id}>
                    <img src={announcement.img} className="rounded-t-lg h-64" />
                    <div className="p-4">
                        <p className="text-lg font-bold">{checkLength(announcement.title)}</p>
                        <p className="mt-2">{checkLength(announcement.description)}</p>
                        <p className="text-[#b7bcca] mt-2">Вартість</p>
                        <p className="font-bold mt-2">
                            <span className="text-[24px]"> {announcement.price}</span> грн.
                        </p>
                        <p className="flex text-lg mt-2">
                            <IoLocationOutline size={"24"} />
                            {announcement.region === 'undefined' ? '' : announcement.region}
                            {announcement.town === 'undefined' ? '' : announcement.town}
                        </p>
                    </div>
                </li>
            </Link>

        </>
    );
};

export default AnnouncementItem;
