package com.application.util;

import com.application.entities.SubwayStop;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.*;

import static com.application.util.JsonUtil.parseJSONFile;


public class StopsUtil {

    private static String filePath = new File("").getAbsolutePath() + "/src/data/rawStopInfo.json";

    public static void main(String[] args) {
        //manual testing
        ArrayList<SubwayStop> test = getStopsForLine("M");
        System.out.println(test);
    }


    /*
    Gets stops for a specific subway line
     */
    public static ArrayList<SubwayStop> getStopsForLine(String subwayLine) {
        ArrayList<SubwayStop> subwayStops = new ArrayList<>();
        try {
            JSONObject json = parseJSONFile(filePath);
            Iterator<String> keys = json.keys();
            while(keys.hasNext()) {
                String key = keys.next();
                if (json.get(key) instanceof JSONObject) {
                    JSONObject instance = (JSONObject) json.get(key);
                    String[] connectedLines;
                    if (instance.get("Daytime Routes") instanceof Integer) {
                        connectedLines = new String[]{(instance.get("Daytime Routes")).toString()};
                    } else {
                        connectedLines = ((String)instance.get("Daytime Routes")).split(" ");
                    }
                    String stopName = (String)instance.get("Stop Name");
                    String direction = (String)instance.get("Line");
                    String borough = (String)instance.get("Borough");
                    Double latitude = (Double) instance.get("GTFS Latitude");
                    Double longitude = (Double) instance.get("GTFS Longitude");
                    String northDirection = (String) instance.get("North Direction Label");
                    String southDirection = (String) instance.get("South Direction Label");
                    String stopID;
                    if (instance.get("GTFS Stop ID") instanceof Integer) {
                        stopID = (instance.get("GTFS Stop ID")).toString();
                    } else {
                        stopID = (String) instance.get("GTFS Stop ID");
                    }
                    List<String> list = Arrays.asList(connectedLines);
                    if (list.contains(subwayLine)) {
                        SubwayStop subwayStop = new SubwayStop(stopName,borough,connectedLines,latitude,longitude,
                                northDirection,southDirection, direction, stopID);
                        subwayStops.add(subwayStop);
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        SubwayStop startingStation = getStartingStation(subwayStops, subwayLine);
        subwayStops = sortStopsForLine(subwayStops, startingStation);
//        System.out.println("***STARTING***");
//        System.out.println(startingStation);
//        System.out.println("***STOPS***");
//        System.out.println(subwayStops);
        return subwayStops;
    }

    /*
    Sorts the subway stops based on distance and previous
     */
    public static ArrayList<SubwayStop> sortStopsForLine(ArrayList<SubwayStop> subwayStops, SubwayStop startingStation) {
        ArrayList<SubwayStop> sortedSubwayStop = new ArrayList<>();
        return recursiveSort(subwayStops, startingStation, sortedSubwayStop);
    }

    public static ArrayList<SubwayStop> recursiveSort(ArrayList<SubwayStop> subwayStops, SubwayStop startingStation, ArrayList<SubwayStop> sortedSubwayStops) {
        if (subwayStops.size() == 0) {
            return sortedSubwayStops;
        }
        sortedSubwayStops.add(startingStation);
        subwayStops.remove(startingStation);
        SubwayStop closest = null;
        double closestDistance = 1000;
        for (SubwayStop stop1: subwayStops) {
            if(closest == null) {
                closest = stop1;
            }
            if (calculateDistance(stop1, startingStation) < closestDistance) {
                closest = stop1;
                closestDistance = calculateDistance(stop1, startingStation);
            }
        }
        return recursiveSort(subwayStops, closest, sortedSubwayStops);

    }

    /*
    Gets the distance between two stations
     */
    public static double calculateDistance(SubwayStop stop1, SubwayStop stop2) {
        double modX = stop1.getLatitude() - stop2.getLatitude();
        double modY = stop1.getLongitude() - stop2.getLongitude();
        double inner = Math.pow(modX, 2) + Math.pow(modY, 2);
        return Math.pow(inner, 0.5);
    }

    /*
    Get either endpoints of the subway line
    NOTE: NOT THE MOST ELEGANT IMPLEMENTATION!!!
     */
    public static SubwayStop getStartingStation (ArrayList<SubwayStop> subwayStops, String subwayLine) {
        for (SubwayStop subwayStop: subwayStops) {
            if ((subwayLine.equals("M") || subwayLine.equals("R")) && subwayStop.getStopName().equals("Forest Hills - 71 Av")) {
                return subwayStop;
            }
            if ((subwayLine.equals("J")|| subwayLine.equals("Z")) && subwayStop.getStopName().equals("Broad St")) {
                return subwayStop;
            }
            if ((subwayLine.equals("G")) && subwayStop.getStopName().equals("Court Sq")) {
                return subwayStop;
            }
            if ((subwayLine.equals("Q")) && subwayStop.getStopName().equals("96 St")) {
                return subwayStop;
            }
            if ((subwayLine.equals("1")) && subwayStop.getStopName().equals("Van Cortlandt Park - 242 St")) {
                return subwayStop;
            }
            if ((subwayLine.equals("3")) && subwayStop.getStopName().equals("Harlem - 148 St")) {
                return subwayStop;
            }
            if ((subwayLine.equals("F")) && subwayStop.getStopName().equals("Jamaica - 179 St")) {
                return subwayStop;
            }
            if ((subwayLine.equals("E")) && subwayStop.getStopName().equals("World Trade Center")) {
                return subwayStop;
            }
            if ((subwayLine.equals("4")) && subwayStop.getStopName().equals("Utica Av")) {
                return subwayStop;
            }
            if ((subwayLine.equals("5")) && subwayStop.getStopName().equals("Flatbush Av - Brooklyn College")) {
                return subwayStop;
            }
            if (subwayStop.getSouthDirection() == "" || subwayStop.getNorthDirection() == "") {
                return subwayStop;
            }

        }
        return subwayStops.get(0);
    }

    public static JSONArray convertObjArrayToArray(ArrayList<SubwayStop> list) throws JSONException {
        JSONArray array = new JSONArray();
        for (SubwayStop stop: list) {
            JSONObject instance =  new JSONObject();
            instance.put("Stop Name", stop.getStopName());
            instance.put("Connected Lines", stop.getConnectedLines());
            instance.put("Direction", stop.getDirection());
            instance.put("Latitude", stop.getLatitude());
            instance.put("Longitude", stop.getLongitude());
            array.put(instance);
        }
        return array;
    }

    public static HashMap<String, SubwayStop> mapIdToStop(ArrayList<SubwayStop> list) {
        HashMap<String, SubwayStop> stopMap = new HashMap<>();
        for (SubwayStop stop: list) {
            String ID = stop.getStopID();
            stopMap.put(ID, stop);
        }
        return stopMap;
    }
}
