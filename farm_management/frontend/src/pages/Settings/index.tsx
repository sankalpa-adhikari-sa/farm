import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function Settings() {
  return (
    <div className="flex flex-row gap-3">
      <div className="sm:w-32 md:grow-[1] md:min-w-[128px] md:max-w-[170px] flex-col ">
        {/* change variant between default and ghost using jotai */}
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Apperance
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Account
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          Others
        </Button>
      </div>
      <div className="md:grow-[3] mt-4">
        jotai to set global state for which tab is active apperanc, account,
        others... and use something like switch to swich which page to load
        here...
      </div>
    </div>
  );
}

export default Settings;
