import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import FoldersPage from "./pages/FoldersPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/folders" element={<FoldersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
