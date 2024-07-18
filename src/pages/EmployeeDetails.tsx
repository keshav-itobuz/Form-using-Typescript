import { ChangeEvent, useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { notify, notifySuccess } from '../utils/Toast'
import { FormData } from '../interface/interface'
import { confirmAlert } from '../utils/confirmAlert'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import customAxios from '../utils/customAxios'
import GenericSelect from '../components/formComponent/GenericSelect'
import { RxCross2 } from 'react-icons/rx';
import { Profession } from '../enum/enum'
import { formValidator } from '../validators/validator'
import axios from 'axios'
import GenericInput from '../components/formComponent/GenericInput'


const EmployeeDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [employeeInfo, setEmployeeInfo] = useState<Array<FormData>>([])
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [lastRecord, setLastRecord] = useState<number>(10)
    const [profession, setProfession] = useState<string>('all')
    const [totalRecord, setTotalRecord] = useState<number>(1)
    const [formData, setFormData] = useState<FormData>({
        _id: '',
        name: '',
        profession: Profession.PROFESSION,
        building: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
    })
    const recordsIndex = [10, 20, 30, 40, 50]
    const ProfessionOption = [
        'all',
        'manager',
        'developer',
        'designer',
        'marketing',
        'hr',
    ]

    const getData = async (profession: string, page: number, limit: number) => {
        try {
            const employeeData = await customAxios.get(
                `get-employee?profession=${profession}&page=${page}&limit=${limit}`
            )
            setEmployeeInfo(employeeData.data.data.employeeData)
            setTotalRecord(employeeData.data.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveUpdate = async () => {
        try {
            const validate = formValidator(formData)
            if (!validate) return
            await customAxios.post('create-update-employee', {
                formData,
            })
            setIsModalOpen(false)
            getData(profession, pageNumber, lastRecord)
            notifySuccess('sucessfully updated')
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                notify(error.response?.data.message)
            }
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await customAxios.delete(`delete-employee?id=${id}`)
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
            await customAxios.delete(`delete-all-employee`)
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
        setFormData(updatingData)
        setIsModalOpen(true);
    }

    const handleNewEntry = () => {
        const updatingData = {
            _id: '',
            name: '',
            building: '',
            profession: Profession.PROFESSION,
            city: '',
            state: '',
            pincode: '',
            phone: '',
            email: '',
        }
        setFormData(updatingData)
        setIsModalOpen(true);
    }

    const handlePagination = (pageRecord: string) => {
        getData(profession, 0, Number(pageRecord))
        setLastRecord(Number(pageRecord))
        setPageNumber(0)
    }

    const addFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        getData(profession, pageNumber, 10)
    }, [pageNumber])

    return (
        <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
            <div className="flex max-w-[1200px] justify-between mx-auto py-6">
                <div className="flex gap-1">
                    <GenericSelect
                        handleChange={(e) => {
                            setProfession(e.target.value)
                            setPageNumber(0)
                            getData(e.target.value, 0, lastRecord)
                        }}
                        defaultValue='all'
                        optionValues={ProfessionOption}
                        name="profession"
                        verticalPadding={1}
                    />

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

                <GenericSelect
                    handleChange={(e) => {
                        handlePagination(e.target.value)
                    }}
                    defaultValue={10}
                    optionValues={recordsIndex}
                    name="page"
                    verticalPadding={1}
                />

                <p >
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

            {isModalOpen &&
                <div>
                    <div className=" z-10 fixed inset-0 bg-black/60  flex ">
                        <div className=" bg-white rounded-2xl m-auto p-5 md:p-7 flex flex-col">
                            <div className="flex justify-between sm:gap-[200px]">
                                <h2 className="text-[1.2rem] font-medium">Edit Response</h2>
                                <button
                                    className="border border-gray-300 rounded-md px-1 "
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                            <GenericInput
                                label='Name'
                                isRequired={true}
                                type="text"
                                placeholder="Name*"
                                name="name"
                                value={formData.name}
                                onChange={(e) => addFormData(e)}
                            />
                            <GenericInput
                                isRequired={true}
                                type="email"
                                label='Email'
                                placeholder="Email*"
                                name="email"
                                value={formData.email}
                                onChange={(e) => addFormData(e)}
                            />
                            <div className='flex gap-2 md:flex-row flex-col'>
                                <GenericInput
                                    isRequired={false}
                                    label='Phone No'
                                    type="number"
                                    placeholder="Phone No"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => addFormData(e)}
                                />
                                <div className="flex flex-col gap-1 py-2 w-full">
                                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                        Profession
                                        <span className="ms-1 text-red-700">*</span>
                                    </p>
                                    <GenericSelect
                                        name="profession"
                                        defaultValue={formData.profession}
                                        optionValues={ProfessionOption.filter((item) => item !== 'all')}
                                        handleChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }}
                                        verticalPadding={3}
                                    />
                                </div>
                            </div>
                            <GenericInput
                                label='Building , Street'
                                isRequired={true}
                                type="text"
                                placeholder="Building , Street*"
                                name="building"
                                value={formData.building}
                                onChange={(e) => addFormData(e)}
                            />
                            <GenericInput
                                label='City'
                                isRequired={true}
                                type="text"
                                placeholder="City*"
                                name="city"
                                value={formData.city}
                                onChange={(e) => addFormData(e)}
                            />
                            <div className="flex gap-2 md:flex-row flex-col ">
                                <GenericInput
                                    label='State'
                                    isRequired={true}
                                    type="text"
                                    placeholder="State*"
                                    name="state"
                                    value={formData.state}
                                    onChange={(e) => addFormData(e)}
                                />
                                <GenericInput
                                    isRequired={true}
                                    label='Pincode'
                                    type="number"
                                    placeholder="Pincode*"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={(e) => addFormData(e)}
                                />
                            </div>
                            <div className="flex justify-center my-5">
                                <button type="submit" className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]" onClick={handleSaveUpdate}>{formData._id ? "Update" : "save"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EmployeeDetails
