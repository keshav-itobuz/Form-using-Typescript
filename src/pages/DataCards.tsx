import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { notify } from '../utils/Toast'
import { FormData } from '../utils/interface'
import { confirmAlert } from '../utils/confirmAlert'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'

type PropsType = {
    setUpdatedFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const DataCards = (props: PropsType) => {
    const { setUpdatedFormData } = props
    const [employeeInfo, setEmployeeInfo] = useState<Array<FormData>>([])
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [lastRecord, setLastRecord] = useState<number>(10)
    const [profession, setProfession] = useState<string>('all')
    const [totalRecord, setTotalRecord] = useState<number>(1)
    const recordsIndex = [10, 20, 30, 40, 50]
    const navigate = useNavigate()

    const getData = async (profession: string, page: number, limit: number) => {
        try {
            const employeeData = await axios.get(
                `http://localhost:4000/get-employee?profession=${profession}&page=${page}&limit=${limit}`
            )
            setEmployeeInfo(employeeData.data.data.employeeData)
            setTotalRecord(employeeData.data.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/delete-employee?id=${id}`)
            const filterData = employeeInfo.filter((item) => {
                return item._id !== id
            })
            setEmployeeInfo(filterData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAll = async () => {
        try {
            await axios.delete(`http://localhost:4000/delete-all-employee`)
            setEmployeeInfo([])
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (id: string) => {
        const filteredData = employeeInfo.filter((item) => {
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
        setUpdatedFormData(updatingData)
        navigate('/addData')
    }
    const handleNewEntry = () => {
        const updatingData = {
            _id: '',
            name: '',
            building: '',
            profession: 'profession',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            email: '',
        }
        setUpdatedFormData(updatingData)
        navigate('/addData')
    }
    const handlePagination = (pageRecord: string) => {
        getData(profession, 0, Number(pageRecord))
        setLastRecord(Number(pageRecord))
        setPageNumber(0)
    }

    useEffect(() => {
        getData(profession, pageNumber, 10)
    }, [pageNumber])
    

    return (
        <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
            <div className="flex max-w-[1200px] justify-between mx-auto py-6">
                <div className="flex gap-1">
                    <select
                        className="border outline-none py-2 rounded-md px-3 cursor-pointer"
                        name="profession"
                        onChange={(e) => {
                            setProfession(e.target.value)
                            setPageNumber(0)
                            getData(e.target.value, 0, lastRecord)
                        }}
                    >
                        <option value="all">All</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="marketing">Marketing</option>
                        <option value="hr">Hr</option>
                    </select>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className=" text-white px-5 py-2 border-2 bg-red-700 hover:bg-red-800 rounded-md "
                            onClick={() => {
                                if (!employeeInfo.length) {
                                    notify('No data to delete')
                                    return
                                }
                                confirmAlert(handleDeleteAll)
                            }}
                        >
                            Delete All
                        </button>
                    </div>
                </div>
                <p
                    className=" text-violet-900 cursor-pointer me-2"
                    onClick={handleNewEntry}
                >
                    Add Employee data
                </p>
            </div>
            <div className="max-w-[1200px] mx-auto">
                <div className=" grid grid-cols-12 bg-white py-2 border rounded-t-2xl">
                    <span className="col-span-2 ms-3 ">Name</span>
                    <span className="col-span-5 ">Address</span>
                    <span className="col-span-2">Email</span>
                    <span className="col-span-2 ">Phone No</span>
                </div>
                <div className=" h-[72vh] overflow-y-scroll no-scrollbar]">
                    {employeeInfo.map((data, index) => (
                        <div
                            className=" grid grid-cols-12 bg-white border py-4"
                            key={index}
                        >
                            <span className="col-span-2 ms-3 truncate">
                                {data?.name[0].toLocaleUpperCase() +
                                    data?.name.slice(1)}{' '}
                            </span>
                            <span className="col-span-5 pe-3">{`${data?.building} ${data?.city} ${data?.state} - ${data?.pincode}`}</span>
                            <span className="col-span-2 truncate pe-2">
                                {data?.email}
                            </span>
                            <span className="col-span-2 truncate">
                                {!data?.phone ? '---' : data?.phone}
                            </span>
                            <span className="col-span-1 flex gap-8">
                                <span
                                    className=" cursor-pointer"
                                    onClick={() => {
                                        data._id && handleEdit(data._id)
                                    }}
                                >
                                    <MdEdit />
                                </span>
                                <span
                                    className=" cursor-pointer"
                                    onClick={() => {
                                        confirmAlert(() => {
                                            data._id && handleDelete(data._id)
                                        })
                                    }}
                                >
                                    <FaTrashAlt />
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mx-auto  max-w-[1200px] mt-10 gap-5">
                <button
                    type="submit"
                    className={`text-[1.5rem] ${pageNumber > 0 ? 'text-black' : 'text-gray-400'}`}
                    onClick={() => {
                        if (pageNumber > 0) {
                            setPageNumber(pageNumber - 1)
                            setLastRecord((pageNumber + 1) * 10 - 10)
                        }
                    }}
                >
                    <FaCaretLeft />
                </button>
                <select
                    name="page"
                    id="page"
                    className=" border outline-none py-1 rounded-md px-2 cursor-pointer "
                    onChange={(e) => {
                        handlePagination(e.target.value)
                    }}
                >
                    {recordsIndex.map((value) => {
                        return <option value={value} key={value}> {value}</option>
                    })}
                </select>
                <p className="mt-[0.2rem]">
                    Record {pageNumber * 10 + 1}-
                    {lastRecord < totalRecord ? lastRecord : totalRecord} of{' '}
                    {totalRecord}
                </p>
                <button
                    type="submit"
                    className={`text-[1.5rem] ${lastRecord < totalRecord ? 'text-black' : 'text-gray-400'}`}
                    onClick={() => {
                        if (lastRecord < totalRecord) {
                            setPageNumber(pageNumber + 1)
                            setLastRecord((pageNumber + 1) * 10 + 10)
                        }
                    }}
                >
                    <FaCaretRight />
                </button>
            </div>
        </div>
    )
}

export default DataCards
