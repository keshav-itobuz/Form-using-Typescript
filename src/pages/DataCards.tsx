import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { notify } from "../utils/Toast";
import { FormData } from "../utils/interface";
import { confirmAlert } from "../utils/confirmAlert";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";

type PropsType = {
    setUpdatedFormData: React.Dispatch<React.SetStateAction<FormData>>
}


const DataCards = (props: PropsType) => {
    const { setUpdatedFormData } = props;
    const [userInfo, setUserInfo] = useState<Array<FormData>>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const navigate = useNavigate()



    const getData = async (profession: string, page: number) => {
        try {
            const userData = await axios.get(`http://localhost:4000/getData?profession=${profession}&page=${page}`)
            setUserInfo(userData.data.data.userData);
            setTotalPage(userData.data.data.total);
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
        setUpdatedFormData(updatingData);
        navigate('/addData');

    }

    useEffect(() => {
        getData('all', pageNumber);
    }, [pageNumber]);

    return (
        <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
            <div className="flex max-w-[1200px] justify-between mx-auto py-6">
                <div className="flex gap-1">
                    <select className="border outline-none? py-2 rounded-md px-3 cursor-pointer" name="profession" onChange={(e) => getData(e.target.value, pageNumber)} >
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
                <div className=" max-h-[70vh] overflow-y-scroll no-scrollbar]">
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
            <div className="flex justify-center mt-10 max-w-[1200px] absolute left-[45%] bottom-10  gap-5">
                <button type="submit" className=" bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem]  hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]" onClick={() => { pageNumber > 0 ? setPageNumber(pageNumber - 1) : notify('You are on first Page') }}><FaCaretLeft /></button>
                <span className=" text-[1.1rem] mt-1 w-[10px]">{pageNumber + 1}</span>
                <button type="submit" className=" bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem]  hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] pt-2" onClick={() => { pageNumber < totalPage - 1 ? setPageNumber(pageNumber + 1) : notify('You are on last Page') }}><FaCaretRight /></button>
            </div>
        </div>
    )
}

export default DataCards