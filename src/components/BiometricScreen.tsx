
import React, { useState, useEffect } from "react";
import { useVoting } from "../context/VotingContext";
import { Fingerprint } from "lucide-react";

const BiometricScreen: React.FC = () => {
  const { setCurrentStep, voterName, voterID } = useVoting();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        // Simulate scan complete
        setScanning(false);
        setCurrentStep("ballot");
      }, 3500);

      // Progress animation
      const interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 4 : prev));
      }, 140);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [scanning, setCurrentStep]);

  const handleScanStart = () => {
    setScanning(true);
    setProgress(0);
  };

  return (
    <div className="eci-card max-w-xl mx-auto mt-10">
      <h2 className="eci-heading">Step 2 of 4: Biometric Verification</h2>
      <p className="eci-subheading">Please provide fingerprint for verification</p>
      
      <div className="eci-progress">
        <div 
          className="bg-eci-blue h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center text-left">
          <div>
            <p className="text-gray-500 text-sm">Voter Name</p>
            <p className="font-semibold">{voterName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Voter ID</p>
            <p className="font-semibold">{voterID}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="fingerprint-scan-area mb-4">
          {scanning ? (
            <div className="animate-pulse">
              <Fingerprint className="h-20 w-20 text-eci-blue" />
            </div>
          ) : (
            <Fingerprint className="h-20 w-20 text-gray-400" />
          )}
        </div>
        
        {!scanning ? (
          <button
            onClick={handleScanStart}
            className="eci-button"
          >
            Scan Fingerprint
          </button>
        ) : (
          <div className="text-center text-lg text-eci-blue animate-pulse font-medium">
            Scanning Fingerprint...
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm">
        <p className="font-medium text-center">Instructions:</p>
        <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-600">
          <li>Place your right thumb firmly on the fingerprint scanner</li>
          <li>Hold still until scanning completes</li>
          <li>Do not remove your finger until prompted</li>
        </ol>
      </div>
      
      <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded text-sm text-green-800">
        <p className="flex items-center gap-2">
          <span className="font-medium">Security:</span> 
          Your biometric data is encrypted and stored securely in the local database only
        </p>
      </div>
    </div>
  );
};

export default BiometricScreen;
