"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart3,
  TrendingUp,
  Leaf,
  Trash2,
  Award,
  Zap,
  Calendar,
  Settings,
  Bell,
  User,
  Home,
  Activity,
  Target,
  Sparkles,
  MapPin,
  Thermometer,
  Gauge,
  Wind,
  AlertTriangle,
  Wifi,
  Battery,
  Clock,
  Package,
  Droplets,
  Radio,
  Power,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  Moon,
  Sun,
  Menu,
  X,
  PieChart,
  Filter,
  Wrench,
  CheckCircle,
  Info,
  Save,
} from "lucide-react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart as RePieChart,
  Cell,
} from "recharts"

const historicalData = [
  { time: "Mon", level: 15 },
  { time: "Tue", level: 28 },
  { time: "Wed", level: 42 },
  { time: "Thu", level: 55 },
  { time: "Fri", level: 67 },
  { time: "Sat", level: 78 },
  { time: "Sun", level: 85 },
]

const wasteAnalyticsData = [
  { name: "Recyclables", value: 44, color: "hsl(var(--primary))" },
  { name: "Compost", value: 31, color: "hsl(var(--secondary))" },
  { name: "Landfill", value: 19, color: "hsl(var(--accent))" },
  { name: "Hazardous", value: 6, color: "hsl(var(--destructive))" },
]

const maintenanceSchedule = [
  { task: "Filter Replacement", dueDate: "In 5 days", status: "upcoming", priority: "high" },
  { task: "Sensor Calibration", dueDate: "In 12 days", status: "upcoming", priority: "medium" },
  { task: "Deep Cleaning", dueDate: "In 20 days", status: "upcoming", priority: "low" },
]

const recentNotifications = [
  { id: 1, type: "warning", message: "Trash level at 67% - Empty soon", time: "5 min ago" },
  { id: 2, type: "success", message: "Weekly goal achieved!", time: "2 hours ago" },
  { id: 3, type: "info", message: "Filter replacement due in 5 days", time: "1 day ago" },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [trashLevel, setTrashLevel] = useState(67)
  const [lidStatus, setLidStatus] = useState<"open" | "closed">("closed")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [darkMode, setDarkMode] = useState(false)
  const [binName, setBinName] = useState("Kitchen Bin")
  const [alertThreshold, setAlertThreshold] = useState(85)
  const [isEditingName, setIsEditingName] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const getTrashLevelColor = (level: number) => {
    if (level <= 50) return "text-primary"
    if (level <= 80) return "text-yellow-500"
    return "text-red-500"
  }

  const getFillColor = (level: number) => {
    if (level <= 50) return "stroke-primary"
    if (level <= 80) return "stroke-yellow-500"
    return "stroke-red-500"
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const formatLastUpdated = () => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000)
    if (diff < 60) return `${diff} seconds ago`
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    return lastUpdated.toLocaleTimeString()
  }

  const handleLidControl = (action: "open" | "close") => {
    setLidStatus(action)
    setLastUpdated(new Date())
  }

  const handleResetLevel = () => {
    setTrashLevel(0)
    setLastUpdated(new Date())
  }

  const handleQuickAction = (action: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Action Completed",
        description: `${action} executed successfully!`,
      })
    }, 1000)
  }

  const handleMuteAlerts = () => {
    handleQuickAction("Mute Alerts")
  }

  const handleNavigateSettings = () => {
    window.location.href = "/dashboard/settings"
  }

  const handleDismissNotification = (id: number) => {
    toast({
      title: "Notification Dismissed",
      description: "Notification has been removed.",
    })
  }

  const handleViewManual = () => {
    toast({
      title: "Opening Manual",
      description: "Device manual is being downloaded...",
    })
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Manual has been downloaded successfully.",
      })
    }, 2000)
  }

  const handleDeviceSettings = () => {
    window.location.href = "/dashboard/trash-can"
  }

  const handleSaveCustomization = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your customization preferences have been updated.",
      })
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background">
      {trashLevel >= alertThreshold && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white px-4 py-2 md:py-3 shadow-lg animate-pulse">
          <div className="container mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="font-semibold text-sm md:text-base">Trashcan Full – Please Empty Soon!</span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setAlertThreshold(100)}
              className="bg-white text-red-500 hover:bg-gray-100 text-xs md:text-sm"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

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
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </Link>

        <nav className="space-y-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary/20"
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
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
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
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, Alex</h2>
            <p className="text-sm md:text-base text-muted-foreground">Here's your waste management overview</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4 bg-transparent"
              onClick={() => handleQuickAction("Empty Bin")}
              disabled={isLoading}
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
              <span className="text-xs">Empty Bin</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4 bg-transparent"
              onClick={() => handleLidControl("open")}
              disabled={isLoading}
            >
              <ChevronUp className="h-5 w-5" />
              <span className="text-xs">Open Lid</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4 bg-transparent"
              onClick={handleMuteAlerts}
              disabled={isLoading}
            >
              <Bell className="h-5 w-5" />
              <span className="text-xs">Mute Alerts</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-4 bg-transparent"
              onClick={handleNavigateSettings}
              disabled={isLoading}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>

        {/* Smart TrashCan Product Display Section */}
        <div className="mb-6 md:mb-8">
          <Card className="border-border bg-card p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-accent/30 border border-border max-w-xs mx-auto">
                  <Image
                    src="/modern-smart-trashcan-with-sensors-and-led-display.jpg"
                    alt="Smart TrashCan Device"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">Smart TrashCan Pro</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Model: STC-2024 | Serial: #ST-4892-KX</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-0 text-sm px-3 py-1 w-fit">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                    <div className="rounded-lg border border-border bg-accent/30 p-2 md:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                      <p className="text-base md:text-lg font-semibold text-foreground">50 Liters</p>
                    </div>
                    <div className="rounded-lg border border-border bg-accent/30 p-2 md:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Installation Date</p>
                      <p className="text-base md:text-lg font-semibold text-foreground">Jan 15, 2024</p>
                    </div>
                    <div className="rounded-lg border border-border bg-accent/30 p-2 md:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Warranty Status</p>
                      <p className="text-base md:text-lg font-semibold text-foreground">Active (2 years)</p>
                    </div>
                    <div className="rounded-lg border border-border bg-accent/30 p-2 md:p-3">
                      <p className="text-xs text-muted-foreground mb-1">Firmware Version</p>
                      <p className="text-base md:text-lg font-semibold text-foreground">v2.4.1</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent text-sm" onClick={handleDeviceSettings}>
                    <Settings className="h-4 w-4 mr-2" />
                    Device Settings
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent text-sm" onClick={handleViewManual}>
                    <Package className="h-4 w-4 mr-2" />
                    View Manual
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow col-span-1">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Trash Level</h3>
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - trashLevel / 100)}`}
                    className={`${getFillColor(trashLevel)} transition-all duration-500`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getTrashLevelColor(trashLevel)}`}>{trashLevel}%</span>
                  <span className="text-xs text-muted-foreground mt-1">Full</span>
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    className={`${trashLevel <= 50 ? "bg-primary/10 text-primary" : trashLevel <= 80 ? "bg-yellow-500/10 text-yellow-600" : "bg-red-500/10 text-red-600"} border-0`}
                  >
                    {trashLevel <= 50 ? "Normal" : trashLevel <= 80 ? "Filling Up" : "Almost Full"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="text-xs text-foreground">{formatLastUpdated()}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow col-span-1">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Lid Status</h3>
              <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
                <div
                  className={`transition-transform duration-500 ${lidStatus === "open" ? "rotate-[-45deg]" : "rotate-0"}`}
                >
                  <div className="w-32 h-4 bg-primary rounded-lg shadow-lg" />
                </div>
                <div className="absolute bottom-0 w-36 h-20 bg-muted rounded-t-lg border-2 border-border" />
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-foreground capitalize">{lidStatus}</span>
                  <div
                    className={`w-3 h-3 rounded-full ${lidStatus === "open" ? "bg-primary animate-pulse" : "bg-muted"}`}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleLidControl("open")}
                    disabled={lidStatus === "open"}
                  >
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleLidControl("close")}
                    disabled={lidStatus === "closed"}
                  >
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Close
                  </Button>
                </div>
                <Button size="sm" variant="secondary" className="w-full" onClick={handleResetLevel}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Level
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">Customization</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bin-name" className="text-sm text-muted-foreground mb-2 block">
                  Bin Name
                </Label>
                {isEditingName ? (
                  <div className="flex gap-2">
                    <Input
                      id="bin-name"
                      value={binName}
                      onChange={(e) => setBinName(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={() => setIsEditingName(false)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{binName}</span>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingName(true)}>
                      Edit
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="alert-threshold" className="text-sm text-muted-foreground mb-2 block">
                  Alert Threshold: {alertThreshold}%
                </Label>
                <input
                  id="alert-threshold"
                  type="range"
                  min="50"
                  max="100"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label htmlFor="dark-mode" className="text-sm text-muted-foreground">
                    Dark Mode
                  </Label>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
            <Button size="sm" className="w-full mt-4" onClick={handleSaveCustomization} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </Card>
        </div>

        <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Historical Trash Level</h3>
                <p className="text-sm text-muted-foreground">Track your bin usage patterns over time</p>
              </div>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Waste Analytics Section with Pie Chart */}
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Waste Distribution</h3>
                <p className="text-sm text-muted-foreground">Current month breakdown</p>
              </div>
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={wasteAnalyticsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteAnalyticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {wasteAnalyticsData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mb-6 md:mb-8">
          <Card className="border-border bg-card p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Smart Insights</h3>
                <p className="text-sm text-muted-foreground">AI-powered waste management recommendations</p>
              </div>
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <div className="rounded-lg border border-border bg-accent/30 p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Peak Usage Pattern</p>
                    <p className="text-xs text-muted-foreground">
                      Trash fills fastest on Mondays. Consider scheduling pickups for Tuesday mornings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-accent/30 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Average Fill Time</p>
                    <p className="text-xs text-muted-foreground">
                      Your bin takes approximately 6 hours to reach 50% capacity during weekdays.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-accent/30 p-4">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Recycling Opportunity</p>
                    <p className="text-xs text-muted-foreground">
                      15% of your waste could be recycled. Check our sorting guide for tips.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 md:mb-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Trash2 className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                +12%
              </Badge>
            </div>
            <p className="mb-1 text-2xl font-bold text-foreground">2,847</p>
            <p className="text-sm text-muted-foreground">Items Sorted</p>
          </Card>

          <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                +8%
              </Badge>
            </div>
            <p className="mb-1 text-2xl font-bold text-foreground">94.2%</p>
            <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          </Card>

          <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-accent text-accent-foreground border-0">
                +24%
              </Badge>
            </div>
            <p className="mb-1 text-2xl font-bold text-foreground">156 kg</p>
            <p className="text-sm text-muted-foreground">CO₂ Saved</p>
          </Card>

          <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                +156
              </Badge>
            </div>
            <p className="mb-1 text-2xl font-bold text-foreground">3,420</p>
            <p className="text-sm text-muted-foreground">Reward Points</p>
          </Card>
        </div>

        <div className="mb-6 md:mb-8">
          <h3 className="mb-4 text-lg md:text-xl font-semibold text-foreground">Real-Time Sensor Monitoring</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Gauge className="h-5 w-5 text-primary" />
                </div>
                <Badge className="bg-primary/10 text-primary border-0">Normal</Badge>
              </div>
              <p className="mb-1 text-2xl font-bold text-foreground">67%</p>
              <p className="text-sm text-muted-foreground">Fill Level</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[67%] rounded-full bg-primary transition-all" />
              </div>
            </Card>

            <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <Thermometer className="h-5 w-5 text-secondary" />
                </div>
                <Badge className="bg-secondary/10 text-secondary border-0">Optimal</Badge>
              </div>
              <p className="mb-1 text-2xl font-bold text-foreground">22°C</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="mt-2 text-xs text-muted-foreground">Internal: 24°C</p>
            </Card>

            <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50">
                  <Wind className="h-5 w-5 text-primary" />
                </div>
                <Badge className="bg-accent text-accent-foreground border-0">Good</Badge>
              </div>
              <p className="mb-1 text-2xl font-bold text-foreground">Low</p>
              <p className="text-sm text-muted-foreground">Odor Level</p>
              <p className="mt-2 text-xs text-muted-foreground">Air quality: 95%</p>
            </Card>

            <Card className="border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <Badge className="bg-primary/10 text-primary border-0">Normal</Badge>
              </div>
              <p className="mb-1 text-2xl font-bold text-foreground">45%</p>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="mt-2 text-xs text-muted-foreground">Optimal range</p>
            </Card>
          </div>
        </div>

        <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Device Location & Tracking</h3>
                <p className="text-sm text-muted-foreground">GPS monitoring and movement detection</p>
              </div>
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-accent/30 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Current Location</span>
                  <Badge className="bg-primary/10 text-primary border-0">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">123 Main Street, Kitchen</p>
                <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Movement Status</p>
                  <p className="text-sm font-medium text-foreground">Stationary</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground mb-1">GPS Signal</p>
                  <p className="text-sm font-medium text-foreground">Strong (98%)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Radio className="h-3 w-3" />
                <span>Geofencing enabled - Alerts on movement</span>
              </div>
            </div>
          </Card>

          {/* Maintenance Schedule Card */}
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Maintenance Schedule</h3>
                <p className="text-sm text-muted-foreground">Upcoming tasks</p>
              </div>
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-3">
              {maintenanceSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-accent/30">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.priority === "high" ? "bg-red-500/10" : item.priority === "medium" ? "bg-yellow-500/10" : "bg-primary/10"}`}
                  >
                    <Filter
                      className={`h-4 w-4 ${item.priority === "high" ? "text-red-500" : item.priority === "medium" ? "text-yellow-500" : "text-primary"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.task}</p>
                    <p className="text-xs text-muted-foreground">{item.dueDate}</p>
                  </div>
                  <Badge
                    className={`${item.priority === "high" ? "bg-red-500/10 text-red-600" : item.priority === "medium" ? "bg-yellow-500/10 text-yellow-600" : "bg-primary/10 text-primary"} border-0 text-xs`}
                  >
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Notifications Panel */}
        <div className="mb-6 md:mb-8">
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent Notifications</h3>
                <p className="text-sm text-muted-foreground">Latest updates and alerts</p>
              </div>
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-accent/30"
                >
                  {notification.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                  {notification.type === "success" && <CheckCircle className="h-5 w-5 text-primary mt-0.5" />}
                  {notification.type === "info" && <Info className="h-5 w-5 text-secondary mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDismissNotification(notification.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Waste Sorting Chart */}
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Waste Sorting</h3>
                <p className="text-sm text-muted-foreground">Items sorted by category</p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">Recyclables</span>
                  <span className="font-medium text-foreground">1,245 items</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[44%] rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">Compost</span>
                  <span className="font-medium text-foreground">892 items</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[31%] rounded-full bg-secondary" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">Landfill</span>
                  <span className="font-medium text-foreground">534 items</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[19%] rounded-full bg-accent" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">Hazardous</span>
                  <span className="font-medium text-foreground">176 items</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[6%] rounded-full bg-destructive" />
                </div>
              </div>
            </div>
          </Card>

          {/* Environmental Impact */}
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Environmental Impact</h3>
                <p className="text-sm text-muted-foreground">Your contribution this month</p>
              </div>
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border border-border bg-accent/30 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Emissions Saved</p>
                  <p className="text-2xl font-bold text-foreground">156 kg</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    +24%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-accent/30 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Water Conserved</p>
                  <p className="text-2xl font-bold text-foreground">2,340 L</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                    +18%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-accent/30 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trees Equivalent</p>
                  <p className="text-2xl font-bold text-foreground">12.4</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-0">
                    +31%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">System Status</h3>
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Wi-Fi Signal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 bg-primary rounded" />
                    <div className="w-1 h-4 bg-primary rounded" />
                    <div className="w-1 h-5 bg-primary rounded" />
                    <div className="w-1 h-6 bg-primary rounded" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Strong</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Power className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Power Source</span>
                </div>
                <Badge className="bg-secondary/10 text-secondary border-0">AC Power</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Battery Backup</span>
                </div>
                <span className="text-sm font-medium text-foreground">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Microcontroller</span>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-accent-foreground" />
                  <span className="text-sm text-muted-foreground">Capacity</span>
                </div>
                <span className="text-sm font-medium text-foreground">{trashLevel}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last Emptied</span>
                </div>
                <span className="text-sm font-medium text-foreground">2 days ago</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">System Health</span>
                  <span className="text-xs font-medium text-primary">Excellent</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[96%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Plastic bottle sorted</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-secondary" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Food waste composted</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Paper recycled</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Glass jar sorted</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-accent/30 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Eco Warrior</p>
                  <p className="text-xs text-muted-foreground">1000+ items sorted</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-accent/30 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Green Champion</p>
                  <p className="text-xs text-muted-foreground">100kg CO₂ saved</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3 opacity-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Perfect Week</p>
                  <p className="text-xs text-muted-foreground">7 days streak - 4/7</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
