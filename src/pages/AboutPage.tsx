import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Brain, Lock, CheckCircle2, Heart, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const whyChooseUs = [
  {
    icon: Brain,
    title: "Advanced AI Technology",
    description: "Our CNN-based models are trained on millions of dermatological images, achieving clinical-grade accuracy in skin condition detection.",
  },
  {
    icon: Globe2,
    title: "Bilingual Accessibility",
    description: "Reports generated in both English and Urdu ensure that healthcare insights are accessible to a wider population.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    description: "Your medical data is protected with end-to-end encryption, HIPAA-compliant storage, and strict access controls.",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              About Us
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Mission: <span className="text-gradient">AI-Powered Skin Health</span> for Everyone
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
              DermaDetect Pro leverages cutting-edge artificial intelligence to make dermatological screening accessible, accurate, and affordable — empowering individuals to take proactive steps toward better skin health.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI Healthcare Explanation */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
                How AI Helps
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                AI-Powered Healthcare, Simplified
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our platform uses Convolutional Neural Networks (CNNs) trained on extensive dermatological datasets to analyze skin images. Combined with Large Language Models (LLMs) for generating human-readable explanations, we bridge the gap between complex medical analysis and patient understanding.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The system processes uploaded images in seconds, identifying patterns associated with over 100 skin conditions. Results include confidence scores, bilingual explanations, and actionable recommendations — all designed to support informed healthcare decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Screening, Not Diagnosis</h3>
              <p className="text-muted-foreground mb-4">
                DermaDetect Pro is a screening assistance tool. It is <strong className="text-foreground">not</strong> a substitute for professional medical diagnosis or treatment.
              </p>
              <div className="p-4 bg-warning-light rounded-lg border border-warning/30">
                <p className="text-sm text-foreground">
                  <strong>Important:</strong> Always consult a qualified dermatologist or healthcare professional for proper medical diagnosis and treatment plans.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Sets DermaDetect Pro Apart
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with precision, accessibility, and trust at its core.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Security & Privacy Commitment</h2>
            <p className="text-muted-foreground mb-8">
              We take your data privacy seriously. All images and personal data are encrypted in transit and at rest, and we never share your medical data with third parties.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {["End-to-End Encryption", "HIPAA-Compliant Storage", "No Third-Party Sharing"].map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-2 p-4 bg-card rounded-xl border border-border">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground max-w-2xl mx-auto"
          >
            <Heart className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Skin Health?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Get started with a free AI-powered skin analysis today.
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
