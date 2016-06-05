require 'rubygems'
require 'net/http'

task :default => [:test]

task :test do
  ruby "test/rb/currencies.rb"
end

task :update_currency do
  ruby "src/createCurrencyJson.rb"
end

task :update_locale do
  ruby "src/createLocaleJsonFromUnicode.rb"
end
