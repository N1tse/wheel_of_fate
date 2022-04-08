import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

export function Home  () {
  const [choices,setChoices] = useState([]);
  const [choice,setChoice] = useState(null);
  const [showSpinner,setShowSpinner] = useState(false);
  const [winner,setWinner] = useState(null);
  

  const add = () =>{
    const list = choices;
    list.push(choice);
    setChoices(list);
    setChoice(null);
  }

  const deleteChoice = (c) =>{
    setChoices( choices.filter(items=>items !== c));
  }

  const startSpin = () =>{
    setShowSpinner(true);
  }

  const reset = () =>{
    setShowSpinner(false);
    setChoices([]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fate</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Let me choose</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer setShowSpinner={setShowSpinner} setWinner={setWinner} winner={winner} reset={reset} startSpin={startSpin} showSpinner={showSpinner} deleteChoice={deleteChoice} add={add} choices={choices} setChoices={setChoices} choice={choice} setChoice={setChoice} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
