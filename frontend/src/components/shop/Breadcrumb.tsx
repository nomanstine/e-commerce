import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b border-amber-200">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          {items.map((item, index) => (
            <span key={index} className="flex items-center">
              {item.href ? (
                <Link href={item.href} className="hover:text-amber-900">
                  {item.label}
                </Link>
              ) : (
                <span className="text-amber-900 font-semibold">{item.label}</span>
              )}
              {index < items.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}