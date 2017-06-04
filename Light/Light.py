
# coding: utf-8

# In[ ]:

from time import sleep
from pynq import Overlay
from pynq.board import LED
from pynq.board import RGBLED
from pynq.board import Button
from pynq.board import Switch
from pynq.iop import Grove_Light
from pynq.iop import Grove_ADC
from pynq.iop import PMODA
from pynq.iop import PMOD_GROVE_G4
import asyncio
from IPython.display import display
from ipywidgets import widgets


val = 0.0
adc = Grove_ADC(PMODA,PMOD_GROVE_G4)
light = Grove_Light(PMODA,PMOD_GROVE_G4)


print("Starting detection...")
print("Note: Higher values mean it is dark, lower values are light")
print("Minimum value seems to be around 6")

while True:
    sleep(0.5)
    val = light.read()
    print("The light sensor value is: %.2f" % val)

