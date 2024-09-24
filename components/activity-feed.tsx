import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"
import { useEffect, useState } from "react"

interface Activity {
  id: number;
  type: string;
  amount: string;
  timestamp: string;
}

export default function ActivityFeed() {
  const { cakeStaked, liquidityProvided, points } = useUser()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // This is a mock implementation. In a real app, you'd fetch this data from a backend or blockchain
    const newActivity: Activity = {
      id: Date.now(),
      type: 'Update',
      amount: `CAKE: ${cakeStaked}, Liquidity: $${liquidityProvided}, Points: ${points}`,
      timestamp: new Date().toLocaleTimeString()
    }
    setActivities(prev => [newActivity, ...prev].slice(0, 5))
  }, [cakeStaked, liquidityProvided, points])

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Stake':
        return 'bg-green-500';
      case 'Unstake':
        return 'bg-red-500';
      case 'Liquidity':
        return 'bg-blue-500';
      case 'Reward':
        return 'bg-purple-500';
      case 'Update':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className={`mr-2 ${getActivityColor(activity.type)}`}>
                  {activity.type}
                </Badge>
                <span>{activity.amount}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}