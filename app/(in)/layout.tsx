import Navbar from "@/components/Navbar";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";



async function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const isUserAuthenticated = await isAuthenticated()

    if(!isUserAuthenticated) redirect("/sign-in")

  return (
    <div>
        {children}
        <Navbar/>
    </div>
  )
}

export default InLayout;