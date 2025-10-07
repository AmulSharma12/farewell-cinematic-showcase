import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/Particles";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Thank You", "Forever Grateful", "You're Amazing"];

  useEffect(() => {
    setVisible(true);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <Particles />
      
      {/* Multiple layered background glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30" 
           style={{ animation: "pulseGlow 8s ease-in-out infinite" }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-drift" 
           style={{ animationDelay: "2s" }} />
      
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="mb-8 inline-flex items-center gap-2 glass px-8 py-4 rounded-full animate-float glow">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          <span className="text-lg text-muted-foreground font-medium">A Special Farewell</span>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="relative h-32 md:h-40 mb-8 perspective-deep">
          {texts.map((text, index) => (
            <h1
              key={text}
              className={`absolute inset-0 text-7xl md:text-9xl font-bold text-gradient leading-tight transition-all duration-1000 ${
                index === textIndex
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-90 rotate-12"
              }`}
            >
              {text}
            </h1>
          ))}
        </div>
        
        <h2 className="text-4xl md:text-6xl font-light mb-10 text-foreground/90 animate-slide-up" 
            style={{ animationDelay: "0.3s" }}>
          For The Journey <span className="text-gradient">Together</span>
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed animate-slide-up"
           style={{ animationDelay: "0.6s" }}>
          As you embark on your next adventure, we created this cinematic experience 
          to celebrate the incredible memories and moments we've shared. 
          <span className="block mt-4 text-accent font-medium">You'll never be forgotten.</span>
        </p>

        <div className="animate-zoom-in" style={{ animationDelay: "0.9s" }}>
          <Link to="/journey">
            <Button 
              size="lg" 
              className="group px-10 py-8 text-xl bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl hover:scale-110 transition-all duration-700 glow relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin the Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Button>
          </Link>
        </div>

        <div className="mt-20 flex justify-center gap-6">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary/70 glow animate-pulse"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
