import React from 'react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of developers building amazing applications
        </p>
        <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
          Start Building Now
        </Button>
      </div>
    </section>
  );
};

export default CTA;