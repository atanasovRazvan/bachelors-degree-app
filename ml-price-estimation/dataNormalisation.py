def detMeanStd(feature):
    meanValue = sum(feature) / len(feature)
    stdDevValue = (1 / len(feature) * sum([ (feat - meanValue) ** 2 for feat in feature])) ** 0.5
    return meanValue, stdDevValue

def normalisation(trainInputs):

    noFeatures = len(trainInputs[0])
    mean = []
    stdDev = []

    for i in range(noFeatures):
       m, s = detMeanStd([f[i] for f in trainInputs])
       mean.append(m)
       stdDev.append(s)

    return mean, stdDev

def dataNormalisation(trainInputs, testInputs, mean, stdDev):

    noFeatures = len(trainInputs[0])
    normalisedTrainInputs = []
    for i in range(len(trainInputs)):
        normalisedTrainInputs.append([(trainInputs[i][j] - mean[j]) / stdDev[j] for j in range(noFeatures)])

    normalisedTestInputs = []
    for i in range(len(testInputs)):
        normalisedTestInputs.append([(testInputs[i][j] - mean[j]) / stdDev[j] for j in range(noFeatures)])

    return normalisedTrainInputs, normalisedTestInputs

def denormalisation(data, mean, stdDev):
    m = mean[-1]
    sd = stdDev[-1]
    return [x*sd+m for x in data]
