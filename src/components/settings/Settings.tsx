import React from "react";
import './settings.scss'

import Modal from '../modal/Modal';

const Settings = ({close}:any) => {
    return (
        <Modal title={'Settings'} close={close} >
            <div className="settings">
                <input placeholder="Тутт скоро будут рабочие поля"></input>
            </div>
        </Modal>
    );
};

export default Settings;