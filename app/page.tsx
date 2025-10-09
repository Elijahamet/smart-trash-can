"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Recycle,
  Sparkles,
  Leaf,
  Smartphone,
  Award,
  BarChart3,
  Bell,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg glow-effect">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Smart TrashCan</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Benefits
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hover:text-primary">
              Sign In
            </Button>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#benefits"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefits
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button variant="ghost" size="sm" className="hover:text-primary w-full">
                  Sign In
                </Button>
                <Link href="/dashboard">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
          <Badge className="bg-accent text-accent-foreground border-0 px-4 py-1.5 shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI-Powered Waste Management
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-[1.1] tracking-tight animate-slide-up">
            The smartest way to manage your <span className="text-gradient">waste</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed animate-slide-up">
            Transform your home into an eco-friendly smart space. Track recycling, reduce waste, and earn rewards while
            saving the planet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 animate-fade-in">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all glow-effect w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 bg-transparent hover:bg-accent hover:scale-105 transition-all w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>
          <div className="pt-8 animate-scale-in">
            <img
              src="/modern-smart-trash-can-with-led-display-touchscree.jpg"
              alt="Smart TrashCan Product"
              className="rounded-2xl shadow-2xl mx-auto border-2 border-border/50 hover:scale-[1.02] transition-transform duration-500 w-full max-w-3xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground py-12 md:py-16 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">85%</div>
              <div className="text-sm opacity-90 font-medium">Waste Reduction</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">50K+</div>
              <div className="text-sm opacity-90 font-medium">Active Users</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">2M+</div>
              <div className="text-sm opacity-90 font-medium">Items Sorted</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">$200</div>
              <div className="text-sm opacity-90 font-medium">Avg. Savings/Year</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-accent text-accent-foreground border-0 mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
            Everything you need for smart waste management
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Powered by AI and IoT sensors to make recycling effortless and rewarding
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">AI Waste Sorting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced AI automatically identifies and sorts recyclables, compost, and trash with 99% accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Smart App Control</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor waste levels, track recycling stats, and get personalized tips through our intuitive mobile app.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Real-Time Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visualize your environmental impact with detailed analytics and insights on your waste patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Rewards Program</h3>
              <p className="text-muted-foreground leading-relaxed">
                Earn points for recycling correctly and redeem them for eco-friendly products and discounts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Smart Notifications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get alerts when bins are full, pickup days are near, or when you've reached recycling milestones.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Carbon Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                See your carbon footprint reduction in real-time and contribute to a healthier planet.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-gradient-to-b from-accent/20 to-accent/40 py-12 md:py-20 lg:py-32 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="bg-primary text-primary-foreground border-0 mb-4 shadow-md">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
              Simple setup, powerful results
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Get started in minutes and start making a difference today
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all glow-effect">
                1
              </div>
              <h3 className="text-2xl font-semibold">Unbox & Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simply plug in your Smart TrashCan and connect it to your Wi-Fi through our app in under 2 minutes.
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all glow-effect">
                2
              </div>
              <h3 className="text-2xl font-semibold">Start Disposing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Throw items in as usual. Our AI sensors automatically identify and sort everything correctly.
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all glow-effect">
                3
              </div>
              <h3 className="text-2xl font-semibold">Track & Earn</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor your impact, earn rewards, and watch your environmental contribution grow every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <div>
            <Badge className="bg-accent text-accent-foreground border-0 mb-4">Benefits</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight">
              Why choose Smart TrashCan?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 group hover:translate-x-2 transition-transform">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Save Money</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Reduce waste disposal costs and earn rewards that translate to real savings on your monthly bills.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group hover:translate-x-2 transition-transform">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Protect the Planet</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every correctly sorted item helps reduce landfill waste and contributes to a cleaner environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group hover:translate-x-2 transition-transform">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Effortless Recycling</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No more guessing or sorting. Our AI does all the work so you can focus on what matters.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group hover:translate-x-2 transition-transform">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Home Integration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Works seamlessly with Alexa, Google Home, and Apple HomeKit for voice control and automation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl"></div>
            <img
              src="/smartphone-app-interface-showing-recycling-statist.jpg"
              alt="Smart TrashCan App Interface"
              className="rounded-2xl shadow-2xl border-2 border-border/50 relative z-10 hover:scale-[1.02] transition-transform duration-500 w-full"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-accent/20 to-accent/40 py-12 md:py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="bg-primary text-primary-foreground border-0 mb-4 shadow-md">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight">
              Loved by eco-conscious families
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-card-foreground leading-relaxed font-medium">
                  "This has completely changed how our family thinks about waste. We've reduced our trash by 70% in just
                  3 months!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    SJ
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Portland, OR</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-card-foreground leading-relaxed font-medium">
                  "The AI sorting is incredibly accurate. My kids love competing to see who can recycle the most each
                  week!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    MC
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-card-foreground leading-relaxed font-medium">
                  "Best smart home purchase we've made. The rewards program has already paid for half the device!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    EP
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Emily Parker</div>
                    <div className="text-sm text-muted-foreground">Austin, TX</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
        <div className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground rounded-3xl p-8 md:p-12 lg:p-20 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight">
              Ready to make a difference?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
              Join thousands of families already reducing waste and earning rewards. Start your free 30-day trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">Smart TrashCan</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Making waste management smarter, one home at a time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Warranty
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Smart TrashCan. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Shield className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Zap className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
