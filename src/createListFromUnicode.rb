require 'rubygems'
require 'open-uri'
require 'nokogiri'
require 'json'
require 'zip'

LOCALES_JSON_FILE_NAME = 'locales.json'

locales = {}
tmp_file = 'core.zip';

def create_locale(language, territory)
  if !territory
    return language
  end
  language.to_s + '_' + territory.to_s
end

if !File.exists?(tmp_file)
  puts 'tmp file does not exists. We have to download it.'
  open(tmp_file, 'wb') do |file|
    file << open('http://unicode.org/Public/cldr/29/core.zip').read
  end
end

Zip::File.open(tmp_file) do |zipfile|
  zipfile.each do |file|
    next if !file.to_s.start_with?('common/main')
    next if file.name_is_directory?

    doc = Nokogiri::XML(file.get_input_stream.read)

    if doc.at_xpath('ldml/identity/language')
      language = doc.xpath('ldml/identity/language').attr("type")
    end
    if doc.at_xpath('ldml/identity/territory')
      territory = doc.xpath('ldml/identity/territory').attr("type")
    end

    if doc.at_xpath('ldml/numbers/currencies/currency')
      currency = doc.xpath('ldml/numbers/currencies/currency').attr("type")
    end
    currencySymbol = currency
    if doc.at_xpath('ldml/numbers/currencies/currency/symbol')
      doc.xpath('ldml/numbers/currencies/currency/symbol').each do |currencySymbolElement|
        if currencySymbol === currency
          currencySymbol = currencySymbolElement.content()
        end
      end
    end

#    puts create_locale(language, territory)
    locales[create_locale(language, territory)] = {
      'currency' => currency,
      'currencySymbol' => currencySymbol
    }
  end
end

File.write('dist/' + LOCALES_JSON_FILE_NAME, locales.to_json)

puts "Success."
