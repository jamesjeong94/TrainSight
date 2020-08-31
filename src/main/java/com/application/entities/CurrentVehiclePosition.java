package com.application.entities;

public class CurrentVehiclePosition {
    private int timeStamp;
    private String stop_id;
    private int current_stop_sequence;
    private String direction;

    public CurrentVehiclePosition(int timeStamp, String stop_id, int current_stop_sequence, String direction) {
        this.timeStamp = timeStamp;
        this.stop_id = stop_id;
        this.current_stop_sequence = current_stop_sequence;
        this.direction = direction;
    }

    public int getTimeStamp() {
        return timeStamp;
    }
    public String getStopID() {
        return stop_id;
    }

    public int getCurrentStopSequence() {
        return current_stop_sequence;
    }

    public String getDirection() {
        return direction;
    }
}

