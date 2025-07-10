import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/main'
import PostPage from './pages/postPage'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/post/:id' element={<PostPage/>}/>
    </Routes>
  )
}

export default App
