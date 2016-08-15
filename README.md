# Kipa - A Document Management System

[![Build Status](https://travis-ci.org/andela-ooduntan/dockip.svg?branch=master)](https://travis-ci.org/andela-ooduntan/dockip)   [![Code Climate](https://codeclimate.com/github/andela-ooduntan/dockip/badges/gpa.svg)](https://codeclimate.com/github/andela-ooduntan/dockip)  [![codecov](https://codecov.io/gh/andela-ooduntan/kipa/branch/master/graph/badge.svg)](https://codecov.io/gh/andela-ooduntan/kipa) [![HitCount](https://hitt.herokuapp.com/andela-ooduntan/.svg)](https://github.com/andela-ooduntan/dms-api)

# Description
Kipa is a document management application built on the MERN stack. It is used to manage sharing of files in a group, consisting of various
roles, and therefore access privileges.

## Tools
A number of tools were used in the development of this application including continuous integration and deployment services

### Pivotal Tracker
Pivotal Tracker was used as a tool for managing the development process, by creating stories that ties to the features on the application. It provides a means of estimating and assessing the velocity of development. Kipa pivotal tracker board link is provided below.

[Kipa - Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/1653871)

## Installation
Open a Terminal and clone the repo
```bash
$ git clone https://github.com/andela-ooduntan/kipa.git
```

### Requirements
 [**node.js**](http://node.org) [**mongodb**](http://mongodb.org)

#### Dependencies
Install the application dependencies by running the _npm install_ in the applications root directory

#### Launch
```
Start mongodb service _$mongodb_
npm start
```

## Usage
The usage of the application is as follows:

###  Users and Group
1.  Users are required to signup to use the application
2.  Users can create document will a specified role.
3.  Users can only see documents that are shared with there role.
4.  Users can share a document with any role.
5.  Users can access all documents he or she created regardless of the role they share the document with.


##  Contributing
I'd love if you contribute to the source code and make the application even better than it is
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to the [GitHub Repository](https://github.com/andela-ooduntan/kipa/issues). Even better you can submit a Pull Request with a fix.
