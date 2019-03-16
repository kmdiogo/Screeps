import os 

def list_files(dir):                                                                                                  
    r = []                                                                                                            
    for root, dirs, files in os.walk(dir):
        for name in files:
            r.append(os.path.join(root, name))                                                                
    return r

def generate_mappings(files):
    map = {}
    for path in files:
        print(path)

files = list_files('src')
generate_mappings(files)