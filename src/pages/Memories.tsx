import { useState, useEffect } from "react";
import { Camera, Sparkles } from "lucide-react";

const memories = [
  {
    id: 1,
    title: "Team Celebrations",
    emoji: "🎉",
    gradient: "from-primary to-secondary",
  },
  {
    id: 2,
    title: "Coffee Breaks",
    emoji: "☕",
    gradient: "from-secondary to-accent",
  },
  {
    id: 3,
    title: "Late Night Coding",
    emoji: "💻",
    gradient: "from-accent to-primary",
  },
  {
    id: 4,
    title: "Lunch Adventures",
    emoji: "🍕",
    gradient: "from-primary to-accent",
  },
  {
    id: 5,
    title: "Team Building",
    emoji: "🎯",
    gradient: "from-secondary to-primary",
  },
  {
    id: 6,
    title: "Friday Vibes",
    emoji: "🎊",
    gradient: "from-accent to-secondary",
  },
  {
    id: 7,
    title: "Brainstorm Sessions",
    emoji: "💡",
    gradient: "from-primary to-accent",
  },
  {
    id: 8,
    title: "Victory Moments",
    emoji: "🏆",
    gradient: "from-secondary to-accent",
  },
  {
    id: 9,
    title: "Monday Motivation",
    emoji: "💪",
    gradient: "from-primary to-secondary",
  },
  {
    id: 10,
    title: "Creative Magic",
    emoji: "✨",
    gradient: "from-accent to-primary",
  },
  {
    id: 11,
    title: "Helping Hands",
    emoji: "🤝",
    gradient: "from-secondary to-accent",
  },
  {
    id: 12,
    title: "Success Stories",
    emoji: "🌟",
    gradient: "from-primary to-accent",
  },
];

const Memories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    memories.forEach((memory, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, memory.id]);
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen py-32 px-6 relative overflow-hidden">
      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-accent/20 animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-4 mb-6">
            <Camera className="w-10 h-10 text-accent animate-pulse" />
            <h1 className="text-7xl md:text-8xl font-bold text-gradient">
              Cherished Memories
            </h1>
            <Camera
              className="w-10 h-10 text-accent animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <p className="text-2xl text-muted-foreground">
            Moments that made our time together{" "}
            <span className="text-accent font-bold">unforgettable</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {memories.map((memory, index) => {
            const isVisible = visibleCards.includes(memory.id);
            const isHovered = hoveredId === memory.id;

            return (
              <div
                key={memory.id}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                style={{ transitionDelay: `${index * 0.05}s` }}
                onMouseEnter={() => setHoveredId(memory.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`glass rounded-3xl p-8 aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-700 perspective-deep ${
                    isHovered
                      ? "scale-125 -rotate-6 glow z-50"
                      : "hover:scale-110"
                  }`}
                >
                  <div
                    className={`w-28 h-28 rounded-full bg-gradient-to-br ${
                      memory.gradient
                    } flex items-center justify-center mb-6 transition-all duration-700 shadow-2xl ${
                      isHovered ? "scale-150 rotate-[360deg]" : ""
                    }`}
                  >
                    <span className="text-6xl filter drop-shadow-lg">
                      {memory.emoji}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-bold text-center transition-all duration-500 ${
                      isHovered ? "scale-110 text-accent" : ""
                    }`}
                  >
                    {memory.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-28 glass p-16 rounded-3xl text-center glow animate-slide-up">
          <div className="flex justify-center gap-3 mb-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-3xl md:text-4xl text-foreground italic font-light leading-relaxed mb-6">
            “Even without frames, the memories still shine.”
          </p>
          <p className="text-xl text-accent font-semibold">
            And these will last forever ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Memories;
