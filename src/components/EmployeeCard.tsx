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
                <div className=" grid grid-cols-12 bg-white border py-4">
                    <span className="col-span-2 ms-3 truncate">
                        {employeeData.name}
                    </span>
                    <span className="col-span-5 pe-3">{`${employeeData?.building} ${employeeData?.city} ${employeeData?.state} - ${employeeData?.pincode}`}</span>
                    <span className="col-span-2 truncate pe-2">
                        {employeeData?.email}
                    </span>
                    <span className="col-span-2 truncate">
                        {!employeeData?.phone ? '---' : employeeData?.phone}
                    </span>
                    <span className="col-span-1 flex gap-8">
                        <span
                            className=" cursor-pointer"
                            onClick={() => {
                                handleEdit()
                            }}
                        >
                            <MdEdit />
                        </span>
                        <span
                            className=" cursor-pointer"
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
