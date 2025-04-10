
import React, { useState } from "react";
import { useVoting } from "../context/VotingContext";
import { Check, Edit } from "lucide-react";
import { Button } from "./ui/button";

// Sample candidate data
const candidates = [
  { id: "1", name: "Candidate A", party: "Party One", symbol: "🌞" },
  { id: "2", name: "Candidate B", party: "Party Two", symbol: "🌙" },
  { id: "3", name: "Candidate C", party: "Party Three", symbol: "⭐" },
  { id: "4", name: "Candidate D", party: "Party Four", symbol: "🌈" },
  { id: "5", name: "Candidate E", party: "Party Five", symbol: "🌊" },
  { id: "6", name: "NOTA", party: "None Of The Above", symbol: "❌" }
];

const BallotScreen: React.FC = () => {
  const { setCurrentStep, selectedCandidate, setSelectedCandidate } = useVoting();
  const [submitting, setSubmitting] = useState(false);

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidate(id);
  };

  const handleCastVote = () => {
    if (!selectedCandidate) return;
    
    setSubmitting(true);
    
    // Simulate vote submission with a short delay
    setTimeout(() => {
      setSubmitting(false);
      setCurrentStep("success");
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-eci-navy text-center mb-2">Step 3 of 3: Cast Your Vote</h2>
      <p className="text-gray-500 text-center mb-6">Select your preferred candidate</p>
      
      <div className="w-full mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-center text-yellow-700 text-sm">
          The ballot unit is now active. Your vote is confidential and secure.
        </p>
      </div>
      
      <div className="w-full mb-8">
        {candidates.map((candidate) => (
          <div 
            key={candidate.id}
            className={`
              border rounded-md p-4 mb-3 flex items-center
              ${selectedCandidate === candidate.id 
                ? 'border-eci-blue bg-blue-50' 
                : 'border-gray-200'}
            `}
          >
            <div className="flex-shrink-0 h-12 w-12 bg-white rounded-full border 
                          border-gray-200 flex items-center justify-center text-2xl mr-4">
              {candidate.symbol}
            </div>
            
            <div className="flex-grow">
              <p className="font-semibold">{candidate.name}</p>
              <p className="text-sm text-gray-500">{candidate.party}</p>
            </div>

            {selectedCandidate === candidate.id ? (
              <div className="flex-shrink-0 h-8 w-8 bg-eci-blue rounded-full 
                            flex items-center justify-center text-white">
                <Check className="h-5 w-5" />
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-shrink-0 text-eci-blue hover:text-blue-700"
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Select
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <button
        onClick={handleCastVote}
        className={`bg-eci-blue text-white py-3 px-8 rounded-md shadow-md w-full 
                  ${!selectedCandidate ? 'opacity-50 cursor-not-allowed' : 
                  submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        disabled={!selectedCandidate || submitting}
      >
        {submitting ? "Casting Vote..." : "Cast Your Vote"}
      </button>
      
      <div className="mt-6 text-sm">
        <p className="font-medium text-center">Instructions:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
          <li>Select only one candidate</li>
          <li>Your vote is confidential and securely recorded</li>
          <li>Once cast, your vote cannot be changed</li>
        </ul>
      </div>
    </div>
  );
};

export default BallotScreen;
