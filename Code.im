#include "HX711.h" // Inclui biblioteca HX711.h


const int DOUT_PIN = 33; // GPIO33
const int SCK_PIN = 32;  // GPIO32
const int LED_RED = 13;  // GPIO13 Alertar para tomar o remédio
const int LED_GREEN = 12; // GPIO12 Fica acesso, aparelho ok
const int LED_YELLOW = 14; //GPIO14 Medicamento acabando

HX711 scale; // Instância para realizar leitura de carga

const int NUM_READINGS = 10;  // Número total de leituras (ajuste conforme necessário)
float readings[NUM_READINGS]; // Declara um array que pode armazenar 10 valores float

void setup() {
  Serial.begin(115200);
  scale.begin(DOUT_PIN, SCK_PIN);
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);

}
void loop() {
  digitalWrite(LED_GREEN, HIGH);
  // Etapa 1: Realiza medições a cada 1 segundos
  for (int i = 0; i < NUM_READINGS; i++) {
    float currentReading = scale.get_units(10); // Leitura de 10 amostras para estabilidade
    readings[i] = static_cast<int>(currentReading / 1000); // Apenas considera a parte inteira da medição
    Serial.print("Medição ");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.println(currentReading);
    delay(1000); // Aguarda 1 segundos entre as medições
  }
  // Etapa 2: Calcula a mediana das primeiras leituras
  float initialMedian = calculateMedian(readings, NUM_READINGS);
  Serial.println("Mediana inicial: " + String(initialMedian));
  Serial.println("ALARME");
  digitalWrite(LED_RED, HIGH);
  delay(5000);
  digitalWrite(LED_RED, LOW);

  // Etapa 3: Aguarda 30 segundos
  Serial.println("Aguardando 15 segundos...");
  delay(15000); // Aguarda 15 segundos. No caso é o tempo do paciente se levantar e tomar a droga do comprimido

  // Etapa 4: Realiza medições a cada 1 segundos novamente
  for (int i = 0; i < NUM_READINGS; i++) {
    float currentReadingf = scale.get_units(10);
    // Apenas considera a parte inteira da medição
    readings[i] = static_cast<int>(currentReadingf / 1000);
    Serial.print("Medição ");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.println(currentReadingf);
    delay(1000);
  }
  // Etapa 5: Calcula a mediana das segundas leituras
  float finalMedian = calculateMedian(readings, NUM_READINGS);
  Serial.println("Mediana final: " + String(finalMedian));

  // Etapa 6: Verifica se a mediana final é menor que a inicial
  if (finalMedian > initialMedian) { // é maior porque o sinal dá valores negativos
    Serial.println("Processo encerrado.");
    while (true) {
    if (finalMedian > -158.00) {
      Serial.println("Atenção!! Medicamento está acabando.");
      digitalWrite(LED_YELLOW, HIGH); // Substitua pelo pino do LED desejado
      delay(5000);
      digitalWrite(LED_YELLOW, LOW);
      }
    }
  } else {
    Serial.println("Reiniciando o processo...");
  }
}
float calculateMedian(float arr[], int size) {
  // Ordena o array usando o algoritmo Bubble Sort
  for (int i = 0; i < size - 1; i++) {
    for (int j = 0; j < size - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Troca os elementos se estiverem fora de ordem
        float temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // Neste ponto, o array está ordenado em ordem crescente
  // Calcula a mediana
  if (size % 2 == 0) {
    // Se o tamanho do array for ímpar, a mediana é o valor do meio
    return (arr[size / 2 - 1] + arr[size / 2]) / 2.0;
  } else {
    // Se o tamanho do array for par, a mediana é a média dos dois valores do meio
    return arr[size / 2];
  }
}
