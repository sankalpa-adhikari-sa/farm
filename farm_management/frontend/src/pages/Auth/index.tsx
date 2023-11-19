import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "@/Features/atoms";
import pb from "@/Pocketbase/pocketbase";
import { Button } from "@/components/ui/button";
function Auth() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  return (
    <div>
      <p>Status : {isAuthenticated ? "Autenticated" : "Not Autenticated"}</p>
      <p>User : {isAuthenticated && pb.authStore.model!.email}</p>
      <p>
        view api rule in admin ui of livestock type , ionly authernticated user
        can add data
      </p>
      {isAuthenticated ? (
        <Button onClick={() => pb.authStore.clear()}>Logout</Button>
      ) : null}
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
