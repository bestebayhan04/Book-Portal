package Ecom.ModelDTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CustomerUpdateDTO {

    @NotNull(message = "Email Id Is Mandatory ,can Not Be Null")
    @NotBlank(message = "Email Id Is Mandatory")
    @Column(name = "email", unique = true)
    private String email;

    // Remove password constraints for update operations
    private String password;

    @NotNull(message = "First Name can Not be Null")
    @NotBlank(message = "First Name can not be blank")
    private String firstName;

    @NotNull(message = "Last Name can Not be Null")
    @NotBlank(message = "Last Name can not be blank")
    private String lastName;

    @NotNull(message = "Phone Number can Not be Null")
    @NotBlank(message = "Phone Number can not be blank")
    @Size(min = 10, message = "Phone Number should be minimum 10 digits")
    private String phoneNumber;
}
