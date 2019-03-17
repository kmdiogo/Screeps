import os
import re
import json

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def generate_mappings(dir, separator, ignore_files):
    listFiles = []
    flatMap = {}

    for root, dirs, files in os.walk(dir):
        for name in files:
            if name not in ignore_files:
                absPath = os.path.join(os.path.abspath(root), name)
                flatMap[absPath] = os.path.join(root, name).replace("/", separator).replace("\\", separator)[len(dir)+1:]
    return flatMap

def delete_all_files_in_folder(dir, ignore_files):
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file not in ignore_files:
                os.remove(os.path.join(root, file))

def peek(lst):
    if len(lst) == 0:
        return None
    return lst[-1]

def extract_path(requireStr):
    path = ""
    stack = []
    for ch in requireStr:
        if peek(stack) in ["\"", "'"]:
            if ch in ["\"", "'"]:
                stack.pop()
            else:
                path += ch
        elif ch in ["\"", "'"]:
            stack.append(ch)
    return path

def find_error_line_number(filePath, code):
    lineNum = 1
    with open(filePath, 'r', encoding='utf8') as file:
        for line in file:
            if code in line:
                return lineNum
            lineNum += 1

def validateConfigTypes(config):
    for prop in ['screeps_folder', 'flatten_separator', 'output_directory']:
        if type(config[prop]) is not str:
            raise TypeError("Configuration property '{}' must be a String".format(prop))
    if type(config['ignore_files']) is not list:
        raise TypeError('ignore_files configuration property must be a list')
    for item in config['ignore_files']:
        if type(item) is not str:
            raise TypeError('items in ignore_files must be a string')

def flatten_screep_files():
    with open('.screeps.json', 'r') as jsonConfig:
        config = json.load(jsonConfig)

    validateConfigTypes(config)
    SRC_FOLDER = config['screeps_folder']
    SEPARATOR = config['flatten_separator']
    OUTPUT_DIR = config['output_directory']
    IGNORE_FILES = config['ignore_files']
    #OUTPUT_DIR = "E:\\Programming\\Screeps\\Output"

    # Generate map that links absolute paths to flattened file names
    flatMap = generate_mappings(SRC_FOLDER, SEPARATOR, IGNORE_FILES)
    # Get "root" absolute path. Used for root directory node requires
    absRootPath = os.path.join(os.getcwd(), SRC_FOLDER)

    # stores file names and code to be written
    codeMap = {}
    for scriptPath in flatMap:
        flattenedScriptPath = os.path.join(OUTPUT_DIR, flatMap[scriptPath])
        with open(scriptPath, 'r', encoding="utf8") as file:
            # Get full directory of the opened file
            fileDir = os.path.dirname(os.path.realpath(file.name))

            code = file.read()

            # Find all occurences of require('...')
            requirePattern = r"require\(['\"][\w\d\./\\]*['\"]\)"
            match = re.findall(requirePattern, code)

            for m in match:
                # Get directory specified by require() in the js source
                path = extract_path(m)
                os.chdir(fileDir)
                fileName = os.path.basename(path)
                if (path[0] == '/' or path[0].isalnum()):
                    # Strip initial slash if applicable
                    tempPath = path
                    if (path[0] == '/'):
                        tempPath = path[1:]

                    os.chdir(absRootPath)

                    # Change to respective directory if code navigates through folders
                    if (os.path.dirname(tempPath) != ''):
                        os.chdir(os.path.dirname(tempPath))
                else:
                    os.chdir(os.path.dirname(path))

                fullPath = os.path.join(os.getcwd(), fileName) + ".js"
                try:
                    # [:-3] is to exclude writing .js to modules
                    translatedCode = flatMap[fullPath][:-3]
                    code = code.replace(m, "require('{}')".format(translatedCode))
                except KeyError as exc:
                    scriptFileName = os.path.basename(scriptPath)
                    errorLineNumber = find_error_line_number(scriptPath, m)
                    print("{0}----------ScreepsFlatten Errors----------{1}".format(bcolors.HEADER, bcolors.ENDC))
                    print("{0}Error in {1}{2}".format(bcolors.FAIL, scriptPath, bcolors.ENDC))
                    print("{0}Module '{1}' not found in '{2}': Line {3}{4}".format(bcolors.FAIL, path, m, errorLineNumber, bcolors.ENDC))
                    print("{0}No files were affected{1}".format(bcolors.BOLD, bcolors.ENDC))

                    print("{0}----------Python Errors------------------{1}".format(bcolors.HEADER, bcolors.ENDC))
                    raise

            codeMap[flattenedScriptPath] = code


    # Write files using the code map for each file
    # Writing after code has been compiled allows for errors to not affect original files
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    delete_all_files_in_folder(OUTPUT_DIR, IGNORE_FILES)
    for flatFile in codeMap:
        with open(flatFile, 'w', encoding='utf8') as outFile:
            outFile.write(codeMap[flatFile])
    

if __name__ == "__main__":
    flatten_screep_files()