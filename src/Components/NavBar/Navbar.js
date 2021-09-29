
import React  from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Rapport from "../Rapport/Rapport"
import "./Navbar.css"
const Navbar = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    Array.from(document.getElementsByClassName("map")).forEach(e => e.style.visibility = "hidden");
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = 'black';
  }

  function closeModal() {
    setIsOpen(false);
    Array.from(document.getElementsByClassName("map")).forEach(e => e.style.visibility = "visible");
  }

  return (
    <div>
      <nav>
        <ul className="liste">
          <h3 className="titre" >Challenge Open Data</h3>
          <ul className="list">
            <li className="items itemRapport" onClick={openModal}>Rapport</li>
          </ul>
        </ul>
      </nav>
      <Modal
        style={{overlay:{backgroundColor:"rgba(0,0,0,.6)"}}}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Rapport Modal"
      >
        <Button onClick={closeModal} className="closeBtn"><FontAwesomeIcon icon={faTimes} size="2x" /></Button>
        <Rapport />
      </Modal>
    </div>
  )
}
export default Navbar;