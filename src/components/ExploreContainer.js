import { IonButton, IonChip, IonIcon, IonInput, IonItem, IonLabel, CreateAnimation, Animation, createAnimation } from '@ionic/react';
import './ExploreContainer.css';
import { arrowUndo, logoXbox, add, closeCircleOutline } from 'ionicons/icons';
import WheelComponent from 'react-wheel-of-prizes'
import { swap } from "react-magic";
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { isPlatform } from '@ionic/react';
//import 'react-wheel-of-prizes/dist/index.css'


function ExploreContainer(props) {

  const [anim, setAnim] = useState(false);

  const segColors = []
  for (let i = 0; i < 10; i++) {
    segColors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }

  const onFinished = (winner) => {
    console.log(winner)
    props.setWinner(winner);
    setTimeout(() => { props.setShowSpinner(false); }, 2800);
    setTimeout(() => { setAnim(true); }, 3000);
    setTimeout(() => { setAnim(false); }, 5000);
    setTimeout(() => { props.setShowResult(true) }, 5000);
    //https://www.youtube.com/watch?v=GNSWPnn3Ffs
  }
  console.log(props.winner)
  return (
    <div className="container">
      {props.showSpinner ? null :
        <>
          {props.showResult ?
            <div id='result2'>
              <h2>{props.winner}</h2>
            </div> : null
          }
          <IonItem>
            <IonLabel position="floating">Add choice</IonLabel>
            <IonInput value={props.choice} onIonChange={e => props.setChoice(e.detail.value)}></IonInput>
            <IonButton id="addBtn" disabled={props.choice === null || props.choice === ''} expand='block' onClick={props.add} slot={'end'}>
              <IonIcon icon={add} />
            </IonButton>
          </IonItem>

          <div style={{ position: 'absolute' }} className='ion-margin-vertical'>
            {props.choices.map((c, i) => {
              let color = Math.floor(Math.random() * 16777215).toString(16);
              return <IonChip style={{ backgroundColor: "#" + color }} className='chipChoise' key={i} onClick={props.deleteChoice.bind(this, c)}>
                <IonLabel>{c}</IonLabel>
                <IonIcon style={{ fontSize: '30px', color: 'white' }} icon={closeCircleOutline} />
              </IonChip>
            })}
          </div>
          <IonButton id='startButton' disabled={props.choices.length <= 1} expand='full' onClick={props.startSpin}>START</IonButton>
          {props.winner === null ? null :
            <CSSTransition
              in={anim}
              timeout={300}
              classNames="winner"
              unmountOnExit
              onEnter={() => console.log('on enter')}
              onExited={() => console.log('on exit')}
            >
              <div id='result'>
                <h2>{props.winner}</h2>
              </div>
            </CSSTransition>
          }

        </>}

      {props.showSpinner ?
        <div id={isPlatform('ios') ? 'divWheel' : 'divWheelAndroid'}>
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
          {/* <IonButton id={isPlatform('ios') ? 'resetButton' : 'resetButtonAndroid'} shape="round" fill="outline" onClick={props.reset}><IonIcon slot="icon-only" icon={arrowUndo} /></IonButton> */}
        </div> : null}

    </div>
  );
};

export default ExploreContainer;
