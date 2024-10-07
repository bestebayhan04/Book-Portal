package Ecom.ServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Ecom.Repository.UserRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	public CustomerUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Optional<Ecom.Model.User> opt = userRepository.findByEmail(email);

		if (opt.isPresent()) {
			Ecom.Model.User customer = opt.get();

			List<GrantedAuthority> authorities = new ArrayList<>();

			// Add the user's role as a GrantedAuthority
			authorities.add(new SimpleGrantedAuthority(customer.getRole().toString()));

			// Add the user's ID as a special GrantedAuthority (e.g., ROLE_USER_ID_1)
			authorities.add(new SimpleGrantedAuthority("ROLE_USER_ID_" + customer.getUserId()));

			return new org.springframework.security.core.userdetails.User(
					customer.getEmail(),   // Email is used as the username here
					customer.getPassword(),
					authorities
			);
		} else {
			throw new BadCredentialsException("User details not found with this email: " + email);
		}
	}

}
