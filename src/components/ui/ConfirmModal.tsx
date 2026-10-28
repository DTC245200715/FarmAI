import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { HeroModal, HeroButton } from './HeroUIComponents';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  return (
    <HeroModal
      isOpen={isOpen}
      onClose={onCancel}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl ${
              isDestructive ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-base">{title}</span>
        </div>
      }
      footer={
        <>
          <HeroButton variant="outline" size="sm" onClick={onCancel}>
            {cancelText}
          </HeroButton>
          <HeroButton
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
          >
            {confirmText}
          </HeroButton>
        </>
      }
    >
      <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
    </HeroModal>
  );
};
