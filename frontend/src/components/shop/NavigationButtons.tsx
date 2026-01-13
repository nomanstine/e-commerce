import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
        <Link key={index} href={button.href}>
          <Button variant={button.primary ? "default" : "outline"}>
            {button.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}