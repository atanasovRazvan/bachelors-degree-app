package model;

public class User {

    public static class Builder {

        private final String username;
        private String password;
        private String firstName;
        private String lastName;
        private String email;
        private String phoneNumber;
        private String avatarSrc;
        private String createdAt;

        public Builder(String username) {
            this.username = username;
        }

        public Builder withPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder withFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder withLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder withEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder withPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder withAvatarSrc(String avatarSrc) {
            this.avatarSrc = avatarSrc;
            return this;
        }

        public Builder withCreatedAt(String createdAt){
            this.createdAt = createdAt;
            return this;
        }

        public User build() {
            User user = new User();
            user.username = this.username;
            user.password = this.password;
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.email = this.email;
            user.phoneNumber = this.phoneNumber;
            user.avatarSrc = this.avatarSrc;
            user.createdAt = this.createdAt;

            return user;
        }
    }

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String avatarSrc;
    private String createdAt;

    private User() {

    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}
