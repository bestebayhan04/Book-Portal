package Ecom.Controller;

import Ecom.Model.Seller;
import Ecom.ModelDTO.SellerDTO;
import Ecom.Service.SellerService;
import Ecom.Exception.SellerException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ecom/sellers")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @PostMapping("/add")
    public ResponseEntity<Seller> addSeller(@RequestBody SellerDTO sellerDTO) {
        Seller newSeller = sellerService.addSeller(sellerDTO);
        return new ResponseEntity<>(newSeller, HttpStatus.CREATED);
    }

    @PutMapping("/update/{sellerId}")
    public ResponseEntity<Seller> updateSeller(@PathVariable Integer sellerId, @RequestBody SellerDTO sellerDTO) {
        Seller updatedSeller = sellerService.updateSeller(sellerId, sellerDTO);
        return new ResponseEntity<>(updatedSeller, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{sellerId}")
    public ResponseEntity<String> deleteSeller(@PathVariable Integer sellerId) {
        sellerService.removeSeller(sellerId);
        return new ResponseEntity<>("Seller removed successfully.", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Seller>> getAllSellers() {
        List<Seller> sellers = sellerService.getAllSellers();
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Integer sellerId) {
        Seller seller = sellerService.getSellerById(sellerId);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }
}
