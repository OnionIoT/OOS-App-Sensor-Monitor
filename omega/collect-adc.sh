#!/bin/sh

## script to continuously collect sensor data and publish to mqtt

# arg1 - ADC Exp switch value
switchVal="0"
if [ "$1" == "" ]; then
        echo "USAGE: $0 <switch value> <collection interval>"
        echo "ERROR: Expecting ADC Exp switch value"
        exit
fi
switchVal="$1"

# arg2 - collection interval
shift
interval="15"
if [ "$1" == "" ]; then
        echo "USAGE: $0 <switch value> <collection interval>"
        echo "ERROR: Expecting interval between data collection"
        exit
fi
interval="$1"


# begin collection 
echo "> starting sensor value collection"
while [ 1 ]
do
        val=$(adc-exp -j -s $switchVal all)
        date=$(date +%s)
        val=$(echo $val | sed -e 's/^{/{"time":'"$date"',/')
        #echo "$val"
        mosquitto_pub -t 'console/sensor' -m "$val"
        
        # wait for interval
        sleep $interval
done


