require 'rubygems'
require 'open-uri'
require 'nokogiri'
require 'json'
require 'zip'

DOWNLOAD_UNICODE_CORE_ZIP = 'http://unicode.org/Public/cldr/29/core.zip'
LOCALE_JSON_FILE_NAME = 'locale.json'

DECIMAL_SEPARATOR = 'decimal_sep'
GROUP_SEPARATOR = 'group_sep'
CURRENCY_PATTERN = 'currency_pattern'
NUMBER_PATTERN = 'number_pattern'

LANGUAGE_PATH = 'ldml/identity/language/@type'
TERRITORY_PATH =  'ldml/identity/territory/@type'
DECIMAL_SEPARATOR_PATH = 'ldml/numbers/symbols[@numberSystem="latn"]/decimal'
GROUP_SEPARATOR_PATH = 'ldml/numbers/symbols[@numberSystem="latn"]/group'
CURRENCY_FORMAT_PATH = 'ldml/numbers/currencyFormats[@numberSystem="latn"]/currencyFormatLength[not(@type)]/currencyFormat/pattern'
CURRENCY_FORMAT_PATH_STANDARD = 'ldml/numbers/currencyFormats[@numberSystem="latn"]/currencyFormatLength/currencyFormat[type="standard"]/pattern'
DECIMAL_FORMAT_PATH = 'ldml/numbers/decimalFormats[@numberSystem="latn"]/decimalFormatLength[not(@type)]/decimalFormat/pattern'
DECIMAL_FORMAT_PATH_STANDARD = 'ldml/numbers/decimalFormats[@numberSystem="latn"]/decimalFormatLength/decimalFormat[type="standard"]/pattern'

locales = {}
language_templates = {}
tmp_file = 'core.zip';

def create_locale(language, territory)
  if !territory
    return language
  end
  language.to_s + '_' + territory.to_s
end

if !File.exists?(tmp_file)
  puts tmp_file + ' does not exists locally. We have to download it.'
  open(tmp_file, 'wb') do |file|
    file << open(DOWNLOAD_UNICODE_CORE_ZIP).read
  end
end

Zip::File.open(tmp_file) do |zipfile|
  zipfile.each do |file|
    next if !file.to_s.start_with?('common/main')
    next if file.name_is_directory?

    doc = Nokogiri::XML(file.get_input_stream.read)

    if doc.at_xpath(LANGUAGE_PATH)
      language = doc.xpath(LANGUAGE_PATH).to_s
    end
    if doc.at_xpath(TERRITORY_PATH)
      territory = doc.xpath(TERRITORY_PATH).to_s
    end

    result = {}
    if territory
      language_template = language_templates[language]
      if language_template
        result = language_template.clone()
      end
    end

    decimal_separator = ''
    if doc.at_xpath(DECIMAL_SEPARATOR_PATH)
      decimal_separator = doc.xpath(DECIMAL_SEPARATOR_PATH).first().content()
      result[DECIMAL_SEPARATOR] = decimal_separator
    end

    group_separator = ''
    if doc.at_xpath(GROUP_SEPARATOR_PATH)
      group_separator = doc.xpath(GROUP_SEPARATOR_PATH).first().content()
      result[GROUP_SEPARATOR] = group_separator
    end

    decimal_formats = ''
    if doc.at_xpath(DECIMAL_FORMAT_PATH_STANDARD)
      decimal_formats = doc.xpath(DECIMAL_FORMAT_PATH_STANDARD).first().content()
      result[NUMBER_PATTERN] = decimal_formats
    elsif doc.at_xpath(DECIMAL_FORMAT_PATH)
      decimal_formats = doc.xpath(DECIMAL_FORMAT_PATH).first().content()
      result[NUMBER_PATTERN] = decimal_formats;
    end

    if doc.at_xpath(CURRENCY_FORMAT_PATH_STANDARD)
      currency_format = doc.xpath(CURRENCY_FORMAT_PATH_STANDARD).first().content()
      result[CURRENCY_PATTERN] = currency_format;
    elsif doc.at_xpath(CURRENCY_FORMAT_PATH)
      currency_format = doc.xpath(CURRENCY_FORMAT_PATH).first().content()
      result[CURRENCY_PATTERN] = currency_format;
    end

    if !territory
      language_templates[language] = result;
    end

    locales[create_locale(language, territory)] = result;
  end
end

File.write('dist/' + LOCALE_JSON_FILE_NAME, locales.to_json)

puts 'Wrote ' + locales.length.to_s + " locales successfully."
