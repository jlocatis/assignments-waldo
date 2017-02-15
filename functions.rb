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
	@score = @score.keys
	@score = @score.shift
	@score = @score.split(" ")
	winner_name = @score.shift
	@score = @score.join(":")
	scores = loadScores()
	new_score = winner_name + "," + @score + "\n"
	scores << new_score
	File.open('./public/highscores.csv', 'w') do |file|
		file << "Name,HighScore\n"
		scores.each do |line|
			file << line
		end
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
	return scores
end