import * as yup from 'yup'
import { Profession } from '../enum/professionEnum'

const employeeSchema = yup.object({
    _id: yup.string(),
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
        .number()
        .required('required')
        .test(
            'len',
            'Must be exactly 6 characters',
            (val) => val.toString().length === 6
        ),
    email: yup.string().email('Invalid email').required('required'),
})

export default employeeSchema
