import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

const memories = [
  { id: 1, title: "Team Celebrations", emoji: "🎉", gradient: "from-primary to-secondary" },
  { id: 2, title: "Coffee Breaks", emoji: "☕", gradient: "from-secondary to-accent" },
  { id: 3, title: "Late Night Coding", emoji: "💻", gradient: "from-accent to-primary" },
  { id: 4, title: "Lunch Adventures", emoji: "🍕", gradient: "from-primary to-accent" },
  { id: 5, title: "Team Building", emoji: "🎯", gradient: "from-secondary to-primary" },
  { id: 6, title: "Friday Vibes", emoji: "🎊", gradient: "from-accent to-secondary" },
  { id: 7, title: "Brainstorm Sessions", emoji: "💡", gradient: "from-primary to-accent" },
  { id: 8, title: "Victory Moments", emoji: "🏆", gradient: "from-secondary to-accent" },
];

const Memories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    memories.forEach((memory, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, memory.id]);
      }, index * 150);
    });
  }, []);

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-accent" />
            <h1 className="text-6xl font-bold text-gradient">
              Cherished Memories
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Moments that made our time together unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memories.map((memory) => {
            const isVisible = visibleCards.includes(memory.id);
            const isHovered = hoveredId === memory.id;

            return (
              <div
                key={memory.id}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                onMouseEnter={() => setHoveredId(memory.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`glass rounded-2xl p-8 aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${
                    isHovered ? "scale-110 rotate-3 glow" : ""
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${memory.gradient} flex items-center justify-center mb-6 transition-transform duration-500 ${
                      isHovered ? "scale-125 rotate-12" : ""
                    }`}
                  >
                    <span className="text-5xl">{memory.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center">{memory.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 glass p-12 rounded-3xl text-center">
          <p className="text-2xl text-muted-foreground italic leading-relaxed">
            "Every photo tells a story, but the real memories live in our hearts"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Memories;
