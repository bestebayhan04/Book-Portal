package Ecom.Service;

import java.util.List;

import Ecom.Exception.ProductException;
import Ecom.Model.Product;
import Ecom.Model.User;
import Ecom.ModelDTO.ProductDTO;

public interface ProductService {

	Product addProduct(ProductDTO productDTO) throws ProductException;
	
	public Product updateProduct(Integer productId,ProductDTO product)throws ProductException;
	
	public List<Product> getProductByName(String name)throws ProductException;

	List<Product> getAllProduct(String keyword, String sortDirection, String sortBy, Integer userId) throws ProductException;

	public List<Product> getProductByCategory(String category) throws ProductException;
	
	public void removeProduct(Integer productId)throws ProductException;

	public Product getSingleProduct(Integer productId);
}
 