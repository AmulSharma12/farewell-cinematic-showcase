import { useEffect, useState, useRef } from "react";
import {
  Calendar,
  Award,
  Lightbulb,
  Users,
  Heart,
  Zap,
  Star,
} from "lucide-react";

interface TimelineEvent {
  icon: any;
  title: string;
  date: string;
  description: string;
  color: string;
}

const events: TimelineEvent[] = [
  {
    icon: Users,
    title: "The Beginning",
    date: "Day One",
    description:
      "When you joined the team, you brought fresh perspectives and endless enthusiasm that lit up every room",
    color: "from-primary to-secondary",
  },
  {
    icon: Lightbulb,
    title: "Brilliant Ideas",
    date: "Every Day",
    description:
      "Your innovative thinking and creative solutions transformed challenges into opportunities, inspiring us all",
    color: "from-secondary to-accent",
  },
  {
    icon: Zap,
    title: "Game Changers",
    date: "Countless Times",
    description:
      "Those breakthrough moments when your insights changed everything and pushed us to new heights",
    color: "from-accent to-primary",
  },
  {
    icon: Award,
    title: "Major Wins",
    date: "Throughout",
    description:
      "Celebrating all the milestones and successes we achieved together, each one a testament to your brilliance",
    color: "from-primary to-secondary",
  },
  {
    icon: Star,
    title: "Shining Moments",
    date: "Always",
    description:
      "Your dedication, passion, and excellence that made every project not just successful, but extraordinary",
    color: "from-secondary to-accent",
  },
  {
    icon: Heart,
    title: "Friendship & Growth",
    date: "Forever",
    description:
      "Beyond work, the laughter, support, genuine connection, and memories that will last a lifetime",
    color: "from-accent to-primary",
  },
];

const Journey = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    events.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 400);
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen py-32 px-6 relative overflow-hidden">
      {/* Parallax background elements */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <h1 className="text-7xl md:text-8xl mt-10 font-bold mb-6 text-gradient">
            Our Journey Together
          </h1>
          <p className="text-2xl text-muted-foreground">
            Every moment has been a{" "}
            <span className="text-accent font-semibold">treasure</span>
          </p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Animated timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent overflow-hidden">
            <div
              className="w-full h-full bg-gradient-to-b from-accent to-transparent opacity-50 animate-pulse"
              style={{ animationDuration: "3s" }}
            />
          </div>

          {events.map((event, index) => {
            const Icon = event.icon;
            const isVisible = visibleCards.includes(index);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative mb-20 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${
                        isLeft ? "-translate-x-20" : "translate-x-20"
                      } translate-y-10`
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
                    <div className="glass p-8 rounded-3xl hover:scale-105 transition-all duration-500 glow group perspective-deep rotate-3d">
                      <div
                        className={`inline-flex items-center gap-4 mb-6 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${event.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl`}
                        >
                          <Icon className="w-7 h-7 text-white animate-pulse" />
                        </div>
                        <h3 className="text-3xl font-bold">{event.title}</h3>
                      </div>
                      <p className="text-accent text-base font-semibold mb-4 uppercase tracking-wider">
                        {event.date}
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated center dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2">
                    <div
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary shadow-2xl glow animate-pulse"
                      style={{
                        animationDuration: "2s",
                        animationDelay: `${index * 0.3}s`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-24 glass p-12 rounded-3xl glow animate-slide-up">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-accent animate-float" />
          <p className="text-3xl text-foreground italic font-light leading-relaxed">
            "The best journeys are the ones we take together"
          </p>
          <p className="text-xl text-accent mt-4 font-semibold">
            And this one was unforgettable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journey;
