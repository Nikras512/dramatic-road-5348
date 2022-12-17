import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Auth/auth.action";


const Login = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const Auth = useSelector((store) => store.auth.isAuth);
  const adminAuth = useSelector((store) => store.auth.adminAuth);
  const dispatch = useDispatch()
  let navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("https://creepy-fawn-purse.cyclic.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       mobile,
      }),
    });
    const data = await response.json();
    if (data) {
      const cred= {"id":data.token}
      dispatch(login(cred));
    }else {
      alert("Please check Email or Password")
    }
    // console.log("data:", data.token);
  }

 

  useEffect(()=>{
    if(Auth&&adminAuth){
      navigate("/admin")
    }else if(Auth){
      navigate("/menu")
    }
  },[Auth,adminAuth])

  console.log(Auth);

  return (
    <>
       <div className="outerSection">
      <section className="loginSection">  
        <div className="loginmainbox">
          <h1 id="loginTitle">LOG IN TO KFC</h1>
          <div className="loginFormdiv">
            <form onSubmit={loginUser} id="loginForm">
              <div className="input-data">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <div className="underline"></div> */}
                <label>Email</label>
              </div>
              <div id="loginerrorBox"></div>
              <div className="input-data">
                <input
                  type="mobile"
                  name="mobile"
                  id="password"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
                {/* <div className="underline"></div> */}
                <label>Mobile</label>
              </div>
              <div id="loginerrorBox"></div>
              <div className="loginterms">
                <p className="logintermtext">
                  By logging into the application or proceeding as a guest, you
                  agree to our{" "}
                  <span className="logintermlink">Privacy Policy</span> and{" "}
                  <span className="logintermlink">Terms of Use</span>.
                </p>
              </div>
              <div className="loginBtndiv">
                <input type="submit" value="Log In" />
              </div>
              <div className="redirecttosignup">
                <p className="redirectsignuptext">
                  Don't have an account?
                  <Link to={"/signup"}>
                    <span className="redirectsignuplink">Join Now</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Login;