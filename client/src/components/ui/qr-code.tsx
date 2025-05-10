import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QRCodeGeneratorProps {
  value: string;
  title?: string;
  description?: string;
  size?: number;
  showDownloadButton?: boolean;
  showPrintButton?: boolean;
}

const QRCodeGenerator = ({
  value,
  title = "Your QR Code",
  description = "Allow customers to scan for verification",
  size = 128,
  showDownloadButton = true,
  showPrintButton = true
}: QRCodeGeneratorProps) => {
  const [qrValue, setQrValue] = useState(value);
  
  useEffect(() => {
    setQrValue(value);
  }, [value]);
  
  const handleDownload = () => {
    const canvas = document.querySelector('#qr-code-svg')?.querySelector('canvas');
    if (!canvas) {
      // If canvas not available, create it from the SVG
      const svg = document.querySelector('#qr-code-svg')?.querySelector('svg');
      if (!svg) return;
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }
    
    // If canvas is available, use it
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    
    const svg = document.querySelector('#qr-code-svg')?.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const titleHtml = title ? `<h2 style="text-align:center;font-family:sans-serif;">${title}</h2>` : '';
    const descHtml = description ? `<p style="text-align:center;font-family:sans-serif;color:#666;">${description}</p>` : '';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .qr-container { padding: 20px; border: 1px solid #ccc; border-radius: 10px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            ${titleHtml}
            ${svgData}
            ${descHtml}
          </div>
          <script>
            window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };
  
  return (
    <div className="p-4 bg-neutral-light rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div id="qr-code-svg" className="w-32 h-32 bg-white p-2 rounded-lg shadow-md mx-auto mb-2 flex items-center justify-center">
          <QRCodeSVG value={qrValue} size={size} includeMargin={true} />
        </div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
        
        {(showDownloadButton || showPrintButton) && (
          <div className="mt-4 space-y-2">
            {showPrintButton && (
              <Button
                className="w-full py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition"
                onClick={handlePrint}
              >
                Print QR Poster
              </Button>
            )}
            
            {showDownloadButton && (
              <Button
                variant="outline"
                className="w-full py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-white transition"
                onClick={handleDownload}
              >
                Download QR Code
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
