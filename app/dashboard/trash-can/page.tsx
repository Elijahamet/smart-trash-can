"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  Activity,
  Target,
  Settings,
  User,
  Sparkles,
  Gauge,
  Thermometer,
  Wind,
  Droplets,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Power,
  Wifi,
  Battery,
  Clock,
  Bell,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Menu,
  X,
  Leaf,
  Zap,
  MapPin,
  Save,
  Navigation,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const trashCans = [
  {
    id: "AMA-001",
    name: "Makola Market Bin",
    location: "Makola Market",
    coordinates: { x: 35, y: 45 },
    fillLevel: 78,
    temperature: 29,
    odorLevel: "High",
    humidity: 60,
    status: "alert",
    lidStatus: "open" as const,
    lastEmptied: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "AMA-002",
    name: "Kwame Nkrumah Circle Bin",
    location: "Kwame Nkrumah Interchange",
    coordinates: { x: 50, y: 55 },
    fillLevel: 64,
    temperature: 30,
    odorLevel: "Medium",
    humidity: 57,
    status: "online",
    lidStatus: "closed" as const,
    lastEmptied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "AMA-003",
    name: "Osu Oxford Street Bin",
    location: "Osu Oxford Street",
    coordinates: { x: 70, y: 40 },
    fillLevel: 82,
    temperature: 31,
    odorLevel: "Medium",
    humidity: 55,
    status: "online",
    lidStatus: "closed" as const,
    lastEmptied: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "AMA-004",
    name: "Kaneshie Market Bin",
    location: "Kaneshie Market",
    coordinates: { x: 25, y: 60 },
    fillLevel: 91,
    temperature: 32,
    odorLevel: "High",
    humidity: 65,
    status: "alert",
    lidStatus: "open" as const,
    lastEmptied: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "AMA-005",
    name: "Ministries Area Bin",
    location: "Accra Central (Ministries)",
    coordinates: { x: 40, y: 30 },
    fillLevel: 33,
    temperature: 28,
    odorLevel: "Low",
    humidity: 48,
    status: "online",
    lidStatus: "closed" as const,
    lastEmptied: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
];


const fillHistoryData = [
  { hour: "00:00", level: 45 },
  { hour: "04:00", level: 48 },
  { hour: "08:00", level: 52 },
  { hour: "12:00", level: 58 },
  { hour: "16:00", level: 63 },
  { hour: "20:00", level: 67 },
  { hour: "Now", level: 67 },
]

const temperatureData = [
  { time: "6h ago", temp: 21 },
  { time: "5h ago", temp: 22 },
  { time: "4h ago", temp: 22 },
  { time: "3h ago", temp: 23 },
  { time: "2h ago", temp: 22 },
  { time: "1h ago", temp: 22 },
  { time: "Now", temp: 22 },
]

export default function TrashCanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedBinId, setSelectedBinId] = useState("TC-001")
  const selectedBin = trashCans.find((bin) => bin.id === selectedBinId) || trashCans[0]

  const [trashLevel, setTrashLevel] = useState(selectedBin.fillLevel)
  const [lidStatus, setLidStatus] = useState<"open" | "closed">(selectedBin.lidStatus)
  const [temperature, setTemperature] = useState(selectedBin.temperature)
  const [odorLevel, setOdorLevel] = useState(selectedBin.odorLevel)
  const [humidity, setHumidity] = useState(selectedBin.humidity)
  const [autoLidEnabled, setAutoLidEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [childLockEnabled, setChildLockEnabled] = useState(false)
  const [nightModeEnabled, setNightModeEnabled] = useState(false)
  const [compactionLevel, setCompactionLevel] = useState([3])
  const [lastEmptied, setLastEmptied] = useState(selectedBin.lastEmptied)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isCalibratingFill, setIsCalibratingFill] = useState(false)
  const [isCalibratingTemp, setIsCalibratingTemp] = useState(false)
  const [isCalibratingOdor, setIsCalibratingOdor] = useState(false)
  const [isCalibratingWeight, setIsCalibratingWeight] = useState(false)

  const getTrashLevelColor = (level: number) => {
    if (level <= 50) return "text-primary"
    if (level <= 80) return "text-secondary"
    return "text-destructive"
  }

  const getFillColor = (level: number) => {
    if (level <= 50) return "stroke-primary"
    if (level <= 80) return "stroke-secondary"
    return "stroke-destructive"
  }

  const handleBinSelect = (binId: string) => {
    const bin = trashCans.find((b) => b.id === binId)
    if (bin) {
      setSelectedBinId(binId)
      setTrashLevel(bin.fillLevel)
      setLidStatus(bin.lidStatus)
      setTemperature(bin.temperature)
      setOdorLevel(bin.odorLevel)
      setHumidity(bin.humidity)
      setLastEmptied(bin.lastEmptied)
      toast({
        title: "Bin Selected",
        description: `Now viewing ${bin.name} at ${bin.location}`,
      })
    }
  }

  const handleLidControl = (action: "open" | "close") => {
    setLidStatus(action)
    toast({
      title: `Lid ${action === "open" ? "Opened" : "Closed"}`,
      description: `${selectedBin.name} lid has been ${action === "open" ? "opened" : "closed"} remotely.`,
    })
  }

  const handleEmptyBin = () => {
    setTrashLevel(0)
    setLastEmptied(new Date())
    toast({
      title: "Bin Marked as Emptied",
      description: `${selectedBin.name} has been marked as emptied.`,
    })
  }

  const formatLastEmptied = () => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastEmptied.getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 0) return "Today"
    if (diff === 1) return "Yesterday"
    return `${diff} days ago`
  }

  const handleCalibrateSensor = (sensorType: string, setCalibrating: (val: boolean) => void) => {
    setCalibrating(true)
    toast({
      title: "Calibration Started",
      description: `Calibrating ${sensorType} sensor for ${selectedBin.name}...`,
    })

    setTimeout(() => {
      setCalibrating(false)
      toast({
        title: "Calibration Complete",
        description: `${sensorType} sensor has been calibrated successfully.`,
      })
    }, 3000)
  }

  const handleRunDiagnostics = () => {
    setIsLoading(true)
    toast({
      title: "Running Diagnostics",
      description: `System diagnostics in progress for ${selectedBin.name}...`,
    })

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Diagnostics Complete",
        description: "All systems are functioning normally. No issues detected.",
      })
    }, 4000)
  }

  const handleSaveSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: `Settings for ${selectedBin.name} have been updated successfully.`,
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden glass-card glass-card-hover"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 border-r border-border bg-sidebar p-6 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Link href="/" className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary glow-blue">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">Smart TrashCan</h1>
            <p className="text-xs text-muted-foreground">Trash Can</p>
          </div>
        </Link>

        <nav className="space-y-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/trash-can">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Activity className="h-4 w-4" />
              Trash Can
            </Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/dashboard/leader-board">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Target className="h-4 w-4" />
              Leader Board
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Card className="glass-card p-4">
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
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            Trash Can Control Center
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Monitor and control your smart trash cans in real-time across all locations
          </p>
        </div>

        <Card className="glass-card glass-card-hover p-6 mb-8 border-border/50">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Live Location Map
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Click on any marker to view bin details</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">{trashCans.length} Active Bins</Badge>
          </div>

          <div className="relative w-full h-[450px] md:h-[550px] bg-muted/30 rounded-xl border border-border/50 overflow-hidden map-grid-pattern">
            {/* Trash Can Markers */}
            {trashCans.map((bin) => (
              <button
                key={bin.id}
                onClick={() => handleBinSelect(bin.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                  selectedBinId === bin.id ? "z-20 scale-125" : "z-10"
                }`}
                style={{
                  left: `${bin.coordinates.x}%`,
                  top: `${bin.coordinates.y}%`,
                }}
              >
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                      bin.fillLevel >= 90
                        ? "bg-destructive glow-yellow animate-pulse"
                        : bin.fillLevel >= 70
                          ? "bg-secondary glow-yellow"
                          : "bg-primary glow-blue"
                    } ${selectedBinId === bin.id ? "ring-4 ring-primary/50 scale-110" : ""}`}
                  >
                    <MapPin className="h-7 w-7 text-white drop-shadow-lg" />
                  </div>

                  {/* Fill Level Badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                      bin.fillLevel >= 90 ? "bg-destructive" : bin.fillLevel >= 70 ? "bg-secondary" : "bg-primary"
                    }`}
                  >
                    {bin.fillLevel}%
                  </div>

                  {selectedBinId === bin.id && (
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 w-56 glass-card rounded-xl shadow-2xl p-4 z-30 border border-primary/30">
                      <div className="text-sm font-semibold text-foreground mb-1">{bin.name}</div>
                      <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {bin.location}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Fill Level:</span>
                          <span className={`font-semibold ${getTrashLevelColor(bin.fillLevel)}`}>{bin.fillLevel}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Temperature:</span>
                          <span className="font-semibold text-foreground">{bin.temperature}°C</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge
                            className={`text-xs h-5 ${
                              bin.status === "alert"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : "bg-primary/10 text-primary border-primary/20"
                            }`}
                          >
                            {bin.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 glass-card border-t border-l border-primary/30 rotate-45" />
                    </div>
                  )}
                </div>
              </button>
            ))}

            <div className="absolute bottom-4 right-4 glass-card rounded-lg p-4 shadow-xl border border-border/50">
              <div className="text-xs font-semibold text-foreground mb-3">Status Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-primary glow-blue" />
                  <span className="text-muted-foreground">Normal (0-70%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-secondary glow-yellow" />
                  <span className="text-muted-foreground">Filling (70-90%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-destructive glow-yellow" />
                  <span className="text-muted-foreground">Full (90%+)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card glass-card-hover p-6 mb-8 border-border/50">
          <h3 className="text-xl font-semibold text-foreground mb-6">All Trash Cans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trashCans.map((bin) => (
              <button
                key={bin.id}
                onClick={() => handleBinSelect(bin.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                  selectedBinId === bin.id
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border/50 glass-card glass-card-hover"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-base">{bin.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {bin.location}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      bin.status === "alert"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {bin.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Fill Level</span>
                    <span className={`text-sm font-bold ${getTrashLevelColor(bin.fillLevel)}`}>{bin.fillLevel}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted/50">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bin.fillLevel >= 90 ? "bg-destructive" : bin.fillLevel >= 70 ? "bg-secondary" : "bg-primary"
                      }`}
                      style={{ width: `${bin.fillLevel}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Temp:</span>
                      <span className="ml-1 font-medium text-foreground">{bin.temperature}°C</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Odor:</span>
                      <span className="ml-1 font-medium text-foreground">{bin.odorLevel}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{selectedBin.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {selectedBin.location} • ID: {selectedBin.id}
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">Selected Device</Badge>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <Badge
                className={`${trashLevel <= 50 ? "bg-primary/10 text-primary border-primary/20" : trashLevel <= 80 ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}
              >
                {trashLevel <= 50 ? "Normal" : trashLevel <= 80 ? "Filling" : "Full"}
              </Badge>
            </div>
            <p className={`text-4xl font-bold mb-2 ${getTrashLevelColor(trashLevel)}`}>{trashLevel}%</p>
            <p className="text-sm text-muted-foreground mb-3">Fill Level</p>
            <div className="h-2 overflow-hidden rounded-full bg-muted/50">
              <div
                className={`h-full rounded-full transition-all duration-500 ${trashLevel <= 50 ? "bg-primary" : trashLevel <= 80 ? "bg-secondary" : "bg-destructive"}`}
                style={{ width: `${trashLevel}%` }}
              />
            </div>
          </Card>

          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Thermometer className="h-6 w-6 text-secondary" />
              </div>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">Optimal</Badge>
            </div>
            <p className="text-4xl font-bold text-foreground mb-2">{temperature}°C</p>
            <p className="text-sm text-muted-foreground mb-1">Temperature</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Internal: 24°C
            </p>
          </Card>

          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/50">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">Good</Badge>
            </div>
            <p className="text-4xl font-bold text-foreground mb-2">{odorLevel}</p>
            <p className="text-sm text-muted-foreground mb-1">Odor Level</p>
            <p className="text-xs text-muted-foreground">Air quality: 95%</p>
          </Card>

          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">Normal</Badge>
            </div>
            <p className="text-4xl font-bold text-foreground mb-2">{humidity}%</p>
            <p className="text-sm text-muted-foreground mb-1">Humidity</p>
            <p className="text-xs text-muted-foreground">Optimal range</p>
          </Card>
        </div>

        {/* Lid Control & Status */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Lid Control
            </h3>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-52 h-52 mb-4 flex items-center justify-center">
                <div
                  className={`transition-transform duration-500 ${lidStatus === "open" ? "rotate-[-45deg]" : "rotate-0"}`}
                >
                  <div className="w-48 h-6 bg-primary rounded-lg shadow-xl" />
                </div>
                <div className="absolute bottom-0 w-52 h-28 bg-muted rounded-t-xl border-2 border-border/50" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`text-4xl font-bold capitalize ${lidStatus === "open" ? "text-primary" : "text-foreground"}`}
                >
                  {lidStatus}
                </span>
                <div
                  className={`w-5 h-5 rounded-full ${lidStatus === "open" ? "bg-primary animate-pulse" : "bg-muted"}`}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="glass-card glass-card-hover py-3 bg-transparent"
                  onClick={() => handleLidControl("open")}
                  disabled={lidStatus === "open"}
                >
                  <ChevronUp className="h-5 w-5 mr-2" />
                  Open Lid
                </Button>
                <Button
                  variant="outline"
                  className="glass-card glass-card-hover py-3 bg-transparent"
                  onClick={() => handleLidControl("close")}
                  disabled={lidStatus === "closed"}
                >
                  <ChevronDown className="h-5 w-5 mr-2" />
                  Close Lid
                </Button>
              </div>
            </div>
            <div className="space-y-3 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Power className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="auto-lid" className="text-sm text-muted-foreground cursor-pointer">
                    Auto Open/Close
                  </Label>
                </div>
                <Switch id="auto-lid" checked={autoLidEnabled} onCheckedChange={setAutoLidEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Label htmlFor="sound" className="text-sm text-muted-foreground cursor-pointer">
                    Sound Alerts
                  </Label>
                </div>
                <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {childLockEnabled ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Unlock className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Label htmlFor="child-lock" className="text-sm text-muted-foreground cursor-pointer">
                    Child Lock
                  </Label>
                </div>
                <Switch id="child-lock" checked={childLockEnabled} onCheckedChange={setChildLockEnabled} />
              </div>
            </div>
          </Card>

          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Trash Can Settings
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm text-muted-foreground">Compaction Level</Label>
                  <span className="text-sm font-medium text-foreground">{compactionLevel[0]}/5</span>
                </div>
                <Slider
                  value={compactionLevel}
                  onValueChange={setCompactionLevel}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Higher levels compress waste more but use more power
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="night-mode" className="text-sm text-muted-foreground cursor-pointer">
                    Night Mode (Quiet)
                  </Label>
                </div>
                <Switch id="night-mode" checked={nightModeEnabled} onCheckedChange={setNightModeEnabled} />
              </div>

              <div className="rounded-lg border border-border/50 bg-accent/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Last Emptied</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground mb-1">{formatLastEmptied()}</p>
                <p className="text-xs text-muted-foreground">{lastEmptied.toLocaleDateString()}</p>
              </div>

              <Button className="w-full py-3" onClick={handleEmptyBin}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Mark as Emptied
              </Button>
            </div>
          </Card>
        </div>

        {/* Sensor Calibration */}
        <Card className="glass-card glass-card-hover p-6 mb-8 border-border/50">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            Sensor Calibration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="justify-start gap-3 glass-card glass-card-hover py-3 bg-transparent"
              onClick={() => handleCalibrateSensor("Fill Level", setIsCalibratingFill)}
              disabled={isCalibratingFill}
            >
              <Gauge className={`h-4 w-4 ${isCalibratingFill ? "animate-spin" : ""}`} />
              {isCalibratingFill ? "Calibrating..." : "Calibrate Fill Sensor"}
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 glass-card glass-card-hover py-3 bg-transparent"
              onClick={() => handleCalibrateSensor("Temperature", setIsCalibratingTemp)}
              disabled={isCalibratingTemp}
            >
              <Thermometer className={`h-4 w-4 ${isCalibratingTemp ? "animate-spin" : ""}`} />
              {isCalibratingTemp ? "Calibrating..." : "Calibrate Temperature"}
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 glass-card glass-card-hover py-3 bg-transparent"
              onClick={() => handleCalibrateSensor("Odor", setIsCalibratingOdor)}
              disabled={isCalibratingOdor}
            >
              <Wind className={`h-4 w-4 ${isCalibratingOdor ? "animate-spin" : ""}`} />
              {isCalibratingOdor ? "Calibrating..." : "Calibrate Odor Sensor"}
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-3 glass-card glass-card-hover py-3 bg-transparent"
              onClick={() => handleCalibrateSensor("Weight", setIsCalibratingWeight)}
              disabled={isCalibratingWeight}
            >
              <Gauge className={`h-4 w-4 ${isCalibratingWeight ? "animate-spin" : ""}`} />
              {isCalibratingWeight ? "Calibrating..." : "Calibrate Weight Sensor"}
            </Button>
          </div>
        </Card>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Fill Level History</h3>
                <p className="text-sm text-muted-foreground">Last 24 hours</p>
              </div>
              <Gauge className="h-5 w-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={fillHistoryData}>
                <defs>
                  <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="hour" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                  cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#fillGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="glass-card glass-card-hover p-6 border-border/50">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Temperature Monitoring</h3>
                <p className="text-sm text-muted-foreground">Last 6 hours</p>
              </div>
              <Thermometer className="h-5 w-5 text-secondary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={temperatureData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="time" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                  cursor={false}
                />
                <Bar dataKey="temp" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* System Status */}
        <Card className="glass-card glass-card-hover p-6 border-border/50 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            System Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/30">
              <Wifi className="h-7 w-7 text-primary mb-3" />
              <p className="text-xs text-muted-foreground mb-1">Wi-Fi</p>
              <p className="text-sm font-medium text-foreground">Strong</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/30">
              <Battery className="h-7 w-7 text-primary mb-3" />
              <p className="text-xs text-muted-foreground mb-1">Battery</p>
              <p className="text-sm font-medium text-foreground">94%</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/30">
              <Power className="h-7 w-7 text-secondary mb-3" />
              <p className="text-xs text-muted-foreground mb-1">Power</p>
              <p className="text-sm font-medium text-foreground">AC</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/30">
              <MapPin className="h-7 w-7 text-primary mb-3" />
              <p className="text-xs text-muted-foreground mb-1">GPS</p>
              <p className="text-sm font-medium text-foreground">Active</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/30">
              <Bell className="h-7 w-7 text-primary mb-3" />
              <p className="text-xs text-muted-foreground mb-1">Alerts</p>
              <p className="text-sm font-medium text-foreground">On</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/30">
              <AlertTriangle className="h-7 w-7 text-destructive mb-3" />
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-medium text-destructive">Alert</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            className="glass-card glass-card-hover bg-transparent"
            onClick={handleRunDiagnostics}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Diagnostics"}
          </Button>
          <Button className="py-3 px-5" onClick={handleSaveSettings} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </main>
    </div>
  )
}
