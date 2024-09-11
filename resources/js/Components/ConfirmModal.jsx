import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'tailwindcss/tailwind.css'; // Certifique-se de que o Tailwind CSS está importado

export default function ConfirmModal({ show, onHide, onConfirm }) {
    return (
        <Modal show={show} onHide={onHide} dialogClassName="custom-modal" centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-xl font-semibold text-gray-800">Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-gray-700">
                <p>Você tem certeza de que deseja excluir este cliente? Esta ação não pode ser desfeita.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        onConfirm();
                        onHide();
                    }}
                >
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
