import Banner from "./component/Banner";
import TopPicks from "./component/TopPicks";
import Pagination from "./component/Pagination";

const Home = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(searchParams.limit) || 5; // Default to 5 items per page
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(
    `${API_BASE_URL}?page=${page}&limit=${limit}`,
    {
      next: { tags: ["products"] },
    }
  );
  const products = await res.json();
  const { mobiles, currentPage, totalPages } = await products;

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start justify-center">
      <Banner />
      <div className="w-full">
        <TopPicks products={mobiles} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
};

export default Home;
