import { Dispatch, SetStateAction, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { FormData } from '../interface/interface'
import customAxios from '../utils/customAxios'
import { notifySuccess } from '../utils/Toast'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import GenericInput from './formComponent/GenericInput'
import employeeSchema from '../validators/employeeValidator'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profession } from '../enum/enum'
import GenericButton from './formComponent/GenericButton'
import GenericSelect from './formComponent/GenericSelect'

type PropsType = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    handleFormData?: () => void
    employeeDetail?: FormData
    setEmployeeDetail?: Dispatch<SetStateAction<FormData | undefined>>
}
function EmplopyeeModal({
    setIsModalOpen,
    employeeDetail,
    setEmployeeDetail,
    handleFormData,
}: PropsType) {
    const genericInputData = [
        {
            type: 'text',
            placeholder: 'Name',
            name: 'name',
        },
        {
            type: 'email',
            placeholder: 'Email',
            name: 'email',
        },
        {
            type: 'number',
            placeholder: 'Phone No',
            name: 'phone',
        },
        {
            type: 'text',
            placeholder: 'Building',
            name: 'building',
        },
        {
            type: 'text',
            placeholder: 'City',
            name: 'city',
        },
        {
            type: 'text',
            placeholder: 'State',
            name: 'state',
        },
        {
            type: 'number',
            placeholder: 'Pincode',
            name: 'pincode',
        },
    ]

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
                        {genericInputData.map((item, index) => {
                            return (
                                <GenericInput
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    key={index}
                                />
                            )
                        })}
                        <div className="flex flex-col gap-1 py-2 w-full">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Profession
                            </p>
                            <GenericSelect
                                className="border border-[#C0CAD4] outline-none py-2 rounded-md px-2 cursor-pointer "
                                defaultValue={
                                    employeeDetail && employeeDetail.profession
                                }
                                name="profession"
                            >
                                {Object.values(Profession)
                                    .filter((item) => item !== Profession.ALL)
                                    .map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        )
                                    })}
                            </GenericSelect>
                        </div>
                        <div className="flex justify-center my-5">
                            <GenericButton type="submit">
                                {employeeDetail && employeeDetail._id
                                    ? 'Update'
                                    : 'save'}
                            </GenericButton>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    )
}

export default EmplopyeeModal
