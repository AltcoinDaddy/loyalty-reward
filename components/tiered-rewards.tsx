import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import { useGamification } from "@/contexts/gamification-context"

export default function TieredRewards() {
  const { level } = useUser()
  const { claimTieredReward } = useGamification()

  const tier = Math.floor(level / 10) + 1
  const rewards = [
    "5% bonus on CAKE rewards",
    "10% bonus on CAKE rewards",
    "15% bonus on CAKE rewards",
    "20% bonus on CAKE rewards",
    "25% bonus on CAKE rewards",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiered Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Your current tier: {tier}</p>
          <p>Tier rewards:</p>
          <ul className="list-disc list-inside">
            {rewards.slice(0, tier).map((reward, index) => (
              <li key={index} className={index === tier - 1 ? "font-bold" : ""}>{reward}</li>
            ))}
          </ul>
          <Button onClick={claimTieredReward}>Claim Tier Reward</Button>
        </div>
      </CardContent>
    </Card>
  )
}