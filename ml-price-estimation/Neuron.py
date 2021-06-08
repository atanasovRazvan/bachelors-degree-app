from random import random

class Neuron:
    def __init__(self, w=[], out=None, delta=0.0):
        self.weights = w
        self.output = out
        self.delta = delta

    def __str__(self):
        return "weights: " + str(self.weights) + ", output: " + str(self.output) + ", delta: " + str(self.delta)

    def __repr__(self):
        return "weights: " + str(self.weights) + ", output: " + str(self.output) + ", delta: " + str(self.delta)


# initialisation of the weights for each neuron of all the layers (input layer & hidden layers)
def netInitialisation(noInputs, noOutputs, noHiddenNeurons):
    net = []
    hiddenLayer = [Neuron([random() for i in range(noInputs + 1)]) for h in range(noHiddenNeurons)]
    net.append(hiddenLayer)

    outputLayer = [Neuron([random() for i in range(noHiddenNeurons + 1)]) for o in range(noOutputs)]
    net.append(outputLayer)
    return net


def activate(input, weights):
    result = 0.0
    for i in range(0, len(input)):
        result += input[i] * weights[i]
    result += weights[len(input)]
    return result


# neuron transfer
def transfer(value):
    return value


# neuron computation/activation
def forwardPropagation(net, inputs):
    for layer in net:
        newInputs = []
        for neuron in layer:
            activation = activate(inputs, neuron.weights)
            neuron.output = transfer(activation)
            newInputs.append(neuron.output)
        inputs = newInputs
    return inputs


# inverse transfer of a neuron
def transferInverse(val):
    return val


# error propagation
def backwardPropagation(net, expected):
    for i in range(len(net) - 1, 0, -1):
        crtLayer = net[i]
        errors = []
        if i == len(net) - 1:  # last layer
            for j in range(0, len(crtLayer)):
                crtNeuron = crtLayer[j]
                errors.append(expected[j] - crtNeuron.output)
        else:  # hidden layers
            for j in range(0, len(crtLayer)):
                crtError = 0.0
                nextLayer = net[i + 1]
                for neuron in nextLayer:
                    crtError += neuron.weights[j] * neuron.delta
                errors.append(crtError)
        for j in range(0, len(crtLayer)):
            crtLayer[j].delta = errors[j] * transferInverse(crtLayer[j].output)

def updateWeights(net, example, learningRate):
    for i in range(0, len(net)):  # for each layer
        inputs = example[:-1]
        if i > 0:  # hidden layers or output layer
            inputs = [neuron.output for neuron in net[i - 1]]  # computed values of precedent layer
        for neuron in net[i]:  # update weight of all neurons of the current layer
            for j in range(len(inputs)):
                neuron.weights[j] += learningRate * neuron.delta * inputs[j]
            neuron.weights[-1] += learningRate * neuron.delta


def trainingMLP(net, data, learningRate, noEpochs):
    for epoch in range(0, noEpochs):
        sumError = 0.0
        for example in data:
            inputs = example[:- 1]
            computedOutputs = forwardPropagation(net, inputs)
            expected = [example[-1]]
            crtErr = sum([(expected[i] - computedOutputs[i]) ** 2 for i in range(0, len(expected))])
            sumError += crtErr
            backwardPropagation(net, expected)
            updateWeights(net, example, learningRate)


def evaluatingMLP(net, data):
    computedOutputs = []
    for inputs in data:
        computedOutput = forwardPropagation(net, inputs[:-1])
        computedOutputs.append(computedOutput[0])

    return computedOutputs