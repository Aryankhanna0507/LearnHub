import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { 
  useCreateCheckoutSessionMutation,
  useVerifyPaymentMutation
} from '@/feature/api/purchaseApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
const BuyCourseButton = ({courseId}) => {
  const navigate = useNavigate();
  const [
    createCheckoutSession,
    {isLoading,isError,error}
  ] = useCreateCheckoutSessionMutation();
  const [verifyPayment] =
  useVerifyPaymentMutation();
  const purchaseCourseHandler = async()=>{
    try {
      const data =
      await createCheckoutSession(courseId).unwrap();
      const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:data.order.amount,
        currency:"INR",
        name:"LMS",
        order_id:data.order.id,
        handler: async function(response){
          try {
            const res =
            await verifyPayment(response).unwrap();
           toast.success(res.message || "Course purchased successfully");
           navigate(`/course-progress/${courseId}`);
          } catch(error){
            toast.error("Payment verification failed" );
          }
        }
      };
      const rzp=new window.Razorpay(options);
      rzp.open();
    } catch(error){
      toast.error(error?.data?.message || "Failed to create payment");
    }
  }
  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
    {
      isLoading?
      <>
      <Loader2 className="h-4 w-4 animate-spin"/>
      Please wait
      </>:"Purchase course"
    }
    </Button>
  )
}


export default BuyCourseButton;