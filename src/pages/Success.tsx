import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSuccess = () => {
      dispatch({
        type: "Ongoing",
        payload: {
          status: 'on'
        }
      });
      navigate("/orders");
      alert('Payment Successful');
    };
    handleSuccess();
  }, [dispatch, navigate]);

  return (
    <>
    </>
  )
    
};

export default Success;