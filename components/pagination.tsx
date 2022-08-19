import Link from 'next/link';

export default function Pagination({
	pages,
	current_page = 1,
}: {
	pages: number[];
	current_page: number;
}) {
  return (
    <div className={`flex items-center space-x-1 mt-8`}>
      {pages.map((page) => (
        <Link href={`/page/${page}`} key={page}>
          <a
            className={`px-4 py-2 border hover:bg-black hover:text-white ${
              current_page == page && 'bg-black text-white'
            }`}
          >
            {page}
          </a>
        </Link>
      ))}
    </div>
  );
};
