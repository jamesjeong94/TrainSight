package com.application.entities;

public class SubwayStop {
    private String stopName;
    private String borough;
    private String[] connectedLines;
    private double latitude;
    private double longitude;
    private String northDirection;
    private String southDirection;

    public SubwayStop(String stopName, String borough, String[] connectedLines, double latitude, double longitude, String northDirection, String southDirection) {
        this.stopName = stopName;
        this.borough = borough;
        this.connectedLines = connectedLines;
        this.latitude = latitude;
        this.longitude = longitude;
        this.northDirection = northDirection;
        this.southDirection = southDirection;
    }
}
