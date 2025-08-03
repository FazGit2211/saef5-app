import { useState } from "react"

const useModal = () => {
    const [modalPlayer, setModalPlayer] = useState(false);
    const closeModalPlayer = () => { setModalPlayer(false) };
    const openModalPlayer = () => { setModalPlayer(true) };

    const [modalPlayerEdit, setModalPlayerEdit] = useState(false);
    const closeModalPlayerEdit = () => { setModalPlayerEdit(false) };
    const openModalPlayerEdit = () => { setModalPlayerEdit(true) };

    const [modalDate, setModalDate] = useState(false);
    const closeModalDate = () => { setModalDate(false) };
    const openModalDate = () => { setModalDate(true) };

    const [modalStadium, setModalStadium] = useState(false);
    const closeModalStadium = () => { setModalStadium(false) };
    const openModalStadium = () => { setModalStadium(true) };


    return { modalDate, closeModalDate, openModalDate, modalStadium, closeModalStadium, openModalStadium, modalPlayer, closeModalPlayer, openModalPlayer, modalPlayerEdit, closeModalPlayerEdit, openModalPlayerEdit }
}

export default useModal;