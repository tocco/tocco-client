#!/bin/bash

function setupGithub() {
  # add ssh key of user
  eval $(ssh-agent -s)
  ssh-add <(echo "$GITHUB_DEPLOY_PRIVATE_KEY" | base64 -d)

  # add github as known host
  mkdir -p ~/.ssh
  echo "github.com ssh-rsa ${GITHUB_PUBLIC_KEY}" >>~/.ssh/known_hosts
}

function setupGitlab() {
  # add ssh key of user
  eval $(ssh-agent -s)
  ssh-add <(echo "$GITLAB_DEPLOY_PRIVATE_KEY" | base64 -d)

  # add github as known host
  mkdir -p ~/.ssh
  echo "gitlab.com ssh-rsa ${GITLAB_PUBLIC_KEY}" >>~/.ssh/known_hosts
}

function setupGithubUser() {
  git config user.email "tocco.github.bot@gmail.com"
  git config user.name "ToccoBot"
}

function setupGitlabUser() {
  git config user.email "admin@tocco.ch"
  git config user.name "Tocco Admin"
}
