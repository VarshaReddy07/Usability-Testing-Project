import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Orders = () => {
  const userInfo = useSelector((state) => state.store.userInfo);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the server
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders");
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  

  const styles = {
    ordersContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Set minimum height to 100% of the viewport height
      alignItems: 'center', // Center content horizontally
      paddingTop: '20px', // Add padding to the top for spacing
    },
    cancelButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      border: '1px solid red',
      color: 'red',
      backgroundColor: 'transparent',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
  };

  return (
    <div style={styles.ordersContainer}>
      <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You currently have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order ID: {order.id}, Amount: ${order.amount / 100}, Date: {order.date}
              {userInfo && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  style={styles.cancelButton}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'red';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'red';
                  }}
                >
                  {' Cancel '}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;