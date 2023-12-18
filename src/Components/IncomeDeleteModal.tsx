import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IncomeDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onDeleteConfirmed: () => void;
}

const IncomeDeleteModal: FC<IncomeDeleteModalProps> = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton className='mp-darkgreen-bg text-light '>
        <Modal.Title>Är du säker på att du vill ta bort denna inkomst?</Modal.Title>
      </Modal.Header>
      <Modal.Footer className='d-flex justify-content-between mp-darkgreen-bg'>
        <Button variant="light" onClick={props.onHide}>
          Avbryt
        </Button>
        <Button variant="danger" onClick={props.onDeleteConfirmed}>
          Ja, ta bort
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IncomeDeleteModal;