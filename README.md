# SHIRASAGI 開発マニュアル

## GitHub Pages

http://shirasagi.github.io/

## Source code repository

https://github.com/shirasagi/shirasagi

## Development

### Download and Prepare

~~~
$ git clone https://github.com/shirasagi/shirasagi.github.io.git
$ cd shirasagi.github.io.git
$ bundle install --without development test
~~~

### Starting Jekyll Server

Simple command.

~~~
$ jekyll s
~~~

Allow access and automatic refreshing. (vm)

~~~
$ jekyll s --host 0.0.0.0 --force_polling
~~~

Access to http://127.0.0.1:4000/
