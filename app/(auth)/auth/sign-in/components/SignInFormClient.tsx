import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Chrome } from "lucide-react";
import { googleLogin,githubLogin } from "@/actions/signIn";

const SignInFormClient = () => {
  return (
    <div>
      <Card className="min-w-md w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-sm font-semibold text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-y-4">
          <form action={googleLogin} className="w-full">
            <Button className="w-full ">
              <Chrome className="mr-2 inline" />
              <span>Sign In with Google</span>
            </Button>
          </form>
          <form action={githubLogin} className="w-full">
            <Button className="w-full">
              <Github className="mr-2 inline" />
              <span>Sign in with Github</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-xs justify-center text-gray-800 underline">
          lwda lassan terms and condition
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInFormClient;
