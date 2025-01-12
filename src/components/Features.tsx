import React from 'react';
import { Card } from "@/components/ui/card";
import { Rocket, Shield, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <Icon className="w-12 h-12 text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Built with performance in mind for the best user experience"
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Enterprise-grade security built into every layer"
    },
    {
      icon: Zap,
      title: "Modern Stack",
      description: "Using the latest web technologies and best practices"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;