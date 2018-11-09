class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :src
      t.string :title

      t.timestamps
    end
  end
end
