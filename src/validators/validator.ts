import { notify } from '../utils/Toast'
import { FormData } from '../interface/interface'

export function employeeDetailsValidator(formData: FormData) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (
        !formData.name ||
        !formData.email ||
        formData.profession === 'profession'
    ) {
        notify('Fill all the fields')
        return false
    }
    if (!formData.email.match(emailRegex)) {
        notify('Invalid email')
        return false
    }
    return true
}
export function addressValidator(formData: FormData) {
    if (
        !formData.building ||
        !formData.state ||
        !formData.city ||
        !formData.pincode
    ) {
        notify('Fill all the fields')
        return false
    }
    return true
}
