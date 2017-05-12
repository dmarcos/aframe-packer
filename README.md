<h1 align="center">A-Frame Packer</h1>

A-Frame packer is a command line tool that lets you bundle an [A-Frame](https://aframe.io) app with a Web runtime (Gecko) so you can distribute it in app stores like [Steam](http://store.steampowered.com/) or [Itch.io](https://itch.io/).

It's based on [qbrt](https://github.com/mykmelez/qbrt) with a little bit of magic sprinkled on top.

<div align="center">
  <a href="#how-to-use">How To Use</a>
  &mdash;
  <a href="#authors">Authors</a>
  &mdash;
</div>

---

## How to use

Install it:

```bash
npm install -g aframe-packer
```

You need to have a directory with your A-Frame app and an index.html. See the [example]

Before packing you can test that everything works by invoking *run* on your app directory:

```bash
aframe-packer run path/to/aframe_app_dir
```

Once you're happy with the result you can create a zip file that both contains your A-Frame app and Web runtime ready for distribution. To launch it you have to run the `aframe_app_dir.bat` file in the bundle

```bash
aframe-packer pack path/to/aframe_app_dir
```

## Authors

- Diego Marcos ([@dmarcos](https://twitter.com/dmarcos))
