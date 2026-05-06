export default function FoodCard({ product }) {
  return (
    <div className="food-card">
      <div className="card-image">
        {product?.image_small_url ? (
          <img src={product.image_small_url} alt={product.product_name || 'Product'} />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>
      <div className="card-content">
        <h3 className="product-name">{product?.product_name || 'Unknown Product'}</h3>
        {product?.brands && <p className="brand">{product.brands}</p>}
        
        <div className="nutrition-info">
          {product?.nutriments?.['energy-kcal_100g'] && (
            <p><strong>Calories:</strong> {product.nutriments['energy-kcal_100g']} kcal/100g</p>
          )}
          {product?.nutriments?.proteins_100g && (
            <p><strong>Protein:</strong> {product.nutriments.proteins_100g}g/100g</p>
          )}
          {product?.nutriments?.carbohydrates_100g && (
            <p><strong>Carbs:</strong> {product.nutriments.carbohydrates_100g}g/100g</p>
          )}
          {product?.nutriments?.fat_100g && (
            <p><strong>Fat:</strong> {product.nutriments.fat_100g}g/100g</p>
          )}
        </div>
      </div>
    </div>
  );
}
