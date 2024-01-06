import { Route, Routes } from 'react-router-dom'
import './index.css'
import MainPage from './pages/MainPage/MainPage'
import Layout from './components/Layout/Layout'
import AnnouncementPage from './pages/Announcement/AnnouncementPage'
function App() {

  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route  path='/addAnnouncement' element={<AnnouncementPage />} />
      </Route>
    </Routes>


  )
}

export default App
