import { Badge as ShadcnBadge } from '@/components/ui/badge';

type StatusBadgeProps = {
  status?: string;
  label?: string;
  children?: React.ReactNode;
};

export default function Badge({ status, label, children }: StatusBadgeProps) {
  const displayText = children || label || status;
  
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  
  if (status) {
    switch (status.toLowerCase()) {
      case 'aprobada':
      case 'activo':
      case 'disponible':
        variant = 'default';
        break;
      case 'pendiente':
      case 'en_revision':
        variant = 'secondary';
        break;
      case 'rechazada':
      case 'cancelada':
        variant = 'destructive';
        break;
      default:
        variant = 'outline';
    }
  }

  return <ShadcnBadge variant={variant}>{displayText}</ShadcnBadge>;
}
