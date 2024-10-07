package Ecom.ServiceImpl;

import Ecom.Exception.ProductException;
import Ecom.Model.Product;
import Ecom.Model.Seller;
import Ecom.ModelDTO.SellerDTO;
import Ecom.Repository.SellerRepository;
import Ecom.Service.SellerService;
import Ecom.Exception.SellerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;

    @Override
    public Seller addSeller(SellerDTO sellerDTO) throws SellerException {
        Seller seller = new Seller();
        seller.setName(sellerDTO.getName());
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSeller(Integer sellerId, SellerDTO sellerDTO) throws SellerException {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new SellerException("Seller not found"));
        seller.setName(sellerDTO.getName());
        return sellerRepository.save(seller);
    }

    @Override
    public void removeSeller(Integer sellerId) throws SellerException {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new SellerException("Seller not found"));
        sellerRepository.delete(seller);
    }

    @Override
    public List<Seller> getAllSellers() {

        List<Seller> sellers;

        sellers= sellerRepository.findAll();

        if(sellers.isEmpty()){
            throw new SellerException("seller List Empty");
        }

        return sellers;
    }

    @Override
    public Seller getSellerById(Integer sellerId) throws SellerException {
        return sellerRepository.findById(sellerId)
                .orElseThrow(() -> new SellerException("Seller not found"));
    }
}
