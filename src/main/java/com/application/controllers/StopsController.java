package com.application.controllers;

import com.application.entities.CurrentVehiclePosition;
import com.application.entities.SubwayStop;
import com.google.transit.realtime.GtfsRealtime;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

import static com.application.util.StopsUtil.getStopsForLine;
import static com.application.util.StopsUtil.mapIdToStop;

@RestController
public class StopsController {

   @RequestMapping(value = "/stops", method = RequestMethod.GET)
   @ResponseBody
   public HashMap<String, Object> getSubwayStops(@RequestParam(value = "subwayline", defaultValue = "L")String subwayLine) throws JSONException {
       HashMap<String, Object> response = new HashMap<>();
       ArrayList<SubwayStop> stops = getStopsForLine(subwayLine);
       response.put("stops", stops);
       response.put("map",mapIdToStop(stops));
       return response;
   }

   @RequestMapping(value="/stopsLive", method = RequestMethod.GET)
   @ResponseBody
   public ArrayList<CurrentVehiclePosition> getLiveSubwayStops(@RequestParam(value = "subwayline",defaultValue = "7")String subwayLine)  {
       return com.application.models.MTAModel.getGTFS(subwayLine);
   }
}
