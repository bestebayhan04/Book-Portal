package Ecom.Controller;

import Ecom.Exception.UserException;
import Ecom.ModelDTO.UserSignInDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Ecom.Service.UserService;

@RestController
@RequestMapping("/ecom")
public class LoginController {

	@Autowired
	private UserService userService;

	@GetMapping("/signIn")
	public ResponseEntity<UserSignInDetail> getLoggedInCustomerDetailsHandler(Authentication auth) {
		if (auth == null ) {
			throw new UserException("User is not authenticated (null)");
		}
		if ( !auth.isAuthenticated()) {
			throw new UserException("User is not authenticated");
		}

		try {
			var customer = userService.getUserByEmailId(auth.getName());
			UserSignInDetail signinSuccessData = new UserSignInDetail();
			signinSuccessData.setId(customer.getUserId());
			signinSuccessData.setFirstNAme(customer.getFirstName());
			signinSuccessData.setLastName(customer.getLastName());
			signinSuccessData.setSigninStatus("Success");


			return new ResponseEntity<>(signinSuccessData, HttpStatus.OK);
		} catch (UserException ex) {
			throw new UserException("Invalid Password");
		}
	}
}
