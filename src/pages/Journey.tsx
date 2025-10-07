import { useEffect, useState } from "react";
import { Calendar, Award, Lightbulb, Users, Heart } from "lucide-react";

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
    description: "When you joined the team, you brought fresh perspectives and endless enthusiasm",
    color: "from-primary to-secondary",
  },
  {
    icon: Lightbulb,
    title: "Brilliant Ideas",
    date: "Every Day",
    description: "Your innovative thinking and creative solutions made every project better",
    color: "from-secondary to-accent",
  },
  {
    icon: Award,
    title: "Major Wins",
    date: "Throughout",
    description: "Celebrating all the milestones and successes we achieved together",
    color: "from-accent to-primary",
  },
  {
    icon: Heart,
    title: "Friendship & Growth",
    date: "Always",
    description: "Beyond work, the laughter, support, and genuine connection we shared",
    color: "from-primary to-accent",
  },
];

const Journey = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    events.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 300);
    });
  }, []);

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-4 text-gradient">
          Our Journey Together
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-16">
          Every moment has been a treasure
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {events.map((event, index) => {
            const Icon = event.icon;
            const isVisible = visibleCards.includes(index);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative mb-16 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isLeft ? "-translate-x-10" : "translate-x-10"}`
                }`}
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}>
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
                    <div className="glass p-8 rounded-2xl hover:scale-105 transition-transform duration-300 glow group">
                      <div className={`inline-flex items-center gap-3 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${event.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold">{event.title}</h3>
                      </div>
                      <p className="text-accent text-sm font-medium mb-3">{event.date}</p>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-accent to-primary shadow-lg glow" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-20 glass p-8 rounded-2xl">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
          <p className="text-xl text-muted-foreground italic">
            "The best journeys are the ones we take together"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journey;
