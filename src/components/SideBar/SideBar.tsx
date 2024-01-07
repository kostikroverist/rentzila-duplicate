import { FC } from "react";
import { Announcement } from "../../interface/AnnouncementInterface";
import AnnouncementCollection from "../AnnouncementComponent/AnnouncementCollection/AnnouncementCollection"
import './sideBar.css'


type Props = {
    data: Announcement[],
    isLoading: boolean
}


const SideBar: FC<Props> = ({ data, isLoading }) => {
    return (
        <div className="fixed inset-y-0 right-0 h-1/1 bg-gray-200 w-80 mt-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
            {isLoading ? <><h1>Loading...</h1></> : <AnnouncementCollection announcements={data} />}
        </div>
    );
}

export default SideBar
