import { BrowserRouter, Route, Routes } from "react-router-dom"
import Init from "./pages/init"
import View from "./pages/view"
import Notas from "./pages/notas"
import Categorias from "./pages/categorias"
import AllNote from "./pages/AllNotes/index"
import AllNoteCategoria from "./pages/AllNotes/categorias"
import "./App.css"
import Time from "./components/time"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{width: "100vw" , minHeight: "100vh"}}>
        <Time />
        <Routes>
          <Route path="/" element={<Init />} />
          <Route path="/allNotes" element={<AllNote />} />
          <Route path="/allNotes/:id" element={<AllNoteCategoria />} />
          <Route path="/categorias/:id" element={<Categorias />} />
          <Route path="/notas/:id" element={<Notas />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
      <ToastContainer
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App
