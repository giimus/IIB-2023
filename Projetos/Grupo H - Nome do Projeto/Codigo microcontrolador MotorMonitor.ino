#include <BLEDevice.h> //Biblioteca a ser utilizada dentro da Biblioteca do ESP32
#include <BLEUtils.h>  //Biblioteca a ser utilizada dentro da Biblioteca do ESP32
#include <BLEServer.h> //Biblioteca a ser utilizada dentro da Biblioteca do ESP32

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;

#define SERVICE_UUID        "8fafc201-1fb5-459e-8fcc-c5c9c331914b"  // NÂO MEXER - Endereço Bluetooth para comunicação 
#define CHARACTERISTIC_UUID "4eb5483e-36e1-4688-b7f5-ea07361b26a8"  // NÂO MEXER - Endereço Bluetooth para comunicação 

void setup() {
  Serial.begin(115200);
  
  BLEDevice::init("MotorMonitor"); // Escolha o nome do seu dispositivo a ser mostrado no Bluetooth
  pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_WRITE
                    );
  pService->start();
  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
}

void loop() {
 
  int sensorValue = analogRead(A0); // Lê a porta analógica

  Serial.println(sensorValue); // Plota o valor do sensor no serial

  byte data[2];
  data[0] = sensorValue & 0xFF; 
  data[1] = (sensorValue >> 8) & 0xFF; 

  pCharacteristic->setValue(data, sizeof(data)); // Envio dos dados por BLE 
  pCharacteristic->notify();
  
  delay(10); // Período de tempo em milisegundos emtre cada transmissao de sinal
}
