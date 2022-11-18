import { Link } from "react-router-dom";
function Notfound() {
    return ( 
        <div style={{textAlign:"center",marginTop:"20%"}}>
            <h1>404 Not Found</h1>
            <Link to="/">Back</Link>
        </div>
     );
}

export default Notfound;