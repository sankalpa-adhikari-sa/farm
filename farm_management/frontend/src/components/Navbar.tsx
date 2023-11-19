import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { useAtom } from "jotai";
import { sidebarAtom } from "@/Features/atoms";

function Navbar() {
  const [SidebarOpen, setSidebarOpen] = useAtom(sidebarAtom);
  const navigate = useNavigate();
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
          <Button
            onClick={() => navigate("/settings")}
            variant="ghost"
            size="icon"
          >
            <Settings />
          </Button>
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
