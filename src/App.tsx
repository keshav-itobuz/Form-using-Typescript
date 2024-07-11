import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form.tsx"
import UserData from "./pages/UserData.tsx"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route index element={<UserData />} />
        <Route path="addData" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

