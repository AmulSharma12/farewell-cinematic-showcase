import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/Particles";

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <Particles />
      
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse" 
           style={{ animationDuration: "8s" }} />
      
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="mb-6 inline-flex items-center gap-2 glass px-6 py-3 rounded-full animate-float">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">A Special Farewell</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold mb-6 text-gradient leading-tight">
          Thank You
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-light mb-8 text-foreground/80">
          For The Journey Together
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          As you embark on your next adventure, we wanted to create something special 
          to celebrate the incredible memories and moments we've shared.
        </p>

        <Link to="/journey">
          <Button 
            size="lg" 
            className="group px-8 py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-105 transition-all duration-500 glow"
          >
            Begin the Journey
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>

        <div className="mt-16 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
