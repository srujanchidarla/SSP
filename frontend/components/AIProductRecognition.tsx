'use client';

import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface AIProductRecognitionProps {
  onProductRecognized: (productData: any) => void;
}

export default function AIProductRecognition({ onProductRecognized }: AIProductRecognitionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setShowCamera(true);
      }
    } catch (error) {
      toast.error('Could not access camera');
      console.error(error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);

        // Convert to base64
        const imageData = canvas.toDataURL('image/jpeg');
        processImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        processImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const result = await api.ai.recognizeProduct(imageData);

      if (result.confidence >= 0.7) {
        toast.success(`Product identified: ${result.product_name}`);
        onProductRecognized(result);
      } else {
        toast.error('Could not identify product with high confidence. Please try again or use barcode scanner.');
      }
    } catch (error) {
      toast.error('AI recognition failed. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6 mb-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">AI Product Recognition</h2>
      <p className="text-sm text-gray-300 mb-4">
        Can't scan the barcode? Take a photo and let AI identify the product!
      </p>

      {!showCamera ? (
        <div className="flex gap-3">
          <button
            onClick={startCamera}
            disabled={isProcessing}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Take Photo
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg mb-3"
          />
          <div className="flex gap-3">
            <button
              onClick={capturePhoto}
              disabled={isProcessing}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50"
            >
              Capture Photo
            </button>
            <button
              onClick={stopCamera}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {isProcessing && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="text-sm text-gray-300 mt-2">AI is analyzing the image...</p>
        </div>
      )}
    </div>
  );
}
