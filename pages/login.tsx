import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  return (
    <div>
      <form className="p-2 border-2 ">
        <label htmlFor="">username</label>
        <input type="text" name="username" />
        <label htmlFor="">password</label>
        <input type="text" name="password" />
      </form>
    </div>
  );
};

export default Login;
