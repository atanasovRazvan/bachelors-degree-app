package service;

import model.*;
import repository.ApartmentRepository;
import repository.ImageRepository;
import repository.RepositoryInterface;
import repository.UserRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

public class Service {

    private final RepositoryInterface<User> userRepository = new UserRepository();
    private final RepositoryInterface<Apartment> apartmentRepository = new ApartmentRepository();
    private final RepositoryInterface<Image> imageRepository = new ImageRepository();

    class TrainML extends TimerTask {
        public void run() {
            String pathToTrain = "C:\\Users\\Razvan\\Desktop\\LICENTA\\App\\ml-price-estimation\\dist\\TrainML.exe";
            try {
                Process process = Runtime.getRuntime().exec(pathToTrain);
                process.waitFor();
                BufferedReader output = new BufferedReader(new InputStreamReader(process.getInputStream()));
                System.out.println(output.readLine());
            } catch (IOException | InterruptedException exception) {
                exception.printStackTrace();
            }
        }
    }

    public Service(){
        Timer timer = new Timer();
        timer.schedule(new TrainML(), 0, 60L * 1000); // 24L * 60 * 60 * 1000 = 1 day
    }

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

    public String evaluateApartment(String neighbourhood, String squareMeters, String noRooms, String price) throws InterruptedException, IOException {
        String pathToEvaluation = "C:\\Users\\Razvan\\Desktop\\LICENTA\\App\\ml-price-estimation\\dist\\Estimate.exe";
        Process process = Runtime.getRuntime().exec(
                pathToEvaluation + " " +
                        neighbourhood + " " +
                        squareMeters + " " +
                        noRooms + " " +
                        price
        );
        process.waitFor();
        BufferedReader output = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String result = output.readLine();
        return result.substring(1, result.length() - 1);
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

    public Apartment createApartment(DetailedApartment apartment){
        long unixTime = System.currentTimeMillis() / 1000L;
        Apartment basicApartment = new Apartment.Builder()
                .withCity(apartment.getCity())
                .withCreatedAt(String.valueOf(unixTime))
                .withDescription(apartment.getDescription())
                .withEstimatedPrice(apartment.getEstimatedPrice())
                .withFloor(apartment.getFloor())
                .withNeighbourhood(apartment.getNeighbourhood())
                .withNoRooms(apartment.getNoRooms())
                .withNumber(apartment.getNumber())
                .withOwnerUsername(apartment.getOwnerUsername())
                .withPrice(apartment.getPrice())
                .withSquareMeters(apartment.getSquareMeters())
                .withStreet(apartment.getStreet())
                .withTitle(apartment.getTitle())
                .build();
        apartment.getImageSources().forEach(image -> {
            image.setApartmentId(basicApartment.getId());
            this.imageRepository.add(image);
            if(image.getIsDisplay().equals(Boolean.TRUE))
                basicApartment.setDisplayImage(image.getSource());
        });

        return this.apartmentRepository.add(basicApartment);
    }

    public Apartment updateApartment(DetailedApartment apartment){
        Apartment basicApartment = new Apartment.Builder()
                .withCity(apartment.getCity())
                .withCreatedAt(apartment.getCreatedAt())
                .withDescription(apartment.getDescription())
                .withEstimatedPrice(apartment.getEstimatedPrice())
                .withFloor(apartment.getFloor())
                .withNeighbourhood(apartment.getNeighbourhood())
                .withNoRooms(apartment.getNoRooms())
                .withNumber(apartment.getNumber())
                .withOwnerUsername(apartment.getOwnerUsername())
                .withPrice(apartment.getPrice())
                .withSquareMeters(apartment.getSquareMeters())
                .withStreet(apartment.getStreet())
                .withTitle(apartment.getTitle())
                .build();
        basicApartment.setId(apartment.getId());

        apartment.getImageSources().forEach(image -> {
            try{
                this.imageRepository.add(image);
            }
            catch (Exception e){
                this.imageRepository.update(image);
            }
            if(image.getIsDisplay().equals(Boolean.TRUE))
                basicApartment.setDisplayImage(image.getSource());
        });

        return this.apartmentRepository.update(basicApartment);
    }

}
