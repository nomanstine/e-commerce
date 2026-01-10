import Link from 'next/link';

interface Category {
  name: string;
  image: string;
  count: number;
}

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/shop/category/${category.name.toLowerCase()}`}
          className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="aspect-square bg-gray-200">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <h3 className="text-white font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
              {category.name}
            </h3>
            <p className="text-amber-200 text-sm sm:text-base">{category.count} items</p>
          </div>
        </Link>
      ))}
    </div>
  );
}