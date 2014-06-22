require 'test_helper'

class BooksControllerTest < ActionController::TestCase
  setup do
    @book = books(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:books)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create book" do
    assert_difference('Book.count') do
      post :create, book: { author: @book.author, average_rating: @book.average_rating, category_full: @book.category_full, category_id: @book.category_id, description: @book.description, format: @book.format, image_url: @book.image_url, isbn: @book.isbn, reviews_widget: @book.reviews_widget, title: @book.title }
    end

    assert_redirected_to book_path(assigns(:book))
  end

  test "should show book" do
    get :show, id: @book
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @book
    assert_response :success
  end

  test "should update book" do
    patch :update, id: @book, book: { author: @book.author, average_rating: @book.average_rating, category_full: @book.category_full, category_id: @book.category_id, description: @book.description, format: @book.format, image_url: @book.image_url, isbn: @book.isbn, reviews_widget: @book.reviews_widget, title: @book.title }
    assert_redirected_to book_path(assigns(:book))
  end

  test "should destroy book" do
    assert_difference('Book.count', -1) do
      delete :destroy, id: @book
    end

    assert_redirected_to books_path
  end
end
