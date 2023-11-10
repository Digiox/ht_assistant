import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    with open(csv_file_path, mode='r', encoding='cp1252') as file:
        csv_reader = csv.DictReader(file, delimiter=';')
        data = list(csv_reader)
    
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(data, indent=4, ensure_ascii=False))

# Emplacement du fichier CSV à lire
csv_file_path = 'products_export.csv'

# Emplacement du fichier JSON à écrire
json_file_path = 'output/products_export.json'

# Conversion du fichier CSV en fichier JSON
csv_to_json(csv_file_path, json_file_path)
