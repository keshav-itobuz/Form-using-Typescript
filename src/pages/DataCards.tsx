import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { notify } from "../utils/Toast";
import { notifySuccess } from "../utils/Toast";
import { RxCross2 } from 'react-icons/rx';
import { UserData } from "../utils/interface";
import { confirmAlert } from "../utils/confirmAlert";

const DataCards = () => {
    const [formData, setFormData] = useState<UserData>({
        _id: '',
        name: '',
        profession: '',
        building: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: ''
    })
    const [userInfo, setUserInfo] = useState<Array<UserData>>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

    const handleSubmit = async () => {
        try {
            if (!formData.building || !formData.state || !formData.city || !formData.pincode) {
                notify('Fill all the fields')
                return;
            }
            if (!formData.email.match(emailRegex)) {
                alert('Invalid email')
                return;
            }
            await axios.put('http://localhost:4000/updateData', {
                formData
            })
            notifySuccess('sucessfully updated');
            getData('all');
            setIsModalOpen(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getData = async (profession: string) => {
        try {
            const userData = await axios.get(`http://localhost:4000/getData?profession=${profession}`)
            setUserInfo(userData.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/deleteData?id=${id}`);
            const filterData = userInfo.filter((item) => {
                return item._id !== id
            })
            setUserInfo(filterData);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAll = async () => {
        try {
            await axios.delete(`http://localhost:4000/deleteAll`);
            setUserInfo([]);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (id: string) => {
        setIsModalOpen(true);
        const filteredData = userInfo.filter((item) => {
            return item._id === id
        })
        const updatingData = {
            _id: filteredData[0]._id,
            name: filteredData[0].name,
            building: filteredData[0].building,
            profession: filteredData[0].profession,
            city: filteredData[0].city,
            state: filteredData[0].state,
            pincode: filteredData[0].pincode,
            phone: filteredData[0].phone,
            email: filteredData[0].email,
        }
        setFormData(updatingData);

    }

    const addFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        getData('all');
    }, []);

    return (
        <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
            <div className="flex max-w-[1200px] justify-between mx-auto py-6">
                <div className="flex gap-1">
                    <select className="border outline-none? py-2 rounded-md px-3 cursor-pointer" name="profession" onChange={(e) => getData(e.target.value)} >
                        <option value="PROFESSION" selected disabled>Profession</option>
                        <option value="all">All</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="marketing">Marketing</option>
                        <option value="hr">Hr</option>
                    </select>
                    <div className="flex justify-center">
                        <button type="submit" className=" text-white px-5 py-2 border-2 bg-red-700 hover:bg-red-800 rounded-md " onClick={() => {
                            if (!userInfo.length) {
                                notify('No data to delete')
                                return;
                            }
                            confirmAlert(handleDeleteAll)
                        }
                        }>Delete All</button>
                    </div>
                </div>
                <p className=" text-violet-900 cursor-pointer me-2"><Link to={'/addData'} >Add Employee data</Link></p>
            </div>
            <div className="max-w-[1200px] mx-auto">
                <div className=' grid grid-cols-12 bg-white py-2 border rounded-t-2xl'>
                    <span className='col-span-2 ms-3 '>Name</span>
                    <span className='col-span-5 '>Address</span>
                    <span className='col-span-2'>Email</span>
                    <span className='col-span-2 '>Phone No</span>
                </div>
                <div className=" max-h-[75vh] overflow-y-scroll no-scrollbar">
                    {userInfo.map((data, index) => (
                        <div className=' grid grid-cols-12 bg-white border py-4' key={index}>
                            <span className='col-span-2 ms-3 truncate'>{data?.name[0].toLocaleUpperCase() + data?.name.slice(1)} </span>
                            <span className='col-span-5 pe-3'>{`${data?.building} ${data?.city} ${data?.state} - ${data?.pincode}`}</span>
                            <span className='col-span-2 truncate pe-2'>{data?.email}</span>
                            <span className='col-span-2 truncate'>{!data?.phone ? "---" : data?.phone}</span>
                            <span className="col-span-1 flex gap-8">
                                <span className=" cursor-pointer" onClick={() => { data._id && handleEdit(data._id) }}><MdEdit /></span>
                                <span className=" cursor-pointer" onClick={() => { confirmAlert(() => { data._id && handleDelete(data._id) }) }}><FaTrashAlt /></span>
                            </span>
                        </div>

                    ))}
                </div>
            </div>
            {isModalOpen &&
                <div>
                    <div className=" z-10 fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex ">
                        <div className=" bg-white rounded-2xl m-auto p-7 flex-col gap-5 items-center w-[90%] sm:w-[70%] md:w-auto ">
                            <div className="flex justify-between sm:gap-[200px]">
                                <h2 className="text-[1.2rem] font-medium">Edit Response</h2>
                                <button
                                    className="border border-gray-300 rounded-md px-1 "
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Name
                                    <span className="ms-1 text-red-700">*</span>
                                </p>
                                <input
                                    value={formData.name}
                                    name="name"
                                    onChange={(e) => addFormData(e)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Email
                                    <span className="ms-1 text-red-700">*</span>
                                </p>
                                <input
                                    value={formData.email}
                                    name="email" onChange={(e) => addFormData(e)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Phone No
                                </p>
                                <input
                                    value={formData.phone}
                                    name="phone" onChange={(e) => addFormData(e)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Building , Street
                                    <span className="ms-1">*</span>
                                </p>
                                <input
                                    value={formData.building}
                                    name="building" onChange={(e) => addFormData(e)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    City
                                    <span className="ms-1">*</span>
                                </p>
                                <input
                                    value={formData.city}
                                    name="city" onChange={(e) => addFormData(e)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                        State
                                        <span className="ms-1">*</span>
                                    </p>
                                    <input
                                        value={formData.state}
                                        name="state" onChange={(e) => addFormData(e)}
                                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                        Pincode
                                        <span className="ms-1">*</span>
                                    </p>
                                    <input
                                        value={formData.pincode}
                                        name="pincode" onChange={(e) => addFormData(e)}
                                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    />
                                </div>
                                <div className='flex flex-col gap-1 py-2 h-[5rem]'>
                                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                        Profession
                                        <span className="ms-1">*</span>
                                    </p>
                                    <select className="border outline-none? lg:p-[0.8rem] p-[0.4rem] rounded-md px-3 cursor-pointer" name="profession" value={formData.profession} onChange={(e) => {
                                        setFormData({ ...formData, [e.target.name]: e.target.value })
                                    }} >
                                        <option value="manager">Manager</option>
                                        <option value="developer">Developer</option>
                                        <option value="designer">Designer</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="hr">Hr</option>
                                    </select>
                                </div>

                            </div>
                            <div className="flex justify-center my-5">
                                <button type="submit" className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DataCards