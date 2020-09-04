package com.application.entities;

public class SubwayStop {
    private String stopName;
    private String borough;
    private String[] connectedLines;
    private double latitude;
    private double longitude;
    private String northDirection;
    private String southDirection;
    private String direction;
    private String stopID;




    public SubwayStop(String stopName, String borough, String[] connectedLines, double latitude, double longitude,
                      String northDirection, String southDirection, String direction, String stopID) {

        this.stopName = stopName;
        this.borough = borough;
        this.connectedLines = connectedLines;
        this.latitude = latitude;
        this.longitude = longitude;
        this.northDirection = northDirection;
        this.southDirection = southDirection;
        this.direction = direction;
        this.stopID = stopID;

    }

    public String getStopName() {
        return stopName;
    }

    public String getBorough() {
        return borough;
    }

    public String[] getConnectedLines() {
        return connectedLines;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getNorthDirection() {
        return northDirection;
    }

    public String getSouthDirection() {
        return southDirection;
    }

    public String getStopID() {
        return stopID;
    }

    public String getDirection() {
        return direction;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder(stopName);
        sb.append(" "+direction).append(" "+latitude).append(" "+longitude).append("\nSouth:"+getSouthDirection()).append("\nNorth:"+getNorthDirection()+"\n");
        return sb.toString();
    }
}
