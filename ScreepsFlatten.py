import os
import re

SRC_FOLDER = "src"
SEPARATOR = "."

def list_files(dir):                                                                                                  
    r = []                                                                                                            
    for root, dirs, files in os.walk(dir):
        for name in files:
            r.append(os.path.join(root, name)[len(dir)+1:])                                                                
    return r

def generate_mappings(files):
    flatMap = {}
    for path in files:
        flatMap[path] = path.replace("/", SEPARATOR).replace("\\", SEPARATOR)
    return flatMap

def peek(lst):
    if len(lst) == 0:
        return None
    return lst[-1]

def extractPath(requireStr):
    path = ""
    stack = []
    for ch in requireStr:
        if peek(stack) == "\"" or peek(stack) == "'":
            if ch == "\"" or ch == "'":
                stack.pop()
            else:
                path += ch
        elif ch == "\"" or ch == "'":
            stack.append(ch)
    return path

files = list_files(SRC_FOLDER)
flatMap = generate_mappings(files)
#print(flatMap)

usedPaths = []
with open('test.js', 'r') as file:
    code = file.read()
    requirePattern = r"require\(['\"][\w\d\./\\]*['\"]\)"
    match = re.findall(requirePattern, code)
    for m in match:
        usedPaths.append(extractPath(m))

print(usedPaths)