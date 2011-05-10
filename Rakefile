desc "Build a minified version inside dist/"

directory = File.dirname(__FILE__)
source = File.join(directory, "src", "jquery.headline.js")
minified = File.join(directory, "dist", "jquery.headline.min.js")

task :build do
  require 'uglifier'
  require 'json'
  File.open(minified, "w") do |io|
    io.write(Uglifier.new.compile(File.read(source)))
  end
  puts "minified version at #{minified.gsub(directory, ".")}"
end