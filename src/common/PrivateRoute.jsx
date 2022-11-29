import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const PrivateRoute = (props) => {
  const {user} = useUserContext();
  const { allowedRoles } = props;

  if(!user){
    return <Navigate to="/login" replace/>
  }

  if(allowedRoles && !allowedRoles.includes(user.role)){
    return <Navigate to="/not-allowed" replace/>
  }

  return props.children;
}

export default PrivateRoute;