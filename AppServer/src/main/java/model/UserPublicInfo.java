package model;

public class UserPublicInfo {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String avatarSrc;
    private String createdAt;

    public UserPublicInfo(){}

    public UserPublicInfo(String username, String firstName, String lastName, String email, String phoneNumber, String avatarSrc, String createdAt) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.avatarSrc = avatarSrc;
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
}
