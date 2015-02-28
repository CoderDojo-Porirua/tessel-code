# Climate monitor

- Plug climate sensor into Port A
- Plug SD card into Port B

````
mkdir climate-monitor
cd climate-monitor
sudo npm install climate-si7020
sudo npm install sdcard

tessel run climate-logger.js
````

