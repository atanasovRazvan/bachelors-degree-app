package model;

import java.util.UUID;

public class Apartment {

    public static class Builder{

        private final String id;
        private String title;
        private String neighbourhood;
        private String squareMeters;
        private String noRooms;
        private String floor;
        private String street;
        private String number;
        private String city;
        private String ownerUsername;
        private String price;
        private String estimatedPrice;
        private String createdAt;
        private String description;

        public Builder(){
            this.id = UUID.randomUUID().toString();
        }

        public Builder withStreet(String street){
            this.street = street;
            return this;
        }

        public Builder withNumber(String number){
            this.number = number;
            return this;
        }

        public Builder withCity(String city){
            this.city = city;
            return this;
        }

        public Builder withSquareMeters(String squareMeters){
            this.squareMeters = squareMeters;
            return this;
        }

        public Builder withNoRooms(String noRooms){
            this.noRooms = noRooms;
            return this;
        }

        public Builder withFloor(String floor){
            this.floor = floor;
            return this;
        }

        public Builder withPrice(String price){
            this.price = price;
            return this;
        }

        public Builder withEstimatedPrice(String estimatedPrice){
            this.estimatedPrice = estimatedPrice;
            return this;
        }

        public Builder withOwnerUsername(String ownerUsername){
            this.ownerUsername = ownerUsername;
            return this;
        }

        public Builder withTitle(String title){
            this.title = title;
            return this;
        }

        public Builder withNeighbourhood(String neighbourhood){
            this.neighbourhood = neighbourhood;
            return this;
        }

        public Builder withCreatedAt(String createdAt){
            this.createdAt = createdAt;
            return this;
        }

        public Builder withDescription(String description){
            this.description = description;
            return this;
        }

        public Apartment build() {
            Apartment apartment = new Apartment();
            apartment.id = this.id;
            apartment.floor = this.floor;
            apartment.noRooms = this.noRooms;
            apartment.squareMeters = this.squareMeters;
            apartment.city = this.city;
            apartment.street = this.street;
            apartment.number = this.number;
            apartment.price = this.price;
            apartment.estimatedPrice = this.estimatedPrice;
            apartment.ownerUsername = this.ownerUsername;
            apartment.title = this.title;
            apartment.neighbourhood = this.neighbourhood;
            apartment.createdAt = this.createdAt;
            apartment.description = this.description;

            return apartment;
        }

    }

    private String id;
    private String squareMeters;
    private String noRooms;
    private String floor;
    private String street;
    private String number;
    private String city;
    private String ownerUsername;
    private String price;
    private String estimatedPrice;
    private String title;
    private String neighbourhood;
    private String createdAt;
    private String description;
    private String displayImage;

    public String getDisplayImage() {
        return displayImage;
    }

    public void setDisplayImage(String displayImage) {
        this.displayImage = displayImage;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    private Apartment() { }

    public String getId() {
        return id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
