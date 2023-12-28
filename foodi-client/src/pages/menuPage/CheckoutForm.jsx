import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { FaPaypal } from 'react-icons/fa';
import useAuth from "../../hooks/useAuth"
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosSecure =  useAxiosSecure()
  const [cardError, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('');


useEffect(()=>{
  if(typeof price !== "number" || price <1  ){
    console.log("price is not a number or less than 1 ")
    return;
  }
  axiosSecure.post('/create-payment-intent',{price}).then(res=>{
    console.log(paymentIntent)
    console.log(res.data.clientSecret)
    setClientSecret(res.data.clientSecret)
  })


},[])


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // create a card elemnts
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      // setError(error)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError("success")
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name:user?.displayName || 'anonymous',
            email:user?.email || 'unknow'
          },
        },
      },
    );
  
    if(confirmError){
      console.log(paymentIntent)
    }
    console.log(paymentIntent)
    if(paymentIntent.status === "succeeded"){
      console.log(paymentIntent.id)
      setError(`your transactionid  is ${paymentIntent.id}`)
    }


  }
  return (
    <div className='flex flex-col sm:flex-row justify-start gap-8'>
      {/* left side */}
      <div className='md:w-1/2 w-full space-y-3'>

        <h4 className='text-lg font-semibold text-black'>Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length} </p>

      </div>
      {/* right side  */}
      <div className='md:w-1/3  space-y-3 card shrink-0 w-full max-w-sm shadow-2xl-white bg-base-100 px-4 py-8 '>  <h4 className='text-lg font-semibold text-white'>Process your Payment!</h4>
        <h5 className='font-medium'>credit/Debit Card</h5>
        {/* form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  // color: '#424770',
                  // color: '#FFFFFF',
                  '::placeholder': {
                    color: '#aab7c4',
                    // color: '#Ff0000',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 bg-primary w-full text-white'>
            Pay
          </button>
        </form>
        {
          cardError ? <p className='text-white'>{cardError}</p>: ""
        }
        {/* //  paypal  */}
        <div className='mt-5 text-center'>
          <hr />
          <button type='submit' className='btn btn-sm mt-5 bg-orange-500 text-white'>
            <FaPaypal/> Pay with PayPal
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm