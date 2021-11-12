import React, {useState, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import './App.css';


const withSwichTransition = (Component) => {
    return (props)=> {
        const duration = 3000;

        const defaultStyle = {
                transition: `all ${duration}ms ease-in-out`,
                opacity: props.condition ? 1 : 0,
                visibility: props.condition ? 'visible' : 'hidden',
                }

        const transitionStyles = {
                entering: { opacity: 1, visibility: 'visible' },
                entered:  { opacity: 1, visibility: 'visible' },
                exiting:  { opacity: 0, visibility: 'hidden' },
                exited:  { opacity: 0, visibility: 'hidden' },
                };
                
        return (
            <Transition    
                    in={props.condition} 
                    timeout={duration}
                    >
                {state => (
                    <Component 
                            newStyle={{...defaultStyle, ...transitionStyles[state]}}
                            {...props}
                            />
                    )
                }
            </Transition>
        )

    }
    
}

const Modal = (props) => {

    const onSwitch = () => {
        props.setShowModal(false)
        props.setShowTrigger(true)
    }

    return (
                
        <div className="modal mt-5 d-block" style={props.newStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Typical modal window</h5>
                    <button onClick={onSwitch} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Modal body content</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onSwitch} type="button" className="btn btn-secondary">Close</button>
                    <button onClick={onSwitch} type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

const ModalButton = (props) => {

    const onSwitch = () => {
        props.setShowModal(true)
        props.setShowTrigger(false)
    }
    
    return (
            <button 
                type="button" 
                className="btn btn-warning mt-5"
                onClick={onSwitch}
                style={props.newStyle}
                    >Open Modal</button>
    )
}


function App() {
    const [showModal, setShowModal] = useState(false);
    const [showTrigger, setShowTrigger] = useState(true)

    const TransitionButton = useCallback(withSwichTransition(ModalButton), [])
    const TransitionModal = useCallback(withSwichTransition(Modal), [])

    return (
        <Container>
            <TransitionModal
                        condition={showModal}
                        setShowModal={setShowModal} 
                        setShowTrigger={setShowTrigger}/>
            <TransitionButton 
                        condition={showTrigger}
                        setShowTrigger={setShowTrigger} 
                        setShowModal={setShowModal}/>
        </Container>
    );
}

export default App;
