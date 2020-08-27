package com.application.util;

import com.application.entities.SubwayStop;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import static com.application.util.JsonUtil.parseJSONFile;


public class StopsUtil {

    private static String filePath = new File("").getAbsolutePath() + "/src/data/rawStopInfo.json";

    public static void main(String[] args) {
        //manual testing
        ArrayList<SubwayStop> test = getStopsForLine("G");
        for(SubwayStop subwayStop: test) {
            System.out.println(subwayStop);
        }
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
                    List<String> list = Arrays.asList(connectedLines);
                    if (list.contains(subwayLine)) {
                        SubwayStop subwayStop = new SubwayStop(stopName,borough,connectedLines,latitude,longitude,northDirection,southDirection, direction);
                        subwayStops.add(subwayStop);
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return subwayStops;
    }

    /*
    Sorts the subway stops based on distance and previous
     */
    public static void sortStopsForLine(ArrayList<SubwayStop> subwayStops) {

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
     */
    public static SubwayStop getStartingStation (ArrayList<SubwayStop> subwayStops) {
        for (SubwayStop subwayStop: subwayStops) {
            if (subwayStop.getNorthDirection().isEmpty()) {
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
}
