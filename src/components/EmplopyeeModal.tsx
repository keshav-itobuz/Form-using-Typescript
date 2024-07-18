import { Dispatch, SetStateAction } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { FormData } from '../interface/interface'
import { formValidator } from '../validators/validator'
import customAxios from '../utils/customAxios'
import axios from 'axios'
import { notify, notifySuccess } from '../utils/Toast'
import { useForm, SubmitHandler } from 'react-hook-form'

type propsType = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    employeeDetail: FormData
    setEmployeeDetail: Dispatch<SetStateAction<FormData>>
}
function EmplopyeeModal(props: propsType) {
    const { setIsModalOpen, employeeDetail, setEmployeeDetail } = props
    const handleSaveUpdate = async (employeeData: FormData) => {
        try {
            const validate = formValidator(employeeData)
            if (!validate) return
            await customAxios.post('create-update-employee', {
                employeeData,
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        data._id = employeeDetail._id
        setEmployeeDetail(data)
        handleSaveUpdate(data)
    }

    const ProfessionOption = [
        'all',
        'manager',
        'developer',
        'designer',
        'marketing',
        'hr',
    ]

    return (
        <div>
            <div className=" z-10 fixed inset-0 bg-black/60  flex ">
                <div className=" bg-white rounded-2xl m-auto p-5 md:p-7 flex flex-col">
                    <div className="flex justify-between sm:gap-[200px]">
                        <h2 className="text-[1.2rem] font-medium">
                            Edit Response
                        </h2>
                        <button
                            className="border border-gray-300 rounded-md px-1 "
                            onClick={() => setIsModalOpen(false)}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-1 py-2 ">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Name
                            </p>
                            <input
                                type="text"
                                placeholder="Name*"
                                defaultValue={employeeDetail.name}
                                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span>This field is required</span>}
                        </div>

                        <div className="flex flex-col gap-1 py-2 ">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Email
                            </p>
                            <input
                                type="email"
                                placeholder="Email*"
                                defaultValue={employeeDetail.email}
                                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                {...register('email', { required: true })}
                            />
                            {errors.email && (
                                <span>This field is required</span>
                            )}
                        </div>
                        <div className="flex gap-2 md:flex-row flex-col">
                            <div className="flex flex-col gap-1 py-2 ">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Phone
                                </p>
                                <input
                                    type="number"
                                    defaultValue={employeeDetail.phone}
                                    placeholder="Phone No"
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    {...register('phone', { required: true })}
                                />
                            </div>
                            <div className="flex flex-col gap-1 py-2 w-full">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Profession
                                    <span className="ms-1 text-red-700">*</span>
                                </p>
                                <select
                                    className="border border-[#C0CAD4] outline-none py-2 rounded-md px-2 cursor-pointer "
                                    defaultValue={employeeDetail.profession}
                                    {...register('profession', {
                                        required: true,
                                    })}
                                >
                                    {ProfessionOption.filter(
                                        (item) => item !== 'all'
                                    ).map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 py-2 ">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Building
                            </p>
                            <input
                                type="text"
                                defaultValue={employeeDetail.building}
                                placeholder="Building , Street*"
                                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                {...register('building', { required: true })}
                            />
                            {errors.building && (
                                <span>This field is required</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 py-2 ">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                City
                            </p>
                            <input
                                type="text"
                                defaultValue={employeeDetail.city}
                                placeholder="City*"
                                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                {...register('city', { required: true })}
                            />
                            {errors.city && <span>This field is required</span>}
                        </div>
                        <div className="flex gap-2 md:flex-row flex-col ">
                            <div className="flex flex-col gap-1 py-2 ">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    state
                                </p>
                                <input
                                    type="text"
                                    defaultValue={employeeDetail.state}
                                    placeholder="State*"
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    {...register('state', { required: true })}
                                />
                                {errors.state && (
                                    <span>This field is required</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 py-2 ">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    pincode
                                </p>
                                <input
                                    type="number"
                                    defaultValue={employeeDetail.pincode}
                                    placeholder="Pincode*"
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                    {...register('pincode', { required: true })}
                                />
                                {errors.pincode && (
                                    <span>This field is required</span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center my-5">
                            <button
                                type="submit"
                                className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]"
                            >
                                {employeeDetail._id ? 'Update' : 'save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmplopyeeModal
