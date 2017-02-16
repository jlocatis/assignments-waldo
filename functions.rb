require 'pry'
require 'csv'

# Checks if you the user has clicked where Waldo is. Returns true or false.
def waldoTest(params)
	x = params[:x]
	y = params[:y]
	waldo_test = true
	if x.to_i >= 450 && x.to_i <= 485 && y.to_i >= 470 && y.to_i <= 515
		waldo_test = true
	else
		waldo_test = false
	end
	
	return waldo_test
end

# Posts the submitted score and user's name to the save file.
def storeScore(params)
	new_score = params[:name] + "," + params[:mins] + ":" + params[:secs] + "\n"
	File.open('./public/highscores.csv', 'a+') do |file|
		file << new_score
	end
end

# Loads the save file and sorts scores by time for reading and writing above.
def loadScores()
	scores = []
	CSV.foreach('./public/highscores.csv', {headers:true}) do |row|
		row["Name"] = row["Name"].chomp
		row["HighScore"] = row["HighScore"].chomp
		scores << row.to_s
	end

	# Takes the minutes/seconds string, converts it into seconds as an integer, sorts
	# the array based on the integer value, and returns the seconds integer back into
	# a minutes/seconds string.
	sort_scores = []
	scores.each do |x|
		time_array = x.split(',')
		current_time = time_array[1]
		mins = current_time.slice(0,2).to_i
		secs = current_time.slice(3,2).to_i
		time_array[1] = (mins * 60) + secs
		sort_scores << time_array
	end

	sort_scores = sort_scores.sort_by(&:last)
	sort_scores.each do |i|
		time = i[1]
		if time > 60
			seconds = time % 60 #seconds
			time = time / 60 #minutes
			if seconds < 10
				seconds = seconds.to_s
				clock = ":0" + seconds
			else
				seconds = seconds.to_s
				clock = ":" + seconds
			end
			if time < 10
				time = time.to_s
				clock = "0" + time + clock
			else
				time = time.to_s
				clock = time + clock
			end
		else
			if time < 10
				time = time.to_s
				clock = "00:0" + time
			else
				time = time.to_s
				clock = "00:" + time
			end
		end
		i[1] = clock
	end
	
	sort_scores_again = []
	sort_scores.each do |j|
		string = j.join(',')
		sort_scores_again << string + "\n"
	end

	return sort_scores_again
end