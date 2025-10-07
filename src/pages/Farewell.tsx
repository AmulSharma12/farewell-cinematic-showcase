import { useEffect, useState } from "react";
import { Star, Sparkles, Heart } from "lucide-react";

const Farewell = () => {
  const [stage, setStage] = useState(0);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setStars(newStars);

    // Stage progression
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3500),
      setTimeout(() => setStage(4), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Stage 1: Initial greeting */}
        <div
          className={`transition-all duration-1000 ${
            stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Sparkles className="w-16 h-16 mx-auto mb-8 text-accent animate-float" />
          <h1 className="text-7xl md:text-9xl font-bold mb-6 text-gradient">
            Goodbye
          </h1>
        </div>

        {/* Stage 2: Farewell message */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-3xl md:text-4xl font-light mb-8 text-foreground/90">
            But Never Forgotten
          </p>
        </div>

        {/* Stage 3: Heartfelt message */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="glass p-12 rounded-3xl mb-12 glow">
            <Heart className="w-12 h-12 mx-auto mb-6 text-accent animate-pulse" />
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              As you turn this page and start a new chapter, remember that the impact you've 
              made here will echo through our halls and hearts for years to come.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your legacy isn't just in the work you've done, but in the lives you've touched 
              and the example you've set for all of us.
            </p>
          </div>
        </div>

        {/* Stage 4: Final wishes */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-8 h-8 text-accent animate-pulse" />
            <h2 className="text-3xl font-bold text-gradient">
              May Your Journey Be Extraordinary
            </h2>
            <Star className="w-8 h-8 text-accent animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Heart, text: "Stay Amazing" },
              { icon: Sparkles, text: "Keep Inspiring" },
              { icon: Star, text: "Shine Bright" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-125 transition-transform" />
                <p className="text-lg font-semibold">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-2xl italic text-accent">
            With love and gratitude, always. ✨
          </p>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Farewell;
