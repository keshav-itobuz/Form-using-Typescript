import { ChangeEvent, useEffect, useState } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import { FormData } from '../interface/interface'
import { confirmAlert } from '../utils/confirmAlert'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import customAxios from '../utils/customAxios'
import GenericSelect from '../components/formComponent/GenericSelect'
import { Profession } from '../enum/enum'
import EmplopyeeModal from '../components/EmplopyeeModal'
import GenericButton from '../components/formComponent/GenericButton'
import { FormProvider, useForm } from 'react-hook-form'

const EmployeeDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [employeeInfo, setEmployeeInfo] = useState<Array<FormData>>([])
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [lastRecord, setLastRecord] = useState<number>(10)
    const [profession, setProfession] = useState<string>(Profession.ALL)
    const [totalRecord, setTotalRecord] = useState<number>(1)
    const [searchedName, setSearchedName] = useState<string>('')
    const recordsIndex = [10, 20, 30, 40, 50]

    type SelectType = {
        profession?: Profession
        page?: number
    }

    const getData = async (
        profession: string,
        page: number,
        limit: number,
        searchedName: string
    ) => {
        try {
            const employeeData = await customAxios.get(
                `get-employee?profession=${profession}&page=${page}&limit=${limit}&searchedName=${searchedName}`
            )
            setEmployeeInfo(employeeData.data.data.employeeData)
            setTotalRecord(employeeData.data.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetData = () => {
        getData(profession, pageNumber, lastRecord, searchedName)
    }

    const handleDeleteAll = async () => {
        try {
            await customAxios.delete(`delete-employee`)
            setEmployeeInfo([])
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewEntry = () => {
        setIsModalOpen(true)
    }

    const handlePagination = (pageRecord: number) => {
        getData(profession, 0, pageRecord, searchedName)
        setLastRecord(Number(pageRecord))
        setPageNumber(0)
    }

    const setNextPage = () => {
        if (lastRecord < totalRecord) {
            setPageNumber(pageNumber + 1)
            setLastRecord((pageNumber + 1) * 10 + 10)
        }
    }

    const previousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
            setLastRecord((pageNumber + 1) * 10 - 10)
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchedName(e.target.value)
        getData(profession, pageNumber, lastRecord, e.target.value)
    }

    const methods = useForm<SelectType>()

    useEffect(() => {
        getData(profession, pageNumber, 10, searchedName)
    }, [pageNumber])

    return (
        <FormProvider {...methods}>
            <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
                <div className="flex max-w-[1200px] justify-between mx-auto py-7">
                    <div className="flex gap-1">
                        <form
                            onChange={methods.handleSubmit((data) => {
                                setProfession(data.profession!)
                                setPageNumber(0)
                                getData(
                                    data.profession!,
                                    0,
                                    lastRecord,
                                    searchedName
                                )
                            })}
                        >
                            <GenericSelect
                                defaultValue={Profession.ALL}
                                name="profession"
                            >
                                {Object.values(Profession)
                                    .filter(
                                        (item) => item !== Profession.PROFESSION
                                    )
                                    .map((value: string | number) => {
                                        return (
                                            <option value={value} key={value}>
                                                {value}
                                            </option>
                                        )
                                    })}
                            </GenericSelect>
                        </form>
                        <div className="flex justify-center">
                            <GenericButton
                                type="submit"
                                className={`text-white px-5 py-2 border-2 bg-red-700 hover:bg-red-800 rounded-md ${employeeInfo.length ? 'visible' : 'hidden'}`}
                                onClick={() => {
                                    confirmAlert(handleDeleteAll)
                                }}
                            >
                                Delete All
                            </GenericButton>
                        </div>
                        <input
                            placeholder="Search Name"
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] border-[0.1rem] border-[#C0CAD4] p-[0.8rem] text-[0.9rem] rounded-md"
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <GenericButton
                        className=" text-violet-900 cursor-pointer me-2"
                        onClick={handleNewEntry}
                    >
                        Add Employee data
                    </GenericButton>
                </div>
                <div className="max-w-[1200px] mx-auto ">
                    <div className=" grid grid-cols-12 bg-white py-2 border rounded-t-2xl">
                        <span className="col-span-2 ms-3 ">Name</span>
                        <span className="col-span-5 ">Address</span>
                        <span className="col-span-2">Email</span>
                        <span className="col-span-2 ">Phone No</span>
                    </div>
                    <div className=" h-[72vh] overflow-y-scroll no-scrollbar]">
                        {employeeInfo.map((data) => {
                            return (
                                <EmployeeCard
                                    employeeInfo={data}
                                    handleGetData={() => handleGetData()}
                                    key={data._id}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-center mx-auto  max-w-[1200px] mt-6 gap-5">
                    <GenericButton
                        type="submit"
                        className={`text-[1.5rem] ${pageNumber > 0 ? 'text-black' : 'text-gray-400'}`}
                        onClick={previousPage}
                    >
                        <div className="text-[2rem]">
                            <FaCaretLeft />
                        </div>
                    </GenericButton>
                    <form
                        onChange={methods.handleSubmit((data) =>
                            handlePagination(data.page!)
                        )}
                    >
                        <GenericSelect defaultValue={10} name="page">
                            {recordsIndex.map((value) => {
                                return (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                )
                            })}
                        </GenericSelect>
                    </form>
                    <p className="mt-2">
                        Record {pageNumber * 10 + 1}-
                        {lastRecord < totalRecord ? lastRecord : totalRecord} of{' '}
                        {totalRecord}
                    </p>

                    <GenericButton
                        type="submit"
                        className={`text-[1.5rem] ${lastRecord < totalRecord ? 'text-black' : 'text-gray-400'}`}
                        onClick={setNextPage}
                    >
                        <div className="text-[2rem]">
                            <FaCaretRight />
                        </div>
                    </GenericButton>
                </div>

                {isModalOpen && (
                    <EmplopyeeModal
                        setIsModalOpen={() => setIsModalOpen(false)}
                        handleFormData={() => handleGetData()}
                    />
                )}
            </div>
        </FormProvider>
    )
}

export default EmployeeDetails
