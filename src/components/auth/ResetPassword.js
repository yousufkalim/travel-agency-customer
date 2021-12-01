import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../auth";
import API from "../../services/api";
function ResetPassword(props) {
  const match = props.match;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(match.params.token);
  }, []);

  const onSubmitLoginForm = (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return setError("Password and Confirm Password is required!");
    } else if (password !== password2) {
      return setError("Conform password do not match");
    } else {
      setLoading(true);

      API.resetPassword(token, { password })
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          Cookies.set("AUTH-TOKEN", token, { expires: 30 });
          auth.login(() => props.history.push("/dashboard"));
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          setError(response.data.error);
          setLoading(false);
        });
    }
  };
  return (
    <section id="hero" className="login">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8">
            <div id="login">
              <div className="text-center">
                <img
                  src={`${window.location.origin}/img/logo_sticky.png`}
                  width="160"
                  height="34"
                />
              </div>
              <hr />
              {error && (
                <div className={`alert alert-danger text-center`}>{error}</div>
              )}
              <form noValidate onSubmit={onSubmitLoginForm}>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className=" form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm password</label>
                  <input
                    type="password"
                    className=" form-control"
                    placeholder="Enter confirm password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
                <button className="btn_full" type="submit" disabled={loading}>
                  Update Password {loading && <i className="icon-spinner"></i>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
