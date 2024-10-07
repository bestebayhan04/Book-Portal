package Ecom.SecurityConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class AppConfig {

    private final CustomAuthenticationSuccessHandler successHandler;

    public AppConfig(CustomAuthenticationSuccessHandler successHandler) {
        this.successHandler = successHandler;
    }

    @Bean
    public SecurityFilterChain springSecurityConfiguration(HttpSecurity http) throws Exception {

        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> {
                    auth
                            .requestMatchers(HttpMethod.POST, "/ecom/admin").permitAll()
                            .requestMatchers(HttpMethod.POST, "/ecom/customers").permitAll()
                            .requestMatchers(HttpMethod.DELETE, "/ecom/orders/users/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/ecom/signIn").authenticated()
                            .requestMatchers(HttpMethod.GET, "/ecom/product-reviews/**", "/ecom/products/**").permitAll()
                            .requestMatchers(HttpMethod.POST, "/ecom/product/**", "/ecom/order-shippers/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/ecom/product/**", "/ecom/product-reviews/**",
                                    "/ecom/customer-addresses/**", "/ecom/cart/**", "/ecom/orders/**", "/ecom/order-shipping/**").hasRole("USER")
                            .requestMatchers(HttpMethod.PUT, "/ecom/admin/**", "/ecom/products/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/ecom/admin/**", "/ecom/product-reviews/**",
                                    "/ecom/customer-addresses/update/**", "/ecom/cart/**", "/ecom/order-shipping/**").hasRole("USER")
                            .requestMatchers(HttpMethod.DELETE, "/ecom/products/**", "/ecom/product-reviews/**",
                                    "/ecom/customer-addresses/delete/**", "/ecom/order-shipping/**", "/ecom/order-shippers/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/ecom/cart/remove-product/**").hasRole("USER")
                            .requestMatchers("/swagger-ui*/**", "/v3/api-docs/**").permitAll()
                            .anyRequest().authenticated();

                })
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form
                        .loginProcessingUrl("/login")  // This is the endpoint for form login
                        .usernameParameter("email")  // Custom username parameter
                        .passwordParameter("password")
                        .successHandler(successHandler))  // Use the custom success handler
                .addFilterBefore(new JwtTokenValidatorFilter(), BasicAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000", "https://my_shop/"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}