import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, type Html5QrcodeResult } from 'html5-qrcode';
import styles from './BarcodeScanner.module.css';

interface BarcodeScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: Html5QrcodeResult) => void;
  onScanFailure?: (error: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(true);

  useEffect(() => {
    // Check if a scanner instance already exists
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader', // ID of the div to render the scanner
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
        },
        false // verbose
      );

      const handleSuccess = (decodedText: string, decodedResult: Html5QrcodeResult) => {
        // Stop the scanner to prevent multiple scans
        if (isScannerActive) {
          onScanSuccess(decodedText, decodedResult);
          setIsScannerActive(false);
          scanner.clear().catch(error => console.error("Failed to clear scanner.", error));
        }
      };

      const handleError = (error: string) => {
        if (onScanFailure) {
          onScanFailure(error);
        }
      };

      scanner.render(handleSuccess, handleError);
      scannerRef.current = scanner;
    }

    // Cleanup function to clear the scanner on component unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner on unmount.", error);
        });
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess, onScanFailure, isScannerActive]);

  return <div id="qr-reader" className={styles.scannerContainer}></div>;
};

export default BarcodeScanner;