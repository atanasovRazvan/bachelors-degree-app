import sys
import os
import importlib

os.chdir("C:/Users/Razvan/Desktop/LICENTA/Lucrarea de Licenta/ml-price-estimation")
importlib.reload(sys)

from Neuron import *
from dataNormalisation import *
from reader import readData, readNeighbourhoods

input = readData()
neighbourhoods = readNeighbourhoods()

inputs = []
for el in input:
    oneInput = [neighbourhoods[el[0]]]
    for x in el[1:]:
        oneInput.append(int(x))
    inputs.append(oneInput)

split = int(len(inputs) / 10)

mean, stdDev = normalisation(inputs[split:])
trainData, testData = dataNormalisation(inputs[split:], inputs[:split], mean, stdDev)

network = netInitialisation(3, 1, 10)
overflow = True

while overflow:
    try:
        trainingMLP(network, trainData, 0.001, 1000)
        overflow = False
    except:
        network = netInitialisation(3, 1, 3)

networkFile = open('network.txt', 'w')
networkFile.write(str(mean)+"\n")
networkFile.write(str(stdDev)+"\n")
for layer in network:
    for neuron in layer:
        networkFile.write(str(neuron))
        networkFile.write("\n")
networkFile.close()

output = evaluatingMLP(network, testData)
print("Training DONE!")
