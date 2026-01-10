interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
    </div>
  );
}