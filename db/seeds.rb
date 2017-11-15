# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def get_books(page)
  books = []
  page.css('.ctOddRowColor, .ctEvenRowColor').each do |row|
    cell = row.css('td')[2] # Third cell in the row
    book = {
      :isbn => cell.children[5].content.strip,
      :title => cell.css('div').first.content.strip,
      :author => cell.children[2].content.strip[2..-1], # remove 'by'
      :category_full => cell.children[8].content.strip,
      :format => cell.children[10].content.strip[8..-1] # remove 'format:'
    }
    books << book
  end
  books
end

def get_category_id category
  category = category.split('-').first.strip
  if Category.where(name: category).empty?
    ret = Category.create({name: category})
  else
    ret = Category.where(name: category).first
  end
  ret
end

def get_info book
  url = "https://www.goodreads.com/book/isbn?isbn=#{book[:isbn]}&key=#{ENV["GOODREADS_API_KEY"]}"
  begin
    doc = Nokogiri::XML(open(url))
    bookXML = doc.at_xpath('//book')
    book[:description] = bookXML.at_xpath('//description').content.strip
    book[:image_url] = bookXML.at_xpath('//image_url').content.strip
    book[:average_rating] = bookXML.at_xpath('//average_rating').content.strip
    book[:reviews_widget] = bookXML.at_xpath('//reviews_widget').content.strip
    book[:url] = bookXML.at_xpath('//url').content.strip
  rescue
    puts "Unable to get info for #{book[:title]}"
  end
  book
end

def init
  url = ENV['url'] ? ENV['url'] : File.join(Rails.root, 'books.html')
  page = Nokogiri::HTML(open(url))

  books = get_books(page)
  @categories = []
  books.each do |book|
    puts book[:title]
    category_id = get_category_id(book[:category_full])
    book[:category_id] = category_id.id
    book = get_info(book)
    Book.create(book)
    sleep 1.2
  end
end

init
