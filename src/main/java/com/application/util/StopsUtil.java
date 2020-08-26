package com.application.util;

import com.application.entities.SubwayStop;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;

import static com.application.util.JsonUtil.parseJSONFile;


public class StopsUtil {

    private static String filePath = new File("").getAbsolutePath() + "/src/data/rawStopInfo.json";

    public static void main(String[] args) {
        getStopsForLine("hello");
    }

    public static SubwayStop[] getStopsForLine(String subwayLine) {
        try {
            System.out.println(filePath);
            JSONObject json = parseJSONFile(filePath);
            System.out.println(json);
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        SubwayStop[] test = new SubwayStop[5];
        return test;
    }


}
