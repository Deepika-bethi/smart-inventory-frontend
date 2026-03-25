export default function ProductList({ products, addToCart }) {
  if (products.length === 0) {
    return <p>No products available!</p>;
  }

  return (
    <div>
      <h3>Available Products ({products.length})</h3>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p className="price">₹{product.price.toFixed(2)}</p>
            <p className="stock">Stock: {product.quantity}</p>
            <button 
              className="btn btn-primary"
              onClick={() => addToCart(product)}
              disabled={product.quantity === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
