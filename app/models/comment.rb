# frozen_string_literal: true

class Comment < ApplicationRecord
  validates :content, presence: true

  belongs_to :user

  belongs_to :post
end
