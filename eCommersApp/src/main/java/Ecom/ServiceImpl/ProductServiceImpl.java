package Ecom.ServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import Ecom.Model.BlacklistItem;
import Ecom.Model.Seller;
import Ecom.Model.User;
import Ecom.Repository.SellerRepository;
import Ecom.Service.BlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import Ecom.Exception.ProductException;
import Ecom.Model.Product;
import Ecom.ModelDTO.ProductDTO;
import Ecom.Repository.ProductRepository;
import Ecom.Service.ProductService;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final BlacklistService blacklistService;  // Inject the BlacklistService
    private final SellerRepository sellerRepository;  // Inject the SellerRepository

    @Override
    public Product addProduct(ProductDTO productDTO) throws ProductException {
        if (productDTO == null) {
            throw new ProductException("Product DTO cannot be null");
        }

        // Create a new Seller entity
        Seller seller = new Seller();
        seller.setName(productDTO.getSellerName());

        // Save the new seller to the database
        seller = sellerRepository.save(seller);

        // Create a new Product entity from the DTO
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setImageUrl(productDTO.getImageUrl());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setSeller(seller); // Associate the new seller

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Integer productId, ProductDTO updatedProduct) throws ProductException {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new ProductException("Product with ID " + productId + " not found.");
        }
        Product existingProduct = productOptional.get();

        // Update the existing product's properties with the new data
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setImageUrl(updatedProduct.getImageUrl());
        existingProduct.setDescription(updatedProduct.getDescription());

        // Search for the seller in a case-insensitive manner
        Seller existingSeller = sellerRepository.findByName(updatedProduct.getSellerName().trim().toLowerCase())
                .orElseGet(() -> {
                    // If the seller doesn't exist, create a new one
                    Seller newSeller = new Seller();
                    newSeller.setName(updatedProduct.getSellerName().trim());
                    return sellerRepository.save(newSeller);
                });

        // Set the seller to the existing product
        existingProduct.setSeller(existingSeller);

        // Save the updated product
        return productRepository.save(existingProduct);
    }


    @Override
    public List<Product> getProductByName(String name) throws ProductException {

        List<Product> existProductByName = productRepository.findByName(name);
        if (existProductByName.isEmpty()) {
            throw new ProductException("Product Not found with name " + name);
        }
        return existProductByName;
    }

    @Override
    public List<Product> getAllProduct(String keyword, String sortDirection, String sortBy, Integer userId) throws ProductException {

        Sort sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);

        List<Product> products;

        if (keyword != null) {
            products = productRepository.findAllByNameContainingIgnoreCase(keyword, sort);
        } else {
            products = productRepository.findAll(sort);
        }
        if (products.isEmpty()) {
            throw new ProductException("Product List Empty");
        }

        if (userId != 9) {
            // Fetch the user's blacklist items
            List<BlacklistItem> blacklistItems = blacklistService.getAllBlacklistItems(userId);

            // Filter out products that belong to blacklisted sellers
            products = products.stream()
                    .filter(product -> blacklistItems.stream()
                            .noneMatch(bl -> bl.getSeller().getName().equalsIgnoreCase(product.getSeller().getName())))
                    .collect(Collectors.toList());
        }
        return products;
    }

    @Override
    public List<Product> getProductByCategory(String category) throws ProductException {
        // Retrieve products by category from the database
        List<Product> allproductCategoryName = productRepository.getProductCategoryName(category);
        if (allproductCategoryName.isEmpty())
            throw new ProductException("Product with category Name " + category + " not found.");

        return allproductCategoryName;
    }

    @Override
    public void removeProduct(Integer productId) throws ProductException {

        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product with ID " + productId + " not found."));

        productRepository.delete(existingProduct);
    }

    @Override
    public Product getSingleProduct(Integer productId) {

        Product single = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found"));
        return single;
    }
}