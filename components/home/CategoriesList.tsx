import { categories } from "@/data/categories"
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Link from 'next/link'

function CategoriesList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchTerm = search ? `&search=${search}` : '';

  return (
    <section>
      <ScrollArea className="py-2 3xl:py-6">
        <div className="flex gap-5 justify-center">
          {categories.map((item) => {
            const isActive = item.key === category
            return (
              <Link
                key={item.key}
                href={`/?category=${item.key}${searchTerm}`}
                prefetch={true}
              >
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300 hover:text-primary w-24 ${
                    isActive && 'text-primary'
                  }`}
                >
                  <item.icon className='w-8 h-8' aria-hidden="true"/>
                  <p className='text-sm mt-1'>{item.label}</p>
                </article>
              </Link>
            )
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  )
}

export default CategoriesList