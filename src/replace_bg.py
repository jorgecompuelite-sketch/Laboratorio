import os
import re

dir_path = r"c:\Users\Jorge Montenegro\Documents\Proyectos\LaboratorioDentalLuisMilanes\src"

bg_regexes = [
    r'\bbg-\[\#020B1D\](?!\/)',
    r'\bbg-\[\#F8F9FA\](?!\/)',
    r'\bbg-white(?!\/)',
]

text_regexes = [
    r'\btext-\[\#020D21\]',
    r'\btext-\[\#4B5563\]',
    r'\btext-gray-\d{3}',
    r'\btext-black',
]

border_regexes = [
    r'\bborder-\[\#E5E7EB\]',
]

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith(".jsx"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            original_content = content
            
            for reg in bg_regexes:
                content = re.sub(reg, 'bg-transparent', content)
                
            for reg in text_regexes:
                content = re.sub(reg, 'text-white', content)

            for reg in border_regexes:
                content = re.sub(reg, 'border-white/20', content)
                
            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated {file_path}")
print("Done")
