import { useEffect, useState, useRef } from "react";
import { Star, Sparkles, Heart, Zap, Award, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/Particles";

const Farewell = () => {
  const [stage, setStage] = useState(0);
  const [stars, setStars] = useState([]);
  const [text, setText] = useState("");
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const fullText = "The Final Frame, But Not the End";

  useEffect(() => {
    // Generate enhanced stars with colors for more cinematic effect
    const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#f368e0"];
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setStars(newStars);

    // Dramatic stage progression for cinematic effect
    const timers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 5000),
      setTimeout(() => setStage(3), 8000),

      // Special effect trigger after 10 seconds
      setTimeout(() => {
        setShowSpecialMessage(true);
      }, 10000),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Define animation variants for staggered and dramatic entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const specialMessageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // Typewriter effect for text
  useEffect(() => {
    if (stage < 2) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-background via-background to-primary/5">
      {/* Special celebration effects */}

      {/* Enhanced particles for cinematic effect */}
      <Particles intensity={2} />

      {/* Cinematic background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"
        style={{ animation: "pulseGlow 8s ease-in-out infinite" }}
      />

      {/* Star field with enhanced cinematic effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          stage > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              opacity: 0.7,
              animation: `twinkle 3s ease-in-out infinite alternate, float 15s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content with cinematic animations */}
      <motion.div
        className="relative z-10 text-center px-6 mt-10"
        variants={containerVariants}
        initial="hidden"
        animate={stage > 1 ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <AnimatePresence>
            {stage > 2 && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-bold mb-8 text-white"
                style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}
              >
                {text}
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showSpecialMessage && (
            <motion.div
              variants={specialMessageVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 p-8 rounded-xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 backdrop-blur-md border border-white/20"
              style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
            >
              <div className="flex justify-center mb-6 gap-4">
                {[Trophy, Award, Heart, Zap, Star].map((Icon, i) => (
                  <Icon
                    key={i}
                    className="w-8 h-8"
                    style={{
                      color: [
                        "#ffd700",
                        "#ff6b6b",
                        "#1dd1a1",
                        "#48dbfb",
                        "#f368e0",
                      ][i],
                      animation: "float 3s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Your Farewell Celebration
              </h2>
              <p className="text-lg text-white/90 mb-6">
                We've created this special cinematic experience to celebrate
                your incredible journey with us. Your contributions and presence
                have made a lasting impact.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {["Memories", "Messages", "Journey"].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer"
                    style={{
                      boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add cinematic keyframe animations */}
      <style>{`
        @keyframes shootingStar {
          0% { transform: translate(0, 0) rotate(215deg) scale(0); opacity: 0; }
          5% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(-100vw, 100vh) rotate(215deg) scale(1); opacity: 0; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-5px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default Farewell;
