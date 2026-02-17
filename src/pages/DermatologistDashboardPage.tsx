import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Clock, CheckCircle2, User, LogOut, FileText,
  ChevronRight, AlertCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockCases = [
  { id: 1, patient: "Ahmad K.", date: "2024-01-15", condition: "Eczema", confidence: 94.5, status: "pending", image: "/placeholder.svg" },
  { id: 2, patient: "Sara M.", date: "2024-01-14", condition: "Psoriasis", confidence: 87.2, status: "pending", image: "/placeholder.svg" },
  { id: 3, patient: "Ali R.", date: "2024-01-12", condition: "Contact Dermatitis", confidence: 91.8, status: "reviewed", image: "/placeholder.svg" },
  { id: 4, patient: "Fatima Z.", date: "2024-01-10", condition: "Acne Vulgaris", confidence: 96.1, status: "reviewed", image: "/placeholder.svg" },
];

const sidebarLinks = [
  { icon: Clock, label: "Pending Cases", filter: "pending" },
  { icon: CheckCircle2, label: "Reviewed Cases", filter: "reviewed" },
  { icon: User, label: "Profile", filter: "" },
];

export default function DermatologistDashboardPage() {
  const [activeFilter, setActiveFilter] = useState("pending");
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { toast } = useToast();

  const filteredCases = activeFilter
    ? mockCases.filter((c) => c.status === activeFilter)
    : mockCases;

  const handleApprove = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      toast({ title: "Case Approved", description: `Case #${id} has been approved and feedback sent.` });
    }, 1500);
  };

  const handleReupload = (id: number) => {
    toast({ title: "Reupload Requested", description: `Patient has been notified to reupload for case #${id}.` });
  };

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
            <span className="text-xs font-semibold text-gradient">DOCTOR</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setActiveFilter(link.filter)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                activeFilter === link.filter
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
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              DR
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">Dr. Sarah Ahmed</p>
              <p className="text-sm text-muted-foreground truncate">Dermatologist</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Dermatologist Dashboard</h1>
            <p className="text-sm text-muted-foreground">Review AI-assisted skin analysis cases</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-warning-light text-warning rounded-full text-sm font-medium">
              <Clock className="w-3.5 h-3.5" />
              {mockCases.filter((c) => c.status === "pending").length} Pending
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {filteredCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">No Cases Found</h3>
              <p className="text-muted-foreground">There are no cases matching this filter.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full md:w-40 h-40 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                        <img src={caseItem.image} alt="Patient scan" className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{caseItem.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(caseItem.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            caseItem.status === "reviewed"
                              ? "bg-success-light text-success"
                              : "bg-warning-light text-warning"
                          }`}>
                            {caseItem.status === "reviewed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {caseItem.status === "reviewed" ? "Reviewed" : "Pending"}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">AI Prediction</p>
                            <p className="font-semibold text-foreground">{caseItem.condition}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Confidence</p>
                            <p className="font-bold text-gradient">{caseItem.confidence}%</p>
                          </div>
                        </div>

                        {caseItem.status === "pending" && (
                          <>
                            <Textarea
                              placeholder="Add your clinical notes here..."
                              value={notes[caseItem.id] || ""}
                              onChange={(e) => setNotes({ ...notes, [caseItem.id]: e.target.value })}
                              className="mb-3"
                              rows={3}
                            />
                            <div className="flex gap-3">
                              <Button
                                variant="hero"
                                size="sm"
                                onClick={() => handleApprove(caseItem.id)}
                                disabled={loadingId === caseItem.id}
                              >
                                {loadingId === caseItem.id ? (
                                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Approving...</>
                                ) : (
                                  <><CheckCircle2 className="w-4 h-4 mr-2" />Approve</>
                                )}
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleReupload(caseItem.id)}>
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Request Reupload
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
