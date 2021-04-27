package model;

import java.security.acl.Owner;
import java.util.List;

public class DetailedApartment {
    // Apartment
    private String id;
    private String squareMeters;
    private String noRooms;
    private String floor;
    private String street;
    private String number;
    private String city;
    private String price;
    private String estimatedPrice;
    private String title;
    private String neighbourhood;
    private String createdAt;
    private String description;
    private List<Image> imageSources;
    // Owner
    private String ownerUsername;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String avatarSrc;

    public DetailedApartment(Apartment apartment, User user, List<Image> imageSources) {
        this.id = apartment.getId();
        this.squareMeters = apartment.getSquareMeters();
        this.noRooms = apartment.getNoRooms();
        this.floor = apartment.getFloor();
        this.street = apartment.getStreet();
        this.number = apartment.getNumber();
        this.city = apartment.getCity();
        this.ownerUsername = apartment.getOwnerUsername();
        this.price = apartment.getPrice();
        this.estimatedPrice = apartment.getEstimatedPrice();
        this.title = apartment.getTitle();
        this.neighbourhood = apartment.getNeighbourhood();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.avatarSrc = user.getAvatarSrc();
        this.createdAt = apartment.getCreatedAt();
        this.description = apartment.getDescription();
        this.imageSources = imageSources;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSquareMeters() {
        return squareMeters;
    }

    public void setSquareMeters(String squareMeters) {
        this.squareMeters = squareMeters;
    }

    public String getNoRooms() {
        return noRooms;
    }

    public void setNoRooms(String noRooms) {
        this.noRooms = noRooms;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(String estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNeighbourhood() {
        return neighbourhood;
    }

    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAvatarSrc() {
        return avatarSrc;
    }

    public void setAvatarSrc(String avatarSrc) {
        this.avatarSrc = avatarSrc;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Image> getImageSources() {
        return imageSources;
    }

    public void setImageSources(List<Image> imageSources) {
        this.imageSources = imageSources;
    }
}
