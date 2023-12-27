import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Pk);
console.log(stripePromise)

const Payment = ()=>{
    return(
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28 ">  <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements></div>
    )
}

export default Payment