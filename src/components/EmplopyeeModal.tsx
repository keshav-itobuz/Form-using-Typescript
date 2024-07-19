import { Dispatch, SetStateAction, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { FormData } from '../interface/interface'
import customAxios from '../utils/customAxios'
import { notifySuccess } from '../utils/Toast'
import { useForm, SubmitHandler } from 'react-hook-form'
import GenericInput from './formComponent/GenericInput'
import employeeSchema from '../validators/employeeValidator'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type propsType = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    handleGetData: () => void
    employeeDetail?: FormData
}
function EmplopyeeModal(props: propsType) {
    const { setIsModalOpen, employeeDetail, handleGetData } = props
    const handleSaveUpdate = async (employeeData: FormData) => {
        try {
            await customAxios.post('create-update-employee', {
                employeeData,
            })
            setIsModalOpen(false)
            handleGetData()
            notifySuccess('sucessfully updated')
        } catch (error) {
            console.log(error)
            if (error instanceof z.ZodError) {
                console.log(error.issues);
            }
        }
    }
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>(({ resolver: zodResolver(employeeSchema) }))

    const onSubmit: SubmitHandler<FormData> = (data) => {
        data._id = employeeDetail && employeeDetail._id
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
    useEffect(() => {
        employeeDetail && reset(employeeDetail)
    }, [employeeDetail])

    return (
        <div>
            <div className=" z-10 fixed inset-0 bg-black/60  flex  overflow-y-scroll no-scrollbar">
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
                        <GenericInput
                            type="text"
                            placeholder="Name"
                            label="Name"
                            name="name"
                            isRequired={true}
                            register={register}
                        />
                        {errors.name && (
                            <span className="text-[0.8rem] text-red-700 ms-1">
                                {errors.name.message}
                            </span>
                        )}

                        <GenericInput
                            type="email"
                            placeholder="Email"
                            label="Email"
                            name="email"
                            isRequired={true}
                            register={register}
                        />
                        {errors.email && (
                            <span className="text-[0.8rem] text-red-700 ms-1">
                                {errors.email.message}
                            </span>
                        )}
                        <div className="flex gap-2 md:flex-row flex-col">
                            <GenericInput
                                type="number"
                                placeholder="Number"
                                label="Phone No"
                                name="phone"
                                isRequired={false}
                                register={register}
                            />

                            <div className="flex flex-col gap-1 py-2 w-full">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Profession
                                </p>
                                <select
                                    className="border border-[#C0CAD4] outline-none py-2 rounded-md px-2 cursor-pointer "
                                    defaultValue={
                                        employeeDetail &&
                                        employeeDetail.profession
                                    }
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

                        <GenericInput
                            type="text"
                            placeholder="Building"
                            label="Building"
                            name="building"
                            isRequired={true}
                            register={register}
                        />
                        {errors.building && (
                            <span className="text-[0.8rem] text-red-700 ms-1">
                                {errors.building.message}
                            </span>
                        )}
                        <GenericInput
                            type="text"
                            placeholder="City"
                            label="City"
                            name="city"
                            isRequired={true}
                            register={register}
                        />
                        {errors.city && (
                            <span className="text-[0.8rem] text-red-700 ms-1">
                                {errors.city.message}
                            </span>
                        )}
                        <div className="flex gap-2 md:flex-row flex-col ">
                            <div>
                                <GenericInput
                                    type="text"
                                    placeholder="State"
                                    label="State"
                                    name="state"
                                    isRequired={true}
                                    register={register}
                                />
                                {errors.state && (
                                    <span className="text-[0.8rem] text-red-700 ms-1">
                                        {errors.state.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <GenericInput
                                    type="number"
                                    placeholder="Pincode"
                                    label="Pincode"
                                    name="pincode"
                                    isRequired={true}
                                    register={register}
                                />
                                {errors.pincode && (
                                    <span className="text-[0.8rem] text-red-700 ms-1">
                                        {errors.pincode.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center my-5">
                            <button
                                type="submit"
                                className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]"
                            >
                                {employeeDetail && employeeDetail._id
                                    ? 'Update'
                                    : 'save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmplopyeeModal
