import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Wallet, LogOut } from 'lucide-react'
import { DisconnectButton } from "./disconnect-confirmation-dialog"

export default function Header() {
  const { account, connectWallet, disconnectWallet } = useWallet()

  return (
    <motion.header 
      className="bg-gradient-to-r from-pancake-purple to-pancake-pink p-4 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src="/pancakeswap-logo.png" alt="PancakeSwap Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-white">LiquiQuest
          </h1>
        </motion.div>
        <div className="flex items-center space-x-2">
          {account ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white flex items-center"
              >
                <Wallet className="w-4 h-4 mr-2" />
                <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DisconnectButton onDisconnect={disconnectWallet} />
                {/* <Button 
                  onClick={disconnectWallet} 
                  className="pancake-button bg-red-500 hover:bg-red-600 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </Button> */}
              </motion.div>
            </>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={connectWallet} className="pancake-button flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  )
}