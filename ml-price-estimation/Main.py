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

network = netInitialisation(3, 1, 3)
trainingMLP(network, trainData, 0.001, 1000)
output = evaluatingMLP(network, testData)
print(denormalisation(output, mean, stdDev))
print([x[-1] for x in inputs[:split]])
