"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Activity,
  Target,
  Settings,
  User,
  Sparkles,
  Trophy,
  Medal,
  Leaf,
  Crown,
  Star,
  Zap,
  Menu,
  X,
} from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Chen",
    points: 8945,
    itemsSorted: 3421,
    co2Saved: 234,
    accuracy: 98.5,
    streak: 45,
    badge: "Eco Legend",
  },
  {
    rank: 2,
    name: "Michael Rodriguez",
    points: 8234,
    itemsSorted: 3156,
    co2Saved: 218,
    accuracy: 97.8,
    streak: 38,
    badge: "Green Master",
  },
  {
    rank: 3,
    name: "Emma Thompson",
    points: 7892,
    itemsSorted: 2987,
    co2Saved: 205,
    accuracy: 97.2,
    streak: 42,
    badge: "Eco Champion",
  },
  {
    rank: 4,
    name: "David Kim",
    points: 7456,
    itemsSorted: 2845,
    co2Saved: 196,
    accuracy: 96.9,
    streak: 35,
    badge: "Waste Warrior",
  },
  {
    rank: 5,
    name: "Lisa Anderson",
    points: 7123,
    itemsSorted: 2734,
    co2Saved: 189,
    accuracy: 96.5,
    streak: 31,
    badge: "Green Hero",
  },
  {
    rank: 47,
    name: "Alex Johnson (You)",
    points: 3420,
    itemsSorted: 2847,
    co2Saved: 156,
    accuracy: 94.2,
    streak: 28,
    badge: "Eco Warrior",
    isCurrentUser: true,
  },
]

const weeklyChallenge = {
  name: "Recycling Champion",
  description: "Sort 500 recyclable items this week",
  progress: 342,
  goal: 500,
  reward: 500,
  endsIn: "3 days",
}

const monthlyCompetition = {
  name: "CO₂ Reduction Challenge",
  description: "Save the most CO₂ this month",
  participants: 1247,
  yourRank: 47,
  prize: "Premium Badge + 5000 Points",
}

export default function LeaderBoardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly" | "all-time">("all-time")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    if (rank === 2) return "bg-gray-400/10 text-gray-600 border-gray-400/20"
    if (rank === 3) return "bg-amber-600/10 text-amber-700 border-amber-600/20"
    return "bg-primary/10 text-primary border-primary/20"
  }

  return (
    <div className="min-h-screen bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-6 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Link href="/" className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg glow-effect">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Smart TrashCan</h1>
            <p className="text-xs text-muted-foreground">Leader Board</p>
          </div>
        </Link>

        <nav className="space-y-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/trash-can">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Activity className="h-4 w-4" />
              Trash Can
            </Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/dashboard/leader-board">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Target className="h-4 w-4" />
              Leader Board
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Card className="border-border bg-accent/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Eco Status</span>
            </div>
            <p className="text-xs text-muted-foreground">You're in the top 5% of eco-warriors this month!</p>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Leader Board</h2>
            <p className="text-sm md:text-base text-muted-foreground">Compete with eco-warriors worldwide</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeFilter === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={timeFilter === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={timeFilter === "all-time" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter("all-time")}
            >
              All Time
            </Button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <Card
              key={user.rank}
              className={`border-border bg-card p-6 hover:shadow-lg transition-shadow ${index === 0 ? "md:order-2 md:scale-105" : index === 1 ? "md:order-1" : "md:order-3"}`}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">{getRankIcon(user.rank)}</div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white mb-3">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{user.name}</h3>
                <Badge className={`${getRankBadgeColor(user.rank)} mb-3`}>{user.badge}</Badge>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-bold text-foreground">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">CO₂ Saved</span>
                    <span className="font-medium text-foreground">{user.co2Saved} kg</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Streak</span>
                    <span className="font-medium text-foreground">{user.streak} days</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Challenges & Competitions */}
        <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{weeklyChallenge.name}</h3>
                  <p className="text-xs text-muted-foreground">Ends in {weeklyChallenge.endsIn}</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-0">+{weeklyChallenge.reward} pts</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{weeklyChallenge.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {weeklyChallenge.progress} / {weeklyChallenge.goal}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(weeklyChallenge.progress / weeklyChallenge.goal) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <Trophy className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{monthlyCompetition.name}</h3>
                  <p className="text-xs text-muted-foreground">{monthlyCompetition.participants} participants</p>
                </div>
              </div>
              <Badge className="bg-secondary/10 text-secondary border-0">Live</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{monthlyCompetition.description}</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your Rank</span>
                <span className="text-lg font-bold text-foreground">#{monthlyCompetition.yourRank}</span>
              </div>
              <div className="rounded-lg border border-border bg-accent/30 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">Prize</span>
                </div>
                <p className="text-sm text-muted-foreground">{monthlyCompetition.prize}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Full Leaderboard */}
        <Card className="border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Global Rankings</h3>
          <div className="space-y-3">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${user.isCurrentUser ? "border-primary bg-primary/5" : "border-border bg-accent/30 hover:bg-accent/50"}`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                  {getRankIcon(user.rank)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">{user.name}</h4>
                    {user.isCurrentUser && <Badge className="bg-primary/10 text-primary border-0 text-xs">You</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.badge}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Points</p>
                    <p className="font-bold text-foreground">{user.points.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Items</p>
                    <p className="font-medium text-foreground">{user.itemsSorted.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">CO₂</p>
                    <p className="font-medium text-foreground">{user.co2Saved} kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                    <p className="font-medium text-foreground">{user.accuracy}%</p>
                  </div>
                </div>
                <div className="flex sm:hidden flex-col items-end">
                  <p className="text-lg font-bold text-foreground">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
