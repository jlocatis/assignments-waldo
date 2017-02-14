require 'sinatra'
require './functions.rb'
require 'pry'

enable :sessions

get('/') do
	erb :index
end

post('/test') do
	@coordinates = params
	session[:waldo_test] = waldoTest(params)
end

get('/return') do
	@return = session[:waldo_test].to_s
end

post('/storescores') do
	@score = params
	storeScore(params)
end