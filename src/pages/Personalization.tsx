import { useEffect, useRef, useState } from "react";
import { Canvas, Text, Image as FabricImage, TEvent } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Image, 
  Type, 
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Save
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
    console.log("Initializing canvas");
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#f8f9fa",
    });

    // Load the t-shirt mockup
    FabricImage.fromURL("/mockuptshirt.png", (fabricImage) => {
      fabricImage.scaleToWidth(500);
      fabricImage.selectable = false;
      fabricCanvas.centerObject(fabricImage);
      fabricCanvas.add(fabricImage);
      fabricCanvas.renderAll();
    });

    fabricCanvas.on("object:modified", () => {
      console.log("Design updated");
      toast("Design mis à jour !");
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleAddText = () => {
    if (!canvas || !text) return;
    console.log("Adding text:", text);

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
    toast("Texte ajouté au design !");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files?.[0]) return;
    console.log("Uploading image");

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      FabricImage.fromURL(e.target.result as string, (fabricImage) => {
        fabricImage.scaleToWidth(150);
        canvas.centerObject(fabricImage);
        canvas.add(fabricImage);
        canvas.renderAll();
        
        setUploadedImages(prev => [...prev, {
          id: Date.now().toString(),
          url: e.target.result as string,
          name: file.name
        }]);
        
        toast("Image ajoutée au design !");
      });
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvas) return;
    console.log("Downloading design");

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });

    const link = document.createElement("a");
    link.download = "design.png";
    link.href = dataURL;
    link.click();
    toast("Design téléchargé !");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tools Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Outils de Design</h2>
            
            {/* Text Tool */}
            <div className="space-y-2">
              <Label>Ajouter du Texte</Label>
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
              
              <Label>Taille de Police</Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                min={8}
                max={72}
                step={1}
                className="my-4"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Ajouter une Image</Label>
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

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-2">
            <Button 
              variant="default" 
              className="w-full mb-2"
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
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="aspect-[5/6] w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
          </div>
        </div>

        {/* Uploaded Images Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Images Téléchargées</h2>
            <ScrollArea className="h-[500px]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
