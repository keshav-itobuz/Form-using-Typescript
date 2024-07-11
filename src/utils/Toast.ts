import { toast } from "react-toastify";
const notify = (msg: string) =>
    toast.error(msg, {
        autoClose: 3000,
        pauseOnFocusLoss: false,
        hideProgressBar: true
    });
export { notify };