import { ChangeEvent, useEffect, useState } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import { FormData } from '../interface/interface'
import { confirmAlert } from '../utils/confirmAlert'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import axiosInstance from '../utils/axiosInstance'
import GenericSelect from '../components/FormComponent/GenericSelect'
import { Profession } from '../enum/enum'
import EmplopyeeModal from '../components/EmplopyeeModal'
import GenericButton from '../components/FormComponent/GenericButton'
import { FormProvider, useForm } from 'react-hook-form'

const EmployeeDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [employeeInfo, setEmployeeInfo] = useState<Array<FormData>>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentPageRecord, setCurrentPageRecord] = useState<number>(10)
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
            const { data } = await axiosInstance.get(
                `get-employee?profession=${profession}&page=${page}&limit=${limit}&searchedName=${searchedName}`
            )
            if (data) {
                setEmployeeInfo(data.employeeData)
                setTotalRecord(data.total)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetData = () => {
        getData(profession, currentPage, currentPageRecord, searchedName)
    }

    const handleDeleteAll = async () => {
        try {
            await axiosInstance.delete(`delete-employee`)
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
        setCurrentPageRecord(Number(pageRecord))
        setCurrentPage(0)
    }

    const setNextPage = () => {
        if (currentPageRecord < totalRecord) {
            setCurrentPage(currentPage + 1)
            setCurrentPageRecord((currentPage + 1) * 10 + 10)
        }
    }

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            setCurrentPageRecord((currentPage + 1) * 10 - 10)
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchedName(e.target.value)
        getData(profession, currentPage, currentPageRecord, e.target.value)
    }

    const methods = useForm<SelectType>()

    useEffect(() => {
        getData(profession, currentPage, 10, searchedName)
    }, [currentPage])

    return (
        <FormProvider {...methods}>
            <div className="bg-[#0597ff22] min-h-[100vh] pb-10 px-2">
                <div className="flex max-w-[1200px] justify-between mx-auto py-7">
                    <div className="flex gap-1 flex-col md:flex-row">
                        <div className="flex gap-1">
                            <form
                                onChange={methods.handleSubmit((data) => {
                                    setProfession(data.profession!)
                                    setCurrentPage(0)
                                    getData(
                                        data.profession!,
                                        0,
                                        currentPageRecord,
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
                                            (item) =>
                                                item !== Profession.PROFESSION
                                        )
                                        .map((value: string | number) => {
                                            return (
                                                <option
                                                    value={value}
                                                    key={value}
                                                >
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
                <div className="max-w-[1200px] mx-auto">
                    <div className=" grid grid-cols-12 bg-white py-2 border rounded-t-2xl">
                        <span className="col-span-2 ms-3 ">Name</span>
                        <span className="col-span-5 ">Address</span>
                        <span className="col-span-2">Email</span>
                        <span className="col-span-2 ">Phone No</span>
                    </div>
                    <div className=" h-[72vh] overflow-scroll no-scrollbar]">
                        {employeeInfo.length ? (
                            employeeInfo.map((data) => {
                                return (
                                    <EmployeeCard
                                        employeeInfo={data}
                                        handleGetData={() => handleGetData()}
                                        key={data._id}
                                    />
                                )
                            })
                        ) : (
                            <div className="mt-[30vh] text-center">
                                No data to show
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mx-auto  max-w-[1200px] mt-6 gap-5">
                    <GenericButton
                        type="submit"
                        className={`text-[1.5rem] ${currentPage > 0 ? 'text-black' : 'text-gray-400'}`}
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
                        Record {currentPage * 10 + 1}-
                        {currentPageRecord < totalRecord
                            ? currentPageRecord
                            : totalRecord}{' '}
                        of {totalRecord}
                    </p>

                    <GenericButton
                        type="submit"
                        className={`text-[1.5rem] ${currentPageRecord < totalRecord ? 'text-black' : 'text-gray-400'}`}
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
