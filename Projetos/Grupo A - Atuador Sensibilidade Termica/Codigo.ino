//PROJETO DE ATUADOR UTILIZANDO PELTIER E SENSORES DE TEMPERATURA
//DESENVOLVIDO PARA DISCIPLINA DE INSTRUMENTAÇÃO BIOMÉDICA DO CURSO DE FÍSICA MÉDICA DA USP-RP
//AUTORES: VICTOR HUGO CELONI GNATKOVSKI, GABRIELA FLECK GODOI, JULIA CRISTINA E LUIZA COTRIM DE FARIA

//O DESENVOLVIMENTO DESTE CÓDIGO FOI REALIZADO UTILIZANDO O SENSOR DE TEMPERATURA PROGRAMÁVEL DS18B20, CÉLULA PELTIER TEC1-12706, MÓDULO RELÉ ARDUINO E ESP32.
//https://pdf1.alldatasheet.com/datasheet-pdf/view/58557/DALLAS/DS18B20.html
//https://ny3.blynk.cloud/dashboard/139942/global/devices/967542/organization/139942/devices/529715/dashboard




#define BLYNK_TEMPLATE_ID "TMPL2wiE65uiB"
#define BLYNK_TEMPLATE_NAME "Temperatura Peltier"
#define BLYNK_AUTH_TOKEN "lPqpnazFcx0mcMNVZ-B2YxwTrO9BW8c_"
#define BLYNK_PRINT Serial

#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
#include <OneWire.h>
#include <DallasTemperature.h>



#define PIN_RELAY 5   //PINO DO RELÉ
#define PIN_SENSOR1 2 //SENSOR QUENTE
#define PIN_SENSOR2 4 //SENSOR FRIO

OneWire oneWire1(PIN_SENSOR1);
DallasTemperature sensors1(&oneWire1);

OneWire oneWire2(PIN_SENSOR2);
DallasTemperature sensors2(&oneWire2);


//ALTERAR PARA O WIFI DESEJADO
char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "Victor"; //NOME DO WIFI
char pass[] = "victorceloni"; //SENHA DO WIFI

BlynkTimer timer;

void readTemperatures()
{
  sensors1.requestTemperatures();
  sensors2.requestTemperatures();

  float temp1 = sensors1.getTempCByIndex(0);
  float temp2 = sensors2.getTempCByIndex(0);

  Serial.print("Temperatura Quente: ");
  Serial.println(temp1);

  Serial.print("Temperatura Fria: ");
  Serial.println(temp2);
  
  delay(500);
  
  Blynk.virtualWrite(V0, temp1);
  Blynk.virtualWrite(V1, temp2);

  // Condição para desligar o relé se a temperatura do sensor 1 ultrapassar as temperatura desejada
  if (temp1 > 45) { 
    digitalWrite(PIN_RELAY, LOW);  // Desliga o relé
    Blynk.virtualWrite(V2, LOW);   // Atualiza o estado do relé no aplicativo Blynk
    delay(10000);
  }
  else
  {
    digitalWrite(PIN_RELAY, HIGH);
    Blynk.virtualWrite(V2, HIGH);
  };
  // Condição para desligar o relé se a temperatura do sensor 1 ultrapassar as temperatura desejada
  if (temp1 < 3) { 
    digitalWrite(PIN_RELAY, LOW);  // Desliga o relé
    Blynk.virtualWrite(V2, LOW);   // Atualiza o estado do relé no aplicativo Blynk
    delay(10000);
  }
  else
  {
    digitalWrite(PIN_RELAY, HIGH);
    Blynk.virtualWrite(V2, HIGH);
  };

}


void controlRelay()
{
  int relayState = digitalRead(PIN_RELAY);
  Blynk.virtualWrite(V2, relayState);
}

void setup()
{
  Serial.begin(115200);

  pinMode(PIN_RELAY, OUTPUT);
  digitalWrite(PIN_RELAY, HIGH); // Garante que o relé comece ligado
  Blynk.virtualWrite(V2, HIGH);
  Blynk.begin(auth, ssid, pass);
  sensors1.begin();
  sensors2.begin();

  timer.setInterval(1000L, readTemperatures);
  timer.setInterval(1000L, controlRelay);
}

void loop()
{
  Blynk.run();
  timer.run();
}
