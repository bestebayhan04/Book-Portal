package Ecom.ModelDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SellerDTO {

    @NotNull(message = "Seller name is mandatory and cannot be null")
    @NotBlank(message = "Seller name is mandatory")
    private String name;
}