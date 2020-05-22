VCR.configure do |c|
  c.cassette_library_dir = Rails.root.join("spec", "vcr")
  c.hook_into :faraday
  c.default_cassette_options = { record: :new_episodes }
  c.ignore_localhost = true
end
