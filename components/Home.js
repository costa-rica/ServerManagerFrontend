import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
// import { useEffect } from 'react';
// require("dotenv").config();

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [machineName, setMachineName] = useState("");
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

    document.title = "404 for ";
  }, []); // The empty array ensures this runs only on mount
  const handleClickReg = () => {
    console.log("- handleClickReg 👀");
  };

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

export default Home;
