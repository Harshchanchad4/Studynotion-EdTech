import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../operations/apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API ,COURSE_ENROLL_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;




export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
      
        //initiate the order
        console.log("i am in buy course function");
        const orderResponse = await apiConnector("POST", COURSE_ENROLL_API,   {courses}, {Authorization: `Bearer ${token}`, })
        console.log("PRINTING orderResponse", orderResponse);
                                
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        dispatch(resetCart());

        toast.success("Student Enrolled Successfully");

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}


