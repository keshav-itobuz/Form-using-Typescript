import * as yup from 'yup'
import { Profession } from '../enum/professionEnum'

const employeeSchema = yup.object({
    name: yup
        .string()
        .required('required')
        .trim()
        .min(2, 'Minimum 2 characters required'),
    phone: yup.string().max(10, 'Phone number must be at most 10 characters'),
    building: yup.string().required('required'),
    profession: yup
        .string()
        .oneOf(Object.values(Profession), 'Invalid profession')
        .required('required'),
    city: yup.string().required('required'),
    state: yup.string().required('required'),
    pincode: yup
        .string()
        .required('required')
        .min(6, 'Invalid Pincode')
        .max(6, 'Invalid Pincode'),
    email: yup.string().email('Invalid email').required('required'),
})

export default employeeSchema
