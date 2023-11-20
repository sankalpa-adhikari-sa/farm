import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";
function Auth() {
  return (
    <div>
      <p>
        view api rule in admin ui of livestock type , ionly authernticated user
        can add data
      </p>

      <Tabs defaultValue="signIn" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">signIn</TabsTrigger>
          <TabsTrigger value="signUp">signUp</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignIn />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
