import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../../redux/actions/cartActions";

const PaymentSuccessPage = () => {
    const ranRef = useRef(false); // prevent double run in React 18 dev
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");
    const [counter, setCounter] = useState(5);
    const [countdownActive, setCountdownActive] = useState(false);

    // Create the order once (after Stripe success)
    useEffect(() => {
        if (ranRef.current) return;
        ranRef.current = true;

        const completeOrder = async () => {
            const orderData = localStorage.getItem("stripeOrderData");
            if (!orderData) {
                setErrorMessage("We couldn't find your order details. Please contact support.");
                return;
            }

            try {
                const parsedOrder = JSON.parse(orderData);
                const res = await axios.post("/api/orders/createPaidOrder", parsedOrder);

                if (res.status === 200) {
                    console.log("Order saved successfully");
                    localStorage.removeItem("stripeOrderData");
                    dispatch(emptyCart());
                    setCountdownActive(true); // start 10s countdown
                } else {
                    setErrorMessage("⚠️ Payment succeeded, but we couldn't create your order. Please contact support.");
                }
            } catch (err) {
                console.error("Failed to create order:", err);
                setErrorMessage("⚠️ An error occurred while creating your order. Please try again or contact support.");
            }
        };

        completeOrder();
    }, [dispatch]);

    // Handle the redirect countdown
    useEffect(() => {
        if (!countdownActive) return;

        const id = setInterval(() => {
            setCounter((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    navigate("/user/my-orders");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [countdownActive, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-centerbg-light mt-5">
            <div className="text-center py-5 px-4 mt-5 bg-white rounded shadow" style={{ minWidth: 320 }}>
                {errorMessage ? (
                    <div className="alert alert-danger m-0">{errorMessage}</div>
                ) : (
                    <>
                        <h2 className="text-success mb-2">✅ Payment Successful!</h2>
                        <p className="text-muted mb-1">Your order is being processed.</p>
                        {countdownActive ? (
                            <p className="text-muted m-0">
                                Redirecting to your orders page in <strong>{counter}</strong> seconds…
                            </p>
                        ) : (
                            <p className="text-muted m-0">Finalising your order…</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
