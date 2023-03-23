# frozen_string_literal: true

class ChangeUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :highschool, :string
    add_column :users, :language, :string
    add_column :users, :website, :string
    add_column :users, :social_link, :string
  end
end
