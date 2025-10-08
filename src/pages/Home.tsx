import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Award, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Particles } from "../components/Particles";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Show special message after 5 seconds
    const timer = setTimeout(() => {
      setShowSpecialMessage(true);
    }, 5000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Enhanced particles */}
      <Particles intensity={1.5} />

      {/* Cinematic light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-screen w-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{
              left: `${10 + i * 20}%`,
              transform: "rotate(15deg) translateY(-50%)",
              opacity: 0.4,
              animation: "lightRay 8s ease-in-out infinite",
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"
        style={{ animation: "gradient-shift 15s ease-in-out infinite" }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h4 className="text-2xl md:text-6xl font-bold mb-4 mt-10 text-gradient">
              🌟 “Sunita Menon — a journey to remember.”
            </h4>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A Visual Journey Honoring Your Time and Memories in Health –
              Bespoke
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex justify-center gap-4 flex-wrap">
              {["Memories", "Achievements", "Messages", "Journey"].map(
                (item, i) => (
                  <div
                    key={i}
                    className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                    style={{
                      boxShadow: "0 0 15px rgba(255,255,255,0.1)",
                      animation: "pulse 3s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                title: "Memorable Moments",
                description:
                  "Relive the most impactful and joyful moments from your time with us.",
                icon: Star,
              },
              {
                title: "Heartfelt Messages",
                description:
                  "Read personal messages and well-wishes from your colleagues and friends.",
                icon: Heart,
              },
              {
                title: "Your Achievements",
                description:
                  "Celebrate your accomplishments and the legacy you leave behind.",
                icon: Trophy,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-md border border-white/10"
                style={{
                  boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <card.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <div className="mt-4 flex justify-center">
                  <Link
                    to={
                      card.title === "Memorable Moments"
                        ? "/memories"
                        : card.title === "Heartfelt Messages"
                        ? "/messages"
                        : card.title === "Your Achievements"
                        ? "/journey"
                        : "/"
                    }
                  >
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300">
                      Explore
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <Link to="/farewell" className="inline-block">
              <div
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-lg hover:scale-105 transition-all duration-300"
                style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              >
                Enter Cinematic Experience
              </div>
            </Link>
          </motion.div>

          {/* Special "Last Day" message */}
          {showSpecialMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-12 p-8 rounded-xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 backdrop-blur-md border border-white/20"
              style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
            >
              <div className="flex justify-center mb-6 gap-4">
                {[Trophy, Award, Heart, Star].map((Icon, i) => (
                  <Icon
                    key={i}
                    className="w-8 h-8"
                    style={{
                      color: ["#ffd700", "#ff6b6b", "#1dd1a1", "#48dbfb"][i],
                      animation: "float 3s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Last Day Special
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Every ending sparkles with the glow of a thousand memories.
              </p>
              <Link to="/farewell" className="inline-block">
                <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300">
                  View Special Farewell
                </div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Add cinematic keyframe animations */}
      <style>
        {`
          @keyframes lightRay {
            0%, 100% { opacity: 0.4; transform: rotate(15deg) translateY(-50%); }
            50% { opacity: 0.7; transform: rotate(20deg) translateY(-50%); }
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .text-gradient {
            background: linear-gradient(to right, #ff6b6b, #feca57, #48dbfb, #1dd1a1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 300% 100%;
            animation: gradient-shift 15s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
