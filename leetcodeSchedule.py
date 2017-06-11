
# coding: utf-8

# In[ ]:

import json,sys


# In[ ]:

def loadJsonList(jList):
    '''
    load and parse all problem files and return a list of tagged problems
    '''
    tags = []
    with open(jList) as jsonList:
        for fileName in jsonList:
            fileName = fileName.rstrip()
            data = parseJson(fileName)
            tags.append((fileName[:-5],data))
    tags.sort(reverse=True,key=lambda x:len(x[1]))
    return tags


# In[ ]:

def parseJson(fileName):
    '''
    parse json file
    '''
    with open(fileName) as data_file:    
        entries = json.load(data_file)
    return entries


# In[ ]:

def getProblemSet(probList):
    '''
    get a set of all problem from a list of tagged problems
    '''
    problems = set([])
    for tag in probList:
        problems.update([(i['#']+'\t'+i[u'Title\xa0']+'\t'+i[u'Difficulty']).encode('ascii','ignore') for i in tag[1]])
    return problems


# In[ ]:

def problemGenerator(taggedList):
    for l in taggedList:
        tag = l[0]
        for prob in l[1]:
            yield (l[0],(prob['#']+'\t'+prob[u'Title\xa0']+'\t'+prob[u'Difficulty']).encode('ascii','ignore'),prob)


# In[ ]:

def addToUndo(undo,prob):
    if len(undo)==0 or prob[0]!=undo[-1][0]:undo.append((prob[0],[prob[2]]))
    else:undo[-1][1].append(prob[2])        


# In[ ]:

class dailyRecord():
    '''
    this is a class that wrape around daily problems as well as other metadata
    '''
    def __init__(self, probPerDay, hardPerDay):
        self.probPerDay = probPerDay
        self.hardPerDay = hardPerDay
        self.curHard = 0
        self.day = 0
        self.cats = set([])
        self.dailyProbs = []
    
    def enoughProbs(self):
        return len(self.dailyProbs)>=self.probPerDay
    
    def enoughHard(self):
        return self.curHard>=self.hardPerDay
    
    def addProb(self, p):
        self.cats.add(p[0])
        self.dailyProbs.append(p)
    
    def nextDay(self):
        self.day += 1
        self.curHard = 0
        self.cats = set([])
        self.dailyProbs = []
    
    def __str__(self):
        return 'day{}: {}\n'.format(str(self.day),', '.join(self.cats)) + '\n'.join([i[1] for i in self.dailyProbs])


# In[ ]:

def schedule(taggedList, beginDay, outFile):
    probSet = getProblemSet(taggedList)
    probs = problemGenerator(taggedList)
    undo = []
    lastTag = ''
    
    try:
        while True:
            p = probs.next()

            while p[0]==lastTag:
                if p[1] in probSet:
                    addToUndo(undo,p)
                    probSet.remove(p[1])
                p = probs.next()

            while not beginDay.enoughProbs():
                if p[1] not in probSet: pass 
                elif p[2][u'Difficulty']==u'Hard' and beginDay.enoughHard():
                    addToUndo(undo,p)
                    probSet.remove(p[1])
                else:
                    if p[2][u'Difficulty']==u'Hard' and not beginDay.enoughHard(): beginDay.curHard+=1
                    beginDay.addProb(p)
                    lastTag = p[0]
                    probSet.remove(p[1])

                if not beginDay.enoughProbs(): p = probs.next()
            print >>outFile, beginDay
            beginDay.nextDay()
    except StopIteration:
        if beginDay.enoughProbs() or beginDay.enoughHard():
            print >>outFile, beginDay
            beginDay.nextDay()
    finally:
        return (undo,beginDay)


# In[ ]:

if __name__ == "__main__":
    if len(sys.argv)!=3:
        sys.exit('Usage: python leetcodeSchedule.py numberOfProblemPerDay numberOfHardProblemPerDay\nThe schedule will be saved in schedule.txt')
    perDay = int(sys.argv[1])
    hardPerday = int(sys.argv[2])
    lastDay = -1

    with open('schedule.txt','a') as out:
        total = loadJsonList('tagList.txt')
        day0 = dailyRecord(perDay,hardPerday)

        while lastDay != day0.day:
            lastDay = day0.day
            total,day0 = schedule(total,day0,out)

        if day0.dailyProbs: print >>out, day0


# In[ ]:

# file 'two_pointers.json' is in a strange format, this part is to revise it to normal
# import re
# with open('./two_pointers.json') as data, open('temp','w') as out:
#     for i in data:
#         i = i.rstrip()
#         if i.startswith('{'):
#             col = re.split(',|:',i.strip('{}'))
#             i = '{'+'{}:{},{}:{},{}:{},{}:{}'.format(col[0],col[3],col[2],col[5],col[4],col[7],col[6],col[9])+'}'
#         print >>out, i


# In[ ]:



