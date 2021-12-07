import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCancel = () => {
      dispatch({
        type: "Order_Canceled",
        payload: {
          status: 'off'
        }
      });
      navigate("/");
      alert('Order canceled');
    };
    handleCancel();
  }, [dispatch, navigate]);

  return (
    <>
    </>
  )
    
};

export default Cancel;