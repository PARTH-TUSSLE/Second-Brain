import React, { useRef } from 'react';
import InputBox from '../components/ui/InputBox';
import Button from '../components/ui/Button';
import axios from 'axios';
import { BACKEND_URL } from '../config.tsx';
import { useNavigate } from 'react-router-dom';


function SignUp() {

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const Navigate = useNavigate();

  async function signUp () {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password
    })
    alert("You have successfully signed up !"); 
    Navigate("/signin");
  }

  return (
    <div className="h-screen w-screen bg-neutral-800 text-white flex justify-center items-center">
      <div className="bg-slate-700 w-72 h-64 rounded-xl p-9">
        <div>
          <InputBox reference={userNameRef} placeholder="Username" type='text'/>
        </div>
        <div className="mt-8">
          <InputBox
            reference={passwordRef}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mt-8 ml-13">
          <Button onClick={signUp} variant="primary" text="SignUp" size="md" />
        </div>
      </div>
    </div>
  );
}

export default SignUp
