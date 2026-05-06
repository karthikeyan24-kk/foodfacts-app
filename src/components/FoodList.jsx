import FoodCard from './FoodCard';

export default function FoodList({ products }) {
  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product.code} product={product} />
      ))}
    </div>
  );
}
