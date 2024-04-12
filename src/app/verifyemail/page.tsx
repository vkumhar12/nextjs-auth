/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerify(true);
      setError(false);
      console.log(res); // Reset error state when verification succeeds
    } catch (error: any) {
      setError(true);
      console.log(error.response.data, "Error msg");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl font-semibold">Verify Email</h1>
      <p className={`bg-yellow-200  text-black py-4 px-6 rounded-md`}>
        {token ? `${token}` : "No token available"}
      </p>
      {verify ? (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-white bg-green-500 p-2 rounded">User Verified</h2>
          <Link href="/login" className="hover:underline text-blue-500">
            Login
          </Link>
        </div>
      ) : (
        error && (
          <div>
            <h2 className="px-3 py-2 bg-red-500 text-white rounded-md">
              ERROR
            </h2>
          </div>
        )
      )}
    </div>
  );
}

// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function VerifyEmailPage() {
//   const [token, setToken] = useState("");
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState(false);

//   const verifyUserEmail = async () => {
//     try {
//       await axios.post("/api/users/verifyemail", { token });
//       setVerified(true);
//     } catch (error: any) {
//       setError(true);
//       console.log(error.reponse.data);
//     }
//   };

//   useEffect(() => {
//     const urlToken = window.location.search.split("=")[1];
//     setToken(urlToken || "");
//   }, []);

//   useEffect(() => {
//     if (token.length > 0) {
//       verifyUserEmail();
//     }
//   }, [token]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-4xl">Verify Email</h1>
//       <h2 className="p-2 bg-orange-500 text-black">
//         {token ? `${token}` : "no token"}
//       </h2>

//       {verified && (
//         <div>
//           <h2 className="text-2xl">Email Verified</h2>
//           <Link href="/login">Login</Link>
//         </div>
//       )}
//       {error && (
//         <div>
//           <h2 className="text-2xl bg-red-500 text-black">Error</h2>
//         </div>
//       )}
//     </div>
//   );
// }
