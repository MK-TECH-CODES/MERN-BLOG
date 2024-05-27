import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInstart,
  signInsuccess,
  signInfailure,
} from "../redux/user/userslice";
import OAuth from "../components/OAuth";

export default function signin() {
  const [formdata, setformData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlechange = (e) => {
    setformData({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      return dispatch(signInfailure("Please fill all the fields."));
    }

    try {
      dispatch(signInstart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInfailure(data.message));
      }

      if (res.ok) {
        dispatch(signInsuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInfailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mk-Tech's{" "}
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or With Google
          </p>
        </div>

        {/* Right*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="abc@company.com"
                id="email"
                onChange={handlechange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlechange}
              />
            </div>

            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading ...</span>{" "}
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an acount?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
