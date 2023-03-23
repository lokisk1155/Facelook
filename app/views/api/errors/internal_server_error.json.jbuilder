# frozen_string_literal: true

json.title 'Server Error'
json.message @message
json.stack @stack unless Rails.env.production?
