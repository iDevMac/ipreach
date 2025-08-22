"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { isAuthenticated, signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        //Verify Signup pin
        // if(college == "") toast.error("College can't be empty");

        setIsLoading(true)
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        
        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          setIsLoading(false)
          return;
        }

        setIsLoading(false)
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        setIsLoading(true)
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        setIsLoading(false)
        toast.success("Signed in successfully. Redirecting please wait...");
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  // useEffect(() => {
  //   const handleAuthCheck = async () => {
  //     const isUserAuthenticated = await isAuthenticated()
      
  //     if(isUserAuthenticated) toast.success("You are still logged in"); redirect("/");
  //   }

  //   handleAuthCheck();
  // }, [isLoading])

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px] bg-[var(--gradient-bottom-right)] pb-10">
      <div className="flex flex-col gap-6 card py-5 px-10">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Image src="/logo/logoipsum.png" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">iPreach</h2>
        </div>

        {/* <h3>Please Sign In Below</h3> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
                cStyle=''
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
              cStyle=''
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              cStyle=''
            />

            <Button className="w-full cursor-pointer" type="submit">
             {
              isLoading
              ?
              <Loader className="animate-spin"/>
              :
              <>
                 {isSignIn ? "Sign In" : "Create an Account"}
              </>
             }
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
