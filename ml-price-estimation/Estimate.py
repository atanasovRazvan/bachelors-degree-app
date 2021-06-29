import csv
import sys
import os
import importlib
from copy import deepcopy

os.chdir("C:/Users/Razvan/Desktop/LICENTA/App/ml-price-estimation")
importlib.reload(sys)

from Neuron import Neuron, evaluatingMLP
from dataNormalisation import denormalisation
from reader import readNeighbourhoods


def readNetwork():
    networkFile = open('./network.txt', 'r')
    mean = networkFile.readline()[:-1]
    mean = [float(x) for x in mean.strip('][').split(', ')]
    stdDev = networkFile.readline()[:-1]
    stdDev = [float(x) for x in stdDev.strip('][').split(', ')]
    layers = []
    layer = networkFile.readline()[:-1]
    while True:
        weights, output_delta = layer[9:].split('],')
        output, delta = output_delta.split(', ')
        weights = weights + "]"
        weights = [float(x) for x in weights.strip('][').split(', ')]
        output = float(output[9:])
        delta = float(delta[7:])
        neuron = Neuron(weights, output, delta)
        layer = networkFile.readline()[:-1]
        if not layer:
            break
        layers.append(neuron)
    networkFile.close()
    network = [layers, [neuron]]
    return mean, stdDev, network

mean, stdDev, network = readNetwork()
input = sys.argv[1:]
neighbourhood = deepcopy(input[0])
input[0] = readNeighbourhoods()[input[0]]
input[1:] = [float(x) for x in input[1:]]

output = evaluatingMLP(network, [input])
output = denormalisation(output, mean, stdDev)
initialPrice = input[-1]
outputValue = int(output[0])
if initialPrice < outputValue + 0.1 * outputValue and initialPrice > outputValue - 0.1 * outputValue:
    newData = []
    newRow = [neighbourhood] + [str(input[1])] + [str(input[2])] + [str(input[3])]
    file = open('data/apartments.csv')
    csv_reader = csv.reader(file)
    next(csv_reader)
    for row in csv_reader:
        newData.append(row)
    newData.append(newRow)
    file.close()
    file = open('data/apartments.csv', 'w')
    writer = csv.writer(file)
    writer.writerows(newData)
print(output)
