import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
import { FaAddressCard } from 'react-icons/fa6'
import { MdOutlineLocationCity } from 'react-icons/md'
import { TbMapPinCode } from 'react-icons/tb'
import { FaMapLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useState, FormEvent, useRef, ChangeEvent } from 'react'
import { MdHomeRepairService } from 'react-icons/md'
import { FormData } from '../interface/interface'
import { notify, notifySuccess } from '../utils/Toast'
import GenericInput from '../components/formComponent/GenericInput'
import customAxios from '../utils/customAxios'
import { addressValidator, employeeDetailsValidator } from '../validators/validator'

interface PropsInterface {
    updatedFormData: FormData
}

const Form = (props: PropsInterface) => {
    const [formData, setFormData] = useState<FormData>({
        _id: props.updatedFormData._id,
        name: props.updatedFormData.name,
        profession: props.updatedFormData.profession,
        building: props.updatedFormData.building,
        phone: props.updatedFormData.phone,
        city: props.updatedFormData.city,
        state: props.updatedFormData.state,
        pincode: props.updatedFormData.pincode,
        email: props.updatedFormData.email,
    })
    const [showOtherSection, setShowOtherSection] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

    const handleSaveUpdate = async () => {
        try {
            const validate = addressValidator(formData)
            if (!validate) return
            console.log(formData)
            await customAxios.post('create-update-employee', {
                formData,
            })
            navigate('/')
            notifySuccess('sucessfully updated')
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                notify(error.response?.data.message)
            }
        }
    }

    const handleNext = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const validate = employeeDetailsValidator(formData)
        if (!validate) return
        setShowOtherSection(true)
    }

    const addFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    return (
        <div
            className="min-h-[100vh] flex items-center  bg-cover bg-no-repeat"
            id="form"
        >
            <div className="w-[100%] mx-1">
                <div className="mx-auto w-[100%] max-w-[450px] text-center bg-gradient-linear min-h-fit pt-7 px-8 sm:px-10 pb-8">
                    <h2 className="text-white text-[2.1rem] mb-5">
                        Contact Details
                    </h2>
                    <p className="text-white text-[1rem]">
                        Please provide accurate and complete information for
                        employee registration.
                    </p>
                </div>
                <form
                    className="w-[100%] max-w-[450px] min-h-fit flex flex-col gap-5 mx-auto bg-white px-8 sm:px-16"
                    id="formData"
                    ref={formRef}
                >
                    <h1 className="text-[#3d176b] text-[1.5rem] mt-[10%] mx-auto">
                        EMPLOYEE REGISTER
                    </h1>
                    {!showOtherSection ? (
                        <div>
                            <div className="flex flex-col gap-5">
                                <div className="relative">
                                    <FaUser className="text-white absolute start-3 top-[9px] text-[1.5rem]" />
                                    <GenericInput
                                        type="text"
                                        placeholder="Name*"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>
                                <div className="relative">
                                    <IoIosMail className="text-white absolute start-3 top-[9px] text-[1.5rem]" />
                                    <GenericInput
                                        type="email"
                                        placeholder="Email*"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>
                                <div className="relative">
                                    <FaPhone className="text-white absolute start-3 top-[12px] text-[1.3rem]" />
                                    <GenericInput
                                        type="number"
                                        placeholder="Phone No"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>
                                <div className="relative">
                                    <MdHomeRepairService className="text-white absolute start-3 top-[10px] text-[1.5rem]" />
                                    <select
                                        className="border w-[100%]  outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b] cursor-pointer ms-auto"
                                        name="profession"
                                        defaultValue={formData.profession}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }}
                                    >
                                        <option value="profession" hidden>
                                            Profession
                                        </option>
                                        <option value="manager">Manager</option>
                                        <option value="developer">
                                            Developer
                                        </option>
                                        <option value="designer">
                                            Designer
                                        </option>
                                        <option value="marketing">
                                            Marketing
                                        </option>
                                        <option value="hr">Hr</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center my-5">
                                <button
                                    type="button"
                                    className="bg-gradient-linear-right text-white px-10 py-2 hover:bg-none hover:border-[#3d176b] hover:text-[#3d176b] border-2 rounded-full lg:text-normal"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col gap-5">
                                <div className="relative">
                                    <MdOutlineLocationCity className="text-white absolute start-3 top-[9px] text-[1.5rem] " />
                                    <GenericInput
                                        type="text"
                                        placeholder="Building , Street*"
                                        name="building"
                                        value={formData.building}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>
                                <div className="relative">
                                    <FaAddressCard className="text-white absolute start-3 top-[9px] text-[1.5rem]" />
                                    <GenericInput
                                        type="text"
                                        placeholder="City*"
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>
                                <div className="relative">
                                    <FaMapLocationDot className="text-white absolute start-3 top-[12px] text-[1.3rem]" />
                                    <GenericInput
                                        type="text"
                                        placeholder="State*"
                                        name="state"
                                        value={formData.state}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>

                                <div className="relative">
                                    <TbMapPinCode className="text-white absolute start-3 top-[12px] text-[1.3rem]" />
                                    <GenericInput
                                        type="number"
                                        placeholder="Pincode*"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={(e) => addFormData(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center my-5">
                                <button
                                    type="button"
                                    className="bg-gradient-linear-right text-white px-10 py-2 hover:bg-none hover:border-[#3d176b] hover:text-[#3d176b] border-2 rounded-full lg:text-normal"
                                    onClick={handleSaveUpdate}
                                >
                                    {props.updatedFormData._id ? "Update" : "save"}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Form
