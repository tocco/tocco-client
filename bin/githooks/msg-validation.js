#!/usr/bin/env node

/**
 * GIT COMMIT-MSG hook for validating commit message to fit schema.
 */

'use strict'

let fs = require('fs')
let util = require('util')

const allowedMaxLength = 70
const allowedPattern = /^(\w*)(\(.*\))?: (.+)$/
const allowedTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'test',
  'chore'
]

const error = function() {
  console.error('INVALID COMMIT MSG: ' + util.format.apply(null, arguments))
}

const isFirstLineValid = line => {
  let isValid = true

  if (line.length > allowedMaxLength) {
    error('is longer than %d characters !', allowedMaxLength)
    isValid = false
  }

  const match = allowedPattern.exec(line)

  if (!match) {
    error('does not match "<type>(<scope>): <subject>" ! was: ' + line)
    return false
  }

  const type = match[1]
  // const scope = match[3]
  // const subject = match[4]

  if (allowedTypes.indexOf(type) < 0) {
    error('"%s" is not allowed type !', type)
    return false
  }

  return isValid
}

const isSecondLineValid = line => {
  if (line !== '') {
    error('Second line has to be an empty line!')
    return false
  }
  return true
}

let getLineFromBuffer = function(buffer, lineNumber) {
  return buffer.toString().split('\n')[lineNumber]
}

let commitMsgFile = process.argv[2] || getGitFolder() + '/COMMIT_EDITMSG'

fs.readFile(
  commitMsgFile, function(err, buffer) {
    const firstLine = getLineFromBuffer(buffer, 0)
    const secondLine = getLineFromBuffer(buffer, 1)

    if (err) {
      error('"Error reading file: ', err)
    }

    if (isFirstLineValid(firstLine) && isSecondLineValid(secondLine)) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  }
)

function getGitFolder() {
  let gitDirLocation = './.git'
  if (!fs.existsSync(gitDirLocation)) {
    throw new Error('Cannot find file ' + gitDirLocation)
  }

  if (!fs.lstatSync(gitDirLocation).isDirectory()) {
    let unparsedText = '' + fs.readFileSync(gitDirLocation)
    gitDirLocation = unparsedText.substring('gitdir: '.length).trim()
  }

  if (!fs.existsSync(gitDirLocation)) {
    throw new Error('Cannot find file ' + gitDirLocation)
  }

  return gitDirLocation
}
