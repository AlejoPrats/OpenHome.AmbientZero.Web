# Ambient Zero API

API was designed with .Net 8, using Entity Framework and SQL Lite, it is specifically tailored to run with the [DietPi](https://dietpi.com/#download "DietPi") distro, since the endpoints to check the status of the RaspberryPi use commands that might be different or might not be installed by default in other ARM-based distros

This API works as the bridge between the AmbientZero Sensors and the user interface which is a webpage made in Blazor.

:warning: Since it's an internal API not exposed to the open world, it has the CORS set as Allow all, if you plan to expose the API I would recommend that you set the CORS accordingly to avoid free access to the API

## Build Locally

There is no secret, the API can be fully functional in a Windows/Mac/Linux computer, but keep in mind that the /System controller will only work if you have the `ip`, `journalctl`, `iwgetid`, `top` and `free` commands working in your system, as it is said in the description, DietPi distro has all those commands ready to use out of the box

## Build For Deploy

To deploy manually into an RPI you should check the target runtime to `linux-arm64`, I didn't try to run it with a different Target Runtime, and ideally to save space you should install the .Net framework in the RPI and not use the Self-Contained option

## Installation And Setup Instructions

A step-by-step guide is coming
