require 'rubygems'
require 'net/http'

task :default => [:test]

task :test do
  ruby "test/rb/currencies.rb"
end

task :update do
  ruby "src/rb/createLocaleJsonFromUnicode.rb"
end
