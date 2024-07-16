import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './pages/Form.tsx'
import DataCard from './pages/DataCards.tsx'
import { FormData } from './utils/interface.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

function App() {
    const [updatedFormData, setUpdatedFormData] = useState<FormData>({
        name: '',
        profession: '',
        building: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
    })
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route
                    index
                    element={
                        <DataCard setUpdatedFormData={setUpdatedFormData} />
                    }
                />
                <Route
                    path="addData"
                    element={<Form updatedFormData={updatedFormData} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
