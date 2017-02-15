require 'sinatra'
require './functions.rb'
require 'pry'

# Sets index.erb as the home page. Loads index.erb
get('/') do
	erb :index
end

# Runs the function waldoTest and returns true or false as a string to the client.
get('/return') do
	waldo = waldoTest(params)
	waldo = waldo.to_s
	return waldo
end

# Runs storeScore and saves the client's score info to a file.
post('/storescores') do
	@score = params
	storeScore(params)
end