export default function UserDetails({ params }: any) {
  //   const router = useRouter();
  console.log(params._id, "ID");
  return <div className="text-white">{params.userprofile}</div>;
}
