"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const Login = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response?.data, user);
      toast.success("Login Successfull");
      // const { isAdmin } = response?.data;

      // if (isAdmin) {
      //   router.push("/admin");
      // } else {
      //   router.push("/profile");
      // }
      router.push("/");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error;
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user?.password.length > 0)
      setButtonDisable(false);
    else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div>
      <div
        className="bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('wallpaper.jpg')`,
        }}
      >
        <div className="h-screen flex justify-center items-center">
          <div className="backdrop-blur-lg mx-4 p-8 rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-full md:w-1/2 lg:w-1/3 ">
            <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
            <form>
              <div className="mb-4">
                <label className="block font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-white mb-2">
                  Password
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <a className="text-white hover:text-gray-800" href="#">
                  Forgot your password?
                </a>
              </div>
              <div className="mb-6">
                {loading ? (
                  <div className="flex gap-1 items-center bg-orange-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit">
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                    <span className=" text-white">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="bg-blue-300 hover:bg-[#98B2B0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                    type="button"
                    onClick={Login}
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
