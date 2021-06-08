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
trainData, testData = normalisation(inputs[split:], inputs[:split])


network = netInitialisation(3, 1, 3)
trainingMLP(network, trainData, 0.001, 1000)
output = evaluatingMLP(network, testData)
print(output)
print([x[-1] for x in testData])
