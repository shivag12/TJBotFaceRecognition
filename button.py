import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    input_state = GPIO.input(17)
    if input_state == False:
        print('Button Pressed')
        time.sleep(0.2)
    else : 
	print('button released')
	time.sleep(0.2)