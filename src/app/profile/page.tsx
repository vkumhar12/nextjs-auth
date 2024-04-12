"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  // const [data, setData] = useState("");
  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      router.push(`/profile/${res.data.data._id}`);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center text-white">
      {/* <Link href={`profile/${data}`} className="text-white">
        {data}
      </Link> */}
      <button
        onClick={getUserDetails}
        className="px-3 py-2 rounded-md bg-green-400 text-white"
      >
        Get user Data
      </button>
      <button
        onClick={logout}
        className="px-3 py-2 rounded-md bg-red-400 text-white"
      >
        Logout
      </button>
    </div>
  );
}
