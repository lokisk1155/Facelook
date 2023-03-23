# frozen_string_literal: true

class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :stories do |t|
      t.string :name
      t.text :text_story
      t.references :user
      t.timestamps
    end
  end
end
