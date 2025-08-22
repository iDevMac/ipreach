import AuthForm from "@/components/AuthForm";
// import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
// import { redirect } from "next/navigation";

const Page = async () => {
  // const isUserAuthenticated = await isAuthenticated();
  // if (isUserAuthenticated) redirect("/");

  return <AuthForm type="sign-in" />;
};

export default Page;
