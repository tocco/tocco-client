#!/bin/bash

function setupGithub() {
  # add ssh key of user
  eval $(ssh-agent -s)
  ssh-add <(echo "$GITHUB_DEPLOY_PRIVATE_KEY" | base64 -d)

  # add github as known host
  mkdir -p ~/.ssh
  echo "github.com ssh-rsa ${GITHUB_PUBLIC_KEY}" >>~/.ssh/known_hosts

  git config user.email "tocco.github.bot@gmail.com"
  git config user.name "ToccoBot"
}
