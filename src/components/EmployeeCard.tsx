import axiosInstance from '../utils/axiosInstance'
import { FormData } from '../interface/interface'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { confirmAlert } from '../utils/confirmAlert'
import { FC, useState } from 'react'
import EmplopyeeModal from './EmplopyeeModal'

type PropsType = {
    employeeInfo: FormData
    handleGetData: () => void
}

const EmployeeCard: FC<PropsType> = ({ employeeInfo, handleGetData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [employeeData, setEmployeeData] = useState<FormData | undefined>(
        employeeInfo
    )

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`delete-employee?id=${id}`)
            handleGetData()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    function handleEdit() {
        setEmployeeData(employeeData)
        setIsModalOpen(true)
    }

    return (
        <div>
            {employeeData && (
                <div className=" grid grid-cols-12 gap-3 md:gap-0 bg-white border py-4 ps-3 md:ps-0 text-[0.9rem] sm:text-[1rem]">
                    <span className="col-span-12 md:col-span-2 md:ms-3 pe-1 truncate">
                        <span className="md:hidden font-semibold font">
                            Name :{' '}
                        </span>
                        {employeeData.name}
                    </span>
                    <span className="col-span-12 md:col-span-4 pe-3">
                        <span className="md:hidden font-semibold">
                            Address :{' '}
                        </span>
                        {`${employeeData?.building} ${employeeData?.city} ${employeeData?.state} - ${employeeData?.pincode}`}
                    </span>
                    <span className="col-span-12 md:col-span-3 truncate pe-2">
                        <span className="md:hidden font-semibold">
                            Email :{' '}
                        </span>
                        {employeeData?.email}
                    </span>
                    <span className="col-span-12 md:col-span-2 truncate">
                        <span className="md:hidden font-semibold">
                            Phone :{' '}
                        </span>
                        {!employeeData?.phone ? '---' : employeeData?.phone}
                    </span>
                    <span className="col-span-12 md:col-span-1 flex gap-8">
                        <span
                            className=" cursor-pointer ms-auto md:ms-0"
                            onClick={() => {
                                handleEdit()
                            }}
                        >
                            <MdEdit />
                        </span>
                        <span
                            className=" cursor-pointer me-3"
                            onClick={() => {
                                confirmAlert(() => {
                                    return (
                                        employeeData?._id &&
                                        handleDelete(employeeData?._id)
                                    )
                                })
                            }}
                        >
                            <FaTrashAlt />
                        </span>
                    </span>
                </div>
            )}
            {isModalOpen && (
                <EmplopyeeModal
                    setIsModalOpen={() => {
                        setIsModalOpen(false)
                    }}
                    employeeDetail={employeeData}
                    setEmployeeDetail={(data) => {
                        setEmployeeData(data)
                    }}
                />
            )}
        </div>
    )
}

export default EmployeeCard
