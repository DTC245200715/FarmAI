import React from 'react';
import { LucideIcon } from 'lucide-react';
import { HeroButton } from './HeroUIComponents';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-xs">
      <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-md leading-relaxed">{description}</p>

      {(actionText || secondaryActionText) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actionText && onAction && (
            <HeroButton variant="primary" size="sm" onClick={onAction}>
              {actionText}
            </HeroButton>
          )}
          {secondaryActionText && onSecondaryAction && (
            <HeroButton variant="outline" size="sm" onClick={onSecondaryAction}>
              {secondaryActionText}
            </HeroButton>
          )}
        </div>
      )}
    </div>
  );
};
