package controller;

import model.*;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import service.Service;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class RESTController {

    private Service service = new Service();

    @PostMapping("/login")
    public ResponseEntity<UserPublicInfo> loginRequest(@RequestBody UserCredentials credentials){

        UserPublicInfo userPublicInfo = service.getUserPublicInfo(
                credentials.getUsername(),
                credentials.getPassword()
        );

        if(userPublicInfo != null)
            return new ResponseEntity<>(userPublicInfo, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> readUser(@PathVariable("username") String username){
        return new ResponseEntity<>(service.getUser(username), HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User createdUser = service.createUser(user);
        if(createdUser != null){
            return new ResponseEntity<>(createdUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/user/setavatar/{username}")
    public ResponseEntity<Boolean> setAvatar(@PathVariable("username") String username, @RequestBody String avatar){
        Boolean result = service.changeUserAvatar(username, avatar);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/user")
    public ResponseEntity<UserPublicInfo> updateUser(@RequestBody User user){
        UserPublicInfo updatedUser = service.updateUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/user/updatePassword/{username}")
    public ResponseEntity<Boolean> updateUserPassword(@PathVariable("username") String username, @RequestBody Passwords passwords){
        if(service.updateUserPassowrd(username, passwords.getNewPassword(), passwords.getOldPassword())){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/apartment/{id}")
    public ResponseEntity<DetailedApartment> apartment(@PathVariable("id") String id){
        DetailedApartment detailedApartment = service.getDetailedApartment(id);
        if(detailedApartment != null){
            return new ResponseEntity<>(detailedApartment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/apartments")
    public ResponseEntity<List<Apartment>> apartments(){
        return new ResponseEntity<>(service.getAllApartments(), HttpStatus.OK);
    }

    @GetMapping("/apartments/{username}")
    public ResponseEntity<List<DetailedApartment>> userApartments(@PathVariable("username") String username){
        return new ResponseEntity<>(service.getUsersApartments(username), HttpStatus.OK);
    }

    @PostMapping("/apartment")
    public ResponseEntity<Apartment> updateApartment(@RequestBody Apartment apartment){
        Apartment savedApartment;
        if(service.apartmentExists(apartment.getId())){
            savedApartment = service.updateApartment(apartment);
        }
        else {
            savedApartment = service.createApartment(apartment);
        }

        if(savedApartment != null){
            try {
                savedApartment.setEstimatedPrice(service.evaluateApartment(
                        savedApartment.getNeighbourhood(),
                        savedApartment.getSquareMeters(),
                        savedApartment.getNoRooms(),
                        savedApartment.getPrice()
                        ));
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (IOException exception) {
                exception.printStackTrace();
            }
            return new ResponseEntity<>(savedApartment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/apartment/{id}")
    public ResponseEntity<Boolean> deleteApartment(@PathVariable("id") String id){
        Boolean result = service.deleteApartment(id);
        if(Boolean.TRUE.equals(result)){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
