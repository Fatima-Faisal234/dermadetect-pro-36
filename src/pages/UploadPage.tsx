import { useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Upload, 
  Shield, 
  ArrowLeft, 
  Image as ImageIcon, 
  X, 
  CheckCircle2,
  AlertTriangle,
  FileImage,
  Loader2,
  Camera,
  Video,
  Square
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraResult, setCameraResult] = useState<{ condition: string; confidence: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) errors.push("Please upload a JPG or PNG image.");
    if (file.size > maxSize) errors.push("Image size must be less than 10MB.");
    return errors;
  };

  const handleFile = useCallback((file: File) => {
    const errors = validateFile(file);
    setValidationErrors(errors);
    if (errors.length === 0) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => { setSelectedFile(null); setPreview(null); setValidationErrors([]); };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({ title: "Analysis Complete!", description: "Your skin image has been analyzed successfully." });
      navigate("/results/demo");
    }, 3000);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      setCameraResult(null);
    } catch {
      toast({ title: "Camera Error", description: "Unable to access camera. Please check permissions.", variant: "destructive" });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsDetecting(false);
    setCameraResult(null);
  };

  const handleStartDetection = () => {
    setIsDetecting(true);
    setCameraResult(null);
    // Placeholder: simulate detection after 3s
    setTimeout(() => {
      setCameraResult({ condition: "Eczema (Atopic Dermatitis)", confidence: "94.5%" });
      setIsDetecting(false);
    }, 3000);
  };

  const handleCaptureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      setPreview(dataUrl);
      // Create file from canvas
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.png", { type: "image/png" });
          setSelectedFile(file);
        }
      });
      stopCamera();
      setShowCamera(false);
    }
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
    startCamera();
  };

  const handleCloseCamera = () => {
    stopCamera();
    setShowCamera(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">DermaDetect Pro</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Upload Skin Image</h1>
            <p className="text-muted-foreground">Take or upload a clear photo of the skin area you want analyzed.</p>
          </motion.div>

          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                  isDragging ? "border-primary bg-accent" : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <input type="file" accept="image/jpeg,image/png" onChange={handleFileInput} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center">
                  <Upload className={`w-10 h-10 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{isDragging ? "Drop your image here" : "Drag & drop your image"}</h3>
                <p className="text-muted-foreground mb-4">or click to browse</p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><FileImage className="w-4 h-4" /><span>JPG, PNG</span></div>
                  <div className="flex items-center gap-2"><Upload className="w-4 h-4" /><span>Max 10MB</span></div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="relative aspect-square max-h-96 bg-muted">
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  <button onClick={clearFile} className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedFile?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full" onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Analyzing...</span>
                    ) : "Analyze Image"}
                  </Button>
                </div>
              </div>
            )}

            {validationErrors.length > 0 && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                {validationErrors.map((error, index) => (
                  <div key={index} className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-4 h-4" /><span className="text-sm">{error}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Camera Detection Button */}
          {!preview && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-4">
              <Button
                variant="outline"
                className="w-full py-6 text-base border-2 border-dashed border-primary/30 hover:border-primary hover:bg-accent"
                onClick={handleOpenCamera}
              >
                <Camera className="w-5 h-5 mr-2" />
                Real-Time Camera Detection
              </Button>
            </motion.div>
          )}

          {/* Camera View */}
          {showCamera && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative bg-muted aspect-video">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                {isDetecting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-10 h-10 animate-spin text-primary-foreground" />
                      <p className="text-primary-foreground font-medium">Detecting...</p>
                    </div>
                  </div>
                )}
                <button onClick={handleCloseCamera} className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full">
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex gap-3 mb-4">
                  <Button variant="hero" onClick={handleStartDetection} disabled={isDetecting || !isCameraActive}>
                    <Video className="w-4 h-4 mr-2" />
                    Start Detection
                  </Button>
                  <Button variant="outline" onClick={handleCaptureFrame} disabled={!isCameraActive}>
                    <Square className="w-4 h-4 mr-2" />
                    Capture Frame
                  </Button>
                </div>

                {/* Placeholder Result Card */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Predicted Condition</p>
                      <p className="font-semibold text-foreground">{cameraResult ? cameraResult.condition : "Loading..."}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                        cameraResult ? "bg-success-light text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {cameraResult ? cameraResult.confidence : "--%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8 bg-accent rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Tips for best results:</h3>
            <ul className="space-y-3">
              {["Ensure good lighting - natural light works best", "Keep the camera steady and focused", "Capture the affected area clearly without blur", "Include some surrounding skin for context", "Avoid using filters or editing the image"].map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Disclaimer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-6 p-4 bg-warning-light rounded-lg border border-warning/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Medical Disclaimer:</strong> This AI tool provides screening suggestions only and is not a medical diagnosis. Always consult a qualified healthcare provider for proper medical advice.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
