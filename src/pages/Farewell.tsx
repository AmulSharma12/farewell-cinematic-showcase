import { useEffect, useState } from "react";
import { Star, Sparkles, Heart, Zap, Award, Trophy } from "lucide-react";

const Farewell = () => {
  const [stage, setStage] = useState(0);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);
  const [text, setText] = useState("");
  const fullText = "You'll Never Be Forgotten";

  useEffect(() => {
    // Generate enhanced stars
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 3,
    }));
    setStars(newStars);

    // Dramatic stage progression
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2500),
      setTimeout(() => setStage(3), 4500),
      setTimeout(() => setStage(4), 6500),
      setTimeout(() => setStage(5), 8500),
      setTimeout(() => setStage(6), 10500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (stage >= 2) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-background via-background to-primary/5">
      {/* Massive star field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-gradient-to-r from-accent via-primary to-secondary animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {stage >= 3 && [...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 w-20 bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: "-100px",
            animation: "shootingStar 3s ease-out infinite",
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(50vh); opacity: 0; }
        }
      `}</style>

      {/* Main cinematic content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Stage 1: Initial sparkle burst */}
        <div
          className={`transition-all duration-1500 ${
            stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="relative mb-12">
            <Sparkles className="w-24 h-24 mx-auto text-accent animate-float glow" />
            {stage >= 2 && (
              <>
                <Star className="absolute top-0 left-1/4 w-12 h-12 text-primary animate-twinkle" />
                <Star className="absolute bottom-0 right-1/4 w-12 h-12 text-secondary animate-twinkle" style={{ animationDelay: "0.5s" }} />
              </>
            )}
          </div>
        </div>

        {/* Stage 2: Main farewell with typewriter */}
        <div
          className={`transition-all duration-1500 ${
            stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h1 className="text-8xl md:text-[12rem] font-bold mb-8 text-gradient leading-tight drop-shadow-2xl">
            Goodbye
          </h1>
        </div>

        <div
          className={`transition-all duration-1500 ${
            stage >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-foreground/90 min-h-[4rem]">
            {text}<span className="animate-pulse">|</span>
          </h2>
        </div>

        {/* Stage 3: Heartfelt tribute */}
        <div
          className={`transition-all duration-1500 delay-500 ${
            stage >= 3 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"
          }`}
        >
          <div className="glass p-16 rounded-3xl mb-16 glow perspective-deep relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse" 
                 style={{ animationDuration: "4s" }} />
            
            <Heart className="w-16 h-16 mx-auto mb-8 text-accent animate-pulse relative z-10" 
                   style={{ animationDuration: "1.5s" }} />
            
            <p className="text-2xl md:text-3xl text-foreground leading-relaxed mb-8 relative z-10">
              As you turn this page and start a new chapter, remember that the impact you've 
              made here will <span className="text-accent font-bold">echo through eternity</span>.
            </p>
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed relative z-10">
              Your legacy isn't just in the work you've done, but in the <span className="text-gradient font-bold">lives you've transformed</span> and 
              the example you've set for all of us.
            </p>
          </div>
        </div>

        {/* Stage 4: Achievement badges */}
        <div
          className={`transition-all duration-1500 ${
            stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            {[
              { icon: Star, text: "Extraordinary" },
              { icon: Zap, text: "Inspiring" },
              { icon: Award, text: "Exceptional" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass px-8 py-4 rounded-full glow hover:scale-110 transition-all duration-500"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-7 h-7 text-accent animate-pulse" />
                  <span className="text-xl font-bold text-gradient">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 5: Final wishes grid */}
        <div
          className={`transition-all duration-1500 ${
            stage >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-10">
            <Trophy className="w-12 h-12 text-accent animate-float" />
            <h2 className="text-5xl md:text-6xl font-bold text-gradient">
              May Your Journey Shine
            </h2>
            <Trophy className="w-12 h-12 text-accent animate-float" style={{ animationDelay: "1s" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Heart, text: "Stay Amazing", color: "from-primary to-secondary" },
              { icon: Sparkles, text: "Keep Inspiring", color: "from-secondary to-accent" },
              { icon: Star, text: "Shine Bright", color: "from-accent to-primary" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass p-10 rounded-3xl hover:scale-110 transition-all duration-700 group perspective-deep glow"
                style={{ 
                  transitionDelay: `${i * 0.2}s`,
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`
                }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-2xl`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <p className="text-2xl font-bold text-gradient">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 6: Final message */}
        <div
          className={`transition-all duration-2000 ${
            stage >= 6 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="mt-20 glass p-12 rounded-3xl glow">
            <p className="text-4xl md:text-5xl italic text-gradient font-bold leading-relaxed">
              With infinite love, gratitude, and admiration
            </p>
            <p className="text-6xl mt-6 animate-pulse">✨ 💫 ⭐</p>
            <p className="text-3xl text-accent mt-8 font-semibold">
              Forever in our hearts
            </p>
          </div>
        </div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Farewell;
