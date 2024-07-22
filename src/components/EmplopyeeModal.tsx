import { Dispatch, SetStateAction, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { FormData } from '../interface/interface'
import customAxios from '../utils/customAxios'
import { notifySuccess } from '../utils/Toast'
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import GenericInput from './formComponent/GenericInput'
import employeeSchema from '../validators/employeeValidator'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profession } from '../enum/enum'

type propsType = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    handleFormData?: () => void
    employeeDetail?: FormData
    setEmployeeDetail?: Dispatch<SetStateAction<FormData | undefined>>
}
function EmplopyeeModal(props: propsType) {
    const {
        setIsModalOpen,
        employeeDetail,
        setEmployeeDetail,
        handleFormData,
    } = props
    const handleSaveUpdate = async (employeeData: FormData) => {
        try {
            await customAxios.post('create-update-employee', {
                employeeData,
            })
            setIsModalOpen(false)
            if (setEmployeeDetail) setEmployeeDetail(employeeData)
            if (handleFormData) handleFormData()
            notifySuccess('sucessfully updated')
        } catch (error) {
            console.log(error)
            if (error instanceof z.ZodError) {
                console.log(error.issues)
            }
        }
    }
    const methods = useForm<FormData>({ resolver: zodResolver(employeeSchema) })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        data._id = employeeDetail && employeeDetail._id
        handleSaveUpdate(data)
    }

    const ProfessionOption = [
        Profession.ALL,
        Profession.MANAGER,
        Profession.DEVELOPER,
        Profession.DESIGNER,
        Profession.MARKETING,
        Profession.HR,
    ]
    useEffect(() => {
        employeeDetail && methods.reset(employeeDetail)
    }, [employeeDetail])

    return (
        <FormProvider {...methods}>
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
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <GenericInput
                            type="text"
                            label="Name"
                            fieldName="name"
                            isRequired={true} 
                        />
                        <GenericInput
                            type="email"
                            label="Email"
                            fieldName="email"
                            isRequired={true}
                        />
                        <div className="flex gap-2 md:flex-row flex-col">
                            <GenericInput
                                type="number"
                                label="Phone No"
                                fieldName="phone"
                                isRequired={false}
                                
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
                                    {...methods.register('profession', {
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
                            label="Building"
                            fieldName="building"
                            isRequired={true}
                        />
                        <GenericInput
                            type="text"
                            label="City"
                            fieldName="city"
                            isRequired={true}
                        />
                        <div className="flex gap-2 md:flex-row flex-col ">
                            <div>
                                <GenericInput
                                    type="text"
                                    label="State"
                                    fieldName="state"
                                    isRequired={true}
                                />
                            </div>
                            <div>
                                <GenericInput
                                    type="number"
                                    label="Pincode"
                                    fieldName="pincode"
                                    isRequired={true}
                                />
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
        </FormProvider>
    )
}

export default EmplopyeeModal
