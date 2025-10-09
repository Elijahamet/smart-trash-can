"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import {
  Home,
  Activity,
  Target,
  Settings,
  User,
  Sparkles,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  Key,
  Zap,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Gauge,
  Thermometer,
  Clock,
  MapPin,
  LinkIcon,
  Code,
  HelpCircle,
  FileText,
  Menu,
  X,
  Leaf,
  Save,
  RefreshCw,
  AlertTriangle,
  Palette,
  Languages,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // General Settings
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("America/Los_Angeles")
  const [temperatureUnit, setTemperatureUnit] = useState<"celsius" | "fahrenheit">("celsius")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(true)

  // Device Settings
  const [deviceName, setDeviceName] = useState("Kitchen Bin")
  const [sensorSensitivity, setSensorSensitivity] = useState([75])
  const [autoLid, setAutoLid] = useState(true)
  const [nightMode, setNightMode] = useState(false)
  const [compactionLevel, setCompactionLevel] = useState([3])

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [fullBinAlert, setFullBinAlert] = useState(true)
  const [maintenanceAlert, setMaintenanceAlert] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [achievementAlert, setAchievementAlert] = useState(true)

  // Privacy & Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)
  const [locationTracking, setLocationTracking] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // Integration Settings
  const [alexaIntegration, setAlexaIntegration] = useState(false)
  const [googleHomeIntegration, setGoogleHomeIntegration] = useState(false)
  const [iftttIntegration, setIftttIntegration] = useState(false)

  // Advanced Settings
  const [developerMode, setDeveloperMode] = useState(false)
  const [apiAccess, setApiAccess] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  // Toast hook and loading states
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)

  // Functional handlers for all settings actions
  const handleSaveSettings = (section: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: `Your ${section} settings have been updated successfully.`,
      })
    }, 1000)
  }

  const handleResetToDefault = () => {
    if (confirm("Are you sure you want to reset all settings to default? This action cannot be undone.")) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Settings Reset",
          description: "All settings have been restored to default values.",
        })
      }, 1500)
    }
  }

  const handleTestNotifications = () => {
    setIsTesting(true)
    toast({
      title: "Test Notification",
      description: "This is a test notification. If you can see this, notifications are working correctly!",
    })
    setTimeout(() => {
      setIsTesting(false)
    }, 2000)
  }

  const handleUpdatePassword = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      })
    }, 1500)
  }

  const handleDownloadData = () => {
    toast({
      title: "Preparing Download",
      description: "Your data export is being prepared...",
    })
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: "Your data has been exported successfully.",
      })
    }, 2000)
  }

  const handleDeleteAllData = () => {
    if (
      confirm(
        "⚠️ WARNING: This will permanently delete all your data. This action cannot be undone. Are you absolutely sure?",
      )
    ) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Data Deleted",
          description: "All your data has been permanently deleted.",
          variant: "destructive",
        })
      }, 2000)
    }
  }

  const handleChangePlan = () => {
    toast({
      title: "Opening Plans",
      description: "Redirecting to subscription plans...",
    })
    setTimeout(() => {
      window.location.href = "/pricing"
    }, 1000)
  }

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription? You will lose access to premium features.")) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription has been cancelled. You'll have access until the end of your billing period.",
        })
      }, 1500)
    }
  }

  const handleAddPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "Opening payment form...",
    })
  }

  const handleDownloadInvoice = (date: string) => {
    toast({
      title: "Downloading Invoice",
      description: `Invoice for ${date} is being downloaded...`,
    })
  }

  const handleConnectApp = () => {
    toast({
      title: "Connect App",
      description: "Opening app connection wizard...",
    })
  }

  const handleGenerateAPIKey = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "API Key Generated",
        description: "A new API key has been created. Please save it securely.",
      })
    }, 1000)
  }

  const handleRevokeAPIKey = () => {
    if (confirm("Are you sure you want to revoke this API key? Applications using this key will stop working.")) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "API Key Revoked",
          description: "The API key has been revoked successfully.",
          variant: "destructive",
        })
      }, 1000)
    }
  }

  const handleFactoryReset = () => {
    if (
      confirm(
        "⚠️ CRITICAL WARNING: This will reset your device to factory settings and delete ALL data. This cannot be undone. Type 'RESET' to confirm.",
      )
    ) {
      const confirmation = prompt("Type 'RESET' to confirm factory reset:")
      if (confirmation === "RESET") {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          toast({
            title: "Factory Reset Complete",
            description: "Device has been reset to factory settings.",
            variant: "destructive",
          })
        }, 3000)
      }
    }
  }

  const handleExportConfig = () => {
    toast({
      title: "Exporting Configuration",
      description: "Your configuration file is being prepared...",
    })
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Configuration has been exported successfully.",
      })
    }, 1500)
  }

  const handleImportConfig = () => {
    toast({
      title: "Import Configuration",
      description: "Please select a configuration file to import...",
    })
  }

  const handleSubmitFeedback = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it shortly.",
      })
    }, 1000)
  }

  const handleOpenHelp = (section: string) => {
    toast({
      title: `Opening ${section}`,
      description: "Redirecting to help resources...",
    })
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
            <p className="text-xs text-muted-foreground">Settings</p>
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
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Target className="h-4 w-4" />
              Leader Board
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary/20"
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
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Settings</h2>
          <p className="text-sm md:text-base text-muted-foreground">Customize your Smart TrashCan experience</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="device">Device</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Sun className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <Label className="text-sm font-medium text-foreground">Dark Mode</Label>
                      <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Color Theme</Label>
                      <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
                    </div>
                  </div>
                  <select className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
                    <option>Green (Default)</option>
                    <option>Blue</option>
                    <option>Purple</option>
                    <option>Orange</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Language & Region</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Language</Label>
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Timezone</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Temperature Unit</Label>
                    <p className="text-xs text-muted-foreground">Display temperature in Celsius or Fahrenheit</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={temperatureUnit === "celsius" ? "default" : "outline"}
                      onClick={() => setTemperatureUnit("celsius")}
                    >
                      °C
                    </Button>
                    <Button
                      size="sm"
                      variant={temperatureUnit === "fahrenheit" ? "default" : "outline"}
                      onClick={() => setTemperatureUnit("fahrenheit")}
                    >
                      °F
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">System Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? (
                      <Volume2 className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <Label className="text-sm font-medium text-foreground">Sound Effects</Label>
                      <p className="text-xs text-muted-foreground">Enable audio feedback for actions</p>
                    </div>
                  </div>
                  <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Auto Update</Label>
                      <p className="text-xs text-muted-foreground">Automatically install firmware updates</p>
                    </div>
                  </div>
                  <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleResetToDefault} disabled={isLoading}>
                Reset to Default
              </Button>
              <Button onClick={() => handleSaveSettings("general")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Device Settings */}
          <TabsContent value="device" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Device Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="device-name" className="text-sm text-muted-foreground mb-2 block">
                    Device Name
                  </Label>
                  <Input
                    id="device-name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="Enter device name"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-muted-foreground">Sensor Sensitivity</Label>
                    <span className="text-sm font-medium text-foreground">{sensorSensitivity[0]}%</span>
                  </div>
                  <Slider value={sensorSensitivity} onValueChange={setSensorSensitivity} max={100} min={0} step={5} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Adjust how sensitive the sensors are to detecting waste
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-muted-foreground">Compaction Level</Label>
                    <span className="text-sm font-medium text-foreground">{compactionLevel[0]}/5</span>
                  </div>
                  <Slider value={compactionLevel} onValueChange={setCompactionLevel} max={5} min={1} step={1} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Higher levels compress waste more but use more power
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Smart Features</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Auto Lid Open/Close</Label>
                    <p className="text-xs text-muted-foreground">Automatically open lid when motion detected</p>
                  </div>
                  <Switch checked={autoLid} onCheckedChange={setAutoLid} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Night Mode</Label>
                    <p className="text-xs text-muted-foreground">Reduce noise and LED brightness at night</p>
                  </div>
                  <Switch checked={nightMode} onCheckedChange={setNightMode} />
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Sensor Calibration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start gap-3 bg-transparent">
                  <Gauge className="h-4 w-4" />
                  Calibrate Fill Sensor
                </Button>
                <Button variant="outline" className="justify-start gap-3 bg-transparent">
                  <Thermometer className="h-4 w-4" />
                  Calibrate Temperature
                </Button>
                <Button variant="outline" className="justify-start gap-3 bg-transparent">
                  <Gauge className="h-4 w-4" />
                  Calibrate Odor Sensor
                </Button>
                <Button variant="outline" className="justify-start gap-3 bg-transparent">
                  <Gauge className="h-4 w-4" />
                  Calibrate Weight Sensor
                </Button>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleTestNotifications} disabled={isTesting}>
                {isTesting ? "Testing..." : "Run Diagnostics"}
              </Button>
              <Button onClick={() => handleSaveSettings("device")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Notification Channels</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Get instant alerts on your device</p>
                    </div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">SMS Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive text messages for critical alerts</p>
                    </div>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Alert Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Full Bin Alert</Label>
                    <p className="text-xs text-muted-foreground">Notify when trash can is 90% full</p>
                  </div>
                  <Switch checked={fullBinAlert} onCheckedChange={setFullBinAlert} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Maintenance Reminders</Label>
                    <p className="text-xs text-muted-foreground">Get alerts for filter changes and cleaning</p>
                  </div>
                  <Switch checked={maintenanceAlert} onCheckedChange={setMaintenanceAlert} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Weekly Reports</Label>
                    <p className="text-xs text-muted-foreground">Receive weekly waste management summaries</p>
                  </div>
                  <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Achievement Alerts</Label>
                    <p className="text-xs text-muted-foreground">Get notified when you earn new badges</p>
                  </div>
                  <Switch checked={achievementAlert} onCheckedChange={setAchievementAlert} />
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Quiet Hours</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Start Time</Label>
                    <Input type="time" defaultValue="22:00" />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">End Time</Label>
                    <Input type="time" defaultValue="07:00" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Notifications will be silenced during these hours</p>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleTestNotifications} disabled={isTesting}>
                {isTesting ? "Sending..." : "Test Notifications"}
              </Button>
              <Button onClick={() => handleSaveSettings("notification")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Privacy & Security */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Account Security</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Change Password</Label>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button size="sm" onClick={handleUpdatePassword} disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Biometric Authentication</Label>
                      <p className="text-xs text-muted-foreground">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <Switch checked={biometricAuth} onCheckedChange={setBiometricAuth} />
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Data Sharing</Label>
                    <p className="text-xs text-muted-foreground">Share anonymous usage data to improve service</p>
                  </div>
                  <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Location Tracking</Label>
                      <p className="text-xs text-muted-foreground">Allow GPS tracking for device location</p>
                    </div>
                  </div>
                  <Switch checked={locationTracking} onCheckedChange={setLocationTracking} />
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Data Management</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={handleDownloadData}
                >
                  <Download className="h-4 w-4" />
                  Download My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={handleDownloadData}
                >
                  <Upload className="h-4 w-4" />
                  Export Usage History
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent"
                  onClick={handleDeleteAllData}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete All Data
                </Button>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSaveSettings("privacy")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Billing & Subscription */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
                  <p className="text-sm text-muted-foreground">Premium Plan</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">Active</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan Type</span>
                  <span className="text-sm font-medium text-foreground">Premium Annual</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="text-sm font-medium text-foreground">$99.99/year</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Next Billing Date</span>
                  <span className="text-sm font-medium text-foreground">January 15, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Auto-Renewal</span>
                  <Badge className="bg-secondary/10 text-secondary border-0">Enabled</Badge>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleChangePlan}>
                  Change Plan
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Payment Method</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-accent/30">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0">Default</Badge>
                </div>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleAddPaymentMethod}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Billing History</h3>
              <div className="space-y-3">
                {[
                  { date: "Jan 15, 2024", amount: "$99.99", status: "Paid" },
                  { date: "Jan 15, 2023", amount: "$99.99", status: "Paid" },
                  { date: "Jan 15, 2022", amount: "$99.99", status: "Paid" },
                ].map((invoice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/30"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{invoice.date}</p>
                      <p className="text-xs text-muted-foreground">Annual Subscription</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">{invoice.amount}</span>
                      <Badge className="bg-primary/10 text-primary border-0">{invoice.status}</Badge>
                      <Button size="sm" variant="ghost" onClick={() => handleDownloadInvoice(invoice.date)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Smart Home Integration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Amazon Alexa</Label>
                      <p className="text-xs text-muted-foreground">Control with voice commands</p>
                    </div>
                  </div>
                  <Switch checked={alexaIntegration} onCheckedChange={setAlexaIntegration} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Smartphone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Google Home</Label>
                      <p className="text-xs text-muted-foreground">Integrate with Google Assistant</p>
                    </div>
                  </div>
                  <Switch checked={googleHomeIntegration} onCheckedChange={setGoogleHomeIntegration} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">IFTTT</Label>
                      <p className="text-xs text-muted-foreground">Create custom automations</p>
                    </div>
                  </div>
                  <Switch checked={iftttIntegration} onCheckedChange={setIftttIntegration} />
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Connected Apps</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={handleConnectApp}
                >
                  <LinkIcon className="h-4 w-4" />
                  Connect New App
                </Button>
                <div className="p-4 rounded-lg border border-border bg-accent/30 text-center">
                  <p className="text-sm text-muted-foreground">No apps connected yet</p>
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSaveSettings("integrations")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Advanced Settings</h3>
                  <p className="text-sm text-muted-foreground">For advanced users only</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">Developer Mode</Label>
                      <p className="text-xs text-muted-foreground">Enable advanced debugging features</p>
                    </div>
                  </div>
                  <Switch checked={developerMode} onCheckedChange={setDeveloperMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium text-foreground">API Access</Label>
                      <p className="text-xs text-muted-foreground">Generate API keys for custom integrations</p>
                    </div>
                  </div>
                  <Switch checked={apiAccess} onCheckedChange={setApiAccess} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Debug Mode</Label>
                    <p className="text-xs text-muted-foreground">Show detailed system logs</p>
                  </div>
                  <Switch checked={debugMode} onCheckedChange={setDebugMode} />
                </div>
              </div>
            </Card>

            {apiAccess && (
              <Card className="border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">API Keys</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">API Key</Label>
                    <div className="flex gap-2">
                      <Input type={showPassword ? "text" : "password"} value="sk_live_1234567890abcdef" readOnly />
                      <Button size="icon" variant="outline" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={handleGenerateAPIKey}
                      disabled={isLoading}
                    >
                      {isLoading ? "Generating..." : "Generate New Key"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={handleRevokeAPIKey}
                      disabled={isLoading}
                    >
                      {isLoading ? "Revoking..." : "Revoke Key"}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">System Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={handleResetToDefault}
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset All Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={handleExportConfig}
                >
                  <Download className="h-4 w-4" />
                  Export Configuration
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={handleImportConfig}
                >
                  <Upload className="h-4 w-4" />
                  Import Configuration
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent"
                  onClick={handleFactoryReset}
                >
                  <Trash2 className="h-4 w-4" />
                  Factory Reset
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Support */}
          <TabsContent value="support" className="space-y-6">
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Help & Support</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={() => handleOpenHelp("FAQs")}
                >
                  <HelpCircle className="h-4 w-4" />
                  FAQs & Help Center
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={() => handleOpenHelp("User Manual")}
                >
                  <FileText className="h-4 w-4" />
                  User Manual
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={() => handleOpenHelp("Support")}
                >
                  <MessageSquare className="h-4 w-4" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                  onClick={() => handleOpenHelp("Community")}
                >
                  <Globe className="h-4 w-4" />
                  Community Forum
                </Button>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">System Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">App Version</span>
                  <span className="text-sm font-medium text-foreground">2.4.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Firmware Version</span>
                  <span className="text-sm font-medium text-foreground">1.8.3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Device ID</span>
                  <span className="text-sm font-medium text-foreground">STC-4892-KX</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Update</span>
                  <span className="text-sm font-medium text-foreground">2 days ago</span>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Feedback</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Send us your feedback</Label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm min-h-[100px]"
                    placeholder="Tell us what you think..."
                  />
                </div>
                <Button className="w-full" onClick={handleSubmitFeedback} disabled={isLoading}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {isLoading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
