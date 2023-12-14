#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>

#define SS_PIN 21
#define RST_PIN 22
MFRC522 mfrc522(SS_PIN, RST_PIN);

#define PROJECT_ID "112213607426138503642"
#define CLIENT_EMAIL "ibb-usp@iib-usp.iam.gserviceaccount.com"


char ssid[] = "iPhone de Davi";
char pass[] = "123456789";

unsigned long ms = 0;

WiFiClient client;

void setup() {
  Serial.begin(115200);
  delay(1000);
  SPI.begin();

  mfrc522.PCD_Init();
  
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println("Conectado ao WiFi");
  Serial.println(WiFi.localIP());

}

void loop() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    String cardUID = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      cardUID.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
      cardUID.concat(String(mfrc522.uid.uidByte[i], HEX));
    }

    Serial.println(cardUID);

  }
}
