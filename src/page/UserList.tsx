import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"

export default function UserList(){
    return <div>UserList
        <Link to="/users/create" className="btn btn-primary">Create User</Link>
        
    </div>
}