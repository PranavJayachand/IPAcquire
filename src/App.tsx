import React, { useEffect, useState } from 'react';
import './App.css';
import PhonemeWithInput from './components/PhonemeWithInput';
import HealthBar from './components/HealthBar';

enum PlaceOfArticulation { Bilabial = "Bilabial", Labiodental = "Labiodental", Dental = "Dental", Alveolar = "Alveolar", Postalveolar = "Postalveolar", Palatal = "Palatal", Glottal = "Glottal", Velar = "Velar" };
enum MannerOfArticulation { Plosive = "Plosive", Nasal = "Nasal", Trill = "Trill", TapFlap = "TapFlap", Fricative = "Fricative", LateralFricative = "LateralFricative", Approximant = "Approximant", LateralApproximant = "LateralApproximant" };
// Not using Clicks, Implosives, or Ejectives to keep to basic IPA chart for MVP.
enum Voicing { Voiceless = "Voiceless", Voiced = "Voiced" };

const ipa_characters: Consonant[] = [
  { symbol: "p", place: PlaceOfArticulation.Bilabial, manner: MannerOfArticulation.Plosive, voicing: Voicing.Voiceless }
];

export type Consonant = {
  symbol: string;
  place: PlaceOfArticulation;
  manner: MannerOfArticulation;
  voicing: Voicing;
}

function cleanInputString(userInput: string): string {
  return userInput.replace(/\s|\-/g, "").toLowerCase();
}

function getPlaceOfArticulationFromInput(userInput: string): PlaceOfArticulation {
  switch (cleanInputString(userInput)) { // add a remove "- " in regex? to account for post-alveolar and post alveolar
    case "bilabial":
      return PlaceOfArticulation.Bilabial;
    case "labiodental":
      return PlaceOfArticulation.Labiodental;
    case "dental":
      return PlaceOfArticulation.Dental;
    case "alveolar":
      return PlaceOfArticulation.Alveolar;
    case "postalveolar":
      return PlaceOfArticulation.Postalveolar;
    case "palatal":
      return PlaceOfArticulation.Palatal;
    case "velar":
      return PlaceOfArticulation.Velar;
    case "glottal":
      return PlaceOfArticulation.Glottal;
    default:
      throw new Error("Invalid place of articulation input");
  }
}


function getMannerOfArticulationFromInput(userInput: string): MannerOfArticulation {
  switch (cleanInputString(userInput)) {
    case "plosive":
      return MannerOfArticulation.Plosive;
    case "nasal":
      return MannerOfArticulation.Nasal;
    case "trill":
      return MannerOfArticulation.Trill;
    case "tap":
      return MannerOfArticulation.TapFlap;
    case "flap":
      return MannerOfArticulation.TapFlap;
    case "fricative":
      return MannerOfArticulation.Fricative;
    case "lateralfricative":
      return MannerOfArticulation.LateralFricative;
    case "approximant":
      return MannerOfArticulation.Approximant;
    case "lateral":
      return MannerOfArticulation.LateralApproximant;
    case "lateralapproximant":
      return MannerOfArticulation.LateralApproximant;
    default:
      throw new Error("Invalid manner of articulation input");
  }
}

function getVoicingFromInput(userInput: string): Voicing {
  switch (cleanInputString(userInput)) {
    case "voiced":
      return Voicing.Voiced;
    case "voiceless":
      return Voicing.Voiceless;
    default:
      throw new Error("Invalid voicing input");
  }
}

function returnRandomConsonant() {
  const randomIndex = Math.floor(Math.random() * ipa_characters.length);
  return ipa_characters[randomIndex];
}

function ConsonantQuiz() {
  const [currentConsonant, setCurrentConsonant] = useState<Consonant | null>(null);
  const [userAnswers, setUserAnswers] = useState({
    voicing: "",
    placeOfArticulation: "",
    mannerOfArticulation: "",
  });
  const [attempts, setAttempts] = useState(0);  // Count number of attempts
  const [isLastAttemptCorrect, setIsLastAttemptCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // ... other logic
    event.preventDefault()

    if (isSubmitted) {
      if (!isCorrect && attempts < 3) {
        tryAgain();
      } else {
        handleNextConsonant();
      }
    } else {
      // if (!isCorrect) {
      setIsSubmitted(true);
      setAttempts(attempts + 1);

      let feedbackString = "";

      try {
        const selectedPlaceOfArticulation = getPlaceOfArticulationFromInput(userAnswers.placeOfArticulation);
        if (selectedPlaceOfArticulation != currentConsonant?.place) {
          feedbackString += "Place of articulation is incorrrect.\n";
        }
      } catch (error) {
        feedbackString += "Invalid place of articulation entered.\n";
      }

      try {
        const selectedMannerOfArticulation = getMannerOfArticulationFromInput(userAnswers.mannerOfArticulation);
        if (selectedMannerOfArticulation != currentConsonant?.manner) {
          feedbackString += "Manner of articulation is incorrrect.\n";
        }
      } catch (error) {
        feedbackString += "Invalid manner of articulation entered.\n";
      }

      try {
        const selectedVoicing = getVoicingFromInput(userAnswers.voicing);
        if (selectedVoicing != currentConsonant?.voicing) {
          feedbackString += "Voicing is incorrrect.\n";
        }
      } catch (error) {
        feedbackString += "Invalid voicing entered.\n";
      }

      // Track progress TODO

      if (feedbackString) {
        setFeedback(feedbackString);
      } else {
        setFeedback("Correct!")
        setIsCorrect(true);
      }
      // } else {
      //   handleNextConsonant(); // This should be redundant as "FEEDBACK" wil always exist if correct
      // }
    }
  };

  useEffect(() => {
    setCurrentConsonant(returnRandomConsonant());
  }, []);

  // Fetch consonant data (logic omitted for brevity)
  // ...

  const handleNextConsonant = () => {
    // Fetch a new random consonant (logic assumed)
    const newConsonant = returnRandomConsonant();
    setCurrentConsonant(newConsonant);
    setIsSubmitted(false);
    setAttempts(0); // Reset attempts for next consonant
    setIsCorrect(false); // Reset isCorrect for next question
    setFeedback(""); // Reset feedback for next question (optional)
  };

  const tryAgain = () => {
    setIsSubmitted(false);
    setFeedback("");
  }
  // ... other component logic


  return (
    <div className="main-content">
      <HealthBar attempts={attempts} maxAttempts={3} />
      {currentConsonant && (
        <div className="exercise">
          <h2>What are the properties of this consonant?</h2>
          <p className="symbol">{currentConsonant.symbol}</p>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="voicing">Voicing:</label>
            <input
              type="text"
              id="voicing"
              value={userAnswers.voicing}
              onChange={(e) => setUserAnswers({ ...userAnswers, voicing: e.target.value })}
            />
            <label htmlFor="placeOfArticulation">Place of Articulation:</label>
            <input
              type="text"
              id="placeOfArticulation"
              value={userAnswers.placeOfArticulation}
              onChange={(e) => setUserAnswers({ ...userAnswers, placeOfArticulation: e.target.value })}
            />
            <label htmlFor="mannerOfArticulation">Manner of Articulation:</label>
            <input
              type="text"
              id="mannerOfArticulation"
              value={userAnswers.mannerOfArticulation}
              onChange={(e) => setUserAnswers({ ...userAnswers, mannerOfArticulation: e.target.value })}
            />
            <button type="submit">
              {isCorrect || attempts >= 3 ? 'Next Consonant' : (feedback ? 'Try Again' : 'Submit')}
            </button>
          </form>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      )}
    </div>
  );
}

// function DisplayPhoneme 



const App: React.FC = () => {
  // pick random index of list IPA, pass that index into PhonemeWithInput and have it construct what it needs to
  return (
    <div>
      <ConsonantQuiz />
    </div>
  );
  // return (
  //   <div className="App">
  //     <PhonemeWithInput phoneme={char} />
  //   </div>
  // );
}


export default App;
