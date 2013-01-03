require 'test_helper'

class ApplicationControllerTest < ActionController::TestCase

  test "index" do
    get :index
    assert_response :success
  end

  test "init_session" do
    get :init_session
    assert_response :success
  end

  test "healthz" do
    get :healthz
    assert_response :success
    assert @response.body == 'ok'
  end

end
