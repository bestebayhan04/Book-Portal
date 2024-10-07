import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Router/api";
import "../comp_css/Cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    let cartId = localStorage.getItem("cartid");
    let userId = localStorage.getItem("userid");

    // Debug: Log cartId to ensure it's being retrieved correctly
    console.log("Cart ID:", cartId);

    const apiCallOrderPlaced = () => {
        api
            .post(`/ecom/orders/placed/${userId}`)
            .then((response) => {
                alert("Order Placed Successfully.....");
                navigate("/user/order-details");
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    const orderPlaced = () => {
        apiCallOrderPlaced();
    };

    const fetchCartData = () => {
        if (!cartId) return;

        console.log("Fetching cart data..."); // Debugging info
        api
            .get(`/ecom/cart/products/${cartId}`)
            .then((response) => {
                console.log("Cart Data:", response.data); // Debugging info
                setCartData(response.data);
                setTotalAmount(response.data.totalAmount);
            })
            .catch((error) => {
                console.error("Error fetching cart data from the API:", error);
                if (error.response) {
                    console.error("Error Response Data:", error.response.data);
                } else {
                    console.error("Error Message:", error.message);
                }
            });
    };

    useEffect(() => {
        document.title = "Ecommerse | Cart";
        fetchCartData();
    }, [cartId]); // Only depend on cartId here to prevent unnecessary updates

    const emptyCart = () => {
        api
            .delete(`/ecom/cart/empty-Cart/${cartId}`)
            .then(() => {
                setCartData({ ...cartData, cartItems: [] });
                setTotalAmount(0);
                alert("All cart items removed");
            })
            .catch((error) => {
                alert("Empty.");
            });
    };

    const removeProductfromCart = (productid) => {
        api
            .delete(`/ecom/cart/remove-product/${cartId}/${productid}`)
            .then(() => {
                const updatedCartItems = cartData.cartItems.filter(
                    (item) => item.product.productId !== productid
                );

                if (updatedCartItems.length === 0) {
                    setCartData({ ...cartData, cartItems: [] });
                    setTotalAmount(0);
                } else {
                    setCartData({ ...cartData, cartItems: updatedCartItems });
                    setTotalAmount(
                        updatedCartItems.reduce(
                            (sum, item) => sum + item.product.price * item.quantity,
                            0
                        )
                    );
                }

                alert("Product removed from cart");
            })
            .catch((error) => {
                alert("Product removed from cart");

            });
    };

    const increaseCount = (productid) => {
        api
            .put(`/ecom/cart/increase-productQty/${cartId}/${productid}`)
            .then((response) => {
                setTotalAmount(response.data.totalAmount);
                fetchCartData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const decreaseCount = (productid) => {
        api
            .put(`/ecom/cart/decrease-productQty/${cartId}/${productid}`)
            .then((response) => {
                setTotalAmount(response.data.totalAmount);
                fetchCartData();
            })
            .catch((error) => {
                console.log(error);
                alert("Product cannot be further decreased....");
            });
    };

    return (
        <div className="cart-page">
            {cartData.cartItems && cartData.cartItems.length > 0 ? (
                <div className="cart-list">
                    {cartData.cartItems.map((item, index) => (
                        <div className="cart-card" key={item.cartItemId}>
                            <div className="cartproduct-image1">
                                <img src={item.product.imageUrl} alt={item.product.name} />
                            </div>
                            <div className="cartproduct-info">
                                <h2>{item.product.name}</h2>
                                <p>Category: {item.product.category}</p>
                                <p>Description: {item.product.description}</p>
                                <h2 className="cartproduct-price">
                                    Price: $ {item.product.price}
                                </h2>

                                <div>
                                    <button
                                        onClick={() => {
                                            removeProductfromCart(item.product.productId);
                                            if (cartData.cartItems.length === 1) {
                                                setCartData({ ...cartData, cartItems: [] });
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-cart-message">
                    <h1>
                        Your cart is empty. <Link to="/">Shop Now</Link>
                    </h1>
                </div>
            )}

            <div className="cart-details">
                <div className="counter-box">
                    <div>
                        <button
                            onClick={() => {
                                emptyCart(cartId);
                                setCartData({ ...cartData, cartItems: [] });
                            }}
                            style={{ backgroundColor: "#987861" }}
                        >
                            Empty Cart
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                navigate("/user/order-details");
                            }}
                        >
                            Order Page
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Go back to main page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Cart;
