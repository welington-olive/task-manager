import React from 'react'
import Modal from 'react-native-modal'
import { ModalContainer } from './styles/ModalStyles'

interface CustomModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

export function CustomModal({ visible, onClose, children }: CustomModalProps) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  )
}