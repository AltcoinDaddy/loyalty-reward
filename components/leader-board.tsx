import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LeaderBoard() {
  // Mock data - replace with actual data from your API or state management solution
  const leaderboardData = [
    { rank: 1, address: '0x1234...5678', points: 10000 },
    { rank: 2, address: '0x2345...6789', points: 9500 },
    { rank: 3, address: '0x3456...7890', points: 9000 },
    { rank: 4, address: '0x4567...8901', points: 8500 },
    { rank: 5, address: '0x5678...9012', points: 8000 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow key={user.rank}>
                <TableCell>{user.rank}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell className="text-right">{user.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}