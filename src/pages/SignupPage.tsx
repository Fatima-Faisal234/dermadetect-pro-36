import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  "AI-powered skin analysis",
  "Bilingual reports (EN & Urdu)",
  "Expert dermatologist validation",
  "Download detailed PDF reports",
  "Find nearby specialists",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (formData.password.length < 8) errs.push("Password must be at least 8 characters.");
    if (formData.password !== formData.confirmPassword) errs.push("Passwords do not match.");
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Account created!", description: "Welcome to DermaDetect Pro. Let's get started!" });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative z-10 text-primary-foreground max-w-md">
          <h2 className="text-3xl font-bold mb-6">Join DermaDetect Pro</h2>
          <p className="text-primary-foreground/80 mb-8">Get access to AI-powered skin analysis and take control of your skin health journey.</p>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Check className="w-4 h-4" /></div>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">DermaDetect</span>
              <span className="text-xs font-semibold text-gradient">PRO</span>
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start your free trial today. No credit card required.</p>

          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg space-y-1">
              {errors.map((err, i) => <p key={i} className="text-sm text-destructive">{err}</p>)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Re-enter your password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "user", icon: User, label: "Patient", desc: "Get skin analysis", color: "text-primary" },
                  { value: "dermatologist", icon: Shield, label: "Dermatologist", desc: "Review cases", color: "text-secondary" },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r.value })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.role === r.value ? "border-primary bg-accent" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <r.icon className={`w-5 h-5 ${r.color} mb-2`} />
                    <p className="font-medium text-foreground">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Creating account...</span>
              ) : (
                <span className="flex items-center gap-2">Create Account<ArrowRight className="w-4 h-4" /></span>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}<Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}and{" "}<Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">Already have an account?{" "}<Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
