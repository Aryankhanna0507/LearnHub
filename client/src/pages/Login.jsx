import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/feature/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [signupInput,setSignupInput]=useState({
    name:"",
    email:"",
    password:"",
  });

  const [loginInput,setLoginInput]=useState({
    email:"",
    password:"",
  });

  const [registerUser,{data:registerData,error:registerError,isLoading:registerIsLoading,isSuccess:registerIsSuccess}]=useRegisterUserMutation();
  const [loginUser,{data:loginData,error:loginError,isLoading:loginIsLoading,isSuccess:loginIsSuccess}]=useLoginUserMutation();

  const changeInputHandler=(e,type)=>{
    const {name,value}=e.target;

    if(type==="signup"){
      setSignupInput({
        ...signupInput,
        [name]:value,
      });
    }else{
      setLoginInput({
        ...loginInput,
        [name]:value,
      });
    }
  };

  const handleRegistration=async(type)=>{
    const inputData=type==="signup"?signupInput:loginInput;
    const action=type==="signup"?registerUser:loginUser;
    await action(inputData);
  };

  const navigate=useNavigate();

  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData?.message || "Signup successful.");
    }

    if(registerError){
      toast.error(registerError?.data?.message || "Signup Failed");
    }
  },[registerIsSuccess,registerData,registerError]);


  useEffect(()=>{
    if(loginIsSuccess && loginData){
      toast.success(loginData?.message || "Login successful");
      navigate("/");
    }

    if(loginError){
      toast.error(loginError?.data?.message || "Login Failed");
    }
  },[loginIsSuccess,loginData,loginError]);


  return (
    <div className="flex items-center justify-center min-h-screen px-4">

      <Tabs defaultValue="Signup" className="w-100">

        <TabsList className="grid w-full grid-cols-2 mb-3">
          <TabsTrigger value="Signup">Signup</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>


        {/* Signup Form */}

        <TabsContent value="Signup">

          <Card className="shadow-lg">

            <CardHeader>
              <CardTitle className="text-2xl">Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-2">
                <Label>Name</Label>
                <Input className="h-11" type="text" name="name" value={signupInput.name} onChange={(e)=>changeInputHandler(e,"signup")} placeholder="Eg. Patel"/>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input className="h-11" type="email" name="email" value={signupInput.email} onChange={(e)=>changeInputHandler(e,"signup")} placeholder="Eg. patel@gmail.com"/>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input className="h-11" type="password" name="password" value={signupInput.password} onChange={(e)=>changeInputHandler(e,"signup")} placeholder="Eg. xyz"/>
              </div>

            </CardContent>

            <CardFooter>
              <Button className="w-full h-11" disabled={registerIsLoading} onClick={()=>handleRegistration("signup")}>
                {
                  registerIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    please wait
                    </>
                  ):"SignUp"
                }
              </Button>
            </CardFooter>

          </Card>

        </TabsContent>



        {/* Login Form */}

        <TabsContent value="Login">

          <Card className="shadow-lg">

            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Login using your credentials to access your account.
              </CardDescription>
            </CardHeader>


            <CardContent className="space-y-4">

              <div className="space-y-2">
                <Label>Email</Label>
                <Input className="h-11" type="email" name="email" value={loginInput.email} onChange={(e)=>changeInputHandler(e,"login")} placeholder="Eg. patel@gmail.com"/>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input className="h-11" type="password" name="password" value={loginInput.password} onChange={(e)=>changeInputHandler(e,"login")} placeholder="Eg. xyz"/>
              </div>

            </CardContent>


            <CardFooter>

              <Button className="w-full h-11" disabled={loginIsLoading} onClick={()=>handleRegistration("login")}>
                {
                  loginIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    please wait
                    </>
                  ):"Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default Login;