import React, { useEffect, useState } from 'react';
import './App.css';
import PhonemeWithInput from './components/PhonemeWithInput';
import HealthBar from './components/HealthBar';
import IPAcquireHeader from './components/IPAcquireHeader';
import ConsonantQuiz from './components/ConsonantQuiz';


const App: React.FC = () => {
  // pick random index of list IPA, pass that index into PhonemeWithInput and have it construct what it needs to
  return (
    <div className="App">
      <IPAcquireHeader />
      <main className="main-content">
        <ConsonantQuiz />
      </main>
    </div>
  );
  // return (
  //   <div className="App">
  //     <PhonemeWithInput phoneme={char} />
  //   </div>
  // );
}


export default App;
