# frozen_string_literal: true

class Story < ApplicationRecord
  validates :user_id, presence: true
  belongs_to :user
  has_one_attached :photo

  def self.group_by_user(user_id)
    Story.where(user_id:)
         .order(created_at: :desc)
         .group_by(&:user_id)
  end
end
