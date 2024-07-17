import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './pages/Form.tsx'
import DataCard from './pages/DataCards.tsx'
import { FormData } from './interface/interface.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { Profession } from './enum/enum.ts'


function Router() {
    const [updatedFormData, setUpdatedFormData] = useState<FormData>({
        id: '',
        name: '',
        profession: Profession.PROFESSION,
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

export default Router