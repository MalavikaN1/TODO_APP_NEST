import Notfound from "../notfound/notfound";

export const ProtectedRoute = ({children}) => {
  const isAuthenticated=JSON.parse(localStorage.getItem("isAuthenticated"))
    if (!isAuthenticated) {
      return(
        <Notfound/>
      )
    }
    return children;
  };