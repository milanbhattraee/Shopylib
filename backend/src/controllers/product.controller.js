import { asyncHandler } from "../utils/asyncHandler";

const fetchProducts = asyncHandler( async (req, res) => {
    try {
        const limit = 40;
        const { page = 1 } = req.query; 
    
        const offset = (page - 1) * limit;
    
        
        const productQuery = `
          SELECT id, vendorId, name, description, price, stockQuantity, categoryId, brandId, images, isActive, 
                 discount, averageRating, flashSaleId, flashSalePrice, bestMatchScore, createdAt, updatedAt
          FROM products
          WHERE isActive = true
          ORDER BY bestMatchScore DESC
          LIMIT $1 OFFSET $2;
        `;
    
        const values = [limit, offset];
        const result = await pool.query(productQuery, values);
    
        
        const totalQuery = 'SELECT COUNT(id) AS total FROM products WHERE isActive = true;';
        const totalResult = await pool.query(totalQuery);
    
        const totalProducts = totalResult.rows[0].total;
        const totalPages = Math.ceil(totalProducts / limit);
    
        res.json({
          products: result.rows,
          totalProducts,
          totalPages,
          limit,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server error');
      }
  });
  

  export {fetchProducts}