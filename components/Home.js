import styles from "../styles/Register.module.css";
import stylesLogin from "../styles/Login.module.css";
import { useState, useEffect } from "react";

// import { useDispatch } from "react-redux";
// import { loginUser } from "../reducers/user";
import { useRouter } from "next/router";

export default function Register() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [machineName, setMachineName] = useState("");
  //   const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(
      `process.env.NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}`
    );

    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`
        );
        const responseJson = await response.json();
        console.log(responseJson);
        setMachineName(responseJson.machineName);
      } catch {
        console.error("Error fetching data:");
        setMachineName("failed to get API response");
      }
    })();

    document.title = "Server Manager";
  }, []); // The empty array ensures this runs only on mount

  const handleClickToLogin = () => router.push("/login");
  const handleClickToReg = () => router.push("/register");

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.divMainSub}>
          <div className={styles.divTitles}>
            <h1 className={styles.title}>The 404 Server Manager</h1>
            <h2>{machineName}</h2>
          </div>

          <div className={styles.divInputsAndBtns}>
            <div className={stylesLogin.divBtnLogin}>
              <button
                className={stylesLogin.btnLogin}
                onClick={() => handleClickToLogin()}
              >
                Login
              </button>
            </div>
            <div className={styles.divBtnRegister}>
              <button
                className={styles.btnRegister}
                onClick={() => handleClickToReg()}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
