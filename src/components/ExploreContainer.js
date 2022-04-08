import { IonButton, IonChip, IonDatetime, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel } from '@ionic/react';
import './ExploreContainer.css';
import { arrowUndo,logoXbox } from 'ionicons/icons';
import WheelComponent from 'react-wheel-of-prizes'
//import 'react-wheel-of-prizes/dist/index.css'


function ExploreContainer(props) {
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const onFinished = (winner) => {
    console.log(winner)
    props.setWinner(winner);
    props.setShowSpinner(false);
  }
  return (
    <div className="container">
      {props.showSpinner ? null : 
      <>
      <IonItem>
        <IonLabel position="floating">Add choice</IonLabel>
          <IonInput  value={props.choice} onIonChange={e => props.setChoice(e.detail.value)}></IonInput>
      </IonItem>
      <IonButton disabled={props.choice === null || props.choice === ''} expand='full' onClick={props.add}>ADD</IonButton>
      {props.choices.map((c,i)=>{
        return <IonChip key={i} onClick={props.deleteChoice.bind(this,c)}>
                <IonLabel>{c}</IonLabel>
                <IonIcon icon={logoXbox} />
              </IonChip>
      })}
      <IonButton disabled={props.choices.length <= 1} expand='full' onClick={props.startSpin}>START</IonButton>
      <h2>{props.winner}</h2>
      </>}
      
      {props.showSpinner ?
        <div>
        <WheelComponent
        segments={props.choices}
        segColors={segColors}
        //winningSegment='won 10'
        onFinished={(winner) => onFinished(winner)}
        primaryColor='black'
        contrastColor='white'
        buttonText='Spin'
        isOnlyOnce={false}
        size={200}
        upDuration={100}
        downDuration={1000}
        fontFamily='Arial'
      />
    <IonButton id='resetButton' shape="round" fill="outline" onClick={props.reset}><IonIcon slot="icon-only" icon={arrowUndo} /></IonButton>
    </div> : null }
      
    </div>
  );
};

export default ExploreContainer;
