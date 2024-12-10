import { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import PropTypes from 'prop-types';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    //console.log(event, orderId);

    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }


  }

  useEffect(() => {
    fetchAllOrders();
  }, [])


  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + " ,"}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <div className="a-buttons">
              <button
                onClick={() => statusHandler({ target: { value: "Food Processing" } }, order._id)}
                className={order.status === "Food Processing" ? "active" : ""}
              >
                Food Processing
              </button>
              <button
                onClick={() => statusHandler({ target: { value: "Out for delivery" } }, order._id)}
                className={order.status === "Out for delivery" ? "active" : ""}
              >
                Out for delivery
              </button>
              <button
                onClick={() => statusHandler({ target: { value: "Delivered" } }, order._id)}
                className={order.status === "Delivered" ? "active" : ""}
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

Orders.propTypes = {
  url: PropTypes.string.isRequired, // url phải là chuỗi và bắt buộc
};
export default Orders
