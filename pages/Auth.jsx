import { IonButton, IonInput } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../database/Database";

function Auth() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  return (
    <div>
      <h1>Login Page</h1>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPasword(e.target.value)}
      />
      <button onClick={() => login(email, password, history)}>Login</button>
      <button onClick={() => signUp(email, password, history)}>SignUp</button>
    </div>
  );
}

async function login(email, password, history) {
  try {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    alert("logged in");
    history.push("/artiesten");
  } catch (error) {
    alert(error.message);
  }
}

const signUp = async (email, password, history) => {
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    alert("logged in");
    history.push("/home");
  } catch (error) {
    alert(error.message);
  }
};

export default Auth;
