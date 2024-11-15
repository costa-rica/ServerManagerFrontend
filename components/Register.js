import styles from "../styles/Register.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(
      `process.env.NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}`
    );

    document.title = "Server Manager";
  }, []); // The empty array ensures this runs only on mount

  const handleClickReg = async () => {
    console.log("- handleClickReg 👀");
    const bodyObj = { email, password };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      }
    );
    const resJson = await response.json();
    console.log("received response: ", response.status);
    if (response.status == 200) {
      console.log(resJson);
      dispatch(loginUser(resJson));
      router.push("/status");
    } else {
      window.alert(
        resJson?.message ? resJson.message : "There was a server error"
      );
    }

    console.log("🚨 after the fetch ");
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.divMainSub}>
          <div className={styles.divTitles}>
            <h1 className={styles.title}>The 404 Server Manager</h1>
            <h2>{user.machineName}</h2>
          </div>

          <div className={styles.divInputsAndBtns}>
            <div>
              <input
                className={styles.inputEmail}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="email"
              />
            </div>

            <div className={styles.divInput}>
              <input
                className={styles.inputEmail}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="password"
                type="password"
              />
            </div>
            <div className={styles.divBtnRegister}>
              <button
                className={styles.btnRegister}
                onClick={() => handleClickReg()}
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
