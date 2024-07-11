import axios from "axios";
import { useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { notify } from "../utils/Toast";
import { RxCross2 } from 'react-icons/rx';

export interface UserData {
    _id: string
    name: string,
    address: {
        building: string,
        city: string,
        state: string,
        pincode: string
    },
    phone: string,
    email: string
}

const UserData = () => {
    const [userInfo, setUserInfo] = useState<Array<UserData>>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [building, setBuilding] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [pincode, setPincode] = useState<string>('')
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const handleSubmit = async () => {
        try {
            if (!building || !state || !city || !pincode || !name || !email) {
                notify('Fill all the fields')
                return;
            }
            if (!email.match(emailRegex)) {
                alert('Invalid email')
                return;
            }
            await axios.put('http://localhost:4000/updateData', {
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
            notify('sucessfully updated');
            getData();
            setIsModalOpen(false);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getData = async () => {
        try {
            const userData = await axios.get('http://localhost:4000/getData')
            setUserInfo(userData.data.data);
            console.log(userData.data.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/deleteData?id=${id}`);
            notify('Successfully Deleted')
            const filterData = userInfo.filter((item) => {
                return item._id !== id
            })
            setUserInfo(filterData);
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
        setBuilding(filteredData[0].address.building);
        setCity(filteredData[0].address.city);
        setState(filteredData[0].address.state);
        setPincode(filteredData[0].address.pincode);
        setName(filteredData[0].name);
        setPhone(filteredData[0].phone);
        setEmail(filteredData[0].email);

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
            <p className="py-6 text-end max-w-[1200px] mx-auto text-violet-900 cursor-pointer"><Link to={'/addData'} >Add Employee data</Link></p>
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
                            <span className='col-span-5 pe-3'>{`${data?.address?.building} ${data?.address?.city} ${data?.address?.state} - ${data?.address?.pincode}`}</span>
                            <span className='col-span-2 truncate pe-2'>{data?.email}</span>
                            <span className='col-span-2 truncate'>{data?.phone === "" ? "---" : data?.phone}</span>
                            <span className="col-span-1 flex gap-8">
                                <span className=" cursor-pointer" onClick={() => handleEdit(data._id)}><MdEdit /></span>
                                <span className=" cursor-pointer" onClick={() => handleDelete(data._id)}><FaTrashAlt /></span>
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
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Email
                                    <span className="ms-1 text-red-700">*</span>
                                </p>
                                <input
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Phone No
                                </p>
                                <input
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Building , Street
                                    <span className="ms-1">*</span>
                                </p>
                                <input
                                    value={building}
                                    onChange={(e)=>setBuilding(e.target.value)}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    City
                                    <span className="ms-1">*</span>
                                </p>
                                <input
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
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
                                        value={state}
                                        onChange={(e)=>setState(e.target.value)}
                                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                        Pincode
                                        <span className="ms-1">*</span>
                                    </p>
                                    <input
                                        value={pincode}
                                        onChange={(e)=>setPincode(e.target.value)}
                                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    />
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

export default UserData