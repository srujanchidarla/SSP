// src/pages/ScanPage.tsx
import React, { useState } from 'react';
import BarcodeScanner from '../components/scanner/BarcodeScanner';
import type { Html5QrcodeResult } from 'html5-qrcode';
import { Button } from '../components/ui';

const ScanPage = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const handleScanSuccess = (decodedText: string, decodedResult: Html5QrcodeResult) => {
    console.log(Scan result: ${decodedText}, decodedResult);
    setScanResult(decodedText);
    setIsScanning(false);
    // Here you would typically look up the product and add it to the cart
  };

  const handleScanAgain = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>
        {scanResult ? 'Scan Complete' : 'Scan Item'}
      </h1>
      <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>
        {scanResult
          ? Scanned Barcode: ${scanResult}
          : "Center the item's barcode in the frame."}
      </p>

      {isScanning && (
        <BarcodeScanner
          onScanSuccess={handleScanSuccess}
          onScanFailure={(error) => console.warn(error)}
        />
      )}
      
      {scanResult && (
        <div style={{ marginTop: '2rem' }}>
          <Button onClick={handleScanAgain} variant="outline">
            Scan Another Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScanPage;