#include "DHT.h"
#include "LiquidCrystal.h"

#define DHTPIN A1 // Definindo da porta para o sensor DHT11
#define DHTTYPE DHT11 // Definindo do sensor usado DHT 11
#define RELAY_PIN 9  // Definindo a porta do módulo relé

#define MIN_TEMPERATURE 37.4  // Temperatura mínima recomendada para chocadeira
#define MAX_TEMPERATURE 38.0  // Temperatura máxima recomendada para chocadeira

LiquidCrystal lcd(7, 8, 5, 4, 3, 2); // Defininfo as conexões para a placa LCD
DHT dht(DHTPIN, DHTTYPE);
 
void setup() 
{
  Serial.begin(9600);
  pinMode(RELAY_PIN, OUTPUT);

  // Configurações iniciais do display e do sensor
  dht.begin();
  lcd.begin(16, 2);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: --- C");
  lcd.setCursor(0, 1);
  lcd.print("Umidade: --- %");
}
 
void loop() 
{
  // Obtenção dos valores pelo sensor
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Teste de retorno do sensor
  if (isnan(t) || isnan(h)) 
  {
    Serial.println("Falha na leitura do sensor DHT11");
  } 
  else
  {
    // Acompanhamento do funcionamento com o display
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temp: ");
    lcd.print(t);
    lcd.print(" C");
    lcd.setCursor(0, 1);
    lcd.print("Umidade: ");
    lcd.print(h);
    lcd.print(" %");

    // Acompanhamento do funcionamento com o monitor serial
    Serial.print("Umidade: ");
    Serial.print(h);
    Serial.print(" %t");
    Serial.print("Temperatura: ");
    Serial.print(t);
    Serial.println(" °C");

  // Controle da faixa de temperatura
  if (temperature < MIN_TEMPERATURE) {
    digitalWrite(RELAY_PIN, LOW);
  } else if (temperature > MAX_TEMPERATURE) {
    digitalWrite(RELAY_PIN, HIGH);
  }
  
  delay(1000);
}
