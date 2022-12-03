import React, { JSXElementConstructor } from "react";
import { motion } from 'framer-motion';
import './modal.scss'

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const Modal = ({ children, title, close }: any) => {
    return (
        <motion.div
            className="modal"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <header className="modal__header">
                <h1 className="modal__title">{title}</h1>
                <button
                    className="modal__btn"
                    onClick={() => close()}
                >close</button>
            </header>
            {children}
        </motion.div>
    )
}

export default Modal;