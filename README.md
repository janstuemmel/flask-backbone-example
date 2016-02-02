# Onesite example application

A python-flask, backbone, browserify, gulp testapplication with an restful api

## Requirements

* Python, pip and virtualenv
* Node and npm

## Install

```sh
# install bin dependencies
sudo apt-get install node npm python-pip python-virtualenv # if haven't already :)
sudo apt-get install nodejs-legacy
# install packages
virtualenv env && env/bin/pip install -r requirements.txt
npm install
# start application
npm start # this starts a python wsgi server and the grunt watch task
```

## Deploy on Heroku

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
