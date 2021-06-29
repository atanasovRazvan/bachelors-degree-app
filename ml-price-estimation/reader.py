def readData():
    file = open('data/apartments.csv', 'r')
    data = []
    line = file.readline()[0:-1]
    while line:
        data.append(line.split(','))
        file.readline()
        line = file.readline()[0:-1]
    return data

def readNeighbourhoods():
    file = open('data/neighbourhoods.csv', 'r')
    neighbourhoods = {}
    line = file.readline()[:-1]
    while line:
        name, codif = line.split(',')
        neighbourhoods[name] = int(codif)
        line = file.readline()[:-1]
    return neighbourhoods
