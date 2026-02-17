import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Users, Stethoscope, Image as ImageIcon, Activity,
  LogOut, Settings, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, label: "Total Users", value: "1,245", color: "bg-primary/10 text-primary" },
  { icon: Stethoscope, label: "Total Dermatologists", value: "48", color: "bg-secondary/10 text-secondary" },
  { icon: ImageIcon, label: "Total Scans", value: "8,392", color: "bg-success/10 text-success" },
  { icon: Activity, label: "System Status", value: "Healthy", color: "bg-success/10 text-success" },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
  { id: 2, name: "Dr. Sarah Ahmed", email: "sarah@clinic.com", role: "Dermatologist", status: "Active" },
  { id: 3, name: "Ahmad Khan", email: "ahmad@mail.com", role: "User", status: "Active" },
  { id: 4, name: "Dr. Ali Hassan", email: "ali@health.com", role: "Dermatologist", status: "Inactive" },
  { id: 5, name: "Fatima Zahra", email: "fatima@mail.com", role: "User", status: "Active" },
  { id: 6, name: "Admin User", email: "admin@dermadetect.pro", role: "Admin", status: "Active" },
];

const roleColors: Record<string, string> = {
  User: "bg-accent text-accent-foreground",
  Dermatologist: "bg-secondary-light text-secondary",
  Admin: "bg-primary/10 text-primary",
};

export default function AdminPanelPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">DermaDetect</span>
            <span className="text-xs font-semibold text-gradient">ADMIN</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {[
            { icon: Activity, label: "Overview", active: true },
            { icon: Users, label: "Users" },
            { icon: Stethoscope, label: "Dermatologists" },
            { icon: ImageIcon, label: "Scans" },
            { icon: Settings, label: "Settings" },
          ].map((link) => (
            <button
              key={link.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                link.active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center">
          <h1 className="text-xl font-semibold text-foreground">Admin Panel</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">All Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                          user.status === "Active" ? "text-success" : "text-muted-foreground"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-success" : "bg-muted-foreground"}`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
