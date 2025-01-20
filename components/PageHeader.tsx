interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
