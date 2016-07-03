require 'rubygems'
require 'open-uri'
require 'nokogiri'
require 'json'
require 'zip'

DOWNLOAD_UNICODE_CORE_ZIP = 'http://unicode.org/Public/cldr/29/core.zip'
LOCALE_JSON_FILE_NAME = 'locale.json'
CURRENCY_JSON_FILE_NAME = 'currency.json'

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

def extractFormat(doc, path, alternatePath)
  extracted_format = ''
  if doc.at_xpath(path)
    extracted_format = doc.xpath(path).first().content()
  elsif doc.at_xpath(alternatePath)
    extracted_format = doc.xpath(alternatePath).first().content()
  end
  extracted_format
end

def extractSeparator(doc, path)
  group_separator = ''
  if doc.at_xpath(path)
    group_separator = doc.xpath(path).first().content()
  end
  group_separator
end

def create_locale_element(doc, territory, language)
  result = {}
  if territory
    language_template = @language_templates[language]
    if language_template
      result = language_template.clone()
    end
  end

  result[DECIMAL_SEPARATOR] = extractSeparator(doc, DECIMAL_SEPARATOR_PATH)
  result[GROUP_SEPARATOR] = extractSeparator(doc, GROUP_SEPARATOR_PATH)
  result[NUMBER_PATTERN] = extractFormat(doc, DECIMAL_FORMAT_PATH_STANDARD, DECIMAL_FORMAT_PATH)
  result[CURRENCY_PATTERN] = extractFormat(doc, CURRENCY_FORMAT_PATH_STANDARD, CURRENCY_FORMAT_PATH)

  if !territory
    @language_templates[language] = result;
  end

  result
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

    result = create_locale_element(doc, territory, language)
    locales[create_locale(language, territory)] = result;

    merge_currencies(doc)
  end
end

File.write('dist/' + LOCALE_JSON_FILE_NAME, locales.to_json)
puts 'Wrote ' + locales.length.to_s + " locales successfully."


File.write('dist/' + CURRENCY_JSON_FILE_NAME, @currencies.to_json)
puts 'Wrote ' + @currencies.length.to_s + " currencies successfully."
