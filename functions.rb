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

# Loads the save file for reading and writing above.
def loadScores()
	scores = []
	CSV.foreach('./public/highscores.csv', {headers:true}) do |row|
		row["Name"] = row["Name"].chomp
		row["HighScore"] = row["HighScore"].chomp
		scores << row.to_s
	end

	##
	sort_scores = []
	scores.each do |x|
		test = x.split(',')
		current_time = test[1]
		mins = current_time.slice(0,2).to_i
		secs = current_time.slice(3,2).to_i
		test[1] = (mins * 60) + secs
		sort_scores << test
	end
	sort_scores = sort_scores.sort_by(&:last)
	sort_scores.each do |i|
		test = i[1]
		if test > 60
			test1 = test % 60 #seconds
			test = test / 60 #minutes
			if test1 < 10
				test1 = test1.to_s
				clock = ":0" + test1
			else
				test1 = test1.to_s
				clock = ":" + test1
			end
			if test < 10
				test = test.to_s
				clock = "0" + test + clock
			else
				test = test.to_s
				clock = test + clock
			end
		else
			if test < 10
				test = test.to_s
				clock = "00:0" + test
			else
				test = test.to_s
				clock = "00:" + test
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