# Onesite example application

A python-flask, backbone, browserify, gulp testapplication with an restful api

## Requirements

* Python, pip and virtualenv
* Node and npm

## Install

```sh
# install requirements if you haven't already :)
sudo apt-get install node npm python-pip python-virtualenv
sudo apt-get install nodejs-legacy
# install packages
virtualenv env && env/bin/pip install -r requirements.txt
npm install
# start application
npm start # this starts a python wsgi server and the grunt watch task

```

then browse to http://localhost:1337

## Heroku


This application uses node and python. With the default heroku buildpack, heroku
will not build python and nodejs dependencies, so you have to define alternative
buildpacks.

The buildpacks are defined in `.buildpacks`, you only have to set the default
buildpack to `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi.git`

### Deploy

```sh
# install client
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
# register at heroku.com
heroku login  
heroku create
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi.git
git push heroku master
heroku open
```
