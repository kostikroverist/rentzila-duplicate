import { useNavigate } from "react-router-dom"
import { IoArrowBackSharp } from "react-icons/io5";
const AnnouncementPage = () => {
    const navigation = useNavigate();
    return (
        <div>
            <button className=" m-2 flex h-10  w-36 font-bold rounded-lg text-lg justify-evenly items-center  bg-[#ceff7b] hover:bg-[#a9df4d] py-[12px] px-[20px]"
                onClick={() => navigation(-1)}><IoArrowBackSharp />Get back</button>
            <h1> this is a announcement</h1>
        </div >
    )
}

export default AnnouncementPage
