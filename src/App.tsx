import { EmployeeProvider } from './Context/EmployeeContext'
import EmployeeDetails from './Pages/EmployeeDetails'

function App() {
    return (
        <EmployeeProvider>
            <EmployeeDetails />
        </EmployeeProvider>
    )
}

export default App
