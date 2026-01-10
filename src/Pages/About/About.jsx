import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { BookOpen, Lightbulb, Users, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <BookOpen size={40} className="text-yellow-400" />,
      title: "Learn & Share",
      description:
        "We believe knowledge is most powerful when shared. Every lesson shared is a gift to someone on their journey.",
    },
    {
      icon: <Lightbulb size={40} className="text-yellow-400" />,
      title: "Inspire Growth",
      description:
        "Personal growth happens through reflection. We create space for meaningful learning and self-discovery.",
    },
    {
      icon: <Users size={40} className="text-yellow-400" />,
      title: "Build Community",
      description:
        "Learning is stronger together. Connect with others, share wisdom, and grow as a community.",
    },
    {
      icon: <Target size={40} className="text-yellow-400" />,
      title: "Create Impact",
      description:
        "Every lesson shared creates positive ripples. Your wisdom can transform someone else's life.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Soreli - Learn, Reflect & Grow</title>
        <meta
          name="description"
          content="Learn about Soreli's mission to help people capture, reflect, and grow from life's lessons."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-5 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-yellow-400">Soreli</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A digital space where life lessons come alive. Capture your wisdom,
              reflect on your journey, and grow through the experiences of others.
            </p>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
            backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              Soreli was created with a simple belief: everyone has valuable lessons to share,
              and everyone can benefit from the wisdom of others. In a world of endless
              information, we believe what truly matters are the authentic, lived experiences
              that shape who we become. Our platform transforms those moments into meaningful
              knowledge that can inspire and guide others on their own journeys of growth.
            </p>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                hover:border-yellow-400/30 transition-all duration-300
                shadow-[0_0_30px_rgba(0,0,0,0.2)]"
              >
                <div className="flex justify-center mb-5">{value.icon}</div>
                <h3 className="text-xl font-bold text-white text-center mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                How Soreli Started
              </h2>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                Soreli began with a simple observation: we spend our lives collecting
                experiences and wisdom, but rarely have a meaningful way to capture,
                organize, and share them.
              </p>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                We realized that the most transformative lessons often come not from
                textbooks or experts, but from the lived experiences of real people
                facing real challenges and growing through them.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                That's why we built Soreli — a platform where your life's lessons
                become a source of inspiration and guidance for others.
              </p>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10
              backdrop-blur-xl border border-yellow-400/20 shadow-[0_0_40px_rgba(255,193,7,0.1)]"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">The Vision</h3>
              <p className="text-gray-200 leading-relaxed">
                We envision a world where everyone can easily capture their life lessons,
                organize their personal insights, and share their wisdom with those who
                need it most. A world where learning never stops, growth is celebrated,
                and the collective wisdom of humanity is accessible to all.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Share Your Wisdom?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are capturing, reflecting, and growing.
              Your lessons can inspire the next person on their journey.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/signup"
                className="px-8 py-3 rounded-lg bg-yellow-400 text-black font-bold
                hover:bg-yellow-300 transition-colors duration-300"
              >
                Get Started
              </a>
              <a
                href="/lessons"
                className="px-8 py-3 rounded-lg border border-yellow-400 text-yellow-400
                font-bold hover:bg-yellow-400/10 transition-colors duration-300"
              >
                Explore Lessons
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default About;