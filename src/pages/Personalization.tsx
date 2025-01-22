import { useEffect, useRef, useState } from "react";
import { Canvas, Text } from "fabric";
import { Card } from "@/components/ui/card";
import { Image, Palette, X } from "lucide-react";
import DesignTools from "@/components/personalization/DesignTools";
import ImageUploader from "@/components/personalization/ImageUploader";
import UploadedImagesList from "@/components/personalization/UploadedImagesList";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const handleDeleteActiveObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      
      if (activeObject.type === 'image') {
        const imageUrl = (activeObject as any)._element?.src;
        setUploadedImages(prev => prev.filter(img => img.url !== imageUrl));
      }
      
      if (activeObject.type === 'text') {
        setText('');
        setActiveText(null);
      }
      
      if (deleteButtonRef.current) {
        deleteButtonRef.current.style.display = 'none';
      }
      toast.success("Élément supprimé !");
    }
  };

  const handleDeleteImage = (imageToDelete: UploadedImage) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageToDelete.id));
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasWidth = isMobile ? window.innerWidth - 32 : 500;
    const canvasHeight = isMobile ? window.innerHeight * 0.5 : 600;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#f8f9fa",
      preserveObjectStacking: true,
    });

    const placeholderText = new Text("Tapez votre texte ici...", {
      left: fabricCanvas.width! / 2,
      top: fabricCanvas.height! / 2,
      fontSize: 20,
      fill: "#999999",
      fontFamily: selectedFont,
      originX: 'center',
      originY: 'center',
      selectable: false,
      opacity: 0.7
    });

    fabricCanvas.add(placeholderText);
    fabricCanvas.renderAll();

    fabricCanvas.on('selection:created', (e) => {
      const obj = e.selected?.[0];
      if (obj instanceof Text) {
        setActiveText(obj);
      }
      if (deleteButtonRef.current) {
        const bounds = obj?.getBoundingRect();
        if (bounds) {
          deleteButtonRef.current.style.display = 'block';
          deleteButtonRef.current.style.left = `${bounds.left + bounds.width + 10}px`;
          deleteButtonRef.current.style.top = `${bounds.top}px`;
        }
      }
    });

    fabricCanvas.on('selection:cleared', () => {
      setActiveText(null);
      if (deleteButtonRef.current) {
        deleteButtonRef.current.style.display = 'none';
      }
    });

    fabricCanvas.on('object:moving', (e) => {
      if (deleteButtonRef.current && e.target) {
        const bounds = e.target.getBoundingRect();
        deleteButtonRef.current.style.left = `${bounds.left + bounds.width + 10}px`;
        deleteButtonRef.current.style.top = `${bounds.top}px`;
      }
    });

    setCanvas(fabricCanvas);

    const handleResize = () => {
      const newWidth = isMobile ? window.innerWidth - 32 : 500;
      const newHeight = isMobile ? window.innerHeight * 0.5 : 600;
      fabricCanvas.setDimensions({ width: newWidth, height: newHeight });
      fabricCanvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!canvas) return;

    const existingTexts = canvas.getObjects().filter(obj => obj instanceof Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
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
      const placeholderText = new Text("Tapez votre texte ici...", {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });
      canvas.add(placeholderText);
    }

    canvas.renderAll();
  }, [text, canvas]);

  return (
    <div className="container mx-auto py-6 px-4 lg:py-12 max-w-[100vw] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          <div className="lg:col-span-8 order-first">
            <Card className="p-4 lg:p-6">
              <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative min-h-[600px]">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full touch-manipulation shadow-lg"
                />
                <button
                  ref={deleteButtonRef}
                  onClick={handleDeleteActiveObject}
                  className="absolute hidden bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors w-6 h-6 flex items-center justify-center"
                  style={{
                    zIndex: 1000,
                    right: '10px',
                    top: '10px',
                    padding: 0,
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="p-4 lg:p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6 justify-start">
                  <Palette className="h-5 w-5" />
                  Outils de Design
                </h2>
                
                <DesignTools
                  text={text}
                  setText={setText}
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                  textColor={textColor}
                  setTextColor={setTextColor}
                  activeText={activeText}
                  canvas={canvas}
                  fonts={fonts}
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Image className="h-5 w-5" />
                  Images Téléchargées
                </h2>
                <div className="space-y-4">
                  <ImageUploader
                    canvas={canvas}
                    onImageUpload={(image) => {
                      setUploadedImages(prev => [...prev, image]);
                      toast.success("Image ajoutée avec succès !");
                    }}
                  />
                  <UploadedImagesList 
                    images={uploadedImages}
                    canvas={canvas}
                    onImageClick={(image) => {
                      if (!canvas) return;
                      const obj = canvas.getObjects().find(
                        obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                      );
                      if (obj) {
                        canvas.setActiveObject(obj);
                        canvas.renderAll();
                      }
                    }}
                    onOpacityChange={(image, opacity) => {
                      if (!canvas) return;
                      const obj = canvas.getObjects().find(
                        obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                      );
                      if (obj) {
                        obj.set('opacity', opacity);
                        canvas.renderAll();
                      }
                    }}
                    onDeleteImage={handleDeleteImage}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;