import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGamification } from "@/contexts/gamification-context"
import { motion } from "framer-motion"

export default function Challenges() {
  const { dailyChallenges, weeklyChallenges, completeChallenge } = useGamification()

  const challengeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <Card className="pancake-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-pancake-yellow">Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 text-pancake-blue">Daily Challenges</h3>
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                variants={challengeVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center mb-4 bg-white bg-opacity-5 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium text-pancake-green">{challenge.title}</p>
                  <p className="text-sm text-gray-400">{challenge.description}</p>
                </div>
                <Button 
                  onClick={() => completeChallenge(challenge.id)}
                  disabled={challenge.isCompleted}
                  className={`pancake-button ${challenge.isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {challenge.isCompleted ? 'Completed' : 'Complete'}
                </Button>
              </motion.div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-pancake-pink">Weekly Challenges</h3>
            {weeklyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                variants={challengeVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: (dailyChallenges.length + index) * 0.1 }}
                className="flex justify-between items-center mb-4 bg-white bg-opacity-5 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium text-pancake-green">{challenge.title}</p>
                  <p className="text-sm text-gray-400">{challenge.description}</p>
                </div>
                <Button 
                  onClick={() => completeChallenge(challenge.id)}
                  disabled={challenge.isCompleted}
                  className={`pancake-button ${challenge.isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {challenge.isCompleted ? 'Completed' : 'Complete'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}