import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { motion } from "framer-motion"

export default function UserDashboard() {
  const { level, cakeStaked, liquidityProvided, points, stake, unstake, provideLiquidity, removeLiquidity, claimRewards } = useUser()
  const [stakeAmount, setStakeAmount] = useState("")
  const [liquidityAmount, setLiquidityAmount] = useState("")

  const nextLevelPoints = (level + 1) * 1000
  const progress = (points % 1000) / 10

  const handleStake = async () => {
    if (stakeAmount) {
      await stake(Number(stakeAmount))
      setStakeAmount("")
    }
  }

  const handleUnstake = async () => {
    if (stakeAmount) {
      await unstake(Number(stakeAmount))
      setStakeAmount("")
    }
  }

  const handleProvideLiquidity = async () => {
    if (liquidityAmount) {
      await provideLiquidity(Number(liquidityAmount))
      setLiquidityAmount("")
    }
  }

  const handleRemoveLiquidity = async () => {
    if (liquidityAmount) {
      await removeLiquidity(Number(liquidityAmount))
      setLiquidityAmount("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="pancake-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-pancake-yellow">Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg">Level:</span>
              <motion.span 
                className="text-2xl font-bold text-pancake-green"
                key={level}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {level}
              </motion.span>
            </div>
            <div className="flex justify-between items-center">
              <span>CAKE Staked:</span>
              <span className="font-bold text-pancake-blue">{cakeStaked}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Liquidity Provided:</span>
              <span className="font-bold text-pancake-pink">${liquidityProvided}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Points:</span>
              <span className="font-bold text-pancake-yellow">{points}</span>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress to Next Level:</span>
                <span>{points} / {nextLevelPoints}</span>
              </div>
              <div className="pancake-progress">
                <motion.div 
                  className="pancake-progress-bar h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Amount to stake/unstake"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="pancake-input"
              />
              <div className="flex space-x-2">
                <Button onClick={handleStake} className="pancake-button flex-1">Stake</Button>
                <Button onClick={handleUnstake} className="pancake-button flex-1" variant="outline">Unstake</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Amount to provide/remove liquidity"
                value={liquidityAmount}
                onChange={(e) => setLiquidityAmount(e.target.value)}
                className="pancake-input"
              />
              <div className="flex space-x-2">
                <Button onClick={handleProvideLiquidity} className="pancake-button flex-1">Provide Liquidity</Button>
                <Button onClick={handleRemoveLiquidity} className="pancake-button flex-1" variant="outline">Remove Liquidity</Button>
              </div>
            </div>
            <Button onClick={claimRewards} className="pancake-button w-full">Claim Rewards</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}