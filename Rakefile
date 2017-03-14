require 'rubygems'
require 'highline/import'

# Usage: rake new title="A Title" [date="2012-02-09"] [tags=[tag1, tag2]]
desc "create new night"
task :new do
  title = ENV["title"] || "Awaken Night"
  tags = ENV["tags"] || "[]"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end

  filename = File.join('src/_awaken-nights', "#{date}-#{slug}.html")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  File.open(filename, 'w') do |post|
    post.puts "---"
    post.puts "title: #{title}"
    post.puts "speaker: #{title}"
    post.puts "date: #{date}"
    post.puts "tags: [#{tags}]"
    post.puts "---"
    post.puts ""
  end
end