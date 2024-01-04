import "./admin.scss";

import { useSelector } from "react-redux";

const Admin = () => {
  const { authState } = useSelector((state) => state);

  return (
    <div className="content">
      <div className="container">
        <div className="divadmin">
          <h1 className="title">Hi! { authState.displayName }</h1>
        </div>
      </div>
    </div>
  )
}

export default Admin
