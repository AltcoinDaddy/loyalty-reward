import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { LogOut } from 'lucide-react'
  
  export function DisconnectButton({ onDisconnect }: { onDisconnect: () => void }) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="pancake-button bg-red-500 hover:bg-red-600 flex items-center">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Disconnect Wallet</DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect your wallet? You will need to reconnect to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => {}}>Cancel</Button>
            <Button onClick={onDisconnect} className="pancake-button bg-red-500 hover:bg-red-600">
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }