import { createContext, useState } from 'react'
import { FormData } from '../interface/formDataInterface'
import axiosInstance from '../utils/axiosInstance'
import ContextInterface from '../interface/employeeContextInterface'
import { Profession } from '../enum/professionEnum'

const EmployeeContext = createContext<ContextInterface | undefined>(undefined)

const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
    const [employeeInfo, setEmployeeInfo] = useState<Array<FormData>>([])
    const [totalRecord, setTotalRecord] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentPageRecord, setCurrentPageRecord] = useState<number>(5)
    const [profession, setProfession] = useState<string>(Profession.ALL)
    const [searchedName, setSearchedName] = useState<string>('')

    const getEmployeeInfo = async () => {
        try {
            const { data } = await axiosInstance.get(
                `get-employee?profession=${profession}&page=${currentPage}&limit=${currentPageRecord}&searchedName=${searchedName}`
            )
            if (data) {
                setEmployeeInfo(data.employeeData)
                setTotalRecord(data.total)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAll = async () => {
        try {
            await axiosInstance.delete(`delete-employee`)
            setEmployeeInfo([])
            setTotalRecord(0)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <EmployeeContext.Provider
            value={{
                employeeInfo,
                setEmployeeInfo,
                getEmployeeInfo,
                handleDeleteAll,
                totalRecord,
                setTotalRecord,
                currentPage,
                setCurrentPage,
                currentPageRecord,
                setCurrentPageRecord,
                searchedName,
                setSearchedName,
                profession,
                setProfession,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    )
}

export { EmployeeProvider, EmployeeContext }
