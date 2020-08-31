package com.application;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StopsTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    public void stopsEndPointShouldReturnList() throws Exception{
        String endPt = "http://localhost:" + port + "/stops";
        HashMap<String, String> params = new HashMap<>();
        params.put("subwayline","L");
        assertThat(this.restTemplate.getForObject(endPt, List.class, params)).isNotEmpty();
    }
}
