import { useEffect, useState } from "react";
import { MessageCircle, Heart, Sparkles } from "lucide-react";

interface Message {
  id: number;
  from: string;
  text: string;
  color: string;
}

const messages: Message[] = [
  {
    id: 1,
    from: "The Team",
    text: "Your dedication and passion inspired us every single day. Thank you for being an incredible colleague and showing us what excellence truly means!",
    color: "from-primary to-secondary",
  },
  {
    id: 2,
    from: "Your Work Family",
    text: "You've left an indelible mark on this team that will never fade. Your humor, wisdom, and kindness created a work environment we'll always treasure.",
    color: "from-secondary to-accent",
  },
  {
    id: 3,
    from: "Everyone",
    text: "Wishing you all the success and happiness in your next chapter. You deserve nothing but the best, and we know you'll achieve extraordinary things!",
    color: "from-accent to-primary",
  },
  {
    id: 4,
    from: "Your Colleagues",
    text: "Thank you for the laughter, the late-night brainstorms, the incredible memories, and most importantly, your friendship that made every day brighter.",
    color: "from-primary to-accent",
  },
  {
    id: 5,
    from: "The Leadership",
    text: "Your impact on this organization goes far beyond your role. You've set a standard of excellence that will inspire future generations here.",
    color: "from-secondary to-primary",
  },
];

const Messages = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [likedMessages, setLikedMessages] = useState<number[]>([]);

  useEffect(() => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.id]);
      }, index * 500);
    });
  }, []);

  const toggleLike = (id: number) => {
    setLikedMessages(prev =>
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen py-32 px-6 relative overflow-hidden">
      {/* Floating hearts */}
      {[...Array(10)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-accent/10 animate-drift"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-zoom-in">
          <div className="inline-flex items-center gap-4 mb-6">
            <MessageCircle className="w-10 h-10 text-accent animate-pulse" />
            <h1 className="text-7xl md:text-8xl font-bold text-gradient">
              Heartfelt Messages
            </h1>
            <Sparkles className="w-10 h-10 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-2xl text-muted-foreground">
            Words from those whose lives you've <span className="text-accent font-bold">touched forever</span>
          </p>
        </div>

        <div className="space-y-12">
          {messages.map((message, index) => {
            const isVisible = visibleMessages.includes(message.id);
            const isLiked = likedMessages.includes(message.id);
            const isOdd = index % 2 === 1;

            return (
              <div
                key={message.id}
                className={`transition-all duration-1000 ${
                  isVisible 
                    ? "opacity-100 translate-y-0 translate-x-0" 
                    : `opacity-0 translate-y-20 ${isOdd ? "translate-x-10" : "-translate-x-10"}`
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="glass p-10 rounded-3xl hover:scale-105 transition-all duration-700 glow group perspective-deep relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${message.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${message.color} inline-block shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <span className="text-base font-bold text-white uppercase tracking-wider">{message.from}</span>
                    </div>
                    <button
                      onClick={() => toggleLike(message.id)}
                      className="transition-all duration-500 hover:scale-150 active:scale-125"
                    >
                      <Heart
                        className={`w-8 h-8 transition-all duration-500 ${
                          isLiked
                            ? "fill-accent text-accent scale-125 animate-pulse"
                            : "text-muted-foreground hover:text-accent"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xl text-foreground leading-relaxed relative z-10">
                    {message.text}
                  </p>
                  
                  {/* Decorative corner sparkles */}
                  <Sparkles className="absolute bottom-4 right-4 text-accent/20 group-hover:text-accent/60 transition-colors duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-28 text-center glass p-16 rounded-3xl glow animate-slide-up">
          <div className="flex justify-center gap-4 mb-8">
            {[...Array(7)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-accent animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s"
                }}
              />
            ))}
          </div>
          <p className="text-3xl md:text-4xl font-light text-foreground mb-6 leading-relaxed">
            You've touched so many hearts
          </p>
          <p className="text-2xl text-accent font-semibold">
            And these words only scratch the surface of your impact ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
