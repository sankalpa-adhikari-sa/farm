import { Button } from "@/components/ui/button";
import { Menu, SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { useAtom } from "jotai";
import { sidebarAtom } from "@/Features/atoms";
import UserAvatar from "./UserAvatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Settings from "@/pages/Settings";
function Navbar() {
  const [SidebarOpen, setSidebarOpen] = useAtom(sidebarAtom);
  const handleSidebar = () => {
    setSidebarOpen(!SidebarOpen);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-12 justify-between pt-1 space-x-6 pr-3">
        <Button onClick={handleSidebar} variant="ghost" size="icon">
          <Menu />
        </Button>
        <div>
          <UserAvatar />

          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" size="icon">
                <SettingsIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="md:w-[93%] md:rounded-xl h-[95%]">
              <Settings />
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
      </div>
      <div>
        <Separator />
      </div>
    </div>
  );
}

export default Navbar;
