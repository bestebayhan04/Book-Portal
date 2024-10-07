package Ecom.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @NotNull(message = "Product name is Mandatory ,can Not Be Null")
    @NotBlank(message = "Product name is Mandatoryyyyy")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Product Image is Mandatory ,can Not Be Null")
    @NotBlank(message = "Product Image is Mandatory")
    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "isAvailable")
    private boolean isAvailable = true;

    @NotNull(message = "Product description is Mandatory ,can Not Be Null")
    @NotBlank(message = "Product description is Mandatory")
    @Size(min = 10, max = 50)
    @Column(name = "description")
    private String description;

    @NotNull(message = "Product price is Mandatory ,can Not Be Null")
    @Column(name = "price")
    private Double price;

    @NotNull(message = "Product category_name is Mandatory ,can Not Be Null")
    @NotBlank(message = "Product category_name is Mandatory")
    @Column(name = "category_name")
    private String category;


    @JsonManagedReference
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
}