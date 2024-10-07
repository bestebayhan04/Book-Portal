package Ecom.Service;

import Ecom.Model.Blacklist;
import Ecom.Model.BlacklistItem;

import java.util.List;

public interface BlacklistService {
    // Fetch all blacklist items by userId
    List<BlacklistItem> getAllBlacklistItems(Integer userId);

    // Add a seller to the blacklist using userId
    void addSellerToBlacklist(Integer userId, String sellerName);

    // Remove a seller from the blacklist by blacklistId
    void removeSellerFromBlacklist(Integer blacklistId, String sellerName);

    // Fetch a blacklist by its ID
    Blacklist getBlacklistById(Integer blacklistId);

    // Fetch a blacklist by userId (new method)
    Blacklist getBlacklistByUserId(Integer userId);
}
