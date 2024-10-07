package Ecom.Service;

import java.util.List;

import Ecom.ModelDTO.CustomerUpdateDTO;
import org.springframework.stereotype.Service;

import Ecom.Exception.UserException;
import Ecom.Model.User;
import Ecom.ModelDTO.AdminDTO;
import Ecom.ModelDTO.CustomerDTO;
import Ecom.ModelDTO.UserDTO;


@Service
public interface UserService {
	
	
	
	public User getUserByEmailId(String emailId)throws UserException;

	public User addUser(CustomerDTO customer)  throws UserException;
	
	public User addUserAdmin(AdminDTO admin	)  throws UserException;

	public User changePassword(Integer userId, UserDTO customer)  throws UserException;

	public String deactivateUser(Integer userId) throws UserException;

	public User getUserDetails(Integer userId)throws UserException;

	public List<User> getAllUserDetails() throws UserException;
	public String deleteUser(Integer userId) throws UserException;


	User updateUserDetails(Integer userId, CustomerUpdateDTO customer) throws UserException;
}
