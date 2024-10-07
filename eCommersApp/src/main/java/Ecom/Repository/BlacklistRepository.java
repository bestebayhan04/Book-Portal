package Ecom.Repository;

import Ecom.Model.Blacklist;
import Ecom.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlacklistRepository extends JpaRepository<Blacklist, Integer> {

    // Find the blacklist for a specific user
    Optional<Blacklist> findByUser(User user);
}