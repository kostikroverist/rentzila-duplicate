import { useEffect, useState } from "react";
import { Announcement } from "../interface/AnnouncementInterface";
import { getMethod, postMethod } from "../server/Server";
const baseUrl: string = 'http://localhost:3004/announcements'

const useServerAnnouncement = () => {
    const [data, setData] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllAnnouncements();
    }, [])

    const getAllAnnouncements = async () => {
        try {
            setIsLoading(true);
            setData(await getMethod(baseUrl));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const postAnnouncements = async (data: Announcement) => {
        postMethod(baseUrl, data)
    }

    return (
        {
            data,
            isLoading,
            postAnnouncements
        }
    )
}

export default useServerAnnouncement
