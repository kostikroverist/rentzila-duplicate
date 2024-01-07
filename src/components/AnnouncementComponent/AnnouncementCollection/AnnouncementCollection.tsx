import { FC } from "react";
import { Announcement } from "../../../interface/AnnouncementInterface";
import AnnouncementItem from "../AnnouncementItem/AnnouncementItem";
type Props = {
    announcements: Announcement[];
};

const AnnouncementCollection: FC<Props> = ({ announcements }) => {


    return (
        <ul className="flex flex-col items-center">
            {announcements.map((announcement) => <AnnouncementItem key={announcement.id} announcement={announcement} />)}
        </ul>
    );
};

export default AnnouncementCollection;
