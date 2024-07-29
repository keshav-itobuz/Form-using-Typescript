import { useContext, useEffect, useState } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import { confirmAlert } from '../utils/confirmAlert'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretLeft } from 'react-icons/fa'
import GenericSelect from '../components/FormComponent/GenericSelect'
import { Profession } from '../enum/professionEnum'
import EmplopyeeModal from '../components/EmplopyeeModal'
import GenericButton from '../components/FormComponent/GenericButton'
import { FormProvider, useForm } from 'react-hook-form'
import NoData from '../components/NoData'
import { EmployeeContext } from '../Context/EmployeeContext'
import ContextInterface from '../interface/employeeContextInterface'

const EmployeeDetails = () => {
    const {
        employeeInfo,
        handleDeleteAll,
        getEmployeeInfo,
        totalRecord,
        currentPage,
        setCurrentPage,
        currentPageRecord,
        setCurrentPageRecord,
        profession,
        setProfession,
        searchedName,
        setSearchedName,
    } = useContext(EmployeeContext) as ContextInterface

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [debounceValue, setDebounceValue] = useState(searchedName)

    const pageStartIndex = currentPageRecord * currentPage + 1
    const pageLastIndex = currentPageRecord * currentPage + currentPageRecord
    const recordsIndex = [5, 10, 15, 20, 25]

    type SelectType = {
        profession?: Profession
        page?: number
    }

    const handleNewEntry = () => {
        setIsModalOpen(true)
    }

    const handlePagination = (pageRecord: number) => {
        setCurrentPage(0)
        setCurrentPageRecord(Number(pageRecord))
    }

    const setNextPage = () => {
        if (pageLastIndex < totalRecord) {
            setCurrentPage(currentPage + 1)
        }
    }

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const methods = useForm<SelectType>()

    useEffect(() => {
        getEmployeeInfo()
    }, [currentPage, currentPageRecord, profession, searchedName])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchedName(debounceValue)
            setCurrentPage(0)
        }, 1000)
        return () => clearTimeout(timeout)
    }, [debounceValue])

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
                                    className={`text-white px-2 sm:px-5 py-2 border-2 bg-red-700 hover:bg-red-800 text-[0.9rem] rounded-md ${employeeInfo.length ? 'visible' : 'hidden'}`}
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
                            onChange={(e) => setDebounceValue(e.target.value)}
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
                    <div className="hidden md:grid grid-cols-12 bg-white py-2 border rounded-t-2xl">
                        <span className="col-span-2 ms-3 ">Name</span>
                        <span className="col-span-4 ">Address</span>
                        <span className="col-span-3">Email</span>
                        <span className="col-span-2 ">Phone No</span>
                    </div>
                    <div className=" h-[68vh] overflow-scroll no-scrollbar] flex flex-col gap-1 md:gap-0">
                        {employeeInfo.length ? (
                            employeeInfo.map((data) => {
                                return (
                                    <EmployeeCard
                                        employeeDetail={data}
                                        key={data._id}
                                    />
                                )
                            })
                        ) : (
                            <div className="mt-[14vh] text-center">
                                <NoData />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mx-auto  max-w-[1200px] mt-10 gap-5">
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
                        Record {pageStartIndex}-
                        {pageLastIndex < totalRecord
                            ? pageLastIndex
                            : totalRecord}{' '}
                        of {totalRecord}
                    </p>

                    <GenericButton
                        type="submit"
                        className={`text-[1.5rem] ${pageLastIndex < totalRecord ? 'text-black' : 'text-gray-400'}`}
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
                    />
                )}
            </div>
        </FormProvider>
    )
}

export default EmployeeDetails
