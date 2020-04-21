import React from 'react';

import './modal.css';

const Modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                >
                <div className="modal-header">
                    {props.header}
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-done" onClick={props.close}>Done</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;