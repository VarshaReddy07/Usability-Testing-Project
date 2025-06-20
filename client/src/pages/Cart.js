import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetCart } from '../redux/storeSlice';
import { PayPalButton } from 'react-paypal-button-v2'; // Import PayPalButton

const Cart = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.store.productData);
  const userInfo = useSelector((state) => state.store.userInfo);
  const [totalAmt, setTotalAmt] = useState('');
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error('Please sign in to check out');
    }
  };

  const paymentSuccess = async () => {
    toast.success('Payment successful. Redirecting...');
  
    try {
      // Make a request to your server to store the order details
      const response = await axios.post("http://localhost:8000/storeOrder", {
        // Include the necessary order details
        amount: totalAmt,
        date: new Date().toLocaleDateString(),
      });
  
      if (response.data.success) {
        // Redirect to the /orders page
        setTimeout(() => {
          window.location.href = '/orders';
          dispatch(resetCart());
        }, 3000);
      } else {
        toast.error('Failed to store order details. Please try again.');
      }
    } catch (error) {
      console.error('Error storing order details:', error);
      toast.error('An error occurred during payment. Please try again later.');
    }
  };
  

  const paymentError = () => {
    toast.error('Payment failed. Please try again.');
  };

  const paymentCancel = () => {
    toast.warn('Payment cancelled.');
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      <div className="max-w-screen-xl mx-auto py-20 flex">
        <CartItem />
        <div className="w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">cart totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{' '}
              <span className="font-titleFont font-bold text-lg">
                $ {totalAmt}
              </span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping{' '}
              <span className="font-titleFont font-bold text-lg">Free</span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total <span className="text-xl font-bold">$ {totalAmt}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="text-base bg-black text-white w-full py-3 my-6 hover:bg-gray-800 duration-300"
          >
            proceed to checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <PayPalButton
                amount={totalAmt}
                onSuccess={(details, data) => {
                  console.log(
                    'Transaction completed by ' + details.payer.name.given_name
                  );
                  paymentSuccess();
                }}
                onError={(err) => {
                  console.error('Error during PayPal payment:', err);
                  paymentError();
                }}
                onCancel={() => {
                  paymentCancel();
                }}
                options={{
                  clientId: 'ASglav0Ub9ppSNxMyb4BkDnwLcEg9LOTpiYoIDDRuq-P-zaR-CjYlaM2vLD-4YsjTdANRkS074rAvU9P', // Replace with your PayPal Client ID
                }}
              />
            </div>
          )}
        </div>
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Cart;