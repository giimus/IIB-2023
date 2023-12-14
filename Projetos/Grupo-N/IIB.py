import serial
import subprocess
import webbrowser

porta_serial = serial.Serial('COM3', 115200)

try:
    while True:
        # Ler dados da porta serial
        dado = porta_serial.readline().decode().strip()
        print(f"Dado recebido: {dado}")
        cardUI = dado
except KeyboardInterrupt:
    name = input("Digite seu Nome: ")
    sex = input("Sexo: ")
    nasc = input("Data de Nascimento: ")
    sang = input("Tipo Sanguineo: ")
    porta_serial.close()
    print("Comunicação encerrada.")


url = 'https://script.google.com/macros/s/AKfycbzFojG0AfGlXALAFHxjaAyhyIggTS6FTgEkMMkyTCN4zp5ZB9covFtYNX_LBbodsgkiOg/exec' 
url2 = "?value1={}&value2={}&value3={}&value4={}&value5={}".format(cardUI, name, sex, nasc, sang)

url_final=url + url2

print(url2)

print(url_final)


# Abrir a URL
webbrowser.open_new_tab(url_final)