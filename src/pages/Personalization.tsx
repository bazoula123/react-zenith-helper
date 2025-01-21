import { useEffect, useRef, useState } from "react";
import { Canvas, Text, Image as FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Image, 
  Type, 
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Save,
  Palette,
  Move,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

const fonts = [
  { name: "Montserrat", value: "Montserrat" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Roboto", value: "Roboto" },
  { name: "Lato", value: "Lato" },
  { name: "Oswald", value: "Oswald" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Poppins", value: "Poppins" },
];

const Personalization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState([16]);
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [activeText, setActiveText] = useState<Text | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#f8f9fa",
    });

    // Load the t-shirt mockup using FabricImage.fromURL
    FabricImage.fromURL("/mockuptshirt.png", {
      crossOrigin: 'anonymous',
    }).then((fabricImage) => {
      if (fabricImage) {
        fabricImage.scaleToWidth(500);
        fabricImage.selectable = false;
        fabricCanvas.centerObject(fabricImage);
        fabricCanvas.add(fabricImage);
        fabricCanvas.renderAll();
      }
    }).catch(console.error);

    // Enable touch events
    fabricCanvas.set('allowTouchScrolling', true);

    fabricCanvas.on("object:modified", () => {
      toast.success("Design mis à jour !");
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Load fonts
  useEffect(() => {
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${font.value.replace(' ', '+')}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }, []);

  // Auto-update text as user types
  useEffect(() => {
    if (!canvas) return;

    if (!activeText) {
      // Create new text object if none exists
      const fabricText = new Text(text, {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: fontSize[0],
        fill: textColor,
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 12,
        padding: 5
      });

      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
      setActiveText(fabricText);
    } else {
      // Update existing text
      activeText.set('text', text);
    }

    canvas.renderAll();
  }, [text, canvas]);

  // Update font when changed
  const handleFontChange = (value: string) => {
    setSelectedFont(value);
    if (activeText && canvas) {
      activeText.set('fontFamily', value);
      canvas.renderAll();
      toast.success("Police mise à jour !");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files?.[0]) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;
      
      // Use FabricImage.fromURL instead of canvas.loadImage
      FabricImage.fromURL(e.target.result.toString(), {
        crossOrigin: 'anonymous',
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

  const updateActiveTextColor = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      (activeObject as Text).set('fill', textColor);
      canvas.renderAll();
      toast.success("Couleur du texte mise à jour !");
    }
  };

  const adjustTextSize = (increase: boolean) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      const currentSize = (activeObject as Text).fontSize || 16;
      const newSize = increase ? currentSize + 2 : currentSize - 2;
      if (newSize >= 8 && newSize <= 72) {
        (activeObject as Text).set('fontSize', newSize);
        canvas.renderAll();
        toast.success(`Taille du texte ${increase ? 'augmentée' : 'diminuée'} !`);
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                        placeholder="Tapez votre texte..."
                        className="flex-1"
                      />
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label className="text-sm font-medium">Police de Caractères</Label>
                      <Select value={selectedFont} onValueChange={handleFontChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir une police" />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map((font) => (
                            <SelectItem 
                              key={font.value} 
                              value={font.value}
                              style={{ fontFamily: font.value }}
                            >
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label className="text-sm font-medium">Couleur du Texte</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Button onClick={updateActiveTextColor} variant="outline" className="flex-1">
                          Appliquer la Couleur
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label className="text-sm font-medium">Taille du Texte</Label>
                      <div className="flex gap-2">
                        <Button onClick={() => adjustTextSize(false)} size="icon" variant="outline">
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => adjustTextSize(true)} size="icon" variant="outline">
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                      </div>
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

          <div className="lg:col-span-6">
            <Card className="p-6">
              <div className="aspect-[5/6] w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="max-w-full shadow-lg touch-manipulation" />
              </div>
            </Card>
          </div>

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
