
import json
import os
import time
import urllib
import random
import numpy as np
from copy import deepcopy
from flask import Flask, Response, request

pin_return_num = 25

def limit_to_search_text(pin_list, search_txt):
    print "---limit to search text---"
    return_list = []
    split_words = search_txt.split()
    for pin in pin_list:
        for word in split_words:
            if word.lower() in pin['description'].lower():
                occurances += 1
        if occurances == len(split_words):
            return_list.append(pin)

    return return_list

# TODO - Hook this up so that you can pass in pin_list and value_name and get back only pins that match range
def limit_to_value(pin_list, value_name, min_value, max_value):
    return_list = []
    for pin in pin_list:
        if min_value <= pin[value_name] <= max_value:
            print "we have a match!"

def create_temp_array(file_name):
    print "---create_temp_array---"
    try:
        with open(file_name, 'r') as db_file_readable:
            try:
                return json.loads(db_file_readable.read())
                print "file found with valid json, reading it in"
            except ValueError:
                return []
                print "file found but not valid json, initializing new file with []"
    except IOError:
        return []
        print "no file found, initializing new file with []"

def args_handler(search_txt):
    print "---args_handler---"
    start_index = int(request.args.get('next_index').replace('undefined', '0'))
    return search_txt, request.args.get('action'), start_index

def modify_source(source_pins, search_txt, start_index):
    print "---modify_source---"
    # If there's a search term, limit scope of pins to only those that match
    if len(search_txt)>0:
        source_pins = limit_to_search_text(source_pins, search_txt)

    # Roll source pins around axis
    print "roll source pins by" + str(start_index * -1)
    source_pins = np.roll(source_pins, (start_index * -1))
    return source_pins
    
def clear_pins():
    print "---clear_pins---"
    return [], 0    

def get_next_index(start_index, pin_return_num, source_pins):
    print "---get_next_index---"
    if len(source_pins) > 0:
        print "source pins has " + str(len(source_pins))
        return start_index + (pin_return_num%len(source_pins))
    else:
        return 0

def get_new_pins(pins_to_return, source_pins, pin_return_num):
    print "get_new_pins"
    print "pins_to_return starts with " + str(len(pins_to_return)) + ' items'
    # Get 25 pins, either running through source_pins once if >=2   5 items
    # or running through multiple times if <25 items
    # import ipdb; ipdb.set_trace()
    pin_count = 0
    if len(source_pins) < 1:
        return []

    while pin_count < pin_return_num:
        temp_pins = deepcopy(source_pins)
        pins_left = pin_return_num - pin_count
        # If temp pins doesn't have as many items as we need, set loop count at length of temp
        if len(temp_pins) < pins_left:
            for_loop_count = len(temp_pins)
        else:
        # If temp pins has equal or more pins, set loop count at number of pins left that we need
            for_loop_count = pins_left

        for i in xrange(for_loop_count):
            pins_to_return.append(temp_pins[i])
            pin_count+=1

    print "pins_to_return now has " + str(len(pins_to_return)) + "elements"
    return pins_to_return

def append_new_attributes(pins_to_return):
    print "---append_new_attributes---"
    for index in range(len(pins_to_return)):
        pin = pins_to_return[index]
        pin['layout_id'] = index
        pin['img_url'] = pin['images']['736x']['url']
    return pins_to_return

def write_to_db(file, pins_to_return):
    print "---write_to_db---"
    with open(file, 'w+') as db_file_writable:
        db_file_writable.write(json.dumps(pins_to_return, indent=4, separators=(',', ': ')))

def construct_api_response(next_index, pins_to_return):
    print "---construct_api_response---"
    return {'meta': next_index, 'data':pins_to_return}


app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
app.config['DEBUG'] = True

@app.route('/api/pins/', defaults={'search_text': ""}, methods=['GET'])
@app.route('/api/pins/<search_text>', methods=['GET'])

def pins_handler(search_text):

    # import ipdb; ipdb.setTrace();
    api_search_text, clearAll, start_index = args_handler(search_text)
    pins_to_return = create_temp_array('pin_db.json')
    source_pins = create_temp_array('source_pins_static.json')
    source_pins = modify_source(source_pins, api_search_text, start_index)
    if clearAll == 'clear':
        pins_to_return, start_index = clear_pins()
    
    next_index = get_next_index(start_index, pin_return_num,source_pins)
    pins_to_return = get_new_pins(pins_to_return, source_pins, pin_return_num)
    pins_to_return = append_new_attributes(pins_to_return)
    write_to_db('pin_db.json', pins_to_return)
    api_response = construct_api_response(next_index, pins_to_return)
   
    return Response(json.dumps(api_response), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT",3000)))
