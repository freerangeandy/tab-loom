landslide_verse_lines = [
'e|-----------------|----------------|----------------|----------------|',
'B|-------1---------|------3---------|------1---------|------3---------|',
'G|---0-------0-----|--0-------0-----|--0-------0-----|--0-------0-----|',
'D|-----2-------2---|----0-------0---|----2-------2---|----0-------0---|',
'A|-3-------3-------|2-------2-------|0-------0-------|2-------2-------|',
'E|-----------------|----------------|----------------|----------------|'
]
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
basic_user = User.create(username: 'basic', email: 'basic@bort.com', password: 'bortman', password_confirmation: 'bortman')
landslide_verse = Tablature.create(
  title: "Landslide verse",
  e_1: landslide_verse_lines[0],
  b_2: landslide_verse_lines[1],
  g_3: landslide_verse_lines[2],
  d_4: landslide_verse_lines[3],
  a_5: landslide_verse_lines[4],
  e_6: landslide_verse_lines[5],
  user: basic_user
)
