import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  ArrowLeft, 
  Download, 
  Share2, 
  MapPin, 
  CheckCircle2,
  AlertTriangle,
  FileText,
  Stethoscope,
  Globe2,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock diagnosis result
const diagnosisResult = {
  condition: "Eczema (Atopic Dermatitis)",
  confidence: 94.5,
  severity: "Moderate",
  description: {
    en: "Eczema, also known as atopic dermatitis, is a chronic skin condition characterized by red, inflamed, and itchy patches of skin. It is commonly found in the folds of the elbows, behind the knees, and on the face, hands, and feet. While it can occur at any age, it often begins in childhood and may improve with age.",
    ur: "ایکزیما، جسے ایٹوپک ڈرمیٹائٹس بھی کہا جاتا ہے، ایک دائمی جلد کی بیماری ہے جس کی خصوصیت سرخ، سوجن اور خارش والے جلد کے دھبے ہیں۔ یہ عام طور پر کہنیوں کے جوڑوں، گھٹنوں کے پیچھے، اور چہرے، ہاتھوں اور پیروں پر پایا جاتا ہے۔ اگرچہ یہ کسی بھی عمر میں ہو سکتا ہے، لیکن یہ اکثر بچپن میں شروع ہوتا ہے اور عمر کے ساتھ بہتر ہو سکتا ہے۔",
  },
  recommendations: {
    en: [
      "Keep skin well moisturized with fragrance-free emollients",
      "Avoid known triggers such as certain fabrics, soaps, or allergens",
      "Use lukewarm water for bathing and avoid hot showers",
      "Consider over-the-counter hydrocortisone cream for mild symptoms",
      "Consult a dermatologist if symptoms persist or worsen",
    ],
    ur: [
      "جلد کو خوشبو سے پاک موئسچرائزر سے اچھی طرح نم رکھیں",
      "معلوم محرکات سے پرہیز کریں جیسے مخصوص کپڑے، صابن یا الرجن",
      "نہانے کے لیے نیم گرم پانی استعمال کریں اور گرم شاور سے پرہیز کریں",
      "ہلکی علامات کے لیے ہائیڈروکورٹیسون کریم استعمال کریں",
      "اگر علامات برقرار رہیں یا بگڑ جائیں تو ماہر امراض جلد سے مشورہ کریں",
    ],
  },
};

// Mock nearby dermatologists
const nearbyDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "Dermatologist",
    rating: 4.9,
    distance: "0.8 km",
    address: "123 Medical Center, Main Street",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Ali Hassan",
    specialty: "Dermatologist",
    rating: 4.7,
    distance: "1.2 km",
    address: "456 Health Clinic, Park Road",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Fatima Khan",
    specialty: "Dermatologist & Cosmetologist",
    rating: 4.8,
    distance: "2.5 km",
    address: "789 Skin Care Center, Mall Road",
    available: false,
  },
];

export default function ResultsPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [showDoctors, setShowDoctors] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading Report",
      description: "Your PDF report is being generated...",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "The report link has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="default" size="sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Disclaimer Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-warning-light rounded-lg border border-warning/30"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Not a Medical Diagnosis:</strong> This AI-powered analysis is for informational purposes only and should not be used as a substitute for professional medical advice. Please consult a qualified dermatologist for proper diagnosis and treatment.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Result Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                {/* Image Preview */}
                <div className="aspect-video bg-muted relative">
                  <img
                    src="/placeholder.svg"
                    alt="Analyzed skin image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-lg">
                    <span className="text-sm font-medium text-foreground">Analyzed Image</span>
                  </div>
                </div>

                {/* Result Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-foreground mb-1">
                        {diagnosisResult.condition}
                      </h1>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-warning-light text-warning rounded-full text-sm font-medium">
                          {diagnosisResult.severity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gradient">{diagnosisResult.confidence}%</p>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                    </div>
                  </div>

                  {/* Language Toggle */}
                  <div className="flex items-center gap-2 mb-6">
                    <Globe2 className="w-4 h-4 text-muted-foreground" />
                    <div className="flex rounded-lg border border-border overflow-hidden">
                      <button
                        onClick={() => setLanguage("en")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          language === "en"
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage("ur")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          language === "ur"
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        اردو
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3">
                      {language === "en" ? "About This Condition" : "اس حالت کے بارے میں"}
                    </h2>
                    <p className={`text-muted-foreground leading-relaxed ${language === "ur" ? "text-right" : ""}`} dir={language === "ur" ? "rtl" : "ltr"}>
                      {diagnosisResult.description[language]}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-3">
                      {language === "en" ? "Recommendations" : "سفارشات"}
                    </h2>
                    <ul className={`space-y-3 ${language === "ur" ? "text-right" : ""}`} dir={language === "ur" ? "rtl" : "ltr"}>
                      {diagnosisResult.recommendations[language].map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 text-success flex-shrink-0 mt-0.5 ${language === "ur" ? "order-2" : ""}`} />
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Nearby Dermatologists */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setShowDoctors(!showDoctors)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-light flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">Nearby Dermatologists</h3>
                      <p className="text-sm text-muted-foreground">{nearbyDoctors.length} specialists found</p>
                    </div>
                  </div>
                  {showDoctors ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {showDoctors && (
                  <div className="border-t border-border divide-y divide-border">
                    {nearbyDoctors.map((doctor) => (
                      <div key={doctor.id} className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                            {doctor.name.charAt(4)}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{doctor.distance}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-warning">★ {doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant={doctor.available ? "default" : "outline"} size="sm" disabled={!doctor.available}>
                          {doctor.available ? "Book" : "Unavailable"}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="hero" className="w-full" onClick={handleDownloadPDF}>
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Request Expert Review
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Doctor
                  </Button>
                </div>
              </motion.div>

              {/* Analysis Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-semibold text-foreground mb-4">Analysis Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Model</span>
                    <span className="text-sm font-medium text-foreground">DermaNet v3.2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processing Time</span>
                    <span className="text-sm font-medium text-foreground">2.3 seconds</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                      <CheckCircle2 className="w-4 h-4" />
                      Complete
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Learn More */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-accent rounded-2xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">Learn More</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get detailed information about this skin condition from trusted medical sources.
                </p>
                <a
                  href="https://www.aad.org/public/diseases/eczema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  American Academy of Dermatology
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
