import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import GenericInput from './formComponent/GenericInput'
import GenericSelect from './formComponent/GenericSelect'
import { RxCross2 } from 'react-icons/rx';
import { FormData } from '../interface/interface';
import { formValidator } from '../validators/validator';
import customAxios from '../utils/customAxios';
import axios from 'axios';
import { notify, notifySuccess } from '../utils/Toast';

type propsType = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    employeeDetail: FormData
    setEmployeeDetail: Dispatch<SetStateAction<FormData>>
}
function EmplopyeeModal(props: propsType) {
    const ProfessionOption = [
        'all',
        'manager',
        'developer',
        'designer',
        'marketing',
        'hr',
    ]
    const { setIsModalOpen, employeeDetail, setEmployeeDetail } = props;
    const handleSaveUpdate = async () => {
        try {
            const validate = formValidator(employeeDetail)
            if (!validate) return
            await customAxios.post('create-update-employee', {
                employeeDetail,
            })
            setIsModalOpen(false)
            notifySuccess('sucessfully updated')
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                notify(error.response?.data.message)
            }
        }
    }
    const addemployeeDetail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmployeeDetail({ ...employeeDetail, [event.target.name]: event.target.value })
    }
    return (
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
                        value={employeeDetail.name}
                        onChange={(e) => addemployeeDetail(e)}
                    />
                    <GenericInput
                        isRequired={true}
                        type="email"
                        label='Email'
                        placeholder="Email*"
                        name="email"
                        value={employeeDetail.email}
                        onChange={(e) => addemployeeDetail(e)}
                    />
                    <div className='flex gap-2 md:flex-row flex-col'>
                        <GenericInput
                            isRequired={false}
                            label='Phone No'
                            type="number"
                            placeholder="Phone No"
                            name="phone"
                            value={employeeDetail.phone}
                            onChange={(e) => addemployeeDetail(e)}
                        />
                        <div className="flex flex-col gap-1 py-2 w-full">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Profession
                                <span className="ms-1 text-red-700">*</span>
                            </p>
                            <GenericSelect
                                name="profession"
                                defaultValue={employeeDetail.profession}
                                optionValues={ProfessionOption.filter((item) => item !== 'all')}
                                handleChange={(e) => {
                                    setEmployeeDetail({
                                        ...employeeDetail,
                                        [e.target.name]: e.target.value,
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <GenericInput
                        label='Building , Street'
                        isRequired={true}
                        type="text"
                        placeholder="Building , Street*"
                        name="building"
                        value={employeeDetail.building}
                        onChange={(e) => addemployeeDetail(e)}
                    />
                    <GenericInput
                        label='City'
                        isRequired={true}
                        type="text"
                        placeholder="City*"
                        name="city"
                        value={employeeDetail.city}
                        onChange={(e) => addemployeeDetail(e)}
                    />
                    <div className="flex gap-2 md:flex-row flex-col ">
                        <GenericInput
                            label='State'
                            isRequired={true}
                            type="text"
                            placeholder="State*"
                            name="state"
                            value={employeeDetail.state}
                            onChange={(e) => addemployeeDetail(e)}
                        />
                        <GenericInput
                            isRequired={true}
                            label='Pincode'
                            type="number"
                            placeholder="Pincode*"
                            name="pincode"
                            value={employeeDetail.pincode}
                            onChange={(e) => addemployeeDetail(e)}
                        />
                    </div>
                    <div className="flex justify-center my-5">
                        <button type="submit" className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]" onClick={handleSaveUpdate}>{employeeDetail._id ? "Update" : "save"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmplopyeeModal