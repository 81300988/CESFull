'use strict'

const neo4j = require('neo4j-driver').v1;

const {
  NEO_URI,
  NEO_USER,
  NEO_PASS,
} = process.env;

// export as commonjs module
module.exports = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'));