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
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Service {

    private RepositoryInterface userRepository = new UserRepository();
    private RepositoryInterface apartmentRepository = new ApartmentRepository();
    private RepositoryInterface imageRepository = new ImageRepository();

    // User manipulation

    @PostMapping("/login")
    public ResponseEntity<UserPublicInfo> loginRequest(@RequestBody UserCredentials credentials){

        User user = (User) userRepository.findOne(credentials.getUsername());

        if(user != null && user.getPassword().equals(credentials.getPassword())){
            UserPublicInfo userPublicInfo = new UserPublicInfo(
                    user.getUsername(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getAvatarSrc(),
                    user.getCreatedAt()
            );
            return new ResponseEntity<>(userPublicInfo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> readUser(@PathVariable("username") String username){
        return new ResponseEntity<>((User) this.userRepository.findOne(username), HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        try{
            return new ResponseEntity<>((User) this.userRepository.add(user), HttpStatus.OK);
        }
        catch(Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/user/setavatar/{username}")
    public ResponseEntity<Boolean> setAvatar(@PathVariable("username") String username, @RequestBody String avatar){
        try{
            User user = (User) this.userRepository.findOne(username);
            user.setAvatarSrc(avatar);
            User updatedUser = (User) this.userRepository.update(user);
            if(updatedUser != null){
                return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/user")
    public ResponseEntity<UserPublicInfo> updateUser(@RequestBody User user){
        User updatedUser = (User) this.userRepository.update(user);
        UserPublicInfo userPublicInfo = new UserPublicInfo(
                updatedUser.getUsername(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getPhoneNumber(),
                updatedUser.getAvatarSrc(),
                updatedUser.getCreatedAt()
        );
        return new ResponseEntity<>(userPublicInfo, HttpStatus.OK);
    }

    @PostMapping("/user/updatePassword/{username}")
    public ResponseEntity<Boolean> updateUserPassword(@PathVariable("username") String username, @RequestBody Passwords passwords){
        User user = (User) this.userRepository.findOne(username);
        if(user.getPassword().equals(passwords.getOldPassword())){
            user.setPassword(passwords.getNewPassword());
            this.userRepository.update(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Apartment manipulation

    @GetMapping("/apartment/{id}")
    public ResponseEntity<DetailedApartment> apartment(@PathVariable("id") String id){
        try{
            Apartment foundApartment = (Apartment) this.apartmentRepository.findOne(id);
            User owner = (User) this.userRepository.findOne(foundApartment.getOwnerUsername());
            List<Image> images = new ArrayList<>();
            this.imageRepository.getAll().forEach((object) -> {
                Image image = (Image) object;
                if(image.getApartmentId().equals(id)){
                    images.add(image);
                }
            });

            DetailedApartment detailedApartment = new DetailedApartment(
                    foundApartment,
                    owner,
                    images
            );

            if(foundApartment != null && owner != null)
                return new ResponseEntity<>(detailedApartment, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/apartments")
    public ResponseEntity<List<Apartment>> apartments(){
        List<Apartment> list = new ArrayList<>();
        this.apartmentRepository.getAll().forEach((object) -> {
            Apartment apartment = (Apartment) object;
            AtomicReference<String> displayImage = new AtomicReference<>("");
            this.imageRepository.getAll().forEach((object1) -> {
                Image image = (Image) object1;
                if(image.getApartmentId().equals(apartment.getId()) && image.getIsDisplay() == Boolean.TRUE){
                    displayImage.set(image.getSource());
                }
            });
            apartment.setDisplayImage(displayImage.get());
            list.add(apartment);
        });
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/apartments/{username}")
    public ResponseEntity<List<DetailedApartment>> userApartments(@PathVariable("username") String username){
        List<Apartment> apartments = (List<Apartment>) this.apartmentRepository.getAll();
        List<DetailedApartment> detailedApartments = new ArrayList<>();
        apartments.forEach((apartment) -> {
            if(apartment.getOwnerUsername().equals(username)){
                List<Image> images = new ArrayList<>();
                imageRepository.getAll().forEach((object) -> {
                    Image image = (Image) object;
                    if(image.getApartmentId().equals(apartment.getId())){
                        images.add(image);
                    }
                });
                detailedApartments.add(new DetailedApartment(
                        apartment,
                        (User) this.userRepository.findOne(username),
                        images
                ));
            }
        });
        return new ResponseEntity<>(detailedApartments, HttpStatus.OK);
    }

    @PutMapping("/apartment")
    public ResponseEntity<Apartment> createApartment(@RequestBody Apartment apartment){
        return new ResponseEntity<>((Apartment) this.apartmentRepository.add(apartment), HttpStatus.OK);
    }

    @PostMapping("/apartment")
    public ResponseEntity<Apartment> updateApartment(@RequestBody Apartment apartment){
        return new ResponseEntity<>((Apartment) this.apartmentRepository.update(apartment), HttpStatus.OK);
    }

    @DeleteMapping("/apartment/{id}")
    public ResponseEntity<Boolean> deleteApartment(@PathVariable("id") String id){
        return new ResponseEntity<>(this.apartmentRepository.delete(id), HttpStatus.OK);
    }

}
