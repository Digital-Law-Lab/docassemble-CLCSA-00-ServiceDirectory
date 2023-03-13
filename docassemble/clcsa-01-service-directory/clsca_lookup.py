import pandas

from docassemble.base.util import path_and_mimetype
from docassemble.base.functions import user_info

__all__ = ['get_suburb_list']

suburb_list = []

def read_data(filename):
  the_file, mimetype = path_and_mimetype(filename)
  df = pandas.read_excel(the_file)
  for indexno in df.index:
    suburb_list.append(df['suburb_name'])
  
def get_suburb_list():
  return suburb_list

read_data('data/sources/suburb_service_db.xlsx')