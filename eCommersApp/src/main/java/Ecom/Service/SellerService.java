package Ecom.Service;

import Ecom.Model.Seller;
import Ecom.ModelDTO.SellerDTO;
import Ecom.Exception.SellerException;

import java.util.List;

public interface SellerService {

    Seller addSeller(SellerDTO sellerDTO) throws SellerException;

    Seller updateSeller(Integer sellerId, SellerDTO sellerDTO) throws SellerException;

    void removeSeller(Integer sellerId) throws SellerException;

    List<Seller> getAllSellers();

    Seller getSellerById(Integer sellerId) throws SellerException;
}
