import ProductCard from "./ProductCard";

const TopPicks = async ({ products }) => {
    console.log(products)
  return (
    <div className="w-full">
      <h1
        className=" text-center font-bold "
        style={{ fontSize: "clamp(2rem, 3vw, 5rem)" }}
      >
        Our Top Picks
      </h1>
      <div className="flex flex-wrap gap-5 my-5 justify-center">
        {products.map((product) => (
          // console.log(product)
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopPicks;
