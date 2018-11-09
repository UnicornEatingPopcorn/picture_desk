source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.1'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'sass-rails', '~> 5.0'
gem 'slim-rails'
gem 'bootstrap', '~> 4.0.0'
gem 'font-awesome-rails'
gem 'jquery-rails'
gem 'rack-cors', require: 'rack/cors'

gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
group :development, :test do
  gem 'rspec-rails'

  gem 'capybara'
  gem 'selenium-webdriver'

  gem 'shoulda-matchers'
  # gem 'coveralls', require: false
  gem 'simplecov', require: false
end

group :development do
  gem 'pry-rails'
  gem 'awesome_print'

  gem 'better_errors'
  gem 'binding_of_caller'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # deploy
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rbenv', require: false
  gem 'capistrano-sidekiq', require: false
end
