import axios from "axios"
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6"
import { IoIosMail } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";
import { TbMapPinCode } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, FormEvent, useRef } from "react"
import { notify } from "../utils/Toast";

function Form() {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [building, setBuilding] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [pincode, setPincode] = useState<string>('')
    const [showOtherSection, setShowOtherSection] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!building || !state || !city || !pincode) {
                notify('Fill all the fields')
                return;
            }

            await axios.post('http://localhost:4000/saveData', {
                name,
                address: {
                    building,
                    city,
                    state,
                    pincode
                },
                phone,
                email
            })
            formRef.current && formRef.current.reset();
            setShowOtherSection(false);
            navigate("/");
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleNext = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!name || !email) {
            notify('Fill all the fields');
            return;
        }
        if (!email.match(emailRegex)) {
            alert('Invalid email')
            return;
        }
        formRef.current && formRef.current.reset();
        setShowOtherSection(true);
    }

    return (
        <div className='min-h-[100vh] flex items-center  bg-cover bg-no-repeat' id="form" >
            <div className='w-[100%]'>
                <div className='mx-auto w-[100%] max-w-[450px] text-center bg-gradient-linear min-h-fit pt-7 px-8 sm:px-10 pb-8'>
                    <h2 className='text-white text-[2.1rem] mb-5'>Contact Details</h2>
                    <p className='text-white text-[1rem]'>Please provide accurate and complete information for employee registration.</p>
                </div>
                <form className='w-[100%] max-w-[450px] min-h-fit flex flex-col gap-5 mx-auto bg-white px-8 sm:px-16' onSubmit={handleSubmit} id="formData" ref={formRef}>
                    <h1 className='text-[#3d176b] text-[1.5rem] mt-[10%] mx-auto'>EMPLOYEE REGISTER</h1>
                    {!showOtherSection ?
                        <div>
                            <div className='flex flex-col gap-5'>
                                <div className='relative'>
                                    <FaUser className='text-white absolute start-3 top-[9px] text-[1.5rem]' />
                                    <input type="text" placeholder='Name*' id="name" onChange={(e) => setName(e.target.value)} className=' border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>
                                <div className='relative'>
                                    <IoIosMail className='text-white absolute start-3 top-[9px] text-[1.5rem]' />
                                    <input type="email" placeholder='Email*' onChange={(e) => setEmail(e.target.value)} className=' border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>
                                <div className='relative'>
                                    <FaPhone className='text-white absolute start-3 top-[12px] text-[1.3rem]' />
                                    <input type="number" onChange={(e) => setPhone(e.target.value)} placeholder='Phone No' className=' border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>
                            </div>
                            <div className="flex justify-center my-5">
                                <button type="button" className="bg-gradient-linear-right text-white px-10 py-2 hover:bg-none hover:border-[#3d176b] hover:text-[#3d176b] border-2 rounded-full lg:text-normal" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                        :
                        <div>
                            <div className='flex flex-col gap-5'>
                                <div className='relative'>
                                    <MdOutlineLocationCity className='text-white absolute start-3 top-[9px] text-[1.5rem] ' />
                                    <input type="text" placeholder='Building , Street*' onChange={(e) => setBuilding(e.target.value)} className=' pe-3 border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>
                                <div className='relative'>
                                    <FaAddressCard className='text-white absolute start-3 top-[9px] text-[1.5rem]' />
                                    <input type="text" placeholder='City*' onChange={(e) => setCity(e.target.value)} className=' border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>
                                <div className='relative'>
                                    <FaMapLocationDot className='text-white absolute start-3 top-[12px] text-[1.3rem]' />
                                    <input type="text" placeholder='State*' onChange={(e) => setState(e.target.value)} className=' border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>
                                <div className='relative'>
                                    <TbMapPinCode className='text-white absolute start-3 top-[12px] text-[1.3rem]' />
                                    <input type="number" placeholder='Pincode*' onChange={(e) => setPincode(e.target.value)} className=' border w-[100%] outline-none pb-3 pt-2 rounded-full ps-12 bg-[#C3D5E5] text-[#3d176b]' />
                                </div>

                            </div>
                            <div className="flex justify-center my-5">
                                <button type="submit" className="bg-gradient-linear-right text-white px-10 py-2 hover:bg-none hover:border-[#3d176b] hover:text-[#3d176b] border-2 rounded-full lg:text-normal">Submit</button>
                            </div>
                        </div>}
                </form>
            </div >
        </div >
    )
}

export default Form