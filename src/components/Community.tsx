import React from "react";

export default function Community() {
  const features = [
    {
      icon: "👥",
      title: "Join Clans",
      description: "Find and join gaming communities with like-minded players",
    },
    {
      icon: "🏆",
      title: "Tournaments",
      description: "Compete in tournaments and win amazing prizes",
    },
    {
      icon: "💬",
      title: "Discord Integration",
      description: "Stay connected with your teammates on Discord",
    },
    {
      icon: "📊",
      title: "Leaderboards",
      description: "Track your progress on global leaderboards",
    },
    {
      icon: "🎁",
      title: "Rewards Program",
      description: "Earn rewards and unlock exclusive content",
    },
    {
      icon: "📱",
      title: "Mobile App",
      description: "Play on the go with our mobile application",
    },
  ];

  return (
    <section id="community" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Community Features
          </h2>
          <p className="text-xl text-gray-400">
            Connect, compete, and celebrate with millions of gamers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-secondary rounded-xl border border-gray-800 hover:border-gold hover:shadow-lg hover:shadow-gold/20 transition group"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
