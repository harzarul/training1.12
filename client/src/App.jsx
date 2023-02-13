import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./sections";


function App() {

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-green sm:px-8 py-4 ">
        <Link to="/"
          className="font-medium text-white px-4 text-[1.2rem] font-Nunito font-bold">
          OpenAi
        </Link>
        <Link to="/create-post"
          className="font-medium text-black px-6 py-1 rounded-full bg-white">
          Create
        </Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-72px)] bg-green">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
