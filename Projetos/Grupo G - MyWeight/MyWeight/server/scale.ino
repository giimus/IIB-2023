#include "HX711.h"
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

const int pinDT = 23;
const int pinSCK = 22;

HX711 scale;

float calib = 0.0;
float knownWeight = 0.0;
long meanReading = 0;
long offset = 0;
float weight = 0.0;

const char ssid[] = "********";
const char password[] = "********";

WebServer server(80);

long control = 0;
float blockedWeight = 0.0;

void setup() {
  Serial.begin(115200);
  scale.begin(pinDT, pinSCK);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println("Conectado ao WiFi");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  server.enableCORS(true);
  server.begin();

  server.on("/calib", HTTP_OPTIONS, handleOptions);
  server.on("/calib", HTTP_POST, getKnownWeight);

  server.on("/calib/no-weight", noWeight);

  server.on("/calib/put-weight", putWeight);

  server.on("/block", blockWeight);

  server.on("/reset", resetWeight);

  server.on("/calib/verify", calibVerify);
}

void loop() {
  server.handleClient();

  if (scale.is_ready()) {
    meanReading = scale.get_units(10) * (-1);

    if (abs(meanReading - control) > 0.005 * control) {
      control = meanReading;
    }

    if (abs(control - offset) < 0.005 * control) {
      weight = 0;
    } else {
      weight = (control - offset) * calib;
      if(weight < 0) {
        weight = 0;
      }
    }

    Serial.println("L. média: " + String(meanReading) + " unidades" + " | " + "Offset: " + String(offset) + " unidades" + " | " + "Calib.: " + String(calib * 1000, 5) + " × 10³" + " | " + "L. ajustada: " + String(control) + " unidades" + " | " + "Massa: " + String(weight, 3) + " kg" + " | " + "Massa travada: " + String(blockedWeight, 3) + " kg");
  } else {
    Serial.println("Erro ao ler a balança.");
  }

  delay(100);
}

void handleOptions() {
  server.send(200, "text/plain", "");
  return;
}

void getKnownWeight() {
  handleOptions();

  if (server.hasArg("plain")) {
    String jsonPayload = server.arg("plain");
    Serial.println("JSON recebido: " + jsonPayload);

    StaticJsonDocument<200> jsonDoc;
    DeserializationError error = deserializeJson(jsonDoc, jsonPayload);

    if (error) {
      Serial.print("Erro na análise do JSON: ");
      Serial.println(error.c_str());
      
      server.send(400);
      return;
    } else {
      if (jsonDoc.containsKey("knownWeight")) {
        knownWeight = jsonDoc["knownWeight"];
        Serial.print("knownWeight atualizado: ");
        Serial.println(knownWeight, 3);
        server.send(200);
        return;
      } else {
        server.send(400);
        return;
      }
    }
  } else {
    server.send(400);
    return;
  }
}

void noWeight() {
  offset = control;
  server.send(200);
  return;
}

void putWeight() {
  long calibReading = control;
  calib = knownWeight / (calibReading - offset);
  server.send(200);
  return;
}

void blockWeight() {
  blockedWeight = weight;
  server.send(200, "application/json","{\"massa\":" + String(blockedWeight, 2) + "}");
  return;
}

void calibVerify() {
  if(calib <= 0.0) {
    server.send(400);
    return;
  } else {
    server.send(200);
    return;
  }
}

void resetWeight() {
  offset = 0;
  calib = 0.0;
  control = 0.0;
  weight = 0.0;
  blockedWeight = 0.0;

  server.send(200);
  return;
}