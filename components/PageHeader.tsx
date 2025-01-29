import { AnimatedCTAButton } from './AnimatedCTAButton';

interface PageHeaderProps {
  title: string;
  middleButton?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  actions,
  middleButton,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center my-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {middleButton && middleButton}
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
