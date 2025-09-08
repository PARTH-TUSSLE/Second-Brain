import React from "react";
import InputBox from "../components/ui/InputBox";
import Button from "../components/ui/Button";

function SignIn() {
  return (
    <div className="h-screen w-screen bg-neutral-800 text-white flex justify-center items-center">
      <div className="bg-slate-700 w-72 h-64 rounded-xl p-9">
        <div>
          <InputBox placeholder="Username" />
        </div>
        <div className="mt-8">
          <InputBox placeholder="Password" type="password" />
        </div>
        <div className="mt-6">
          <Button variant="primary" text="SignIn" size="md" fullWidth={true} loading={false} />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
