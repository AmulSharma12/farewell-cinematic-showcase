import { useEffect, useState } from "react";
import { MessageCircle, Heart } from "lucide-react";

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
    text: "Your dedication and passion inspired us every single day. Thank you for being an incredible colleague!",
    color: "from-primary to-secondary",
  },
  {
    id: 2,
    from: "Your Work Family",
    text: "You've left an indelible mark on this team. Your humor, wisdom, and kindness will be deeply missed.",
    color: "from-secondary to-accent",
  },
  {
    id: 3,
    from: "Everyone",
    text: "Wishing you all the success and happiness in your next chapter. You deserve nothing but the best!",
    color: "from-accent to-primary",
  },
  {
    id: 4,
    from: "Your Colleagues",
    text: "Thank you for the laughter, the late-night brainstorms, and most importantly, your friendship.",
    color: "from-primary to-accent",
  },
];

const Messages = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [likedMessages, setLikedMessages] = useState<number[]>([]);

  useEffect(() => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.id]);
      }, index * 400);
    });
  }, []);

  const toggleLike = (id: number) => {
    setLikedMessages(prev =>
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-accent animate-pulse" />
            <h1 className="text-6xl font-bold text-gradient">
              Heartfelt Messages
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Words from those whose lives you've touched
          </p>
        </div>

        <div className="space-y-8">
          {messages.map((message, index) => {
            const isVisible = visibleMessages.includes(message.id);
            const isLiked = likedMessages.includes(message.id);
            const delay = index % 2 === 0 ? "0s" : "0.2s";

            return (
              <div
                key={message.id}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: delay }}
              >
                <div className="glass p-8 rounded-3xl hover:scale-105 transition-all duration-500 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${message.color} inline-block`}>
                      <span className="text-sm font-semibold text-white">{message.from}</span>
                    </div>
                    <button
                      onClick={() => toggleLike(message.id)}
                      className="transition-all duration-300 hover:scale-125"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isLiked
                            ? "fill-accent text-accent"
                            : "text-muted-foreground hover:text-accent"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {message.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center glass p-12 rounded-3xl">
          <Heart className="w-16 h-16 mx-auto mb-6 text-accent animate-pulse" />
          <p className="text-2xl font-light text-muted-foreground">
            You've touched so many hearts, and these words only scratch the surface
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
