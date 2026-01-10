import Link from 'next/link';

interface NavButton {
  href: string;
  label: string;
  primary?: boolean;
}

interface NavigationButtonsProps {
  buttons: NavButton[];
}

export default function NavigationButtons({ buttons }: NavigationButtonsProps) {
  return (
    <div className="text-center mt-12 space-x-4">
      {buttons.map((button, index) => (
        <Link
          key={index}
          href={button.href}
          className={`inline-block px-6 py-3 rounded-lg font-semibold transition ${
            button.primary
              ? 'bg-amber-900 text-white hover:bg-amber-800'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
}