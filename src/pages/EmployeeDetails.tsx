import { useEffect, useState } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import { notify } from '../utils/Toast'
import { FormData } from '../interface/interface'
import { confirmAlert } from '../utils/confirmAlert'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import customAxios from '../utils/customAxios'
import GenericSelect from '../components/formComponent/GenericSelect'
import { Profession } from '../enum/enum'
import EmplopyeeModal from '../components/EmplopyeeModal'

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
        Profession.ALL,
        Profession.MANAGER,
        Profession.DEVELOPER,
        Profession.DESIGNER,
        Profession.MARKETING,
        Profession.HR,
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

    const handleDeleteAll = async () => {
        try {
            await customAxios.delete(`delete-all-employee`)
            setEmployeeInfo([])
        } catch (error) {
            console.log(error)
        }
    }

    function handleEdit(id: string) {
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
        setIsModalOpen(true)
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
        setIsModalOpen(true)
    }

    const handlePagination = (pageRecord: string) => {
        getData(profession, 0, Number(pageRecord))
        setLastRecord(Number(pageRecord))
        setPageNumber(0)
    }

    useEffect(() => {
        getData(profession, pageNumber, 10)
    }, [pageNumber])

    useEffect(() => {
        getData(profession, pageNumber, lastRecord)
    }, [isModalOpen])

    return (
        <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
            <div className="flex max-w-[1200px] justify-between mx-auto py-7">
                <div className="flex gap-1">
                    <GenericSelect
                        handleChange={(e) => {
                            setProfession(e.target.value)
                            setPageNumber(0)
                            getData(e.target.value, 0, lastRecord)
                        }}
                        defaultValue="all"
                        optionValues={ProfessionOption}
                        name="profession"
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
            <div className="max-w-[1200px] mx-auto ">
                <div className=" grid grid-cols-12 bg-white py-2 border rounded-t-2xl">
                    <span className="col-span-2 ms-3 ">Name</span>
                    <span className="col-span-5 ">Address</span>
                    <span className="col-span-2">Email</span>
                    <span className="col-span-2 ">Phone No</span>
                </div>
                <div className=" h-[72vh] overflow-y-scroll no-scrollbar">
                    <EmployeeCard
                        formData={employeeInfo}
                        setFormData={setEmployeeInfo}
                        handleEdit={handleEdit}
                    />
                </div>
            </div>
            <div className="flex justify-center mx-auto  max-w-[1200px] mt-6 gap-5">
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
                    <div className="text-[2rem]">
                        <FaCaretLeft />
                    </div>
                </button>

                <GenericSelect
                    handleChange={(e) => {
                        handlePagination(e.target.value)
                    }}
                    defaultValue={10}
                    optionValues={recordsIndex}
                    name="page"
                />

                <p className="mt-2">
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
                    <div className="text-[2rem]">
                        <FaCaretRight />
                    </div>
                </button>
            </div>

            {isModalOpen && (
                <EmplopyeeModal
                    setIsModalOpen={setIsModalOpen}
                    employeeDetail={formData}
                    setEmployeeDetail={setFormData}
                />
            )}
        </div>
    )
}

export default EmployeeDetails
