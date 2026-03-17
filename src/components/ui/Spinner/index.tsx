import { Ring, type SpinnerVariant } from './styles';

interface SpinnerProps {
  variant?: SpinnerVariant;
}

export function Spinner({ variant = 'primary' }: SpinnerProps) {
  return <Ring $variant={variant} />;
}
