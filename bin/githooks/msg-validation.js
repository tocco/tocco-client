#!/usr/bin/env node

/**
 * GIT COMMIT-MSG hook for validating commit message to fit schema.
 */

'use strict'

const fs = require('fs')

const allowedMaxLength = 70
const allowedPattern = /^(\w+)(\(.+\))?: (.+)$/
const allowedTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'test',
  'chore'
]

const error = message => {
  // eslint-disable-next-line no-console
  console.error(`INVALID COMMIT MSG: ${message}`)
}

const isFirstLineValid = line => {
  if (line.length > allowedMaxLength) {
    error(`is longer than ${allowedMaxLength} characters!`)
    return false
  }

  if (line.startsWith('Merge branch')) {
    return true
  }

  const match = allowedPattern.exec(line)

  if (!match) {
    error(`does not match pattern "<type>(<scope>): <subject>" ! was: ${line}`)
    return false
  }

  const type = match[1]
  // const scope = match[3]
  // const subject = match[4]

  if (!allowedTypes.includes(type)) {
    error(`"${type}" is not allowed type !`)
    return false
  }

  return true
}

const isSecondLineValid = line => {
  if (line !== '') {
    error('Second line has to be an empty line!')
    return false
  }
  return true
}

const getLineFromBuffer = function(buffer, lineNumber) {
  return buffer.toString().split('\n')[lineNumber]
}

const commitMsgFile = process.argv[2] || getGitFolder() + '/COMMIT_EDITMSG'

fs.readFile(
  commitMsgFile, function(err, buffer) {
    const firstLine = getLineFromBuffer(buffer, 0)
    const secondLine = getLineFromBuffer(buffer, 1)

    if (err) {
      error(`Error reading file: ${err}`)
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
    error(`Cannot find file ${gitDirLocation}`)
  }

  if (!fs.lstatSync(gitDirLocation).isDirectory()) {
    const unparsedText = '' + fs.readFileSync(gitDirLocation)
    gitDirLocation = unparsedText.substring('gitdir: '.length).trim()
  }

  if (!fs.existsSync(gitDirLocation)) {
    error(`Cannot find file ${gitDirLocation}`)
  }

  return gitDirLocation
}
