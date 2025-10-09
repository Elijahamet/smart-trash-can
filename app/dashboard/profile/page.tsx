"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  Activity,
  Target,
  Settings,
  User,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Award,
  Leaf,
  TrendingUp,
  Trash2,
  Edit,
  Camera,
  Save,
  X,
  Menu,
  Bell,
  Shield,
  CreditCard,
  Globe,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about sustainability and reducing waste. Proud eco-warrior!",
    joinDate: "January 15, 2024",
  })
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleProfilePictureUpload = () => {
    setIsUploading(true)
    toast({
      title: "Uploading Photo",
      description: "Your profile picture is being uploaded...",
    })

    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Upload Complete",
        description: "Profile picture has been updated successfully.",
      })
    }, 2000)
  }

  const handleNavigateToNotifications = () => {
    window.location.href = "/dashboard/settings?tab=notifications"
  }

  const handleNavigateToPrivacy = () => {
    window.location.href = "/dashboard/settings?tab=privacy"
  }

  const handleNavigateToBilling = () => {
    window.location.href = "/dashboard/settings?tab=billing"
  }

  const handleNavigateToLanguage = () => {
    window.location.href = "/dashboard/settings?tab=general"
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
            <p className="text-xs text-muted-foreground">Profile</p>
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
              className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary/20"
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
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Profile</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Header */}
        <Card className="border-border bg-card p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
                AJ
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-lg"
                onClick={handleProfilePictureUpload}
                disabled={isUploading}
              >
                <Camera className={`h-4 w-4 ${isUploading ? "animate-pulse" : ""}`} />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">Member since {profile.joinDate}</p>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-0">Eco Warrior</Badge>
                <Badge className="bg-secondary/10 text-secondary border-0">Top 5%</Badge>
                <Badge className="bg-accent text-accent-foreground border-0">Verified</Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Profile Information */}
          <Card className="border-border bg-card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-accent/30">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{profile.name}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-accent/30">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{profile.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm text-muted-foreground mb-2 block">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-accent/30">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{profile.phone}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm text-muted-foreground mb-2 block">
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-accent/30">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="bio" className="text-sm text-muted-foreground mb-2 block">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <div className="p-3 rounded-lg border border-border bg-accent/30">
                    <p className="text-sm text-foreground">{profile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Trash2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Items Sorted</p>
                    <p className="text-lg font-bold text-foreground">2,847</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Leaf className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                    <p className="text-lg font-bold text-foreground">156 kg</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                    <p className="text-lg font-bold text-foreground">12</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rank</p>
                    <p className="text-lg font-bold text-foreground">#47</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="border-border bg-card p-6 mb-6 md:mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Achievements & Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-accent/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-3">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground text-center mb-1">Eco Warrior</p>
              <p className="text-xs text-muted-foreground text-center">1000+ items sorted</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-accent/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mb-3">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-sm font-medium text-foreground text-center mb-1">Green Champion</p>
              <p className="text-xs text-muted-foreground text-center">100kg CO₂ saved</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-accent/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-3">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground text-center mb-1">Top Performer</p>
              <p className="text-xs text-muted-foreground text-center">Top 5% ranking</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-muted/50 opacity-50">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-3">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground text-center mb-1">Perfect Week</p>
              <p className="text-xs text-muted-foreground text-center">7 days streak</p>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Account Settings</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={handleNavigateToNotifications}
              >
                <Bell className="h-4 w-4" />
                Notification Preferences
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={handleNavigateToPrivacy}
              >
                <Shield className="h-4 w-4" />
                Privacy & Security
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={handleNavigateToBilling}
              >
                <CreditCard className="h-4 w-4" />
                Billing & Subscription
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={handleNavigateToLanguage}
              >
                <Globe className="h-4 w-4" />
                Language & Region
              </Button>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Activity Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Sessions</span>
                <span className="text-sm font-medium text-foreground">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Daily Usage</span>
                <span className="text-sm font-medium text-foreground">4.2 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recycling Rate</span>
                <span className="text-sm font-medium text-foreground">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Streak Days</span>
                <span className="text-sm font-medium text-foreground">28 days</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
