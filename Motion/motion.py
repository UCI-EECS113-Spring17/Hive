
# coding: utf-8

# In[2]:

from pynq import Overlay
from pynq.iop import Grove_PIR
from pynq.iop import PMODA
from pynq.iop import PMOD_GROVE_G1

def main():
    print("Motion sensor returned",readMotion())
    
def readMotion():
    pir = Grove_PIR(PMODA,PMOD_GROVE_G1)
    return pir.read()

if __name__ == "__main__":
    main()

