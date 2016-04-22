require 'rubygems'
require 'net/http'

task :default => [:test]

task :test do
  ruby "test/currencies.rb"
end

task :update do
  ruby "src/createList.rb"
end
