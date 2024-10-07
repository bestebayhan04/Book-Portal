package Ecom.ServiceImpl;

import Ecom.Model.Blacklist;
import Ecom.Model.BlacklistItem;
import Ecom.Model.Seller;
import Ecom.Model.User;
import Ecom.Repository.BlacklistItemRepository;
import Ecom.Repository.BlacklistRepository;
import Ecom.Repository.SellerRepository;
import Ecom.Service.BlacklistService;
import Ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlacklistServiceImpl implements BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final BlacklistItemRepository blacklistItemRepository;
    private final SellerRepository sellerRepository;
    private final UserService userService;  // Inject UserService


    @Override
    public List<BlacklistItem> getAllBlacklistItems(Integer userId) {
        // Fetch the User by userId
        User user = userService.getUserDetails(userId);

        // Fetch the Blacklist for the User
        Blacklist blacklist = blacklistRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Blacklist not found for user id: " + userId));

        // Return the Blacklist Items
        return blacklistItemRepository.findAllByBlacklist(blacklist);
    }

    @Override
    public void addSellerToBlacklist(Integer userId, String sellerName) {
        // Fetch the User by userId
        User user = userService.getUserDetails(userId);

        // Fetch or create the Blacklist for the User
        Blacklist blacklist = blacklistRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Blacklist not found for user id: " + userId));

        // Fetch the Seller by sellerName
        Seller seller = sellerRepository.findByName(sellerName)
                .orElseThrow(() -> new IllegalArgumentException("Seller not found with name: " + sellerName));

        // Check if the seller is already in the blacklist
        if (blacklistItemRepository.existsByBlacklistAndSeller(blacklist, seller)) {
            throw new IllegalArgumentException("Seller already in blacklist");
        }

        // Add the seller to the blacklist
        BlacklistItem blacklistItem = new BlacklistItem();
        blacklistItem.setSeller(seller);
        blacklistItem.setBlacklist(blacklist);
        blacklistItemRepository.save(blacklistItem);
    }

    public void removeSellerFromBlacklist(Integer blacklistId, String sellerName) {
        Blacklist blacklist = blacklistRepository.findById(blacklistId)
                .orElseThrow(() -> new RuntimeException("Blacklist not found with id: " + blacklistId));
        Seller seller = sellerRepository.findByName(sellerName)
                .orElseThrow(() -> new RuntimeException("Seller not found with name: " + sellerName));

        BlacklistItem itemToRemove = blacklist.getBlacklistItems().stream()
                .filter(item -> item.getSeller().equals(seller))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Seller not found in blacklist"));

        blacklist.getBlacklistItems().remove(itemToRemove);
        blacklistRepository.save(blacklist);
    }

    @Override
    public Blacklist getBlacklistByUserId(Integer userId) {
        User user = userService.getUserDetails(userId);
        return blacklistRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Blacklist not found for user id: " + userId));
    }

    @Override
    public Blacklist getBlacklistById(Integer blacklistId) {
        // Implementing the missing method
        return blacklistRepository.findById(blacklistId)
                .orElseThrow(() -> new IllegalArgumentException("Blacklist not found for id: " + blacklistId));
    }
}