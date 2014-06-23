module BooksHelper
end

class Float
  def star_rating
    (self*2).round / 2.0
  end
end
