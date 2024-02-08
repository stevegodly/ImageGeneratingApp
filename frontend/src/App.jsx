import { BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from './pages/Home'
import logo from './assets/logo.jpg';
const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-gradient-to-r from-slate-700 via-zinc-700 to-gray-500 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-14 object-contain" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </main>
  </BrowserRouter>
);

export default App