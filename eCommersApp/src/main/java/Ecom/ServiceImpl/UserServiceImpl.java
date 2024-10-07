package Ecom.ServiceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import Ecom.ModelDTO.CustomerUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Ecom.Enum.UserAccountStatus;
import Ecom.Enum.UserRole;
import Ecom.Exception.UserException;
import Ecom.Model.User;
import Ecom.ModelDTO.AdminDTO;
import Ecom.ModelDTO.CustomerDTO;
import Ecom.ModelDTO.UserDTO;
import Ecom.Repository.UserRepository;
import Ecom.Service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public String deleteUser(Integer userId) throws UserException {
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));
		userRepository.delete(existingUser);
		return "User deleted successfully";
	}


	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public User getUserByEmailId(String emailId) throws UserException {
		return userRepository.findByEmail(emailId).orElseThrow(() -> new UserException("User not found"));

	}

	@Override
	public User addUser(CustomerDTO customer) throws UserException {
		if (customer == null)
			throw new UserException("customer Can not be Null");
		Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
		if (findByEmail.isPresent()) {
			System.out.println("inside add user method");
			throw new RuntimeException("Email alredy Register");
		}

		User newCustomer = new User();
		newCustomer.setEmail(customer.getEmail());
		newCustomer.setPassword(customer.getPassword());
		newCustomer.setFirstName(customer.getFirstName());
		newCustomer.setLastName(customer.getLastName());
		newCustomer.setPhoneNumber(customer.getPhoneNumber());
		newCustomer.setRole(UserRole.ROLE_USER);
		newCustomer.setRegisterTime(LocalDateTime.now());
		newCustomer.setUserAccountStatus(UserAccountStatus.ACTIVE);

		return userRepository.save(newCustomer);
	}

	@Override
	public User addUserAdmin(AdminDTO customer) throws UserException {
		if (customer == null)
			throw new UserException("admin Can not be Null");
		Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
		if (findByEmail.isPresent()) {
			System.out.println("inside add user method");
			throw new RuntimeException("Email alredy Register");
		}
		User newAdmin = new User();
		newAdmin.setEmail(customer.getEmail());
		newAdmin.setPassword(customer.getPassword());
		newAdmin.setFirstName(customer.getFirstName());
		newAdmin.setLastName(customer.getLastName());
		newAdmin.setPhoneNumber(customer.getPhoneNumber());
		newAdmin.setRole(UserRole.ROLE_ADMIN);
		newAdmin.setRegisterTime(LocalDateTime.now());
		newAdmin.setUserAccountStatus(UserAccountStatus.ACTIVE);

		return userRepository.save(newAdmin);
	}

	public User changePassword(Integer userId, UserDTO customer) throws UserException {
		User user = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
		if (customer.getNewPassword().length() >= 5 && customer.getNewPassword().length() <= 10) {
			user.updatePassword(customer.getNewPassword(), passwordEncoder);
			return userRepository.save(user);
		} else {
			throw new UserException("provide valid  password");
		}

	}

	
	@Override
	public String deactivateUser(Integer userId) throws UserException {
		User existingUser = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
		existingUser.setUserAccountStatus(UserAccountStatus.DEACTIVETE);
		userRepository.save(existingUser);
		return "Account deactivet Succesfully";
	}

	@Override
	public User getUserDetails(Integer userId) throws UserException {
		User existingUser = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
		return existingUser;
	}

	@Override
	public List<User> getAllUserDetails() throws UserException {

		List<User> existingAllUser = userRepository.findAll();
		if (existingAllUser.isEmpty()) {
			new UserException("User list is Empty");
		}
		return existingAllUser;
	}

	@Override
	public User updateUserDetails(Integer userId, CustomerUpdateDTO customer) throws UserException {
		// Fetch the existing user
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		// Update the fields with the new data from the DTO
		if (customer.getFirstName() != null && !customer.getFirstName().isEmpty()) {
			existingUser.setFirstName(customer.getFirstName());
		}
		if (customer.getLastName() != null && !customer.getLastName().isEmpty()) {
			existingUser.setLastName(customer.getLastName());
		}
		if (customer.getPhoneNumber() != null && !customer.getPhoneNumber().isEmpty()) {
			existingUser.setPhoneNumber(customer.getPhoneNumber());
		}
		if (customer.getEmail() != null && !customer.getEmail().isEmpty()) {
			existingUser.setEmail(customer.getEmail());
		}
		// Only update the password if it's provided
		if (customer.getPassword() != null && !customer.getPassword().isEmpty()) {
			existingUser.setPassword(passwordEncoder.encode(customer.getPassword()));
		}

		// Save the updated user back to the database
		return userRepository.save(existingUser);
	}






}
