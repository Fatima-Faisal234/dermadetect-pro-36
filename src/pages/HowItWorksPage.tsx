import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Brain, FileText, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload or Capture Image",
    description: "Take a clear photo of the skin area using your device camera, or upload an existing image. We accept JPG and PNG formats up to 10MB.",
    details: ["Use good lighting", "Keep camera steady", "Capture affected area clearly"],
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced CNN model processes your image in seconds, comparing it against patterns from millions of dermatological cases to identify potential conditions.",
    details: ["98.5% accuracy rate", "100+ conditions detected", "Results in under 3 seconds"],
  },
  {
    number: "03",
    icon: FileText,
    title: "Get Bilingual Report",
    description: "Receive a comprehensive report with the predicted condition, confidence score, and detailed explanations in both English and Urdu.",
    details: ["Confidence scoring", "English & Urdu explanations", "Downloadable PDF report"],
  },
  {
    number: "04",
    icon: Stethoscope,
    title: "Optional Dermatologist Review",
    description: "Request a professional review from a certified dermatologist who can validate the AI findings and provide personalized medical advice.",
    details: ["Expert validation", "Personalized feedback", "Treatment recommendations"],
  },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              How It Works
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple Steps to <span className="text-gradient">Better Skin Health</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
              Our streamlined 4-step process makes professional-grade skin analysis accessible to everyone.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4 md:w-1/3">
                      <span className="text-5xl font-bold text-primary/15">{step.number}</span>
                      <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, i) => (
                          <span key={i} className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[4.5rem] top-full w-0.5 h-8 bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-foreground max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Upload your first image and experience AI-powered skin analysis in action.
            </p>
            <Link to="/signup">
              <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Start Free Analysis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
