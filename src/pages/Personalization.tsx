import { useEffect, useRef, useState } from "react";
import { Canvas, Text, Image as FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { 
  Image, 
  Type, 
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Save,
  Palette,
  Move
} from "lucide-react";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

const Personalization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState([16]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#f8f9fa",
    });

    // Load the t-shirt mockup
    fabricCanvas.loadImage("/mockuptshirt.png", {
      crossOrigin: 'anonymous',
      signal: new AbortController().signal
    }).then((fabricImage) => {
      if (fabricImage) {
        fabricImage.scaleToWidth(500);
        fabricImage.selectable = false;
        fabricCanvas.centerObject(fabricImage);
        fabricCanvas.add(fabricImage);
        fabricCanvas.renderAll();
      }
    }).catch(console.error);

    fabricCanvas.on("object:modified", () => {
      toast.success("Design mis à jour !");
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleAddText = () => {
    if (!canvas || !text) return;

    const fabricText = new Text(text, {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontSize: fontSize[0],
      fill: "#000000",
      originX: 'center',
      originY: 'center'
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setText("");
    toast.success("Texte ajouté au design !");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files?.[0]) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      canvas.loadImage(e.target.result.toString(), {
        crossOrigin: 'anonymous',
        signal: new AbortController().signal
      }).then((fabricImage) => {
        if (fabricImage) {
          fabricImage.scaleToWidth(150);
          canvas.centerObject(fabricImage);
          canvas.add(fabricImage);
          canvas.renderAll();
          
          setUploadedImages(prev => [...prev, {
            id: Date.now().toString(),
            url: e.target.result as string,
            name: file.name
          }]);
          
          toast.success("Image ajoutée au design !");
        }
      }).catch(console.error);
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });

    const link = document.createElement("a");
    link.download = "design.png";
    link.href = dataURL;
    link.click();
    toast.success("Design téléchargé !");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tools Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5" />
                  Outils de Design
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Ajouter du Texte</Label>
                    <div className="flex gap-2">
                      <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Entrez du texte..."
                        className="flex-1"
                      />
                      <Button onClick={handleAddText} size="icon" variant="secondary">
                        <Type className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label className="text-sm font-medium">Taille de Police</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        min={8}
                        max={72}
                        step={1}
                        className="my-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Ajouter une Image</Label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                        variant="secondary"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Télécharger une Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Move className="h-5 w-5" />
                Actions
              </h2>
              <div className="space-y-3">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le Design
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder le Projet
                </Button>
              </div>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-6">
            <Card className="p-6">
              <div className="aspect-[5/6] w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="max-w-full shadow-lg" />
              </div>
            </Card>
          </div>

          {/* Uploaded Images Panel */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Image className="h-5 w-5" />
                Images Téléchargées
              </h2>
              <ScrollArea className="h-[600px] pr-4">
                <div className="grid grid-cols-2 gap-4">
                  {uploadedImages.map((img) => (
                    <div 
                      key={img.id}
                      className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img 
                        src={img.url} 
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;