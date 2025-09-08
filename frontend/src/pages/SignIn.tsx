import React from "react";
import InputBox from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SignIn() { 

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const Navigate = useNavigate();

  async function signIn () {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password
    })
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    Navigate("/dashboard");
  }


  return (
    <div className="h-screen w-screen bg-neutral-800 text-white flex justify-center items-center">
      <div className="bg-slate-700 w-72 h-64 rounded-xl p-9">
        <div>
          <InputBox
            reference={userNameRef}
            placeholder="Username"
            type="text"
          />
        </div>
        <div className="mt-8">
          <InputBox
            reference={passwordRef}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mt-6">
          <Button
            onClick={signIn}
            variant="primary"
            text="SignIn"
            size="md"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
