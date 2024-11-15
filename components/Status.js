import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

export default function Status() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [machineName, setMachineName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(
      `process.env.NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}`
    );

    document.title = "Server Manager";
  }, []); // The empty array ensures this runs only on mount

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.divMainSub}>
          <div className={styles.divTitles}>
            <h1 className={styles.title}>The 404 Server Manager</h1>
            <h2>{user.machineName}</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
