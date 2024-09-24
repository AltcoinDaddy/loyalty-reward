import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGamification } from "@/contexts/gamification-context"

export default function Referral() {
  const { referral, generateReferralCode } = useGamification()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Program</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Invite friends and earn rewards!</p>
          {referral.code ? (
            <div className="space-y-2">
              <p>Your referral code:</p>
              <Input value={referral.code} readOnly />
              <p>Users referred: {referral.referredUsers}</p>
            </div>
          ) : (
            <Button onClick={generateReferralCode}>Generate Referral Code</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}