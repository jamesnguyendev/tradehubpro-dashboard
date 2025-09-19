import { useState } from "react";

import { useRouter } from "next/navigation";

import { DeleteUser } from "@/actions/user/delete-user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DeleteConfirm({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    DeleteUser(id);
    router.refresh();
    setOpen(false);
  };

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Xóa
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn xóa?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
