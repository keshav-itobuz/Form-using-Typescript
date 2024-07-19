import customAxios from '../utils/customAxios'
import { FormData } from '../interface/interface'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { confirmAlert } from '../utils/confirmAlert'
import { useState } from 'react'
import { Profession } from '../enum/enum'
import EmplopyeeModal from './EmplopyeeModal'
type propsType = {
    employeeInfo: FormData
    handleGetData: () => void
}
function EmployeeCard(props: propsType) {
    const { employeeInfo, handleGetData } = props
    const [isModalOpen, setIsModalOpen] = useState(false)
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

    const handleDelete = async (id: string) => {
        try {
            await customAxios.delete(`delete-employee?id=${id}`)
            handleGetData()
        } catch (error) {
            console.log(error)
        }
    }

    function handleEdit() {
        const updatingData = {
            _id: employeeInfo?._id,
            name: employeeInfo?.name,
            building: employeeInfo?.building,
            profession: employeeInfo?.profession,
            city: employeeInfo?.city,
            state: employeeInfo?.state,
            pincode: employeeInfo?.pincode,
            phone: employeeInfo?.phone,
            email: employeeInfo?.email,
        }
        setFormData(updatingData)
        setIsModalOpen(true)
    }

    return (
        <div>
            <div className=" grid grid-cols-12 bg-white border py-4">
                <span className="col-span-2 ms-3 truncate">
                    {employeeInfo?.name[0].toLocaleUpperCase() +
                        employeeInfo?.name.slice(1)}{' '}
                </span>
                <span className="col-span-5 pe-3">{`${employeeInfo?.building} ${employeeInfo?.city} ${employeeInfo?.state} - ${employeeInfo?.pincode}`}</span>
                <span className="col-span-2 truncate pe-2">
                    {employeeInfo?.email}
                </span>
                <span className="col-span-2 truncate">
                    {!employeeInfo?.phone ? '---' : employeeInfo?.phone}
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
                                employeeInfo?._id &&
                                    handleDelete(employeeInfo?._id)
                            })
                        }}
                    >
                        <FaTrashAlt />
                    </span>
                </span>
            </div>
            {isModalOpen && (
                <EmplopyeeModal
                    setIsModalOpen={setIsModalOpen}
                    employeeDetail={formData}
                    handleGetData={handleGetData}
                />
            )}
        </div>
    )
}

export default EmployeeCard
