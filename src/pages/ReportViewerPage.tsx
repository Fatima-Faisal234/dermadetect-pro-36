import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const report = {
  patientName: "John Doe",
  scanDate: "January 15, 2024",
  condition: "Eczema (Atopic Dermatitis)",
  confidence: 94.5,
  severity: "Moderate",
  aiExplanation: "The uploaded image shows characteristics consistent with atopic dermatitis (eczema), including erythematous patches with mild scaling. The distribution pattern and morphology suggest a moderate presentation. Key features identified include irregular borders, mild lichenification, and slight erythema in the affected region.",
  recommendations: [
    "Apply fragrance-free emollients regularly to maintain skin barrier",
    "Avoid known triggers including harsh soaps and synthetic fabrics",
    "Consider topical corticosteroids for acute flare-ups under medical supervision",
    "Schedule a follow-up consultation with a certified dermatologist",
  ],
};

export default function ReportViewerPage() {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({ title: "Downloading PDF", description: "Your report is being generated..." });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">DermaDetect Pro</span>
            </Link>
          </div>
          <Button variant="hero" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card"
        >
          {/* Report Header */}
          <div className="text-center mb-8 pb-8 border-b border-border">
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">DermaDetect Pro — Diagnostic Report</h1>
            <p className="text-sm text-muted-foreground">AI-Assisted Skin Screening Report</p>
          </div>

          {/* Patient Info */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: "Patient Name", value: report.patientName },
              { label: "Scan Date", value: report.scanDate },
              { label: "Predicted Condition", value: report.condition },
              { label: "Confidence", value: `${report.confidence}%` },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Severity */}
          <div className="mb-8 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Severity:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-warning-light text-warning rounded-full text-sm font-medium">
              {report.severity}
            </span>
          </div>

          {/* AI Explanation */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">AI Explanation</h2>
            <p className="text-muted-foreground leading-relaxed bg-muted rounded-xl p-4">
              {report.aiExplanation}
            </p>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Recommendations</h2>
            <ul className="space-y-3">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-warning-light rounded-lg border border-warning/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Medical Disclaimer:</strong> This report is generated by an AI screening tool and does not constitute a medical diagnosis. Please consult a qualified healthcare professional for proper diagnosis and treatment.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Link to="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
