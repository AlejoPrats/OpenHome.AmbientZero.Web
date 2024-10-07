# AmbientZero.Web WIP
The web interface for the AmbientZero Project was made with Blazor, [ApexCharts](https://apexcharts.github.io/Blazor-ApexCharts/ "ApexCharts"), and [Bootstrap](https://demos.blazorbootstrap.com/ "Bootstrap"), right now everything is a mess since I do not have a lot of experience working with Blazor therefore is a WIP, I still have to do some research on the good practices how to sort the files, etc. The important thing here is that it works and can be used, but the design of the UI can be better

## Build Locally

There is no secret, the Web is fully functional in a Windows/mac/Linux PC, but keep in mind that the API must be configured and be running and reachable somewhere, you should change the appsettings.json files to point to your API

:warning: There is no mock data in the projects you will have to create them manually to have information to display in the graph and the sensor information pages

## Build For Deploy

To deploy manually into an RPI you should check the target runtime to `linux-arm64`, I didn't try to run it with a different Target Runtime, and ideally to save space you should install the .Net framework in the RPI and not use the Self-Contained option

## Installation And Setup Instructions

A step-by-step guide is coming

