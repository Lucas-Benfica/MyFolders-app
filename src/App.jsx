import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import FoldersPage from "./pages/FoldersPage"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/folders" element={<FoldersPage />} />
          <Route path="/folders/:parentId/:id" element={<FoldersPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
