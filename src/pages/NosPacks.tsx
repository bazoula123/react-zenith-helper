
import { Link } from "react-router-dom";
import ProcessSection from "@/components/personalization/ProcessSection";
import PackCard from "@/components/packs/PackCard";
import { Button } from "@/components/ui/button";
import { packsConfig } from "@/config/packsConfig";

const NosPacks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-1">
          <span className="text-primary">Nos</span>{" "}
          <span className="text-secondary">Packs</span>
        </h1>
        <p className="text-2xl text-gray-700 font-medium mb-4">Complet</p>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Des solutions complètes adaptées à tous les métiers. Découvrez nos packs professionnels pour équiper votre établissement.
        </p>
      </div>

      {/* Process Section */}
      <ProcessSection />

      {/* Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
        {packsConfig.map((pack) => (
          <PackCard
            key={pack.id}
            title={pack.title}
            description={pack.description}
            imageSrc={pack.image}
            path={`/nos-packs/${pack.id}`}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 rounded-xl p-8 my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Besoin d'un pack sur mesure?</h2>
        <p className="text-gray-600 mb-6">
          Nous pouvons créer un pack personnalisé adapté à vos besoins spécifiques.
        </p>
        <Button className="bg-primary text-white px-6 py-3">
          Contactez-nous
        </Button>
      </div>
    </div>
  );
};

export default NosPacks;
