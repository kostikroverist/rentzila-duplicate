import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa";
const Header = () => {
    return (
        <header className="h-16 bg-slate-600 flex justify-evenly items-center">
            <h1 className="text-white text-lg font-bold">Оренда, Яку Ви Заслуговуєте: Зручність та Комфорт за Крок від Вас</h1>
            <Link className="flex h-10  font-bold rounded-lg text-lg justify-evenly items-center 
             bg-[#ceff7b] hover:bg-[#a9df4d] py-[12px] px-[23px]" to="addAnnouncement">
                <FaPlus size='18' className="mr-2" />Здати в Оренду
            </Link>
        </header>
    )
}

export default Header
