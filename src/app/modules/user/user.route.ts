import express from 'express';

const router = express.Router();

router.route('/');

// router
//   .route('/:productId')
//   .get(ProductControllers.getSingleProduct)
//   .put(ProductControllers.updateProduct)
//   .delete(ProductControllers.deleteProduct);

export const UserRoutes = router;
