import React from "react";
import './stat.scss';

import Modal from "../modal/Modal";

const Stat = ({close}:any) => {
    return (
        <Modal title={"Statistics"} close={close}>
            <div className="stat">
                
                <p className="stat__text">It`s simple stat text</p>

            </div>
        </Modal>
    )
}

export default Stat;