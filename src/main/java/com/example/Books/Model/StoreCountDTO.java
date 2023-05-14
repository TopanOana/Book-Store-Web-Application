package com.example.Books.Model;

public class StoreCountDTO {
    private Long storeID;
    private int quantity;
    private String storeName;
    private String address;
    private String contactNumber;
    private int openingHour;

    public StoreCountDTO(Long storeID, String storeName, String address, String contactNumber, int openingHour, int closingHour, int quantity) {
        this.storeID = storeID;
        this.quantity = quantity;
        this.storeName = storeName;
        this.address = address;
        this.contactNumber = contactNumber;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
    }

    public StoreCountDTO() {
    }

    private int closingHour;

    public Long getStoreID() {
        return storeID;
    }

    public void setStoreID(Long storeID) {
        this.storeID = storeID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public int getOpeningHour() {
        return openingHour;
    }

    public void setOpeningHour(int openingHour) {
        this.openingHour = openingHour;
    }

    public int getClosingHour() {
        return closingHour;
    }

    public void setClosingHour(int closingHour) {
        this.closingHour = closingHour;
    }

}
