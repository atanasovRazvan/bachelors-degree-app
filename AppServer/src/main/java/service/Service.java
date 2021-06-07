package service;

import model.*;
import org.springframework.web.bind.annotation.*;
import repository.ApartmentRepository;
import repository.ImageRepository;
import repository.RepositoryInterface;
import repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.xml.soap.Detail;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Service {

    private final RepositoryInterface<User> userRepository = new UserRepository();
    private final RepositoryInterface<Apartment> apartmentRepository = new ApartmentRepository();
    private final RepositoryInterface<Image> imageRepository = new ImageRepository();

    public UserPublicInfo getUserPublicInfo(String username, String password){
        User user = userRepository.findOne(username);

        if(user != null && user.getPassword().equals(password)){
            return new UserPublicInfo(
                    user.getUsername(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getAvatarSrc(),
                    user.getCreatedAt()
            );
        }
        return null;
    }

    public User getUser(String username){
        return this.userRepository.findOne(username);
    }

    public User createUser(User user){
        try{
            long unixTime = System.currentTimeMillis() / 1000L;
            user.setCreatedAt(String.valueOf(unixTime));
            return this.userRepository.add(user);
        }
        catch(Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    public Boolean changeUserAvatar(String username, String avatarSource){
        try{
            User user = this.userRepository.findOne(username);
            user.setAvatarSrc(avatarSource);
            User updatedUser = this.userRepository.update(user);
            if(updatedUser != null){
                return Boolean.TRUE;
            }
            else{
                return Boolean.FALSE;
            }
        }
        catch (Exception ex){
            return null;
        }
    }

    public UserPublicInfo updateUser(User user){
        User updatedUser = this.userRepository.update(user);
        return new UserPublicInfo(
                updatedUser.getUsername(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getPhoneNumber(),
                updatedUser.getAvatarSrc(),
                updatedUser.getCreatedAt()
        );
    }

    public Boolean updateUserPassowrd(String username, String newPassword, String oldPassword){
        User user = this.userRepository.findOne(username);
        if(user.getPassword().equals(oldPassword)){
            user.setPassword(newPassword);
            this.userRepository.update(user);
            return Boolean.TRUE;
        }

        return Boolean.FALSE;
    }

    public DetailedApartment getDetailedApartment(String apartmentId){
        try{
            Apartment foundApartment = this.apartmentRepository.findOne(apartmentId);
            User owner = this.userRepository.findOne(foundApartment.getOwnerUsername());
            List<Image> images = new ArrayList<>();
            this.imageRepository.getAll().forEach(image -> {
                if(image.getApartmentId().equals(apartmentId)){
                    images.add(image);
                }
            });

            DetailedApartment detailedApartment = new DetailedApartment(
                    foundApartment,
                    owner,
                    images
            );

            if(foundApartment != null && owner != null)
                return detailedApartment;
            else
                return null;
        }
        catch(Exception e){
            return null;
        }
    }

    public List<Apartment> getAllApartments(){
        List<Apartment> list = new ArrayList<>();
        this.apartmentRepository.getAll().forEach(apartment -> {
            AtomicReference<String> displayImage = new AtomicReference<>("");
            this.imageRepository.getAll().forEach(image -> {
                if(image.getApartmentId().equals(apartment.getId()) && image.getIsDisplay() == Boolean.TRUE){
                    displayImage.set(image.getSource());
                }
            });
            apartment.setDisplayImage(displayImage.get());
            list.add(apartment);
        });
        return list;
    }

    public List<DetailedApartment> getUsersApartments(String username){
        List<DetailedApartment> detailedApartments = new ArrayList<>();
        this.apartmentRepository.getAll().forEach(apartment -> {
            if(apartment.getOwnerUsername().equals(username)){
                List<Image> images = new ArrayList<>();
                imageRepository.getAll().forEach(image -> {
                    if(image.getApartmentId().equals(apartment.getId())){
                        images.add(image);
                    }
                });
                detailedApartments.add(new DetailedApartment(
                        apartment,
                        this.userRepository.findOne(username),
                        images
                ));
            }
        });
        return detailedApartments;
    }

    public Boolean deleteApartment(String apartmentId){
        return this.apartmentRepository.delete(this.apartmentRepository.findOne(apartmentId));
    }

    public Boolean apartmentExists(String apartmentId){
        return this.apartmentRepository.findOne(apartmentId) != null;
    }

    public Apartment createApartment(Apartment apartment){
        apartment.setId(UUID.randomUUID().toString());
        return this.apartmentRepository.add(apartment);
    }

    public Apartment updateApartment(Apartment apartment){
        return this.apartmentRepository.update(apartment);
    }

}
