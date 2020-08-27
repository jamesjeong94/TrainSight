package com.application.controllers;

import com.application.entities.SubwayStop;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import static com.application.util.StopsUtil.getStopsForLine;

@RestController
public class StopsController {

   @RequestMapping(value = "/stops", method = RequestMethod.GET)
   @ResponseBody
   public ArrayList<SubwayStop> getSubwayStops(@RequestParam(value = "subwayline", defaultValue = "L")String subwayLine) throws JSONException {
       return getStopsForLine(subwayLine);
   }

}
