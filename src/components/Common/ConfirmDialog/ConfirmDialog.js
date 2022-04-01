import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({
    show,
    onClose,
    onSave,
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to permanently delete this item?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This action is irreversible!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>Confirm</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default ConfirmDialog;