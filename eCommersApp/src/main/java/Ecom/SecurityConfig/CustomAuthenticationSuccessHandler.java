package Ecom.SecurityConfig;

import java.io.IOException;
import java.util.*;

import javax.crypto.SecretKey;

import Ecom.Model.Cart;
import Ecom.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private CartRepository cartRepository;  // Inject the CartRepository

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {


        SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes());

        String email = authentication.getName();
        String userRole = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst().orElse("ROLE_USER"); // Default to ROLE_USER if no role is found

        Optional<String> userIdAuthority = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(auth -> auth.startsWith("ROLE_USER_ID_"))
                .findFirst();

        Integer userId = null;
        String cartId = null;

        if (userIdAuthority.isPresent()) {
            userId = Integer.parseInt(userIdAuthority.get().replace("ROLE_USER_ID_", ""));
            System.out.println("user id is: " + userId);

            try {
                Cart cart = cartRepository.findByUser_UserId(userId);
                if (cart != null) {
                    cartId = cart.getCartId().toString();
                    System.out.println("Cart ID is: " + cartId);
                }
            } catch (Exception e) {
                System.err.println("Error retrieving cart for user ID " + userId + ": " + e.getMessage());
            }
        }

        String jwt = Jwts.builder()
                .setIssuer("e-commerce")
                .setSubject("JWT Token")
                .claim("email", email)  // Use email here
                .claim("role", userRole)  // Add user role here
                .claim("userId", userId)  // Add userId here
                .claim("cartId",cartId )
                .claim("authorities", populateAuthorities(authentication.getAuthorities()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 30000000))
                .signWith(key).compact();

        response.setHeader("Authorization", "Bearer " + jwt);
        System.out.println("JWT Generated and added to response header: " + jwt);

    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> authoritiesSet = new HashSet<>();
        for (GrantedAuthority authority : authorities) {
            authoritiesSet.add(authority.getAuthority());
        }
        return String.join(",", authoritiesSet);
    }
}