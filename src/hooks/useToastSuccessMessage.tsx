import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useToastSuccessMessage() {
  const toastMessage = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return toastMessage;
}
