import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Upload, 
  History, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Bell, 
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for scan history
const scanHistory = [
  {
    id: 1,
    date: "2024-01-15",
    condition: "Eczema",
    confidence: 94.5,
    status: "reviewed",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    date: "2024-01-10",
    condition: "Psoriasis",
    confidence: 87.2,
    status: "pending",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    date: "2024-01-05",
    condition: "Contact Dermatitis",
    confidence: 91.8,
    status: "reviewed",
    image: "/placeholder.svg",
  },
];

const sidebarLinks = [
  { icon: Upload, label: "New Scan", href: "/upload", primary: true },
  { icon: History, label: "Scan History", href: "/dashboard" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">DermaDetect</span>
            <span className="text-xs font-semibold text-gradient">PRO</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                link.primary
                  ? "bg-gradient-primary text-primary-foreground shadow-md hover:shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">John Doe</p>
              <p className="text-sm text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, John!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <Link to="/upload">
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4" />
                New Scan
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground">12</span>
              </div>
              <p className="text-muted-foreground">Total Scans</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <span className="text-2xl font-bold text-foreground">8</span>
              </div>
              <p className="text-muted-foreground">Reviewed by Expert</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <span className="text-2xl font-bold text-foreground">4</span>
              </div>
              <p className="text-muted-foreground">Pending Review</p>
            </motion.div>
          </div>

          {/* Recent Scans */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Scans</h2>
              <Link to="/history" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {scanHistory.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={scan.image}
                      alt="Scan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{scan.condition}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        scan.status === "reviewed"
                          ? "bg-success-light text-success"
                          : "bg-warning-light text-warning"
                      }`}>
                        {scan.status === "reviewed" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            Reviewed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Pending
                          </>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(scan.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gradient">{scan.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                  <Link to={`/results/${scan.id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground"
            >
              <h3 className="text-xl font-semibold mb-2">Start a New Scan</h3>
              <p className="text-primary-foreground/80 mb-4">
                Upload a skin image for instant AI-powered analysis.
              </p>
              <Link to="/upload">
                <Button variant="glass" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Medical Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    Results are for informational purposes only. Always consult a healthcare professional for medical advice.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
