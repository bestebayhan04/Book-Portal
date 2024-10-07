package Ecom.Repository;

import Ecom.Model.Blacklist;
import Ecom.Model.BlacklistItem;
import Ecom.Model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlacklistItemRepository extends JpaRepository<BlacklistItem, Integer> {

    List<BlacklistItem> findAllByBlacklist(Blacklist blacklist);

    boolean existsByBlacklistAndSeller(Blacklist blacklist, Seller seller);

    void deleteByBlacklistAndSeller(Blacklist blacklist, Seller seller);
}