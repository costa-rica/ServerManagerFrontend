import styles from "../styles/Register.module.css";
import stylesLogin from "../styles/Login.module.css";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setMachineNameRedux } from "../reducers/user";
import { useRouter } from "next/router";

export default function Home() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  // const [machineName, setMachineName] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(
      `process.env.NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}`
    );

    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/machineName`
        );
        const responseJson = await response.json();
        console.log(responseJson);
        dispatch(setMachineNameRedux(responseJson.machineName));
      } catch {
        console.error("Error fetching data:");
        dispatch(setMachineNameRedux("failed to get API response"));
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
            <h2>{user.machineName}</h2>
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
