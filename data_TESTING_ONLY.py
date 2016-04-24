
import json
import os
import time
import urllib
import random
import numpy as np
from copy import deepcopy
from flask import Flask, Response, request


def limit_to_search_text(pin_list, search_txt):
    return [pin for pin in pin_list if search_txt in pin['description'].lower()]
2

def pins_handler(search_text, action, startnum):

    # import ipdb; ipdb.setTrace();
     # TEMP variables - fold into API call eventually
    test = 0
    print test
    api_start_num = int(test)
    api_search_text = search_text
    # print api_search_text
    clearAll = 'clear'
    # print clearAll



    # Create pins_dynamic_temp, which will be 
    # modified, appended to, and written back to pin_db.json
    try:
        with open('pin_db.json', 'r') as db_file_readable:
            try:
                pins_dynamic_temp = json.loads(db_file_readable.read())
                print "file found with valid json, reading it in"
            except ValueError:
                pins_dynamic_temp = []
                print "file found but not valid json, initializing new file with []"
    except IOError:
        pins_dynamic_temp = []
        print "no file found, initializing new file with []"

    # source_pins_static is our source data.  
    with open('source_pins_static.json', 'r') as source_file:
        source_pins = json.loads(source_file.read())

    # If there's a search term, limit scope of pins to only those that match
    if len(api_search_text)>0:
        source_pins = limit_to_search_text(source_pins, api_search_text)


    if clearAll == 'clear':
        pins_dynamic_temp = []        

    # Roll source pins around axis
    source_pins = np.roll(source_pins, (api_start_num * -1))

    # Get 25 pins, either running through source_pins once if >=25 items
    # or running through multiple times if <25 items
    pin_count = 0
    while pin_count < 25:
        temp_pins = deepcopy(source_pins)
        if len(temp_pins) < 25 - pin_count:
            for_loop_count = len(temp_pins)
        else:
            for_loop_count = 25 - pin_count
        for i in xrange(for_loop_count):
            pins_dynamic_temp.append(temp_pins[i])
            pin_count+=1
            for_loop_count = 0


    ######### Here's where the bug is.  In this loop, I'm trying to get index into 'layout_id' field
    # Create some new elements for the app to use
    for index in range(len(pins_dynamic_temp)):
        pin = pins_dynamic_temp[index]
        pin['layout_id'] = index
        pin['img_url'] = pin['images']['736x']['url']
        pin['temp_id'] = index


    with open('pin_db.json', 'w+') as db_file_writable:
        db_file_writable.write(json.dumps(pins_dynamic_temp, indent=4, separators=(',', ': ')))

    api_response = {'meta': api_start_num, 'data':pins_dynamic_temp}
    print api_response

pins_handler('kitten', 'clear', 0)