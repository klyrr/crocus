require 'rubygems'
require 'open-uri'
require 'nokogiri'
require 'json'

CURRENCY_KEY = 'Ccy'
CURRENCY_UNIT = 'CcyMnrUnts'
CURRENCY_JSON_FILE_NAME = 'currency.json'

currencyCode = {}

doc = Nokogiri::XML(open("http://www.currency-iso.org/dam/downloads/lists/list_one.xml"))

doc.xpath('//CcyNtry').each do |e|
  if !e.at_xpath(CURRENCY_KEY).nil?
    if !e.at_xpath(CURRENCY_UNIT).nil?
      currency = e.at_xpath(CURRENCY_KEY).content()
      next if currency.start_with?('X')

      units = e.at_xpath(CURRENCY_UNIT).content()
      currencyCode[currency] = {
        'decimal' => units,
        'symbol' => currency
      }
    end
  end
end

File.write('dist/' + CURRENCY_JSON_FILE_NAME, currencyCode.to_json)

puts "Success."
