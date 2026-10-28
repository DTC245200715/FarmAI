import React from 'react';
import { AnimalStatus } from '../../types/farm';
import { HeartPulse, ShieldCheck, AlertTriangle, AlertCircle, Baby } from 'lucide-react';
import { HeroChip } from './HeroUIComponents';

interface HealthBadgeProps {
  status: AnimalStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const HealthBadge: React.FC<HealthBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  let label = 'Khỏe mạnh';
  let variant: 'success' | 'warning' | 'danger' | 'purple' | 'neutral' = 'success';
  let IconComponent = ShieldCheck;

  switch (status) {
    case 'healthy':
      label = 'Khỏe mạnh';
      variant = 'success';
      IconComponent = ShieldCheck;
      break;
    case 'monitoring':
      label = 'Cần theo dõi';
      variant = 'warning';
      IconComponent = AlertTriangle;
      break;
    case 'sick':
      label = 'Đang điều trị';
      variant = 'danger';
      IconComponent = HeartPulse;
      break;
    case 'isolated':
      label = 'Cách ly y tế';
      variant = 'danger';
      IconComponent = AlertCircle;
      break;
    case 'pregnant':
      label = 'Mang thai';
      variant = 'purple';
      IconComponent = Baby;
      break;
    default:
      label = status;
      variant = 'neutral';
      IconComponent = ShieldCheck;
      break;
  }

  return (
    <HeroChip
      label={label}
      variant={variant}
      size={size}
      dot
      icon={showIcon ? <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} /> : undefined}
    />
  );
};
