import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"

export default function Achievements() {
  const { cakeStaked, liquidityProvided, points } = useUser()

  const achievements = [
    { 
      id: 1, 
      name: 'CAKE Believer', 
      description: 'Stake at least 100 CAKE', 
      completed: cakeStaked >= 100 
    },
    { 
      id: 2, 
      name: 'Liquidity Legend', 
      description: 'Provide over $1,000 in liquidity', 
      completed: liquidityProvided > 1000 
    },
    { 
      id: 3, 
      name: 'Point Collector', 
      description: 'Earn 5,000 points', 
      completed: points >= 5000 
    },
    { 
      id: 4, 
      name: 'Dedicated Staker', 
      description: 'Stake CAKE for 30 consecutive days', 
      completed: false // This would require tracking over time
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
              <Badge variant={achievement.completed ? "default" : "secondary"}>
                {achievement.completed ? "Completed" : "In Progress"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}