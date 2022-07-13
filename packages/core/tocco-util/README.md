# Tocco-Util

This package contains helpers, utils and other useful stuff that might be used in multiple packages.
These utils do not reference any other tocco package nor do they interact with redux (except reducer/saga helpers).

## api

Helper function around tocco rest api.

## appContext

`appContext` is a global input parateter for apps and widgets which contains
meta information about the embedded context.

## bundle

Helper functions and hooks for loading bundled components aynchronoulsy.
This is mainly used for customer actions that will be loaded during runtime.

## cache

Helper to store information in application and session store or in global objects.

## color

Methods for color conversion and calculations.

## consoleLogger

Abstraction of the console.log and .error with eslint ignore and undefined checks.

## date

Helper functions for date handling.

## download

Browser download helpers.

## dragAndDrop

Hook for handling drag and drop logic.

## env

`env` holds global available settings which should be filled on app initialisation.
Not to be confused by process environment variables. `env` are tocco runtime related variables (such as business unit).

Helper functions for getting / setting env variables.

## html

Helper for html text sanitisation.

## intl

Retrieves text resources through tocco REST service regarding the principals locale.

## js

Plain js helper function.

## mockData

Contains a factory to create mock data and helps to mock basic REST calls for those entities.

## navigationStrategy

Containing propTypes for navigationStrategy object

## nice

Some utils to interact with the nice2 client

## originId

Generates a unique random number to represent a client instance.

## queryString

QueryString helper.

## react

Contains react extensions such as custom hooks.

## reducers

Helpers for reducers.

## remoteLogger

Helper to log errors on remote backend.

## request

Helper to execute http nice2 requests.

## resize

Hook for handling resize logic.

## route

react-router helpers and loading routes aynchronously.

## saga

Helpers for sagas.

## tql

Helper for query handling.

## tqlBuilder

Helper to build tocco query language string out of query.

## userAgent

Helper for user agent distinction.

## validation

Helper for form error validation

## viewPersistor

Save information in an abject to persist view information such as a redux store
