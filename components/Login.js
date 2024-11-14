import styles from "../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/user";
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [machineName, setMachineName] = useState("");
  const dispatch = useDispatch();
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

  const handleClickLogin = async () => {
    console.log("- handleClickReg 👀");
    const bodyObj = { email, password };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      }
    );
    const resJson = await response.json();
    console.log("received response");
    console.log(resJson);
    dispatch(loginUser(resJson));

    console.log("🚨 after the fetch ");
  };
  const handleClickToReg = () => router.push("/Register"); //eg.history.push('/login');
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.divMainSub}>
          <div className={styles.divTitles}>
            <h1 className={styles.title}>The 404 Server Manager</h1>
            <h2>{machineName}</h2>
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
            <div className={styles.divBtnLogin}>
              <button
                className={styles.btnLogin}
                onClick={() => handleClickLogin()}
              >
                Login
              </button>
            </div>
            <div className={styles.divBtnNotReg}>
              <button
                className={styles.btnNotReg}
                onClick={() => {
                  console.log("go to registration page");
                  handleClickToReg();
                }}
              >
                Not registered ?
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
