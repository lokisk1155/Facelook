class StaticPagesController < ApplicationController
    def frontend_index
      render file: Rails.root.join('public', 'index.html')
    end
  end