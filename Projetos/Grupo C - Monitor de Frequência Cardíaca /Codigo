//Projeto instrumentação Biomédica 2023
//Curso de física médica

#include <LiquidCrystal.h>
#include <Wire.h>
#include "MAX30105.h"           //Bibliioteca do sensor MAX30102
#include "heartRate.h"          //Algoritmo para cálculo da freqência cardíaca

MAX30105 particleSensor;
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const byte RATE_SIZE  = 4;      //Tamanho da amostragem no cálculo da média
byte rates[RATE_SIZE];          //Vetor com os valores das frequeências cardíacas
byte rateSpot = 0;
long lastBeat = 0;              //Momento em que o último batimento ocorreu
float beatsPerMinute;           //Batimentos por minuto medidos instantâneamente
int beatAvg = 0;                    //Média entre os valores de BPM medidos
int Buzer = 8;
void setup() {  
  
  lcd.begin(16, 2);

  pinMode(8,OUTPUT);
  digitalWrite(8,LOW);
  
  //  Inicializando o Sensor
  particleSensor.begin(Wire, I2C_SPEED_FAST);
  particleSensor.setup(); 
  particleSensor.setPulseAmplitudeRed(0x0A);

}

void loop() {
 long irValue = particleSensor.getIR();       //Lê valores para identificar um toque no sensor e
                                              // detecta um batimento cardíaco
if(irValue  > 50000){                      
    lcd.clear();                                                               
    lcd.setCursor(5,0);                
    lcd.print("BPM:");                             
    lcd.print(beatAvg);  
  if (checkForBeat(irValue) == true)            //se um batimento for detectado então:
  {
    digitalWrite(Buzer,HIGH);                   //Aciona se um buzzer
    delay(100);
    digitalWrite(Buzer,LOW);                    //Desativa se o buzzer após um intervalo para produzir o som de bip
    //We sensed a beat!
    long delta = millis()  - lastBeat;          //Medida do intervalo de tempo entre duas batidas do coração
    lastBeat  = millis();

    beatsPerMinute = 60 / (delta / 1000.0);     //Cálculo da freqência em BPM

    if (beatsPerMinute < 255 && beatsPerMinute > 20)   //Para se obter uma maior precisão calcula-se a média dos BPM obtidos em 4 batimentos (RATE_SIZE)...
    {
      rates[rateSpot++] = (byte)beatsPerMinute;         // ... armazenando-se os valores no vetor rates.
      rateSpot %= RATE_SIZE; //Wrap variable

      //Tmando o valor médio das leituras:
      
      beatAvg = 0;
      for (byte x = 0 ; x < RATE_SIZE  ; x++) 
        beatAvg += rates[x];
        beatAvg /= RATE_SIZE;
        delay(100);
    }  
  lcd.clear();                                                               
  lcd.setCursor(0,0);                
  lcd.print("BPM:");                             
  lcd.print(beatAvg);  
  
  }

}
  if (irValue <= 50000){       //Condição para caso um dedo não encoste no sensor
     beatAvg=0;
     lcd.clear();              
     lcd.setCursor(0,1);                
     lcd.print("Toque no sensor");  
     digitalWrite(Buzer,LOW);
     }

}
