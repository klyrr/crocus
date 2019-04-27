require 'rubygems'
require 'open-uri'
require 'nokogiri'
require 'json'
require 'zip'

DOWNLOAD_UNICODE_CORE_ZIP = 'https://unicode.org/Public/cldr/34/core.zip'
LOCALE_JSON_FILE_NAME = 'locales.json'
CURRENCY_JSON_FILE_NAME = 'currencies.json'

DECIMAL_SEPARATOR = 'decimal_sep'
GROUP_SEPARATOR = 'group_sep'
CURRENCY_PATTERN = 'currency_pattern'
NUMBER_PATTERN = 'number_pattern'

SYMBOL = 'symbol'
WIDE_SYMBOL = 'wideSymbol'
ISOCODE = 'code'

# locales
LANGUAGE_PATH = 'ldml/identity/language/@type'
TERRITORY_PATH =  'ldml/identity/territory/@type'
DECIMAL_SEPARATOR_PATH = 'ldml/numbers/symbols[@numberSystem="latn"]/decimal'
GROUP_SEPARATOR_PATH = 'ldml/numbers/symbols[@numberSystem="latn"]/group'
CURRENCY_FORMAT_PATH = 'ldml/numbers/currencyFormats[@numberSystem="latn"]/currencyFormatLength[not(@type)]/currencyFormat/pattern'
CURRENCY_FORMAT_PATH_STANDARD = 'ldml/numbers/currencyFormats[@numberSystem="latn"]/currencyFormatLength/currencyFormat[type="standard"]/pattern'
DECIMAL_FORMAT_PATH = 'ldml/numbers/decimalFormats[@numberSystem="latn"]/decimalFormatLength[not(@type)]/decimalFormat/pattern'
DECIMAL_FORMAT_PATH_STANDARD = 'ldml/numbers/decimalFormats[@numberSystem="latn"]/decimalFormatLength/decimalFormat[type="standard"]/pattern'

# currency
CURRENCY_PATH = 'ldml/numbers/currencies/currency'

@currencies = {}
locales = {}
@language_templates = {}
tmp_file = 'core.zip';

def create_locale(language, territory)
  if !territory
    return language
  end
  language.to_s + '_' + territory.to_s
end

def get_value(element, path)
  if element.at_xpath(path)
    return element.xpath(path).first().content()
  end
  return ''
end

def merge_currencies(element)

  if !element.at_xpath(CURRENCY_PATH)
    return
  end

  element.xpath(CURRENCY_PATH).each do | currencyElement |
    isoCode = currencyElement.xpath('@type').to_s
    result = @currencies[isoCode] ? @currencies[isoCode] : {}

    symbol = get_value(currencyElement, 'symbol[not(@alt)]')
    symbolNarrow = get_value(currencyElement, 'symbol[@alt="narrow"]')

    result[SYMBOL] = symbolNarrow.empty? ? symbol : symbolNarrow
    result[WIDE_SYMBOL] = symbol.empty? ? symbolNarrow : symbol
    result[ISOCODE] = isoCode
    @currencies[isoCode] = result
  end
end

def create_locale_element(doc, territory, language)
  result = {}
  if territory
    language_template = @language_templates[language]
    if language_template
      result = language_template.clone()
    end
  end

  if doc.at_xpath(DECIMAL_SEPARATOR_PATH)
    result[DECIMAL_SEPARATOR] = doc.xpath(DECIMAL_SEPARATOR_PATH).first().content()
  end

  if doc.at_xpath(GROUP_SEPARATOR_PATH)
    result[GROUP_SEPARATOR] = doc.xpath(GROUP_SEPARATOR_PATH).first().content()
  end

  if doc.at_xpath(DECIMAL_FORMAT_PATH_STANDARD)
    result[NUMBER_PATTERN] = doc.xpath(DECIMAL_FORMAT_PATH_STANDARD).first().content()
  elsif doc.at_xpath(DECIMAL_FORMAT_PATH)
    result[NUMBER_PATTERN] = doc.xpath(DECIMAL_FORMAT_PATH).first().content()
  end

  if doc.at_xpath(CURRENCY_FORMAT_PATH_STANDARD)
    result[CURRENCY_PATTERN] = doc.xpath(CURRENCY_FORMAT_PATH_STANDARD).first().content()
  elsif doc.at_xpath(CURRENCY_FORMAT_PATH)
    result[CURRENCY_PATTERN] = doc.xpath(CURRENCY_FORMAT_PATH).first().content()
  end

  if !territory
    @language_templates[language] = result;
  end

  result
end

if !File.exists?(tmp_file)
  puts tmp_file + ' does not exist locally. We have to download it.'
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

    result = create_locale_element(doc, territory, language)
    locales[create_locale(language, territory)] = result;

    merge_currencies(doc)
  end
end

Dir.mkdir('src/generated/') unless Dir.exist?('src/generated/')

File.write('src/generated/' + LOCALE_JSON_FILE_NAME, locales.to_json)
puts 'Wrote ' + locales.length.to_s + " locales successfully."

File.write('src/generated/' + CURRENCY_JSON_FILE_NAME, @currencies.to_json)
puts 'Wrote ' + @currencies.length.to_s + " currencies successfully."
