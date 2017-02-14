require 'pry'
require 'csv'

def waldoTest(params)
	@coordinates = @coordinates.keys
	@coordinates = @coordinates.shift
	@coordinates = @coordinates.split(" ")
	waldo_test = true
	if @coordinates[0].to_i >= 450 && @coordinates[0].to_i <= 490
		if @coordinates[1].to_i >= 455 && @coordinates[1].to_i <= 515
			waldo_test = true
		end
	else
		waldo_test = false
	end
	
	return waldo_test
end

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

def loadScores()
	scores = []
	CSV.foreach('./public/highscores.csv', {headers:true}) do |row|
		row["Name"] = row["Name"].chomp
		row["HighScore"] = row["HighScore"].chomp
		scores << row.to_s
	end
	return scores
end