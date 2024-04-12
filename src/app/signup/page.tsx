"use client";

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DiGithubBadge } from "react-icons/di";
import { FcGoogle } from "react-icons/fc";
import { IoPersonAddOutline } from "react-icons/io5";

// const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: signup,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

export default function SignUpPage() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up Successful", response?.data);
      toast.success("Sign up Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up Failed");
      toast.error;
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user?.password.length > 0 &&
      user?.username.length > 0
    )
      setButtonDisable(false);
    else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div className="min-h-screen w-full">
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <FcGoogle className="text-xl" />
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>

                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                      <DiGithubBadge className="text-3xl" />
                    </div>
                    <span className="ml-4">Sign Up with GitHub</span>
                  </button>
                </div>

                <div className=" border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  {buttonDisable ? (
                    <button className="mt-5 tracking-wide font-semibold bg-indigo-300 text-gray-100 w-full cursor-not-allowed py-4 rounded-lg focus:shadow-outline flex items-center justify-center focus:outline-none">
                      <IoPersonAddOutline className="text-2xl font-medium" />
                      <span className="ml-3">Resgiter</span>
                    </button>
                  ) : (
                    <button
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full cursor-pointer py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      onClick={signUp}
                    >
                      <IoPersonAddOutline className="text-2xl font-medium" />
                      <span className="ml-3">Resgiter</span>
                    </button>
                  )}

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    {` I agree to abide by templatana's`}
                    <Link
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </Link>
                    and its
                    <Link
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex justify-center items-center">
            <img
              src="background.svg"
              alt=""
              className="object contain w-[40rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
