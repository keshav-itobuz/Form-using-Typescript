import React from 'react'
import { FormData } from './formDataInterface'

export interface ContextInterface {
    employeeInfo: FormData[]
    setEmployeeInfo: React.Dispatch<React.SetStateAction<FormData[]>>
    getEmployeeInfo: () => void
    totalRecord: number
    setTotalRecord: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPageRecord: number
    setCurrentPageRecord: React.Dispatch<React.SetStateAction<number>>
    profession: string
    setProfession: React.Dispatch<React.SetStateAction<string>>
    searchedName: string
    setSearchedName: React.Dispatch<React.SetStateAction<string>>
    handleDeleteAll: () => void
}

export default ContextInterface
