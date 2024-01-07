import SideBar from "../../components/SideBar/SideBar"
import useServerAnnouncement from "../../hooks/useServerAnnouncement";

const MainPage = () => {

    const { data, isLoading } = useServerAnnouncement();

    return (
        <div >
            hi this is main page
            <SideBar data={data} isLoading={isLoading} />

        </div>
    )
}

export default MainPage
