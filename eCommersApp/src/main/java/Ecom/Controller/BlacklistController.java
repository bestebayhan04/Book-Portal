package Ecom.Controller;

import Ecom.Model.Blacklist;
import Ecom.Model.BlacklistItem;
import Ecom.Service.BlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecom/blacklist")
@RequiredArgsConstructor
public class BlacklistController {

    private final BlacklistService blacklistServicee;

    @GetMapping("/{userId}")
    public ResponseEntity<List<BlacklistItem>> getBlacklistById(@PathVariable Integer userId) {
        System.out.println("------->here in blacklist");
        List<BlacklistItem> blacklistItems = blacklistServicee.getAllBlacklistItems(userId);
        System.out.println("------->passed the blacklist");
        return ResponseEntity.ok(blacklistItems);
    }

    @PostMapping("/add-seller")
    public ResponseEntity<String> addSellerToBlacklist(@RequestParam Integer userId, @RequestParam String sellerName) {
        try {
            // Fetch the Blacklist by userId
            Blacklist blacklist = blacklistServicee.getBlacklistByUserId(userId);

            // Use the found blacklistId to add the seller
            blacklistServicee.addSellerToBlacklist(blacklist.getBlacklistId(), sellerName);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/remove-seller/{blacklistId}/{sellerName}")
    public ResponseEntity<String> removeSellerFromBlacklist(@PathVariable Integer blacklistId, @PathVariable String sellerName) {
        try {
            blacklistServicee.removeSellerFromBlacklist(blacklistId, sellerName);
            return ResponseEntity.ok("Seller removed from blacklist successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing seller from blacklist: " + e.getMessage());
        }
    }
}