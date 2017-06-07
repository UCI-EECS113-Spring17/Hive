from pynq import Overlay
from pynq.iop import request_iop
from pynq.iop import iop_const
from pynq.iop import Pmod_IO
from pynq.iop import Arduino_IO
from pynq.iop import PMODA
from pynq.iop import PMODB
from pynq.iop import ARDUINO
from pynq.iop import PMOD_GROVE_G1
from pynq.iop import PMOD_GROVE_G2
from pynq.iop import PMOD_GROVE_G3
from pynq.iop import PMOD_GROVE_G4
from pynq.iop import Grove_Light
from pynq.iop import Grove_ADC
from pynq.iop import Grove_PIR
from pynq.iop import ARDUINO_GROVE_I2C
from pynq.iop import grove_th02

def main():
    print("Temperature (Celcius) and Humidity (RH): ", readTH02())
    print("Light (kOhm; the lower the value, the higher the light intensity): ", readLight())
    print("Motion: ", readMotion())
    
def readTH02():
    values = grove_th02.Grove_TH02(PMODA, PMOD_GROVE_G3)
    return values.read()
    
def readLight():
    adc = Grove_ADC(ARDUINO, ARDUINO_GROVE_I2C)
    light = Grove_Light(ARDUINO, ARDUINO_GROVE_I2C)
    return light.read()

def readMotion():
    pir = Grove_PIR(PMODB,PMOD_GROVE_G1)
    return pir.read()

if __name__ == "__main__":
    main()